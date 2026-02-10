import React from "react";
import { cn } from "../../utils/cn";

const Input = React.forwardRef(
  ({ className, type = "text", label, error, id, ...props }, ref) => {

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "block text-sm font-medium mb-1.5",
              error ? "text-destructive" : "text-foreground"
            )}
          >
            {label}
          </label>
        )}

        <input
          id={id}
          type={type}
          ref={ref}
          className={cn(
            "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors",
            "placeholder:text-muted-foreground",
            "focus:ring-2 focus:ring-ring focus:border-primary",
            error && "border-destructive focus:ring-destructive",
            className
          )}
          {...props}
        />

        {error && (
          <p className="text-sm text-destructive mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
