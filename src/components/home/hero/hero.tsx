import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import { HERO_SLIDES } from '@/constants'
import 'swiper/css'
import 'swiper/css/pagination'

export default function Hero() {
  return (
    <Swiper
      className="mySwiper"
      loop={true}
      slidesPerView={1}
      spaceBetween={20}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
    >
      {HERO_SLIDES.map((slide, index) => (
        <SwiperSlide key={index} className="relative w-full pt-[26%]">
          <Link to={slide.to}>
            <img src={slide.img} alt={slide.alt} className="absolute left-0 top-0 size-full rounded-3xl object-cover" />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
