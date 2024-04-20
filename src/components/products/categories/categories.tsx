import { HttpStatusCode } from 'axios'
import { Link } from 'react-router-dom'

import { useCategories } from '@/lib/react-query'

export default function Categories() {
  const { data: categoriesResponse, isLoading, isError } = useCategories()

  if (isLoading) return <p>Loading...</p>

  if (isError) return <p>Error</p>

  return (
    <div className="space-y-2">
      {categoriesResponse &&
        categoriesResponse.status === HttpStatusCode.Ok &&
        categoriesResponse.data.data.map((category) => (
          <Link
            key={category.id}
            to={category.slug}
            className="background-light3_dark1 text-secondary1_light1 block rounded-[10px] p-2"
          >
            <h3>{category.title}</h3>
          </Link>
        ))}
    </div>
  )
}
