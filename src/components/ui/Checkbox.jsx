import React from "react";
import { Check } from "lucide-react";
import { cn } from "../../utils/cn";

const Checkbox = ({
  checked = false,
  disabled = false,
  onChange,
  className,
  size = "default",
  ...props
}) => {

  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (disabled) return;
    onChange?.(!checked);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center rounded border border-primary transition-colors",
        sizeClasses[size],
        checked
          ? "bg-primary text-primary-foreground"
          : "bg-background hover:bg-primary/10",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {checked && <Check className="h-3.5 w-3.5" />}
    </button>
  );
};

export default Checkbox;
