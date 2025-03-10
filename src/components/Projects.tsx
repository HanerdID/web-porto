import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import dynamic from "next/dynamic";

// Definisikan interface untuk Project
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  featured?: boolean;
}

// Interface untuk props komponen ProjectCard
interface ProjectCardProps {
  project: Project;
  index: number;
  inView: boolean;
}

// Import ProjectCard secara dinamis untuk code splitting
const ProjectCard = dynamic<ProjectCardProps>(() => import("./ProjectCard"), {
  ssr: true,
  loading: () => (
    <div className="h-[300px] w-full bg-muted/20 animate-pulse rounded-xl"></div>
  ),
});

export const Projects = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Ubah tipe state menjadi number | null untuk menerima nilai project.id
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Menggunakan useMemo untuk menghindari re-render yang tidak perlu
  const projects = useMemo<Project[]>(
    () => [
      {
        id: 1,
        title: "KS Spotseeker",
        description:
          "A tourism platform for Semarang Regency, featuring Google Maps integration, secure admin dashboard, and responsive design. Implemented as MSIB Batch 6 capstone project with Dicoding Indonesia.",
        image: "/images/projects/spotseeker.webp",
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
        image: "/images/projects/hunger-apps.webp",
        tags: ["HTML", "CSS", "JavaScript", "API Integration"],
        demoUrl: "https://hunger-apps-catalogue.vercel.app/",
        githubUrl: "https://github.com/HanerdID/hunger-apps",
        featured: true,
      },
      // ... tambahkan sisa proyek lainnya
    ],
    []
  );

  const featuredProjects = useMemo<Project[]>(
    () => projects.filter((project) => project.featured),
    [projects]
  );

  const regularProjects = useMemo<Project[]>(
    () => projects.filter((project) => !project.featured),
    [projects]
  );

  return (
    <section id="projects" className="py-20 bg-gradient-blue" ref={ref}>
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent2/10 rounded-full blur-3xl z-0" />
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
                    {/* Optimasi gambar dengan Image dari Next.js */}
                    <div className="relative w-full h-full">
                      <Image
                        src={project.image || "/images/project-placeholder.jpg"}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        style={{
                          transform:
                            hoveredIndex === project.id
                              ? "scale(1.05)"
                              : "scale(1)",
                          transition: "transform 0.5s ease-out",
                        }}
                        loading="eager" // Load eagerly for featured projects
                        quality={85}
                      />
                    </div>
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
                        aria-label={`See live demo of ${project.title}`}
                      >
                        <span>Live Demo</span>
                        <ExternalLink size={16} aria-hidden="true" />
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-theme-600 transition-colors"
                        aria-label={`View code of ${project.title}`}
                      >
                        <span>View Code</span>
                        <Github size={16} aria-hidden="true" />
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
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              inView={inView}
            />
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
            aria-label="Lihat profil GitHub"
          >
            <span>See more on GitHub</span>
            <ArrowRight
              size={16}
              className="ml-2 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
