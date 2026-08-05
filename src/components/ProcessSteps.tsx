import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../motion/variants";

export interface ProcessStep {
  title: string;
  body: string[];
}

export default function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <motion.ol
      className="process-steps"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
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
