import React, { useState } from 'react';
import FloatingParticles from './FloatingParticles';
import Interactive3D from './Interactive3D';
import GeometricGrid from './GeometricGrid';

const AnimationSelector = () => {
  const [selectedAnimation, setSelectedAnimation] = useState('FloatingParticles');

  const animations = {
    FloatingParticles: {
      component: FloatingParticles,
      name: 'Floating Particles',
      description: 'Modern minimal particles with mouse interaction - Recommended'
    },
    Interactive3D: {
      component: Interactive3D,
      name: 'Interactive 3D Geometry',
      description: '3D geometric shapes with depth and mouse repulsion'
    },
    GeometricGrid: {
      component: GeometricGrid,
      name: 'Geometric Grid',
      description: 'Ultra-minimal grid pattern with subtle animations'
    }
  };

  const CurrentAnimation = animations[selectedAnimation].component;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', background: '#0a0a0a' }}>
      {/* Animation Display */}
      <CurrentAnimation />
      
      {/* Control Panel */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        zIndex: 1000,
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        minWidth: '250px'
      }}>
        <h3 style={{ margin: '0 0 15px 0' }}>Animation Selector</h3>
        
        {Object.entries(animations).map(([key, animation]) => (
          <div key={key} style={{ marginBottom: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                name="animation"
                value={key}
                checked={selectedAnimation === key}
                onChange={(e) => setSelectedAnimation(e.target.value)}
                style={{ marginRight: '10px' }}
              />
              <div>
                <div style={{ fontWeight: 'bold' }}>{animation.name}</div>
                <div style={{ fontSize: '12px', color: '#ccc' }}>{animation.description}</div>
              </div>
            </label>
          </div>
        ))}
        
        <div style={{ marginTop: '15px', fontSize: '12px', color: '#999' }}>
          Move your mouse to see interactions!<br/>
          All animations allow normal scrolling.
        </div>
      </div>
    </div>
  );
};

export default AnimationSelector;