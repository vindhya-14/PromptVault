import React from 'react';
import { Moon, Sun, Search, Sparkles } from 'lucide-react';

interface Props {
  isDarkMode: boolean;
  toggleTheme: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const Navbar: React.FC<Props> = ({ isDarkMode, toggleTheme, searchQuery, setSearchQuery }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-2xl shadow-lg px-6 py-3 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white hidden sm:block">
              PromptVault
            </span>
          </div>

          {/* Search Bar - Center */}
          <div className="flex-1 max-w-md mx-6 hidden md:block group">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Search techniques (e.g., 'Context', 'JSON')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100/50 dark:bg-white/5 border border-transparent focus:border-blue-500/50 rounded-xl py-2 pl-10 pr-4 outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 transition-all shadow-inner focus:bg-white/80 dark:focus:bg-black/40"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
             <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200/50 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-300/50 dark:hover:bg-white/20 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a 
                href="#library"
                className="hidden sm:block px-5 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-medium text-sm hover:shadow-lg hover:scale-105 transition-all"
            >
                Start Exploring
            </a>
          </div>
        </div>
        
        {/* Mobile Search - Visible only on small screens below nav */}
        <div className="md:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/60 dark:bg-black/40 backdrop-blur-md border border-white/30 dark:border-white/10 rounded-xl py-2 pl-10 pr-4 outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500/80 shadow-lg"
              />
            </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;