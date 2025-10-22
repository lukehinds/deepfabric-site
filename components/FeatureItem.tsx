'use client';

import { useState } from 'react';

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureItem({ icon, title, description }: FeatureItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`transition-all duration-300 ${isHovered ? 'transform translate-x-2' : ''}`}>
        <div className="flex items-start gap-4">
          <span className="text-3xl">{icon}</span>
          <div className="flex-grow">
            <h3 className={`text-lg font-semibold mb-2 transition-colors ${isHovered ? 'text-brand-blue' : 'text-slate-950'}`}>
              {title}
            </h3>
            <p className="text-slate-600 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 bg-brand-blue rounded-full transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
