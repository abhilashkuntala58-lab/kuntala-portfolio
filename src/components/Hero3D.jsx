import React, { useState } from 'react';
import { Play, Sparkles, ArrowRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Hero3D() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden bg-transparent"
    >
      {/* Subtle Mouse-responsive Orange Light */}
      <div
        className="absolute w-[500px] h-[500px] bg-[#ff6b00]/15 rounded-full blur-[140px] pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: `calc(50% + ${mousePos.x * 100}px)`,
          top: `calc(50% + ${mousePos.y * 100}px)`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div className="absolute top-1/4 right-10 w-[350px] h-[350px] bg-[#ff3300]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Side: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass-card border border-[#ff6b00]/30 mb-6 shadow-[0_0_20px_rgba(255,107,0,0.25)]">
            <Sparkles className="w-4 h-4 text-[#ff6b00]" />
            <span className="text-xs font-semibold text-[#ff6b00] tracking-widest uppercase">
              {personalInfo.location}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            CINEMATIC <br />
            <span className="bg-gradient-to-r from-[#ff6b00] via-[#ff8c00] to-[#ff3300] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,107,0,0.5)]">
              VISUAL MASTERPIECES
            </span>
          </h1>

          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-wide">{personalInfo.name}</h2>
            <p className="text-sm sm:text-base text-[#ff6b00] font-semibold tracking-wider uppercase">
              {personalInfo.title}
            </p>
          </div>

          <p className="text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
            {personalInfo.about}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#showreels"
              className="px-8 py-4 rounded-full liquid-glass-button text-black font-extrabold text-sm tracking-wider flex items-center gap-3"
            >
              <Play className="w-4 h-4 fill-black" />
              WATCH SHOWREELS
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full liquid-glass-card text-white font-semibold text-sm tracking-wider flex items-center gap-3 hover:border-[#ff6b00]/50 transition-all"
            >
              HIRE ME
              <ArrowRight className="w-4 h-4 text-[#ff6b00]" />
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-white/10 w-full">
            <div>
              <span className="block text-3xl font-extrabold text-[#ff6b00] drop-shadow-[0_0_15px_rgba(255,107,0,0.5)]">3+</span>
              <span className="text-xs text-gray-400 tracking-wider uppercase">Years Exp.</span>
            </div>
            <div>
              <span className="block text-3xl font-extrabold text-[#ff6b00] drop-shadow-[0_0_15px_rgba(255,107,0,0.5)]">10+</span>
              <span className="text-xs text-gray-400 tracking-wider uppercase">Showreel Slots</span>
            </div>
            <div>
              <span className="block text-3xl font-extrabold text-[#ff6b00] drop-shadow-[0_0_15px_rgba(255,107,0,0.5)]">100%</span>
              <span className="text-xs text-gray-400 tracking-wider uppercase">AI & Post-Prod</span>
            </div>
          </div>
        </div>

        {/* Right Side: Photograph with Liquid Glass Frame */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-8 w-full">
          <div className="relative w-full max-w-[450px] h-[450px] lg:h-[580px] flex justify-center items-center liquid-glass-card rounded-3xl p-4 overflow-hidden border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff6b00]/10 via-transparent to-white/5 pointer-events-none" />
            <img
              src="/images/hero.jpeg"
              alt={personalInfo.name}
              className="w-full h-full object-cover rounded-2xl block relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
