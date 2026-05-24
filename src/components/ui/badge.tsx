import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950",
  {
    variants: {
      variant: {
        default:
          "border-cyan-300/25 bg-cyan-300/10 text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.12)]",
        violet:
          "border-violet-300/25 bg-violet-400/10 text-violet-100 shadow-[0_0_22px_rgba(139,92,246,0.12)]",
        muted: "border-white/10 bg-white/6 text-slate-300",
        success:
          "border-emerald-300/25 bg-emerald-400/10 text-emerald-100"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
