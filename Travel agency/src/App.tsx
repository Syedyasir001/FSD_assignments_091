import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Destinations } from './components/Destinations';
import { BookingSteps } from './components/BookingSteps';
import { Testimonials } from './components/Testimonials';
import { Partners } from './components/Partners';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { BookingModal } from './components/BookingModal';
import { AuthModal } from './components/AuthModal';
import { DestinationItem } from './data/travelData';

export const App: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<DestinationItem | null>(null);

  const handleSelectDestination = (dest: DestinationItem) => {
    setSelectedDestination(dest);
    setIsBookingOpen(true);
  };

  const handleExploreMore = () => {
    const el = document.getElementById('destinations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFCFA] relative overflow-x-hidden selection:bg-[#DF6951] selection:text-white">
      {/* Navbar */}
      <Navbar
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenLogin={() => setIsAuthOpen(true)}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenPlayDemo={() => setIsVideoOpen(true)}
          onExploreMore={handleExploreMore}
        />

        {/* Category / Services Section */}
        <Services />

        {/* Top Selling Destinations */}
        <Destinations onSelectDestination={handleSelectDestination} />

        {/* 3 Easy Steps Booking Section */}
        <BookingSteps onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Testimonials */}
        <Testimonials />

        {/* Partner Airline Logos */}
        <Partners />

        {/* Newsletter Subscription Banner */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedDestination={selectedDestination}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
};

export default App;

