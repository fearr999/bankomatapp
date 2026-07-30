import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary",
        className
      )}
      {...props}
    />
  );
}
