
import React, { useState } from 'react';
import { Translation } from '../api/bibleClient';
import { BIBLE_BOOKS } from '../config/bibleConfig';
import bibleStructure from '../config/bible_structure.json';

interface BibleStructure {
  [bookId: string]: {
    totalChapters: number;
    chapters: {
      [chapterNum: string]: number;
    };
  };
}

const structure = bibleStructure as BibleStructure;

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  translations: Translation[];
  selectedTranslation: string;
  onTranslationChange: (translation: string) => void;
  selectedBook: string;
  onBookChange: (book: string) => void;
  chapters: number[];
  onChapterSelect: (chapter: number) => void;
  loading: {
    translations: boolean;
    verses: boolean;
    search: boolean;
  };
}

export default function ActionSheet({
  isOpen,
  onClose,
  translations,
  selectedTranslation,
  onTranslationChange,
  selectedBook,
  onBookChange,
  chapters,
  onChapterSelect,
  loading
}: ActionSheetProps) {
  const [expandedBook, setExpandedBook] = useState<string>(selectedBook);
  const [bookOrder, setBookOrder] = useState<'traditional' | 'alphabetical'>('traditional');

  if (!isOpen) return null;

  // Get book index (1-based) from book name
  const getBookIndex = (bookName: string): number => {
    return BIBLE_BOOKS.indexOf(bookName) + 1;
  };

  // Get available chapters for any book
  const getAvailableChapters = (bookName: string): number[] => {
    const bookIndex = getBookIndex(bookName);
    const bookData = structure[bookIndex.toString()];
    
    if (!bookData || bookData.totalChapters === 0) {
      return [];
    }
    
    return Array.from({ length: bookData.totalChapters }, (_, i) => i + 1);
  };

  const sortedBooks = bookOrder === 'alphabetical' 
    ? [...BIBLE_BOOKS].sort()
    : BIBLE_BOOKS;

  const handleBookClick = (book: string) => {
    if (expandedBook === book) {
      setExpandedBook('');
    } else {
      setExpandedBook(book);
      onBookChange(book);
    }
  };

  const handleChapterClick = (chapter: number) => {
    onChapterSelect(chapter);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
        <button
          onClick={onClose}
          className="text-blue-400 text-lg font-medium hover:text-blue-300 transition-colors"
        >
          Cancel
        </button>
        <h2 className="text-lg font-semibold text-white">Menu</h2>
        <div className="w-16"></div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {/* Translation Selection */}
        <div className="px-4 py-4 border-b border-gray-700">
          <h3 className="text-white font-medium mb-3">Translation</h3>
          <select
            value={selectedTranslation}
            onChange={(e) => onTranslationChange(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
          >
            <option value="">Select Translation</option>
            {translations.map((translation) => (
              <option key={translation._id} value={String(translation.module || '')}>
                {translation.abbreviation} - {translation.name}
              </option>
            ))}
          </select>
        </div>

        {/* Book List */}
        <div className="px-4 py-4">
          <h3 className="text-white font-medium mb-4">Books</h3>
          <div className="space-y-1">
            {sortedBooks.map((book) => (
              <div key={book} className="border-b border-gray-800 last:border-b-0">
                <button
                  onClick={() => handleBookClick(book)}
                  className={`w-full flex items-center justify-between py-3 px-2 text-left rounded-lg transition-all hover:bg-gray-800 ${
                    selectedBook === book ? 'text-white bg-gray-800' : 'text-gray-300'
                  }`}
                >
                  <span className="text-base font-medium">{book}</span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      expandedBook === book ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Chapter Grid */}
                {expandedBook === book && (
                  <div className="pb-4 px-2 animate-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 mt-3">
                      {getAvailableChapters(book).map((chapter) => (
                        <button
                          key={chapter}
                          onClick={() => handleChapterClick(chapter)}
                          className="aspect-square bg-gray-700 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-medium transition-all hover:scale-105 active:scale-95"
                        >
                          {chapter}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex border-t border-gray-700 flex-shrink-0">
        <button
          onClick={() => setBookOrder('traditional')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            bookOrder === 'traditional' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Traditional
        </button>
        <button
          onClick={() => setBookOrder('alphabetical')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            bookOrder === 'alphabetical' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Alphabetical
        </button>
      </div>
    </div>
  );
}
