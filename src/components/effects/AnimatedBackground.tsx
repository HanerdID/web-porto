import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const devicePixelRatio =
    typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize particles
    const initParticles = () => {
      particles.current = [];

      // Pastikan kode ini hanya dijalankan di client-side
      if (typeof window === "undefined") return;

      const totalParticles = Math.min(50, Math.floor(window.innerWidth / 30)); // Responsive particle count

      for (let i = 0; i < totalParticles; i++) {
        const particleColors = [
          "rgba(14, 165, 233, 0.6)", // theme-500 color
          "rgba(78, 205, 196, 0.6)", // accent2 color
          "rgba(255, 107, 107, 0.6)", // accent1 color
          "rgba(255, 209, 102, 0.6)", // accent3 color
        ];

        particles.current.push({
          x:
            Math.random() *
            (typeof window !== "undefined" ? window.innerWidth : 1000),
          y:
            Math.random() *
            (typeof window !== "undefined" ? window.innerHeight : 1000),
          size: Math.random() * 5 + 1,
          speedX: (Math.random() - 0.5) * 1,
          speedY: (Math.random() - 0.5) * 1,
          color:
            particleColors[Math.floor(Math.random() * particleColors.length)],
        });
      }
    };

    // Handle resize
    const handleResize = () => {
      if (typeof window === "undefined") return;

      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      initParticles();
    };

    // Hanya tambahkan event listener di client-side
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      // Track mouse movement
      const handleMouseMove = (e: MouseEvent) => {
        mousePosition.current = { x: e.clientX, y: e.clientY };
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Initial setup
      handleResize();

      // Animation loop
      let animationFrameId: number;

      const render = () => {
        if (!ctx || !canvas) return;

        ctx.clearRect(
          0,
          0,
          typeof window !== "undefined" ? window.innerWidth : 1000,
          typeof window !== "undefined" ? window.innerHeight : 1000
        );

        // Update and draw particles
        particles.current.forEach((particle, index) => {
          // Update position
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Bounce off edges
          if (
            particle.x >
              (typeof window !== "undefined" ? window.innerWidth : 1000) ||
            particle.x < 0
          ) {
            particle.speedX *= -1;
          }

          if (
            particle.y >
              (typeof window !== "undefined" ? window.innerHeight : 1000) ||
            particle.y < 0
          ) {
            particle.speedY *= -1;
          }

          // Mouse interaction - particles move away from cursor
          const dx = mousePosition.current.x - particle.x;
          const dy = mousePosition.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            const force = (100 - distance) / 1500;

            particle.speedX -= Math.cos(angle) * force;
            particle.speedY -= Math.sin(angle) * force;
          }

          // Apply some friction
          particle.speedX *= 0.99;
          particle.speedY *= 0.99;

          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();

          // Draw connections between nearby particles
          particles.current.forEach((otherParticle, otherIndex) => {
            if (index !== otherIndex) {
              const dx = particle.x - otherParticle.x;
              const dy = particle.y - otherParticle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(14, 165, 233, ${
                  ((150 - distance) / 150) * 0.2
                })`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.stroke();
              }
            }
          });
        });

        animationFrameId = requestAnimationFrame(render);
      };

      // Start animation
      render();

      // Cleanup
      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default AnimatedBackground;
