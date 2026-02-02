"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  UseInViewOptions,
  Variants,
} from "framer-motion";
import { cn } from "@/lib/utils";

type MarginType = UseInViewOptions["margin"];

type Direction = "up" | "down" | "left" | "right" | "none";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  duration?: number;
  delay?: number;
  offset?: number;
  inViewMargin?: MarginType;
  once?: boolean;
}

const getDirectionOffset = (direction: Direction, offset: number) => {
  switch (direction) {
    case "up":
      return { x: 0, y: offset };
    case "down":
      return { x: 0, y: -offset };
    case "left":
      return { x: offset, y: 0 };
    case "right":
      return { x: -offset, y: 0 };
    case "none":
    default:
      return { x: 0, y: 0 };
  }
};

export function FadeIn({
  children,
  className,
  direction = "up",
  duration = 0.5,
  delay = 0,
  offset = 24,
  inViewMargin = "-100px",
  once = true,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: inViewMargin });

  const { x, y } = getDirectionOffset(direction, offset);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x,
      y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
