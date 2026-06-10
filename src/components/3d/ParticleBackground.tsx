'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 1200 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, colors, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    const cyanColor = new THREE.Color('#00d4ff');
    const violetColor = new THREE.Color('#7c3aed');
    const emeraldColor = new THREE.Color('#10b981');

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const colorChoice = Math.random();
      let color: THREE.Color;
      if (colorChoice < 0.5) color = cyanColor;
      else if (colorChoice < 0.8) color = violetColor;
      else color = emeraldColor;

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      scales[i] = Math.random();
    }
    return { positions, colors, scales };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingCube({ position, scale, color }: {
  position: [number, number, number];
  scale: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => 0.3 + Math.random() * 0.5, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.15}
        wireframe
      />
    </mesh>
  );
}

const cubes = [
  { position: [-8, 3, -5] as [number, number, number], scale: 0.8, color: '#00d4ff' },
  { position: [8, -2, -8] as [number, number, number], scale: 1.2, color: '#7c3aed' },
  { position: [-6, -4, -3] as [number, number, number], scale: 0.6, color: '#10b981' },
  { position: [5, 5, -6] as [number, number, number], scale: 0.9, color: '#00d4ff' },
  { position: [-12, 1, -10] as [number, number, number], scale: 1.5, color: '#7c3aed' },
  { position: [12, -3, -7] as [number, number, number], scale: 0.7, color: '#10b981' },
];

export default function ParticleBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 60 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={0.3} />
      <pointLight position={[-10, -10, -10]} color="#7c3aed" intensity={0.3} />
      <Particles count={800} />
      {cubes.map((cube, i) => (
        <FloatingCube key={i} {...cube} />
      ))}
    </Canvas>
  );
}
