import React, { useState } from 'react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  searchResults: any[];
  loading: boolean;
}

export default function SearchModal({ isOpen, onClose, onSearch, searchResults, loading }: SearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Search Scripture</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for verses, words, or phrases..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3 text-gray-600">Searching...</span>
            </div>
          ) : searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="text-sm text-gray-500 mb-2">
                  {result.book} {result.chapter}:{result.verse}
                </div>
                <p className="text-gray-800">{result.text}</p>
              </div>
            ))
          ) : query && !loading ? (
            <div className="text-center py-8 text-gray-500">
              No results found for "{query}"
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Enter a search term to find verses
            </div>
          )}
        </div>
      </div>
    </div>
  );
}