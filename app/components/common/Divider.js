// app/components/common/Divider.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../styles';

const Divider = ({ 
  style, 
  color = theme.colors.neutral300, 
  height = 1 
}) => {
  return (
    <View 
      style={[
        styles.divider, 
        { 
          backgroundColor: color, 
          height: height 
        }, 
        style
      ]} 
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    marginVertical: theme.spacing.sm,
  },
});

export default Divider;