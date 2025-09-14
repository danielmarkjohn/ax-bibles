import React, { useState } from 'react';
import DailyVerse from './DailyVerse';
import BibleInAYear from './BibleInAYear';
import BibleOverview from './BibleOverview';
import ChristianGlossary from './ChristianGlossary';

export default function Featured() {
  const [activeContent, setActiveContent] = useState<'daily' | 'yearly' | 'overview' | 'glossary' | null>(null);

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

  return (
    <div className="h-full flex flex-col bg-gray-900 text-gray-100 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl px-6 py-6 flex items-center justify-between border-b border-gray-700/30 shadow-xl flex-shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-2xl tracking-tight">Featured</span>
            <span className="text-blue-400 text-sm font-medium bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Discover daily inspiration
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Daily Bible Verse Card */}
          <div 
            onClick={() => setActiveContent('daily')}
            className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-3 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-md text-white">Daily Bible Verse</h3>
              </div>
            </div>
          </div>

          {/* Bible in a Year Card */}
          <div 
            onClick={() => setActiveContent('yearly')}
            className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-3 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-md text-white">Bible in a Year</h3>
              </div>
            </div>
          </div>

          {/* Bible Overview Card */}
          <div 
            onClick={() => setActiveContent('overview')}
            className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl p-3 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-md text-white">Bible Overview</h3>
              </div>
            </div>
          </div>

          {/* Christian Glossary Card */}
          <div 
            onClick={() => setActiveContent('glossary')}
            className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-xl p-3 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2zM12 15.4l3.76 2.27 1-4.28 3.32-2.88-4.38-.38L12 6.1l-1.71 4.04-4.38.38 3.32 2.88 1 4.28L12 15.4z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-md text-white">Christian Glossary</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
