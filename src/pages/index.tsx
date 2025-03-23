// src/pages/index.tsx
import { useState, useEffect } from "react";
import Head from "next/head";
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
import { Sparkles } from "lucide-react";

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setMobileMenuOpen(false);

      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
            const loadingEl = document.getElementById("loading-screen");
            if (loadingEl) loadingEl.style.display = "none";
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
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 2,
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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setIsLoading(false);
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

      <LoadingScreen isLoading={isLoading} />

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-theme-600 z-[100] origin-left"
        style={{ scaleX }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={`flex flex-col min-h-screen relative ${
          contentVisible ? "block" : "invisible"
        }`}
      >
        {/* Background pattern for entire page */}
        <div className="absolute inset-0 bg-pattern opacity-[0.015] pointer-events-none z-0" />

        <Header />

        <main className="flex-grow pt-20 relative z-10">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Certificates />

          {/* Call to Action Section */}
          <section className="py-20 bg-theme-900 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">
                Let's Build Something Amazing Together
              </h2>
              <p className="text-lg text-theme-100 max-w-2xl mx-auto mb-8">
                I'm currently available for freelance projects. If you have a
                project that you want to get started, think you need my help
                with something or just fancy saying hello, then get in touch.
              </p>
              <Button
                className="bg-white text-theme-900 hover:bg-theme-100 font-medium text-lg px-8 py-4"
                onClick={() => scrollToSection("contact")}
              >
                Contact Me
              </Button>
            </div>
          </section>

          <Contact />
        </main>

        <Footer />
      </motion.div>
    </>
  );
}
