import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface EnhancedScrollProgressProps {
  height?: number;
  color?: string;
  gradientFrom?: string;
  gradientTo?: string;
  gradientVia?: string;
  showPercentage?: boolean;
  placement?: "top" | "bottom" | "left" | "right";
  rounded?: boolean;
  zIndex?: number;
  shadow?: boolean;
  springConfig?: {
    stiffness: number;
    damping: number;
    mass?: number;
  };
}

export const EnhancedScrollProgress: React.FC<EnhancedScrollProgressProps> = ({
  height = 4,
  color = "#0ea5e9",
  gradientFrom,
  gradientTo,
  gradientVia,
  showPercentage = false,
  placement = "top",
  rounded = false,
  zIndex = 100,
  shadow = false,
  springConfig = { stiffness: 100, damping: 30, mass: 0.5 },
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, springConfig);

  // Transform scroll progress to percentage for display
  const scrollPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Determine background style (solid color or gradient)
  const backgroundStyle =
    gradientFrom && gradientTo
      ? {
          background: gradientVia
            ? `linear-gradient(to right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`
            : `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
        }
      : { backgroundColor: color };

  // Determine placement styles
  const getPlacementStyles = () => {
    switch (placement) {
      case "bottom":
        return {
          bottom: 0,
          left: 0,
          right: 0,
          height: `${height}px`,
          transformOrigin: "left bottom",
        };
      case "left":
        return {
          top: 0,
          bottom: 0,
          left: 0,
          width: `${height}px`,
          transformOrigin: "left top",
          // For vertical progress, we need to use scaleY instead of scaleX
          transform: "none", // Reset default transform
          scaleY: scaleX, // Use scaleX as scaleY value
        };
      case "right":
        return {
          top: 0,
          bottom: 0,
          right: 0,
          width: `${height}px`,
          transformOrigin: "right top",
          transform: "none", // Reset default transform
          scaleY: scaleX, // Use scaleX as scaleY value
        };
      default: // top
        return {
          top: 0,
          left: 0,
          right: 0,
          height: `${height}px`,
          transformOrigin: "left top",
        };
    }
  };

  const placementStyles = getPlacementStyles();

  // Apply rounded corners if needed
  const borderRadiusStyle = rounded
    ? {
        borderRadius:
          placement === "left" || placement === "right"
            ? `${height / 2}px 0 0 ${height / 2}px`
            : `0 0 ${height / 2}px ${height / 2}px`,
      }
    : {};

  // Apply shadow if needed
  const shadowStyle = shadow
    ? { boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)" }
    : {};

  return (
    <>
      <motion.div
        className="fixed z-[100]"
        style={{
          ...placementStyles,
          ...borderRadiusStyle,
          ...backgroundStyle,
          ...shadowStyle,
          zIndex,
          scaleX:
            placement === "left" || placement === "right" ? undefined : scaleX,
          scaleY:
            placement === "left" || placement === "right" ? scaleX : undefined,
        }}
      />

      {showPercentage && (
        <motion.div
          className="fixed z-[100] bg-background text-foreground text-xs font-medium px-2 py-1 rounded-md shadow-sm"
          style={{
            [placement === "top" || placement === "bottom" ? "right" : "top"]:
              "20px",
            [placement]:
              placement === "right" ? `calc(${height}px + 10px)` : "10px",
          }}
        >
          <motion.span>{scrollPercentage.get().toFixed(0)}%</motion.span>
        </motion.div>
      )}
    </>
  );
};

export default EnhancedScrollProgress;
