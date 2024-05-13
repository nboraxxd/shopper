import DOMPurify from 'dompurify'
import { Tab } from '@headlessui/react'
import { Product } from '@/types/product.type'

interface Props {
  description: string
  features: Product['specifications']
}

export default function ProductTab({ description, features }: Props) {
  return (
    <Tab.Group>
      <Tab.List>
        <Tab>Description</Tab>
        <Tab>Features</Tab>
        <Tab>Review</Tab>
        <Tab>Similar</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description),
          }}
        />
        <Tab.Panel>
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
              >
                Name
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Title
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {features.map((feature) =>
              feature.attributes.map((attribute) => (
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                    {attribute.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{attribute.value}</td>
                </tr>
              ))
            )}
          </tbody>
        </Tab.Panel>
        <Tab.Panel>Content 3</Tab.Panel>
        <Tab.Panel>Content 4</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
