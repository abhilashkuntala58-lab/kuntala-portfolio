import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField() {
  const pointsRef = useRef();
  const count = 160;
  const [positions] = React.useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 24;
      pos[i + 1] = (Math.random() - 0.5) * 35;
      pos[i + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useFrame((state) => {
    if (prefersReducedMotion) return;
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.01;
      pointsRef.current.rotation.x = Math.sin(t * 0.015) * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        color="#ff6b00"
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function SoftwareLogoMesh({ basePos, url, name, speed, scrollSpeed }) {
  const meshRef = useRef();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      url,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        setTexture(tex);
      },
      undefined,
      (err) => {
        console.error(`Failed to load logo: ${name} (${url})`, err);
      }
    );
  }, [url, name]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    // Normalized scroll progress across the entire document height (0 at top, 1 at bottom)
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, scrollY / docHeight));

    // Convert progress into noticeable world-space travel scaled by scrollSpeed
    const totalTravel = 16.0 * scrollSpeed;
    const travel = progress * totalTravel;

    // Scrolling down (progress increases) -> rawY decreases -> moves DOWN on screen.
    // Scrolling up (progress decreases) -> rawY increases -> moves UP on screen.
    const rawY = basePos[1] - travel;

    // Camera viewport vertical wrapping boundaries (-5.5 to 5.5)
    const minY = -5.5;
    const maxY = 5.5;
    const range = maxY - minY; // 11.0

    // Robust modulo wrapping for both positive and negative values
    let wrappedY = ((rawY - minY) % range);
    if (wrappedY < 0) wrappedY += range;
    wrappedY += minY;

    // Subtle independent floating animation (kept small so scroll movement dominates)
    const floatY = Math.sin(t * speed + basePos[0]) * 0.12;
    const floatX = Math.cos(t * 0.2 * speed) * 0.15 + (state.pointer.x * 0.25);
    const floatZ = Math.sin(t * 0.15) * 0.15;

    const currentY = wrappedY + floatY;
    const currentX = basePos[0] + floatX;
    const currentZ = basePos[2] + floatZ;

    meshRef.current.position.set(currentX, currentY, currentZ);

    // Perfect billboard orientation facing camera
    meshRef.current.quaternion.copy(state.camera.quaternion);
  });

  if (!texture) return null;

  return (
    <mesh ref={meshRef} position={basePos}>
      <planeGeometry args={[1.0, 1.0]} />
      <meshBasicMaterial 
        map={texture} 
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function FloatingSoftwareIconsGroup({ onScrollTelemetry }) {
  const prevScrollYRef = useRef(window.scrollY);

  const logosConfig = [
    { name: 'premiere.png', url: '/images/software/premiere.png', basePos: [-3.8, 3.5, 0.3], speed: 1.1, scrollSpeed: 1.0 },
    { name: 'after-effects.png', url: '/images/software/after-effects.png', basePos: [4.2, 2.0, -0.4], speed: 1.3, scrollSpeed: 1.3 },
    { name: 'davinci.png', url: '/images/software/davinci.png', basePos: [-4.0, 0.5, 0.6], speed: 0.9, scrollSpeed: 1.1 },
    { name: 'maya.png', url: '/images/software/maya.png', basePos: [4.0, -1.0, -0.2], speed: 1.2, scrollSpeed: 1.4 },
    { name: 'runway.png', url: '/images/software/runway.png', basePos: [-2.5, -2.5, -0.8], speed: 1.4, scrollSpeed: 1.2 },
    { name: 'elevenlabs.png', url: '/images/software/elevenlabs.png', basePos: [2.8, 4.0, 0.7], speed: 1.0, scrollSpeed: 0.95 },
    { name: 'magnific.png', url: '/images/software/magnific.png', basePos: [0.0, -4.0, -0.6], speed: 1.2, scrollSpeed: 1.25 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - prevScrollYRef.current;
      prevScrollYRef.current = currentScrollY;

      const direction = delta > 0 ? 'DOWN' : delta < 0 ? 'UP' : 'IDLE';
      if (onScrollTelemetry) {
        onScrollTelemetry({
          scrollY: Math.round(currentScrollY),
          direction,
          movement: Number(delta.toFixed(2)),
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScrollTelemetry]);

  return (
    <group>
      {logosConfig.map((logo, index) => (
        <SoftwareLogoMesh key={index} {...logo} />
      ))}
    </group>
  );
}

export default function FuturisticScene() {
  const [webglSupported, setWebglSupported] = useState(true);
  const [debugInfo, setDebugInfo] = useState({ scrollY: 0, direction: 'NONE', movement: 0 });

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return <div className="fixed inset-0 z-0 bg-[#0a0a0a]" />;
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0a0a0a]">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor('#0a0a0a', 1);
        }}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[5, 5, 5]} intensity={3.0} color="#ff6b00" />
        <pointLight position={[-5, -5, -2]} intensity={2.0} color="#ff3300" />
        <ParticleField />
        <FloatingSoftwareIconsGroup onScrollTelemetry={setDebugInfo} />
      </Canvas>

      {/* Temporary Development Debug Indicator - Properly OUTSIDE <Canvas> */}
      <div className="fixed bottom-4 right-4 z-50 bg-black/85 border border-[#ff6b00]/60 text-xs text-[#ff6b00] p-3 rounded-xl backdrop-blur-md shadow-[0_0_20px_rgba(255,107,0,0.35)] font-mono pointer-events-auto">
        <div className="font-bold text-white mb-1 tracking-wider">🔍 SCROLL TELEMETRY</div>
        <div>ScrollY: {debugInfo.scrollY}px</div>
        <div>Direction: <span className={debugInfo.direction === 'DOWN' ? 'text-green-400 font-bold' : debugInfo.direction === 'UP' ? 'text-blue-400 font-bold' : 'text-gray-400'}>{debugInfo.direction}</span></div>
        <div>Scroll Delta: {debugInfo.movement}px</div>
      </div>
    </div>
  );
}
