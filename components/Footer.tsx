import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 py-8 relative z-10 border-t border-white/20 dark:border-white/5 bg-white/30 dark:bg-black/20 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 ">
          © {new Date().getFullYear()} PromptVault Library. All rights reserved.
        </div>
       
      </div>
    </footer>
  );
};

export default Footer;