import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import AdminLayout from './admin/AdminLayout';
import SectionEditor from './admin/SectionEditor';
import Dashboard from './admin/Dashboard';
import './App.css';

import Connect from './components/Connect/Connect';

const Home = () => (
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

const ConnectPage = () => (
  <div className="app">
    <Navbar />
    <Connect />
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connect" element={<ConnectPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="edit/:sectionId" element={<SectionEditor />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
