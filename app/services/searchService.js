// app/services/searchService.js
import { productService } from './productService';

// Cache for recent searches
const searchCache = new Map();
const CACHE_EXPIRY = 10 * 60 * 1000; // 10 minutes in milliseconds

export const searchService = {
  // Advanced search function with caching
  search: async (query) => {
    // Check if we have a recent cache
    const now = Date.now();
    const cacheKey = query.toLowerCase().trim();
    
    if (searchCache.has(cacheKey)) {
      const cachedData = searchCache.get(cacheKey);
      if (now - cachedData.timestamp < CACHE_EXPIRY) {
        return { data: cachedData.data, error: null, fromCache: true };
      }
    }
    
    // No cache found or cache expired, execute new search
    const result = await productService.searchProducts(query);
    
    // If successful, save to cache
    if (result.data && !result.error) {
      searchCache.set(cacheKey, {
        data: result.data,
        timestamp: now
      });
      
      // Remove old cache items if cache gets too large
      if (searchCache.size > 100) {
        const oldestKey = [...searchCache.entries()]
          .sort(([, a], [, b]) => a.timestamp - b.timestamp)[0][0];
        searchCache.delete(oldestKey);
      }
    }
    
    return result;
  },
  
  // Manage search history (local on the device)
  clearSearchCache: () => {
    searchCache.clear();
  }
};