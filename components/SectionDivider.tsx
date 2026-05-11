"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Section divider with shimmer sweep + floating sparkle/glitter particles.
 * Pure CSS animations — no canvas, no rAF loops.
 */

function generateSparkles(count: number) {
  const sparkles = [];
  for (let i = 0; i < count; i++) {
    sparkles.push({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      top: `${15 + Math.random() * 70}%`,
      size: 1.5 + Math.random() * 2.5,
      delay: Math.random() * 3,
      duration: 1.2 + Math.random() * 1.8,
      opacity: 0.4 + Math.random() * 0.6,
    });
  }
  return sparkles;
}

export function SectionDivider() {
  const sparkles = useMemo(() => generateSparkles(16), []);

  return (
    <motion.div
      className="relative h-16 overflow-visible"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* main gradient line */}
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/70 to-transparent" />

      {/* animated shimmer sweep */}
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 overflow-hidden">
        <div className="divider-shimmer h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>

      {/* soft glow bloom */}
      <div className="absolute inset-x-0 top-1/2 h-6 -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/10 to-transparent blur-md" />

      {/* sparkle / glitter particles */}
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="divider-sparkle absolute rounded-full"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
            opacity: sparkle.opacity,
          }}
        />
      ))}

      {/* subtle dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 0 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
      />
    </motion.div>
  );
}