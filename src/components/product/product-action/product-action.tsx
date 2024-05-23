import { useState } from 'react'

import { formatCurrency, formatNumberToSocialStyle } from '@/utils'
import { HeartIcon, StarIcon } from '@/components/icons'
import { PrimaryButton } from '@/components/shared/button'
import { QuantityInput } from '@/components/shared/input'
import { Product } from '@/types/product.type'

interface Props {
  productRatingAverage: Product['rating_average']
  productReviewCount: Product['review_count']
  productQty: Product['stock_item']['qty']
  productPrice: Product['price']
  productDiscountRate: Product['discount_rate']
  productRealPrice: Product['real_price']
}

export default function ProductAction(props: Props) {
  const { productRatingAverage, productReviewCount, productQty, productPrice, productDiscountRate, productRealPrice } =
    props

  const [quantity, setQuantity] = useState<number>(1)

  function handleQuantity(value: number) {
    setQuantity(value)
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
            onDecrease={handleQuantity}
            onIncrease={handleQuantity}
            onType={handleQuantity}
            value={quantity}
          />
          <p className="medium-15 mt-3">{productQty} sản phẩm có sẵn</p>
        </div>
      </div>
      <div className="xl:w-1/2">
        <div className="flex items-start">
          <h3 className="regular-16 text-secondary-2 line-through">
            {formatCurrency(productPrice)}
            <sup>₫</sup>
          </h3>
          <div className="medium-14 ml-2.5 rounded bg-primary-green/20 px-2 py-0.5 text-primary-green">
            -{productDiscountRate}%
          </div>
        </div>
        <h2 className="medium-26 text-dark_light3 mt-5">
          {formatCurrency(productRealPrice)}
          <sup>₫</sup>
        </h2>
        <div>
          <PrimaryButton className="medium-18 mt-5 h-[46px] w-full rounded-md bg-primary-yellow text-secondary-1">
            Mua ngay
          </PrimaryButton>
          <div className="mt-5 gap-5 flex-center">
            <PrimaryButton className="medium-18 h-[46px] flex-1 rounded-md bg-primary-green text-secondary-1">
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
