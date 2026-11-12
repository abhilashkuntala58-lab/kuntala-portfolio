import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    e.target.reset();
  };

  return (
    <section id="contact" className="py-24 px-6 bg-transparent relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff6b00]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-[#ff6b00] tracking-widest uppercase">GET IN TOUCH</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
            CONTACT <span className="text-[#ff6b00]">ME</span>
          </h2>
          <div className="w-20 h-1 bg-[#ff6b00] mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(255,107,0,0.8)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Info */}
          <div className="lg:col-span-5 flex flex-col justify-between liquid-glass-card rounded-3xl p-8 sm:p-10 shadow-2xl">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Let's Create <span className="text-[#ff6b00]">Something Cinematic</span></h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
                Ready to elevate your video production, commercial, or AI visual project? Reach out directly via phone, email, or send a message.
              </p>

              <div className="flex flex-col gap-6">
                <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-[#ff6b00]/10 border border-[#ff6b00]/30 flex items-center justify-center text-[#ff6b00] group-hover:bg-[#ff6b00] group-hover:text-black transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 uppercase">Phone</span>
                    <span className="text-base font-semibold text-white group-hover:text-[#ff6b00] transition-colors">{personalInfo.phone}</span>
                  </div>
                </a>

                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-[#ff6b00]/10 border border-[#ff6b00]/30 flex items-center justify-center text-[#ff6b00] group-hover:bg-[#ff6b00] group-hover:text-black transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 uppercase">Email</span>
                    <span className="text-base font-semibold text-white group-hover:text-[#ff6b00] transition-colors">{personalInfo.email}</span>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#ff6b00]/10 border border-[#ff6b00]/30 flex items-center justify-center text-[#ff6b00] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400 uppercase">Location</span>
                    <span className="text-base font-semibold text-white">{personalInfo.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <span className="text-xs text-gray-400 tracking-wider uppercase block mb-2">Availability</span>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Projects & Collaborations
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 liquid-glass-card rounded-3xl p-8 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_25px_rgba(16,185,129,0.5)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent Successfully!</h3>
                <p className="text-gray-300 text-sm max-w-md">
                  Thank you for reaching out. Kuntala Abhilash will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <h3 className="text-2xl font-bold text-white mb-2">Send a <span className="text-[#ff6b00]">Message</span></h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      className="px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b00] ring-1 ring-white/5 transition-colors text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b00] ring-1 ring-white/5 transition-colors text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Project Inquiry / Commercial Edit"
                    className="px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b00] ring-1 ring-white/5 transition-colors text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Message</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Describe your video editing or AI visual project requirements..."
                    className="px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff6b00] ring-1 ring-white/5 transition-colors text-sm resize-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl liquid-glass-button text-black font-extrabold text-sm tracking-widest uppercase flex items-center justify-center gap-3"
                >
                  <Send className="w-4 h-4 fill-black" />
                  SEND MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
