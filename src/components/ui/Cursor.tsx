"use client";

import { useCursor } from "@/hooks/useCursor";

export function Cursor() {
  const { dotRef, ringRef } = useCursor();

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
