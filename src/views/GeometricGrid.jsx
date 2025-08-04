import React, { useEffect, useRef } from 'react';
import './GeometricGrid.css';

const GeometricGrid = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create minimal geometric elements
    const createGridElement = (index) => {
      const element = document.createElement('div');
      element.className = 'grid-element';
      
      // Position in subtle grid pattern
      const row = Math.floor(index / 6);
      const col = index % 6;
      
      element.style.left = (col * 20 + Math.random() * 10) + '%';
      element.style.top = (row * 25 + Math.random() * 15) + '%';
      
      // Random shape via CSS
      const shapes = ['circle', 'square', 'diamond'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      element.classList.add(`shape-${shape}`);
      
      // Random size (very small)
      const size = Math.random() * 8 + 4;
      element.style.width = size + 'px';
      element.style.height = size + 'px';
      
      // Staggered animation delay
      element.style.animationDelay = (index * 0.5) + 's';
      
      return element;
    };

    // Create grid elements
    const elements = [];
    for (let i = 0; i < 18; i++) {
      const element = createGridElement(i);
      container.appendChild(element);
      elements.push(element);
    }

    // Subtle mouse interaction
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const elementX = rect.left + rect.width / 2;
        const elementY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(clientX - elementX, 2) + Math.pow(clientY - elementY, 2)
        );
        
        // Very subtle scale effect
        if (distance < 150) {
          const scale = 1 + (150 - distance) / 150 * 0.5;
          element.style.transform = `scale(${scale})`;
          element.style.opacity = '1';
        } else {
          element.style.transform = 'scale(1)';
          element.style.opacity = '0.6';
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      elements.forEach(element => element.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="geometric-grid-container"
    />
  );
};

export default GeometricGrid;