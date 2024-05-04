import queryString from 'query-string'
import { Drawer } from 'vaul'
import { Fragment } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'

import { cn } from '@/utils'
import { QueryConfig } from '@/types'
import { PRODUCTS_SORT } from '@/constants/sorts'
import useMediaQuery from '@/hooks/useMediaQuery'
import useQueryParamsFiltered from '@/hooks/useQueryParamsFiltered'
import { MediumArrowDownIcon, TickIcon } from '@/components/icons'
import { PrimaryButton } from '@/components/shared/button'
import { BottomDrawer } from '@/components/shared/drawer'

export default function Sort() {
  const isLargeDevice = useMediaQuery({ minWidth: 1024 })

  const navigate = useNavigate()
  const queryParamsFiltered = useQueryParamsFiltered()
  const selected = PRODUCTS_SORT.find((sort) => sort.value === queryParamsFiltered.sort)

  return isLargeDevice ? (
    <SortDesktop {...{ navigate, queryParamsFiltered, selected }} />
  ) : (
    <SortMobile {...{ navigate, queryParamsFiltered, selected }} />
  )
}

interface SortProps {
  navigate: NavigateFunction
  queryParamsFiltered: QueryConfig
  selected?: (typeof PRODUCTS_SORT)[number]
}

function SortMobile({ navigate, queryParamsFiltered, selected }: SortProps) {
  return (
    <BottomDrawer
      trigger={
        <PrimaryButton className="background-light1_dark1 h-9 justify-center gap-2 rounded-md px-3 flex-center lg:hidden">
          <span className="medium-16 text-secondary1_secondary3">{selected?.name || 'Sắp xếp'}</span>
          <MediumArrowDownIcon className="inline-block size-5 stroke-secondary-1 dark:stroke-secondary-3" />
        </PrimaryButton>
      }
      title={<p className="bold-18 text-secondary1_light1 mb-4">Sắp xếp</p>}
    >
      <fieldset>
        <legend className="sr-only">Product sort</legend>
        {PRODUCTS_SORT.map((sort) => (
          <Drawer.Close asChild key={sort.value}>
            <div className="relative flex items-start">
              <label className="text-secondary1_light1 medium-16 h-10 w-full cursor-pointer gap-5 font-medium text-gray-900 flex-center">
                <input
                  name="sort"
                  checked={sort.value === selected?.value}
                  type="radio"
                  className="size-4 cursor-pointer border-gray-300 text-primary-blue focus:ring-primary-blue"
                  onChange={() => {
                    navigate({
                      search: queryString.stringify({ ...queryParamsFiltered, sort: sort.value, page: '1' }),
                    })
                  }}
                />
                {sort.name}
              </label>
            </div>
          </Drawer.Close>
        ))}
      </fieldset>
    </BottomDrawer>
  )
}

function SortDesktop({ navigate, queryParamsFiltered, selected }: SortProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        as={PrimaryButton}
        className="background-light1_dark1 hidden h-9 justify-center gap-2 rounded-md px-3 lg:flex-center"
      >
        <span className="medium-16 text-secondary1_secondary3">{selected?.name || 'Sắp xếp'}</span>
        <MediumArrowDownIcon className="inline-block size-5 stroke-secondary-1 dark:stroke-secondary-3" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="background-light1_dark2 shadow-light20_dark20 absolute right-0 z-10 mt-2 hidden w-56 origin-top-right rounded-md ring-1 ring-black/5 focus:outline-none lg:block">
          <div className="py-1">
            {PRODUCTS_SORT.map((sort) => (
              <Menu.Item key={sort.value}>
                {({ active }) => (
                  <PrimaryButton
                    className={cn('w-full justify-between px-4 py-2 text-left flex-center', {
                      'bg-light-2 dark:bg-dark-1/30': active,
                    })}
                    onClick={() => {
                      navigate({
                        search: queryString.stringify({ ...queryParamsFiltered, sort: sort.value, page: '1' }),
                      })
                    }}
                  >
                    <span
                      className={cn('text-secondary1_light1', sort.value === selected?.value ? 'bold-15' : 'medium-15')}
                    >
                      {sort.name}
                    </span>
                    {sort.value === selected?.value ? (
                      <TickIcon className="size-4 fill-secondary-1 dark:fill-light-1" />
                    ) : null}
                  </PrimaryButton>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
