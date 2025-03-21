import React from "react";
import { motion, Variants } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  duration?: number;
  type?: "chars" | "words" | "lines";
  animationType?: "wave" | "fade" | "slide" | "bounce" | "scale";
  startDelay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  once = true,
  delay = 0,
  duration = 0.05,
  type = "words",
  animationType = "fade",
  startDelay = 0,
}) => {
  // Split the text according to the specified type
  const items =
    type === "chars"
      ? text.split("")
      : type === "words"
      ? text.split(" ")
      : text.split("\\n");

  // Generate container and item variants based on animation type
  const getAnimationVariants = (): Variants => {
    switch (animationType) {
      case "wave":
        return {
          hidden: { opacity: 0, y: 20 },
          visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
              opacity: { duration: duration * 2 },
              y: {
                duration: duration * 3,
                type: "spring",
                stiffness: 100,
                delay: i * duration + startDelay,
              },
            },
          }),
        };

      case "slide":
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: duration,
              delayChildren: startDelay,
            },
          },
          itemHidden: { opacity: 0, x: -20 },
          itemVisible: {
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              damping: 15,
            },
          },
        };

      case "bounce":
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: duration,
              delayChildren: startDelay,
            },
          },
          itemHidden: { opacity: 0, y: 20, scale: 0.8 },
          itemVisible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 10,
            },
          },
        };

      case "scale":
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: duration,
              delayChildren: startDelay,
            },
          },
          itemHidden: { opacity: 0, scale: 0 },
          itemVisible: {
            opacity: 1,
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 10,
            },
          },
        };

      // Default fade animation
      default:
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: duration,
              delayChildren: startDelay,
            },
          },
          itemHidden: { opacity: 0 },
          itemVisible: { opacity: 1 },
        };
    }
  };

  const variants = getAnimationVariants();
  const isWaveAnimation = animationType === "wave";

  return (
    <motion.div
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      transition={{ staggerChildren: duration, delayChildren: delay }}
      variants={isWaveAnimation ? undefined : variants}
    >
      <span className="sr-only">{text}</span>
      {items.map((item, i) => (
        <motion.span
          key={i}
          className="inline-block"
          custom={i}
          variants={
            isWaveAnimation
              ? variants
              : {
                  hidden: variants.itemHidden || { opacity: 0 },
                  visible: variants.itemVisible || { opacity: 1 },
                }
          }
          initial={isWaveAnimation ? "hidden" : undefined}
          animate={isWaveAnimation ? "visible" : undefined}
          style={{
            display: type === "lines" ? "block" : "inline-block",
            marginRight:
              type === "words" ? "0.25em" : type === "chars" ? "0" : undefined,
          }}
        >
          {item === " " ? "\u00A0" : item}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
