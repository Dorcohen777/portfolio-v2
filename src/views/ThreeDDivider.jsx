import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import * as THREE from 'three';
import '../assets/styles/views/threeDDivider.css';

/**
 * Supernova Particle System
 */
function SupernovaParticles({ active, centerPosition = [0, 0, 0] }) {
  const particlesRef = useRef();
  const particleCount = 300; // More particles for bigger effect

  // Generate initial particle data
  const particleData = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Start all particles at center
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      // Random velocity directions (sphere distribution)
      // Bias more particles downward to reach Projects section
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = 1.5 + Math.random() * 3.0; // Much faster particles

      // Extra downward bias for some particles
      const downwardBias = Math.random() > 0.6 ? -0.8 : 0;

      velocities.push({
        x: Math.sin(phi) * Math.cos(theta) * speed,
        y: Math.sin(phi) * Math.sin(theta) * speed + downwardBias,
        z: Math.cos(phi) * speed
      });

      // Warm supernova colors (#f6d3b7, oranges, yellows, whites)
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        // Warm beige
        colors[i * 3] = 0.96;
        colors[i * 3 + 1] = 0.83;
        colors[i * 3 + 2] = 0.72;
      } else if (colorChoice < 0.6) {
        // Orange
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.6;
        colors[i * 3 + 2] = 0.2;
      } else if (colorChoice < 0.85) {
        // Yellow
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.9;
        colors[i * 3 + 2] = 0.3;
      } else {
        // White
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 1.0;
        colors[i * 3 + 2] = 1.0;
      }
    }

    return { positions, velocities, colors };
  }, []);

  useFrame(() => {
    if (!particlesRef.current || !active) return;

    const positions = particlesRef.current.geometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
      // Update positions based on velocity (faster movement)
      positions[i * 3] += particleData.velocities[i].x * 0.12;
      positions[i * 3 + 1] += particleData.velocities[i].y * 0.12;
      positions[i * 3 + 2] += particleData.velocities[i].z * 0.12;

      // Very slight gravity effect (less gravity = particles travel further)
      particleData.velocities[i].y -= 0.001;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!active) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particleData.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particleData.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Main 3D Structure with scroll interaction and supernova effect
 */
function ThreeDStructure({ scrollProgress }) {
  const groupRef = useRef();
  const sphereRef = useRef();
  const [exploding, setExploding] = useState(false);
  const [sphereVisible, setSphereVisible] = useState(true);
  const [hasBeenCentered, setHasBeenCentered] = useState(false);
  const prevScrollProgressRef = useRef(scrollProgress);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Main group rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.2;
      groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }

    // Track if the ball has been centered in viewport at least once
    if (scrollProgress > 0.5 && !hasBeenCentered) {
      setHasBeenCentered(true);
    }

    // Detect scroll direction
    const scrollingDown = scrollProgress < prevScrollProgressRef.current;
    prevScrollProgressRef.current = scrollProgress;

    // Scroll-based effects
    // Trigger explosion ONLY when:
    // 1. Scrolling DOWN (leaving the section)
    // 2. Ball has been centered at least once (to avoid triggering on page load)
    // 3. ScrollProgress is in the trigger zone (MUCH earlier trigger)
    if (
      scrollProgress < 0.6 &&
      scrollProgress > 0.35 &&
      !exploding &&
      sphereVisible &&
      hasBeenCentered &&
      scrollingDown
    ) {
      setExploding(true);
      setSphereVisible(false);

      // Reset explosion after animation completes (longer duration for particles to travel)
      setTimeout(() => {
        setExploding(false);
        setHasBeenCentered(false); // Reset for next time
      }, 5000);
    }

    // When scrolling back in (scrollProgress above 0.3), show sphere again
    if (scrollProgress > 0.3 && !sphereVisible) {
      setSphereVisible(true);
    }

    // Scale effect based on scroll (when visible)
    if (sphereRef.current && sphereVisible) {
      // Keep ball at good size throughout most of scroll
      const scaleEffect = Math.max(0.6, 0.8 + scrollProgress * 0.3);
      sphereRef.current.scale.set(scaleEffect, scaleEffect, scaleEffect);

      // Color shift based on scroll (emissive intensity)
      const emissiveIntensity = Math.max(0.2, 0.3 + scrollProgress * 0.4);
      if (sphereRef.current.material) {
        sphereRef.current.material.emissiveIntensity = emissiveIntensity;
      }

      // Start fading when approaching the explosion threshold
      if (scrollProgress < 0.65) {
        // Fade from full opacity as approaching explosion zone (0.65 to 0.35)
        const fadeOpacity = ((scrollProgress - 0.35) / 0.3) * 0.7;
        if (sphereRef.current.material) {
          sphereRef.current.material.opacity = Math.max(0.1, fadeOpacity);
        }
      } else {
        // Keep full opacity when in view
        if (sphereRef.current.material) {
          sphereRef.current.material.opacity = 0.7;
        }
      }
    }

    // Pulse effect on sphere
    if (sphereRef.current && sphereVisible) {
      const pulse = 1 + Math.sin(time * 0.8) * 0.02;
      const currentScale = sphereRef.current.scale.x;
      sphereRef.current.scale.set(
        currentScale * pulse,
        currentScale * pulse,
        currentScale * pulse
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central wireframe sphere - SMALLER */}
      {sphereVisible && (
        <mesh ref={sphereRef}>
          <sphereGeometry args={[1.4, 32, 32]} />
          <meshStandardMaterial
            color="#f6d3b7"
            emissive="#f6d3b7"
            emissiveIntensity={0.3}
            wireframe={true}
            transparent={true}
            opacity={0.7}
          />
        </mesh>
      )}

      {/* Supernova explosion particles */}
      <SupernovaParticles active={exploding} />
    </group>
  );
}

/**
 * Main ThreeDDivider Component with Scroll Detection
 */
const ThreeDDivider = () => {
  const containerRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress:
      // Positive when in view: 1.0 (centered) to 0.0 (at edge)
      // Negative when scrolled past: 0.0 to -1.0 (fully out of view)
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;

      // Distance from center (positive when below center, negative when above)
      const distanceFromCenter = elementCenter - viewportCenter;
      const maxDistance = windowHeight / 2;

      // Calculate progress
      let progress;
      if (elementCenter > viewportCenter) {
        // Element is below center - entering from bottom
        progress = Math.max(0, 1 - (distanceFromCenter / maxDistance));
      } else {
        // Element is above center - leaving from top
        const distanceAbove = Math.abs(distanceFromCenter);
        if (distanceAbove < maxDistance) {
          // Still visible, going from 1 to 0
          progress = 1 - (distanceAbove / maxDistance);
        } else {
          // Scrolled past - negative values
          progress = -(distanceAbove - maxDistance) / maxDistance;
        }
      }

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="three-d-divider">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#64FFDA" />
        <spotLight
          position={[0, 5, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#F6D3B7"
        />

        <Center>
          <ThreeDStructure scrollProgress={scrollProgress} />
        </Center>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
};

export default ThreeDDivider;
