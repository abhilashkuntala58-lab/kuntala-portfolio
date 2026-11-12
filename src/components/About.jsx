import React from 'react';
import { User, MapPin, Mail, Phone, Award, BookOpen } from 'lucide-react';
import { personalInfo, education } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-transparent relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-[#ff6b00] tracking-widest uppercase">DISCOVER PROFILE</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
            ABOUT <span className="text-[#ff6b00]">ME</span>
          </h2>
          <div className="w-20 h-1 bg-[#ff6b00] mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(255,107,0,0.8)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 liquid-glass-card rounded-3xl p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#ff6b00]/10 rounded-full blur-[60px] pointer-events-none" />
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <User className="w-6 h-6 text-[#ff6b00]" />
              Professional Background
            </h3>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
              {personalInfo.about}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <MapPin className="w-5 h-5 text-[#ff6b00] shrink-0" />
                <div>
                  <span className="block text-xs text-gray-400 uppercase">Location</span>
                  <span className="text-sm font-semibold text-white">{personalInfo.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <Phone className="w-5 h-5 text-[#ff6b00] shrink-0" />
                <div>
                  <span className="block text-xs text-gray-400 uppercase">Phone</span>
                  <span className="text-sm font-semibold text-white">{personalInfo.phone}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 sm:col-span-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <Mail className="w-5 h-5 text-[#ff6b00] shrink-0" />
                <div>
                  <span className="block text-xs text-gray-400 uppercase">Email</span>
                  <span className="text-sm font-semibold text-white">{personalInfo.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="liquid-glass-card rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-[#ff6b00]" />
                Education & Training
              </h3>
              <div className="flex flex-col gap-6">
                {education.map((edu, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-[#ff6b00]">
                    <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#ff6b00] shadow-[0_0_10px_rgba(255,107,0,0.8)]" />
                    <span className="text-xs text-[#ff6b00] font-bold tracking-widest uppercase">{edu.institution}</span>
                    <h4 className="text-lg font-bold text-white mt-1">{edu.degree}</h4>
                    <p className="text-sm text-gray-300 mt-1">{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
