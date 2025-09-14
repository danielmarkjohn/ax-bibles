import React, { useState, useEffect } from 'react';

interface DailyVerseProps {
  onBack: () => void;
}

const dailyVerses = [
  {
    verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.",
    reference: "Jeremiah 29:11",
    theme: "Hope & Future"
  },
  {
    verse: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
    theme: "Trust & Guidance"
  },
  {
    verse: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reference: "Romans 8:28",
    theme: "God's Purpose"
  },
  {
    verse: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    reference: "Joshua 1:9",
    theme: "Strength & Courage"
  },
  {
    verse: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.",
    reference: "Psalm 23:1-3",
    theme: "Peace & Rest"
  }
];

export default function DailyVerse({ onBack }: DailyVerseProps) {
  const [currentVerse, setCurrentVerse] = useState(0);

  useEffect(() => {
    // Get today's verse based on day of year
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    setCurrentVerse(dayOfYear % dailyVerses.length);
  }, []);

  const verse = dailyVerses[currentVerse];

  return (
    <div className="h-full flex flex-col bg-gray-900 text-gray-100 pb-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 backdrop-blur-sm px-4 py-4 flex items-center justify-between border-b border-blue-700/50 shadow-lg flex-shrink-0">
        <button
          onClick={onBack}
          className="p-2 text-blue-200 hover:text-white hover:bg-blue-700/50 rounded-xl transition-all duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-white font-semibold text-lg">Daily Bible Verse</span>
          <span className="text-blue-200 text-sm font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          {/* Main Verse Card */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 mb-6 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              
              <blockquote className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-6 italic">
                "{verse.verse}"
              </blockquote>
              
              <div className="flex flex-col items-center space-y-2">
                <cite className="text-blue-100 font-semibold text-lg">
                  {verse.reference}
                </cite>
                <span className="px-4 py-2 bg-white/20 rounded-full text-blue-100 text-sm font-medium">
                  {verse.theme}
                </span>
              </div>
            </div>
          </div>

          {/* Reflection Section */}
          <div className="bg-gray-800 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <svg className="w-6 h-6 text-blue-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Today's Reflection
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Take a moment to meditate on these words. How can this verse guide your thoughts and actions today? 
              Consider writing down one way you can apply this truth to your current circumstances.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentVerse((prev) => (prev - 1 + dailyVerses.length) % dailyVerses.length)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Previous</span>
            </button>
            
            <span className="text-gray-400 text-sm">
              {currentVerse + 1} of {dailyVerses.length}
            </span>
            
            <button
              onClick={() => setCurrentVerse((prev) => (prev + 1) % dailyVerses.length)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <span>Next</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}