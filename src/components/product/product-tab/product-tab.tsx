import DOMPurify from 'dompurify'
import { Tab } from '@headlessui/react'

import { cn } from '@/utils'
import { PRODUCT_TABS } from '@/constants'
import { Product } from '@/types/product.type'
import { PrimaryButton } from '@/components/shared/button'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/constants/query-key'
import reviewsApi from '@/apis/review.api'
import ms from 'ms'
import { useReviews } from '@/lib/react-query'
import { useState } from 'react'

interface Props {
  productId: number
  description: string
  features: Product['specifications']
}

export default function ProductTab({ productId, description, features }: Props) {
  const [tab, setTab] = useState<(typeof PRODUCT_TABS)[number]['value']>('description')

  const queryClient = useQueryClient()

  const { data: reviewsResponse } = useReviews(productId, { limit: '5', page: '1' }, tab === 'reviews' ? true : false)
  console.log('🔥 ~ ProductTab ~ reviewsResponse:', reviewsResponse)

  function handlePrefetchReviews() {
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.REVIEWS, productId, { limit: '5', page: '1' }],
      queryFn: ({ signal }) => reviewsApi.getReviews({ productId, signal }),
      staleTime: ms('1m'),
    })
  }

  return (
    <Tab.Group>
      <Tab.List className="mt-8 justify-center border-b border-secondary-4 flex-center md:mt-12">
        {PRODUCT_TABS.map((tab) => (
          <Tab
            key={tab.value}
            onMouseEnter={tab.value === 'reviews' ? handlePrefetchReviews : undefined}
            onClick={() => setTab(tab.value)}
            className={({ selected }) =>
              cn(
                'relative rounded-sm px-7 py-3.5 medium-16',
                selected
                  ? "text-primary-red before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-primary-red before:content-['']"
                  : 'text-secondary1_light1'
              )
            }
            as={PrimaryButton}
          >
            {tab.name}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-5 md:mt-8">
        <Tab.Panel className="focus-primary flex justify-center">
          <div
            className="w-full lg:w-10/12 xl:w-8/12"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
          />
        </Tab.Panel>
        <Tab.Panel className="focus-primary flex justify-center">
          <table className="w-full lg:w-10/12 xl:w-8/12">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="w-1/3 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                >
                  Name
                </th>
                <th scope="col" className="w-2/3 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {features[0].attributes.map((attribute, index) => (
                <tr key={index}>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{attribute.name}</td>
                  <td
                    className="px-3 py-4 text-sm text-gray-500"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(attribute.value),
                    }}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </Tab.Panel>
        <Tab.Panel>Content 3</Tab.Panel>
        <Tab.Panel>Content 4</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
