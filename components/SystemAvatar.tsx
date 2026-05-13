"use client";

import { motion, useTransform } from "framer-motion";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { useState } from "react";
import Image from "next/image";

export function SystemAvatar() {
  const { bind, x, y } = useMouseParallax(20);
  const [isHovered, setIsHovered] = useState(false);

  // Parallax layers
  const innerX = useTransform(x, (v) => v * 0.4);
  const innerY = useTransform(y, (v) => v * 0.4);
  const outerX = useTransform(x, (v) => v * 0.8);
  const outerY = useTransform(y, (v) => v * 0.8);

  return (
    <motion.div
      {...bind}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative flex h-[26rem] w-[26rem] items-center justify-center group"
    >
      {/* Background Matte Black with Noise and Grid */}
      <div className="absolute inset-6 rounded-full bg-[#0A0A0A] overflow-hidden border border-[#111111] shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
        {/* Soft radial blur glow behind avatar */}
        <motion.div
          animate={{ opacity: isHovered ? 0.8 : 0.4 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]"
        />
        {/* Dotted grid */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(#333 1px, transparent 1px)",
            backgroundSize: "16px 16px"
          }}
        />
        {/* Low-opacity noise texture */}
        <div className="absolute inset-0 opacity-20 noise-overlay mix-blend-overlay" />
      </div>

      {/* Orbit Rings */}
      {/* Ring 1 - Outer */}
      <motion.div
        style={{ x: outerX, y: outerY }}
        animate={{ rotate: 360 }}
        transition={{ duration: isHovered ? 30 : 45, repeat: Infinity, ease: "linear" }}
        className="absolute h-[24rem] w-[24rem] rounded-full border border-white/5 border-dashed"
      >
        <div className="absolute top-0 left-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#cfcfcf] shadow-[0_0_10px_#ffffff]" />
      </motion.div>

      {/* Ring 2 - Middle */}
      <motion.div
        style={{ x }}
        animate={{ rotate: -360 }}
        transition={{ duration: isHovered ? 20 : 35, repeat: Infinity, ease: "linear" }}
        className="absolute h-[20rem] w-[20rem] rounded-full border border-[#111111]"
      >
        <div className="absolute bottom-1/4 right-0 h-1.5 w-1.5 translate-x-1/2 translate-y-1/2 rounded-full bg-[#8a8a8a]" />
        <div className="absolute top-1/4 left-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30" />
      </motion.div>

      {/* Ring 3 - Inner */}
      <motion.div
        style={{ x: innerX, y: innerY }}
        animate={{ rotate: 360 }}
        transition={{ duration: isHovered ? 15 : 25, repeat: Infinity, ease: "linear" }}
        className="absolute h-[16rem] w-[16rem] rounded-full border border-white/10"
      >
        <div className="absolute top-0 right-1/4 h-2 w-2 -translate-y-1/2 rounded-full bg-[#ffffff] shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
      </motion.div>

      {/* Faint animated drifting particles inside */}
      <div className="absolute inset-6 overflow-hidden rounded-full pointer-events-none">
        {[...Array(12)].map((_, i) => {
          // pre-calculate random values so they don't cause hydration mismatch (though this is client-side only so it's fine)
          const size = Math.random() * 2 + 1;
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-white/40"
              style={{ width: size, height: size }}
              initial={{ 
                x: Math.random() * 300 - 150, 
                y: Math.random() * 300 - 150,
                opacity: Math.random() * 0.3 + 0.1
              }}
              animate={{
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                opacity: [0.1, 0.4, 0.1]
              }}
              transition={{
                duration: Math.random() * 15 + 15,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          );
        })}
      </div>

      {/* Central Masked Silhouette & Core */}
      <motion.div
        style={{ x: innerX, y: innerY }}
        className="relative z-10 flex h-[11rem] w-[11rem] items-center justify-center rounded-full bg-[#080808] overflow-hidden border border-[#8a8a8a]/20 shadow-[0_0_25px_rgba(255,255,255,0.06)] transition-all duration-500 group-hover:border-[#cfcfcf]/40 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
      >
        {/* Breathing glow behind the core */}
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_65%)]"
        />

        {/* Scanline shimmer on hover */}
        {isHovered && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[150%] w-full z-20"
          />
        )}

        {/* Realistic Developer Silhouette */}
        <div className="relative flex h-[100px] w-[100px] items-center justify-center z-10 opacity-90 mix-blend-lighten transition-all duration-500 group-hover:scale-105 group-hover:opacity-100">
          <Image
            src="/assets/developer-silhouette.png"
            alt="Developer Silhouette"
            fill
            className="object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]"
            priority
          />
        </div>
      </motion.div>

      {/* System-like Details & Typography */}
      <div className="absolute top-4 left-4 text-[9px] font-mono text-[#8a8a8a] tracking-widest opacity-60">
        <p>[x: 042, y: 110]</p>
      </div>
      
      <div className="absolute bottom-6 right-6 flex flex-col items-end text-[9px] font-mono text-[#cfcfcf] tracking-widest opacity-80">
        <p className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
          SIGNAL ACTIVE
        </p>
        <p className="text-[#8a8a8a] mt-0.5">NODE 01</p>
      </div>

      <div className="absolute top-1/2 -left-8 -translate-y-1/2 -rotate-90 text-[9px] font-mono text-[#8a8a8a] tracking-[0.4em] opacity-50">
        AI SYSTEMS
      </div>

      <div className="absolute top-1/2 -right-8 -translate-y-1/2 rotate-90 text-[9px] font-mono text-[#8a8a8a] tracking-[0.4em] opacity-50">
        ASTIK//ID
      </div>

    </motion.div>
  );
}
