import '@/globals.css'
import { useGetProducts } from '@/lib/react-query/queriesAndMutations'

function App() {
  const { data } = useGetProducts()
  console.log('🔥 ~ App ~ data:', data)

  return (
    <div className="container">
      <h1 className="text-secondary1_light1 mt-10 text-3xl font-bold underline">
        Điện Thoại iPhone 11 128GB - Hàng Nhập Khẩu
      </h1>
    </div>
  )
}

export default App
