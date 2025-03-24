// app/components/common/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { buttonStyles, textStyles, theme } from '../../styles';

const Button = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  ...props
}) => {
  // Bepaal de juiste stijlen op basis van variant en size
  const getButtonStyle = () => {
    let baseStyle;
    
    switch (variant) {
      case 'secondary':
        baseStyle = buttonStyles.secondaryButton;
        break;
      case 'tertiary':
        baseStyle = buttonStyles.tertiaryButton;
        break;
      case 'primary':
      default:
        baseStyle = buttonStyles.primaryButton;
        break;
    }
    
    // Voeg size stijlen toe
    let sizeStyle = {};
    if (size === 'small') {
      sizeStyle = buttonStyles.smallButton;
    } else if (size === 'large') {
      sizeStyle = buttonStyles.largeButton;
    }
    
    // Voeg disabled stijl toe indien nodig
    const disabledStyle = disabled ? buttonStyles.disabledButton : {};
    
    return [baseStyle, sizeStyle, disabledStyle, style];
  };
  
  const getTextStyle = () => {
    let baseTextStyle;
    
    switch (variant) {
      case 'secondary':
        baseTextStyle = buttonStyles.secondaryButtonText;
        break;
      case 'tertiary':
        baseTextStyle = buttonStyles.tertiaryButtonText;
        break;
      case 'primary':
      default:
        baseTextStyle = buttonStyles.primaryButtonText;
        break;
    }
    
    // Voeg size text stijlen toe
    let sizeTextStyle = {};
    if (size === 'small') {
      sizeTextStyle = buttonStyles.smallButtonText;
    } else if (size === 'large') {
      sizeTextStyle = buttonStyles.largeButtonText;
    }
    
    // Voeg disabled text stijl toe indien nodig
    const disabledTextStyle = disabled ? buttonStyles.disabledButtonText : {};
    
    return [baseTextStyle, sizeTextStyle, disabledTextStyle, textStyle];
  };
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={getButtonStyle()}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? theme.colors.neutral100 : theme.colors.primary} 
        />
      ) : (
        <Text style={getTextStyle()}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

// app/components/common/Card.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { layoutStyles, theme } from '../../styles';

const Card = ({
  children,
  style,
  onPress,
  elevation = 'sm',
  ...props
}) => {
  // Krijg de juiste shadow op basis van elevation
  const getShadow = () => {
    switch (elevation) {
      case 'md':
        return theme.shadow.md;
      case 'lg':
        return theme.shadow.lg;
      case 'xl':
        return theme.shadow.xl;
      case 'sm':
      default:
        return theme.shadow.sm;
    }
  };
  
  const cardStyle = [
    styles.card,
    getShadow(),
    style,
  ];
  
  // Als er een onPress is, maak de kaart touchable
  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.7}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }
  
  // Anders, geef gewoon een View terug
  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.neutral100,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
});

export default Card;

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

// app/components/common/Divider.js
import React from 'react';
import { View } from 'react-native';
import { theme } from '../../styles';

const Divider = ({
  style,
  horizontal = false,
  color = theme.colors.neutral300,
  thickness = 1,
  marginVertical = theme.spacing.md,
  marginHorizontal = 0,
  ...props
}) => {
  const dividerStyle = {
    backgroundColor: color,
    ...(horizontal
      ? {
          height: thickness,
          marginVertical,
          width: '100%',
        }
      : {
          width: thickness,
          marginHorizontal,
          height: '100%',
        }),
    ...style,
  };

  return <View style={dividerStyle} {...props} />;
};

export default Divider;