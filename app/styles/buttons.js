// app/styles/buttons.js
import { StyleSheet } from 'react-native';
import theme from '../themes/theme';

const { colors, spacing, borderRadius, typography } = theme;

const buttonStyles = StyleSheet.create({
  // Primary button
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primaryButtonText: {
    color: colors.neutral100,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    textAlign: 'center',
  },
  
  // Secondary button
  secondaryButton: {
    backgroundColor: colors.neutral100,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    textAlign: 'center',
  },
  
  // Tertiary button (text only)
  tertiaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tertiaryButtonText: {
    color: colors.primary,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    textAlign: 'center',
  },
  
  // Disabled states
  disabledButton: {
    backgroundColor: colors.neutral300,
  },
  disabledButtonText: {
    color: colors.neutral500,
  },
});

export default buttonStyles;