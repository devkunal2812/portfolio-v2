'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Sphere, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  'React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB',
  'PostgreSQL', 'Supabase', 'Python', 'Redis', 'Docker',
  'GraphQL', 'Tailwind', 'GSAP', 'Three.js', 'AI/ML',
  'Express', 'Git', 'Linux', 'REST', 'Firebase',
];

function SkillWord({ position, text, color }: {
  position: [number, number, number];
  text: string;
  color: string;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ camera }) => {
    if (!ref.current) return;
    ref.current.lookAt(camera.position);
  });

  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={0.22}
        color={color}
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.9}
      >
        {text}
      </Text>
    </group>
  );
}

function SphereCloud() {
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const pos: [number, number, number][] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < skills.length; i++) {
      const y = 1 - (i / (skills.length - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      pos.push([
        3 * Math.cos(theta) * radius,
        3 * y,
        3 * Math.sin(theta) * radius,
      ]);
    }
    return pos;
  }, []);

  const colors = ['#00d4ff', '#7c3aed', '#10b981', '#f59e0b'];

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Core sphere */}
      <Sphere args={[1.5, 32, 32]}>
        <meshStandardMaterial
          color="#0d1fa3"
          transparent
          opacity={0.3}
          wireframe
        />
      </Sphere>

      {/* Inner glow */}
      <Sphere args={[1.2, 16, 16]}>
        <meshStandardMaterial
          color="#00d4ff"
          transparent
          opacity={0.05}
          emissive="#00d4ff"
          emissiveIntensity={0.5}
        />
      </Sphere>

      {/* Skill labels */}
      {skills.map((skill, i) => (
        <SkillWord
          key={skill}
          position={positions[i]}
          text={skill}
          color={colors[i % colors.length]}
        />
      ))}
    </group>
  );
}

export default function SkillSphere() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} color="#00d4ff" intensity={1} />
      <pointLight position={[-5, -5, 5]} color="#7c3aed" intensity={1} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
      <SphereCloud />
    </Canvas>
  );
}
