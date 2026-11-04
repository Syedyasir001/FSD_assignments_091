import React from 'react';

export const Partners: React.FC = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-wrap items-center justify-between gap-8 md:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          
          {/* Axon */}
          <div className="h-12 flex items-center justify-center px-4 hover:scale-105 transition-transform duration-300">
            <span className="font-bold text-2xl tracking-tighter text-gray-700 hover:text-black">
              axon
            </span>
          </div>

          {/* Jetstar */}
          <div className="h-12 flex items-center justify-center px-4 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center text-2xl font-bold tracking-tight text-gray-800">
              <span>Jetstar</span>
              <span className="text-[#DF6951] text-3xl ml-0.5 leading-none">★</span>
            </div>
          </div>

          {/* Expedia (Highlighted in design with white card/shadow) */}
          <div className="h-14 flex items-center justify-center px-8 bg-white rounded-2xl shadow-md border border-gray-100 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#00355f] flex items-center justify-center text-white text-xs font-bold">
                ✈
              </div>
              <span className="font-bold text-2xl text-[#00355f] tracking-tight">
                Expedia
              </span>
            </div>
          </div>

          {/* Qantas */}
          <div className="h-12 flex items-center justify-center px-4 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-widest text-[#E40000]">
                QANTAS
              </span>
            </div>
          </div>

          {/* Alitalia */}
          <div className="h-12 flex items-center justify-center px-4 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-2xl italic tracking-tight text-[#006643]">
                Alitalia
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

