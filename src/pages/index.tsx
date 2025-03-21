import { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Projects } from "../components/Projects";
import { Skills } from "../components/Skills";
import { Certificates } from "../components/Certificates";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { motion, useScroll, useSpring } from "framer-motion";
import { Button } from "../components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";

// Import komponen baru dengan dynamic loading untuk optimasi performa
const AnimatedBackground = dynamic(
  () => import("../components/effects/AnimatedBackground"),
  {
    ssr: false,
  }
);

const GeometricPatterns = dynamic(
  () => import("../components/effects/GeometricPatterns"),
  {
    ssr: false,
  }
);

const FloatingShapes = dynamic(
  () => import("../components/effects/FloatingShapes"),
  {
    ssr: false,
  }
);

const MouseFollowEffect = dynamic(
  () => import("../components/effects/MouseFollowEffect"),
  {
    ssr: false,
  }
);

// Import komponen lain yang tidak perlu dynamic loading
import ParallaxSection from "../components/effects/ParallaxSection";
import AnimatedDivider from "../components/effects/AnimatedDivider";
import EnhancedScrollProgress from "../components/effects/EnhancedScrollProgress";
import SVGWaveDivider from "../components/effects/SVGWaveDivider";

// Loading screen component
// Modifikasi LoadingScreen component
const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (!isLoading) {
          // Hapus elemen loading dari DOM setelah animasi selesai
          const loadingEl = document.getElementById('loading-screen');
          if (loadingEl) loadingEl.style.display = 'none';
        }
      }}
      id="loading-screen"
    >
      {/* Konten loading screen */}
      <div className="relative flex items-center justify-center">
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-theme-600/20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.2, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
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

// Scroll indicator component
const ScrollIndicator = () => {
  return (
    <motion.div
      className="fixed bottom-20 right-8 p-4 rounded-2xl transform -translate-x-1/2 z-40 hidden md:flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 0.8 }}
    >
      <span className="text-sm text-muted-foreground mb-2">Scroll</span>
      <motion.div
        className="w-6 h-10 border-2 border-muted bg-black/60 rounded-full flex justify-center p-1"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-1 h-2 bg-theme-600 rounded-full"
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Sembunyikan konten selama loading
    document.body.style.overflow = "hidden";

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Tambahkan delay kecil sebelum menampilkan konten
      setTimeout(() => {
        setContentVisible(true);
        document.body.style.overflow = "";
      }, 300);
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Tutup menu mobile jika terbuka
      setMobileMenuOpen(false);

      // Smooth scroll ke section
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Head>
        <title>
          Fikri Prasetya Nurhidayat | Frontend Developer & Computer Science
          Graduate
        </title>
        <meta
          name="description"
          content="Personal portfolio of Fikri Prasetya Nurhidayat, a Frontend Developer and Computer Science graduate from Diponegoro University, specializing in web and mobile development"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="Fikri Prasetya Nurhidayat, Frontend Developer, Web Developer, React, Next.js, Portfolio, Diponegoro University"
        />
        <meta name="author" content="Fikri Prasetya Nurhidayat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Loading screen */}
      <LoadingScreen isLoading={isLoading} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={`${contentVisible ? "block" : "invisible"}`}
      >
        {/* Background effects */}
        <AnimatedBackground />
        <FloatingShapes count={8} />

        {/* Mouse follow effect */}
        <MouseFollowEffect
          size={30}
          showTrail={true}
          color="rgba(14, 165, 233, 0.4)"
        />

        {/* Scroll Progress Indicator */}
        <EnhancedScrollProgress
          height={4}
          gradientFrom="#0ea5e9"
          gradientTo="#4ECDC4"
          gradientVia="#FF6B6B"
          rounded={true}
          shadow={true}
        />

        <div className="flex flex-col min-h-screen relative">
          {/* Background pattern for entire page */}
          <div className="absolute inset-0 bg-pattern opacity-[0.015] pointer-events-none z-0" />

          {/* Animated geometric patterns in different sections */}
          <div className="absolute top-0 left-0 right-0 h-screen overflow-hidden pointer-events-none">
            <GeometricPatterns variant="top" />
          </div>

          <div className="absolute top-[100vh] left-0 right-0 h-screen overflow-hidden pointer-events-none">
            <GeometricPatterns variant="middle" />
          </div>

          <div className="absolute top-[200vh] left-0 right-0 h-screen overflow-hidden pointer-events-none">
            <GeometricPatterns variant="bottom" />
          </div>

          <Header />

          <ScrollIndicator />

          <main className="flex-grow pt-20 relative z-10">
            {/* Hero section with improved animations */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: isLoading ? 2.2 : 0 }}
            >
              <Hero />
            </motion.div>

            {/* About section with parallax effect */}
            <ParallaxSection direction="up" intensity={0.1}>
              <About />
            </ParallaxSection>

            <AnimatedDivider
              color="rgba(14, 165, 233, 0.3)"
              height="4px"
              className="max-w-md mx-auto"
            />

            {/* Projects section with floating elements */}
            <ParallaxSection direction="down" intensity={0.1}>
              <Projects />
            </ParallaxSection>

            <AnimatedDivider
              color="rgba(78, 205, 196, 0.3)"
              height="4px"
              className="max-w-md mx-auto"
              fromLeft={false}
            />

            {/* Skills section with enhanced animations */}
            <Skills />

            <AnimatedDivider
              color="rgba(255, 209, 102, 0.3)"
              height="4px"
              className="max-w-md mx-auto"
            />

            {/* Certificates section with parallax effect */}
            <ParallaxSection direction="up" intensity={0.1}>
              <Certificates />
            </ParallaxSection>

            {/* Call to Action Section with upgraded visuals */}
            <section className="py-20 relative overflow-hidden">
              <div className="absolute inset-0 bg-theme-900 opacity-95 z-0"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.15)_0%,_transparent_70%)]"></div>

              <SVGWaveDivider
                type="curve"
                color="#0f172a"
                height={100}
                position="top"
                flip={true}
              />

              <div className="container mx-auto px-4 text-center relative z-10">
                <motion.h2
                  className="text-3xl font-bold mb-6 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Let's Build Something Amazing Together
                </motion.h2>

                <motion.p
                  className="text-lg text-theme-100 max-w-2xl mx-auto mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  I'm currently available for freelance projects. If you have a
                  project that you want to get started, think you need my help
                  with something or just fancy saying hello, then get in touch.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Button
                    className="bg-white text-theme-900 hover:bg-theme-100 font-medium text-lg px-8 py-4"
                    onClick={() => scrollToSection("contact")}
                  >
                    <span>Contact Me</span>
                    <ArrowDown className="ml-2 -rotate-45" size={18} />
                  </Button>
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute left-10 top-10 w-20 h-20 rounded-full bg-theme-500/20 blur-xl"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className="absolute right-10 bottom-10 w-24 h-24 rounded-full bg-accent2/20 blur-xl"
                  animate={{
                    scale: [1.2, 0.8, 1.2],
                    opacity: [0.4, 0.2, 0.4],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </section>

            {/* Contact section with parallax effect */}
            <ParallaxSection direction="up" intensity={0.1}>
              <Contact />
            </ParallaxSection>
          </main>

          <Footer />
        </div>
      </motion.div>
    </>
  );
}
