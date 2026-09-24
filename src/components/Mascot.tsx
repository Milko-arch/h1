import React from 'react';

interface MascotProps {
  mood?: 'happy' | 'cheering' | 'thinking' | 'sad' | 'talking';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  avatarId?: string;
  className?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  mood = 'happy',
  size = 'md',
  avatarId = 'owl-explorer',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-44 h-44'
  }[size];

  // Mascot colors: Duolingo iconic friendly vibrant lime green (#58cc02)
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${sizeClasses} ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className={`w-full h-full drop-shadow-md transition-transform duration-300 ${
          mood === 'cheering' ? 'animate-bounce' : mood === 'talking' ? 'animate-pulse' : ''
        }`}
      >
        {/* Footprint Shadow */}
        <ellipse cx="100" cy="185" rx="55" ry="12" fill="#00000015" />

        {/* Body (Cute round owl explorer) */}
        <ellipse cx="100" cy="115" rx="65" ry="60" fill="#58cc02" />
        <ellipse cx="100" cy="125" rx="50" ry="42" fill="#78d91c" />

        {/* Belly feathers (lighter green) */}
        <path
          d="M 75 125 Q 100 155 125 125 Q 100 140 75 125 Z"
          fill="#d7ff65"
          opacity="0.9"
        />

        {/* Wings */}
        {mood === 'cheering' ? (
          <>
            {/* Wings Up celebrating */}
            <path d="M 40 100 Q 15 60 45 65 Q 55 85 40 100 Z" fill="#46a302" />
            <path d="M 160 100 Q 185 60 155 65 Q 145 85 160 100 Z" fill="#46a302" />
          </>
        ) : (
          <>
            {/* Wings at side */}
            <ellipse cx="40" cy="120" rx="14" ry="26" transform="rotate(15 40 120)" fill="#46a302" />
            <ellipse cx="160" cy="120" rx="14" ry="26" transform="rotate(-15 160 120)" fill="#46a302" />
          </>
        )}

        {/* Big expressive eyes (Duolingo style) */}
        {mood === 'sad' ? (
          <>
            {/* Sad eyes */}
            <circle cx="75" cy="95" r="24" fill="#ffffff" />
            <circle cx="125" cy="95" r="24" fill="#ffffff" />
            <ellipse cx="75" cy="102" r="10" fill="#2b3442" />
            <ellipse cx="125" cy="102" r="10" fill="#2b3442" />
            {/* Tear */}
            <circle cx="62" cy="118" r="5" fill="#38bdf8" />
          </>
        ) : (
          <>
            {/* Bright happy round eyes */}
            <circle cx="72" cy="92" r="25" fill="#ffffff" />
            <circle cx="128" cy="92" r="25" fill="#ffffff" />

            {/* Iris */}
            <circle cx="76" cy="92" r="14" fill="#1cb0f6" />
            <circle cx="124" cy="92" r="14" fill="#1cb0f6" />

            {/* Pupil */}
            <circle cx="78" cy="92" r="9" fill="#042f2e" />
            <circle cx="122" cy="92" r="9" fill="#042f2e" />

            {/* Big sparkle */}
            <circle cx="82" cy="88" r="4.5" fill="#ffffff" />
            <circle cx="126" cy="88" r="4.5" fill="#ffffff" />
            <circle cx="73" cy="97" r="2" fill="#ffffff" />
            <circle cx="119" cy="97" r="2" fill="#ffffff" />
          </>
        )}

        {/* Orange Beak */}
        <polygon points="100,102 88,114 112,114" fill="#ff9600" />
        <polygon points="100,118 90,114 110,114" fill="#e07b00" />

        {/* Rosy cheeks */}
        <ellipse cx="50" cy="112" rx="10" ry="6" fill="#ff708f" opacity="0.6" />
        <ellipse cx="150" cy="112" rx="10" ry="6" fill="#ff708f" opacity="0.6" />

        {/* Feet / Boots (Golden Footprints!) */}
        <ellipse cx="80" cy="172" rx="14" ry="8" fill="#ff9600" />
        <ellipse cx="120" cy="172" rx="14" ry="8" fill="#ff9600" />

        {/* Avatar Headwear */}
        {avatarId === 'lincoln-hat' && (
          <g transform="translate(100, 52)">
            {/* Stovepipe Lincoln Hat */}
            <rect x="-45" y="-10" width="90" height="12" rx="3" fill="#1e293b" />
            <rect x="-28" y="-70" width="56" height="62" rx="4" fill="#0f172a" />
            {/* Red band */}
            <rect x="-28" y="-20" width="56" height="10" fill="#dc2626" />
          </g>
        )}

        {avatarId === 'tubman-lantern' && (
          <g transform="translate(145, 110)">
            {/* Glowing Lantern */}
            <rect x="-10" y="-15" width="20" height="28" rx="4" fill="#78350f" />
            <rect x="-7" y="-10" width="14" height="18" rx="2" fill="#fef08a" />
            <circle cx="0" cy="-1" r="5" fill="#f59e0b" />
          </g>
        )}

        {avatarId === 'general-grant' && (
          <g transform="translate(100, 55)">
            {/* Union General Blue Kepi Cap */}
            <path d="M -38 -2 Q 0 -22 38 -2 Q 40 4 35 10 L -35 10 Z" fill="#1e3a8a" />
            <path d="M -40 10 Q 0 16 40 10 L 32 14 Q 0 20 -32 14 Z" fill="#0f172a" />
            {/* Gold star */}
            <polygon points="0,-4 2,-1 6,-1 3,2 4,5 0,3 -4,5 -3,2 -6,-1 -2,-1" fill="#facc15" />
          </g>
        )}

        {avatarId === 'clara-angel' && (
          <g transform="translate(100, 55)">
            {/* Nurse cap with Red Cross */}
            <path d="M -30 6 L -20 -15 L 20 -15 L 30 6 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
            <rect x="-3" y="-12" width="6" height="14" fill="#ef4444" />
            <rect x="-7" y="-8" width="14" height="6" fill="#ef4444" />
          </g>
        )}

        {/* Explorer Hat default */}
        {avatarId === 'owl-explorer' && (
          <g transform="translate(100, 56)">
            {/* Explorer Safari Pith Hat */}
            <ellipse cx="0" cy="10" rx="55" ry="12" fill="#d97706" />
            <ellipse cx="0" cy="2" rx="38" ry="24" fill="#f59e0b" />
            {/* Green explorer band with footprint pin */}
            <rect x="-38" y="2" width="76" height="8" fill="#15803d" />
            <circle cx="0" cy="6" r="3" fill="#facc15" />
          </g>
        )}
      </svg>
    </div>
  );
};
