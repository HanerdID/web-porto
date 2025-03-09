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
      href: "mailto:fikri.prasetya@example.com",
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

      {/* Contact section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-card dark:bg-dark-100/50 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-muted">
          <div className="p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold gradient-heading mb-4">
                Get In Touch
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Have a project in mind or just want to say hello? I'd love to
                hear from you!
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="max-w-lg mx-auto"
            >
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full bg-background rounded-lg border border-input px-4 py-2 focus:outline-none focus:ring-2 focus:ring-theme-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-background rounded-lg border border-input px-4 py-2 focus:outline-none focus:ring-2 focus:ring-theme-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              <div className="mt-4">
                <textarea
                  placeholder="Your message"
                  rows={4}
                  className="w-full bg-background rounded-lg border border-input px-4 py-2 focus:outline-none focus:ring-2 focus:ring-theme-500 focus:border-transparent transition-all duration-200"
                ></textarea>
              </div>
              <div className="mt-4">
                <Button className="w-full bg-theme-600 hover:bg-theme-700 text-white rounded-lg">
                  <span>Send Message</span>
                  <Send size={16} className="ml-2" />
                </Button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>

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
                    href="/"
                    className="text-muted-foreground hover:text-theme-600 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="text-muted-foreground hover:text-theme-600 transition-colors"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/skills"
                    className="text-muted-foreground hover:text-theme-600 transition-colors"
                  >
                    Skills
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-theme-600 transition-colors"
                  >
                    About Me
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
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
