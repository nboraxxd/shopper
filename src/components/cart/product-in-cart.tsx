import { useState } from 'react'
import { toast } from 'sonner'
import { Link, generatePath } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import productsApi from '@/apis/products.api'
import { FieldUnion, ServiceStatus } from '@/types'
import { GetCartResponse } from '@/types/cart.type'
import { Product as ProductType } from '@/types/product.type'
import { PATH } from '@/constants/path'
import { QUERY_KEYS } from '@/constants/query-key'
import { formatCurrency } from '@/utils'
import { useCartStore } from '@/stores/cart-store'
import { useGetCart, usePreCheckOut, useUpdateQtyCart } from '@/lib/react-query'
import { BinIcon, HeartIcon } from '@/components/icons'
import { PrimaryButton } from '@/components/shared/button'
import { QuantityInput } from '@/components/shared/input'

const fields = 'stock_item,id'

type Fields = FieldUnion<typeof fields>

type Props = GetCartResponse['data']['listItems'][number]

export default function ProductInCart({ productId, product, quantity }: Props) {
  const productDetailPath = generatePath(PATH.PRODUCT_DETAIL, { productSlug: product.slug })

  const queryClient = useQueryClient()

  const [productQtyStatus, setProductQtyStatus] = useState<ServiceStatus>('idle')
  const [productQuantity, setProductQuantity] = useState(quantity)

  const selectedProductIds = useCartStore((state) => state.selectedProductIds)
  const setSelectedProductIds = useCartStore((state) => state.setSelectedProductIds)
  const setPreCheckoutResponse = useCartStore((state) => state.setPreCheckoutResponse)

  const isChecked = selectedProductIds.includes(productId)

  const { refetch: refetchGetCart, isLoading: isLoadingGetCart } = useGetCart(false)

  const preCheckoutMutation = usePreCheckOut()

  const updateQtyCartMutation = useUpdateQtyCart()

  function toggleProductCheckbox() {
    const newSelectedProductIds = isChecked
      ? selectedProductIds.filter((id) => id !== productId)
      : [...selectedProductIds, productId]

    setSelectedProductIds(newSelectedProductIds)

    preCheckoutMutation.mutate(
      {
        listItems: newSelectedProductIds,
      },
      {
        onSuccess: (response) => setPreCheckoutResponse(response.data.data),
        onError: () => setSelectedProductIds(selectedProductIds),
      }
    )
  }

  async function handleChangeQuantity(value: number) {
    setProductQuantity(value)

    if (value === quantity) return

    try {
      setProductQtyStatus('pending')
      const getProductQtyResponse = await queryClient.fetchQuery({
        queryKey: [QUERY_KEYS.PRODUCTS, productId],
        queryFn: ({ signal }) =>
          productsApi.getProducts<Pick<ProductType, Fields>>({ id: productId.toString(), fields, limit: '1' }, signal),
      })
      setProductQtyStatus('success')

      const productStock = getProductQtyResponse.data.data[0].stock_item.qty

      if (value > productStock) {
        setProductQuantity(productStock)
        toast.warning(`Mặt hàng này chỉ còn ${productStock} sản phẩm`)
      }

      if (value > productStock && quantity === productStock) return

      updateQtyCartMutation.mutate(
        { productId, quantity: value > productStock ? productStock : value },
        {
          onSuccess: async () => {
            if (isChecked) {
              const [preCheckoutResponse] = await Promise.all([
                preCheckoutMutation.mutateAsync({
                  listItems: selectedProductIds,
                }),
                refetchGetCart(),
              ])

              setPreCheckoutResponse(preCheckoutResponse.data.data)
            } else {
              refetchGetCart()
            }
          },
          onError: () => setProductQuantity(quantity),
        }
      )
    } catch (error) {
      setProductQuantity(quantity)
      setProductQtyStatus('error')
    }
  }

  return (
    <div key={productId} className="border-secondary3_dark2 flex items-start border-b py-7.5">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={selectedProductIds.includes(productId)}
        onChange={toggleProductCheckbox}
        className="size-5 self-center rounded border-gray-300 text-primary-blue focus:ring-primary-blue"
      />
      {/* Thumbnail */}
      <Link to={productDetailPath}>
        <img
          src={product.thumbnail_url}
          alt={product.name}
          className="ml-3 rounded bg-white object-contain lg:size-[100px] xl:size-[150px] 2xl:size-[172px]"
        />
      </Link>
      <div className="flex flex-1 gap-2 lg:gap-0">
        {/* Left content */}
        <div className="ml-5 flex-1 space-y-4">
          <h2 className="text-secondary1_dark3 line-clamp-2 text-medium-18">
            <Link to={productDetailPath}>{product.name}</Link>
          </h2>
          <p className="text-medium-18 text-secondary-2">
            {formatCurrency(product.real_price)}
            <sup>₫</sup>
          </p>
          <QuantityInput
            value={productQuantity}
            onType={(value) => setProductQuantity(value)}
            onDecrease={handleChangeQuantity}
            onIncrease={handleChangeQuantity}
            onFocusOut={handleChangeQuantity}
            disabled={productQtyStatus === 'pending' || updateQtyCartMutation.isPending || isLoadingGetCart}
          />
        </div>
        {/* Right content */}
        <div className="flex flex-col items-end justify-between">
          <h3 className="text-secondary1_dark3 text-bold-18 xl:text-bold-22">
            {formatCurrency(product.real_price * quantity)}
            <sup>₫</sup>
          </h3>
          <div className=" flex lg:flex-col xl:flex-row xl:gap-5">
            <PrimaryButton className="hover:text-secondary1_secondary3 min-h-11 justify-center gap-2.5 px-1.5 text-secondary-2 transition-colors flex-center">
              <HeartIcon />
              <span>Save</span>
            </PrimaryButton>
            <PrimaryButton className="hover:text-secondary1_secondary3 min-h-11 gap-2.5 px-1.5 text-secondary-2 transition-colors flex-center">
              <BinIcon />
              <span>Delete</span>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
