import React from 'react';
import { Film, ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505]/90 backdrop-blur-xl border-t border-white/10 py-12 px-6 text-white relative shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6b00] to-[#ff3300] flex items-center justify-center shadow-[0_0_20px_rgba(255,107,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.4)]">
            <Film className="w-5 h-5 text-black" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-wider text-white">{personalInfo.name}</span>
            <span className="block text-xs text-[#ff6b00] tracking-widest uppercase font-semibold">{personalInfo.title}</span>
          </div>
          </div>

          <div className="text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved. Built with React, Three.js & Tailwind.
          </div>

          <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full liquid-glass-card flex items-center justify-center text-white hover:bg-[#ff6b00] hover:text-black hover:border-[#ff6b00] transition-all shadow-lg"
          aria-label="Scroll to top"
          >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </footer>
  );
}
