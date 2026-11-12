import React from 'react';
import { Cpu } from 'lucide-react';
import { skills } from '../data/portfolioData';

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-transparent relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-[#ff6b00] tracking-widest uppercase">PROFESSIONAL TOOLKIT</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
            SOFTWARE & AI <span className="text-[#ff6b00]">TOOLS</span>
          </h2>
          <div className="w-20 h-1 bg-[#ff6b00] mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(255,107,0,0.8)]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="liquid-glass-card rounded-2xl p-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff6b00]/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-[#ff6b00]/20 transition-all" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#ff6b00]/10 border border-[#ff6b00]/30 flex items-center justify-center text-[#ff6b00] group-hover:bg-[#ff6b00] group-hover:text-black transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#ff6b00] tracking-widest uppercase">{skill.category}</span>
                  <h3 className="text-white font-bold text-lg mt-0.5">{skill.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
