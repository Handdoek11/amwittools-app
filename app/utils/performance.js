// app/utils/performance.js

/**
 * Performance optimization utilities for React Native
 */

import React, { useCallback, useRef, useEffect } from 'react';
import { InteractionManager } from 'react-native';

/**
 * Memoizes a component to prevent unnecessary re-renders
 * 
 * @param {React.Component} Component - The component to memoize
 * @param {Function} propsAreEqual - Optional custom comparison function
 * @returns {React.Component} Memoized component
 */
export const memoizeComponent = (Component, propsAreEqual = null) => {
  return React.memo(Component, propsAreEqual);
};

/**
 * Hook to delay heavy operations until after animations are complete
 * 
 * @param {Function} callback - Function to execute after interactions
 * @param {Array} deps - Dependency array for useCallback
 * @returns {Function} Function that will execute after interactions
 */
export const useAfterInteractions = (callback, deps = []) => {
  const memoizedCallback = useCallback((...args) => {
    InteractionManager.runAfterInteractions(() => {
      callback(...args);
    });
  }, deps);
  
  return memoizedCallback;
};

/**
 * Hook for efficient interval management
 * 
 * @param {Function} callback - Function to call on each interval
 * @param {number} delay - Interval delay in milliseconds
 */
export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

/**
 * Create an optimized list item renderer for FlatList
 * 
 * @param {Function} renderItem - The render function for items
 * @param {string} keyExtractor - Key for each item or function to extract key
 * @returns {Object} Optimized props for FlatList
 */
export const createOptimizedListProps = (renderItem, keyExtractor) => {
  // Create a memoized render item function
  const MemoizedItem = React.memo(({ item, index, separators }) => {
    return renderItem({ item, index, separators });
  });
  
  // Create a wrapper around the memoized item
  const optimizedRenderItem = ({ item, index, separators }) => {
    return <MemoizedItem item={item} index={index} separators={separators} />;
  };
  
  return {
    renderItem: optimizedRenderItem,
    keyExtractor: typeof keyExtractor === 'string' 
      ? (item) => item[keyExtractor].toString()
      : keyExtractor,
    removeClippedSubviews: true,
    maxToRenderPerBatch: 10,
    updateCellsBatchingPeriod: 50,
    windowSize: 10,
  };
};

/**
 * Image loading optimization helper
 * 
 * @param {string} uri - Image URI
 * @param {Object} options - Options for image loading
 * @returns {Object} Optimized image props
 */
export const optimizeImageLoading = (uri, options = {}) => {
  const {
    width,
    height,
    priority = 'normal', // 'low', 'normal', or 'high'
    cachePolicy = 'memory-disk', // 'none', 'memory', 'disk', 'memory-disk'
  } = options;
  
  return {
    source: uri,
    ...(width && height ? { style: { width, height } } : {}),
    contentFit: options.contentFit || 'contain',
    transition: options.transition || 300,
    priority,
    cachePolicy,
  };
};

export default {
  memoizeComponent,
  useAfterInteractions,
  useInterval,
  createOptimizedListProps,
  optimizeImageLoading
};