'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, OrbitControls, Sphere, MeshDistortMaterial, Ring } from '@react-three/drei';
import * as THREE from 'three';

function FloatingCode() {
  const group = useRef<THREE.Group>(null);
  const snippets = [
    { text: '<React />', position: [-3, 2, 0] as [number,number,number], color: '#00d4ff', scale: 0.25 },
    { text: 'Next.js', position: [3, -1, -1] as [number,number,number], color: '#7c3aed', scale: 0.22 },
    { text: '{}', position: [-2.5, -2, 0.5] as [number,number,number], color: '#10b981', scale: 0.35 },
    { text: 'AI', position: [2.5, 2.5, -0.5] as [number,number,number], color: '#f59e0b', scale: 0.3 },
    { text: 'const', position: [-1, 3, -1] as [number,number,number], color: '#00d4ff', scale: 0.2 },
    { text: '[]', position: [3.5, 0, 0] as [number,number,number], color: '#7c3aed', scale: 0.28 },
  ];

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  return (
    <group ref={group}>
      {snippets.map((s, i) => (
        <Float
          key={i}
          speed={1.5 + i * 0.2}
          rotationIntensity={0.3}
          floatIntensity={0.5}
          position={s.position}
        >
          <mesh>
            <boxGeometry args={[0.8, 0.35, 0.08]} />
            <meshStandardMaterial
              color={s.color}
              transparent
              opacity={0.15}
              emissive={s.color}
              emissiveIntensity={0.3}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function TechOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1.2, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#0d1fa3"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          envMapIntensity={1}
          transparent
          opacity={0.8}
        />
      </Sphere>
      {/* Inner glow sphere */}
      <Sphere args={[0.8, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#00d4ff"
          transparent
          opacity={0.08}
          emissive="#00d4ff"
          emissiveIntensity={0.4}
        />
      </Sphere>
      {/* Rings */}
      <Ring args={[1.5, 1.6, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color="#00d4ff"
          transparent
          opacity={0.3}
          emissive="#00d4ff"
          emissiveIntensity={0.5}
        />
      </Ring>
      <Ring args={[2, 2.05, 64]} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <meshStandardMaterial
          color="#7c3aed"
          transparent
          opacity={0.2}
          emissive="#7c3aed"
          emissiveIntensity={0.4}
        />
      </Ring>
    </Float>
  );
}

function ParticleDisk() {
  const count = 300;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 1.8 + Math.random() * 1.5;
    const spread = (Math.random() - 0.5) * 0.3;

    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = spread;
    positions[i * 3 + 2] = Math.sin(angle) * radius;

    const t = Math.random();
    colors[i * 3] = t < 0.5 ? 0 : 0.49;
    colors[i * 3 + 1] = t < 0.5 ? 0.83 : 0.22;
    colors[i * 3 + 2] = t < 0.5 ? 1 : 0.93;
  }

  const diskRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!diskRef.current) return;
    diskRef.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <points ref={diskRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color="#00d4ff" intensity={2} />
      <pointLight position={[-5, -5, 5]} color="#7c3aed" intensity={2} />
      <pointLight position={[0, 0, 8]} color="#ffffff" intensity={0.5} />

      <Suspense fallback={null}>
        <TechOrb />
        <ParticleDisk />
        <FloatingCode />
      </Suspense>
    </Canvas>
  );
}
