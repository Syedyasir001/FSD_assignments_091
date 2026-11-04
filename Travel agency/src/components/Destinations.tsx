import React from 'react';
import { Navigation } from 'lucide-react';
import { destinationsData, DestinationItem } from '../data/travelData';

interface DestinationsProps {
  onSelectDestination: (dest: DestinationItem) => void;
}

export const Destinations: React.FC<DestinationsProps> = ({ onSelectDestination }) => {
  return (
    <section id="destinations" className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        {/* Decorative Spring / Spiral sketch on right */}
        <div className="hidden lg:block absolute -right-6 bottom-16 pointer-events-none opacity-40 z-0">
          <svg width="96" height="252" viewBox="0 0 96 252" fill="none">
            <path
              d="M78.5 2C101.5 22 98.5 48.5 68 62.5C29.875 80 -1.5 98.5 25.5 128C52.5 157.5 83 177 52.5 204C22 231 1 247.5 45.5 249"
              stroke="#8A79DF"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>
        </div>

        {/* Section Header */}
        <div className="text-center mb-14 md:mb-16">
          <span className="text-[#5E6282] font-semibold text-sm md:text-base uppercase tracking-widest block mb-2">
            Top Selling
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#14183E]">
            Top Destinations
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 relative z-10">
          {destinationsData.map((dest) => (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest)}
              className="bg-white rounded-[24px] overflow-hidden shadow-card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col group border border-gray-100/80"
            >
              {/* Image Container */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-gray-100">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#DF6951]">
                  Featured
                </div>
              </div>

              {/* Card Content Info */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow bg-white">
                <div className="flex items-center justify-between text-[#5E6282] font-medium text-lg mb-4">
                  <span className="font-semibold text-[#14183E] group-hover:text-[#DF6951] transition-colors">
                    {dest.name}
                  </span>
                  <span>{dest.price}</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3 text-sm text-[#5E6282] font-medium">
                    <Navigation className="w-4 h-4 text-[#14183E] transform rotate-45 fill-current" />
                    <span>{dest.duration}</span>
                  </div>

                  <span className="text-xs font-semibold text-[#DF6951] opacity-0 group-hover:opacity-100 transition-opacity">
                    Book Trip →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

