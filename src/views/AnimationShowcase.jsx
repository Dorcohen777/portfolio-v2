import React, { useState } from 'react';
import CodeMatrix from './CodeMatrix';
import SkillConstellation from './SkillConstellation';
import ProjectCardEffect from './ProjectCardEffect';
import SectionDivider from './SectionDivider';

const AnimationShowcase = () => {
  const [hoveredCard, setHoveredCard] = useState(false);
  
  const sampleSkills = ['react', 'javascript', 'html', 'css', 'nodejs'];

  return (
    <div style={{ 
      background: '#0a0a0a', 
      color: 'white', 
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>
        Portfolio Animation Showcase
      </h1>

      {/* Code Matrix Demo */}
      <div style={{ marginBottom: '60px' }}>
        <h2>1. Code Matrix Background (About Section)</h2>
        <div style={{ 
          position: 'relative', 
          height: '300px', 
          background: '#111',
          borderRadius: '10px',
          overflow: 'hidden'
        }}>
          <CodeMatrix />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50px',
            transform: 'translateY(-50%)',
            zIndex: 10
          }}>
            <h3>About Me Content</h3>
            <p>The code matrix flows behind your content</p>
          </div>
        </div>
      </div>

      {/* Section Divider Demo */}
      <div style={{ marginBottom: '60px' }}>
        <h2>2. Section Dividers</h2>
        <SectionDivider />
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Flowing lines separate your sections beautifully</p>
        </div>
        <SectionDivider />
      </div>

      {/* Skill Constellation Demo */}
      <div style={{ marginBottom: '60px' }}>
        <h2>3. Interactive Skill Constellation (Projects)</h2>
        <div style={{ 
          position: 'relative', 
          height: '250px', 
          background: '#111',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <SkillConstellation skills={sampleSkills} isVisible={true} />
          <div style={{ textAlign: 'center' }}>
            <h3>Hover over the skill nodes!</h3>
            <p>Interactive constellation showing project technologies</p>
          </div>
        </div>
      </div>

      {/* Project Card Effect Demo */}
      <div style={{ marginBottom: '60px' }}>
        <h2>4. Project Card Effects</h2>
        <div 
          style={{ 
            position: 'relative', 
            height: '200px', 
            background: '#111',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          onMouseEnter={() => setHoveredCard(true)}
          onMouseLeave={() => setHoveredCard(false)}
        >
          <ProjectCardEffect isHovered={hoveredCard} />
          <div style={{ textAlign: 'center', zIndex: 5 }}>
            <h3>Project Card</h3>
            <p>Hover to see particle effects!</p>
          </div>
        </div>
      </div>

      {/* Performance Notes */}
      <div style={{ 
        background: '#222', 
        padding: '20px', 
        borderRadius: '10px',
        marginTop: '40px'
      }}>
        <h2>✨ Features & Performance</h2>
        <ul>
          <li>🎯 <strong>No scroll interference</strong> - All animations use `pointer-events: none` where needed</li>
          <li>⚡ <strong>60fps performance</strong> - Optimized canvas animations with requestAnimationFrame</li>
          <li>📱 <strong>Mobile responsive</strong> - Animations scale down on smaller screens</li>
          <li>🎨 <strong>Consistent theme</strong> - Developer-friendly cyan/purple color palette</li>
          <li>🧠 <strong>Smart interactions</strong> - Hover effects enhance without overwhelming</li>
          <li>🔧 <strong>Easy to customize</strong> - Simple color and size adjustments in CSS/JS</li>
        </ul>
      </div>
    </div>
  );
};

export default AnimationShowcase;