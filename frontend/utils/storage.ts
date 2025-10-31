const RECENT_SEARCHES_KEY = 'tunestream_recent_searches';
const DARK_MODE_KEY = 'tunestream_dark_mode';
const MAX_RECENT_SEARCHES = 10;

export const addRecentSearch = (query: string): void => {
  if (typeof window === 'undefined') return;

  try {
    const searches = getRecentSearches();
    const filtered = searches.filter((s) => s !== query);
    const updated = [query, ...filtered].slice(0, MAX_RECENT_SEARCHES);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to add recent search:', error);
  }
};

export const getRecentSearches = (): string[] => {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(RECENT_SEARCHES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to get recent searches:', error);
    return [];
  }
};

export const clearRecentSearches = (): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch (error) {
    console.error('Failed to clear recent searches:', error);
  }
};

export const getDarkMode = (): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    const data = localStorage.getItem(DARK_MODE_KEY);
    return data ? JSON.parse(data) : false;
  } catch (error) {
    console.error('Failed to get dark mode preference:', error);
    return false;
  }
};

export const setDarkMode = (isDark: boolean): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify(isDark));
  } catch (error) {
    console.error('Failed to set dark mode preference:', error);
  }
};
