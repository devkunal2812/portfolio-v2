'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx - 3.5}px, ${my - 3.5}px)`;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.matches('a,button,[role="button"],input,textarea')) {
        ring.style.width = '44px'; ring.style.height = '44px';
        ring.style.borderColor = 'rgba(212,80,10,0.7)';
      } else {
        ring.style.width = '30px'; ring.style.height = '30px';
        ring.style.borderColor = 'rgba(212,80,10,0.35)';
      }
    };
    let raf: number;
    const animate = () => {
      rx += (mx - rx - 15) * 0.14; ry += (my - ry - 15) * 0.14;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    return () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseover', onOver); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden lg:block" style={{ willChange: 'transform' }} />
      <div ref={ringRef} className="cursor-ring hidden lg:block" style={{ willChange: 'transform' }} />
    </>
  );
}
