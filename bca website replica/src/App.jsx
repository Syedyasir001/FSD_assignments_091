import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Loader from './components/Loader';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Hod from './components/Hod';
import About from './components/About';
import VisionMission from './components/VisionMission';
import Programs from './components/Programs';
import Faculty from './components/Faculty';
import Labs from './components/Labs';
import Research from './components/Research';
import Placements from './components/Placements';
import Recruiters from './components/Recruiters';
import Achievements from './components/Achievements';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Downloads from './components/Downloads';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      offset: 100
    });
  }, []);

  return (
    <>
      <Loader />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Hod />
        <About />
        <VisionMission />
        <Programs />
        <Faculty />
        <Labs />
        <Research />
        <Placements />
        <Recruiters />
        <Achievements />
        <Events />
        <Gallery />
        <Downloads />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
