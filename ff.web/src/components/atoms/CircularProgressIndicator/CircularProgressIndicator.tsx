import React from 'react';

interface CircularProgressIndicatorProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  backgroundColor?: string;
  progressColor?: string;
  textColor?: string;
}

const CircularProgressIndicator: React.FC<CircularProgressIndicatorProps> = ({
  progress,
  size = 60,
  strokeWidth = 4,
  backgroundColor = '#e5e7eb',
  progressColor = '#3b82f6',
  textColor = 'var(--text-primary)'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = ((100 - progress) / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ transform: 'rotate(-90deg)' }}
    >
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={backgroundColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
      
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={progressColor}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        fill="none"
        style={{
          transition: 'stroke-dashoffset 0.3s ease-in-out'
        }}
      />

      {/* Percentage text */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill={textColor}
        style={{ 
          transform: 'rotate(90deg)',
          transformOrigin: 'center',
          fontSize: size * 0.25,
          fontWeight: 'bold'
        }}
      >
        {Math.round(progress)}%
      </text>
    </svg>
  );
};

export default CircularProgressIndicator;
