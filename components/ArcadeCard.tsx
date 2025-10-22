interface ArcadeCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'pink' | 'purple';
}

export default function ArcadeCard({
  children,
  className = '',
  glowColor = 'cyan',
}: ArcadeCardProps) {
  const glowClasses = {
    cyan: 'neon-border hover:shadow-neon-cyan',
    pink: 'neon-border-pink hover:shadow-neon-pink',
    purple: 'border-2 border-neon-purple hover:shadow-neon-purple',
  };

  return (
    <div
      className={`
        bg-space-dark/80 backdrop-blur-sm p-6
        ${glowClasses[glowColor]}
        transition-all duration-300
        hover:scale-105
        ${className}
      `}
    >
      {children}
    </div>
  );
}
