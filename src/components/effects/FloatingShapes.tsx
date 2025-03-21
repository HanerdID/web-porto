import React from "react";
import { motion } from "framer-motion";
import { isMobile } from "../../utils/device";

interface ShapeProps {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size?: string;
  delay?: number;
  duration?: number;
  type?: "circle" | "square" | "triangle" | "donut";
  color?: string;
  opacity?: number;
  blur?: string;
}

const Shape: React.FC<ShapeProps> = ({
  top,
  left,
  right,
  bottom,
  size = "80px",
  delay = 0,
  duration = 8,
  type = "circle",
  color = "#0ea5e9",
  opacity = 0.15,
  blur = "40px",
}) => {
  // Calculate random movement paths
  const xMove = Math.random() * 30 - 15;
  const yMove = Math.random() * 30 - 15;
  const rotateMove = Math.random() * 20 - 10;

  // Generate shape based on type
  const renderShape = () => {
    const sizeValue = size.replace("px", "");

    switch (type) {
      case "circle":
        return (
          <div
            className="rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              opacity: opacity,
              filter: `blur(${blur})`,
            }}
          />
        );
      case "square":
        return (
          <div
            className="rounded-lg"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              opacity: opacity,
              filter: `blur(${blur})`,
            }}
          />
        );
      case "triangle":
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${parseInt(sizeValue) / 2}px solid transparent`,
              borderRight: `${parseInt(sizeValue) / 2}px solid transparent`,
              borderBottom: `${sizeValue}px solid ${color}`,
              opacity: opacity,
              filter: `blur(${blur})`,
            }}
          />
        );
      case "donut":
        return (
          <div
            className="rounded-full border-8"
            style={{
              width: size,
              height: size,
              borderColor: color,
              backgroundColor: "transparent",
              opacity: opacity,
              filter: `blur(${blur})`,
            }}
          />
        );
      default:
        return (
          <div
            className="rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              opacity: opacity,
              filter: `blur(${blur})`,
            }}
          />
        );
    }
  };

  return (
    <motion.div
      className="absolute z-0 pointer-events-none"
      style={{
        top,
        left,
        right,
        bottom,
      }}
      animate={{
        x: [0, xMove, 0],
        y: [0, yMove, 0],
        rotate: [0, rotateMove, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        delay: delay,
        ease: "easeInOut",
      }}
    >
      {renderShape()}
    </motion.div>
  );
};

interface FloatingShapesProps {
  count?: number;
  colors?: string[];
}

export const FloatingShapes: React.FC<FloatingShapesProps> = ({
  count = isMobile() ? 3 : 6,
  colors = ["#0ea5e9", "#4ECDC4", "#FF6B6B", "#FFD166"],
}) => {
  // Generate random shapes
  const shapes = [];
  const shapeTypes: ShapeProps["type"][] = [
    "circle",
    "square",
    "triangle",
    "donut",
  ];

  for (let i = 0; i < count; i++) {
    const randomPosition = {
      top: i % 3 === 0 ? `${Math.random() * 30}%` : undefined,
      bottom: i % 3 === 1 ? `${Math.random() * 30}%` : undefined,
      left: i % 2 === 0 ? `${Math.random() * 30}%` : undefined,
      right: i % 2 === 1 ? `${Math.random() * 30}%` : undefined,
    };

    if (!randomPosition.top && !randomPosition.bottom) {
      randomPosition.top = `${Math.random() * 100}%`;
    }

    if (!randomPosition.left && !randomPosition.right) {
      randomPosition.left = `${Math.random() * 100}%`;
    }

    shapes.push({
      ...randomPosition,
      size: `${Math.random() * 100 + 50}px`,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 15,
      type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.2 + 0.05,
      blur: `${Math.random() * 60 + 30}px`,
    });
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((props, index) => (
        <Shape key={index} {...props} />
      ))}
    </div>
  );
};

export default FloatingShapes;
