import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "default" | "outline" | "ghost";

const VARIANTS: Record<Variant, string> = {
  default: "bg-primary text-primary-foreground hover:opacity-90",
  outline: "border bg-transparent hover:bg-muted",
  ghost: "bg-transparent hover:bg-muted",
};

export function Button({
  className,
  variant = "default",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
        VARIANTS[variant],
        className
      )}
      {...props}
    />
  );
}
