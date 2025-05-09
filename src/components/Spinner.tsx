import React from "react";

interface SpinnerProps {
  label?: string;
  variation?: "small" | "medium" | "large";
}

const Spinner: React.FC<SpinnerProps> = ({
  label = "Loading...",
  variation = "medium",
}) => {
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    medium: "w-6 h-6 border-4",
    large: "w-8 h-8 border-4",
  };

  return (
    <div className="inline-flex items-center">
      <div
        className={`animate-spin rounded-full border-t-primary-gray border-white ${sizeClasses[variation]}`}
        role="status"
        aria-label={label}
      ></div>
      {label && <span className="ml-2 text-gray-700 text-sm">{label}</span>}
    </div>
  );
};

export default Spinner;
