import React, { useEffect, useRef } from 'react';
import './CodeMatrix.css';

const CodeMatrix = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Code characters for matrix effect
    const codeChars = [
      '0', '1', '{', '}', '<', '>', '/', '\\', 
      'const', 'let', 'var', 'function', 'return',
      '=', '+', '-', '*', '&', '|', '!', '?',
      'React', 'JS', 'CSS', 'HTML', 'Node'
    ];

    class CodeColumn {
      constructor(x) {
        this.x = x;
        this.y = Math.random() * -canvas.height;
        this.speed = Math.random() * 2 + 1;
        this.chars = [];
        this.length = Math.random() * 20 + 10;
        this.opacity = Math.random() * 0.5 + 0.3;
        
        // Generate character sequence
        for (let i = 0; i < this.length; i++) {
          this.chars.push({
            char: codeChars[Math.floor(Math.random() * codeChars.length)],
            opacity: Math.max(0, 1 - (i / this.length)),
            size: Math.random() * 8 + 10
          });
        }
      }

      update() {
        this.y += this.speed;
        
        // Reset when off screen
        if (this.y > canvas.height + this.length * 20) {
          this.y = Math.random() * -canvas.height - 200;
          this.speed = Math.random() * 2 + 1;
          this.opacity = Math.random() * 0.5 + 0.3;
        }
      }

      draw(ctx) {
        ctx.font = '12px monospace';
        
        this.chars.forEach((charObj, index) => {
          const y = this.y + (index * 18);
          if (y > -20 && y < canvas.height + 20) {
            const alpha = charObj.opacity * this.opacity;
            
            // Gradient effect - brightest at head
            if (index === 0) {
              ctx.fillStyle = `rgba(100, 255, 218, ${alpha})`;
            } else if (index < 3) {
              ctx.fillStyle = `rgba(139, 233, 253, ${alpha * 0.8})`;
            } else {
              ctx.fillStyle = `rgba(199, 146, 234, ${alpha * 0.6})`;
            }
            
            ctx.fillText(charObj.char, this.x, y);
          }
        });
      }
    }

    // Create columns
    const columns = [];
    const columnWidth = 25;
    for (let i = 0; i < canvas.width; i += columnWidth) {
      if (Math.random() > 0.7) { // Sparse columns
        columns.push(new CodeColumn(i));
      }
    }

    // Animation loop
    const animate = () => {
      // Fade effect instead of clear
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      columns.forEach(column => {
        column.update();
        column.draw(ctx);
      });

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
    <canvas
      ref={canvasRef}
      className="code-matrix-canvas"
    />
  );
};

export default CodeMatrix;