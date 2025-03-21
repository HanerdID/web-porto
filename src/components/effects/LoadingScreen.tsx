import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { isMobile } from "../../utils/device";

interface LoadingScreenProps {
  isLoading: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (!isLoading) {
          const loadingEl = document.getElementById("loading-screen");
          if (loadingEl) loadingEl.style.display = "none";
        }
      }}
      id="loading-screen"
    >
      <div className="relative flex items-center justify-center">
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-theme-600/20"
          animate={
            isMobile()
              ? { scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }
              : { scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }
          }
          transition={{
            duration: isMobile() ? 1.5 : 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="rounded-md bg-gradient-to-br from-theme-600 to-theme-800 p-4 z-10">
          <span className="text-white font-display text-4xl">FP</span>
        </div>
      </div>
      <motion.div
        className="mt-6 text-theme-600 font-medium flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Sparkles size={16} className="mr-2" />
        <span>Welcome to Fikri's Portofolio</span>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
