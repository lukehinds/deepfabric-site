import Image from 'next/image';

interface SpacemanFloatProps {
  spacemanNumber: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  size?: number;
}

export default function SpacemanFloat({
  spacemanNumber,
  className = '',
  size = 80,
}: SpacemanFloatProps) {
  return (
    <div
      className={`relative animate-float opacity-60 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={`/spaceman/space${spacemanNumber}.png`}
        alt={`Spaceman ${spacemanNumber}`}
        width={size}
        height={size}
        className="object-contain"
      />
    </div>
  );
}
