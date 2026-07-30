import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
        variant === "primary" && "bg-primary text-primary-foreground",
        variant === "outline" && "border border-border bg-transparent",
        variant === "ghost" && "bg-transparent",
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
