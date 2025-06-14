"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import AnimatedButton from "../animatedButton/animatedButton";

const ComingSoonModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
         className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md text-center"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <h2 className="text-3xl font-bold text-mainGreen mb-6">🚧 Coming Soon!</h2>
            <p className="text-gray-600 mb-6">We're constantly working to enhance your experience. Explore our new and
        upcoming features designed to make your journey smoother and more
        productive.</p>
            <AnimatedButton
              onClick={onClose}
              className="px-4 py-2 bg-mainGreen text-white rounded hover:b transition"
            >
              Got it    
            </AnimatedButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ComingSoonModal;


