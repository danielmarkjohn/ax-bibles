import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { fetchVerses, Translation, Verse } from '../api/bibleClient';
import { BIBLE_BOOKS } from '../config/bibleConfig';
import bibleStructure from '../config/bible_structure.json';
import BiblicalLoader from './BiblicalLoader';

interface BibleStructure {
  [bookId: string]: {
    totalChapters: number;
    chapters: {
      [chapterNum: string]: number;
    };
  };
}

const structure = bibleStructure as BibleStructure;

interface VerseWallpaperCreatorProps {
  onBack: () => void;
}

const backgroundColors = [
  { name: 'Ocean Blue', gradient: 'from-blue-600 to-blue-800' },
  { name: 'Sunset', gradient: 'from-orange-500 to-pink-600' },
  { name: 'Forest', gradient: 'from-green-600 to-green-800' },
  { name: 'Purple Dream', gradient: 'from-purple-600 to-purple-800' },
  { name: 'Golden Hour', gradient: 'from-yellow-500 to-orange-600' },
  { name: 'Deep Sea', gradient: 'from-teal-600 to-blue-900' },
  { name: 'Rose Garden', gradient: 'from-pink-500 to-rose-600' },
  { name: 'Midnight', gradient: 'from-gray-800 to-gray-900' }
];

const wallpaperImages = [
  { name: 'Wallpaper 1', path: '/assets/wallpapers/bg1.png' },
  { name: 'Wallpaper 2', path: '/assets/wallpapers/bg2.png' },
  { name: 'Wallpaper 3', path: '/assets/wallpapers/bg3.png' },
  { name: 'Wallpaper 4', path: '/assets/wallpapers/bg4.png' },
  { name: 'Wallpaper 5', path: '/assets/wallpapers/bg5.png' },
  { name: 'Wallpaper 6', path: '/assets/wallpapers/bg6.png' }
];

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

const fontColors = [
  { name: 'White', value: '#ffffff' },
  { name: 'Black', value: '#000000' },
  { name: 'Gold', value: '#ffd700' },
  { name: 'Silver', value: '#c0c0c0' },
  { name: 'Cream', value: '#f5f5dc' },
  { name: 'Light Blue', value: '#87ceeb' },
  { name: 'Light Pink', value: '#ffb6c1' },
  { name: 'Light Green', value: '#90ee90' }
];

