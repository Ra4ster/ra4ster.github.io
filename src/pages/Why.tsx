import { motion } from "motion/react";

export default function Why() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="text-black w-full"
    >
      <p className="text-xl text-center mb-8 border-b border-gray-200 pb-4 whitespace-nowrap">
        Great question! I love building things from start to finish. How about
        you see:
      </p>
      <iframe
        src="/Resume_JackRose.pdf#page=3&toolbar=0&navpanes=0"
        title="Resume"
        loading="lazy"
        className="w-full h-[700px] border-0"
      />
    </motion.section>
  );
}
