import React, { useState } from 'react';
import { servicesData } from '../data/travelData';

export const Services: React.FC = () => {
  const [activeCardId, setActiveCardId] = useState<string>('flights');

  const renderIcon = (type: string) => {
    switch (type) {
      case 'radar':
        return (
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Soft decorative background shape */}
            <div className="absolute top-0 right-1 w-10 h-10 bg-amber-200/50 rounded-tr-2xl rounded-bl-xl -z-0" />
            <svg
              className="w-12 h-12 text-[#181E4B] z-10"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 38C12 30 18 24 26 20" stroke="#DF6951" strokeWidth="2.5" />
              <path d="M12 42C18 32 26 26 36 22" stroke="#21B0D8" strokeWidth="2.5" />
              <circle cx="28" cy="18" r="8" fill="#FFF1DA" stroke="#181E4B" strokeWidth="2" />
              <path d="M28 26 L22 42" stroke="#181E4B" strokeWidth="3" />
              <path d="M18 42 L34 42" stroke="#181E4B" strokeWidth="3" />
            </svg>
          </div>
        );
      case 'plane':
        return (
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute top-0 right-1 w-12 h-10 bg-sky-200/50 rounded-tl-2xl rounded-br-xl -z-0" />
            <svg
              className="w-12 h-12 text-[#248eff] z-10 transform -rotate-12"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
        );
      case 'mic':
        return (
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute bottom-1 right-0 w-10 h-10 bg-rose-200/50 rounded-full -z-0" />
            <svg
              className="w-12 h-12 text-[#DF6951] z-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="8" y="2" width="8" height="12" rx="4" fill="#FFF1DA" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="#181E4B" strokeWidth="2.5" />
              <line x1="12" y1="19" x2="12" y2="23" stroke="#181E4B" strokeWidth="2.5" />
              <line x1="8" y1="23" x2="16" y2="23" stroke="#181E4B" strokeWidth="2.5" />
            </svg>
          </div>
        );
      case 'gear':
      default:
        return (
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute top-1 left-1 w-10 h-10 bg-amber-200/50 rounded-2xl -z-0" />
            <svg
              className="w-12 h-12 text-[#181E4B] z-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" fill="#FFF1DA" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="#DF6951" />
            </svg>
          </div>
        );
    }
  };

  return (
    <section id="services" className="relative py-16 md:py-24">
      {/* Decorative Plus Grid top-right */}
      <div className="absolute right-6 md:right-16 top-10 pointer-events-none opacity-40">
        <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
          <g fill="#8A79DF">
            {Array.from({ length: 4 }).map((_, r) =>
              Array.from({ length: 5 }).map((_, c) => (
                <rect
                  key={`${r}-${c}`}
                  x={c * 20}
                  y={r * 20}
                  width="4"
                  height="4"
                  rx="1"
                  className={r === 1 && c === 3 ? 'fill-[#DF6951]' : 'fill-[#8A79DF]'}
                />
              ))
            )}
          </g>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[#5E6282] font-semibold text-sm md:text-base uppercase tracking-widest block mb-2">
            Category
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#14183E]">
            We Offer Best Services
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8 items-stretch pt-6 pb-12">
          {servicesData.map((item) => {
            const isSelected = activeCardId === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveCardId(item.id)}
                className="relative group transition-all duration-300"
              >
                {/* Signature Orange Accent Shape behind bottom-left of active card */}
                {isSelected && (
                  <div
                    className="absolute -bottom-7 -left-7 w-24 h-24 bg-[#DF6951] rounded-tl-[30px] rounded-br-[10px] rounded-tr-[10px] rounded-bl-[10px] -z-10 transition-all duration-300 transform group-hover:scale-105"
                  />
                )}

                {/* Service Card */}
                <div
                  className={`h-full flex flex-col items-center text-center px-7 py-10 rounded-[36px] transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-white shadow-service scale-[1.03] z-10'
                      : 'bg-transparent hover:bg-white hover:shadow-card'
                  }`}
                >
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">{renderIcon(item.icon)}</div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-[#1E1D4C] mb-4">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#5E6282] text-sm leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

