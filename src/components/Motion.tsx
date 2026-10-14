"use client";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduced ? undefined : { y: [12, 0] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function OrbitMark() {
  const reduced = useReducedMotion();
  return (
    <motion.svg
      className="orbit-mark"
      width="80"
      height="80"
      viewBox="0 0 80 80"
      aria-hidden="true"
      initial={false}
      animate={reduced ? undefined : { rotate: 360 }}
      transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
    >
      <path
        d="M40 0l5 27 19-19-12 25 28 7-28 7 12 25-19-19-5 27-5-27-19 19 12-25L0 40l28-7L16 8l19 19z"
        fill="currentColor"
      />
    </motion.svg>
  );
}
