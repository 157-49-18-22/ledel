import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import Industries from './components/Industries/Industries';
import Products from './components/Products/Products';
import TechFlow from './components/TechFlow/TechFlow';

import Certification from './components/Certification/Certification';
import CTA from './components/CTA/CTA';
import Footer from './components/Footer/Footer';
import ScrollReveal from './components/ScrollReveal/ScrollReveal';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />

      <ScrollReveal direction="right">
        <Products />
      </ScrollReveal>

      <ScrollReveal direction="left">
        <TechFlow />
      </ScrollReveal>

      <ScrollReveal direction="right">
        <Services />
      </ScrollReveal>

      <ScrollReveal direction="left">
        <Industries />
      </ScrollReveal>

      <ScrollReveal direction="right">
        <Certification />
      </ScrollReveal>

      <ScrollReveal direction="left">
        <CTA />
      </ScrollReveal>

      <Footer />
    </div>
  );
}

export default App;
