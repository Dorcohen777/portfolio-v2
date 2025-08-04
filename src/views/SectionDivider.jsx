import React, { useEffect, useRef } from 'react';
import './SectionDivider.css';

const SectionDivider = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 100;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Wave animation
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw flowing lines
      const centerY = canvas.height / 2;
      
      // Multiple wave layers
      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(100, 255, 218, ${0.3 - layer * 0.1})`;
        ctx.lineWidth = 2 - layer * 0.5;
        
        for (let x = 0; x <= canvas.width; x += 2) {
          const y = centerY + 
            Math.sin((x * 0.01) + (time * 0.02) + (layer * 0.5)) * (15 - layer * 3) +
            Math.sin((x * 0.008) + (time * 0.03) + (layer * 0.8)) * (10 - layer * 2);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Floating dots
      for (let i = 0; i < 5; i++) {
        const x = (time * 2 + i * 150) % (canvas.width + 50);
        const y = centerY + Math.sin(time * 0.05 + i) * 20;
        
        ctx.fillStyle = `rgba(139, 233, 253, 0.6)`;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="section-divider-container">
      <canvas
        ref={canvasRef}
        className="section-divider-canvas"
      />
    </div>
  );
};

export default SectionDivider;