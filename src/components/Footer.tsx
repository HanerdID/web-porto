import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  Send,
  ArrowUp,
  Heart,
} from "lucide-react";
import { Button } from "./ui/button";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const contactLinks = [
    {
      name: "Email",
      icon: <Mail size={18} />,
      href: "mailto:fikriprasetya3@gmail.com",
    },
    {
      name: "GitHub",
      icon: <Github size={18} />,
      href: "https://github.com/HanerdID",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={18} />,
      href: "https://www.linkedin.com/in/fikri-prasetya-nurhidayat-1aa52713a",
    },
    {
      name: "Instagram",
      icon: <Instagram size={18} />,
      href: "https://www.instagram.com/vpen._?igsh=NjM0MHRrOWZxcXhy",
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-muted">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />

      {/* Main footer */}
      <div className="border-t border-muted/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-md bg-gradient-to-br from-theme-600 to-theme-800 p-2">
                  <span className="text-white font-display text-xl">FP</span>
                </div>
                <span className="font-heading font-bold text-xl">
                  Fikri<span className="text-theme-600">Prasetya</span>
                </span>
              </div>
              <p className="text-muted-foreground mb-4">
                A passionate web developer dedicated to creating beautiful,
                functional, and user-friendly experiences.
              </p>
              <div className="flex gap-3">
                {contactLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="p-2 rounded-full bg-muted hover:bg-theme-600 hover:text-white transition-colors"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#home"
                    className="text-muted-foreground hover:text-theme-600 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="text-muted-foreground hover:text-theme-600 transition-colors"
                  >
                    About Me
                  </Link>
                </li>
                <li>
                  <Link
                    href="#projects"
                    className="text-muted-foreground hover:text-theme-600 transition-colors"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="#skills"
                    className="text-muted-foreground hover:text-theme-600 transition-colors"
                  >
                    Skills
                  </Link>
                </li>
                
                <li>
                  <Link
                    href="#contact"
                    className="text-muted-foreground hover:text-theme-600 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Let's Work Together</h3>
              <p className="text-muted-foreground mb-4">
                I'm currently available for freelance work. If you have a
                project that you want to get started, get in touch!
              </p>
              <Button
                variant="outline"
                className="hover:bg-theme-600 hover:text-white transition-colors"
              >
                <span>Hire Me</span>
                <ArrowUp className="ml-2 -rotate-45" size={16} />
              </Button>
            </div>
          </div>

          <div className="border-t border-muted/50 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm flex items-center">
              &copy; {currentYear} Fikri Prasetya. All rights reserved.
              <span className="inline-flex items-center mx-1">
                <Heart
                  size={14}
                  className="fill-accent1 text-accent1 animate-pulse"
                />
              </span>
            </p>
            <div className="mt-4 md:mt-0 flex items-center">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-theme-600 transition-colors"
              >
                <span>Back to Top</span>
                <ArrowUp size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
