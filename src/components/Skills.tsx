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
    { name: "JavaScript", icon: "/icons/js.png", level: 90, category: "language" },
    { name: "TypeScript", icon: "/icons/ts.png", level: 85, category: "language" },
    { name: "Python", icon: "/icons/python.png", level: 80, category: "language" },
    { name: "PHP", icon: "/icons/php.png", level: 85, category: "language" },
    { name: "Java", icon: "/icons/java.png", level: 75, category: "language" },
    { name: "C", icon: "/icons/c.png", level: 70, category: "language" },
    
    // Frontend
    { name: "HTML5", icon: "/icons/html5.png", level: 95, category: "frontend" },
    { name: "CSS3", icon: "/icons/css3.png", level: 90, category: "frontend" },
    { name: "React.js", icon: "/icons/react.png", level: 90, category: "frontend" },
    { name: "Next.js", icon: "/icons/nextjs.png", level: 85, category: "frontend" },
    { name: "Tailwind CSS", icon: "/icons/tailwind.png", level: 90, category: "frontend" },
    { name: "Bootstrap", icon: "/icons/bootstrap.png", level: 85, category: "frontend" },
    { name: "shadcn/ui", icon: "/icons/shadcn.png", level: 80, category: "frontend" },
    { name: "Ant Design", icon: "/icons/antdesign.png", level: 80, category: "frontend" },
    { name: "DaisyUI", icon: "/icons/daisyui.png", level: 75, category: "frontend" },
    { name: "Flowbite", icon: "/icons/flowbite.png", level: 75, category: "frontend" },
    { name: "Framer Motion", icon: "/icons/framer.png", level: 80, category: "frontend" },
    
    // Backend
    { name: "Node.js", icon: "/icons/nodejs.png", level: 80, category: "backend" },
    { name: "Express.js", icon: "/icons/express.png", level: 80, category: "backend" },
    { name: "Laravel", icon: "/icons/laravel.png", level: 85, category: "backend" },
    
    // Database
    { name: "MySQL", icon: "/icons/mysql.png", level: 85, category: "database" },
    { name: "PostgreSQL", icon: "/icons/postgresql.png", level: 80, category: "database" },
    { name: "MongoDB", icon: "/icons/mongodb.png", level: 75, category: "database" },
    
    // Design & Other
    { name: "Figma", icon: "/icons/figma.png", level: 80, category: "design" },
    { name: "Git", icon: "/icons/git.png", level: 85, category: "other" },
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
    <section id="skills" className="py-20 bg-gradient-to-b from-muted/30 to-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2 inline-block gradient-heading">Technical Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My technical toolkit and areas of expertise. I'm constantly learning and expanding my skill set.
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
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={item}
              className="group"
            >
              <div className="bg-card dark:bg-dark-100/40 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-muted">
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
                <div className="w-full bg-muted rounded-full h-1.5 mt-auto">
                  <motion.div
                    className="bg-theme-600 h-1.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  {skill.level}%
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};