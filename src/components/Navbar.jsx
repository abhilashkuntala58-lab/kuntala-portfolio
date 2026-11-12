import React, { useState } from 'react';
import { Film, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SHOWREELS', href: '#showreels' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'CONTACT', href: '#contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 liquid-glass-nav">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6b00] to-[#ff3300] flex items-center justify-center shadow-[0_0_20px_rgba(255,107,0,0.6)] group-hover:scale-105 transition-transform">
            <Film className="w-5 h-5 text-black" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-wider text-white">KUNTALA ABHILASH</span>
            <span className="block text-xs text-[#ff6b00] tracking-widest uppercase font-semibold">Video Editor & AI Specialist</span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-[#ff6b00] tracking-wider transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#ff6b00] hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full liquid-glass-button text-black font-extrabold text-sm tracking-wide"
          >
            GET IN TOUCH
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-[#ff6b00] transition-colors p-2"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full liquid-glass-card border-b border-[#ff6b00]/20 py-6 px-6 flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-gray-200 hover:text-[#ff6b00] tracking-wider py-2 border-b border-white/5"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="mt-2 w-full py-3 rounded-xl liquid-glass-button text-black font-extrabold text-center tracking-wide"
          >
            GET IN TOUCH
          </a>
        </div>
      )}
    </nav>
  );
}
