import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Tag, MessageSquare } from 'lucide-react';
import { Technique } from '../types';

interface Props {
  technique: Technique | null;
  onClose: () => void;
}

const TechniqueModal: React.FC<Props> = ({ technique, onClose }) => {
  if (!technique) return null;

  return (
    <AnimatePresence>
      {technique && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            layoutId={technique.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="relative p-8 border-b border-gray-200/30 dark:border-gray-700/30 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
              >
                <X size={20} className="text-gray-700 dark:text-gray-200" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                 <span className="px-3 py-1 text-sm font-bold text-blue-700 dark:text-blue-300 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700/50">
                    {technique.code}
                 </span>
                 <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {technique.category}
                 </span>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {technique.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {technique.simpleExplanation}
              </p>
            </div>

            {/* Scrollable Body */}
            <div className="p-8 overflow-y-auto custom-scrollbar">
              
              {/* Detailed Explanation */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <MessageSquare size={16} className="text-purple-500" /> 
                  Technique Detail
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {technique.fullExplanation}
                </p>
              </div>

              {/* Code Example Box */}
              <div className="mb-8 relative group">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    Example Prompt
                </h3>
                <div className="bg-gray-100/50 dark:bg-black/30 rounded-xl p-6 border border-gray-200 dark:border-gray-700 relative backdrop-blur-sm">
                    <p className="font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                        {technique.example}
                    </p>
                    <button 
                        onClick={() => navigator.clipboard.writeText(technique.example)}
                        className="absolute top-4 right-4 p-2 rounded-lg bg-white/50 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
                        title="Copy to clipboard"
                    >
                        <Copy size={16} className="text-gray-600 dark:text-gray-300" />
                    </button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {technique.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-purple-100/50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700/50"
                  >
                    <Tag size={12} /> {tag}
                  </span>
                ))}
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TechniqueModal;