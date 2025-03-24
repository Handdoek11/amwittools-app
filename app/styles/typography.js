// app/styles/typography.js
import { StyleSheet } from 'react-native';
import theme from './theme';

const { typography, colors } = theme;

export const textStyles = StyleSheet.create({
  // Headers
  displayLarge: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.giant,
    lineHeight: typography.fontSize.giant * 1.2,
    color: colors.neutral800,
  },
  displayMedium: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.display,
    lineHeight: typography.fontSize.display * 1.2,
    color: colors.neutral800,
  },
  displaySmall: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxxl,
    lineHeight: typography.fontSize.xxxl * 1.2,
    color: colors.neutral800,
  },
  
  // Headers
  headingLarge: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxl,
    lineHeight: typography.fontSize.xxl * 1.3,
    color: colors.neutral800,
  },
  headingMedium: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    lineHeight: typography.fontSize.xl * 1.3,
    color: colors.neutral800,
  },
  headingSmall: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    lineHeight: typography.fontSize.lg * 1.3,
    color: colors.neutral800,
  },
  
  // Body text
  bodyLarge: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.lg,
    lineHeight: typography.fontSize.lg * 1.5,
    color: colors.neutral700,
  },
  bodyMedium: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    lineHeight: typography.fontSize.md * 1.5,
    color: colors.neutral700,
  },
  bodySmall: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.sm * 1.5,
    color: colors.neutral700,
  },
  
  // Labels
  labelLarge: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    lineHeight: typography.fontSize.md * 1.2,
    letterSpacing: 0.5,
    color: colors.neutral600,
  },
  labelMedium: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.sm * 1.2,
    letterSpacing: 0.5,
    color: colors.neutral600,
  },
  labelSmall: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.fontSize.xs * 1.2,
    letterSpacing: 0.5,
    color: colors.neutral600,
  },
  
  // Special cases
  button: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    lineHeight: typography.fontSize.md * 1.25,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  caption: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.fontSize.xs * 1.5,
    color: colors.neutral500,
  },
  price: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.primary,
  },
  discount: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.md,
    color: colors.secondary,
  },
});

// app/styles/layout.js
import { StyleSheet } from 'react-native';
import theme from './theme';

const { spacing, colors, borderRadius, shadow } = theme;

export const layoutStyles = StyleSheet.create({
  // Container styles
  screenContainer: {
    flex: 1,
    backgroundColor: colors.neutral200,
  },
  contentContainer: {
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.neutral100,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow.sm,
  },
  
  // Flex helpers
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowAround: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Spacing helpers
  marginBottom: {
    marginBottom: spacing.md,
  },
  marginTop: {
    marginTop: spacing.md,
  },
  marginVertical: {
    marginVertical: spacing.md,
  },
  marginHorizontal: {
    marginHorizontal: spacing.md,
  },
  paddingBottom: {
    paddingBottom: spacing.md,
  },
  paddingTop: {
    paddingTop: spacing.md,
  },
  paddingVertical: {
    paddingVertical: spacing.md,
  },
  paddingHorizontal: {
    paddingHorizontal: spacing.md,
  },
  
  // Shadow levels
  shadowSmall: {
    ...shadow.sm,
  },
  shadowMedium: {
    ...shadow.md,
  },
  shadowLarge: {
    ...shadow.lg,
  },
  
  // Dividers
  divider: {
    height: 1,
    backgroundColor: colors.neutral300,
    marginVertical: spacing.md,
  },
  
  // List items
  listItem: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
  },
});

// app/styles/buttons.js
import { StyleSheet } from 'react-native';
import theme from './theme';

const { colors, spacing, borderRadius, typography } = theme;

export const buttonStyles = StyleSheet.create({
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
  
  // Icon button
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Disabled states
  disabledButton: {
    backgroundColor: colors.neutral300,
  },
  disabledButtonText: {
    color: colors.neutral500,
  },
  
  // Button sizes
  smallButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    minHeight: 36,
  },
  smallButtonText: {
    fontSize: typography.fontSize.sm,
  },
  
  largeButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 56,
  },
  largeButtonText: {
    fontSize: typography.fontSize.lg,
  },
});

// Exporteer alle stijlen vanuit één index bestand
// app/styles/index.js
import theme from './theme';
import { textStyles } from './typography';
import { layoutStyles } from './layout';
import { buttonStyles } from './buttons';

export {
  theme,
  textStyles,
  layoutStyles,
  buttonStyles,
};