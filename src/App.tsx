import React, { useState, useEffect } from 'react';
import BibleReader from './components/BibleReader';
import Featured from './components/Featured';
import AdminPanel from './components/AdminPanel';
import VerseWallpaperCreator from './components/VerseWallpaperCreator';

export default function App() {
  const [activeTab, setActiveTab] = useState<'bible' | 'featured' | 'admin'>('featured');
  const [showWallpaperCreator, setShowWallpaperCreator] = useState(false);

  const handleNavigateToWallpaper = () => {
    setActiveTab('featured');
    setShowWallpaperCreator(true);
    window.history.pushState({}, '', '/');
  };

  useEffect(() => {
    // Check URL path on mount and handle routing
    const path = window.location.pathname;
    if (path === '/admin') {
      setActiveTab('admin');
    } else if (path === '/bible') {
      setActiveTab('bible');
    } else {
      setActiveTab('featured');
    }

    // Handle browser back/forward buttons
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/admin') {
        setActiveTab('admin');
      } else if (path === '/bible') {
        setActiveTab('bible');
      } else {
        setActiveTab('featured');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleTabChange = (tab: 'bible' | 'featured' | 'admin') => {
    setActiveTab(tab);
    // Update URL without page reload
    const path = tab === 'featured' ? '/' : `/${tab}`;
    window.history.pushState({}, '', path);
  };

  const handleAdminBack = () => {
    setActiveTab('featured');
    window.history.pushState({}, '', '/');
  };

  if (activeTab === 'admin') {
    return <AdminPanel onBack={handleAdminBack} />;
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {activeTab === 'bible' ? (
          <BibleReader onNavigateToWallpaper={handleNavigateToWallpaper} />
        ) : showWallpaperCreator ? (
          <VerseWallpaperCreator onBack={() => setShowWallpaperCreator(false)} />
        ) : (
          <Featured />
        )}
      </main>

      {/* Bottom Navigation - Small & Elegant */}
      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex space-x-2 bg-gray-900/90 rounded-full px-4 py-2 backdrop-blur-md border border-gray-700/40 shadow-lg">
          <button 
            onClick={() => handleTabChange('bible')}
            className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
              activeTab === 'bible' 
                ? 'text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30 scale-105' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/70 hover:scale-102'
            }`}
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <span className="text-sm font-semibold">Bible</span>
          </button>
          
          <button 
            onClick={() => handleTabChange('featured')}
            className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
              activeTab === 'featured' 
                ? 'text-white bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30 scale-105' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/70 hover:scale-102'
            }`}
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-sm font-semibold">Featured</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
