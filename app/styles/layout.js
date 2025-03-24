// app/styles/layout.js
import { StyleSheet } from 'react-native';
import theme from '../themes/theme';

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
});