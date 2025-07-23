import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function AnimatedGradientBackground({ children }: Props) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Animated Gradient Layer */}
      <div className="absolute inset-0 z-0 animate-gradient-move bg-gradient-to-tr from-pink-400 via-yellow-300 to-blue-400 opacity-80 blur-[2px]" />
      {/* Content Layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
