import { useState, useEffect } from 'react';
import { Adventure } from '../api';

const STORAGE_KEY = 'sq_recently_viewed';
const MAX_ITEMS = 5;

export function useRecentlyViewed() {
  const [recentAdventures, setRecentAdventures] = useState<Adventure[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecentAdventures(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse recently viewed', e);
      }
    }
  }, []);

  const addViewed = (adventure: Adventure) => {
    setRecentAdventures(prev => {
      // Remove if it already exists
      const filtered = prev.filter(a => a.id !== adventure.id);
      // Add to front and slice to MAX_ITEMS
      const updated = [adventure, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { recentAdventures, addViewed };
}
