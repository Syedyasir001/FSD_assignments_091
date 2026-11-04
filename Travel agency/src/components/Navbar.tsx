import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Globe } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'ES' | 'FR'>('EN');
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3.5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-1 group">
          <span className="text-3xl font-bold font-serif tracking-tight text-[#181E4B]">
            Jadoo
          </span>
          <span className="w-2 h-2 rounded-full bg-[#DF6951] -ml-0.5 mt-2 transition-transform group-hover:scale-150"></span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-10 text-[15px] font-medium text-[#212832]">
          <a
            href="#destinations"
            className="hover:text-[#DF6951] transition-colors"
          >
            Destinations
          </a>
          <a
            href="#services"
            className="hover:text-[#DF6951] transition-colors"
          >
            Hotels
          </a>
          <a
            href="#services"
            className="hover:text-[#DF6951] transition-colors"
          >
            Flights
          </a>
          <a
            href="#bookings"
            onClick={(e) => {
              e.preventDefault();
              onOpenBooking();
            }}
            className="hover:text-[#DF6951] transition-colors cursor-pointer"
          >
            Bookings
          </a>
          <button
            onClick={onOpenLogin}
            className="hover:text-[#DF6951] transition-colors cursor-pointer font-medium"
          >
            Login
          </button>

          {/* Sign up button */}
          <button
            onClick={onOpenLogin}
            className="px-5 py-2 rounded-lg border border-[#212832] text-[#212832] hover:bg-[#212832] hover:text-white transition-all duration-200"
          >
            Sign up
          </button>

          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 hover:text-[#DF6951] transition-colors text-sm uppercase font-semibold"
            >
              <span>{language}</span>
              <ChevronDown className="w-4 h-4 text-[#212832]" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white rounded-xl shadow-xl py-1 border border-gray-100 z-50">
                {(['EN', 'ES', 'FR'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-1.5 text-sm hover:bg-orange-50 hover:text-[#DF6951] ${
                      language === lang ? 'font-bold text-[#DF6951]' : 'text-gray-700'
                    }`}
                  >
                    {lang === 'EN' ? 'English' : lang === 'ES' ? 'Español' : 'Français'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#212832] hover:text-[#DF6951] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xl px-6 py-6 animate-fadeIn">
          <div className="flex flex-col gap-4 text-base font-medium text-[#212832]">
            <a
              href="#destinations"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#DF6951]"
            >
              Destinations
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#DF6951]"
            >
              Hotels
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#DF6951]"
            >
              Flights
            </a>
            <a
              href="#bookings"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="py-1 hover:text-[#DF6951]"
            >
              Bookings
            </a>
            <hr className="border-gray-100 my-1" />
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="text-left font-medium hover:text-[#DF6951]"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="px-5 py-2 rounded-lg border border-[#212832] text-[#212832] hover:bg-[#212832] hover:text-white text-sm"
              >
                Sign up
              </button>
            </div>
            <div className="pt-2 flex items-center gap-2 text-sm text-gray-500">
              <Globe className="w-4 h-4 text-[#DF6951]" />
              <span>Language:</span>
              {(['EN', 'ES', 'FR'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-2 py-0.5 rounded text-xs ${
                    language === l ? 'bg-[#DF6951] text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

