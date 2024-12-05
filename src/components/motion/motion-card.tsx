"use client";

import { cn } from "@nextui-org/react";
import { HTMLMotionProps, Variants, motion, useInView } from "framer-motion";
import React, { useRef } from "react";

type CardProps = HTMLMotionProps<"div">;

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: (prefersReducedMotion: boolean) => ({
    opacity: 1,
    y: 0,
    transition: prefersReducedMotion
      ? undefined
      : {
          duration: 0.5,
          delay: 0.2,
          ease: "easeOut",
        },
  }),
};

const MotionCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(cardRef, {
      once: true,
    });

    return (
      <motion.div
        animate={isInView ? "visible" : "hidden"}
        variants={cardVariants}
        initial="hidden"
        ref={cardRef}
        className={cn(
          "rounded-xl border bg-card text-card-foreground shadow",
          className
        )}
        {...props}
      />
    );
  }
);
MotionCard.displayName = "MotionCard";

export { MotionCard };
