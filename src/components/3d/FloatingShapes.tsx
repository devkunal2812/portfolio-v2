'use client';
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Octahedron, Torus, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function Shape({ type, position, color, speed }: {
  type: 'octahedron' | 'torus' | 'sphere';
  position: [number,number,number];
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * speed * 0.5;
    ref.current.rotation.y = s.clock.elapsedTime * speed;
  });
  const mat = <meshStandardMaterial color={color} roughness={0.2} metalness={0.6} transparent opacity={0.85} />;
  return (
    <Float speed={2} floatIntensity={1} rotationIntensity={0.3} position={position}>
      {type === 'octahedron' && <Octahedron ref={ref} args={[0.5]}>{mat}</Octahedron>}
      {type === 'torus' && <Torus ref={ref} args={[0.4, 0.1, 16, 32]}>{mat}</Torus>}
      {type === 'sphere' && <Sphere ref={ref} args={[0.3, 32, 32]}>{mat}</Sphere>}
    </Float>
  );
}

export default function FloatingShapes() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.9} />
      <pointLight position={[3, 3, 3]} color="#D4500A" intensity={2} />
      <pointLight position={[-3, -3, 2]} color="#E8C4A0" intensity={1.5} />
      <Suspense fallback={null}>
        <Shape type="octahedron" position={[-2.5, 1, 0]} color="#D4500A" speed={0.4} />
        <Shape type="torus" position={[2.5, -1, 0]} color="#C4784A" speed={0.5} />
        <Shape type="sphere" position={[0, 2, -1]} color="#D4500A" speed={0.3} />
        <Shape type="octahedron" position={[-2, -2, 0.5]} color="#8C8070" speed={0.6} />
        <Shape type="torus" position={[2, 2, -0.5]} color="#D4500A" speed={0.35} />
      </Suspense>
    </Canvas>
  );
}
