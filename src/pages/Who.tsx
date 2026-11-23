import { motion } from "motion/react";

export default function Who() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full max-w-xl px-4 sm:px-6 text-black mt-12 sm:mt-0 pb-8 sm:pb-0"
    >
      <div className="h-28 w-28 sm:h-32 sm:w-32 mb-4 sm:mb-5 overflow-hidden rounded-full shadow-xl">
        <img
          src="/images/profile2025.jpg"
          alt="Jack Rose"
          loading="eager"
          decoding="async"
          draggable="false"
          className="h-full w-full scale-200 translate-y-10 object-cover drag-none"
        />
      </div>
      <div className="flex flex-col justify-end">
        <p className="mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-widest text-gray-400 alliance2">
          01 / About Me
        </p>
        <h2 className="mb-4 sm:mb-6 text-2xl sm:text-4xl font-semibold">I'm a huge nerd.</h2>
      </div>
      <p className="text-base sm:text-lg leading-relaxed text-gray-600">
        I have a B.S. in Data Analytics (computational specialization) from The
        Ohio State University with a minor in Philosophy. In my free time I
        enjoy watching anime (Hell's Paradise), working out, and collecting
        regional teas. My focus is in bridging AI/ML techniques with HPC.
      </p>
      <div className="mt-6 sm:mt-8 border-t border-gray-200 pt-4">
        <p className="text-xs sm:text-sm text-gray-400">
          Scroll through the questions to learn more.
        </p>
      </div>
    </motion.section>
  );
}
