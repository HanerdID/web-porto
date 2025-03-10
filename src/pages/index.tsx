// src/pages/index.tsx

import { useState } from "react";
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

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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
          Fikri Prasetya | Frontend Developer & Computer Science Graduate
        </title>
        <meta
          name="description"
          content="Personal portfolio of Fikri Prasetya Nurhidayat, a Frontend Developer and Computer Science graduate from Diponegoro University, specializing in web and mobile development"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="Fikri Prasetya, Frontend Developer, Web Developer, React, Next.js, Portfolio, Diponegoro University"
        />
        <meta name="author" content="Fikri Prasetya Nurhidayat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-theme-600 z-[100] origin-left"
        style={{ scaleX }}
      />

      <div className="flex flex-col min-h-screen relative">
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
      </div>
    </>
  );
}
