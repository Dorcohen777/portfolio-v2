import React, { useEffect, useRef } from 'react';

const Interactive3D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 60;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 3D geometry simulation (pseudo-3D with 2D canvas)
    class Geometry {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.vz = (Math.random() - 0.5) * 2;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.type = Math.floor(Math.random() * 3); // 0: triangle, 1: square, 2: hexagon
        this.color = this.getRandomColor();
        this.size = Math.random() * 20 + 10;
      }

      getRandomColor() {
        const colors = [
          'rgba(100, 255, 218, 0.7)', // Cyan
          'rgba(255, 183, 3, 0.7)',   // Gold
          'rgba(139, 233, 253, 0.7)', // Light blue
          'rgba(199, 146, 234, 0.7)', // Purple
          'rgba(255, 121, 198, 0.7)'  // Pink
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update(mouseX, mouseY) {
        // Move in 3D space
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;
        this.rotation += this.rotationSpeed;

        // Mouse interaction (subtle repulsion)
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          const force = (120 - distance) / 120;
          this.vx += (dx / distance) * force * 0.1;
          this.vy += (dy / distance) * force * 0.1;
        }

        // Apply damping
        this.vx *= 0.99;
        this.vy *= 0.99;

        // Wrap around screen
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.y < -50) this.y = canvas.height + 50;
        if (this.y > canvas.height + 50) this.y = -50;
        if (this.z < 0) this.z = 1000;
        if (this.z > 1000) this.z = 0;
      }

      draw(ctx) {
        const scale = 1000 / (1000 - this.z);
        const size = this.size * scale;
        const alpha = scale * 0.7;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = alpha;

        // Draw different shapes
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color.replace('0.7', '0.2');
        ctx.lineWidth = 2;

        switch(this.type) {
          case 0: // Triangle
            ctx.moveTo(0, -size/2);
            ctx.lineTo(-size/2, size/2);
            ctx.lineTo(size/2, size/2);
            ctx.closePath();
            break;
          case 1: // Square
            ctx.rect(-size/2, -size/2, size, size);
            break;
          case 2: // Hexagon
            for (let i = 0; i < 6; i++) {
              const angle = (i * Math.PI) / 3;
              const x = Math.cos(angle) * size/2;
              const y = Math.sin(angle) * size/2;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            break;
          default:
            break;
        }

        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    }

    // Create geometries
    const geometries = [];
    for (let i = 0; i < 15; i++) {
      geometries.push(new Geometry());
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    // Mouse tracking (passive, doesn't interfere with scroll)
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      geometries.forEach(geometry => {
        geometry.update(mouseX, mouseY);
        geometry.draw(ctx);
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: '60px',
        left: 0,
        width: '100%',
        height: 'calc(100vh - 60px)',
        zIndex: 1,
        pointerEvents: 'none', // KEY: Allows scroll to pass through
        background: 'transparent'
      }}
    />
  );
};

export default Interactive3D;