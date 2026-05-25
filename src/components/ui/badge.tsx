import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-slate-950",
  {
    variants: {
      variant: {
        default:
          "border-violet-400/22 bg-violet-500/8 text-violet-200",
        violet:
          "border-violet-300/22 bg-violet-400/8 text-violet-100",
        muted: "border-white/8 bg-white/5 text-slate-400",
        success:
          "border-emerald-400/20 bg-emerald-500/8 text-emerald-200"
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
