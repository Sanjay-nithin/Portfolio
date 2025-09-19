import { useEffect, useRef } from "react";

const MouseTracker = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      // Smooth easing
      pos.current.x += (mouse.current.x - pos.current.x) * 0.2;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x - 100}px, ${pos.current.y - 100}px, 0)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${pos.current.x - 150}px, ${pos.current.y - 150}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-40"
        style={{
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(66, 165, 245, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      <div
        ref={glowRef}
        className="fixed pointer-events-none z-30"
        style={{
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(159, 122, 234, 0.05) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
    </>
  );
};

export default MouseTracker;
