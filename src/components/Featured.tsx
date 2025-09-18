import React, { useState } from 'react';
import DailyVerse from './DailyVerse';
import BibleStudies from './BibleStudies';

const dailyVerses = [
  {
    verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.",
    reference: "Jeremiah 29:11",
    theme: "Hope & Future",
    devotion: "God's plans for us are always good, even when we can't see the bigger picture. In times of uncertainty, we can trust that He is working all things together for our benefit. His plans are not to harm us but to give us hope and a future filled with His blessings.",
    author: "Pastor John Smith"
  },
  {
    verse: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
    theme: "Trust & Guidance",
    devotion: "True wisdom comes from acknowledging that our understanding is limited. When we trust God completely and seek His will in all our decisions, He promises to guide our steps and make our paths clear. This requires humility and faith in His perfect wisdom.",
    author: "Pastor Sarah Johnson"
  },
  {
    verse: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reference: "Romans 8:28",
    theme: "God's Purpose",
    devotion: "Even in our darkest moments, God is at work. This verse doesn't promise that all things are good, but that God works through all circumstances - both joyful and painful - to accomplish His good purposes in our lives. Our trials are not wasted when we love and trust Him.",
    author: "Pastor Michael Davis"
  }
];

export default function Featured() {
  const [activeContent, setActiveContent] = useState<'daily' | 'studies' | null>(null);

  if (activeContent === 'daily') {
    return <DailyVerse onBack={() => setActiveContent(null)} />;
  }

  if (activeContent === 'studies') {
    return <BibleStudies onBack={() => setActiveContent(null)} />;
  }

  // Get today's verse
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const todaysVerse = dailyVerses[dayOfYear % dailyVerses.length];

  return (
    <div className="h-full flex flex-col bg-gray-900 text-gray-100">
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Today's Date */}
          <div className="text-center mb-6">
            <p className="text-gray-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          {/* Daily Devotion Preview Card */}
          <div 
            onClick={() => setActiveContent('daily')}
            className="bg-gradient-to-br from-blue-500/20 to-indigo-700/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-blue-500/20 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Today's Devotion</h2>
                  <p className="text-blue-200 text-sm">{todaysVerse.theme}</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            
            <blockquote className="text-white/90 italic mb-3 leading-relaxed">
              "{todaysVerse.verse}"
            </blockquote>
            
            <div className="flex items-center justify-between">
              <cite className="text-blue-200 font-medium text-sm">
                {todaysVerse.reference}
              </cite>
              <span className="text-blue-300 text-xs">
                by {todaysVerse.author}
              </span>
            </div>
            
            <div className="mt-4 pt-4 border-t border-blue-500/20">
              <p className="text-blue-100 text-sm opacity-80">
                Tap to read the full devotion and reflection
              </p>
            </div>
          </div>

          {/* Bible Studies Card */}
          <div 
            onClick={() => setActiveContent('studies')}
            className="bg-gradient-to-br from-purple-500/20 to-pink-700/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-4 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-purple-500/20 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Bible Studies</h3>
                  <p className="text-purple-200 text-sm">Reading plans, overviews, glossary & wallpapers</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
