import { useEffect, useState } from "react";

export default function PremiumBackground() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: any) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      {/* Base Background */}
      <div
        className="
          fixed inset-0 -z-10
          bg-white dark:bg-slate-950
        "
      />

      {/* Static Gradient */}
      <div
        className="
          fixed inset-0 -z-10
          bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.10),transparent_60%)]
          dark:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_60%)]
        "
      />

      {/* Mouse Glow */}
      <div
        className="
          pointer-events-none fixed top-0 left-0 -z-10
          w-[650px] h-[650px] rounded-full blur-[120px]
          opacity-40 dark:opacity-30
        "
        style={{
          transform: `translate(${mouse.x - 250}px, ${mouse.y - 250}px)`,
          background: `
            radial-gradient(circle,
              rgba(59,130,246,${window.matchMedia("(prefers-color-scheme: dark)").matches ? 0.25 : 0.15}),
              transparent 70%
            )
          `,
        }}
      />
      <div
    className="
      pointer-events-none fixed top-0 left-0 -z-10
      w-[650px] h-[650px] rounded-full blur-[160px]
      opacity-50 dark:hidden
    "
    style={{
      transform: `translate(${mouse.x - 325}px, ${mouse.y - 325}px)`,
      background:
        "radial-gradient(circle, rgba(168,85,247,0.25), transparent 70%)",
    }}
  />
    </>
  );
}