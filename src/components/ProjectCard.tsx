import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react"; // Import spesifik
import Image from "next/image"; // Gunakan next/image untuk optimasi
import Link from "next/link";

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

// Interface untuk props komponen
interface ProjectCardProps {
  project: Project;
  index: number;
  inView: boolean;
}

// Komponen terpisah untuk project card agar tidak perlu re-render seluruh daftar
const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  inView,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className="gradient-border">
        <div className="bg-card/80 backdrop-blur-sm rounded-xl overflow-hidden">
          <div className="h-48 w-full relative overflow-hidden">
            {/* Gunakan next/image untuk optimasi */}
            <Image
              src={project.image || "/images/project-placeholder.jpg"}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-transform duration-500 ease-out ${
                isHovered ? "scale-105" : "scale-100"
              }`}
              loading="lazy" // Lazy loading untuk gambar yang mungkin tidak terlihat
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              quality={80} // Menurunkan kualitas untuk kecepatan
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold mb-1">{project.title}</h3>
            <div className="flex flex-wrap gap-2 mt-2 mb-3">
              {project.tags.slice(0, 2).map((tag: string, i: number) => (
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
            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
              {project.description}
            </p>
            <div className="flex justify-between">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-theme-600 hover:text-theme-700 transition-colors"
                aria-label={`Lihat demo ${project.title}`}
              >
                <span>Live Demo</span>
                <ExternalLink size={12} aria-hidden="true" />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-theme-600 transition-colors"
                aria-label={`Lihat kode ${project.title}`}
              >
                <span>View Code</span>
                <Github size={12} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
