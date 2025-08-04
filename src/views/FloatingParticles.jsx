import React, { useEffect, useRef } from 'react';
import './FloatingParticles.css';

const FloatingParticles = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create particles
    const particleCount = 25;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      
      // Random position
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      // Random size (small and minimal)
      const size = Math.random() * 4 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      // Random animation delay
      particle.style.animationDelay = Math.random() * 10 + 's';
      
      // Random color from dev-friendly palette
      const colors = [
        'rgba(100, 255, 218, 0.6)', // Cyan
        'rgba(255, 183, 3, 0.6)',   // Gold
        'rgba(139, 233, 253, 0.6)', // Light blue
        'rgba(199, 146, 234, 0.6)', // Purple
        'rgba(255, 121, 198, 0.6)'  // Pink
      ];
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      container.appendChild(particle);
      particles.push(particle);
    }

    // Mouse interaction (subtle, doesn't block scroll)
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      particles.forEach((particle, index) => {
        const rect = particle.getBoundingClientRect();
        const particleX = rect.left + rect.width / 2;
        const particleY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(clientX - particleX, 2) + Math.pow(clientY - particleY, 2)
        );
        
        // Subtle repulsion effect within 100px
        if (distance < 100) {
          const angle = Math.atan2(particleY - clientY, particleX - clientX);
          const force = (100 - distance) / 100;
          const moveX = Math.cos(angle) * force * 20;
          const moveY = Math.sin(angle) * force * 20;
          
          particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.3})`;
        } else {
          particle.style.transform = 'translate(0, 0) scale(1)';
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      particles.forEach(particle => particle.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="floating-particles-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none', // KEY: Allows scroll and clicks to pass through
        overflow: 'hidden'
      }}
    />
  );
};

export default FloatingParticles;