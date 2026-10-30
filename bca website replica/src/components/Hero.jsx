import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Hero() {
  return (
    <section className="hero-section">
      <Swiper
        className="heroSwiper"
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        loop={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
      >
        {/* Slide 1 */}
        <SwiperSlide className="hero-slide" style={{ backgroundImage: "url('/assets/images/hero1.jpg')" }}>
          <div className="overlay"></div>
          <div className="container">
            <div className="hero-content">
              <span className="badge bg-warning text-dark">RV UNIVERSITY</span>
              <h1>
                Department of <span>Computer Applications</span>
              </h1>
              <p>
                Empowering students with innovation, technology, research, entrepreneurship and industry-ready
                computing skills.
              </p>
              <div className="hero-buttons">
                <a href="#about" className="btn btn-gold ripple">
                  Explore Department
                </a>
                <a href="#faculty" className="btn btn-outline-light">
                  Meet Faculty
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className="hero-slide" style={{ backgroundImage: "url('/assets/images/hero2.jpg')" }}>
          <div className="overlay"></div>
          <div className="container">
            <div className="hero-content">
              <h1>
                Future Ready <span>Computing Education</span>
              </h1>
              <p>
                Artificial Intelligence, Data Science, Cyber Security, Cloud Computing &amp; Software Engineering.
              </p>
              <a href="#programs" className="btn btn-warning">
                View Programs
              </a>
            </div>
          </div>
        </SwiperSlide>

        <div className="swiper-pagination"></div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </Swiper>
    </section>
  );
}
