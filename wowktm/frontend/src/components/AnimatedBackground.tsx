// Vibrant animated gradient BG with 3D parallax shapes
export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-gradient-to-br from-primary/60 via-secondary/70 to-pink-400/70
                      w-full h-full animate-gradient-move blur-[2px] opacity-80"></div>
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-pink-400/40 rounded-full
                      blur-2xl mix-blend-multiply pointer-events-none animate-float" />
      <div className="absolute bottom-16 right-20 w-64 h-64 bg-blue-500/30 rounded-full
                      blur-3xl mix-blend-multiply pointer-events-none animate-float-reverse" />
    </div>
  );
}
