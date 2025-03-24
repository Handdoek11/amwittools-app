// app/styles/buttons.js
import { theme } from './theme';
import { StyleSheet } from 'react-native';

const buttonStyles = StyleSheet.create({
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
  },
  secondaryButton: {
    backgroundColor: theme.colors.neutral200,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
  },
  // Add more button styles as needed
});

export default buttonStyles;