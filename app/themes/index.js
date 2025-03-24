// app/theme/index.js
import { DefaultTheme } from 'react-native-paper';
import { Platform } from 'react-native';

// Amwittools brand colors
export const colors = {
  // Primary colors
  primary: '#1d2362',     // Dark blue (primary brand color)
  primaryDark: '#141a46', // Darker blue for hover/active states
  primaryLight: '#e8e8f0', // Light blue for backgrounds/highlights

  // Secondary colors
  secondary: '#d6d7d6',   // Light gray
  secondaryDark: '#a8a9a8', // Darker gray
  secondaryLight: '#f5f5f5', // Lighter gray

  // Neutral colors
  neutral100: '#FFFFFF', // White
  neutral200: '#F5F7FA', // Very light gray for backgrounds
  neutral300: '#E4E9F0', // Light gray for borders, dividers
  neutral400: '#BFC7D0', // Gray for inactive elements
  neutral500: '#8C99A8', // Medium gray for secondary text
  neutral600: '#5E6978', // Dark gray for important secondary text
  neutral700: '#394452', // Very dark gray for text
  neutral800: '#1A202C', // Nearly black for headers and important text

  // Functional colors
  success: '#388E3C', // Green for success messages
  error: '#D32F2F',   // Red for error messages
  warning: '#FAAD14', // Yellow for warnings
  info: '#0065FF',    // Blue for information
  
  // Category colors (for visual distinction)
  categories: {
    electric: '#3182CE', // Electric tools
    hand: '#38A169',     // Hand tools
    measure: '#805AD5',  // Measuring instruments
    fixation: '#DD6B20', // Fixation materials
    accessories: '#D69E2E', // Accessories
    protection: '#E53E3E', // Personal protection equipment
  },

  // Legacy color mapping for backwards compatibility
  text: '#1A202C',
  textSecondary: '#5E6978',
  border: '#E4E9F0',
  background: '#F5F7FA',
  surface: '#FFFFFF',
  placeholder: '#8C99A8',
};

// Typography
export const typography = {
  fontFamily: {
    regular: Platform.OS === 'ios' ? 'System' : 'Roboto',
    medium: Platform.OS === 'ios' ? 'System' : 'Roboto-Medium',
    light: Platform.OS === 'ios' ? 'System' : 'Roboto-Light',
    bold: Platform.OS === 'ios' ? 'System' : 'Roboto-Bold',
  },
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    display: 28,
    giant: 32,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    loose: 1.8,
  },
};

// Spacing for consistent margins and padding
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 56,
};

// Border radiuses for different components
export const borderRadius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999, // For circular elements
};

// Shadow styles for different elevations
export const shadow = {
  sm: {
    shadowColor: colors.neutral800,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: colors.neutral800,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.20,
    shadowRadius: 3.0,
    elevation: 3,
  },
  lg: {
    shadowColor: colors.neutral800,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 5.0,
    elevation: 6,
  },
  xl: {
    shadowColor: colors.neutral800,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 8.0,
    elevation: 10,
  },
};

// React Native Paper theme
export const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.secondary,
    background: colors.neutral200,
    surface: colors.neutral100,
    text: colors.neutral800,
    error: colors.error,
    disabled: colors.neutral400,
    placeholder: colors.neutral500,
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  roundness: borderRadius.md,
  fonts: {
    regular: {
      fontFamily: typography.fontFamily.regular,
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: typography.fontFamily.medium,
      fontWeight: '500',
    },
    light: {
      fontFamily: typography.fontFamily.light,
      fontWeight: '300',
    },
    thin: {
      fontFamily: typography.fontFamily.light,
      fontWeight: '100',
    },
  },
};

// Combined theme export
const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadow,
  paperTheme,
};

export default theme;