import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface RadialBackgroundProps {
  className?: string;
  baseColor?: string;
  highlightColors?: string[];
  blur?: string;
  opacity?: number;
  animate?: boolean;
  interactive?: boolean;
}

export const RadialBackground: React.FC<RadialBackgroundProps> = ({
  className = "",
  baseColor = "rgba(255, 255, 255, 0)",
  highlightColors = [
    "rgba(14, 165, 233, 0.15)",
    "rgba(78, 205, 196, 0.15)",
    "rgba(255, 107, 107, 0.15)",
  ],
  blur = "120px",
  opacity = 0.6,
  animate = true,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const circles = useRef<HTMLDivElement[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const controls = useAnimation();

  useEffect(() => {
    if (!animate) return;

    const interval = setInterval(() => {
      controls.start({
        scale: [1, 1.2, 1],
        opacity: [opacity, opacity * 1.2, opacity],
        transition: { duration: 10, ease: "easeInOut" },
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [animate, controls, opacity]);

  useEffect(() => {
    if (!interactive || !containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Calculate mouse position relative to the container
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mousePos.current = { x, y };

      // Update the position of the circles
      circles.current.forEach((circle, index) => {
        if (!circle) return;

        // Each circle follows mouse with different delay/effect
        const factor = 0.15 / (index + 1);
        const circleX = x * factor;
        const circleY = y * factor;

        circle.style.transform = `translate(${circleX}px, ${circleY}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity }}
    >
      {highlightColors.map((color, index) => (
        <motion.div
          key={index}
          ref={(el) => {
            if (el) circles.current[index] = el;
          }}
          className="absolute rounded-full"
          animate={animate ? controls : undefined}
          style={{
            backgroundColor: color,
            filter: `blur(${blur})`,
            width: `${30 + index * 10}%`,
            height: `${30 + index * 10}%`,
            top: `${20 + index * 15}%`,
            left: `${20 + index * 10}%`,
            transition: "transform 1s cubic-bezier(0.075, 0.82, 0.165, 1)",
          }}
        />
      ))}

      {/* Base background color */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: baseColor }}
      />
    </div>
  );
};

export default RadialBackground;
