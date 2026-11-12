import React, { useState, useEffect, useRef } from 'react';
import { Play, Film, X } from 'lucide-react';
import { showreels } from '../data/portfolioData';

export default function Showreels() {
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRefs = useRef({});
  const [loadedSources, setLoadedSources] = useState({});

  // IntersectionObserver for preparing nearby video sources with rootMargin 700px
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-reel-id');
          if (id) {
            setLoadedSources((prev) => {
              if (!prev[id]) {
                return { ...prev, [id]: true };
              }
              return prev;
            });
          }
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '700px 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(videoRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handlePointerEnter = (id) => {
    if (activeVideo) return;
    const item = showreels.find((r) => r.id === id);
    if (item && item.isYouTube) return;
    // Ensure source is loaded
    setLoadedSources((prev) => ({ ...prev, [id]: true }));

    // Pause all other videos and play the hovered one
    Object.entries(videoRefs.current).forEach(([videoId, videoEl]) => {
      if (videoEl) {
        if (videoId === String(id)) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      }
    });
  };

  const handlePointerLeave = (id) => {
    const item = showreels.find((r) => r.id === id);
    if (item && item.isYouTube) return;
    const videoEl = videoRefs.current[id];
    if (videoEl) {
      videoEl.pause();
    }
  };

  return (
    <section id="showreels" className="py-24 px-6 bg-transparent relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-[#ff6b00] tracking-widest uppercase">VERTICAL 9:16 CINEMATIC REELS</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
            SHOW<span className="text-[#ff6b00]">REELS</span>
          </h2>
          <div className="w-20 h-1 bg-[#ff6b00] mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(255,107,0,0.8)]" />
        </div>

        {/* 10 Vertical 9:16 Video Slots Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {showreels.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveVideo(item)}
              onPointerEnter={() => handlePointerEnter(item.id)}
              onPointerLeave={() => handlePointerLeave(item.id)}
              className="group relative aspect-[9/16] rounded-2xl overflow-hidden liquid-glass-card cursor-pointer"
            >
              {item.isYouTube ? (
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b00]/25 via-black to-[#121212] flex items-center justify-center pointer-events-none">
                  <div className="text-center p-4">
                    <Film className="w-10 h-10 text-[#ff6b00] mx-auto mb-2 opacity-90 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-white tracking-wider uppercase">YouTube Reel</span>
                  </div>
                </div>
              ) : (
                <video
                  ref={(el) => (videoRefs.current[item.id] = el)}
                  data-reel-id={item.id}
                  src={loadedSources[item.id] ? item.videoUrl : undefined}
                  preload="metadata"
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none"
                />
              )}
              
              {/* Cinematic gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />

              {/* Top Slot Badge */}
              <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
                <span className="text-[10px] font-bold text-[#ff6b00] tracking-widest uppercase bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                  #{item.id}
                </span>
                <span className="text-[10px] text-gray-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                  9:16
                </span>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-[#ff6b00]/20 border border-[#ff6b00]/50 flex items-center justify-center text-[#ff6b00] group-hover:scale-110 group-hover:bg-[#ff6b00] group-hover:text-black transition-all shadow-[0_0_25px_rgba(255,107,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.4)]">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
              </div>

              {/* Bottom Watch Badge */}
              <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between text-[11px] bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] pointer-events-none">
                <span className="text-gray-300 font-medium">Click to Play</span>
                <span className="text-[#ff6b00] font-bold flex items-center gap-1">
                  Watch <Play className="w-3 h-3 fill-current" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Video Modal Preview */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6">
          <div className="relative w-full max-w-sm aspect-[9/16] max-h-[85vh] liquid-glass-card rounded-3xl border border-[#ff6b00]/40 overflow-hidden shadow-[0_0_60px_rgba(255,107,0,0.6)] flex flex-col items-center justify-center">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-[#ff6b00] hover:text-black transition-colors shadow-lg cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {activeVideo.isYouTube ? (
              <iframe
                src={`${activeVideo.videoUrl}?autoplay=1`}
                title={activeVideo.title}
                className="w-full h-full object-cover border-0 rounded-3xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : activeVideo.videoUrl ? (
              <video
                src={activeVideo.videoUrl}
                controls
                autoPlay
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#ff6b00]/15 border border-[#ff6b00]/40 flex items-center justify-center text-[#ff6b00] mb-4">
                  <Film className="w-7 h-7" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Slot #{activeVideo.id} Placeholder</h3>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
