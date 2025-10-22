interface CardProps {
  children: React.ReactNode;
  className?: string;
  accent?: 'pink' | 'purple' | 'blue' | 'mint';
}

export default function Card({
  children,
  className = '',
  accent = 'purple',
}: CardProps) {
  const accentClasses = {
    pink: 'border-l-4 border-pastel-pink',
    purple: 'border-l-4 border-pastel-purple',
    blue: 'border-l-4 border-pastel-blue',
    mint: 'border-l-4 border-pastel-mint',
  };

  return (
    <div
      className={`
        card p-6
        ${accentClasses[accent]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
