import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Users, CheckCircle2, Plane } from 'lucide-react';
import { DestinationItem } from '../data/travelData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDestination?: DestinationItem | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedDestination,
}) => {
  const [destination, setDestination] = useState('Rome, Italy');
  const [date, setDate] = useState('2026-12-15');
  const [passengers, setPassengers] = useState(2);
  const [cabinClass, setCabinClass] = useState('Economy');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (selectedDestination) {
      setDestination(selectedDestination.name);
    }
  }, [selectedDestination]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white rounded-[28px] overflow-hidden shadow-2xl border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#181E4B] to-[#252C6A] p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#DF6951] flex items-center justify-center text-white">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold">Book Your Adventure</h3>
              <p className="text-xs text-gray-300">Fast & seamless trip reservation with Jadoo</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {isSuccess ? (
          <div className="p-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#14183E] mb-2">Booking Confirmed!</h4>
            <p className="text-sm text-[#5E6282] max-w-xs mb-6">
              Your travel reservation for <span className="font-bold text-[#14183E]">{destination}</span> has been confirmed. A confirmation packet has been emailed to you.
            </p>
            <div className="px-4 py-2 bg-gray-50 rounded-lg text-xs font-semibold text-gray-500">
              Booking Ref: #JD-{Math.floor(100000 + Math.random() * 900000)}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Destination Selection */}
            <div>
              <label className="block text-xs font-bold text-[#14183E] uppercase tracking-wider mb-2">
                Destination
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
                >
                  <option value="Rome, Italy">Rome, Italy (10 Days - $5,42k)</option>
                  <option value="London, UK">London, UK (12 Days - $4.2k)</option>
                  <option value="Full Europe">Full Europe (28 Days - $15k)</option>
                  <option value="Santorini, Greece">Santorini, Greece (15 Days - $6.8k)</option>
                  <option value="Tokyo, Japan">Tokyo, Japan (14 Days - $7.5k)</option>
                </select>
              </div>
            </div>

            {/* Travel Date */}
            <div>
              <label className="block text-xs font-bold text-[#14183E] uppercase tracking-wider mb-2">
                Departure Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
                  required
                />
              </div>
            </div>

            {/* Passengers & Class Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#14183E] uppercase tracking-wider mb-2">
                  Passengers
                </label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Person' : 'People'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14183E] uppercase tracking-wider mb-2">
                  Class
                </label>
                <select
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#DF6951]"
                >
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business">Business</option>
                  <option value="First Class">First Class</option>
                </select>
              </div>
            </div>

            {/* Price Preview Card */}
            <div className="p-4 bg-orange-50/60 rounded-xl border border-orange-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 font-medium">Estimated Total:</span>
                <div className="text-xl font-bold text-[#DF6951]">
                  ${(passengers * 1450).toLocaleString()} <span className="text-xs font-normal text-gray-500">incl. taxes</span>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-[#F1A501]/20 text-[#b57a00] rounded-full">
                Instant Guarantee
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#DF6951] hover:bg-[#cf5b44] text-white font-bold text-base rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Confirm Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

