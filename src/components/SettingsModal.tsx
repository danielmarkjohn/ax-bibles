
import React from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    fontSize: number;
    fontFamily: string;
    lineHeight: number;
    theme: 'light' | 'dark' | 'sepia';
    showVerseNumbers: boolean;
    columnLayout: boolean;
    fullscreen: boolean;
  };
  onSettingsChange: (settings: any) => void;
}

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

export default function SettingsModal({ isOpen, onClose, settings, onSettingsChange }: SettingsModalProps) {
  if (!isOpen) return null;

  const updateSetting = (key: string, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const getModalTheme = () => {
    switch (settings.theme) {
      case 'dark':
        return 'bg-gray-800 text-gray-100';
      case 'sepia':
        return 'bg-amber-50 text-amber-900';
      default:
        return 'bg-white text-gray-900';
    }
  };

  const getInputTheme = () => {
    switch (settings.theme) {
      case 'dark':
        return 'bg-gray-700 border-gray-600 text-gray-100';
      case 'sepia':
        return 'bg-amber-100 border-amber-300 text-amber-900';
      default:
        return 'bg-white border-gray-300 text-gray-900';
    }
  };

  const getButtonTheme = () => {
    switch (settings.theme) {
      case 'dark':
        return 'text-gray-400 hover:text-gray-200';
      case 'sepia':
        return 'text-amber-600 hover:text-amber-800';
      default:
        return 'text-gray-500 hover:text-gray-700';
    }
  };

  const getThemeButtonStyle = (themeType: string) => {
    const isSelected = settings.theme === themeType;
    
    switch (settings.theme) {
      case 'dark':
        return isSelected 
          ? 'border-blue-400 bg-blue-900/30 text-gray-100' 
          : 'border-gray-600 hover:border-gray-500 text-gray-300';
      case 'sepia':
        return isSelected 
          ? 'border-amber-500 bg-amber-100 text-amber-900' 
          : 'border-amber-300 hover:border-amber-400 text-amber-700';
      default:
        return isSelected 
          ? 'border-blue-500 bg-blue-50 text-gray-900' 
          : 'border-gray-300 hover:border-gray-400 text-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${getModalTheme()} rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Reading Settings</h2>
          <button onClick={onClose} className={getButtonTheme()}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Theme */}
          <div>
            <label className="block text-sm font-medium mb-3">Theme</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => updateSetting('theme', 'light')}
                className={`p-4 rounded-lg border-2 flex flex-col items-center space-y-2 transition-all ${getThemeButtonStyle('light')}`}
              >
                <div className="w-8 h-8 bg-white border border-gray-300 rounded"></div>
                <span className="text-sm font-medium">Light</span>
              </button>
              
              <button
                onClick={() => updateSetting('theme', 'dark')}
                className={`p-4 rounded-lg border-2 flex flex-col items-center space-y-2 transition-all ${getThemeButtonStyle('dark')}`}
              >
                <div className="w-8 h-8 bg-gray-800 rounded"></div>
                <span className="text-sm font-medium">Dark</span>
              </button>
              
              <button
                onClick={() => updateSetting('theme', 'sepia')}
                className={`p-4 rounded-lg border-2 flex flex-col items-center space-y-2 transition-all ${getThemeButtonStyle('sepia')}`}
              >
                <div className="w-8 h-8 bg-amber-100 border border-amber-300 rounded"></div>
                <span className="text-sm font-medium">Sepia</span>
              </button>
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Font Size: {settings.fontSize}px
            </label>
            <input
              type="range"
              min="12"
              max="32"
              value={settings.fontSize}
              onChange={(e) => updateSetting('fontSize', parseInt(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium mb-2">Font Family</label>
            <select
              value={settings.fontFamily}
              onChange={(e) => updateSetting('fontFamily', e.target.value)}
              className={`w-full p-2 rounded-md ${getInputTheme()}`}
            >
              {fontOptions.map((font) => (
                <option key={font.value} value={font.value} style={{ fontFamily: font.family }}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>

          {/* Line Height */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Line Height: {settings.lineHeight}
            </label>
            <input
              type="range"
              min="1.2"
              max="2.5"
              step="0.1"
              value={settings.lineHeight}
              onChange={(e) => updateSetting('lineHeight', parseFloat(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-sm font-medium">Show Verse Numbers</span>
              <input
                type="checkbox"
                checked={settings.showVerseNumbers}
                onChange={(e) => updateSetting('showVerseNumbers', e.target.checked)}
                className="rounded accent-blue-500"
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm font-medium">Column Layout</span>
              <input
                type="checkbox"
                checked={settings.columnLayout}
                onChange={(e) => updateSetting('columnLayout', e.target.checked)}
                className="rounded accent-blue-500"
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="text-sm font-medium">Fullscreen Mode</span>
              <input
                type="checkbox"
                checked={settings.fullscreen}
                onChange={(e) => updateSetting('fullscreen', e.target.checked)}
                className="rounded accent-blue-500"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
