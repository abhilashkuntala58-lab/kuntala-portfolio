import React from 'react';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import About from './components/About';
import Showreels from './components/Showreels';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FuturisticScene from './components/FuturisticScene';
import CustomCursor from './components/CustomCursor';
import './App.css';

export default function App() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-[#ff6b00] selection:text-black relative">
      <CustomCursor />
      <FuturisticScene />
      <Navbar />
      <main className="relative z-10">
        <Hero3D />
        <About />
        <Showreels />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
