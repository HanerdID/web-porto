import React from "react";
import { motion } from "framer-motion";

interface ContinuousWaveProps {
  className?: string;
  color?: string;
  height?: number;
  width?: string;
  speed?: number;
  amplitude?: number;
  frequency?: number;
  position?: "top" | "bottom";
  flip?: boolean;
}

export const ContinuousWave: React.FC<ContinuousWaveProps> = ({
  className = "",
  color = "#0ea5e9",
  height = 40,
  width = "100%",
  speed = 15,
  amplitude = 20,
  frequency = 20,
  position = "bottom",
  flip = false,
}) => {
  // Generate path data for SVG wave
  const generateWavePath = () => {
    const points = [];
    // Create a smooth wave pattern
    for (let i = 0; i <= 100; i += 1) {
      const x = i;
      // Use sine function to create wave pattern
      const y = amplitude * Math.sin((i / 100) * Math.PI * frequency);
      points.push(`${x}% ${50 + y}%`);
    }

    return `M0 50% ${points.join(" ")} L100% 50% L100% 100% L0% 100% Z`;
  };

  // Animation for continuous wave movement
  const waveAnimation = {
    animate: {
      x: [0, -2000], // Animation moves from right to left
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: speed,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div
      className={`absolute left-0 right-0 overflow-hidden pointer-events-none z-0 ${className}`}
      style={{
        [position]: 0,
        height: `${height}px`,
        transform: flip ? "scaleY(-1)" : "none",
      }}
    >
      <svg
        width={width}
        height={`${height}px`}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          display: "block",
          width: "120%", // Extra width for continuous movement
          height: "100%",
        }}
      >
        <motion.path
          d={generateWavePath()}
          fill={color}
          variants={waveAnimation}
          animate="animate"
        />

        {/* Second wave for smoother transition */}
        <motion.path
          d={generateWavePath()}
          fill={color}
          variants={waveAnimation}
          animate="animate"
          style={{
            opacity: 0.7,
            transform: "translateX(2000px)", // Initial offset for second wave
          }}
        />
      </svg>
    </div>
  );
};

export default ContinuousWave;
