import { AnimatePresence, motion } from 'framer-motion'
import { useIsMutating } from '@tanstack/react-query'

import { PATH } from '@/constants/path'
import { QUERY_KEYS } from '@/constants/query-key'
import { formatCurrency } from '@/utils'
import { useCartStore } from '@/stores/cart-store'
import { useGetCart, usePreCheckOut } from '@/lib/react-query'
import { LinkButton, PrimaryButton } from '@/components/shared/button'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ChevronLeftIcon } from '@/components/icons'
import { ProductInCart } from '@/components/cart'

export default function CartPage() {
  const selectedProductIds = useCartStore((state) => state.selectedProductIds)
  const setSelectedProductIds = useCartStore((state) => state.setSelectedProductIds)

  const preCheckoutResponse = useCartStore((state) => state.preCheckoutResponse)
  const setPreCheckoutResponse = useCartStore((state) => state.setPreCheckoutResponse)

  const {
    data: getCartResponse,
    isLoading: isLoadingGetCart,
    isError: isErrorGetCart,
    isSuccess: isSuccessGetCart,
  } = useGetCart()

  const preCheckoutMutation = usePreCheckOut()

  const isPendingPreCheckout =
    useIsMutating({ mutationKey: [QUERY_KEYS.PRE_CHECKOUT], exact: true }) === 1 ? true : false

  function toggleAllCheckbox(ev: React.ChangeEvent<HTMLInputElement>) {
    if (!isSuccessGetCart) return

    const listItems = ev.target.checked ? getCartResponse.data.data.listItems.map((item) => item.productId) : []

    setSelectedProductIds(listItems)

    preCheckoutMutation.mutate(
      { listItems },
      {
        onSuccess: (response) => setPreCheckoutResponse(response.data.data),
      }
    )
  }

  return (
    <>
      {isLoadingGetCart ? <div>Loading...</div> : null}

      {isErrorGetCart ? <div>Error...</div> : null}

      {isSuccessGetCart ? (
        <Breadcrumbs navClassname="mt-5 shadow-section md:mt-7.5">
          <Breadcrumbs.Item to={PATH.HOMEPAGE}>Trang chủ</Breadcrumbs.Item>
          <Breadcrumbs.Item isLastChild>Giỏ hàng</Breadcrumbs.Item>
        </Breadcrumbs>
      ) : null}

      {isSuccessGetCart ? (
        <div className="mt-5 grid gap-7.5 md:mt-7.5 lg:grid-cols-[minmax(0,8fr),minmax(0,4fr)]">
          <div className="background-light1_dark1 rounded-3xl p-7.5 shadow-section">
            <div className="border-secondary3_dark2 flex border-b pb-5">
              <input
                type="checkbox"
                className="size-5 self-center rounded border-gray-300 text-primary-blue focus:ring-primary-blue"
                onChange={toggleAllCheckbox}
                checked={selectedProductIds.length === getCartResponse.data.data.listItems.length}
              />

              <h2 className="text-secondary1_dark3 ml-3 mt-px text-medium-18">
                Chọn tất cả <span>({getCartResponse.data.data.listItems.length} sản phẩm)</span>
              </h2>
            </div>
            {[...getCartResponse.data.data.listItems].reverse().map((item) => (
              <ProductInCart key={item.productId} {...item} />
            ))}
            <div className="text-secondary1_dark3 flex pt-7.5 text-medium-18">
              <div className="basis-2/3 self-end">
                <LinkButton
                  to={PATH.PRODUCTS}
                  className="hover:text-secondary1_secondary3 group gap-2.5 transition-colors duration-300 flex-center hover:opacity-100"
                >
                  <ChevronLeftIcon className="size-6 transition-transform duration-300 group-hover:-translate-x-1" />
                  <span>Tiếp tục mua sắm</span>
                </LinkButton>
              </div>
              <div className="flex-1">
                <div className="flex justify-between gap-4">
                  <span>Subtotal:</span>
                  <span>
                    {formatCurrency(getCartResponse.data.data.subTotal)}
                    <sup>₫</sup>
                  </span>
                </div>
                <div className="mt-2.5 flex justify-between gap-4">
                  <span>Taxes:</span>
                  <span>
                    {formatCurrency(getCartResponse.data.data.subTotal)}
                    <sup>₫</sup>
                  </span>
                </div>
                <div className="background-secondary3_dark2 my-7.5 h-px" />
                <div className="flex justify-between gap-4 text-bold-22">
                  <span>Total:</span>
                  <span>
                    {formatCurrency(getCartResponse.data.data.subTotal)}
                    <sup>₫</sup>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="background-light1_dark1 sticky top-[calc(var(--header-height)+1.875rem)] rounded-3xl p-7.5 shadow-section">
              <AnimatePresence>
                {isPendingPreCheckout ? (
                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 0.75,
                    }}
                    transition={{
                      duration: 0.1,
                    }}
                    className="background-light1_dark1 absolute inset-0 z-10 rounded-3xl"
                  >
                    <span className="absolute inset-0 m-auto inline-block size-6 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></span>
                    <span className="sr-only">Loading...</span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <form>
                <label htmlFor="discount-code" className="text-secondary1_dark3 text-medium-18">
                  Mã giảm giá
                </label>
                <div className="mt-2.5 flex h-11 space-x-3">
                  <input
                    id="discount-code"
                    placeholder="Nhập mã giảm giá"
                    className="input-ring text-secondary1_dark3 size-full text-ellipsis rounded-xl bg-inherit py-0 flex-center placeholder:text-secondary-3 dark:ring-secondary-2 dark:placeholder:text-dark-3/40"
                  />
                  <PrimaryButton
                    type="submit"
                    className="h-full shrink-0 rounded-xl bg-primary-yellow px-3 text-medium-16 text-secondary-1 flex-center disabled:opacity-70"
                  >
                    Áp dụng
                  </PrimaryButton>
                </div>
              </form>

              <dl className="text-secondary1_dark3 mt-7.5 space-y-3.5 text-medium-16">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-bold-16">
                    {formatCurrency(preCheckoutResponse?.subTotal ?? 0)}
                    <sup>₫</sup>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="flex">
                    Discount
                    <span className="ml-2 inline-block rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600 flex-center">
                      SALE50
                    </span>
                  </dt>
                  <dd className="text-bold-16">
                    -{formatCurrency(preCheckoutResponse?.promotion?.discount ?? 0)}
                    <sup>₫</sup>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>Taxes</dt>
                  <dd className="text-bold-16">
                    {formatCurrency(preCheckoutResponse?.tax ?? 0)}
                    <sup>₫</sup>
                  </dd>
                </div>
                <div className="border-secondary3_dark2 flex justify-between border-t pt-3.5">
                  <dt>Total</dt>
                  <dd className="text-bold-16">
                    {formatCurrency(preCheckoutResponse?.total ?? 0)}
                    <sup>₫</sup>
                  </dd>
                </div>
              </dl>
              <div className="mt-7.5 flex justify-center">
                <LinkButton
                  to={'/'}
                  className="h-[46px] w-[278px] justify-center rounded-full bg-primary-yellow text-medium-22 text-secondary-1 flex-center disabled:opacity-70"
                >
                  Continue checkout
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
