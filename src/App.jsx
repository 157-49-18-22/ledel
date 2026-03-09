import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import Industries from './components/Industries/Industries';
import Products from './components/Products/Products';
import TechFlow from './components/TechFlow/TechFlow';
import QualitySection from './components/QualitySection/QualitySection';
import Certification from './components/Certification/Certification';
import CTA from './components/CTA/CTA';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Products />
      <TechFlow />
      <QualitySection />
      <Services />
      <Industries />
      <Certification />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
