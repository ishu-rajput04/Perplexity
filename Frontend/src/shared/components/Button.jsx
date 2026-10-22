import { ArrowRight } from "lucide-react";
import React from "react";
const Button = ({
  text,
  icon: Icon,
  type = "button",
  className = "",
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer active:scale-98 ${className}`}
    >
      {text}

      {Icon && (
        <Icon
          size={17}
          className="transition-transform group-hover:translate-x-1"
        />
      )}
    </button>
  );
};

export default Button;
