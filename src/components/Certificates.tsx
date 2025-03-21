import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, CheckCircle2 } from "lucide-react";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credential?: string;
  href?: string;
  verified: boolean;
}

export const Certificates = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const certificates: Certificate[] = [
    {
      id: 1,
      title: "Dicoding Certificate",
      issuer: "Dicoding Academy",
      date: "June 2024",
      credential: "Dicoding Indonesia",
      href: "www.dicoding.com",
      verified: true,
    },
    {
      id: 2,
      title: "Alibaba Cloud Certification",
      issuer: "Alibaba Cloud Academy",
      date: "Oct 2024",
      credential: "Alibaba Cloud Academy",
      href: "www.alibabacloud.com",
      verified: true,
    },
    {
      id: 3,
      title: "Oracle Primavera P6 Professional Project Management Fundamentals",
      issuer: "Oracle Academy",
      date: "March 2024",
      credential: "Oracle Learning",
      href: "www.oracle.com",
      verified: true,
    },
    {
      id: 4,
      title: "Database Programming with SQL",
      issuer: "Oracle Academy",
      date: "June 2023",
      credential: "Oracle Learning",
      href: "www.oracle.com",
      verified: true,
    },
    {
      id: 5,
      title: "Database Programming with PL/SQL",
      issuer: "Oracle Academy",
      date: "June 2023",
      credential: "Oracle Learning",
      href: "www.oracle.com",
      verified: true,
    },
    {
      id: 6,
      title: "Database Design",
      issuer: "Oracle Academy",
      date: "Dec 2022",
      credential: "Oracle Learning",
      href: "www.oracle.com",
      verified: true,
    },
  ];

  return (
    <section
      id="certificates"
      className="py-20 bg-gradient-to-b from-muted/30 to-background"
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
            Certifications
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and achievements in web development and
            related technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-card dark:bg-dark-100/40 backdrop-blur-sm rounded-xl p-6 border border-muted hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start h-full gap-4">
                <div className="rounded-full bg-theme-500/10 p-3 flex-shrink-0">
                  <Award className="h-6 w-6 text-theme-600" />
                </div>
                <div className="flex flex-col h-full w-full">
                  <h3 className="font-bold text-lg mb-1">{cert.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    <span className="mr-2">{cert.issuer}</span>• {cert.date}
                  </p>

                  <div className="flex justify-between w-full h-full items-end text-sm mt-2 pr-2">
                    {cert.verified && (
                      <div className="flex items-center text-green-600 dark:text-green-400">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        <span>Verified</span>
                      </div>
                    )}

                    {cert.credential && (
                      <a
                        href={cert.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex text-theme-600 hover:text-theme-700 transition-colors"
                      >
                        View Credential
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
