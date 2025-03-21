import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimateInViewProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  threshold?: number;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  type?: 'fade' | 'scale' | 'slide' | 'rotate' | 'clip' | 'none';
  staggerChildren?: boolean;
  staggerDelay?: number;
  customVariants?: any;
}

export const AnimateInView: React.FC<AnimateInViewProps> = ({
  children,
  className = '',
  as = 'div',
  threshold = 0.1,
  delay = 0,
  duration = 0.5,
  distance = 50,
  once = true,
  direction = 'up',
  type = 'fade',
  staggerChildren = false,
  staggerDelay = 0.1,
  customVariants,
}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const getComponent = () => {
    if (as === "div") return motion.div;
    if (as === "span") return motion.span;
    if (as === "p") return motion.p;
    if (as === "section") return motion.section;
    if (as === "article") return motion.article;
    // Tambahkan komponen lain yang Anda perlukan
    return motion.div; // Default
  };

  const MotionComponent = getComponent();

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once, threshold]);

  // Generate animation variants based on type and direction
  const getVariants = () => {
    if (customVariants) return customVariants;

    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          duration, 
          delay,
          staggerChildren: staggerChildren ? staggerDelay : 0,
        },
      },
    };

    switch (type) {
      case 'fade':
        return baseVariants;
      
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { 
              duration, 
              delay,
              staggerChildren: staggerChildren ? staggerDelay : 0,
            },
          },
        };
      
      case 'slide':
        let slideProps = {};
        
        if (direction === 'up') slideProps = { y: distance };
        else if (direction === 'down') slideProps = { y: -distance };
        else if (direction === 'left') slideProps = { x: distance };
        else if (direction === 'right') slideProps = { x: -distance };
        
        return {
          hidden: { opacity: 0, ...slideProps },
          visible: { 
            opacity: 1, 
            y: 0, 
            x: 0,
            transition: { 
              duration, 
              delay,
              staggerChildren: staggerChildren ? staggerDelay : 0,
            },
          },
        };
      
      case 'rotate':
        return {
          hidden: { opacity: 0, rotate: -5 },
          visible: {
            opacity: 1,
            rotate: 0,
            transition: {
              duration,
              delay,
              staggerChildren: staggerChildren ? staggerDelay : 0,
            },
          },
        };
      
      case 'clip':
        return {
          hidden: { 
            opacity: 0, 
            clipPath: direction === 'up' ? 'inset(100% 0 0 0)' : 
                      direction === 'down' ? 'inset(0 0 100% 0)' : 
                      direction === 'left' ? 'inset(0 0 0 100%)' : 
                      'inset(0 100% 0 0)' 
          },
          visible: { 
            opacity: 1, 
            clipPath: 'inset(0 0 0 0)',
            transition: { 
              duration, 
              delay,
              staggerChildren: staggerChildren ? staggerDelay : 0,
            },
          },
        };
      
      case 'none':
        return {
          hidden: {},
          visible: {
            transition: { 
              delay,
              staggerChildren: staggerChildren ? staggerDelay : 0,
            },
          },
        };
      
      default:
        return baseVariants;
    }
  };

  const variants = getVariants();

  return (
    <MotionComponent
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </MotionComponent>
  );

};

export default AnimateInView;