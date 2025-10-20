"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  desc?: string;
  children: ReactNode;
  width?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  desc,
  children,
  width = "max-w-md",
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
          onClick={onClose}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className={`bg-white rounded-2xl shadow-lg w-full ${width} mx-4 p-6 relative`}>
            {(title || desc) && (
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  {title && (
                    <h2 className="text-lg font-semibold text-gray-800">
                      {title}
                    </h2>
                  )}
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700">
                    <X size={20} />
                  </button>
                </div>

                {desc && (
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {desc}
                  </p>
                )}
              </div>
            )}

            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
