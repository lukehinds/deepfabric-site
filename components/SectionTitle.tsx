interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionTitle({
  children,
  className = '',
}: SectionTitleProps) {
  return (
    <h2
      className={`
        text-3xl md:text-4xl font-bold mb-8 text-gray-900
        ${className}
      `}
    >
      {children}
    </h2>
  );
}
