import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedDividerProps {
  className?: string;
  color?: string;
  width?: string;
  height?: string;
  fromLeft?: boolean;
}

export const AnimatedDivider: React.FC<AnimatedDividerProps> = ({
  className = "",
  color = "currentColor",
  width = "100%",
  height = "2px",
  fromLeft = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div
      ref={ref}
      className={`w-full flex items-center justify-center my-8 ${className}`}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${parseInt(width)} ${parseInt(height)}`}
        className="overflow-visible"
      >
        <motion.path
          d={`M 0,${parseInt(height) / 2} L ${parseInt(width)},${
            parseInt(height) / 2
          }`}
          stroke={color}
          strokeWidth={parseInt(height)}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            pathLength: fromLeft ? 0 : 1,
            pathOffset: fromLeft ? 0 : 1,
          }}
        />

        {/* Optional decorative elements */}
        <motion.circle
          cx={fromLeft ? parseInt(width) : 0}
          cy={parseInt(height) / 2}
          r={parseInt(height) * 2}
          fill={color}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        />
      </svg>
    </div>
  );
};

export default AnimatedDivider;
