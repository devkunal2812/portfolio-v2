'use client';
import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Sphere, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Express',
  'MongoDB', 'PostgreSQL', 'Supabase', 'Redis', 'Python',
  'Docker', 'Git', 'Tailwind', 'OpenAI', 'LangChain',
  'Vercel', 'GraphQL', 'REST', 'Socket.io', 'Linux',
];

const colors = ['#D4500A', '#C4784A', '#8C8070', '#111111', '#E8A87C'];

function WordLabel({ pos, word, color }: { pos: [number,number,number]; word: string; color: string }) {
  const ref = useRef<THREE.Group>(null);
  const { camera } = useThree();
  useFrame(() => { if (ref.current) ref.current.lookAt(camera.position); });
  return (
    <group ref={ref} position={pos}>
      <Text fontSize={0.28} color={color} anchorX="center" anchorY="middle" fillOpacity={0.9}>
        {word}
      </Text>
    </group>
  );
}

function Cloud() {
  const group = useRef<THREE.Group>(null);
  const positions = useMemo<[number,number,number][]>(() => {
    const phi = Math.PI * (3 - Math.sqrt(5));
    return skills.map((_, i) => {
      const y = 1 - (i / (skills.length - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      return [3.2 * Math.cos(theta) * r, 3.2 * y, 3.2 * Math.sin(theta) * r];
    });
  }, []);

  useFrame((s) => {
    if (!group.current) return;
    group.current.rotation.y = s.clock.elapsedTime * 0.12;
    group.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.07) * 0.08;
  });

  return (
    <group ref={group}>
      <Sphere args={[1.8, 32, 32]}>
        <meshStandardMaterial color="#D4500A" transparent opacity={0.06} wireframe />
      </Sphere>
      <Sphere args={[1.4, 16, 16]}>
        <meshStandardMaterial color="#D4500A" transparent opacity={0.04} />
      </Sphere>
      {skills.map((skill, i) => (
        <WordLabel key={skill} pos={positions[i]} word={skill} color={colors[i % colors.length]} />
      ))}
    </group>
  );
}

export default function SkillsCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 50 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
      <ambientLight intensity={1} />
      <pointLight position={[5, 5, 5]} color="#D4500A" intensity={2} />
      <Suspense fallback={null}>
        <Cloud />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>
  );
}
