"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useCallback, useRef } from "react";

type SkillOrbProps = {
  label: string;
  description: string;
  progress: number;
  muted?: boolean;
  delay?: number;
  iconUrl?: string;
  IconComponent?: LucideIcon;
};

export function SkillOrb({ label, description, progress, muted, delay = 0, iconUrl, IconComponent }: SkillOrbProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse-tracking tilt values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring-driven tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 20 });

  // Glow position for the highlight effect
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, 80]), { stiffness: 300, damping: 20 });
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, 80]), { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.45, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative"
      data-hoverable="true"
      style={{
        perspective: 600,
      }}
    >
      <motion.div
        className={`skill-orb-card glass-card rounded-2xl p-5 ${muted ? "opacity-70" : "shadow-glow"}`}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
      >
        {/* Dynamic glow that follows cursor */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]: number[]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`
            ),
          }}
        />
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            {/* Skill icon */}
            {(iconUrl || IconComponent) && (
              <div
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 opacity-60 transition-all duration-150 group-hover:opacity-100 group-hover:border-white/25 group-hover:bg-white/10 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.1)]"
              >
                {iconUrl ? (
                  <img
                    src={iconUrl}
                    alt={label}
                    width={18}
                    height={18}
                    className="opacity-75 transition-opacity duration-150 group-hover:opacity-100"
                    loading="lazy"
                  />
                ) : IconComponent ? (
                  <IconComponent className="h-[18px] w-[18px] text-muted transition-colors duration-150 group-hover:text-accent" />
                ) : null}
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-text">{label}</p>
              <p className="mt-2 text-xs leading-6 text-muted">{description}</p>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">{muted ? "Learning" : "Core"}</p>
            <p className="mt-2 font-mono text-lg text-text transition-transform duration-150 group-hover:scale-110">{progress}%</p>
          </div>
        </div>
        <div className="mt-5 h-2 w-full rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-full rounded-full bg-gradient-to-r from-[#f5f5f5] via-[#cfcfcf] to-[#8a8a8a] transition-shadow duration-200 group-hover:shadow-[0_0_14px_rgba(255,255,255,0.3)]"
          />
        </div>
        <div
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-muted opacity-65 transition-all duration-150 group-hover:opacity-100 group-hover:border-white/20"
        >
          Signal stable
        </div>
      </motion.div>
    </motion.div>
  );
}