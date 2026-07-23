import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { fadeUp } from "../motion/variants";

const TAGS = {
  section: motion.section,
  header: motion.header,
  footer: motion.footer,
  div: motion.div,
} as const;

interface AnimatedSectionProps {
  children: ReactNode;
  variant?: Variants;
  className?: string;
  id?: string;
  as?: keyof typeof TAGS;
}

const INSTANT: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export default function AnimatedSection({
  children,
  variant = fadeUp,
  className,
  id,
  as = "section",
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = TAGS[as];

  return (
    <Component
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={prefersReducedMotion ? INSTANT : variant}
    >
      {children}
    </Component>
  );
}
