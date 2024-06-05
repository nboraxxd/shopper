import { Link } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { formatCurrency } from '@/utils'
import { useGetCart } from '@/lib/react-query'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { BinIcon, ChevronLeftIcon, HeartIcon } from '@/components/icons'
import { QuantityInput } from '@/components/shared/input'
import { LinkButton, PrimaryButton } from '@/components/shared/button'

export default function CartPage() {
  const {
    data: getCartResponse,
    isLoading: isLoadingGetCart,
    isError: isErrorGetCart,
    isSuccess: isSuccessGetCart,
  } = useGetCart()

  const productsInCart = isSuccessGetCart ? getCartResponse.data.data.listItems : undefined

  return (
    <>
      {isLoadingGetCart ? <div>Loading...</div> : null}

      {isErrorGetCart ? <div>Error...</div> : null}

      {isSuccessGetCart ? (
        <Breadcrumbs navClassname="shadow-light10_dark10 mt-5 md:mt-7.5">
          <Breadcrumbs.Item to={PATH.HOMEPAGE}>Trang chủ</Breadcrumbs.Item>
          <Breadcrumbs.Item isLastChild>Giỏ hàng</Breadcrumbs.Item>
        </Breadcrumbs>
      ) : null}

      {isSuccessGetCart && productsInCart ? (
        <div className="mt-5 grid gap-7.5 md:mt-7.5 lg:grid-cols-[8fr,4fr]">
          <div className="shadow-light10_dark10 background-light1_dark1 rounded-twenty p-7.5">
            <div className="border-secondary3_dark2 flex border-b pb-5">
              <input
                title="Select all items in cart"
                type="checkbox"
                className="size-5 self-center rounded border-gray-300 text-primary-blue focus:ring-primary-blue"
              />

              <h2 className="text-secondary1_dark3 medium-18 ml-3 mt-px">
                Chọn tất cả <span>({productsInCart.length} sản phẩm)</span>
              </h2>
            </div>
            {[...productsInCart].reverse().map(({ product, quantity }) => (
              <div key={product.id} className="border-secondary3_dark2 flex items-start border-b py-7.5">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  className="size-5 self-center rounded border-gray-300 text-primary-blue focus:ring-primary-blue"
                />
                {/* Thumbnail */}
                <Link to={PATH.HOMEPAGE}>
                  <img
                    src={product.thumbnail_url}
                    alt={product.name}
                    className="ml-3 rounded bg-white object-contain xl:size-[150px] 2xl:size-[172px]"
                  />
                </Link>

                <div className="flex flex-1">
                  {/* Left content */}
                  <div className="ml-5 flex-1 space-y-4">
                    <h2 className="text-secondary1_dark3 medium-18 line-clamp-2">
                      <Link to={PATH.HOMEPAGE}>{product.name}</Link>
                    </h2>
                    <p className="medium-18 text-secondary-2">
                      {formatCurrency(product.real_price)}
                      <sup>₫</sup>
                    </p>
                    <QuantityInput />
                  </div>
                  {/* Right content */}
                  <div className="flex flex-col items-end justify-between">
                    <h3 className="text-secondary1_dark3 bold-22">
                      {formatCurrency(product.real_price * quantity)}
                      <sup>₫</sup>
                    </h3>
                    <div className="flex gap-5">
                      <PrimaryButton className="hover:text-secondary1_secondary3 min-h-11 gap-2.5 px-1.5 text-secondary-2 transition-colors flex-center">
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
            ))}
            <div className="text-secondary1_dark3 medium-18 flex pt-7.5">
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
                <div className="bold-22 flex justify-between gap-4">
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
            <div className="shadow-light10_dark10 background-light1_dark1 sticky top-[calc(var(--header-height)+1.875rem)] rounded-twenty p-7.5">
              <form>
                <label htmlFor="discount-code" className="text-secondary1_dark3 medium-18">
                  Mã giảm giá
                </label>
                <div className="mt-2.5 flex h-11 space-x-3">
                  <input
                    id="discount-code"
                    placeholder="Nhập mã giảm giá"
                    className="input-ring text-secondary1_dark3 h-full grow rounded-ten bg-inherit py-0 flex-center placeholder:text-secondary-3 dark:ring-secondary-2 dark:placeholder:text-dark-3/40"
                  />
                  <PrimaryButton
                    type="submit"
                    className="medium-16 h-full rounded-ten bg-primary-yellow px-3 text-secondary-1 flex-center disabled:opacity-70"
                  >
                    Áp dụng
                  </PrimaryButton>
                </div>
              </form>

              <dl className="text-secondary1_dark3 medium-16 mt-7.5 space-y-3.5">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="bold-16">$210.00</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="flex">
                    Discount
                    <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">
                      SALE50
                    </span>
                  </dt>
                  <dd className="bold-16">-$24.00</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Taxes</dt>
                  <dd className="bold-16">$23.68</dd>
                </div>
                <div className="border-secondary3_dark2 flex justify-between border-t pt-3.5">
                  <dt>Total</dt>
                  <dd className="bold-16">$341.68</dd>
                </div>
              </dl>
              <div className="mt-7.5 flex justify-center">
                <LinkButton
                  to={'/'}
                  className="medium-22 h-[46px] w-[278px] justify-center rounded-full bg-primary-yellow text-secondary-1 flex-center disabled:opacity-70"
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
