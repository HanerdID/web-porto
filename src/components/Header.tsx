import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Github, Linkedin, Instagram } from "lucide-react";
import { Button } from "./ui/button";

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

  // Fungsi smooth scroll dengan perbaikan untuk mobile
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();

    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Tutup menu mobile dengan delay
      if (mobileMenuOpen) {
        // Untuk mobile, pertama tutup menu, lalu scroll setelah animasi menu tertutup
        setMobileMenuOpen(false);

        // Berikan waktu untuk animasi penutupan menu
        setTimeout(() => {
          // Scroll ke elemen target dengan animasi smooth
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Update URL hash tanpa reload halaman
          window.history.pushState(null, "", `#${targetId}`);
        }, 300); // 300ms adalah durasi animasi penutupan menu
      } else {
        // Untuk desktop, langsung scroll
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Update URL hash tanpa reload halaman
        window.history.pushState(null, "", `#${targetId}`);
      }
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

  // Data navigasi untuk konsistensi antara desktop dan mobile
  const navigationItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact Me", isButton: true },
  ];

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
          <a
            href="#hero"
            onClick={(e) => handleSmoothScroll(e, "hero")}
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
          </a>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:block"
            initial="hidden"
            animate="visible"
            variants={navVariants}
          >
            <ul className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <motion.li key={item.id} variants={itemVariants}>
                  {item.isButton ? (
                    <Button
                      asChild
                      className="bg-theme-600 hover:bg-theme-700 text-white rounded-full px-6"
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => handleSmoothScroll(e, item.id)}
                      >
                        {item.label}
                      </a>
                    </Button>
                  ) : (
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleSmoothScroll(e, item.id)}
                      className="nav-link cursor-pointer"
                    >
                      {item.label}
                    </a>
                  )}
                </motion.li>
              ))}
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
            {navigationItems.map((item, index) => (
              <li key={item.id} className={item.isButton ? "pt-2" : ""}>
                {item.isButton ? (
                  <Button
                    asChild
                    className="w-full bg-theme-600 hover:bg-theme-700 text-white"
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleSmoothScroll(e, item.id)}
                    >
                      {item.label}
                    </a>
                  </Button>
                ) : (
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleSmoothScroll(e, item.id)}
                    className="block py-2 hover:text-theme-600 transition-colors cursor-pointer w-full text-left"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
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
