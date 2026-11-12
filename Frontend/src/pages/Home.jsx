import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LocationSection } from '../components/LocationSection';
import { MenuSection } from '../components/MenuSection';
import { Footer } from '../components/Footer';

export const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <LocationSection />
      <MenuSection />
      <Footer />
    </>
  );
};
