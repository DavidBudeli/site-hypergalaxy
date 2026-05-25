"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MagneticButtonProps = Omit<HTMLMotionProps<"a">, "children"> &
  VariantProps<typeof buttonVariants> & {
    href: string;
    children: ReactNode;
  };

export function MagneticButton({
  className,
  variant,
  size = "lg",
  children,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      className={cn(buttonVariants({ variant, size }), "relative overflow-hidden", className)}
      animate={position}
      transition={{ type: "spring", stiffness: 210, damping: 16, mass: 0.45 }}
      onMouseMove={(event) => {
        const element = ref.current;
        if (!element) return;
        const rect = element.getBoundingClientRect();
        setPosition({
          x: (event.clientX - rect.left - rect.width / 2) * 0.12,
          y: (event.clientY - rect.top - rect.height / 2) * 0.18
        });
      }}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      {...props}
    >
      <span className="absolute inset-0 translate-y-full bg-gradient-to-t from-violet-500/14 to-transparent transition-transform duration-500 group-hover:translate-y-0" />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.a>
  );
}
