
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChapterInfo, fetchTranslations, fetchVerses, Translation, Verse } from '../api/bibleClient';
import { BIBLE_BOOKS } from '../config/bibleConfig';
import bibleStructure from '../config/bible_structure.json';
import ActionSheet from './ActionSheet';
import SettingsModal from './SettingsModal';
import SearchModal from './SearchModal';
import BookmarksModal from './BookmarksModal';

interface BibleStructure {
  [bookId: string]: {
    totalChapters: number;
    chapters: {
      [chapterNum: string]: number;
    };
  };
}

const structure = bibleStructure as BibleStructure;

interface BibleReaderProps { }

interface ReaderSettings {
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  theme: 'light' | 'dark' | 'sepia';
  highlightColor: string;
  showVerseNumbers: boolean;
  columnLayout: boolean;
  fullscreen: boolean;
}

interface Highlight {
  verseId: string;
  color: string;
  note?: string;
  timestamp: number;
}

interface Bookmark {
  translation: string;
  book: string;
  chapter: number;
  verse: number;
  timestamp: number;
  note?: string;
}

export default function BibleReader({ }: BibleReaderProps) {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [verses, setVerses] = useState<Verse[]>([]);

  const [selectedTranslation, setSelectedTranslation] = useState<string>('');
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<number>(0);

  // Remove chapters state - we'll use structure file
  const [availableChapters, setAvailableChapters] = useState<number[]>([]);

  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Verse[]>([]);

  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [selectedText, setSelectedText] = useState('');
  const [showTextMenu, setShowTextMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const [readerSettings, setReaderSettings] = useState<ReaderSettings>({
    fontSize: 18,
    fontFamily: 'inter',
    lineHeight: 1.6,
    theme: 'light',
    highlightColor: '#ffeb3b',
    showVerseNumbers: true,
    columnLayout: false,
    fullscreen: false,
  });

  const [loading, setLoading] = useState({
    translations: false,
    verses: false,
    search: false,
  });

  const readerRef = useRef<HTMLDivElement>(null);
  const textSelectionRef = useRef<Selection | null>(null);

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('bible_reader_settings');
    if (savedSettings) {
      setReaderSettings(JSON.parse(savedSettings));
    }

    const savedHighlights = localStorage.getItem('bible_highlights');
    if (savedHighlights) {
      setHighlights(JSON.parse(savedHighlights));
    }

    const savedBookmarks = localStorage.getItem('bible_bookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('bible_reader_settings', JSON.stringify(readerSettings));
  }, [readerSettings]);

  useEffect(() => {
    localStorage.setItem('bible_highlights', JSON.stringify(highlights));
  }, [highlights]);

  useEffect(() => {
    localStorage.setItem('bible_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Text selection handling
  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedText(selection.toString());
      setMenuPosition({ x: rect.left + rect.width / 2, y: rect.top - 10 });
      setShowTextMenu(true);
      textSelectionRef.current = selection;
    } else {
      setShowTextMenu(false);
      setSelectedText('');
    }
  }, []);

  // Add highlight with better visibility
  const addHighlight = (color: string) => {
    if (selectedText && textSelectionRef.current) {
      const range = textSelectionRef.current.getRangeAt(0);
      const verseElement = range.commonAncestorContainer.parentElement?.closest('[data-verse-id]');
      if (verseElement) {
        const verseId = verseElement.getAttribute('data-verse-id');
        if (verseId) {
          const newHighlight: Highlight = {
            verseId,
            color: color + '40', // Add transparency
            timestamp: Date.now(),
          };
          setHighlights(prev => [...prev, newHighlight]);
        }
      }
    }
    setShowTextMenu(false);
  };

  // Add bookmark
  const addBookmark = (verse: number, note?: string) => {
    const newBookmark: Bookmark = {
      translation: selectedTranslation,
      book: selectedBook,
      chapter: selectedChapter,
      verse,
      timestamp: Date.now(),
      note,
    };
    setBookmarks(prev => [...prev, newBookmark]);
  };

  // Navigate to bookmark
  const navigateToBookmark = (bookmark: Bookmark) => {
    setSelectedTranslation(bookmark.translation);
    setSelectedBook(bookmark.book);
    setSelectedChapter(bookmark.chapter);
    setShowNotes(false);
  };

  // Delete bookmark
  const deleteBookmark = (index: number) => {
    setBookmarks(prev => prev.filter((_, i) => i !== index));
  };

  // Search functionality
  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setLoading(prev => ({ ...prev, search: true }));
    try {
      // Simple client-side search through current verses
      const results = verses.filter(verse =>
        verse.text.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(prev => ({ ...prev, search: false }));
    }
  };

  // Navigation functions
  const goToPreviousChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1);
    }
  };

  const goToNextChapter = () => {
    if (selectedChapter < availableChapters.length) {
      setSelectedChapter(selectedChapter + 1);
    }
  };

  // Font options
  const fontOptions = [
    { value: 'inter', label: 'Inter', family: 'Inter, system-ui, sans-serif' },
    { value: 'georgia', label: 'Georgia', family: 'Georgia, serif' },
    { value: 'times', label: 'Times New Roman', family: '"Times New Roman", Times, serif' },
    { value: 'arial', label: 'Arial', family: 'Arial, sans-serif' },
    { value: 'helvetica', label: 'Helvetica', family: 'Helvetica, Arial, sans-serif' },
    { value: 'roboto', label: 'Roboto', family: 'Roboto, sans-serif' },
    { value: 'opensans', label: 'Open Sans', family: '"Open Sans", sans-serif' },
    { value: 'lato', label: 'Lato', family: 'Lato, sans-serif' },
    { value: 'merriweather', label: 'Merriweather', family: 'Merriweather, serif' },
    { value: 'playfair', label: 'Playfair Display', family: '"Playfair Display", serif' }
  ];

  // Theme styles
  const getThemeStyles = () => {
    switch (readerSettings.theme) {
      case 'light':
        return {
          backgroundColor: '#ffffff',
          color: '#1f2937',
        };
      case 'dark':
        return {
          backgroundColor: '#111827',
          color: '#f3f4f6',
        };
      case 'sepia':
        return {
          backgroundColor: '#f4f1e8',
          color: '#5c4b37',
        };
      default:
        return {
          backgroundColor: '#111827',
          color: '#f3f4f6',
        };
    }
  };

  const getCurrentFont = () => {
    const font = fontOptions.find(f => f.value === readerSettings.fontFamily);
    return font ? font.family : 'Inter, system-ui, sans-serif';
  };

  const readerStyles = {
    ...getThemeStyles(),
    fontSize: `${readerSettings.fontSize}px`,
    fontFamily: getCurrentFont(),
    lineHeight: readerSettings.lineHeight,
  };

  // Load translations on mount and restore previous selections
  useEffect(() => {
    loadTranslations();
  }, []);

  useEffect(() => {
    if (selectedBook) {
      const chapters = getAvailableChapters(selectedBook);
      setAvailableChapters(chapters);
      
      // Clear verses when book changes
      if (selectedChapter > 0) {
        setSelectedChapter(0);
        setVerses([]);
      }
    }
  }, [selectedBook]);

  useEffect(() => {
    if (selectedTranslation && selectedBook && selectedChapter > 0) {
      loadVerses(selectedTranslation, selectedBook, selectedChapter);
    }
  }, [selectedTranslation, selectedBook, selectedChapter]);

  const loadTranslations = async () => {
    setLoading(prev => ({ ...prev, translations: true }));
    try {
      const data = await fetchTranslations();
      setTranslations(data);

      // Load saved preferences
      const savedTranslation = localStorage.getItem('selectedTranslation');
      const savedBook = localStorage.getItem('selectedBook');
      const savedChapter = localStorage.getItem('selectedChapter');

      // Set translation
      const translationToUse = savedTranslation || (data.length > 0 ? String(data[0].module) : '');
      if (translationToUse) {
        setSelectedTranslation(translationToUse);

        // Set book
        const bookToUse = savedBook || (BIBLE_BOOKS.length > 0 ? BIBLE_BOOKS[0] : '');
        if (bookToUse) {
          setSelectedBook(bookToUse);

          // Only set chapter if we have a saved one
          if (savedChapter) {
            setSelectedChapter(parseInt(savedChapter));
          }
        }
      }
    } catch (error) {
      console.error('Failed to load translations:', error);
    } finally {
      setLoading(prev => ({ ...prev, translations: false }));
    }
  };

  // Remove loadChapters function - no longer needed

  const loadVerses = async (translation: string, book: string, chapter: number) => {
    setLoading(prev => ({ ...prev, verses: true }));
    try {
      const data = await fetchVerses(translation, book, chapter);
      setVerses(data);
      setShowActionSheet(false);
    } catch (error) {
      console.error('Failed to load verses:', error);
    } finally {
      setLoading(prev => ({ ...prev, verses: false }));
    }
  };

  const handleChapterSelect = (chapter: number) => {
    setSelectedChapter(chapter);
    // Save to localStorage
    localStorage.setItem('selectedChapter', chapter.toString());
  };

  // Get book index (1-based) from book name
  const getBookIndex = (bookName: string): number => {
    return BIBLE_BOOKS.indexOf(bookName) + 1;
  };

  // Get available chapters for selected book
  const getAvailableChapters = (bookName: string): number[] => {
    const bookIndex = getBookIndex(bookName);
    const bookData = structure[bookIndex.toString()];
    
    if (!bookData || bookData.totalChapters === 0) {
      return [];
    }
    
    return Array.from({ length: bookData.totalChapters }, (_, i) => i + 1);
  };

  // Get verse count for a specific chapter
  const getVerseCount = (bookName: string, chapter: number): number => {
    const bookIndex = getBookIndex(bookName);
    const bookData = structure[bookIndex.toString()];
    
    if (!bookData || !bookData.chapters[chapter.toString()]) {
      return 0;
    }
    
    return bookData.chapters[chapter.toString()];
  };

  // Save selections to localStorage
  useEffect(() => {
    if (selectedTranslation) {
      localStorage.setItem('selectedTranslation', selectedTranslation);
    }
  }, [selectedTranslation]);

  useEffect(() => {
    if (selectedBook) {
      localStorage.setItem('selectedBook', selectedBook);
    }
  }, [selectedBook]);

  useEffect(() => {
    if (selectedChapter > 0) {
      localStorage.setItem('selectedChapter', selectedChapter.toString());
    }
  }, [selectedChapter]);

  return (
    <div className={`h-full flex flex-col bg-gray-900 text-gray-100 ${readerSettings.fullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 backdrop-blur-sm px-4 py-4 flex items-center justify-between border-b border-gray-700/50 shadow-lg flex-shrink-0">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <span className="text-white font-semibold text-lg">
              {selectedBook && selectedChapter > 0 ? `${selectedBook} ${selectedChapter} -` : 'Select Chapter'}
              {selectedTranslation && (
            <span className="text-white font-semibold text-lg ml-2">
                  {selectedTranslation.toUpperCase()}
                </span>
              )}
            </span>

          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowActionSheet(true)}
            className="p-2.5 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all duration-200 hover:scale-105"
            title="Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => setShowSearch(true)}
            className="p-2.5 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all duration-200 hover:scale-105"
            title="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button
            onClick={() => setShowNotes(true)}
            className="p-2.5 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all duration-200 hover:scale-105"
            title="Bookmarks"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
            </svg>
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="p-2.5 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-xl transition-all duration-200 hover:scale-105"
            title="Settings"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Reader Content */}
      <div className="flex-1 overflow-y-auto" style={readerStyles}>
        {loading.verses ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-700 border-t-blue-500"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-400 animate-pulse"></div>
              </div>
              <div className="text-center">
                <span className="font-medium text-lg">Loading verses...</span>
                <p className="text-sm mt-1 opacity-70">
                  {selectedBook} {selectedChapter}
                </p>
              </div>
            </div>
          </div>
        ) : verses.length > 0 ? (
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={goToPreviousChapter}
              disabled={selectedChapter <= 1}
              className="fixed left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToNextChapter}
              disabled={selectedChapter >= availableChapters.length}
              className="fixed right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Verses */}
            <div
              ref={readerRef}
              onMouseUp={handleTextSelection}
              className={`max-w-4xl mx-auto px-6 py-8 space-y-4 ${readerSettings.columnLayout ? 'columns-2 gap-8' : ''
                }`}
            >
              {verses.map((verse, index) => {
                const highlight = highlights.find(h => h.verseId === verse._id);
                const isBookmarked = bookmarks.some(b =>
                  b.translation === selectedTranslation &&
                  b.book === selectedBook &&
                  b.chapter === selectedChapter &&
                  b.verse === verse.verse
                );

                return (
                  <div
                    key={verse._id}
                    data-verse-id={verse._id}
                    className="group relative leading-relaxed break-inside-avoid mb-4 p-3 rounded-lg hover:bg-gray-800/30 transition-all"
                    style={highlight ? {
                      backgroundColor: highlight.color,
                      border: `1px solid ${highlight.color}80`
                    } : {}}
                  >
                    <p className="select-text" style={{ lineHeight: readerSettings.lineHeight }}>
                      {readerSettings.showVerseNumbers && (
                        <sup className="text-sm mr-2 font-medium opacity-70 select-none">
                          {verse.verse}
                        </sup>
                      )}
                      {verse.text}
                    </p>

                    <button
                      onClick={() => addBookmark(verse.verse)}
                      className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all p-1.5 rounded-full hover:bg-gray-700/50 ${isBookmarked
                          ? 'text-yellow-500 opacity-100'
                          : 'text-gray-400 hover:text-yellow-500'
                        }`}
                      title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                    >
                      <svg className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : selectedBook && availableChapters.length > 0 ? (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-6 text-center">Select Chapter</h3>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-3 max-w-4xl mx-auto">
              {availableChapters.map((chapterNum) => {
                const verseCount = getVerseCount(selectedBook, chapterNum);
                return (
                  <button
                    key={chapterNum}
                    onClick={() => handleChapterSelect(chapterNum)}
                    className="bg-gray-800 hover:bg-blue-600 text-white font-semibold py-3 px-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg flex flex-col items-center space-y-1"
                  >
                    <span className="text-lg">{chapterNum}</span>
                    <span className="text-xs opacity-70">{verseCount}v</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md mx-auto p-8">
              <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Welcome to Bible Reader</h3>
              <p className="opacity-70 mb-4">Select a book and chapter to start reading</p>
              <button
                onClick={() => setShowActionSheet(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Open Menu
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Text Selection Menu */}
      {showTextMenu && (
        <div
          className="fixed z-20 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-2 flex space-x-2"
          style={{ left: menuPosition.x - 100, top: menuPosition.y - 60 }}
        >
          <button
            onClick={() => addHighlight('#fef3c7')}
            className="w-8 h-8 bg-yellow-200 rounded-md hover:bg-yellow-300 transition-all border border-yellow-300"
            title="Yellow highlight"
          />
          <button
            onClick={() => addHighlight('#dcfce7')}
            className="w-8 h-8 bg-green-200 rounded-md hover:bg-green-300 transition-all border border-green-300"
            title="Green highlight"
          />
          <button
            onClick={() => addHighlight('#dbeafe')}
            className="w-8 h-8 bg-blue-200 rounded-md hover:bg-blue-300 transition-all border border-blue-300"
            title="Blue highlight"
          />
          <button
            onClick={() => addHighlight('#fce7f3')}
            className="w-8 h-8 bg-pink-200 rounded-md hover:bg-pink-300 transition-all border border-pink-300"
            title="Pink highlight"
          />
        </div>
      )}

      {/* Modals */}
      <ActionSheet
        isOpen={showActionSheet}
        onClose={() => setShowActionSheet(false)}
        translations={translations}
        selectedTranslation={selectedTranslation}
        onTranslationChange={setSelectedTranslation}
        selectedBook={selectedBook}
        onBookChange={setSelectedBook}
        chapters={availableChapters}
        onChapterSelect={handleChapterSelect}
        loading={loading}
      />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={readerSettings}
        onSettingsChange={setReaderSettings}
      />

      <SearchModal
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        onSearch={handleSearch}
        searchResults={searchResults}
        loading={loading.search}
      />

      <BookmarksModal
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
        bookmarks={bookmarks}
        onBookmarkClick={navigateToBookmark}
        onDeleteBookmark={deleteBookmark}
      />
    </div>
  );
}
