import { motion } from "framer-motion";

export function Aurora() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0.0, scale: 1.2 }}
        animate={{ opacity: 0.6, scale: 1.0 }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute w-full h-full bg-gradient-to-r from-gray-500 via-gray-300 to-white opacity-20 blur-2xl"
      />
      <motion.div
        initial={{ opacity: 0.0, scale: 1.1 }}
        animate={{ opacity: 0.5, scale: 1.0 }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute w-full h-full bg-gradient-to-r from-gray-400 via-gray-200 to-white opacity-25 blur-3xl"
      />
    </div>
  );
}
