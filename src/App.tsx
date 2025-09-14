import React, { useState } from 'react';
import BibleReader from './components/BibleReader';
import Featured from './components/Featured';

export default function App() {
  const [activeTab, setActiveTab] = useState<'bible' | 'featured'>('bible');

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {activeTab === 'bible' ? <BibleReader /> : <Featured />}
      </main>

      {/* Bottom Navigation - Ultra Modern & Futuristic */}
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex space-x-6 bg-gray-900/90 rounded-full px-8 py-3 backdrop-blur-xl border border-gray-700/50 shadow-2xl shadow-black/20">
          <button 
            onClick={() => setActiveTab('bible')}
            className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all duration-300 transform ${
              activeTab === 'bible' 
                ? 'text-white bg-blue-600/80 scale-105 shadow-lg shadow-blue-500/30' 
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60 hover:scale-102'
            }`}
          >
            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <span className="text-xs font-semibold">Bible</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('featured')}
            className={`flex flex-col items-center px-4 py-2 rounded-xl transition-all duration-300 transform ${
              activeTab === 'featured' 
                ? 'text-white bg-blue-600/80 scale-105 shadow-lg shadow-blue-500/30' 
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60 hover:scale-102'
            }`}
          >
            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-xs font-semibold">Featured</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
