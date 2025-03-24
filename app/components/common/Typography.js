// app/components/common/Typography.js
import React from 'react';
import { Text } from 'react-native';
import { textStyles } from '../../styles';

export const DisplayLarge = ({ children, style, ...props }) => (
  <Text style={[textStyles.displayLarge, style]} {...props}>
    {children}
  </Text>
);

export const DisplayMedium = ({ children, style, ...props }) => (
  <Text style={[textStyles.displayMedium, style]} {...props}>
    {children}
  </Text>
);

export const DisplaySmall = ({ children, style, ...props }) => (
  <Text style={[textStyles.displaySmall, style]} {...props}>
    {children}
  </Text>
);

export const HeadingLarge = ({ children, style, ...props }) => (
  <Text style={[textStyles.headingLarge, style]} {...props}>
    {children}
  </Text>
);

export const HeadingMedium = ({ children, style, ...props }) => (
  <Text style={[textStyles.headingMedium, style]} {...props}>
    {children}
  </Text>
);

export const HeadingSmall = ({ children, style, ...props }) => (
  <Text style={[textStyles.headingSmall, style]} {...props}>
    {children}
  </Text>
);

export const BodyLarge = ({ children, style, ...props }) => (
  <Text style={[textStyles.bodyLarge, style]} {...props}>
    {children}
  </Text>
);

export const BodyMedium = ({ children, style, ...props }) => (
  <Text style={[textStyles.bodyMedium, style]} {...props}>
    {children}
  </Text>
);

export const BodySmall = ({ children, style, ...props }) => (
  <Text style={[textStyles.bodySmall, style]} {...props}>
    {children}
  </Text>
);

export const Label = ({ children, style, size = 'medium', ...props }) => {
  let labelStyle;
  switch (size) {
    case 'large':
      labelStyle = textStyles.labelLarge;
      break;
    case 'small':
      labelStyle = textStyles.labelSmall;
      break;
    case 'medium':
    default:
      labelStyle = textStyles.labelMedium;
      break;
  }
  
  return (
    <Text style={[labelStyle, style]} {...props}>
      {children}
    </Text>
  );
};

export const Caption = ({ children, style, ...props }) => (
  <Text style={[textStyles.caption, style]} {...props}>
    {children}
  </Text>
);

export const Price = ({ children, style, ...props }) => (
  <Text style={[textStyles.price, style]} {...props}>
    {children}
  </Text>
);

export const Discount = ({ children, style, ...props }) => (
  <Text style={[textStyles.discount, style]} {...props}>
    {children}
  </Text>
);