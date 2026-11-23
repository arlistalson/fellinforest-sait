import { motion } from "framer-motion";
import { useReveal } from "../motion/reveal";
import { staggerContainer, staggerItem } from "../motion/variants";

export interface ProcessStep {
  title: string;
  body: string[];
}

export default function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  const stepsReveal = useReveal<HTMLOListElement>(0.1);

  return (
    <motion.ol
      className="process-steps"
      {...stepsReveal}
      variants={staggerContainer}
    >
      {steps.map((step) => (
        <motion.li key={step.title} variants={staggerItem}>
          <h3>{step.title}</h3>
          {step.body.map((paragraph) => (
            <p key={paragraph.slice(0, 30)}>{paragraph}</p>
          ))}
        </motion.li>
      ))}
    </motion.ol>
  );
}
