"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { CSSProperties, useEffect, useState } from "react";

export function MouseFollower() {
  const [isHovering, setIsHovering] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const scaleX = useSpring(1, springConfig);
  const scaleY = useSpring(1, springConfig);
  const opacitySpring = useSpring(0, springConfig);
  const borderRadiusSpring = useSpring(20, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveElement = target.closest(
        'button, a, [role="button"], .group',
      );

      if (interactiveElement) {
        const rect = interactiveElement.getBoundingClientRect();
        setTargetRect(rect);
        setIsHovering(true);
        mouseX.set(rect.left + rect.width / 2);
        mouseY.set(rect.top + rect.height / 2);
        scaleX.set(rect.width / 40); // Base size is 40px
        scaleY.set(rect.height / 40);
        opacitySpring.set(0.2);
        borderRadiusSpring.set(8);
      } else {
        setIsHovering(false);
        setTargetRect(null);
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        scaleX.set(1);
        scaleY.set(1);
        opacitySpring.set(0.5);
        borderRadiusSpring.set(20);
      }
    };

    const handleMouseLeave = () => {
      opacitySpring.set(0);
      setIsHovering(false);
      setTargetRect(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, scaleX, scaleY, opacitySpring]);

  return (
    <motion.div
      style={
        {
          translateX: x,
          translateY: y,
          x: "-50%",
          y: "-50%",
          scaleX,
          scaleY,
          opacity: opacitySpring,
          borderRadius: borderRadiusSpring,
        } as CSSProperties
      }
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-10 w-10 bg-white/70 blur-md"
    />
  );
}