export default function VerseWallpaperCreator({ onBack }: VerseWallpaperCreatorProps) {
  const [customVerse, setCustomVerse] = useState('');
  const [customReference, setCustomReference] = useState('');
  const [selectedBackground, setSelectedBackground] = useState(backgroundColors[0]);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState(48);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [fontFamily, setFontFamily] = useState('inter');
  const [fontColor, setFontColor] = useState('#ffffff');
  const wallpaperRef = useRef<HTMLDivElement>(null);
  
  // API verse selection
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [selectedTranslation, setSelectedTranslation] = useState<string>('');
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [selectedVerseNum, setSelectedVerseNum] = useState<number>(1);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTranslations();
    loadSelectedVerse();
  }, []);

  const loadTranslations = () => {
    try {
      const cached = localStorage.getItem('bible_cache_translations');
      if (cached) {
        const parsedCache = JSON.parse(cached);
        if (parsedCache.data && Array.isArray(parsedCache.data)) {
          setTranslations(parsedCache.data);
          if (parsedCache.data.length > 0) {
            setSelectedTranslation(parsedCache.data[0].shortname || parsedCache.data[0].abbreviation);
          }
        }
      }
    } catch (error) {
      console.error('Failed to load translations from localStorage:', error);
    }
  };

  const loadSelectedVerse = () => {
    try {
      const savedVerse = localStorage.getItem('selectedVerseForWallpaper');
      if (savedVerse) {
        const verseData = JSON.parse(savedVerse);
        setCustomVerse(verseData.verse);
        setCustomReference(verseData.reference);
        // Clear the stored verse after loading
        localStorage.removeItem('selectedVerseForWallpaper');
      }
    } catch (error) {
      console.error('Failed to load selected verse:', error);
    }
  };

  const loadVerses = async () => {
    if (!selectedTranslation || !selectedBook || !selectedChapter) return;
    
    setLoading(true);
    try {
      const data = await fetchVerses(selectedTranslation, selectedBook, selectedChapter);
      setVerses(data);
      if (data.length > 0) {
        setSelectedVerseNum(1);
      }
    } catch (error) {
      console.error('Failed to load verses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTranslation && selectedBook && selectedChapter) {
      loadVerses();
    }
  }, [selectedTranslation, selectedBook, selectedChapter]);

  // Get available chapters for selected book
  const getAvailableChapters = (bookName: string): number[] => {
    const bookIndex = BIBLE_BOOKS.indexOf(bookName) + 1;
    const bookData = structure[bookIndex.toString()];
    if (!bookData || bookData.totalChapters === 0) {
      return [];
    }
    return Array.from({ length: bookData.totalChapters }, (_, i) => i + 1);
  };

  // Get available verses for selected book and chapter
  const getAvailableVerses = (bookName: string, chapter: number): number[] => {
    const bookIndex = BIBLE_BOOKS.indexOf(bookName) + 1;
    const bookData = structure[bookIndex.toString()];
    if (!bookData || !bookData.chapters[chapter.toString()]) {
      return [];
    }
    const verseCount = bookData.chapters[chapter.toString()];
    return Array.from({ length: verseCount }, (_, i) => i + 1);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadWallpaper = async () => {
    if (!wallpaperRef.current) return;
    
    try {
      // Create a temporary full-size element for rendering
      const tempElement = wallpaperRef.current.cloneNode(true) as HTMLElement;
      tempElement.style.width = '1080px';
      tempElement.style.height = '1920px';
      tempElement.style.position = 'fixed';
      tempElement.style.left = '-9999px';
      tempElement.style.top = '0';
      tempElement.style.zIndex = '-1';
      tempElement.style.visibility = 'hidden';
      
      // Scale up font sizes for full resolution
      const blockquote = tempElement.querySelector('blockquote') as HTMLElement;
      const cite = tempElement.querySelector('cite') as HTMLElement;
      
      if (blockquote) {
        blockquote.style.fontSize = `${fontSize}px`;
        blockquote.style.lineHeight = '1.4';
      }
      if (cite) {
        cite.style.fontSize = `${fontSize * 0.75}px`;
      }
      
      document.body.appendChild(tempElement);
      
      // Wait for fonts and images to load
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = await html2canvas(tempElement, {
        width: 1080,
        height: 1920,
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        onclone: (clonedDoc) => {
          // Ensure all fonts are loaded in the cloned document
          const clonedElement: any = clonedDoc.querySelector('[data-html2canvas-ignore]');
          if (clonedElement) {
            clonedElement.style.fontDisplay = 'block';
          }
        }
      });
      
      document.body.removeChild(tempElement);
      
      // Convert to blob for better mobile compatibility
      canvas.toBlob((blob) => {
        if (!blob) return;
        
        // For mobile devices, try different download methods
        if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          // Mobile download approach
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'verse-wallpaper-1080x1920.png';
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } else {
          // Desktop download
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = 'verse-wallpaper-1080x1920.png';
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        }
      }, 'image/png', 1.0);
      
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: try direct canvas download
      const canvas = await html2canvas(wallpaperRef.current, {
        width: 1080,
        height: 1920,
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const link = document.createElement('a');
      link.download = 'verse-wallpaper.png';
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    }
  };

  const shareWallpaper = async () => {
    const currentVerse = getCurrentVerse();
    if (!wallpaperRef.current || !currentVerse) return;
    
    try {
      // Check if Web Share API is supported
      if (!navigator.share) {
        // Fallback to download on unsupported browsers
        await downloadWallpaper();
        return;
      }
      
      // Create canvas for sharing
      const canvas = await html2canvas(wallpaperRef.current, {
        width: 1080,
        height: 1920,
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false
      });
      
      // Convert to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, 'image/png', 0.9);
      });
      
      if (!blob) {
        throw new Error('Failed to create image blob');
      }
      
      // Check if files can be shared
      if (navigator.canShare && !navigator.canShare({ files: [new File([blob], 'verse.png', { type: 'image/png' })] })) {
        // Fallback to text sharing
        await navigator.share({
          title: 'Bible Verse Wallpaper',
          text: `${currentVerse.reference} - "${currentVerse.verse}"`
        });
        return;
      }
      
      // Share with file
      const file = new File([blob], 'verse-wallpaper.png', { type: 'image/png' });
      await navigator.share({
        files: [file],
        title: 'Bible Verse Wallpaper',
        text: `${currentVerse.reference} - "${currentVerse.verse}"`
      });
      
    } catch (error) {
      console.error('Share failed:', error);
      
      // Ultimate fallback: copy text to clipboard
      if (navigator.clipboard && currentVerse) {
        try {
          await navigator.clipboard.writeText(`${currentVerse.reference} - "${currentVerse.verse}"`);
          alert('Verse copied to clipboard!');
        } catch (clipboardError) {
          console.error('Clipboard failed:', clipboardError);
          // Final fallback: download
          await downloadWallpaper();
        }
      } else {
        await downloadWallpaper();
      }
    }
  };

  const getCurrentVerse = () => {
    if (verses.length > 0) {
      const verse = verses.find(v => v.verse === selectedVerseNum);
      if (verse) {
        return {
          verse: verse.text,
          reference: `${selectedBook} ${selectedChapter}:${selectedVerseNum}`
        };
      }
    }
    
    if (customVerse && customReference) {
      return { verse: customVerse, reference: customReference };
    }
    
    return null;
  };

  const getCurrentFont = () => {
    const font = fontOptions.find(f => f.value === fontFamily);
    return font ? font.family : 'Inter, system-ui, sans-serif';
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      {/* Modern Glass Header */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-4 py-4 flex items-center justify-between shadow-2xl flex-shrink-0">
        <button
          onClick={onBack}
          className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 backdrop-blur-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-white font-semibold text-lg">Verse Creator</span>
          <span className="text-gray-300 text-sm">Design & Share</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={shareWallpaper}
            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 backdrop-blur-sm"
            title="Share Wallpaper"
            disabled={!getCurrentVerse()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
          <button
            onClick={downloadWallpaper}
            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 backdrop-blur-sm"
            title="Download FHD Wallpaper"
            disabled={!getCurrentVerse()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Preview at Top - Vertical Orientation */}
        <div className="p-4 flex justify-center bg-white/5 backdrop-blur-sm border-b border-white/10">
          <div className="relative">
            <div
            
              ref={wallpaperRef}
              className={`w-48 h-80 rounded-2xl backdrop-blur-sm overflow-hidden shadow-2xl relative flex flex-col justify-center items-center p-6 ${
                backgroundImage ? '' : `bg-gradient-to-br ${selectedBackground.gradient}`
              }`}
              style={backgroundImage ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              } : {}}
            >
              {backgroundImage && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
              )}
              
              <div className={`relative z-10 text-${textAlign} px-3`} style={{ fontFamily: getCurrentFont() }}>
                {(() => {
                  const currentVerse = getCurrentVerse();
                  return currentVerse ? (
                    <>
                      <blockquote 
                        className="font-medium leading-relaxed mb-4 drop-shadow-lg"
                        style={{ 
                          fontSize: `${fontSize * 0.25}px`,
                          color: fontColor
                        }}
                      >
                        "{currentVerse.verse}"
                      </blockquote>
                      <cite 
                        className="font-semibold drop-shadow-lg"
                        style={{ 
                          fontSize: `${fontSize * 0.2}px`,
                          color: fontColor,
                          opacity: 0.9
                        }}
                      >
                        {currentVerse.reference}
                      </cite>
                    </>
                  ) : (
                    <div className="text-center text-white/70">
                      <p className="text-md mb-2">Choose a verse to create your wallpaper</p>
                    </div>
                  );
                })()}
              </div>
            </div>
          
          </div>
        </div>

        {/* Font Size Control - Below Preview */}
        <div className="px-4 py-3 bg-white/5 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-md mx-auto">
            <label className="text-sm text-gray-300 block mb-2 text-center">Font Size</label>
            <input
              type="range"
              min="40"
              max="90"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-center mt-1">
              <span className="text-xs text-gray-400">{fontSize}px</span>
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Verse Source - Only Bible Selection */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-3">Select Verse from Bible</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <select
                  value={selectedTranslation}
                  onChange={(e) => setSelectedTranslation(e.target.value)}
                  className="bg-white/10 text-white rounded-xl p-3 border border-white/20 focus:border-pink-500 focus:outline-none"
                >
                  <option value="" className="bg-gray-800">Select Translation</option>
                  {translations.map((t) => (
                    <option key={t._id} value={t.shortname || t.abbreviation} className="bg-gray-800">
                      {t.shortname || t.abbreviation}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedBook}
                  onChange={(e) => {
                    setSelectedBook(e.target.value);
                    setSelectedChapter(1);
                    setSelectedVerseNum(1);
                  }}
                  className="bg-white/10 text-white rounded-xl p-3 border border-white/20 focus:border-pink-500 focus:outline-none"
                >
                  <option value="" className="bg-gray-800">Select Book</option>
                  {BIBLE_BOOKS.map((book) => (
                    <option key={book} value={book} className="bg-gray-800">
                      {book}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedChapter}
                  onChange={(e) => {
                    setSelectedChapter(Number(e.target.value));
                    setSelectedVerseNum(1);
                  }}
                  className="bg-white/10 text-white rounded-xl p-3 border border-white/20 focus:border-pink-500 focus:outline-none"
                  disabled={!selectedBook}
                >
                  <option value={0} className="bg-gray-800">Select Chapter</option>
                  {selectedBook && getAvailableChapters(selectedBook).map((chapter) => (
                    <option key={chapter} value={chapter} className="bg-gray-800">
                      Chapter {chapter}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedVerseNum}
                  onChange={(e) => setSelectedVerseNum(Number(e.target.value))}
                  className="bg-white/10 text-white rounded-xl p-3 border border-white/20 focus:border-pink-500 focus:outline-none"
                  disabled={!selectedBook || !selectedChapter}
                >
                  <option value={0} className="bg-gray-800">Select Verse</option>
                  {selectedBook && selectedChapter && getAvailableVerses(selectedBook, selectedChapter).map((verse) => (
                    <option key={verse} value={verse} className="bg-gray-800">
                      Verse {verse}
                    </option>
                  ))}
                </select>
              </div>
              
              {loading && (
                <div className="flex items-center justify-center mt-4">
                  <BiblicalLoader 
                    message="Loading verses..."
                    size="sm"
                    variant="minimal"
                  />
                </div>
              )}
            </div>

            {/* Background Options */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-3">Background</h3>
              
              {/* Gradient Colors */}
              <div className="mb-4">
                <h4 className="text-sm text-gray-300 mb-2">Gradient Colors</h4>
                <div className="grid grid-cols-4 gap-2">
                  {backgroundColors.map((bg, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedBackground(bg);
                        setBackgroundImage(null);
                      }}
                      className={`h-12 rounded-xl bg-gradient-to-r ${bg.gradient} border-2 transition-all ${
                        selectedBackground === bg && !backgroundImage
                          ? 'border-white shadow-lg scale-105'
                          : 'border-transparent hover:border-white/50'
                      }`}
                      title={bg.name}
                    />
                  ))}
                </div>
              </div>

              {/* Wallpaper Images */}
              <div className="mb-4">
                <h4 className="text-sm text-gray-300 mb-2">Wallpaper Images</h4>
                <div className="grid grid-cols-3 gap-2">
                  {wallpaperImages.map((wallpaper, index) => (
                    <button
                      key={index}
                      onClick={() => setBackgroundImage(wallpaper.path)}
                      className={`h-16 rounded-xl border-2 transition-all overflow-hidden ${
                        backgroundImage === wallpaper.path
                          ? 'border-white shadow-lg scale-105'
                          : 'border-transparent hover:border-white/50'
                      }`}
                      title={wallpaper.name}
                      style={{
                        backgroundImage: `url(${wallpaper.path})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Custom Image Upload */}
              <label className="block">
                <span className="text-sm text-gray-300 mb-2 block">Upload Custom Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-pink-500 file:to-purple-600 file:text-white hover:file:from-pink-600 hover:file:to-purple-700 file:transition-all"
                />
              </label>
            </div>

            {/* Text Settings */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-3">Text Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-300 block mb-2">Font Family</label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full bg-white/10 text-white rounded-xl p-3 border border-white/20 focus:border-pink-500 focus:outline-none"
                  >
                    {fontOptions.map((font) => (
                      <option key={font.value} value={font.value} className="bg-gray-800">
                        {font.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-300 block mb-2">Font Color</label>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {fontColors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setFontColor(color.value)}
                        className={`h-10 rounded-xl border-2 transition-all ${
                          fontColor === color.value
                            ? 'border-white shadow-lg scale-105'
                            : 'border-transparent hover:border-white/50'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={fontColor}
                    onChange={(e) => setFontColor(e.target.value)}
                    className="w-full h-10 rounded-xl border border-white/20 bg-transparent cursor-pointer"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-300 block mb-2">Text Align</label>
                  <div className="flex space-x-2">
                    {(['left', 'center', 'right'] as const).map((align) => (
                      <button
                        key={align}
                        onClick={() => setTextAlign(align)}
                        className={`px-4 py-2 rounded-xl text-sm transition-all ${
                          textAlign === align
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                      >
                        {align}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
