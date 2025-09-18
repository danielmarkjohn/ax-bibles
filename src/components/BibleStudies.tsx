import React, { useState } from 'react';
import BibleInAYear from './BibleInAYear';
import BibleOverview from './BibleOverview';
import ChristianGlossary from './ChristianGlossary';
import VerseWallpaperCreator from './VerseWallpaperCreator';

interface BibleStudiesProps {
  onBack: () => void;
}

export default function BibleStudies({ onBack }: BibleStudiesProps) {
  const [activeContent, setActiveContent] = useState<'yearly' | 'overview' | 'glossary' | 'wallpaper' | null>(null);

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
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl px-6 py-5 flex items-center justify-between border-b border-white/20 shadow-2xl flex-shrink-0">
        <button
          onClick={onBack}
          className="p-3 text-white/80 hover:text-white hover:bg-white/20 rounded-2xl transition-all duration-300 hover:scale-105"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-white font-bold text-xl tracking-wide">Bible Studies</span>
          <span className="text-white/60 text-sm">Explore & Learn</span>
        </div>
        <div className="w-12"></div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Featured Card - Verse Wallpaper Creator */}
          <div 
            onClick={() => setActiveContent('wallpaper')}
            className="group relative bg-gradient-to-br from-pink-500/20 via-purple-600/20 to-indigo-600/20 backdrop-blur-2xl border border-white/30 rounded-2xl p-6 cursor-pointer transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-pink-500/25 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl flex-shrink-0">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-xl mb-2 tracking-wide">Verse Wallpaper Creator</h3>
                <p className="text-white/80 text-sm leading-relaxed">Create beautiful wallpapers with your favorite Bible verses</p>
              </div>
              <div className="text-pink-300 group-hover:translate-x-1 transition-transform flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Bible in a Year Card */}
            <div 
              onClick={() => setActiveContent('yearly')}
              className="group bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-5 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-white/15"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-lg mb-1">Bible in a Year</h3>
                  <p className="text-white/70 text-xs leading-relaxed">Structured reading plan</p>
                </div>
              </div>
            </div>

            {/* Bible Overview Card */}
            <div 
              onClick={() => setActiveContent('overview')}
              className="group bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-5 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-white/15"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-lg mb-1">Bible Overview</h3>
                  <p className="text-white/70 text-xs leading-relaxed">Books & translations</p>
                </div>
              </div>
            </div>

            {/* Christian Glossary Card */}
            <div 
              onClick={() => setActiveContent('glossary')}
              className="group bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-5 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-white/15"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2zM12 15.4l3.76 2.27 1-4.28 3.32-2.88-4.38-.38L12 6.1l-1.71 4.04-4.38.38 3.32 2.88 1 4.28L12 15.4z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-lg mb-1">Christian Glossary</h3>
                  <p className="text-white/70 text-xs leading-relaxed">Biblical terms and definitions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
