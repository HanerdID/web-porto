import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Menu, X, Github, Linkedin, Instagram } from "lucide-react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fungsi untuk smooth scroll ke section yang diinginkan
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Tutup menu mobile jika terbuka
      setMobileMenuOpen(false);

      // Smooth scroll ke section
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-white/80 dark:bg-dark-200/80 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div
            onClick={() => scrollToSection("hero")}
            className="relative z-10 cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <div className="rounded-md bg-gradient-to-br from-theme-600 to-theme-800 p-2">
                <span className="text-white font-display text-xl">FP</span>
              </div>
              <span className="font-heading font-bold text-xl">
                Fikri
                <span className="text-theme-600">Prasetya</span>
              </span>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:block"
            initial="hidden"
            animate="visible"
            variants={navVariants}
          >
            <ul className="flex items-center space-x-8">
              <motion.li variants={itemVariants}>
                <button
                  onClick={() => scrollToSection("hero")}
                  className="nav-link cursor-pointer"
                >
                  Home
                </button>
              </motion.li>
              <motion.li variants={itemVariants}>
                <button
                  onClick={() => scrollToSection("about")}
                  className="nav-link cursor-pointer"
                >
                  About
                </button>
              </motion.li>
              <motion.li variants={itemVariants}>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="nav-link cursor-pointer"
                >
                  Projects
                </button>
              </motion.li>
              <motion.li variants={itemVariants}>
                <button
                  onClick={() => scrollToSection("skills")}
                  className="nav-link cursor-pointer"
                >
                  Skills
                </button>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-theme-600 hover:bg-theme-700 text-white rounded-full px-6"
                >
                  Contact Me
                </Button>
              </motion.li>
            </ul>
          </motion.nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden overflow-hidden bg-white dark:bg-dark-200"
      >
        <div className="container mx-auto px-4 py-4">
          <ul className="flex flex-col space-y-4">
            <li>
              <button
                onClick={() => scrollToSection("hero")}
                className="block py-2 hover:text-theme-600 transition-colors cursor-pointer w-full text-left"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("projects")}
                className="block py-2 hover:text-theme-600 transition-colors cursor-pointer w-full text-left"
              >
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("skills")}
                className="block py-2 hover:text-theme-600 transition-colors cursor-pointer w-full text-left"
              >
                Skills
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("about")}
                className="block py-2 hover:text-theme-600 transition-colors cursor-pointer w-full text-left"
              >
                About
              </button>
            </li>
            <li className="pt-2">
              <Button
                className="w-full bg-theme-600 hover:bg-theme-700 text-white"
                onClick={() => scrollToSection("contact")}
              >
                Contact Me
              </Button>
            </li>
            <li className="pt-4">
              <div className="flex space-x-4 items-center">
                <a
                  href="https://github.com/HanerdID"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-100 transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/fikri-prasetya-nurhidayat-1aa52713a"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-100 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://www.instagram.com/vpen._?igsh=NjM0MHRrOWZxcXhy"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-100 transition-colors"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </li>
          </ul>
        </div>
      </motion.div>
    </header>
  );
};
