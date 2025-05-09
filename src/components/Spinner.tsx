import React from "react";

interface SpinnerProps {
  label?: string;
  variation?: "small" | "medium" | "large" | "screen-large";
}

const Spinner: React.FC<SpinnerProps> = ({
  label = "Loading...",
  variation = "medium",
}) => {
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    medium: "w-6 h-6 border-4",
    large: "w-8 h-8 border-4",
    "screen-large": "w-16 h-16 border-4",
  };

  const containerClasses =
    variation === "screen-large"
      ? "fixed flex flex-col gap-3 inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
      : "inline-flex items-center";

  return (
    <div className={containerClasses}>
      <div
        className={`animate-spin rounded-full border-t-primary-gray border-white ${sizeClasses[variation]}`}
        role="status"
        aria-label={label}
      ></div>
      {label && <span className="ml-2 text-gray-700 text-md">{label}</span>}
    </div>
  );
};

export default Spinner;
