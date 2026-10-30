import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Ananya Sharma',
      role: 'BCA Graduate',
      image: '/assets/images/student1.jpg',
      quote: 'The department provided excellent technical exposure, industry training, and supportive faculty guidance.'
    },
    {
      name: 'Rahul Verma',
      role: 'Software Engineer',
      image: '/assets/images/student2.jpg',
      quote: 'Modern laboratories and practical learning helped me build confidence for my professional career.'
    },
    {
      name: 'Priya Patel',
      role: 'Cloud Analyst',
      image: '/assets/images/student3.jpg',
      quote: 'The experiential learning and hackathon culture pushed us to build real solutions for complex problems.'
    }
  ];

  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">STUDENT VOICES</span>
          <h2 className="section-title">Testimonials</h2>
        </div>

        <Swiper
          className="testimonialSwiper"
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 }
          }}
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div className="testimonial-card text-center h-100">
                <img src={t.image} alt={t.name} loading="lazy" />
                <p>"{t.quote}"</p>
                <h5>{t.name}</h5>
                <span>{t.role}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
