import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  intensity?: number;
  offset?: number;
  className?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  direction = "up",
  intensity = 0.2,
  offset = 0,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate transform values based on direction
  let transform;
  const distance = intensity * 100; // Percentage of movement

  switch (direction) {
    case "up":
      transform = useTransform(
        scrollYProgress,
        [0, 1],
        [`${offset}%`, `-${distance + offset}%`]
      );
      break;
    case "down":
      transform = useTransform(
        scrollYProgress,
        [0, 1],
        [`-${offset}%`, `${distance + offset}%`]
      );
      break;
    case "left":
      transform = useTransform(
        scrollYProgress,
        [0, 1],
        [`${offset}%`, `-${distance + offset}%`]
      );
      break;
    case "right":
      transform = useTransform(
        scrollYProgress,
        [0, 1],
        [`-${offset}%`, `${distance + offset}%`]
      );
      break;
    default:
      transform = useTransform(
        scrollYProgress,
        [0, 1],
        [`${offset}%`, `-${distance + offset}%`]
      );
  }

  const x = direction === "left" || direction === "right" ? transform : 0;
  const y = direction === "up" || direction === "down" ? transform : 0;

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{
          x: typeof x === "number" ? x : x,
          y: typeof y === "number" ? y : y,
        }}
        className="relative"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
