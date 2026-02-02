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

type AnimationPreset =
  | "fade"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "blur"
  | "custom";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "aside" | "header" | "footer" | "main";
  animation?: AnimationPreset;
  customVariants?: Variants;
  duration?: number;
  delay?: number;
  offset?: number;
  inViewMargin?: MarginType;
  once?: boolean;
  staggerChildren?: number;
}

const getPresetVariants = (
  animation: AnimationPreset,
  offset: number
): Variants => {
  switch (animation) {
    case "fade":
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };
    case "slideUp":
      return {
        hidden: { opacity: 0, y: offset },
        visible: { opacity: 1, y: 0 },
      };
    case "slideDown":
      return {
        hidden: { opacity: 0, y: -offset },
        visible: { opacity: 1, y: 0 },
      };
    case "slideLeft":
      return {
        hidden: { opacity: 0, x: offset },
        visible: { opacity: 1, x: 0 },
      };
    case "slideRight":
      return {
        hidden: { opacity: 0, x: -offset },
        visible: { opacity: 1, x: 0 },
      };
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      };
    case "blur":
      return {
        hidden: { opacity: 0, filter: "blur(10px)" },
        visible: { opacity: 1, filter: "blur(0px)" },
      };
    default:
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };
  }
};

export function AnimatedSection({
  children,
  className,
  as = "div",
  animation = "slideUp",
  customVariants,
  duration = 0.6,
  delay = 0,
  offset = 40,
  inViewMargin = "-100px",
  once = true,
  staggerChildren,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: inViewMargin });

  const MotionComponent = motion.create(as);

  const baseVariants =
    animation === "custom" && customVariants
      ? customVariants
      : getPresetVariants(animation, offset);

  const variants: Variants = {
    hidden: baseVariants.hidden,
    visible: {
      ...baseVariants.visible,
      transition: {
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
        ...(staggerChildren && {
          staggerChildren,
          delayChildren: delay,
        }),
      },
    },
  };

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </MotionComponent>
  );
}

// Child component for staggered animations
interface AnimatedItemProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "span" | "article";
}

export function AnimatedItem({
  children,
  className,
  as = "div",
}: AnimatedItemProps) {
  const MotionComponent = motion.create(as);

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <MotionComponent variants={itemVariants} className={cn(className)}>
      {children}
    </MotionComponent>
  );
}
