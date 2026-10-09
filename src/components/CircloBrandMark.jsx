import React from 'react';

/**
 * Circlo Unified Brand Mark
 * Dynamic circular recycling 'C' symbol representing closed-loop e-waste circularity.
 * Perfectly synchronized with the browser tab favicon.
 */
export default function CircloBrandMark({ size = 26, color = "#000000" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Circular Recycling 'C' Continuous Flow Track */}
      <path 
        d="M 22 10.5 A 8.5 8.5 0 1 0 22 21.5" 
        fill="none" 
        stroke={color} 
        strokeWidth="3.2" 
        strokeLinecap="round" 
      />
      
      {/* Top Forward Circulation Arrow */}
      <polygon 
        points="16.5,5.5 24,10.5 18,15.5" 
        fill={color} 
      />
      
      {/* Bottom Recirculation Return Arrow */}
      <polygon 
        points="18,16.5 24,21.5 16.5,26.5" 
        fill={color} 
      />
    </svg>
  );
}
