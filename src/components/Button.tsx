import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const buttonVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.2, ease: EASE } },
  tap: { scale: 0.97, transition: { duration: 0.1, ease: EASE } },
};

const iconVariants: Variants = {
  rest: { opacity: 0, width: 0, marginRight: 0 },
  hover: { opacity: 1, width: 18, marginRight: 8, transition: { duration: 0.25, ease: EASE } },
};

interface ButtonProps {
  href: string;
  className: string;
  children: ReactNode;
  icon?: ReactNode;
}

export default function Button({ href, className, children, icon }: ButtonProps) {
  return (
    <motion.a
      href={href}
      className={className}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      style={{ display: "inline-flex", alignItems: "center" }}
    >
      {icon && (
        <motion.span
          variants={iconVariants}
          style={{ display: "inline-flex", overflow: "hidden" }}
        >
          {icon}
        </motion.span>
      )}
      {children}
    </motion.a>
  );
}
