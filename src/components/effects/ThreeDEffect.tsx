import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { isMobile } from "../../utils/device";

interface ThreeDEffectProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  perspective?: number;
  shadow?: boolean;
  layers?: number;
  reset?: boolean;
  glare?: boolean;
}

export const ThreeDEffect: React.FC<ThreeDEffectProps> = ({
  children,
  className = "",
  intensity = isMobile() ? 5 : 10,
  perspective = 1000,
  shadow = !isMobile(),
  layers = isMobile() ? 0 : 3,
  reset = true,
  glare = !isMobile(),
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Add some spring physics for smoother movement
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]),
    springConfig
  );

  // For glare effect
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  const glareOpacity = useTransform(
    [mouseX, mouseY],
    ([latestMouseX, latestMouseY]) => {
      if (!isHovered) return 0;
      const distance = Math.sqrt(
        (latestMouseX as number) ** 2 + (latestMouseY as number) ** 2
      );
      return Math.min(distance * 0.5, 0.3);
    }
  );

  // Calculate shadow position based on mouse movement
  const shadowX = useTransform(
    mouseX,
    [-0.5, 0.5],
    [`${-intensity}px`, `${intensity}px`]
  );
  const shadowY = useTransform(
    mouseY,
    [-0.5, 0.5],
    [`${-intensity}px`, `${intensity}px`]
  );

  // Generate layers for 3D effect
  const layerElements = Array.from({ length: layers }, (_, i) => i + 1).map(
    (layer) => {
      const layerDepth = (layer / layers) * (intensity * 0.8);
      return (
        <motion.div
          key={`layer-${layer}`}
          className="absolute inset-0 rounded-xl"
          style={{
            transform: `translateZ(${layerDepth}px)`,
            zIndex: layer,
            opacity: 1 - (layer / layers) * 0.4, // Fade higher layers for depth effect
          }}
        />
      );
    }
  );

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    // Normalize coordinates to range from -0.5 to 0.5
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  // Reset on mouse leave if reset is true
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (reset) {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: `${perspective}px` }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          transition: "box-shadow 0.3s ease",
          boxShadow:
            shadow && isHovered
              ? `${shadowX.get()}px ${shadowY.get()}px 20px rgba(0, 0, 0, 0.1)`
              : "none",
        }}
        className="w-full h-full"
      >
        {/* 3D Layers */}
        {layers > 0 && layerElements}

        {/* Glare Effect */}
        {glare && (
          <motion.div
            className="absolute inset-0 rounded-xl mix-blend-overlay pointer-events-none"
            style={{
              background: isHovered
                ? `radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.8), transparent 80%)`
                : "none",
              opacity: glareOpacity,
              zIndex: layers + 1,
            }}
          />
        )}

        {/* Actual content */}
        <div
          className="relative h-full"
          style={{
            transform: layers > 0 ? `translateZ(${intensity}px)` : "none",
            zIndex: layers + 2,
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default ThreeDEffect;
