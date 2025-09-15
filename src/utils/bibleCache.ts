import bibleStructure from '../config/bible_structure.json';

interface BibleStructure {
  [bookId: string]: {
    totalChapters: number;
    chapters: {
      [chapterNum: string]: number;
    };
  };
}

class BibleCache {
  private static instance: BibleCache;
  private structure: BibleStructure;
  private cache: Map<string, any> = new Map();

  private constructor() {
    this.structure = bibleStructure as BibleStructure;
    this.loadFromLocalStorage();
  }

  static getInstance(): BibleCache {
    if (!BibleCache.instance) {
      BibleCache.instance = new BibleCache();
    }
    return BibleCache.instance;
  }

  private loadFromLocalStorage() {
    try {
      const cached = localStorage.getItem('bible_cache');
      if (cached) {
        const data = JSON.parse(cached);
        this.cache = new Map(data);
      }
    } catch (error) {
      console.error('Failed to load cache from localStorage:', error);
    }
  }

  private saveToLocalStorage() {
    try {
      const data = Array.from(this.cache.entries());
      localStorage.setItem('bible_cache', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save cache to localStorage:', error);
    }
  }

  getStructure(): BibleStructure {
    return this.structure;
  }

  getBookChapters(bookIndex: number): number[] {
    const bookData = this.structure[bookIndex.toString()];
    if (!bookData || bookData.totalChapters === 0) {
      return [];
    }
    return Array.from({ length: bookData.totalChapters }, (_, i) => i + 1);
  }

  getVerseCount(bookIndex: number, chapter: number): number {
    const bookData = this.structure[bookIndex.toString()];
    if (!bookData || !bookData.chapters[chapter.toString()]) {
      return 0;
    }
    return bookData.chapters[chapter.toString()];
  }

  set(key: string, value: any) {
    this.cache.set(key, value);
    this.saveToLocalStorage();
  }

  get(key: string) {
    return this.cache.get(key);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  clear() {
    this.cache.clear();
    localStorage.removeItem('bible_cache');
  }
}

export default BibleCache;