import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Background from './components/Background';
import Navbar from './components/Navbar';
import TechniqueCard from './components/TechniqueCard';
import TechniqueModal from './components/TechniqueModal';
import Footer from './components/Footer';
import { techniques } from './data';
import { Category, Technique } from './types';
import { ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

  // Initialize Dark Mode based on system pref
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  // Update HTML class for Tailwind Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Filter Logic
  const filteredTechniques = useMemo(() => {
    return techniques.filter((tech) => {
      const matchesCategory = activeCategory === 'All' || tech.category === activeCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        tech.title.toLowerCase().includes(searchLower) ||
        tech.code.toLowerCase().includes(searchLower) ||
        tech.simpleExplanation.toLowerCase().includes(searchLower) ||
        tech.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      <Background />
      
      <Navbar 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <section className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 drop-shadow-sm">
              Prompt Engineering <br/> Framework Library
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              40+ powerful prompt codes to transform your AI results. 
              Master the art of communication with Large Language Models.
            </p>
            
            <a 
                href="#library"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-lg font-semibold text-gray-800 dark:text-white group"
            >
                Explore Techniques
                <ChevronDown className="group-hover:translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </section>

        {/* Filter Tabs */}
        <section id="library" className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
                {['All', ...Object.values(Category)].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat as Category | 'All')}
                        className={`
                            px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                            ${activeCategory === cat 
                                ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/30' 
                                : 'bg-white/30 dark:bg-black/20 text-gray-600 dark:text-gray-300 border-white/20 hover:bg-white/50 dark:hover:bg-white/10'
                            }
                            backdrop-blur-sm
                        `}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </section>

        {/* Grid */}
        <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTechniques.map((tech) => (
            <TechniqueCard 
              key={tech.id} 
              technique={tech} 
              onClick={() => setSelectedTechnique(tech)} 
            />
          ))}
        </motion.div>

        {filteredTechniques.length === 0 && (
            <div className="text-center py-20">
                <p className="text-xl text-gray-500 dark:text-gray-400">No techniques found matching your search.</p>
                <button 
                    onClick={() => {setSearchQuery(''); setActiveCategory('All')}}
                    className="mt-4 text-blue-500 hover:underline"
                >
                    Clear filters
                </button>
            </div>
        )}

      </main>

      <Footer />
      
      <TechniqueModal 
        technique={selectedTechnique} 
        onClose={() => setSelectedTechnique(null)} 
      />
    </div>
  );
};

export default App;