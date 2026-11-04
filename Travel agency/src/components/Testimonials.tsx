import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { testimonialsData } from '../data/travelData';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const current = testimonialsData[currentIndex];
  const nextItem = testimonialsData[(currentIndex + 1) % testimonialsData.length];

  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Pagination Dots */}
          <div className="lg:col-span-5">
            <span className="text-[#5E6282] font-semibold text-sm md:text-base uppercase tracking-widest block mb-2">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#14183E] leading-tight mb-12">
              What People Say About Us.
            </h2>

            {/* Pagination Dots */}
            <div className="flex items-center gap-3.5">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === idx
                      ? 'w-3.5 h-3.5 bg-[#181E4B] scale-110'
                      : 'w-3 h-3 bg-[#E5E5E5] hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Stacked Testimonial Cards & Navigation */}
          <div className="lg:col-span-7 flex items-center justify-center lg:justify-end gap-6 sm:gap-10">
            
            {/* Stacked Cards Area */}
            <div className="relative w-full max-w-[500px] min-h-[300px]">
              
              {/* Background Card (Shadow / Next Preview) */}
              <div 
                onClick={handleNext}
                className="absolute top-16 left-8 sm:left-12 right-0 bg-transparent border-2 border-[#F7F7F7] rounded-[24px] p-8 -z-0 cursor-pointer hover:border-gray-300 transition-all shadow-sm"
              >
                <div className="opacity-40">
                  <p className="text-[#5E6282] text-sm leading-relaxed mb-6 italic line-clamp-2">
                    {nextItem.quote}
                  </p>
                  <h4 className="font-bold text-base text-[#5E6282]">
                    {nextItem.name}
                  </h4>
                  <p className="text-xs text-[#5E6282] font-medium">
                    {nextItem.location}
                  </p>
                </div>
              </div>

              {/* Front Main Card */}
              <div className="relative bg-white rounded-[24px] p-7 sm:p-9 shadow-card border border-gray-50 z-10 transition-all duration-300">
                {/* Floating Avatar Overlapping Top-Left Edge */}
                <div className="absolute -top-7 -left-7 w-16 h-16 rounded-full overflow-hidden border-3 border-white shadow-lg bg-gray-100">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Quote Text */}
                <p className="text-[#5E6282] text-sm sm:text-base leading-relaxed font-medium mb-8 pt-2">
                  {current.quote}
                </p>

                {/* Author Info */}
                <div>
                  <h3 className="font-bold text-lg text-[#5E6282]">
                    {current.name}
                  </h3>
                  <p className="text-sm text-[#5E6282] font-medium">
                    {current.location}
                  </p>
                </div>
              </div>

            </div>

            {/* Vertical Up / Down Arrow Controls */}
            <div className="flex flex-col gap-8 flex-shrink-0">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="p-2 text-gray-400 hover:text-[#181E4B] hover:scale-110 transition-all focus:outline-none"
              >
                <ChevronUp className="w-5 h-5 stroke-[2.5]" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="p-2 text-[#181E4B] hover:scale-110 transition-all focus:outline-none"
              >
                <ChevronDown className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

