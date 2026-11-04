import React from 'react';
import { Play } from 'lucide-react';

interface HeroProps {
  onOpenPlayDemo: () => void;
  onExploreMore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPlayDemo, onExploreMore }) => {
  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
      {/* Ambient background glow & blobs */}
      <div 
        className="absolute top-0 right-0 -z-10 w-[450px] md:w-[700px] h-[450px] md:h-[650px] rounded-full opacity-60 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,241,218,1) 0%, rgba(255,241,218,0.7) 50%, rgba(255,255,255,0) 80%)'
        }}
      />
      <div 
        className="absolute -top-24 -right-24 -z-10 w-96 h-96 rounded-full bg-[#DFD7F9]/30 blur-2xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 z-10 text-center lg:text-left">
          {/* Subtitle */}
          <span className="inline-block text-[#DF6951] font-bold text-xs sm:text-sm md:text-base tracking-widest uppercase mb-4">
            Best Destinations around the world
          </span>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-[76px] font-bold font-serif text-[#181E4B] leading-[1.12] tracking-tight mb-7">
            Travel,{' '}
            <span className="relative inline-block">
              <span className="relative z-10">enjoy</span>
              {/* Hand-drawn style orange brush underline */}
              <svg
                className="absolute -bottom-1 md:-bottom-2.5 left-0 w-full h-auto text-[#DF6951] z-0 pointer-events-none"
                viewBox="0 0 385 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 17.5C118.5 4.5 282.5 -0.5 382 14.5"
                  stroke="#DF6951"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            and live a new and full life
          </h1>

          {/* Description */}
          <p className="text-[#5E6282] text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 mb-9 font-medium">
            Built Wicket longer admire do barton vanity itself do in it. Preferred to sportsmen it engrossed listening. Park gate sell they west hard for the.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8">
            <button
              onClick={onExploreMore}
              className="px-8 py-4 bg-[#F1A501] hover:bg-[#e09900] text-white font-medium text-base rounded-[10px] shadow-btn transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
            >
              Find out more
            </button>

            <button
              onClick={onOpenPlayDemo}
              className="flex items-center gap-4 group cursor-pointer focus:outline-none"
            >
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#DF6951] flex items-center justify-center text-white shadow-play group-hover:scale-105 group-hover:bg-[#d05942] transition-all duration-300">
                <Play className="w-5 h-5 fill-white ml-1 text-white" />
              </div>
              <span className="text-[#686D77] group-hover:text-[#181E4B] font-medium text-base transition-colors">
                Play Demo
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Hero Visual Illustration */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          {/* Subtle curved dotted airplane paths */}
          <svg
            className="absolute -top-12 -left-12 w-64 h-64 pointer-events-none opacity-40 z-0"
            viewBox="0 0 200 200"
            fill="none"
          >
            <path
              d="M10 180 C 40 100, 120 50, 190 20"
              stroke="#4a79ff"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
          </svg>

          {/* Airplane 1 (Top Left) */}
          <div className="absolute -top-4 -left-4 sm:left-2 z-20 animate-float-slow">
            <svg
              className="w-12 h-12 text-[#248eff] transform -rotate-45 drop-shadow-md"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>

          {/* Airplane 2 (Top Right) */}
          <div className="absolute top-12 -right-4 sm:right-0 z-20 animate-float-fast">
            <svg
              className="w-10 h-10 text-[#4285F4] transform rotate-12 drop-shadow-md"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>

          {/* Hero Visual Container */}
          <div className="relative w-full max-w-[480px] z-10 flex justify-center">
            {/* Background organic shape */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-100/50 via-orange-100/40 to-transparent rounded-[40px] transform rotate-3 scale-95 -z-10" />

            {/* Main traveler character composition */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-b from-sky-50 via-amber-50/30 to-orange-50/50 group">
              <img
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=80"
                alt="Traveler enjoying vacation with backpack and suitcase"
                className="w-full h-[460px] sm:h-[520px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating badges on image */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-lg flex items-center gap-3 border border-white/50">
                <span className="text-xl">✈️</span>
                <div>
                  <div className="text-xs text-gray-500 font-medium">Explore 100+</div>
                  <div className="text-sm font-bold text-[#181E4B]">Top Destinations</div>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-lg flex items-center gap-3 border border-white/50">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-bold text-sm">
                  ★
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">Customer Rating</div>
                  <div className="text-sm font-bold text-[#181E4B]">4.9 / 5.0 (2.4k)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

