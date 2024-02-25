import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

export default function Hero() {
  return (
    <Swiper
      className="mySwiper mx-auto h-[460px] w-[1340px] object-cover"
      loop={true}
      slidesPerView={1}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
    >
      <SwiperSlide
        style={{
          backgroundImage: 'url(/assets/images/cover-4.jfif)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        className=" h-full w-full"
      ></SwiperSlide>
      <SwiperSlide
        style={{
          backgroundImage: 'url(/assets/images/cover-5.jfif)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        className=" h-full w-full"
      ></SwiperSlide>
      <SwiperSlide
        style={{
          backgroundImage: 'url(/assets/images/cover-6.jfif)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        className=" h-full w-full"
      ></SwiperSlide>
      <SwiperSlide
        style={{
          backgroundImage: 'url(/assets/images/cover-7.jfif)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        className=" h-full w-full"
      ></SwiperSlide>
      <SwiperSlide
        style={{
          backgroundImage: 'url(/assets/images/cover-8.jfif)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
        className=" h-full w-full"
      ></SwiperSlide>
    </Swiper>
  )
}
