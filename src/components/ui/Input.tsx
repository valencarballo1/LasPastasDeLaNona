import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const fieldStyles =
  "w-full rounded-[var(--radius-card)] border border-muted/30 bg-warm-white px-4 py-2.5 text-sm text-carbon placeholder:text-muted/70 transition-colors focus:border-red focus:outline-none focus:ring-2 focus:ring-red/20";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cn(fieldStyles, className)} {...props} />,
);
Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} rows={4} className={cn(fieldStyles, "resize-none", className)} {...props} />
  ),
);
Textarea.displayName = "Textarea";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select ref={ref} className={cn(fieldStyles, "appearance-none bg-no-repeat", className)} {...props}>
      {children}
    </select>
  ),
);
Select.displayName = "Select";
