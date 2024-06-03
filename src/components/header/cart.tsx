import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import { BuyIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components/icons'
import { Floating } from '@/components/shared/floating'
import { LinkButton, PrimaryButton } from '@/components/shared/button'
import { PATH } from '@/constants/path'
import { useGetCart } from '@/lib/react-query'
import { formatCurrency } from '@/utils'
import { Link, generatePath } from 'react-router-dom'

export default function Cart() {
  const [isOpenFloating, setIsOpenFloating] = useState(true)

  const { data: getCartResponse, isError: isErrorGetCart, isSuccess: isSuccessGetCart } = useGetCart()

  return (
    <Floating.Root
      isOpen={isOpenFloating}
      setIsOpen={setIsOpenFloating}
      interaction="hover"
      placement="bottom-end"
      mainAxis={28}
      crossAxis={125}
    >
      <Floating.Reference
        as={LinkButton}
        className="focus-primary gap-2.5 rounded-md p-2.5 flex-center hover:bg-light-2/60 dark:hover:bg-dark-3/5 lg:rounded-lg lg:px-5 lg:py-3.5"
      >
        <BuyIcon className="size-6" />
        {isSuccessGetCart || isErrorGetCart ? (
          <span className="medium-15 text-secondary1_light1 min-w-5 text-center">
            {isSuccessGetCart && getCartResponse.data.data.listItems.length > 99
              ? '99+'
              : getCartResponse?.data.data.listItems.length
                ? getCartResponse.data.data.listItems.length.toString().padStart(2, '0')
                : '0'}
          </span>
        ) : (
          <span
            className={
              'inline-block size-5 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
            }
          >
            <span className="sr-only">Loading...</span>
          </span>
        )}
      </Floating.Reference>

      <Floating
        arrowImg="/assets/images/dropdown-arrow.png"
        arrowWidth={50}
        arrowClassName="-top-4"
        wrapperClassName="background-light1_dark2 shadow-light20_dark20 w-[min(500px,100vw)] rounded-[20px] p-7"
      >
        <div className="justify-between flex-center">
          <span className="medium-22 text-secondary1_dark3">
            You have{' '}
            {isSuccessGetCart
              ? getCartResponse.data.data.listItems.length > 99
                ? '99+'
                : getCartResponse.data.data.listItems.length
              : '0'}{' '}
            items
          </span>
          <LinkButton to={PATH.HOMEPAGE} className="regular-22 text-primary-blue">
            View Cart
          </LinkButton>
        </div>

        <div className="group/swiper relative mt-7">
          <Swiper
            className="mySwiper"
            slidesPerView={3}
            spaceBetween={28}
            slidesPerGroup={3}
            modules={[Navigation]}
            navigation={{
              nextEl: '.swiper-btn-next',
              prevEl: '.swiper-btn-prev',
            }}
          >
            {isSuccessGetCart
              ? getCartResponse.data.data.listItems.map((item) => {
                  const productDetailPath = generatePath(PATH.PRODUCT_DETAIL, { productSlug: item.product.slug })

                  return (
                    <SwiperSlide key={item.productId}>
                      <Link
                        to={productDetailPath}
                        className="group/slide text-secondary1_dark3 relative block cursor-pointer pt-[100%]"
                      >
                        <img
                          src={item.product.thumbnail_url}
                          alt={item.product.name}
                          className="absolute left-0 top-0 size-full object-contain opacity-90 transition-opacity"
                        />
                        <span className="regular-11 absolute bottom-1 right-1 size-6 justify-center rounded-full bg-primary-blue/85 text-light-1 flex-center">
                          x{item.quantity}
                        </span>
                      </Link>
                      <Link to={productDetailPath} className="regular-14 mt-3.5 line-clamp-2">
                        {item.product.name}
                      </Link>
                      <div className="medium-15 mt-1.5">
                        <span>{formatCurrency(item.product.real_price)}</span>
                        <sup>₫</sup>
                      </div>
                    </SwiperSlide>
                  )
                })
              : null}
          </Swiper>
          {isSuccessGetCart && getCartResponse.data.data.listItems.length > 3 ? (
            <>
              <PrimaryButton className="swiper-btn-prev absolute -left-2 top-1/4 z-10 rounded-full bg-secondary-2 p-0.5 opacity-0 transition-opacity duration-300 group-hover/swiper:opacity-100">
                <ChevronLeftIcon className="size-5 text-light-1" />
              </PrimaryButton>
              <PrimaryButton className="swiper-btn-next absolute -right-2 top-1/4 z-10 rounded-full bg-secondary-2 p-0.5 opacity-0 transition-opacity duration-300 group-hover/swiper:opacity-100">
                <ChevronRightIcon className="size-5 text-light-1" />
              </PrimaryButton>
            </>
          ) : null}
        </div>

        <hr className="my-7 h-px w-full shrink-0 bg-secondary-3 dark:bg-dark-1" />

        <div className="space-y-5">
          {isSuccessGetCart ? (
            <div className="regular-22 text-secondary1_dark3 justify-between flex-center">
              <span>Subtotal:</span>
              <span>
                {formatCurrency(getCartResponse.data.data.subTotal)}
                <sup>₫</sup>
              </span>
            </div>
          ) : null}
          {isSuccessGetCart ? (
            <div className="regular-22 text-secondary1_dark3 justify-between flex-center">
              <span>Taxes:</span>
              <span>Free</span>
            </div>
          ) : null}
          {isSuccessGetCart ? (
            <div className="regular-22 text-secondary1_dark3 justify-between flex-center">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
          ) : null}
          {isSuccessGetCart ? (
            <div className="medium-22 text-secondary1_dark3 justify-between flex-center">
              <span>Total Price:</span>
              <span>
                {formatCurrency(getCartResponse.data.data.subTotal)}
                <sup>₫</sup>
              </span>
            </div>
          ) : null}
        </div>

        <hr className="my-7 h-px w-full shrink-0 bg-secondary-3 dark:bg-dark-1" />

        <LinkButton
          to={'/'}
          className="medium-22 ml-auto h-[46px] w-[278px] justify-center rounded-full bg-primary-yellow text-secondary-1 flex-center disabled:opacity-70"
        >
          Checkout
        </LinkButton>
      </Floating>
    </Floating.Root>
  )
}
