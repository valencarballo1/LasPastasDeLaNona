import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, className, id, ...props }, ref) => (
  <label htmlFor={id} className={cn("flex cursor-pointer items-center gap-2.5 text-sm text-carbon", className)}>
    <input
      ref={ref}
      id={id}
      type="checkbox"
      className="h-4 w-4 rounded border-muted/40 text-red focus:ring-2 focus:ring-red/30"
      {...props}
    />
    {label}
  </label>
));
Checkbox.displayName = "Checkbox";
