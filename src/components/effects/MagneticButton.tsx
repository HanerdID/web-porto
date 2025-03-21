import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  as?: React.ElementType;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  strength = 40,
  radius = 500,
  as = "button",
  href,
  onClick,
  type = "button",
  disabled = false,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  // Motion values for X and Y position
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // Apply spring physics for smoother movement
  const springConfig = { damping: 25, stiffness: 400 };
  const motionX = useMotionValue(0);
  const motionY = useMotionValue(0);
  useEffect(() => {
    motionX.set(mouseX);
    motionY.set(mouseY);
  }, [mouseX, mouseY]);

  const x = useSpring(motionX, springConfig);
  const y = useSpring(motionY, springConfig);

  // Calculate distance between mouse and button center
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current || disabled) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Calculate distance from center
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    // Only apply magnetic effect within defined radius
    if (distance < radius) {
      // Scale movement based on distance (closer = stronger)
      const scaleFactor = Math.max(0, 1 - distance / radius);

      // Apply the magnetic pull effect
      const moveX = distanceX * scaleFactor * (strength / 100);
      const moveY = distanceY * scaleFactor * (strength / 100);

      setMouseX(moveX);
      setMouseY(moveY);
      setActive(true);
    } else if (active) {
      // Reset position if mouse is outside radius
      setMouseX(0);
      setMouseY(0);
      setActive(false);
    }
  };

  // Reset on mouse leave
  const handleMouseLeave = () => {
    setMouseX(0);
    setMouseY(0);
    setActive(false);
  };

  // Handle click effect
  const handleClick = () => {
    if (disabled) return;
    // Add a slight "press" animation
    setMouseX(0);
    setMouseY(0);

    // Execute the onClick callback if provided
    if (onClick) onClick();
  };

  // Determine which element to render
  const Component = as === "a" ? motion.a : motion.button;

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="inline-block"
      style={{ cursor: disabled ? "not-allowed" : "pointer" }}
    >
      <Component
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        href={as === "a" ? href : undefined}
        type={as !== "a" ? type : undefined}
        className={`inline-block ${className}`}
        style={{
          transform: `translate(${x.get()}px, ${y.get()}px)`,
          opacity: disabled ? 0.6 : 1,
          transition: disabled ? "opacity 0.3s ease" : undefined,
        }}
        disabled={as !== "a" ? disabled : undefined}
      >
        {children}
      </Component>
    </div>
  );
};

export default MagneticButton;
