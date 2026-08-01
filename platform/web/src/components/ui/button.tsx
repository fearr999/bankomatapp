import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "default" | "outline" | "ghost";
type Size = "default" | "sm";

const VARIANTS: Record<Variant, string> = {
  default: "bg-primary text-primary-foreground hover:opacity-90",
  outline: "border bg-transparent hover:bg-muted",
  ghost: "bg-transparent hover:bg-muted",
};

const SIZES: Record<Size, string> = {
  default: "px-3.5 py-2 text-sm",
  sm: "px-2.5 py-1.5 text-xs",
};

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-150 ease-out active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    />
  );
}
