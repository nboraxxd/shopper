import { toast } from 'sonner'
import { useState } from 'react'
import queryString from 'query-string'
import { useLocation, useNavigate } from 'react-router-dom'

import { ErrorResponse } from '@/types'
import { Product } from '@/types/product.type'
import { PATH } from '@/constants/path'
import { useAuthStore } from '@/stores/auth-store'
import { isAxiosBadRequestError } from '@/utils/error'
import { formatCurrency, formatNumberToSocialStyle } from '@/utils'
import { useGetCart, useUpdateQtyCart } from '@/lib/react-query'
import { HeartIcon, StarIcon } from '@/components/icons'
import { PrimaryButton } from '@/components/shared/button'
import { QuantityInput } from '@/components/shared/input'

interface Props {
  productId: number
  productRatingAverage: Product['rating_average']
  productReviewCount: Product['review_count']
  productQty: Product['stock_item']['qty']
  productPrice: Product['price']
  productDiscountRate: Product['discount_rate']
  productRealPrice: Product['real_price']
}

export default function ProductAction(props: Props) {
  const {
    productId,
    productRatingAverage,
    productReviewCount,
    productQty,
    productPrice,
    productDiscountRate,
    productRealPrice,
  } = props

  const [quantity, setQuantity] = useState<number>(1)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { refetch: refetchGetCart } = useGetCart(false)
  const updateQtyCartMutation = useUpdateQtyCart()

  function handleChangeQuantity(value: number) {
    setQuantity(value)
  }

  async function handleAddToCart() {
    if (!isAuthenticated) {
      return navigate({ pathname: PATH.LOGIN, search: queryString.stringify({ from: pathname }) })
    }

    if (productQty === 0) {
      return toast.error('Sản phẩm đã hết hàng')
    }

    const {
      data: getCartResponse,
      isLoading: isLoadingGetCart,
      isError: isErrorGetCart,
      isSuccess: isSuccessGetCart,
    } = await refetchGetCart()

    const productQuantityInCart = isSuccessGetCart
      ? getCartResponse.data.data.listItems.find((item) => item.productId === productId)?.quantity || 0
      : isLoadingGetCart || isErrorGetCart
        ? undefined
        : 0

    if (productQuantityInCart === undefined) {
      return toast.error('Không thể thêm vào giỏ hàng. Vui lòng thử lại sau')
    }

    toast.promise(updateQtyCartMutation.mutateAsync({ productId, quantity: productQuantityInCart + quantity }), {
      loading: 'Đang thêm vào giỏ hàng...',
      success: () => {
        const promise = refetchGetCart()

        promise.then((res) => {
          console.log(res.isSuccess)
        })

        console.log('after')
        return 'Đã thêm vào giỏ hàng'
      },
      error: (error) => {
        if (isAxiosBadRequestError<ErrorResponse>(error)) {
          return error.response?.data.message || error.message
        } else {
          return error.message
        }
      },
    })
  }

  return (
    <>
      <div className="space-y-7 xl:w-1/2">
        {productRatingAverage > 0 ? (
          <div className="gap-2 flex-center">
            <StarIcon className="size-6 fill-primary-yellow" />
            <div className="text-secondary1_dark3 medium-18 flex gap-1">
              <span>({productRatingAverage.toFixed(1)})</span>
              <span>
                {formatNumberToSocialStyle(productReviewCount)} {productReviewCount > 1 ? 'ratings' : 'rating'}
              </span>
            </div>
          </div>
        ) : null}
        <div>
          <h3 className="medium-18 text-secondary1_light3">Quantity</h3>
          <QuantityInput
            max={productQty}
            onDecrease={handleChangeQuantity}
            onIncrease={handleChangeQuantity}
            onType={handleChangeQuantity}
            value={quantity}
          />
          {productQty > 0 ? (
            <p className="medium-15 text-secondary1_light3 mt-3">{productQty} sản phẩm có sẵn</p>
          ) : (
            <p className="medium-15 text-secondary1_light3 mt-3">Sản phẩm đã hết hàng</p>
          )}
        </div>
      </div>
      <div className="xl:w-1/2">
        {productPrice > productRealPrice ? (
          <div className="flex items-start">
            <h3 className="regular-16 text-secondary-2 line-through">
              {formatCurrency(productPrice)}
              <sup>₫</sup>
            </h3>
            <div className="medium-14 ml-2.5 rounded bg-primary-green/20 px-2 py-0.5 text-primary-green">
              -{productDiscountRate}%
            </div>
          </div>
        ) : null}
        <h2 className="medium-26 text-dark_light3 mt-5">
          {formatCurrency(productRealPrice)}
          <sup>₫</sup>
        </h2>
        <div>
          <PrimaryButton
            className="medium-18 mt-5 h-[46px] w-full rounded-md bg-primary-yellow text-secondary-1 disabled:opacity-70"
            disabled={productQty === 0}
          >
            Mua ngay
          </PrimaryButton>
          <div className="mt-5 gap-5 flex-center">
            <PrimaryButton
              className="medium-18 h-[46px] flex-1 rounded-md bg-primary-green text-secondary-1 disabled:opacity-70"
              disabled={productQty === 0}
              onClick={handleAddToCart}
            >
              Thêm vào giỏ
            </PrimaryButton>
            <PrimaryButton className="size-[46px] justify-center rounded-md border border-secondary-3 text-secondary-1 flex-center">
              <HeartIcon className="size-6" />
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  )
}
