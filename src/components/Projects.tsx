import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const Projects = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "KS Spotseeker",
      description:
        "A tourism platform for Semarang Regency, featuring Google Maps integration, secure admin dashboard, and responsive design. Implemented as MSIB Batch 6 capstone project with Dicoding Indonesia.",
      image: "/images/projects/spotseeker.jpg",
      tags: ["React.js", "Express.js", "PostgreSQL", "Google Maps API"],
      demoUrl: "https://ks-spotseeker.vercel.app/",
      githubUrl: "https://github.com/HanerdID/spotseeker",
      featured: true,
    },
    {
      id: 2,
      title: "Hunger Apps",
      description:
        "A restaurant catalog prototype with CRUD functionality, API integration, and responsive interfaces with search and filtering features to enhance user experience across all devices.",
      image: "/images/projects/hunger-apps.jpg",
      tags: ["HTML", "CSS", "JavaScript", "API Integration"],
      demoUrl: "https://hunger-apps-catalogue.vercel.app/",
      githubUrl: "https://github.com/HanerdID/hunger-apps",
      featured: true,
    },
    {
      id: 3,
      title: "SIMONIKA",
      description:
        "Contributed to a Laravel-based University Academic Information System as Front-End Web Developer, creating user interfaces for student and administrative functions.",
      image: "/images/projects/simonika.jpg",
      tags: ["Laravel", "PHP", "MySQL", "Bootstrap"],
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 4,
      title: "Furniboost",
      description:
        "Contributed to a furniture e-commerce website as a web developer, implementing product displays, shopping cart functionality, and user authentication.",
      image: "/images/projects/furniboost.jpg",
      tags: ["JavaScript", "CSS", "React", "Node.js"],
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 5,
      title: "HRMS for PT Daekyung Indah",
      description:
        "Contributed to a comprehensive Human Resource Management System with user-friendly interfaces for room management, user authentication, and employee payroll processing.",
      image: "/images/projects/hrms.jpg",
      tags: ["React.js", "Tailwind CSS", "API Integration"],
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 6,
      title: "Digital Stamp Application",
      description:
        "Developed a prototype with interactive and modern design, incorporating various animations for a company engaged in the distribution of digital stamps.",
      image: "/images/projects/digital-stamp.jpg",
      tags: ["Next.js", "TypeScript", "Framer Motion"],
      demoUrl: "#",
      githubUrl: "#",
      featured: false,
    },
  ];

  const featuredProjects = projects.filter((project) => project.featured);
  const regularProjects = projects.filter((project) => !project.featured);

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-b from-background to-muted/30"
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
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of my recent work and passion projects. Each project
            reflects my journey as a developer.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(project.id)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative overflow-hidden rounded-xl animated-border"
            >
              <div className="bg-card dark:bg-dark-100/80 backdrop-blur-sm p-1 rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  <div className="overflow-hidden rounded-lg h-60 md:h-auto relative">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-500 ease-out"
                      style={{
                        backgroundImage: `url(${
                          project.image || "/images/project-placeholder.jpg"
                        })`,
                        transform:
                          hoveredIndex === project.id
                            ? "scale(1.05)"
                            : "scale(1)",
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-3">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 rounded-full bg-theme-100 dark:bg-theme-900/30 text-theme-700 dark:text-theme-300 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-theme-600 hover:text-theme-700 transition-colors"
                      >
                        <span>Live Demo</span>
                        <ExternalLink size={16} />
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-theme-600 transition-colors"
                      >
                        <span>View Code</span>
                        <Github size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-8 text-center"
        >
          Other Projects
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-dark-100/40 backdrop-blur-sm border-muted">
                <div
                  className="h-48 w-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${
                      project.image || "/images/project-placeholder.jpg"
                    })`,
                  }}
                />
                <CardHeader className="pb-2">
                  <CardTitle>{project.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 rounded-full bg-theme-100 dark:bg-theme-900/30 text-theme-700 dark:text-theme-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 2 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        +{project.tags.length - 2}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-theme-600 hover:text-theme-700 transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={12} />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-theme-600 transition-colors"
                  >
                    <span>View Code</span>
                    <Github size={12} />
                  </a>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            className="rounded-full group"
            onClick={() => window.open("https://github.com/HanerdID", "_blank")}
          >
            <span>See more on GitHub</span>
            <ArrowRight
              size={16}
              className="ml-2 transition-transform group-hover:translate-x-1"
            />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
