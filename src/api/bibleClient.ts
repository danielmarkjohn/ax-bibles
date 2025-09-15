const API_BASE = 'https://apiv2.axsphere.in';

const headers = {
  'Content-Type': 'application/json',
};

// Types
export interface Translation {
  [x: string]: string | number | readonly string[] | undefined;
  _id: string;
  name: string;
  abbreviation: string;
  collection: string;
}

export interface ChapterInfo {
  chapter: number;
  totalVerses: number;
}

export interface Verse {
  _id: string;
  book_name: string;
  book: number;
  chapter: number;
  verse: number;
  text: string;
}

export interface ApiResponse<T> {
  ok: boolean;
  data: T;
  count?: number;
  totalChapters?: number;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Cache utilities
const CACHE_PREFIX = 'bible_cache_';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

function getCacheKey(endpoint: string): string {
  return `${CACHE_PREFIX}${endpoint.replace(/[^a-zA-Z0-9]/g, '_')}`;
}

function getFromCache<T>(key: string): T | null {
  try {
    const cacheKey = getCacheKey(key);
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return null;
    
    const parsed = JSON.parse(cached);
    if (!parsed.data || !parsed.timestamp) {
      localStorage.removeItem(cacheKey);
      return null;
    }
    
    if (Date.now() - parsed.timestamp > CACHE_DURATION) {
      localStorage.removeItem(cacheKey);
      return null;
    }
    return parsed.data;
  } catch (error) {
    console.warn('Cache read error:', error);
    return null;
  }
}

function setCache<T>(key: string, data: T): void {
  const cacheKey = getCacheKey(key);
  const cacheData = {
    data,
    timestamp: Date.now()
  };
  
  try {
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (error) {
    console.warn('Failed to cache data:', error);
    // Clear some cache if storage is full
    try {
      clearOldCache();
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (retryError) {
      console.warn('Cache retry failed:', retryError);
    }
  }
}

function clearOldCache(): void {
  try {
    const keys = Object.keys(localStorage);
    const cacheKeys = keys.filter(key => key.startsWith(CACHE_PREFIX));
    
    // Sort by timestamp and remove oldest entries
    const cacheEntries = cacheKeys.map(key => {
      try {
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        return { key, timestamp: data.timestamp || 0 };
      } catch {
        return { key, timestamp: 0 };
      }
    }).sort((a, b) => a.timestamp - b.timestamp);
    
    // Remove oldest 25% of cache entries
    const toRemove = Math.ceil(cacheEntries.length * 0.25);
    for (let i = 0; i < toRemove; i++) {
      localStorage.removeItem(cacheEntries[i].key);
    }
  } catch (error) {
    console.warn('Cache cleanup error:', error);
  }
}

// API functions
export async function fetchTranslations(): Promise<Translation[]> {
  const cacheKey = 'translations';
  const cached = getFromCache<Translation[]>(cacheKey);
  if (cached) return cached;

  const response = await fetch(`${API_BASE}/api/ax-tracker/bible?translations=true`, { headers });
  const result: ApiResponse<Translation[]> = await response.json();
  
  if (result.ok) {
    setCache(cacheKey, result.data);
    return result.data;
  }
  throw new Error('Failed to fetch translations');
}

export async function fetchBooks(translation: string): Promise<string[]> {
  const cacheKey = `books_${translation}`;
  const cached = getFromCache<string[]>(cacheKey);
  if (cached) return cached;

  const response = await fetch(`${API_BASE}/api/ax-tracker/bible?translation=${translation}&books=true&module=${translation}`, { headers });
  const result: ApiResponse<string[]> = await response.json();
  
  if (result.ok) {
    setCache(cacheKey, result.data);
    return result.data;
  }
  throw new Error('Failed to fetch books');
}

export async function fetchVerses(translation: string, book: string, chapter: number): Promise<Verse[]> {
  const cacheKey = `verses_${translation}_${book}_${chapter}`;
  const cached = getFromCache<Verse[]>(cacheKey);
  if (cached) return cached;

  const response = await fetch(`${API_BASE}/api/ax-tracker/bible?translation=${translation}&book=${encodeURIComponent(book)}&chapter=${chapter}&limit=200&page=1&module=${translation}`, { headers });
  const result: ApiResponse<Verse[]> = await response.json();
  
  if (result.ok) {
    setCache(cacheKey, result.data);
    return result.data;
  }
  throw new Error('Failed to fetch verses');
}
