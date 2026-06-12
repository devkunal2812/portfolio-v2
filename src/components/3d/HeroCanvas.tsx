'use client';
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Torus, Sphere, Box, OrbitControls, MeshWobbleMaterial, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function TorusKnot() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * 0.18;
    ref.current.rotation.y = s.clock.elapsedTime * 0.25;
  });
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[1.1, 0.35, 128, 32]} />
        <meshStandardMaterial
          color="#D4500A"
          roughness={0.15}
          metalness={0.6}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  );
}

function FloatingOrb({ position, color, scale }: { position: [number,number,number]; color: string; scale: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * 0.3;
    ref.current.rotation.z = s.clock.elapsedTime * 0.2;
  });
  return (
    <Float speed={1.5 + scale} floatIntensity={1} rotationIntensity={0.5} position={position}>
      <Sphere ref={ref} args={[scale, 32, 32]}>
        <MeshDistortMaterial color={color} distort={0.4} speed={2} roughness={0.2} metalness={0.5} />
      </Sphere>
    </Float>
  );
}

function FloatingRing({ position, color }: { position: [number,number,number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * 0.4;
    ref.current.rotation.y = s.clock.elapsedTime * 0.2;
  });
  return (
    <Float speed={2.5} floatIntensity={0.6} position={position}>
      <Torus ref={ref} args={[0.5, 0.12, 16, 48]}>
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
      </Torus>
    </Float>
  );
}

function SmallCube({ position }: { position: [number,number,number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * 0.5;
    ref.current.rotation.y = s.clock.elapsedTime * 0.7;
  });
  return (
    <Float speed={3} floatIntensity={1.2} position={position}>
      <Box ref={ref} args={[0.3, 0.3, 0.3]}>
        <meshStandardMaterial color="#C4784A" roughness={0.3} metalness={0.4} wireframe />
      </Box>
    </Float>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} color="#D4500A" intensity={3} />
      <pointLight position={[-5, -3, 3]} color="#E8C4A0" intensity={2} />
      <pointLight position={[0, 5, -2]} color="#ffffff" intensity={1} />
      <Suspense fallback={null}>
        <TorusKnot />
        <FloatingOrb position={[-3.2, 1.5, -1]} color="#C4784A" scale={0.45} />
        <FloatingOrb position={[3, -1.5, -1.5]} color="#D4500A" scale={0.35} />
        <FloatingOrb position={[-2.5, -2, 0.5]} color="#E8A87C" scale={0.25} />
        <FloatingRing position={[2.8, 2, -0.5]} color="#D4500A" />
        <FloatingRing position={[-3, -0.5, -1]} color="#C4784A" />
        <SmallCube position={[2, -2.5, 0.5]} />
        <SmallCube position={[-1.5, 2.8, -0.5]} />
        <SmallCube position={[3.5, 0.5, -1]} />
      </Suspense>
    </Canvas>
  );
}
