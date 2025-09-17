import React, { useState } from 'react';
import DailyVerse from './DailyVerse';
import BibleInAYear from './BibleInAYear';
import BibleOverview from './BibleOverview';
import ChristianGlossary from './ChristianGlossary';
import VerseWallpaperCreator from './VerseWallpaperCreator';

export default function Featured() {
  const [activeContent, setActiveContent] = useState<'daily' | 'yearly' | 'overview' | 'glossary' | 'wallpaper' | null>(null);

  if (activeContent === 'daily') {
    return <DailyVerse onBack={() => setActiveContent(null)} />;
  }

  if (activeContent === 'yearly') {
    return <BibleInAYear onBack={() => setActiveContent(null)} />;
  }

  if (activeContent === 'overview') {
    return <BibleOverview onBack={() => setActiveContent(null)} />;
  }

  if (activeContent === 'glossary') {
    return <ChristianGlossary onBack={() => setActiveContent(null)} />;
  }

  if (activeContent === 'wallpaper') {
    return <VerseWallpaperCreator onBack={() => setActiveContent(null)} />;
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 pb-12">
      {/* Modern Glass Header */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex items-center justify-between shadow-2xl flex-shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-xl">Featured</span>
            <span className="text-gray-300 text-sm">Discover daily inspiration</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Verse Maker Card - Featured */}
          <div 
            onClick={() => setActiveContent('wallpaper')}
            className="bg-gradient-to-br from-pink-500/20 to-purple-700/20 backdrop-blur-xl border border-pink-500/30 rounded-2xl p-4 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-pink-500/20 group"
          >
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-white font-bold text-lg mb-1">Verse Maker</h3>
              <p className="text-gray-300 text-sm">Create beautiful verse wallpapers</p>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bible in a Year Card */}
            <div 
              onClick={() => setActiveContent('yearly')}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Bible in a Year</h3>
                  <p className="text-gray-400 text-sm">Reading plan</p>
                </div>
              </div>
            </div>

            {/* Bible Overview Card */}
            <div 
              onClick={() => setActiveContent('overview')}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Bible Overview</h3>
                  <p className="text-gray-400 text-sm">Explore books</p>
                </div>
              </div>
            </div>
          </div>

          {/* Christian Glossary Card - Full Width */}
          <div 
            onClick={() => setActiveContent('glossary')}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2zM12 15.4l3.76 2.27 1-4.28 3.32-2.88-4.38-.38L12 6.1l-1.71 4.04-4.38.38 3.32 2.88 1 4.28L12 15.4z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Christian Glossary</h3>
                <p className="text-gray-400 text-sm">Learn biblical terms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
