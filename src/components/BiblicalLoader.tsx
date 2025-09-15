import React from 'react';

interface BiblicalLoaderProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'verse';
  theme?: 'light' | 'dark' | 'sepia';
}

export default function BiblicalLoader({ 
  message = "Loading...", 
  size = 'md',
  variant = 'default',
  theme = 'dark'
}: BiblicalLoaderProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16', 
    lg: 'h-24 w-24'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  };

  const getThemeColors = () => {
    switch (theme) {
      case 'light':
        return {
          border: 'border-gray-300',
          borderActive: 'border-t-blue-600',
          borderSecondary: 'border-t-blue-500',
          text: 'text-gray-700',
          textAccent: 'text-blue-600',
          icon: 'text-blue-600',
          dots: 'bg-blue-600'
        };
      case 'sepia':
        return {
          border: 'border-amber-300',
          borderActive: 'border-t-amber-700',
          borderSecondary: 'border-t-amber-600',
          text: 'text-amber-800',
          textAccent: 'text-amber-700',
          icon: 'text-amber-700',
          dots: 'bg-amber-700'
        };
      default: // dark
        return {
          border: 'border-gray-700',
          borderActive: 'border-t-blue-500',
          borderSecondary: 'border-t-blue-400',
          text: 'text-gray-100',
          textAccent: 'text-emerald-400',
          icon: 'text-blue-400',
          dots: 'bg-blue-500'
        };
    }
  };

  const colors = getThemeColors();

  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center space-x-2">
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 ${colors.border} ${colors.borderActive}`}></div>
        <span className={`${textSizes[size]} font-medium ${colors.text}`}>{message}</span>
      </div>
    );
  }

  if (variant === 'verse') {
    return (
      <div className="flex items-center justify-center space-x-3">
        <div className="relative">
          <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 ${colors.border} border-t-emerald-500`}></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-400 animate-pulse"></div>
        </div>
        <div className="text-center">
          <span className={`${textSizes[size]} font-medium ${colors.textAccent}`}>{message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 ${colors.border} ${colors.borderActive}`}></div>
        
        {/* Inner pulsing ring */}
        <div className={`absolute inset-0 rounded-full border-4 border-transparent ${colors.borderSecondary} animate-pulse`}></div>
        
        {/* Biblical icon in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className={`w-6 h-6 ${colors.icon} animate-pulse`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
      </div>
      
      <div className="text-center">
        <span className={`${textSizes[size]} font-medium ${colors.text}`}>{message}</span>
        <div className="flex items-center justify-center mt-2 space-x-1">
          <div className={`w-2 h-2 ${colors.dots} rounded-full animate-bounce`}></div>
          <div className={`w-2 h-2 ${colors.dots} rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
          <div className={`w-2 h-2 ${colors.dots} rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}
