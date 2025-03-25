// app/styles/index.js
import theme from '../themes/theme';
import { StyleSheet } from 'react-native';

// Import specific style modules
import { textStyles } from './typography';
import { layoutStyles } from './layout';
import { buttonStyles } from './buttons';

// Export everything for convenient import
export {
  theme,
  textStyles,
  layoutStyles,
  buttonStyles,
};