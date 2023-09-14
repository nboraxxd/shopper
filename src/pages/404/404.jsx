import { PATH } from '@/config'
import { Link } from 'react-router-dom'

export default function Page404() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
            {/* Icon */}
            <div className="font-size-h1 mb-7">🙁</div>
            {/* Heading */}
            <h2 className="mb-5">404. Trang không tồn tại.</h2>
            {/* Text */}
            <p className="mb-7 text-gray-500">Xin lỗi, trang bạn đang tìm kiếm không tồn tại! </p>
            {/* Button */}
            <Link to={PATH.homePage} className="btn btn-dark">
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
