import React, { useEffect, useRef, useState } from "react";
import { Activity } from "lucide-react";

/**
 * MedicalLogo3D.jsx - Compact Version
 * Optimized for navbar use with smaller footprint
 */

const MedicalLogo3D = ({ onClick }) => {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const [particles, setParticles] = useState([]);

  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    translateZ: 0
  });
  
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      const newParticles = Array.from({ length: 6 }, (_, i) => ({
        id: Math.random(),
        angle: (i * 60),
        delay: i * 0.08
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [isHovered]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateY = ((x - centerX) / centerX) * 12;
      const rotateX = -((y - centerY) / centerY) * 12;
      
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setTransform({ rotateX, rotateY, translateZ: 15 });
        setMousePos({
          x: (x / rect.width) * 100,
          y: (y / rect.height) * 100
        });
      });
    };

    const handleLeave = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setTransform({ rotateX: 0, rotateY: 0, translateZ: 0 });
      setMousePos({ x: 50, y: 50 });
      setIsHovered(false);
    };

    const handleEnter = () => {
      setIsHovered(true);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    el.addEventListener("mouseenter", handleEnter);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      el.removeEventListener("mouseenter", handleEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative select-none focus:outline-none flex items-center gap-3"
      aria-label="Medical Appointment Logo"
    >
      <div 
        ref={containerRef}
        className="relative"
        style={{ perspective: "800px" }}
      >
        {/* Main 3D Container */}
        <div
          className="relative transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: `perspective(800px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) translateZ(${transform.translateZ}px)`,
            transformStyle: "preserve-3d"
          }}
        >
          {/* Outer Glow Ring */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Particles */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-particle"
              style={{
                transform: `rotate(${particle.angle}deg) translateX(0px)`,
                animationDelay: `${particle.delay}s`,
                boxShadow: '0 0 8px rgba(34, 211, 238, 0.8)'
              }}
            />
          ))}

          {/* Main Card - Compact Size */}
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-0.5 shadow-xl overflow-hidden border border-white/10 w-14 h-14">
            {/* Holographic shine effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(99, 102, 241, 0.3), transparent 60%)`
              }}
            />
            
            {/* Animated shine sweep */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="shine-sweep" />
            </div>

            {/* Inner card with logo */}
            <div className="relative rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 w-full h-full overflow-hidden flex items-center justify-center">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10 bg-pattern" />

              {/* Top highlight */}
              <div className="absolute top-0 left-1/4 right-1/4 h-8 bg-white/20 blur-xl rounded-full" />

              {/* Medical Cross Icon - Smaller */}
              <div className="relative z-10">
                {/* Pulsing background */}
                <div className="absolute inset-0 bg-white/20 rounded-lg blur-md animate-heartbeat" />
                
                {/* Cross container */}
                <div className="relative flex items-center justify-center w-8 h-8">
                  {/* Vertical bar */}
                  <div className="absolute w-2 h-6 bg-white rounded-full shadow-lg" />
                  {/* Horizontal bar */}
                  <div className="absolute w-6 h-2 bg-white rounded-full shadow-lg" />
                  
                  {/* Center glow */}
                  <div className="absolute inset-0 bg-white/30 rounded-full blur-sm animate-pulse" />
                </div>
              </div>
            </div>

            {/* Bottom edge highlight */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>

          {/* Floating shadow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-2 bg-black/30 rounded-full blur-md" />
        </div>
      </div>

      {/* Brand Text - Inline */}
      <div className="text-left">
        <div className="flex items-center gap-1.5">
          <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
            HealthCare
          </h3>
          <Activity className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
        </div>
        <p className="text-[15px] text-gray-500 font-lg -mt-0.5">Smart Medical Booking</p>
      </div>

      <style jsx>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          15% { transform: scale(1.15); opacity: 1; }
          30% { transform: scale(1); opacity: 0.8; }
          45% { transform: scale(1.08); opacity: 0.9; }
          60% { transform: scale(1); opacity: 0.8; }
        }
        
        @keyframes particle {
          0% { transform: rotate(var(--angle, 0deg)) translateX(0px); opacity: 1; }
          100% { transform: rotate(var(--angle, 0deg)) translateX(40px); opacity: 0; }
        }
        
        @keyframes shine-sweep {
          0% { transform: translateX(-100%) rotate(20deg); }
          100% { transform: translateX(200%) rotate(20deg); }
        }
        
        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
        
        .animate-particle {
          animation: particle 1.2s ease-out forwards;
        }
        
        .shine-sweep {
          position: absolute;
          top: -50%;
          left: -100%;
          width: 60%;
          height: 200%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          transform: translateX(-100%) rotate(20deg);
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .group:hover .shine-sweep {
          opacity: 1;
          animation: shine-sweep 1s ease-in-out;
        }
        
        .bg-pattern {
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 12px 12px;
        }
      `}</style>
    </button>
  );
};

export default MedicalLogo3D;