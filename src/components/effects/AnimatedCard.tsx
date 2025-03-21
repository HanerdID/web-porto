import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  backgroundBlur?: boolean;
  glare?: boolean;
  tiltAmount?: number;
  border?: boolean;
  borderGradient?: boolean;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = "",
  depth = 10,
  backgroundBlur = false,
  glare = true,
  tiltAmount = 20,
  border = false,
  borderGradient = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for mouse position within card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth the mouse position values
  const springConfig = { damping: 25, stiffness: 400 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Transform for rotation - should be limited rotation for good UX
  const rotateX = useTransform(
    smoothMouseY,
    [-0.5, 0.5],
    [tiltAmount, -tiltAmount]
  );
  const rotateY = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    [-tiltAmount, tiltAmount]
  );

  // Only for glare effect - where is the light source
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], ["0%", "100%"]);
  const glareOpacity = useTransform(
    [smoothMouseX, smoothMouseY],
    ([latestMouseX, latestMouseY]) => {
      // Calculate distance from center (0, 0)
      const distance = Math.sqrt(
        (latestMouseX as number) ** 2 + (latestMouseY as number) ** 2
      );
      // Normalize to 0-0.2 range
      return Math.min(distance * 0.4, 0.2);
    }
  );

  // For 3D layering effect based on depth
  const layers = Array.from({ length: depth }, (_, i) => i + 1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    // Normalize mouse position to be between -0.5 and 0.5
    // This is the position relative to the card's center
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Base class for the card
  const baseClassName = `
    relative overflow-hidden rounded-xl ${border ? "border border-muted" : ""}
    ${backgroundBlur ? "backdrop-blur-sm" : ""}
    ${className}
  `;

  // If using gradient border, apply it
  const borderClassNames = borderGradient
    ? "gradient-border p-[1px] rounded-xl overflow-hidden"
    : "";

  return (
    <div
      className={`${borderClassNames}`}
      style={{
        perspectiveOrigin: "center center",
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        ref={cardRef}
        className={baseClassName}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          transform: "translateZ(0px)",
        }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 },
        }}
      >
        {/* Layers for 3D depth effect */}
        {layers.map((layer) => (
          <motion.div
            key={layer}
            className="absolute inset-0 w-full h-full rounded-xl"
            style={{
              transform: `translateZ(${layer * 3 - 3}px)`,
              opacity: 1 - (layer - 1) * (0.8 / depth),
              zIndex: depth - layer,
            }}
          />
        ))}

        {/* Glare effect */}
        {glare && (
          <motion.div
            className="absolute inset-0 w-full h-full rounded-xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.8) 0%, transparent 80%)`,
              opacity: glareOpacity,
              mixBlendMode: "overlay",
            }}
          />
        )}

        {/* Content container */}
        <div
          className="relative z-10 h-full"
          style={{ transform: "translateZ(20px)" }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedCard;
