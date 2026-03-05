"use client";

import { useEffect, useRef } from "react";

export function useCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringPos = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18; // más suave
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      const dotW = parseFloat(dot.style.width || "10") / 2;
      dot.style.transform = `translate3d(${mousePos.current.x - dotW}px, ${mousePos.current.y - dotW}px, 0)`;

      const ringW = parseFloat(ring.style.width || "36") / 2;
      ring.style.transform = `translate3d(${ringPos.current.x - ringW}px, ${ringPos.current.y - ringW}px, 0)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      dot.style.background = "rgba(200,255,0,0.4)";
      dot.style.width = "25px";
      dot.style.height = "25px";
      ring.style.width = "60px";
      ring.style.height = "60px";
    };

    const onLeave = () => {
      dot.style.background = "var(--lime)";
      dot.style.width = "10px";
      dot.style.height = "10px";
      ring.style.width = "36px";
      ring.style.height = "36px";
    };

    const interactables = document.querySelectorAll(
      "a, button, [data-cursor-hover]"
    );
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    document.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return { dotRef, ringRef };
}
