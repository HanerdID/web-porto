import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "./ui/button";
import { Download, ExternalLink } from "lucide-react";
import Image from "next/image";

export const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="about"
      className="pt-20 bg-gradient-to-b from-background to-muted/30"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-2 inline-block gradient-heading">
            About Me
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know more about me, my background, and what drives me.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden animated-border">
              <div className="bg-card h-[400px] md:h-[600px] w-full p-1 rounded-2xl overflow-hidden">
                <div className="h-full w-full rounded-xl relative flex items-center justify-center">
                  <Image
                    src="/images/profile.webp"
                    alt="Fikri Prasetya Nurhidayat - Profile Photo"
                    width={400}
                    height={400}
                    className="object-cover rounded-xl"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectPosition: "center top",
                    }}
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-theme-500/10 rounded-full blur-xl z-0" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent2/10 rounded-full blur-xl z-0" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-4">
                Frontend Developer & UI/UX Enthusiast
              </h3>

              <p className="text-muted-foreground">
                Hello! I'm Fikri Prasetya Nurhidayat, a fresh Informatics
                graduate from Diponegoro University with a 3.73 GPA,
                specializing in web and mobile development.
              </p>

              <p className="text-muted-foreground">
                I possess critical thinking, creative problem-solving, and
                disciplined work ethic. My professional experience includes
                working as a Frontend Developer at PT Digital Logistik
                Internasional and PT Daekyung Indah Heavy Industry, where I
                developed interactive applications and contributed to HRMS
                systems.
              </p>

              <p className="text-muted-foreground">
                I'm aspiring to become a skilled programmer who contributes to
                Indonesia's technological advancement and creates positive
                impact through innovative solutions.
              </p>

              <h4 className="text-lg font-semibold mt-6">Education</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-2">
                <li>
                  Bachelor of Computer Science, Diponegoro University (Jun 2021
                  - Feb 2025)
                </li>
                <li>
                  Certificate in Full-Stack Web Developer, Dicoding Academy (Feb
                  2024 - Jun 2024)
                </li>
              </ul>

              <h4 className="text-lg font-semibold mt-6">Experience</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-2">
                <li>
                  Frontend Developer at PT Sinergi Merah Putih (March 2025 -
                  April 2025)
                </li>
                <li>
                  Frontend Developer at PT Daekyung Indah Heavy Industry (Oct
                  2024 - Jan 2025)
                </li>
                <li>
                  Frontend Developer at PT Digital Logistik Internasional (Jan
                  2024 - Feb 2024)
                </li>
              </ul>

              <div className="flex flex-wrap gap-4 mt-8">
                <Button className="bg-theme-600 hover:bg-theme-700 text-white">
                  <Download size={16} className="mr-2" />
                  Download CV
                </Button>

                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/fikri-prasetya-nurhidayat-1aa52713a/",
                      "_blank"
                    )
                  }
                >
                  <ExternalLink size={16} className="mr-2" />
                  View LinkedIn
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24"
        >
          <h3 className="text-2xl font-bold mb-10 text-center gradient-heading">
            My Journey
          </h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-theme-500 via-accent2 to-accent3 opacity-40"></div>

            {/* Timeline events */}
            <div className="space-y-12 text-sm">
              {[
                {
                  year: "Feb 2025",
                  title:
                    "Graduated from Diponegoro University",
                  description:
                    "Completed Bachelor's degree in Computer Science from Diponegoro University.",
                  dotColor: "bg-theme-600", // Warna biru tema
                },
                {
                  year: "Oct 2024 - Jan 2025",
                  title:
                    "Frontend Developer Intern at PT Daekyung Indah Heavy Industry",
                  description:
                    "Contributed to Human Resource Management System development, implementing interfaces for room management, authentication, and payroll processing with responsive design and API integration.",
                  dotColor: "bg-theme-600", // Warna biru tema
                },
                {
                  year: "Feb 2024 - Jun 2024",
                  title: "SIB Dicoding Cycle 6 Graduate",
                  description:
                    "Completed Frontend and Backend Web Developer certification courses on Dicoding platform.",
                  dotColor: "bg-accent1", // Warna turquoise accent
                },
                {
                  year: "Jan 2024 - Feb 2024",
                  title:
                    "Frontend Developer at PT Digital Logistik Internasional",
                  description:
                    "Developed a prototype of the company's application with a more interactive and modern design, incorporating various animations.",
                  dotColor: "bg-accent2", // Warna merah accent
                },
                {
                  year: "Aug 2023 - Dec 2023",
                  title: "Frontend Developer",
                  description:
                    "Created a student academic information monitoring system for course project named SIMONIKA",
                  dotColor: "bg-accent3", // Warna kuning accent
                },
                {
                  year: "Jun 2021",
                  title: "Started Computer Science Degree",
                  description:
                    "Enrolled in the Informatics program at Diponegoro University, beginning my journey in computer science.",
                  dotColor: "bg-theme-500", // Warna biru muda tema
                },
              ].map((event, index) => (
                <div key={index} className="relative">
                  {/* Dot connector line - khusus untuk semua kecuali item terakhir */}
                  {index < 4 && (
                    <div
                      className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-theme-600/40"
                      style={{ top: "24px", height: "calc(100% + 24px)" }}
                    ></div>
                  )}

                  <div
                    className={`flex items-center ${
                      index % 2 === 0 ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-1/2 px-6 ${
                        index % 2 === 0 ? "text-right" : ""
                      }`}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                        animate={
                          inView
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: index % 2 === 0 ? 50 : -50 }
                        }
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="p-6 rounded-xl bg-white dark:bg-dark-100/30 backdrop-blur-sm border border-muted hover:shadow-md transition-all duration-300"
                      >
                        <span className="text-theme-600 font-semibold">
                          {event.year}
                        </span>
                        <h4 className="text-lg font-semibold mt-1">
                          {event.title}
                        </h4>
                        <p className="text-muted-foreground mt-2">
                          {event.description}
                        </p>
                      </motion.div>
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 * index }}
                        className={`${event.dotColor} rounded-full h-5 w-5 border-4 border-background shadow-md`}
                      ></motion.div>
                    </div>

                    <div className="w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
