import React from "react"

export default function TimeOptionButton({ children, currentOption, name, settings, ...rest }) {
  return (
    <button
      className={`font-semibold rounded-full px-5 py-3 transition-colors duration-500 touch-manipulation ${
        currentOption === name ? "bg-" + settings.colorOption : "bg-transparent text-optionText"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}