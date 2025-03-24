// app/styles/theme.js
import { DefaultTheme } from 'react-native-paper';
import { Platform } from 'react-native';

// Kleurenpalet voor Amwittools 
const colors = {
  // Primaire kleuren
  primary: '#0061A7', // Amwittools blauw
  primaryDark: '#004D85', // Donkerder blauw voor hover/actieve staten
  primaryLight: '#E5F1FA', // Lichtblauw voor achtergronden, highlights

  // Secundaire kleuren
  secondary: '#FF6B00', // Oranje als contrastkleur
  secondaryDark: '#D15700', // Donker oranje
  secondaryLight: '#FFE4CC', // Licht oranje voor achtergronden

  // Neutrale kleuren
  neutral100: '#FFFFFF', // Wit
  neutral200: '#F5F7FA', // Heel licht grijs voor achtergronden
  neutral300: '#E4E9F0', // Licht grijs voor borders, dividers
  neutral400: '#BFC7D0', // Grijs voor inactieve elementen
  neutral500: '#8C99A8', // Medium grijs voor secundaire tekst
  neutral600: '#5E6978', // Donker grijs voor belangrijke secundaire tekst
  neutral700: '#394452', // Zeer donker grijs voor tekst
  neutral800: '#1A202C', // Bijna zwart voor headers en belangrijke tekst

  // Functionele kleuren
  success: '#00875A', // Groen voor success meldingen
  error: '#DE350B',   // Rood voor error meldingen
  warning: '#FAAD14', // Geel voor waarschuwingen
  info: '#0065FF',    // Blauw voor informatie
  
  // Categorie kleuren (voor visuele onderscheiding)
  categories: {
    electric: '#3182CE', // Elektrisch gereedschap
    hand: '#38A169',     // Handgereedschap
    measure: '#805AD5',  // Meetinstrumenten
    fixation: '#DD6B20', // Bevestigingsmaterialen
    accessories: '#D69E2E', // Accessoires
    protection: '#E53E3E', // Persoonlijke beschermingsmiddelen
  }
};

// Typografie
const typography = {
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
};

// Spacing voor consistente margins en padding
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 56,
};

// Border radiussen voor verschillende componenten
const borderRadius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999, // Voor circulaire elementen
};

// Schaduw stijlen voor verschillende elevaties
const shadow = {
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

// Responsive breakpoints
const breakpoints = {
  smallPhone: 360,
  phone: 480,
  tablet: 768,
};

// React Native Paper thema
const paperTheme = {
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

// Gecombineerd thema
const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadow,
  breakpoints,
  paperTheme,
};

export default theme;