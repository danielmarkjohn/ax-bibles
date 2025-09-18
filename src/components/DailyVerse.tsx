import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

interface DailyVerseProps {
  onBack: () => void;
}

const dailyVerses = [
  {
    verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.",
    reference: "Jeremiah 29:11",
    theme: "Hope & Future",
    devotion: "God's plans for us are always good, even when we can't see the bigger picture. In times of uncertainty, we can trust that He is working all things together for our benefit. His plans are not to harm us but to give us hope and a future filled with His blessings. When life feels overwhelming or unclear, remember that the Creator of the universe has a specific, loving plan for your life. He sees the end from the beginning and knows exactly what you need to grow, flourish, and fulfill your purpose.",
    author: "Pastor John Smith"
  },
  {
    verse: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
    theme: "Trust & Guidance",
    devotion: "True wisdom comes from acknowledging that our understanding is limited. When we trust God completely and seek His will in all our decisions, He promises to guide our steps and make our paths clear. This requires humility and faith in His perfect wisdom. In a world that celebrates self-reliance and independence, this verse calls us to a different way of living - one that depends entirely on God's wisdom rather than our own limited perspective.",
    author: "Pastor Sarah Johnson"
  },
  {
    verse: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reference: "Romans 8:28",
    theme: "God's Purpose",
    devotion: "Even in our darkest moments, God is at work. This verse doesn't promise that all things are good, but that God works through all circumstances - both joyful and painful - to accomplish His good purposes in our lives. Our trials are not wasted when we love and trust Him. Every experience, every challenge, every blessing is being woven together by God's loving hands to create something beautiful in our lives and for His glory.",
    author: "Pastor Michael Davis"
  },
  {
    verse: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    reference: "Joshua 1:9",
    theme: "Strength & Courage",
    devotion: "Fear and discouragement are natural human emotions, but they don't have to control our lives. God's presence with us is the source of true courage and strength. When we face challenges, we can move forward boldly knowing that we are not alone. The same God who parted the Red Sea and conquered death walks with us every step of the way.",
    author: "Pastor David Wilson"
  },
  {
    verse: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.",
    reference: "Psalm 23:1-3",
    theme: "Peace & Rest",
    devotion: "In our busy, anxious world, God offers us true rest and peace. Like a caring shepherd, He provides for our needs, leads us to places of refreshment, and restores our weary souls. We can find contentment and peace not in our circumstances, but in our relationship with the Good Shepherd who loves us unconditionally.",
    author: "Pastor Mary Thompson"
  }
];

export default function DailyVerse({ onBack }: DailyVerseProps) {
  const [currentVerse, setCurrentVerse] = useState(0);
  const wallpaperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get today's verse based on day of year
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    setCurrentVerse(dayOfYear % dailyVerses.length);
  }, []);

  const verse = dailyVerses[currentVerse];

  const downloadWallpaper = async () => {
    if (wallpaperRef.current) {
      const canvas = await html2canvas(wallpaperRef.current, {
        width: 1080,
        height: 1920,
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const link = document.createElement('a');
      link.download = 'daily-verse-wallpaper.png';
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    }
  };

  const shareWallpaper = async () => {
    if (wallpaperRef.current && navigator.share) {
      const canvas = await html2canvas(wallpaperRef.current, {
        width: 1080,
        height: 1920,
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], 'daily-verse.png', { type: 'image/png' });
          await navigator.share({
            files: [file],
            title: 'Daily Bible Verse',
            text: `${verse.reference} - ${verse.verse}`
          });
        }
      });
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 pb-16">
      {/* Glass Header */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between shadow-2xl flex-shrink-0">
        <button
          onClick={onBack}
          className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-white font-semibold text-base">Daily Bible Verse</span>
          <span className="text-white/60 text-xs font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={shareWallpaper}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm"
            title="Share"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
          <button
            onClick={downloadWallpaper}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm"
            title="Download"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div ref={wallpaperRef} className="max-w-3xl mx-auto p-4">
          {/* Main Verse Card - Reduced Size */}
          <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 mb-4 shadow-2xl border border-white/20">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              
              <blockquote className="text-lg md:text-xl font-medium text-white leading-relaxed mb-4 italic drop-shadow-lg">
                "{verse.verse}"
              </blockquote>
              
              <div className="flex flex-col items-center space-y-2">
                <cite className="text-white/90 font-semibold text-base drop-shadow-md">
                  {verse.reference}
                </cite>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-xl rounded-full text-white/90 text-xs font-medium border border-white/30">
                  {verse.theme}
                </span>
              </div>
            </div>
          </div>

          {/* Devotion Section - Reduced Size */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-xl p-4 mb-4 border border-white/10 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mr-2">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              Today's Devotion
            </h3>
            <p className="text-white/80 leading-relaxed text-sm mb-3">
              {verse.devotion}
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <span className="text-blue-300 text-xs font-medium">
                by {verse.author}
              </span>
              <span className="text-white/50 text-xs">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Reflection Section - Reduced Size */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-xl p-4 border border-white/10 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mr-2">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              Personal Reflection
            </h3>
            <p className="text-white/80 leading-relaxed text-sm">
              Take a moment to meditate on these words. How can this verse guide your thoughts and actions today?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
