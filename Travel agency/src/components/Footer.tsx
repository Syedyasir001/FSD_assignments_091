import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative pt-16 pb-12 overflow-hidden bg-transparent">
      {/* Ambient pink/purple glow bottom right */}
      <div 
        className="absolute bottom-0 right-0 w-[450px] h-[350px] rounded-full opacity-60 blur-3xl pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(213, 98, 222, 0.15) 0%, rgba(138, 121, 223, 0.1) 50%, rgba(255, 255, 255, 0) 80%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-3">
            <a href="#" className="inline-block mb-4">
              <span className="text-4xl font-bold font-serif tracking-tight text-[#181E4B]">
                Jadoo.
              </span>
            </a>
            <p className="text-[#5E6282] text-sm leading-relaxed max-w-xs font-medium">
              Book your trip in minute, get full Control for much longer.
            </p>
          </div>

          {/* Column 2: Company */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-lg text-[#080809] mb-6">
              Company
            </h4>
            <ul className="flex flex-col gap-3 text-base text-[#5E6282]">
              <li>
                <a href="#about" className="hover:text-[#DF6951] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-[#DF6951] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#mobile" className="hover:text-[#DF6951] transition-colors">
                  Mobile
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-lg text-[#080809] mb-6">
              Contact
            </h4>
            <ul className="flex flex-col gap-3 text-base text-[#5E6282]">
              <li>
                <a href="#faq" className="hover:text-[#DF6951] transition-colors">
                  Help/FAQ
                </a>
              </li>
              <li>
                <a href="#press" className="hover:text-[#DF6951] transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#affiliates" className="hover:text-[#DF6951] transition-colors">
                  Affiliates
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: More */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-lg text-[#080809] mb-6">
              More
            </h4>
            <ul className="flex flex-col gap-3 text-base text-[#5E6282]">
              <li>
                <a href="#fees" className="hover:text-[#DF6951] transition-colors">
                  Airlinefees
                </a>
              </li>
              <li>
                <a href="#airline" className="hover:text-[#DF6951] transition-colors">
                  Airline
                </a>
              </li>
              <li>
                <a href="#tips" className="hover:text-[#DF6951] transition-colors">
                  Low fare tips
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Social Media & App Downloads */}
          <div className="lg:col-span-3 flex flex-col items-start">
            {/* Social Icons with shadows */}
            <div className="flex items-center gap-4 mb-6">
              {/* Facebook */}
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#080809] hover:text-[#DF6951] hover:scale-110 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#B8D2F1] via-[#F289AA] to-[#C68BF0] shadow-md flex items-center justify-center text-white hover:scale-110 transition-all"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Twitter */}
              <a
                href="#twitter"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#080809] hover:text-[#DF6951] hover:scale-110 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/>
                </svg>
              </a>
            </div>

            <p className="text-[#5E6282] text-lg font-medium tracking-tight mb-3">
              Discover our app
            </p>

            {/* App Store & Google Play Badges */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Google Play */}
              <a
                href="#playstore"
                className="flex items-center gap-2 bg-[#080809] text-white px-3.5 py-2 rounded-full hover:bg-gray-800 transition-colors shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a1.99 1.99 0 0 1-.61-1.436V3.25c0-.55.226-1.047.609-1.436zm11.233 11.234l2.423 2.423-11.83 6.83 9.407-9.253zm2.423-2.096l3.35 1.935c.81.468.81 1.23 0 1.698l-3.35 1.935-2.73-2.73 2.73-2.838zm-2.423-1.048L5.435 3.522l11.83 6.83-2.423 2.423z"/>
                </svg>
                <div className="text-left leading-none">
                  <div className="text-[8px] uppercase tracking-wider font-semibold text-gray-300">Get it on</div>
                  <div className="text-[11px] font-bold">GOOGLE PLAY</div>
                </div>
              </a>

              {/* Apple App Store */}
              <a
                href="#appstore"
                className="flex items-center gap-2 bg-[#080809] text-white px-3.5 py-2 rounded-full hover:bg-gray-800 transition-colors shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.94-2.93-.91.04-2.02.61-2.67 1.38-.57.66-.99 1.76-.86 2.81 1.02.08 2.05-.55 2.59-1.26z"/>
                </svg>
                <div className="text-left leading-none">
                  <div className="text-[8px] uppercase tracking-wider font-semibold text-gray-300">Available on the</div>
                  <div className="text-[11px] font-bold">Apple Store</div>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="text-center pt-8 border-t border-gray-100">
          <p className="text-sm text-[#5E6282] font-medium">
            All rights reserved@jadoo.co
          </p>
        </div>
      </div>
    </footer>
  );
};
