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

type AnimationType = "fadeIn" | "slideUp" | "slideDown" | "blur" | "scale";

interface TextAnimateProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  animation?: AnimationType;
  by?: "word" | "character" | "line";
  duration?: number;
  delay?: number;
  staggerDelay?: number;
  inViewMargin?: MarginType;
  once?: boolean;
}

const getAnimationVariants = (animation: AnimationType): Variants => {
  switch (animation) {
    case "fadeIn":
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };
    case "slideUp":
      return {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      };
    case "slideDown":
      return {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
      };
    case "blur":
      return {
        hidden: { opacity: 0, filter: "blur(10px)" },
        visible: { opacity: 1, filter: "blur(0px)" },
      };
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      };
    default:
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };
  }
};

export function TextAnimate({
  children,
  className,
  as: Component = "p",
  animation = "slideUp",
  by = "word",
  duration = 0.3,
  delay = 0,
  staggerDelay = 0.05,
  inViewMargin = "-100px",
  once = true,
}: TextAnimateProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: inViewMargin });

  const MotionComponent = motion.create(Component);

  const splitText = () => {
    if (by === "character") {
      return children.split("");
    }
    if (by === "word") {
      return children.split(" ");
    }
    // by line
    return children.split("\n");
  };

  const segments = splitText();
  const variants = getAnimationVariants(animation);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: variants.hidden,
    visible: {
      ...variants.visible,
      transition: {
        duration,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={cn("flex flex-wrap", className)}
    >
      {segments.map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          variants={itemVariants}
          className="inline-block"
        >
          {segment}
          {by === "word" && index < segments.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </motion.span>
      ))}
    </MotionComponent>
  );
}
