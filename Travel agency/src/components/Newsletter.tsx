import React, { useState } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <section className="relative py-16 md:py-24">
      {/* Plus grid on bottom right */}
      <div className="absolute right-4 md:right-12 bottom-6 pointer-events-none opacity-40">
        <svg width="80" height="70" viewBox="0 0 80 70" fill="none">
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 5 }).map((_, c) => (
              <rect
                key={`${r}-${c}`}
                x={c * 18}
                y={r * 18}
                width="3.5"
                height="3.5"
                rx="1"
                className={c === 2 && r === 2 ? 'fill-[#DF6951]' : 'fill-[#DF6951]/40'}
              />
            ))
          )}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        {/* Lavender Curved Card */}
        <div 
          className="relative rounded-[24px] sm:rounded-[36px] md:rounded-tl-[120px] p-8 sm:p-14 md:p-20 overflow-hidden text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(223, 215, 249, 0.4) 0%, rgba(223, 215, 249, 0.2) 100%)',
            border: '1px solid rgba(223, 215, 249, 0.6)'
          }}
        >
          {/* Subtle interior decorative contour curves */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1000 400" fill="none">
              <path
                d="M-100 200 C200 400 400 100 700 300 C900 400 1100 100 1200 200"
                stroke="#8A79DF"
                strokeWidth="1.5"
              />
              <path
                d="M-50 150 C250 350 450 50 750 250 C950 350 1150 50 1250 150"
                stroke="#8A79DF"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* Floating Paper Airplane Icon on Top Right */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#747DEF] to-[#59B1E6] flex items-center justify-center text-white shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-300">
            <Send className="w-6 h-6 sm:w-7 sm:h-7 text-white transform -translate-x-0.5 translate-y-0.5" />
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#5E6282] max-w-2xl mx-auto leading-relaxed mb-10 relative z-10">
            Subscribe to get information, latest news and other interesting offers about Jadoo
          </h2>

          {/* Form */}
          {isSubscribed ? (
            <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-md border border-emerald-200 text-emerald-700 animate-fadeIn relative z-10">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              <div className="text-left">
                <p className="font-bold text-sm">Thank you for subscribing!</p>
                <p className="text-xs text-gray-500">You will receive our latest travel offers and discounts.</p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto relative z-10"
            >
              <div className="relative w-full sm:flex-1">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Your email"
                  className="w-full pl-12 pr-4 py-4 rounded-[10px] bg-white border border-gray-100 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#DF6951] shadow-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#FF946D] to-[#FF7D68] hover:from-[#f38157] hover:to-[#eb6a54] text-white font-medium text-base rounded-[10px] shadow-btn transition-all duration-300 transform hover:-translate-y-0.5 flex-shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}

          {error && (
            <p className="text-rose-500 text-xs mt-3 font-medium relative z-10">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

