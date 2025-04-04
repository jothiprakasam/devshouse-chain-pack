"use client";

import type React from "react";
import { useEffect, useRef } from "react";

export function BackgroundBeams({
  className,
  colors = ["#0a2463", "#3e92cc", "#2a628f", "#13293d", "#16324f"],
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  colors?: string[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawBeams();
    };

    // Draw beams
    const drawBeams = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw some simple beams
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const width = Math.random() * 300 + 100;
        const height = Math.random() * 2 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.random() * Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.1;
        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.restore();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [colors]);

  return (
    <div className={`fixed inset-0 z-0 ${className}`} {...props}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
