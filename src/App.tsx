import '@/globals.css'
import { useGetProducts } from '@/lib/react-query/queriesAndMutations'

function App() {
  const { data } = useGetProducts()
  console.log('🔥 ~ App ~ data:', data)

  return (
    <div className="container">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  )
}

export default App
