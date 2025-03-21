import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

type Skill = {
  name: string;
  icon: string;
  level: number;
  category: "frontend" | "backend" | "language" | "database" | "design" | "other";
};

export const Skills = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeFilter, setActiveFilter] = useState<string>("all");

  const skills: Skill[] = [
    // Programming Languages
    { name: "JavaScript", icon: "/icons/js.webp", level: 90, category: "language" },
    { name: "TypeScript", icon: "/icons/ts.webp", level: 85, category: "language" },
    { name: "Python", icon: "/icons/python.webp", level: 80, category: "language" },
    { name: "PHP", icon: "/icons/php.webp", level: 85, category: "language" },
    { name: "Java", icon: "/icons/java.webp", level: 75, category: "language" },
    { name: "C", icon: "/icons/c.webp", level: 70, category: "language" },
    
    // Frontend
    { name: "HTML5", icon: "/icons/html5.webp", level: 95, category: "frontend" },
    { name: "CSS3", icon: "/icons/css3.webp", level: 90, category: "frontend" },
    { name: "React.js", icon: "/icons/react.webp", level: 90, category: "frontend" },
    { name: "Next.js", icon: "/icons/nextjs.webp", level: 85, category: "frontend" },
    { name: "Tailwind CSS", icon: "/icons/tailwind.webp", level: 90, category: "frontend" },
    { name: "Bootstrap", icon: "/icons/bootstrap.webp", level: 85, category: "frontend" },
    { name: "shadcn/ui", icon: "/icons/shadcn.webp", level: 80, category: "frontend" },
    { name: "Ant Design", icon: "/icons/antdesign.webp", level: 80, category: "frontend" },
    { name: "DaisyUI", icon: "/icons/daisyui.webp", level: 75, category: "frontend" },
    { name: "Flowbite", icon: "/icons/flowbite.webp", level: 75, category: "frontend" },
    { name: "Framer Motion", icon: "/icons/framer.webp", level: 80, category: "frontend" },
    
    // Backend
    { name: "Node.js", icon: "/icons/nodejs.webp", level: 80, category: "backend" },
    { name: "Express.js", icon: "/icons/express.webp", level: 80, category: "backend" },
    { name: "Laravel", icon: "/icons/laravel.webp", level: 85, category: "backend" },
    
    // Database
    { name: "MySQL", icon: "/icons/mysql.webp", level: 85, category: "database" },
    { name: "PostgreSQL", icon: "/icons/postgresql.webp", level: 80, category: "database" },
    { name: "MongoDB", icon: "/icons/mongodb.webp", level: 75, category: "database" },
    
    // Design & Other
    { name: "Figma", icon: "/icons/figma.webp", level: 80, category: "design" },
    { name: "Git", icon: "/icons/git.webp", level: 85, category: "other" },
  ];

  const filters = [
    { name: "All", value: "all" },
    { name: "Languages", value: "language" },
    { name: "Frontend", value: "frontend" },
    { name: "Backend", value: "backend" },
    { name: "Database", value: "database" },
    { name: "Design", value: "design" },
    { name: "Other", value: "other" },
  ];

  const filteredSkills = activeFilter === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeFilter);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="skills" className="py-20 bg-gradient-accent" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2 inline-block gradient-heading">
            Technical Skills
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My technical toolkit and areas of expertise. I'm constantly learning
            and expanding my skill set.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter.value
                  ? "bg-theme-600 text-white"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              {filter.name}
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          {filteredSkills.map((skill, index) => {
            // Variasi warna untuk card skill
            const bgColors = [
              "bg-card", // warna default
              "bg-theme-50/50", // biru sangat muda
              "bg-accent2/5", // turquoise sangat muda
              "bg-accent3/5", // kuning sangat muda
            ];

            const bgColor = bgColors[index % bgColors.length];

            return (
              <motion.div key={skill.name} variants={item} className="group">
                <div
                  className={`${bgColor} dark:bg-dark-100/40 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center h-full transition-all duration-300 shadow-lg border border-black/10 hover:bg-theme-200 hover:cursor-pointer hover:-translate-y-1 `}
                >
                  <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
                    <div className="absolute inset-0 bg-muted/50 dark:bg-theme-900/20 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-8 h-8 relative z-10"
                      onError={(e) => {
                        // Fallback if image fails to load
                        (e.target as HTMLImageElement).src = "/icons/code.svg";
                      }}
                    />
                  </div>
                  <h3 className="font-medium mb-2">{skill.name}</h3>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};