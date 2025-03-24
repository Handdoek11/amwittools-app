import { DefaultTheme } from 'react-native-paper';

// Amwittools brand colors
export const colors = {
  primary: '#1d2362',     // Dark blue (primary brand color)
  secondary: '#d6d7d6',   // Light gray (secondary brand color)
  accent: '#878787',      // Medium gray (accent color)
  background: '#FFFFFF',  // White (background)
  surface: '#F5F5F5',     // Light gray (cards, etc.)
  text: '#333333',        // Dark gray (text)
  textSecondary: '#878787', // Medium gray (secondary text - using accent color)
  border: '#d6d7d6',      // Light gray (borders - using secondary color)
  error: '#D32F2F',       // Red (error messages)
  success: '#388E3C',     // Green (success messages)
  placeholder: '#9E9E9E',  // Gray (placeholder text)
};

// Typography
export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
  fontWeights: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// React Native Paper theme
export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.accent,
    background: colors.background,
    surface: colors.surface,
    text: colors.text,
    placeholder: colors.placeholder,
    error: colors.error,
  },
  roundness: 4,
};