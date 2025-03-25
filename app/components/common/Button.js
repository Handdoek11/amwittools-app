// app/components/common/Badge.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../styles';
import { BodySmall } from './Typography';

const Badge = ({ label, color = theme.colors.primary, textColor, style }) => {
  return (
    <View style={[styles.container, { backgroundColor: color }, style]}>
      <BodySmall style={[styles.text, { color: textColor || theme.colors.neutral100 }]}>
        {label}
      </BodySmall>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.medium,
  },
});

export default Badge;
