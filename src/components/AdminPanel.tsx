import React, { useState, useEffect } from 'react';

interface DailyVerse {
  verse: string;
  reference: string;
  theme: string;
  devotion: string;
  author: string;
}

interface AdminPanelProps {
  onBack: () => void;
}

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verses, setVerses] = useState<DailyVerse[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newVerse, setNewVerse] = useState<DailyVerse>({
    verse: '',
    reference: '',
    theme: '',
    devotion: '',
    author: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    // Load verses from localStorage (simulating JSON file)
    const savedVerses = localStorage.getItem('dailyVerses');
    if (savedVerses) {
      setVerses(JSON.parse(savedVerses));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin94' && password === 'inhistime2025') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const saveVerses = (updatedVerses: DailyVerse[]) => {
    localStorage.setItem('dailyVerses', JSON.stringify(updatedVerses));
    setVerses(updatedVerses);
  };

  const handleAddVerse = () => {
    if (newVerse.verse && newVerse.reference && newVerse.devotion) {
      const updatedVerses = [...verses, newVerse];
      saveVerses(updatedVerses);
      setNewVerse({ verse: '', reference: '', theme: '', devotion: '', author: '' });
      setShowAddForm(false);
    }
  };

  const handleEditVerse = (index: number) => {
    setEditingIndex(index);
    setNewVerse(verses[index]);
  };

  const handleUpdateVerse = () => {
    if (editingIndex !== null) {
      const updatedVerses = [...verses];
      updatedVerses[editingIndex] = newVerse;
      saveVerses(updatedVerses);
      setEditingIndex(null);
      setNewVerse({ verse: '', reference: '', theme: '', devotion: '', author: '' });
    }
  };

  const handleDeleteVerse = (index: number) => {
    if (confirm('Are you sure you want to delete this verse?')) {
      const updatedVerses = verses.filter((_, i) => i !== index);
      saveVerses(updatedVerses);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100">
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between shadow-2xl">
          <button
            onClick={onBack}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-white font-semibold text-base">Admin Login</span>
          <div className="w-9"></div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Admin Access</h2>
              <p className="text-white/70">Enter credentials to manage daily verses</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100">
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between shadow-2xl">
        <button
          onClick={onBack}
          className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-white font-semibold text-base">Admin Panel</span>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
          title="Logout"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          {/* Add New Verse Button */}
          <div className="mb-6">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg"
            >
              {showAddForm ? 'Cancel' : 'Add New Verse'}
            </button>
          </div>

          {/* Add/Edit Form */}
          {(showAddForm || editingIndex !== null) && (
            <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 mb-6 border border-white/20 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4">
                {editingIndex !== null ? 'Edit Verse' : 'Add New Verse'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Bible Verse</label>
                  <textarea
                    value={newVerse.verse}
                    onChange={(e) => setNewVerse({...newVerse, verse: e.target.value})}
                    className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none h-24 resize-none"
                    placeholder="Enter the Bible verse..."
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Reference</label>
                    <input
                      type="text"
                      value={newVerse.reference}
                      onChange={(e) => setNewVerse({...newVerse, reference: e.target.value})}
                      className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
                      placeholder="e.g., John 3:16"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">Theme</label>
                    <input
                      type="text"
                      value={newVerse.theme}
                      onChange={(e) => setNewVerse({...newVerse, theme: e.target.value})}
                      className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
                      placeholder="e.g., Hope & Faith"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Devotion</label>
                  <textarea
                    value={newVerse.devotion}
                    onChange={(e) => setNewVerse({...newVerse, devotion: e.target.value})}
                    className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none h-32 resize-none"
                    placeholder="Enter the devotional message..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Author</label>
                  <input
                    type="text"
                    value={newVerse.author}
                    onChange={(e) => setNewVerse({...newVerse, author: e.target.value})}
                    className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
                    placeholder="e.g., Pastor John Smith"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={editingIndex !== null ? handleUpdateVerse : handleAddVerse}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg"
                  >
                    {editingIndex !== null ? 'Update Verse' : 'Add Verse'}
                  </button>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingIndex(null);
                      setNewVerse({ verse: '', reference: '', theme: '', devotion: '', author: '' });
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 border border-white/20"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Verses List */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Manage Daily Verses ({verses.length})</h3>
            {verses.map((verse, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-2xl rounded-xl p-4 border border-white/10 shadow-xl">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-lg mb-1">{verse.reference}</h4>
                    <span className="px-2 py-1 bg-white/20 backdrop-blur-xl rounded-full text-white/90 text-xs font-medium">
                      {verse.theme}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditVerse(index)}
                      className="p-2 text-blue-300 hover:text-blue-200 hover:bg-white/10 rounded-lg transition-all duration-300"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteVerse(index)}
                      className="p-2 text-red-300 hover:text-red-200 hover:bg-white/10 rounded-lg transition-all duration-300"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <blockquote className="text-white/80 italic mb-3 text-sm">
                  "{verse.verse}"
                </blockquote>
                <p className="text-white/70 text-sm mb-2 line-clamp-3">
                  {verse.devotion}
                </p>
                <p className="text-blue-300 text-xs">
                  by {verse.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}