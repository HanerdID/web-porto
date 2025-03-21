import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import TypewriterComponent from "typewriter-effect";
import { ArrowDown, Code, Sparkles, Zap } from "lucide-react";
import { Button } from "./ui/button";
import AnimatedText from "./effects/AnimatedText";

export const Hero = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoother spring effect for mouse movement
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Transform mouse position for tilt effect
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 1000 });

  useEffect(() => {
    // Hanya jalankan di client-side
    if (typeof window !== "undefined") {
      // Set ukuran awal
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // Tambahkan event listener untuk resize
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);

      // Cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const tiltX = useTransform(smoothMouseX, [0, windowSize.width], [10, -10]);

  const tiltY = useTransform(smoothMouseY, [0, windowSize.height], [-10, 10]);

  // Circle position based on mouse movement
  const circleX = useTransform(
    smoothMouseX,
    [0, windowSize.width],
    ["20%", "80%"]
  );

  const circleY = useTransform(
    smoothMouseY,
    [0, windowSize.height],
    ["20%", "80%"]
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Tutup menu mobile jika terbuka
      setMobileMenuOpen(false);

      // Smooth scroll ke section
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Animated background gradient with Framer Motion
  const gradientVariants = {
    hidden: {
      backgroundPosition: "0% 50%",
    },
    visible: {
      backgroundPosition: "100% 50%",
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 15,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      id="hero"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(120deg, rgba(14,165,233,0.05), rgba(78,205,196,0.08), rgba(255,107,107,0.05), rgba(14,165,233,0.08))",
          backgroundSize: "400% 400%",
        }}
        variants={gradientVariants}
        initial="hidden"
        animate="visible"
      />

      {/* Animated background elements */}
      <motion.div
        className="absolute left-[10%] top-[20%] w-64 h-64 rounded-full bg-theme-500/10 blur-3xl z-0"
        style={{ x: tiltX, y: tiltY }}
        transition={{ duration: 0.8 }}
      />

      <motion.div
        className="absolute right-[10%] bottom-[20%] w-72 h-72 rounded-full bg-accent2/10 blur-3xl z-0"
        style={{
          x: useTransform(tiltX, (value) => -value),
          y: useTransform(tiltY, (value) => -value),
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Interactive gradient circle that follows mouse */}
      <motion.div
        className="absolute w-[30vw] h-[30vw] rounded-full opacity-20 z-0 pointer-events-none"
        style={{
          x: circleX,
          y: circleY,
          background:
            "radial-gradient(circle, rgba(14,165,233,0.3) 0%, rgba(78,205,196,0.2) 50%, transparent 80%)",
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-pattern opacity-[0.015] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-2 px-4 py-1 bg-theme-500/10 rounded-full text-theme-700 dark:text-theme-300 font-medium text-sm"
          >
            <span className="flex items-center gap-1">
              <Sparkles size={14} className="text-theme-600" />
              Frontend Developer & Computer Science Graduate
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ perspective: 1000 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
              style={{
                transformStyle: "preserve-3d",
                rotateX: tiltY,
                rotateY: tiltX,
              }}
            >
              <span className="block">
                <AnimatedText
                  text="Hi, I'm"
                  animationType="fade"
                  duration={0.1}
                />
              </span>
              <span className="hero-text-gradient font-display block mt-2">
                <AnimatedText
                  text="Fikri Prasetya Nurhidayat"
                  animationType="wave"
                  duration={0.04}
                  delay={0.5}
                />
              </span>
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl md:text-2xl font-medium text-muted-foreground mb-8 flex items-center justify-center"
          >
            <span className="mr-2">I create</span>
            <span className="text-theme-600 font-medium inline">
              <TypewriterComponent
                options={{
                  strings: [
                    "responsive web interfaces",
                    "interactive applications",
                    "user-centered designs",
                    "innovative solutions",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mb-8 max-w-2xl mx-auto"
          >
            <p className="text-muted-foreground">
              Fresh Informatics graduate from Diponegoro University,
              specializing in web and mobile development. Passionate about
              creating innovative applications that solve real-world problems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              className="bg-theme-600 hover:bg-theme-700 text-white font-medium text-lg px-8 py-6 h-auto rounded-full group"
              onClick={() => scrollToSection("projects")}
            >
              <span>View My Work</span>
              <motion.span
                className="ml-2"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Zap size={18} />
              </motion.span>
            </Button>

            <Button
              variant="outline"
              className="border-theme-600 text-theme-600 hover:bg-theme-600/10 font-medium text-lg px-8 py-6 h-auto rounded-full group"
              onClick={() => scrollToSection("contact")}
            >
              <span>Get in Touch</span>
              <motion.span
                className="ml-2"
                initial={{ scale: 1 }}
                whileHover={{ rotate: 90 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Code size={18} />
              </motion.span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-4 mb-40 flex justify-center animate-bounce"
          >
            <ArrowDown size={28} className="text-theme-600" />
          </motion.div>
        </div>
      </div>

      {/* Social proof indicators with enhanced animations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 py-6 bg-gradient-to-t from-background/90 via-background/70 to-transparent backdrop-blur-sm"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8">
            <motion.div
              className="flex items-center gap-2 text-sm text-muted-foreground"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="font-semibold text-theme-600">3.73</span> GPA in
              Computer Science
            </motion.div>

            <motion.div
              className="flex items-center gap-2 text-sm text-muted-foreground"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="font-semibold text-theme-600">2+</span>{" "}
              Professional Experiences
            </motion.div>

            <motion.div
              className="flex items-center gap-2 text-sm text-muted-foreground"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="font-semibold text-theme-600">5+</span> Projects
              Completed
            </motion.div>

            <div className="flex items-center gap-6">
              {/* Social icons with hover effects */}
              {[
                {
                  href: "https://github.com/HanerdID",
                  svg: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  ),
                },
                {
                  href: "https://www.linkedin.com/in/fikri-prasetya-nurhidayat-1aa52713a",
                  svg: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  ),
                },
                {
                  href: "https://www.instagram.com/vpen._?igsh=NjM0MHRrOWZxcXhy",
                  svg: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  ),
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-theme-600 transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {social.svg}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
