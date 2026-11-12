import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Mouse position initialized to center of screen so it's immediately visible
  const cursorX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 100);
  const cursorY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 100);

  // Smooth trailing spring physics for outer ring
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on touch-only devices if pointer is coarse
    const touchQuery = window.matchMedia('(pointer: coarse)');
    if (touchQuery.matches) {
      setIsVisible(false);
      return;
    }

    const handleMouseMove = (e) => {
      setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Track clickable elements for hover states
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, select, [role="button"], [data-cursor-hover]');
      if (target) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, input, textarea, select, [role="button"], [data-cursor-hover]');
      if (target) {
        setIsHovered(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Center glowing dot (follows cursor immediately) */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#ff6b00] rounded-full pointer-events-none z-[99999] shadow-[0_0_12px_#ff6b00]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Outer ring (follows cursor with spring trailing effect) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99988] border-2 border-[#ff6b00] bg-[#ff6b00]/15 backdrop-blur-[1px] shadow-[0_0_25px_rgba(255,107,0,0.5)]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 64 : isClicked ? 32 : 44,
          height: isHovered ? 64 : isClicked ? 32 : 44,
          scale: isClicked ? 0.9 : 1,
          borderColor: isHovered ? '#ffaa00' : '#ff6b00',
          backgroundColor: isHovered ? 'rgba(255,107,0,0.25)' : 'rgba(255,107,0,0.12)',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 28,
        }}
      />
    </>
  );
}
