import Link from 'next/link';

interface ArcadeButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: 'cyan' | 'pink' | 'purple';
  className?: string;
  onClick?: () => void;
}

export default function ArcadeButton({
  href,
  children,
  variant = 'cyan',
  className = '',
  onClick,
}: ArcadeButtonProps) {
  const variantClasses = {
    cyan: 'border-neon-cyan hover:bg-neon-cyan hover:shadow-neon-cyan',
    pink: 'border-neon-pink hover:bg-neon-pink hover:shadow-neon-pink',
    purple: 'border-neon-purple hover:bg-neon-purple hover:shadow-neon-purple',
  };

  const baseClasses = `
    arcade-button
    ${variantClasses[variant]}
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
}
