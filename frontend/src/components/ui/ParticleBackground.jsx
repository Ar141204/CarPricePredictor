import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef();
  const particleCount = useRef(0);

  // Initialize particles
  const initParticles = useCallback((canvas) => {
    particleCount.current = Math.floor((canvas.width * canvas.height) / 20000); // Slightly fewer particles for better performance
    particles.current = [];

    for (let i = 0; i < particleCount.current; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5, // Smaller particles
        speedX: Math.random() * 0.3 - 0.15, // Slower movement
        speedY: Math.random() * 0.3 - 0.15,
        color: `hsla(${Math.random() * 60 + 200}, 80%, 60%, ${Math.random() * 0.3 + 0.1})` // Semi-transparent
      });
    }
  }, []);

  // Update particles
  const updateParticles = useCallback((canvas) => {
    particles.current.forEach(particle => {
      // Move particles
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

      // Mouse interaction (subtle effect)
      const dx = mouse.current.x - particle.x;
      const dy = mouse.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        const angle = Math.atan2(dy, dx);
        const force = 0.05; // More subtle effect
        particle.x -= Math.cos(angle) * force * (150 - distance) / 30;
        particle.y -= Math.sin(angle) * force * (150 - distance) / 30;
      }
    });
  }, []);

  // Draw particles
  const drawParticles = useCallback((ctx, canvas) => {
    // Clear with a semi-transparent black to create trails
    ctx.fillStyle = 'rgba(10, 10, 20, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections
    const particlesArray = particles.current;
    const maxDistance = 100;
    
    for (let i = 0; i < particlesArray.length; i++) {
      for (let j = i + 1; j < particlesArray.length; j++) {
        const p1 = particlesArray[i];
        const p2 = particlesArray[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = 1 - (distance / maxDistance);
          // Use a gradient based on distance for a more modern look
          const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          gradient.addColorStop(0, `rgba(167, 139, 250, ${opacity * 0.3})`);
          gradient.addColorStop(1, `rgba(99, 102, 241, ${opacity * 0.3})`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    ctx.save();
    particlesArray.forEach(particle => {
      // Create radial gradient for each particle
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 2
      );
      gradient.addColorStop(0, particle.color);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    updateParticles(canvas);
    drawParticles(ctx, canvas);
    animationFrameId.current = requestAnimationFrame(animate);
  }, [updateParticles, drawParticles]);

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(canvas);
  }, [initParticles]);

  // Mouse move handler
  const handleMouseMove = useCallback((e) => {
    mouse.current = {
      x: e.clientX,
      y: e.clientY
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set initial size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Initialize particles
    initParticles(canvas);
    
    // Start animation loop
    animationFrameId.current = requestAnimationFrame(animate);
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [animate, handleResize, handleMouseMove, initParticles]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 1.5 }}
    />
  );
};

export default ParticleBackground;
