import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { fetchTranslations, fetchVerses, Translation, Verse } from '../api/bibleClient';
import { BIBLE_BOOKS } from '../config/bibleConfig';
import BiblicalLoader from './BiblicalLoader';

interface VerseWallpaperCreatorProps {
  onBack: () => void;
}

const defaultVerses = [
  {
    verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.",
    reference: "Jeremiah 29:11"
  },
  {
    verse: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6"
  },
  {
    verse: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reference: "Romans 8:28"
  }
];

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
  const [selectedVerse, setSelectedVerse] = useState(defaultVerses[0]);
  const [customVerse, setCustomVerse] = useState('');
  const [customReference, setCustomReference] = useState('');
  const [selectedBackground, setSelectedBackground] = useState(backgroundColors[0]);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState(30);
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
  const [useApiVerse, setUseApiVerse] = useState(false);

  useEffect(() => {
    loadTranslations();
  }, []);

  const loadTranslations = async () => {
    try {
      const data = await fetchTranslations();
      setTranslations(data);
      if (data.length > 0) {
        setSelectedTranslation(data[0].abbreviation);
      }
    } catch (error) {
      console.error('Failed to load translations:', error);
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
    if (wallpaperRef.current) {
      // Create a temporary full-size element for rendering
      const tempElement = wallpaperRef.current.cloneNode(true) as HTMLElement;
      tempElement.style.width = '1920px';
      tempElement.style.height = '1080px';
      tempElement.style.position = 'absolute';
      tempElement.style.left = '-9999px';
      tempElement.style.top = '-9999px';
      
      // Scale up font sizes for full resolution
      const blockquote = tempElement.querySelector('blockquote') as HTMLElement;
      const cite = tempElement.querySelector('cite') as HTMLElement;
      
      if (blockquote) {
        blockquote.style.fontSize = `${fontSize}px`;
      }
      if (cite) {
        cite.style.fontSize = `${fontSize * 0.75}px`;
      }
      
      document.body.appendChild(tempElement);
      
      const canvas = await html2canvas(tempElement, {
        width: 1920,
        height: 1080,
        scale: 1,
        useCORS: true,
        allowTaint: true
      });
      
      document.body.removeChild(tempElement);
      
      const link = document.createElement('a');
      link.download = 'verse-wallpaper-1920x1080.png';
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
          const file = new File([blob], 'verse-wallpaper.png', { type: 'image/png' });
          await navigator.share({
            files: [file],
            title: 'Bible Verse Wallpaper',
            text: `${getCurrentVerse().reference} - ${getCurrentVerse().verse}`
          });
        }
      });
    }
  };

  const getCurrentVerse = () => {
    if (useApiVerse && verses.length > 0) {
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
    return selectedVerse;
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
            onClick={downloadWallpaper}
            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 backdrop-blur-sm"
            title="Download FHD Wallpaper"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Preview at Top */}
        <div className="p-4 flex justify-center bg-white/5 backdrop-blur-sm border-b border-white/10">
          <div className="relative">
            <div
              ref={wallpaperRef}
              className={`w-80 h-45 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col justify-center items-center p-6 ${
                backgroundImage ? '' : `bg-gradient-to-br ${selectedBackground.gradient}`
              }`}
              style={{
                aspectRatio: '16/9',
                ...(backgroundImage ? {
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                } : {})
              }}
            >
              {backgroundImage && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
              )}
              
              <div className={`relative z-10 text-${textAlign} px-4 max-w-full`} style={{ fontFamily: getCurrentFont() }}>
                <blockquote 
                  className="font-medium leading-relaxed mb-4 drop-shadow-lg"
                  style={{ 
                    fontSize: `${fontSize * 0.4}px`,
                    color: fontColor
                  }}
                >
                  "{getCurrentVerse().verse}"
                </blockquote>
                <cite 
                  className="font-semibold drop-shadow-lg"
                  style={{ 
                    fontSize: `${fontSize * 0.3}px`,
                    color: fontColor,
                    opacity: 0.9
                  }}
                >
                  {getCurrentVerse().reference}
                </cite>
              </div>
            </div>
            
          </div>
        </div>

        {/* Controls Panel */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Verse Source Toggle */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-3">Verse Source</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setUseApiVerse(false)}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    !useApiVerse
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Default Verses
                </button>
                <button
                  onClick={() => setUseApiVerse(true)}
                  className={`px-4 py-2 rounded-xl transition-all ${
                    useApiVerse
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Choose from Bible
                </button>
              </div>
            </div>

            {/* API Verse Selection */}
            {useApiVerse && (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                <h3 className="text-white font-semibold mb-3">Select Verse</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <select
                    value={selectedTranslation}
                    onChange={(e) => setSelectedTranslation(e.target.value)}
                    className="bg-white/10 text-white rounded-xl p-3 border border-white/20 focus:border-pink-500 focus:outline-none"
                  >
                    {translations.map((t) => (
                      <option key={t._id} value={t.abbreviation} className="bg-gray-800">
                        {t.abbreviation}
                      </option>
                    ))}
                  </select>
                  
                  <select
                    value={selectedBook}
                    onChange={(e) => setSelectedBook(e.target.value)}
                    className="bg-white/10 text-white rounded-xl p-3 border border-white/20 focus:border-pink-500 focus:outline-none"
                  >
                    <option value="" className="bg-gray-800">Select Book</option>
                    {BIBLE_BOOKS.map((book) => (
                      <option key={book} value={book} className="bg-gray-800">
                        {book}
                      </option>
                    ))}
                  </select>
                  
                  <input
                    type="number"
                    min="1"
                    value={selectedChapter}
                    onChange={(e) => setSelectedChapter(Number(e.target.value))}
                    placeholder="Chapter"
                    className="bg-white/10 text-white rounded-xl p-3 border border-white/20 focus:border-pink-500 focus:outline-none"
                  />
                  
                  <select
                    value={selectedVerseNum}
                    onChange={(e) => setSelectedVerseNum(Number(e.target.value))}
                    className="bg-white/10 text-white rounded-xl p-3 border border-white/20 focus:border-pink-500 focus:outline-none"
                    disabled={verses.length === 0}
                  >
                    {verses.map((verse) => (
                      <option key={verse._id} value={verse.verse} className="bg-gray-800">
                        Verse {verse.verse}
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
            )}

            {/* Default Verse Selection */}
            {!useApiVerse && (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                <h3 className="text-white font-semibold mb-3">Select Verse</h3>
                <div className="space-y-2">
                  {defaultVerses.map((verse, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedVerse(verse);
                        setCustomVerse('');
                        setCustomReference('');
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all ${
                        selectedVerse === verse && !customVerse
                          ? 'bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-500/50 text-white'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      <div className="text-sm font-medium">{verse.reference}</div>
                      <div className="text-xs opacity-75 line-clamp-2">{verse.verse}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Verse */}
            {!useApiVerse && (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                <h3 className="text-white font-semibold mb-3">Custom Verse</h3>
                <textarea
                  value={customVerse}
                  onChange={(e) => setCustomVerse(e.target.value)}
                  placeholder="Enter your verse..."
                  className="w-full p-3 bg-white/10 text-white rounded-xl resize-none h-24 text-sm border border-white/20 focus:border-pink-500 focus:outline-none"
                />
                <input
                  type="text"
                  value={customReference}
                  onChange={(e) => setCustomReference(e.target.value)}
                  placeholder="Reference (e.g., John 3:16)"
                  className="w-full p-3 bg-white/10 text-white rounded-xl mt-2 text-sm border border-white/20 focus:border-pink-500 focus:outline-none"
                />
              </div>
            )}

            {/* Background Options */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-3">Background</h3>
              <div className="grid grid-cols-4 gap-2 mb-4">
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
              
              <label className="block">
                <span className="text-sm text-gray-300 mb-2 block">Upload Image</span>
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
                  <label className="text-sm text-gray-300 block mb-2">Font Size</label>
                  <input
                    type="range"
                    min="30"
                    max="60"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-xs text-gray-400">{fontSize}px</span>
                </div>

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
