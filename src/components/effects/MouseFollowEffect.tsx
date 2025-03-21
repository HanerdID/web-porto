import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MouseFollowEffectProps {
  size?: number;
  color?: string;
  showTrail?: boolean;
  trailCount?: number;
}

export const MouseFollowEffect: React.FC<MouseFollowEffectProps> = ({
  size = 40,
  color = "#0ea5e9",
  showTrail = true,
  trailCount = 4,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [trailPositions, setTrailPositions] = useState<
    { x: number; y: number }[]
  >([]);

  // Mouse position tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Add current position to trail
      if (showTrail) {
        setTrailPositions((prev) => {
          const newPositions = [...prev, { x: e.clientX, y: e.clientY }];
          // Keep only the last N positions
          if (newPositions.length > trailCount) {
            return newPositions.slice(newPositions.length - trailCount);
          }
          return newPositions;
        });
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [showTrail, trailCount]);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - size / 2,
          y: mousePosition.y - size / 2,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          mass: 0.5,
        }}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: color,
          opacity: 0.6,
        }}
      />

      {/* Trail effect */}
      {showTrail &&
        trailPositions.map((pos, index) => (
          <motion.div
            key={index}
            className="fixed pointer-events-none z-40 rounded-full mix-blend-difference"
            style={{
              width: size * (1 - index / (trailCount * 1.5)),
              height: size * (1 - index / (trailCount * 1.5)),
              opacity: (trailCount - index) / (trailCount * 2),
              backgroundColor: color,
              left: pos.x - (size * (1 - index / (trailCount * 1.5))) / 2,
              top: pos.y - (size * (1 - index / (trailCount * 1.5))) / 2,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
          />
        ))}
    </>
  );
};

export default MouseFollowEffect;
