import { useEffect } from "react";
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

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow pt-20">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Certificates />
          <Contact />
        </main>

        <Footer />

        {/* Cursor Gradient */}
        <div className="cursor-gradient fixed inset-0 pointer-events-none z-[-1]" />
      </div>
    </>
  );
}