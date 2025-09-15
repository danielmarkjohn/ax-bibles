
import React, { useState, useEffect } from 'react';
import { fetchTranslations, Translation } from '../api/bibleClient';
import { BIBLE_BOOKS } from '../config/bibleConfig';
import BiblicalLoader from './BiblicalLoader';

interface BibleOverviewProps {
  onBack: () => void;
}

const bibleBooks = BIBLE_BOOKS.map((name, index) => {
  const isOldTestament = index < 39;
  return {
    id: index + 1,
    name,
    testament: isOldTestament ? 'Old' : 'New',
    // You can add more details here if needed
    description: `The book of ${name}`,
    author: 'Various',
    year: isOldTestament ? 'Before Christ' : 'A.D. 50-100',
    genre: isOldTestament ? 'Old Testament' : 'New Testament',
    readingTime: '60 mins'
  };
});

export default function BibleOverview({ onBack }: BibleOverviewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'translations' | 'books'>('overview');
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [selectedTestament, setSelectedTestament] = useState<'Old' | 'New' | 'All'>('All');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'translations') {
      loadTranslations();
    }
  }, [activeTab]);

  const loadTranslations = async () => {
    setLoading(true);
    try {
      const data = await fetchTranslations();
      setTranslations(data);
    } catch (error) {
      console.error('Failed to load translations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = selectedTestament === 'All' 
    ? bibleBooks 
    : bibleBooks.filter(book => book.testament === selectedTestament);

  return (
    <div className="h-full flex flex-col bg-gray-900 text-gray-100 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 backdrop-blur-sm px-4 py-4 flex items-center justify-between border-b border-gray-700/50 shadow-lg flex-shrink-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex flex-col">
            <span className="text-white font-semibold text-lg">Bible Overview</span>
            <span className="text-emerald-400 text-sm font-medium">Discover the Bible in 203 words</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-gray-800 border-b border-gray-700">
        {[
          { key: 'overview', label: 'Overview', icon: '📖' },
          { key: 'translations', label: 'Translations', icon: '🌍' },
          { key: 'books', label: 'Books', icon: '📚' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'text-emerald-400 border-b-2 border-emerald-400 bg-gray-700/50'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white">The Holy Bible</h2>
              <p className="text-emerald-400 text-lg">66 Books • 3 Millennia • Billions Inspired</p>
            </div>

            {/* Main Description */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Bible Overview</h3>
              <p className="text-gray-300 leading-relaxed">
                Authored under the supernatural guidance of the Holy Spirit by laymen and scholars, commoners and nobility alike, the Bible is as unique as it is profound. Containing 66 ancient books, it has shaped laws, influenced culture, and inspired billions to faith over three millennia. It is God's written Word, offering true life and salvation to all who read and embrace its teachings.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white">66</div>
                <div className="text-blue-200 text-sm">Books</div>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white">39</div>
                <div className="text-purple-200 text-sm">Old Testament</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white">27</div>
                <div className="text-emerald-200 text-sm">New Testament</div>
              </div>
              <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-white">1880</div>
                <div className="text-orange-200 text-sm">Years Span</div>
              </div>
            </div>

            {/* Testament Overview */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h4 className="text-lg font-bold text-white mb-3 flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                  Old Testament
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  A collection of divinely inspired books written between 1450 B.C. and 430 B.C., the Old Testament is a historical record of God's people, laws, sayings and promises that function as a model for moral living and conduct.
                </p>
              </div>
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h4 className="text-lg font-bold text-white mb-3 flex items-center">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></span>
                  New Testament
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The New Testament is a collection of twenty-seven sacred books that centre on the life, death, resurrection and teachings of Jesus Christ.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'translations' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Bible Translations</h2>
              <p className="text-gray-400">Explore different Bible translations</p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <BiblicalLoader 
                  message="Loading translations..."
                  variant="verse"
                />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {translations.map((translation) => (
                  <div key={translation._id} className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-emerald-500 transition-all duration-200 hover:shadow-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-white text-lg mb-1">
                          {translation.name}
                        </h3>
                        <p className="text-emerald-400 text-sm font-medium">
                          {translation.shortname || 
                           (typeof translation.module === 'string' ? translation.module.toUpperCase() : '')}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {translation.year && (
                        <p className="text-gray-300 text-sm">Published {translation.year}</p>
                      )}
                      
                      {translation.publisher && typeof translation.publisher === 'string' && (
                        <p className="text-gray-400 text-sm">{translation.publisher}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'books' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Bible Books</h2>
              <p className="text-gray-400">Explore the 66 books of the Bible</p>
            </div>

            {/* Testament Filter */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-800 rounded-lg p-1 flex">
                {['All', 'Old', 'New'].map((testament) => (
                  <button
                    key={testament}
                    onClick={() => setSelectedTestament(testament as any)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedTestament === testament
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {testament} Testament
                  </button>
                ))}
              </div>
            </div>

            {/* Books Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {filteredBooks.map((book) => (
                <div key={book.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-emerald-500 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                      book.testament === 'Old' ? 'bg-purple-600' : 'bg-emerald-600'
                    }`}>
                      {book.id}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white mb-1">{book.name}</h3>
                      <p className="text-gray-300 text-sm mb-3 leading-relaxed">{book.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="bg-gray-700 px-2 py-1 rounded text-gray-300">{book.author}</span>
                        <span className="bg-gray-700 px-2 py-1 rounded text-gray-300">{book.year}</span>
                        <span className="bg-gray-700 px-2 py-1 rounded text-gray-300">{book.genre}</span>
                        <span className="bg-emerald-600 px-2 py-1 rounded text-white">{book.readingTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
