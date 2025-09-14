import React from 'react';

interface Bookmark {
  translation: string;
  book: string;
  chapter: number;
  verse: number;
  timestamp: number;
  note?: string;
}

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Bookmark[];
  onBookmarkClick: (bookmark: Bookmark) => void;
  onDeleteBookmark: (index: number) => void;
}

export default function BookmarksModal({ 
  isOpen, 
  onClose, 
  bookmarks, 
  onBookmarkClick, 
  onDeleteBookmark 
}: BookmarksModalProps) {
  if (!isOpen) return null;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Saved</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {bookmarks.length > 0 ? (
            bookmarks.map((bookmark, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div 
                    className="flex-1 cursor-pointer"
                    onClick={() => onBookmarkClick(bookmark)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                      </svg>
                      <span className="font-medium text-primary">
                        {bookmark.book} {bookmark.chapter}:{bookmark.verse}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({bookmark.translation})
                      </span>
                    </div>
                    {bookmark.note && (
                      <p className="text-gray-700 text-sm mb-2">{bookmark.note}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Added on {formatDate(bookmark.timestamp)}
                    </p>
                  </div>
                  <button
                    onClick={() => onDeleteBookmark(index)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
              </svg>
              <p>Nothing Saved yet</p>
              <p className="text-sm">Tap the bookmark icon next to any verse to save it</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}