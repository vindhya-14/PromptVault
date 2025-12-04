import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Box, Brain, CheckCircle } from 'lucide-react';
import { Technique, Category } from '../types';

interface Props {
  technique: Technique;
  onClick: () => void;
}

const getIcon = (category: Category) => {
  switch (category) {
    case Category.Creative: return <Sparkles size={18} className="text-pink-500" />;
    case Category.Structuring: return <Box size={18} className="text-blue-500" />;
    case Category.Reasoning: return <Brain size={18} className="text-purple-500" />;
    case Category.Validation: return <CheckCircle size={18} className="text-green-500" />;
    default: return <Sparkles size={18} />;
  }
};

const getGradient = (category: Category) => {
    switch (category) {
      case Category.Creative: return 'from-pink-500/20 to-rose-500/5 hover:border-pink-400/50';
      case Category.Structuring: return 'from-blue-500/20 to-cyan-500/5 hover:border-blue-400/50';
      case Category.Reasoning: return 'from-purple-500/20 to-indigo-500/5 hover:border-purple-400/50';
      case Category.Validation: return 'from-green-500/20 to-emerald-500/5 hover:border-green-400/50';
      default: return 'from-gray-500/20 to-gray-500/5';
    }
  };

const TechniqueCard: React.FC<Props> = ({ technique, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className={`
        group relative overflow-hidden rounded-2xl cursor-pointer
        bg-white/10 dark:bg-black/20 backdrop-blur-md
        border border-white/20 dark:border-white/10
        shadow-lg hover:shadow-xl transition-all duration-300
        ${getGradient(technique.category)}
      `}
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-6 relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-bold tracking-wider text-white bg-black/20 dark:bg-white/10 rounded-full backdrop-blur-sm border border-white/10">
            {technique.code}
          </span>
          <div className="p-2 bg-white/10 rounded-full">
            {getIcon(technique.category)}
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
          {technique.title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 flex-grow leading-relaxed">
          {technique.simpleExplanation}
        </p>

        <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
          Explore Details <ArrowRight size={16} className="ml-1" />
        </div>
      </div>
    </motion.div>
  );
};

export default TechniqueCard;