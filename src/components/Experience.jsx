import React from 'react';
import { Briefcase, Calendar, CheckCircle } from 'lucide-react';
import { experiences } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-transparent relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-[#ff6b00] tracking-widest uppercase">CAREER PATHWAY</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
            WORK <span className="text-[#ff6b00]">EXPERIENCE</span>
          </h2>
          <div className="w-20 h-1 bg-[#ff6b00] mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(255,107,0,0.8)]" />
        </div>

        <div className="relative pl-6 sm:pl-10 border-l-2 border-[#ff6b00]/40 flex flex-col gap-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative group">
              <div className="absolute -left-[31px] sm:-left-[47px] top-1 w-6 h-6 rounded-full bg-[#121212] border-2 border-[#ff6b00] flex items-center justify-center shadow-[0_0_20px_rgba(255,107,0,0.7)]">
                <div className="w-2 h-2 rounded-full bg-[#ff6b00]" />
              </div>

              <div className="liquid-glass-card rounded-3xl p-8 shadow-2xl">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-bold text-[#ff6b00] tracking-widest uppercase">{exp.company}</span>
                    <h3 className="text-2xl font-extrabold text-white mt-1">{exp.role}</h3>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
                    <Calendar className="w-4 h-4 text-[#ff6b00]" />
                    {exp.duration}
                  </div>
                </div>

                <ul className="flex flex-col gap-3 mt-6">
                  {exp.highlights.map((highlight, hIndex) => (
                    <li key={hIndex} className="flex items-start gap-3 text-gray-300 text-sm sm:text-base leading-relaxed">
                      <CheckCircle className="w-5 h-5 text-[#ff6b00] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
