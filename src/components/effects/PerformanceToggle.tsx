import React, { useState, useEffect } from "react";
import { Zap, ZapOff } from "lucide-react";

const PerformanceToggle: React.FC = () => {
  const [highPerformance, setHighPerformance] = useState(false);

  useEffect(() => {
    // Pastikan kode ini hanya berjalan di browser
    try {
      const savedPreference = localStorage.getItem("highPerformanceMode");
      if (savedPreference === "true") {
        setHighPerformance(true);
        document.documentElement.classList.add("high-performance-mode");
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  const togglePerformance = () => {
    try {
      const newValue = !highPerformance;
      setHighPerformance(newValue);

      localStorage.setItem("highPerformanceMode", String(newValue));

      if (newValue) {
        document.documentElement.classList.add("high-performance-mode");
      } else {
        document.documentElement.classList.remove("high-performance-mode");
      }
    } catch (error) {
      console.error("Error updating performance mode:", error);
    }
  };

  return (
    <button
      onClick={togglePerformance}
      className={`fixed bottom-6 right-6 md:bottom-8 md:left-1/2 md:-translate-x-1/2 z-50 p-3 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 md:w-auto md:max-w-fit ${
        highPerformance ? "bg-red-600 text-white" : "bg-theme-600 text-white"
      }`}
      title={highPerformance ? "Switch to Normal Mode" : "Switch to Lite Mode"}
    >
      {highPerformance ? (
        <>
          <ZapOff size={18} />
          <span className="text-xs md:text-sm font-medium">Lite Mode</span>
        </>
      ) : (
        <>
          <Zap size={18} />
          <span className="text-xs md:text-sm font-medium">Normal Mode</span>
        </>
      )}
    </button>
  );
};

export default PerformanceToggle;
