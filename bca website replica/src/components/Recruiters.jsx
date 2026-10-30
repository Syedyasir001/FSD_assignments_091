import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function Recruiters() {
  const logos = [
    { src: '/assets/logos/tcs.png', alt: 'TCS' },
    { src: '/assets/logos/infosys.png', alt: 'Infosys' },
    { src: '/assets/logos/wipro.png', alt: 'Wipro' },
    { src: '/assets/logos/accenture.png', alt: 'Accenture' },
    { src: '/assets/logos/ibm.png', alt: 'IBM' },
    { src: '/assets/logos/microsoft.png', alt: 'Microsoft' },
  ];

  return (
    <section className="recruiters py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title">Our Recruiting Partners</h2>
        </div>

        <Swiper
          className="recruiterSwiper"
          modules={[Autoplay]}
          slidesPerView={5}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 15 },
            576: { slidesPerView: 3, spaceBetween: 20 },
            992: { slidesPerView: 5, spaceBetween: 30 }
          }}
        >
          {logos.map((logo, idx) => (
            <SwiperSlide key={idx} className="company-logo">
              <img src={logo.src} alt={logo.alt} loading="lazy" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
