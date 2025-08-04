import React, { useEffect, useRef } from 'react';
import './SkillConstellation.css';

const SkillConstellation = ({ skills = [], isVisible = false }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Skill nodes
    class SkillNode {
      constructor(skill, index, total) {
        this.skill = skill;
        this.baseX = canvas.width * 0.5 + Math.cos((index / total) * Math.PI * 2) * 80;
        this.baseY = canvas.height * 0.5 + Math.sin((index / total) * Math.PI * 2) * 60;
        this.x = this.baseX;
        this.y = this.baseY;
        this.vx = 0;
        this.vy = 0;
        this.radius = Math.random() * 3 + 4;
        this.color = this.getSkillColor(skill);
        this.pulse = Math.random() * Math.PI * 2;
        this.connections = [];
        this.hovered = false;
      }

      getSkillColor(skill) {
        const colorMap = {
          'react': 'rgba(97, 218, 251, 0.8)',
          'javascript': 'rgba(240, 219, 79, 0.8)',
          'html': 'rgba(227, 79, 38, 0.8)',
          'css': 'rgba(21, 114, 182, 0.8)',
          'nodejs': 'rgba(104, 160, 99, 0.8)',
          'mongodb': 'rgba(76, 175, 80, 0.8)',
          'sass': 'rgba(207, 100, 154, 0.8)',
          'php': 'rgba(119, 123, 180, 0.8)',
          'wordpress': 'rgba(0, 115, 170, 0.8)'
        };
        return colorMap[skill.toLowerCase()] || 'rgba(100, 255, 218, 0.8)';
      }

      update(mouseX, mouseY) {
        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        this.hovered = distance < 30;
        
        if (distance < 50) {
          const force = (50 - distance) / 50;
          this.vx -= (dx / distance) * force * 0.5;
          this.vy -= (dy / distance) * force * 0.5;
        }

        // Spring back to base position
        const springX = (this.baseX - this.x) * 0.05;
        const springY = (this.baseY - this.y) * 0.05;
        
        this.vx += springX;
        this.vy += springY;
        
        // Apply velocity with damping
        this.vx *= 0.9;
        this.vy *= 0.9;
        
        this.x += this.vx;
        this.y += this.vy;
        
        // Pulse animation
        this.pulse += 0.05;
      }

      draw(ctx) {
        const pulseSize = Math.sin(this.pulse) * 0.3 + 1;
        const currentRadius = this.radius * pulseSize * (this.hovered ? 1.5 : 1);
        
        // Glow effect
        ctx.shadowBlur = this.hovered ? 20 : 10;
        ctx.shadowColor = this.color;
        
        // Main node
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        // Skill label
        if (this.hovered) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(this.skill.toUpperCase(), this.x, this.y - currentRadius - 10);
        }
      }

      drawConnections(ctx, nodes) {
        nodes.forEach(node => {
          if (node !== this) {
            const distance = Math.sqrt(
              Math.pow(this.x - node.x, 2) + Math.pow(this.y - node.y, 2)
            );
            
            if (distance < 120) {
              const opacity = Math.max(0, (120 - distance) / 120) * 0.3;
              ctx.strokeStyle = `rgba(100, 255, 218, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(this.x, this.y);
              ctx.lineTo(node.x, node.y);
              ctx.stroke();
            }
          }
        });
      }
    }

    // Create skill nodes
    const nodes = skills.map((skill, index) => 
      new SkillNode(skill, index, skills.length)
    );

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections first
      nodes.forEach(node => {
        node.drawConnections(ctx, nodes);
      });

      // Update and draw nodes
      nodes.forEach(node => {
        node.update(mouseX, mouseY);
        node.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [skills, isVisible]);

  if (!isVisible || skills.length === 0) return null;

  return (
    <canvas
      ref={canvasRef}
      className="skill-constellation-canvas"
    />
  );
};

export default SkillConstellation;