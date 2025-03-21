import type { AppProps } from "next/app";
import AOS from "aos";
import "aos/dist/aos.css"; // Impor AOS CSS
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import "../styles/globals.css";

function MyApp({ Component, pageProps, router }: AppProps) {
  // Inisialisasi AOS untuk animasi scroll
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  // Inisialisasi Lenis untuk smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Hubungkan dengan requestAnimationFrame
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  // Preferensi reduce motion untuk aksesibilitas
  useEffect(() => {
    // Pastikan kode ini berjalan di client-side
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        // Matikan animasi jika pengguna memilih preferensi reduce motion
        document.documentElement.classList.add("reduce-motion");
      }
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  );
}

export default MyApp;
