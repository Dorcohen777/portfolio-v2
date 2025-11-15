import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center, Float } from '@react-three/drei';
import '../assets/styles/views/threeDDivider.css';

/**
 * Animated 3D Geometric Node Component
 */
function GeometricNode({ position, color, scale = 1, shape = 'box' }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Gentle floating rotation
    meshRef.current.rotation.y = time * 0.5;
    meshRef.current.rotation.x = Math.sin(time * 0.7) * 0.3;
    // Subtle scale pulse
    const pulse = 1 + Math.sin(time * 2 + position[0]) * 0.1;
    meshRef.current.scale.set(scale * pulse, scale * pulse, scale * pulse);
  });

  const geometry = shape === 'box' ?
    <boxGeometry args={[0.5, 0.5, 0.5]} /> :
    shape === 'octahedron' ?
    <octahedronGeometry args={[0.4]} /> :
    <tetrahedronGeometry args={[0.4]} />;

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh ref={meshRef} position={position}>
        {geometry}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

/**
 * Main 3D Structure with scroll interaction
 */
function ThreeDStructure({ scrollProgress }) {
  const groupRef = useRef();
  const sphereRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Main group rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.2;
      groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }

    // Scroll-based effects
    if (sphereRef.current && scrollProgress !== null) {
      // Scale effect based on scroll
      const scaleEffect = 1 + scrollProgress * 0.5;
      sphereRef.current.scale.set(scaleEffect, scaleEffect, scaleEffect);

      // Color shift based on scroll (emissive intensity)
      const emissiveIntensity = 0.2 + scrollProgress * 0.5;
      if (sphereRef.current.material) {
        sphereRef.current.material.emissiveIntensity = emissiveIntensity;
      }
    }

    // Pulse effect on sphere
    if (sphereRef.current) {
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
      {/* Central wireframe sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial
          color="#f6d3b7"
          emissive="#f6d3b7"
          emissiveIntensity={0.3}
          wireframe={true}
          transparent={true}
          opacity={0.7}
        />
      </mesh>
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

      // Calculate when the element is in viewport
      // 0 = just entering viewport from bottom
      // 1 = centered in viewport
      // Progress goes from 0 to 1 as element scrolls into view
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
      const maxDistance = windowHeight;

      let progress = 1 - (distanceFromCenter / maxDistance);
      progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1

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
