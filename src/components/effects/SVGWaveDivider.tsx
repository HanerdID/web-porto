import React from "react";
import { motion } from "framer-motion";

export type WaveType =
  | "wave"
  | "curve"
  | "zigzag"
  | "triangle"
  | "mountain"
  | "layered";

interface SVGWaveDividerProps {
  type?: WaveType;
  color?: string;
  height?: number;
  width?: string;
  position?: "top" | "bottom";
  flip?: boolean;
  animate?: boolean;
  animationDuration?: number;
  className?: string;
}

export const SVGWaveDivider: React.FC<SVGWaveDividerProps> = ({
  type = "wave",
  color = "#ffffff",
  height = 100,
  width = "100%",
  position = "bottom",
  flip = false,
  animate = true,
  animationDuration = 20,
  className = "",
}) => {
  // Generate path for the SVG based on the chosen type
  const generatePath = (): string => {
    switch (type) {
      case "wave":
        return "M0,40 C300,100 400,0 1920,40 L1920,100 L0,100 Z";

      case "curve":
        return "M0,50 C960,110 1920,50 1920,50 L1920,100 L0,100 Z";

      case "zigzag":
        return "M0,50 L240,75 L480,50 L720,75 L960,50 L1200,75 L1440,50 L1680,75 L1920,50 L1920,100 L0,100 Z";

      case "triangle":
        return "M0,100 L960,20 L1920,100 Z";

      case "mountain":
        return "M0,80 L240,45 L480,80 L720,20 L960,80 L1200,20 L1440,80 L1680,20 L1920,80 L1920,100 L0,100 Z";

      case "layered":
        // This one is special with multiple paths
        return "";

      default:
        return "M0,40 C300,100 400,0 1920,40 L1920,100 L0,100 Z";
    }
  };

  // Animation variants for the wave effect
  const waveAnimation = {
    animate: {
      x: [-20, 20, -20],
      transition: {
        x: {
          repeat: Infinity,
          duration: animationDuration,
          ease: "easeInOut",
        },
      },
    },
  };

  // Apply different styling based on position
  const positionStyle =
    position === "top"
      ? { top: -height + 1 } // +1 to slightly overlap and avoid line gaps
      : { bottom: -height + 1 };

  // For layered wave type, we'll return multiple paths
  if (type === "layered") {
    return (
      <div
        className={`absolute left-0 right-0 h-[${height}px] overflow-hidden pointer-events-none ${className}`}
        style={{
          ...positionStyle,
          transform: flip ? "rotate(180deg)" : "none",
        }}
      >
        <svg
          width={width}
          height={`${height}px`}
          viewBox="0 0 1920 100"
          preserveAspectRatio="none"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
          }}
        >
          <motion.path
            d="M0,40 C500,90 800,20 1920,50 L1920,100 L0,100 Z"
            fill={color}
            fillOpacity="0.3"
            variants={animate ? waveAnimation : undefined}
            animate={animate ? "animate" : undefined}
          />
          <motion.path
            d="M0,60 C800,10 1200,80 1920,60 L1920,100 L0,100 Z"
            fill={color}
            fillOpacity="0.5"
            variants={
              animate
                ? {
                    animate: {
                      x: [20, -20, 20],
                      transition: {
                        x: {
                          repeat: Infinity,
                          duration: animationDuration * 1.2,
                          ease: "easeInOut",
                        },
                      },
                    },
                  }
                : undefined
            }
            animate={animate ? "animate" : undefined}
          />
          <path
            d="M0,80 C400,60 1200,90 1920,70 L1920,100 L0,100 Z"
            fill={color}
            fillOpacity="0.8"
          />
        </svg>
      </div>
    );
  }

  // For other types, return a single path
  return (
    <div
      className={`absolute left-0 right-0 h-[${height}px] overflow-hidden pointer-events-none ${className}`}
      style={{
        ...positionStyle,
        transform: flip ? "rotate(180deg)" : "none",
      }}
    >
      <svg
        width={width}
        height={`${height}px`}
        viewBox="0 0 1920 100"
        preserveAspectRatio="none"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      >
        <motion.path
          d={generatePath()}
          fill={color}
          variants={animate ? waveAnimation : undefined}
          animate={animate ? "animate" : undefined}
        />
      </svg>
    </div>
  );
};

export default SVGWaveDivider;
