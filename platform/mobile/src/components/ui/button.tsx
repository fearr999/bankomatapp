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
        "inline-flex items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium transition-all duration-150 ease-out disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 active:scale-[0.97]",
        variant === "primary" && "h-14 bg-primary text-primary-foreground shadow-sm hover:shadow-md",
        variant === "outline" && "h-[52px] border border-border bg-transparent",
        variant === "ghost" && "h-[52px] bg-transparent",
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
