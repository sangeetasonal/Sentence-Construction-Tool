import React from "react";

const ScoreCircle = ({ score }) => {
  const radius = 62;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = score === 100 ? 0 : circumference - (score / 100) * circumference;

  // Get color based on score
  const getColor = () => {
    if (score >= 70) return "#3A913F";        // Green
    if (score < 30) return "#F97316";         // Orange
    return "#FACC15";                         // Yellow
  };

  const color = getColor();

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-3xl font-bold" style={{ color }}>
          {score}
        </span>
        <span className="text-sm" style={{ color }}>
          Overall Score
        </span>
      </div>
    </div>
  );
};

export default ScoreCircle;
