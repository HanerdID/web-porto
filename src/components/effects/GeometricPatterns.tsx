import React from "react";
import { motion } from "framer-motion";

interface GeometricPatternsProps {
  color?: string;
  opacity?: number;
  variant?: "top" | "middle" | "bottom";
}

export const GeometricPatterns: React.FC<GeometricPatternsProps> = ({
  color = "#0ea5e9",
  opacity = 0.05,
  variant = "top",
}) => {
  // Generate different pattern variants based on position
  const getPatternElements = () => {
    const baseStyle = {
      fill: color,
      fillOpacity: opacity,
    };

    switch (variant) {
      case "top":
        return (
          <>
            <motion.circle
              cx="10%"
              cy="20%"
              r="120"
              style={baseStyle}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [opacity, opacity * 1.5, opacity],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.polygon
              points="70,60 120,40 150,80 110,120 60,100"
              style={baseStyle}
              animate={{
                rotate: [0, 10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.rect
              x="80%"
              y="10%"
              width="100"
              height="100"
              rx="20"
              style={baseStyle}
              animate={{
                rotate: [0, -15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        );

      case "middle":
        return (
          <>
            <motion.path
              d="M50,100 C100,150 200,50 250,100 S350,150 400,100"
              stroke={color}
              strokeWidth="2"
              fill="none"
              strokeOpacity={opacity * 2}
              animate={{
                d: [
                  "M50,100 C100,150 200,50 250,100 S350,150 400,100",
                  "M50,120 C100,70 200,150 250,80 S350,130 400,100",
                  "M50,100 C100,150 200,50 250,100 S350,150 400,100",
                ],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx="75%"
              cy="50%"
              r="60"
              style={baseStyle}
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 13,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.polygon
              points="150,200 200,220 220,280 180,300 130,260"
              style={baseStyle}
              animate={{
                rotate: [0, 20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        );

      case "bottom":
        return (
          <>
            <motion.circle
              cx="20%"
              cy="70%"
              r="80"
              style={baseStyle}
              animate={{
                scale: [1, 0.9, 1],
                opacity: [opacity, opacity * 1.3, opacity],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.rect
              x="60%"
              y="60%"
              width="120"
              height="120"
              rx="15"
              style={baseStyle}
              animate={{
                rotate: [0, 15, 0],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.polygon
              points="350,400 400,380 450,430 430,480 370,460"
              style={baseStyle}
              animate={{
                rotate: [0, -10, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      {getPatternElements()}
    </svg>
  );
};

export default GeometricPatterns;
