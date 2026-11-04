import React, { useState } from 'react';
import { 
  Compass, 
  CreditCard, 
  Plane, 
  MapPin, 
  Heart, 
  Send, 
  Building2, 
  Calendar
} from 'lucide-react';

interface BookingStepsProps {
  onOpenBooking: () => void;
}

export const BookingSteps: React.FC<BookingStepsProps> = ({ onOpenBooking }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(24);

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  const steps = [
    {
      icon: <Compass className="w-6 h-6 text-white" />,
      bgColor: 'bg-[#F1A501]',
      title: 'Choose Destination',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.',
    },
    {
      icon: <CreditCard className="w-6 h-6 text-white" />,
      bgColor: 'bg-[#DF6951]',
      title: 'Make Payment',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.',
    },
    {
      icon: <Plane className="w-6 h-6 text-white" />,
      bgColor: 'bg-[#006380]',
      title: 'Reach Airport on Selected Date',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus.',
    },
  ];

  return (
    <section id="bookings" className="relative py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8 items-center">
          
          {/* Left Column: Steps */}
          <div className="lg:col-span-6">
            <span className="text-[#5E6282] font-semibold text-sm md:text-base uppercase tracking-widest block mb-2">
              Easy and Fast
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#14183E] leading-tight mb-8">
              Book Your Next Trip In 3 Easy Steps
            </h2>

            <div className="flex flex-col gap-8">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-5 group cursor-pointer" onClick={onOpenBooking}>
                  {/* Step Icon Badge */}
                  <div
                    className={`w-12 h-12 rounded-xl ${step.bgColor} flex-shrink-0 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 mt-1`}
                  >
                    {step.icon}
                  </div>

                  {/* Step Description */}
                  <div>
                    <h3 className="font-bold text-base text-[#5E6282] group-hover:text-[#181E4B] transition-colors mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#5E6282] leading-relaxed max-w-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Layered Greece & Rome Cards */}
          <div className="lg:col-span-6 relative flex justify-center items-center py-6">
            {/* Ambient Cyan Glow backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[450px] h-[340px] sm:h-[450px] rounded-full bg-[#59B1E6]/25 blur-3xl pointer-events-none -z-10" />

            {/* Main "Trip to Greece" Card */}
            <div className="relative w-full max-w-[370px] bg-white rounded-[26px] p-6 shadow-card hover:shadow-2xl transition-all duration-300 border border-gray-100 z-10">
              {/* Image */}
              <div className="w-full h-44 rounded-2xl overflow-hidden mb-6 relative group">
                <img
                  src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=700&q=80"
                  alt="Trip to Greece"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full text-[#DF6951]">
                  Upcoming
                </span>
              </div>

              {/* Title & Date */}
              <h3 className="text-lg font-bold text-[#14183E] mb-1">
                Trip To Greece
              </h3>
              <p className="text-sm text-[#84829A] mb-5 font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                14-29 June | by Robbin joseph
              </p>

              {/* Action Icons */}
              <div className="flex items-center gap-4 mb-6">
                <button
                  aria-label="Eco-friendly option"
                  className="w-9 h-9 rounded-full bg-[#F5F5F5] hover:bg-emerald-50 text-[#84829A] hover:text-emerald-600 flex items-center justify-center transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                </button>
                <button
                  aria-label="Map route"
                  className="w-9 h-9 rounded-full bg-[#F5F5F5] hover:bg-sky-50 text-[#84829A] hover:text-sky-600 flex items-center justify-center transition-colors"
                >
                  <Compass className="w-4 h-4" />
                </button>
                <button
                  aria-label="Send itinerary"
                  className="w-9 h-9 rounded-full bg-[#F5F5F5] hover:bg-purple-50 text-[#84829A] hover:text-purple-600 flex items-center justify-center transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Footer Row */}
              <div className="flex items-center justify-between text-sm text-[#84829A] font-medium pt-2 border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#84829A]" />
                  <span>{likesCount} people going</span>
                </div>
                <button
                  onClick={handleLike}
                  className="p-1 hover:scale-125 transition-transform cursor-pointer focus:outline-none"
                  aria-label="Like trip"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      isLiked ? 'fill-[#DF6951] text-[#DF6951]' : 'text-[#84829A] hover:text-[#DF6951]'
                    }`}
                  />
                </button>
              </div>

              {/* Floating Overlapping "Ongoing - Trip to Rome" Card */}
              <div className="absolute -bottom-8 -right-4 sm:-right-12 sm:bottom-12 w-64 sm:w-68 bg-white rounded-2xl p-4 shadow-2xl border border-gray-100 flex items-start gap-3.5 z-20 animate-float-slow">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-amber-300">
                  <img
                    src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=200&q=80"
                    alt="Rome Colosseum"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-[#84829A] font-medium block">
                    Ongoing
                  </span>
                  <h4 className="font-bold text-sm text-[#14183E] mb-2">
                    Trip to rome
                  </h4>
                  <div className="flex items-center justify-between text-xs font-semibold text-[#14183E] mb-1.5">
                    <span className="text-[#8A79DF]">40% completed</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#8A79DF] h-full rounded-full transition-all duration-1000"
                      style={{ width: '40%' }}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
