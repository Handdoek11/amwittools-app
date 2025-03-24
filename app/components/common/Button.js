// app/components/common/Button.js
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { layoutStyles, theme } from '../../styles';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  style,
  disabled = false,
  textStyle,
  ...props
}) => {
  const buttonStyles = [
    styles.button,
    variant === 'primary' && styles.primaryButton,
    variant === 'secondary' && styles.secondaryButton,
    variant === 'tertiary' && styles.tertiaryButton,
    disabled && styles.disabledButton,
    style,
  ];

  const buttonTextStyles = [
    styles.buttonText,
    variant === 'primary' && styles.primaryButtonText,
    variant === 'secondary' && styles.secondaryButtonText,
    variant === 'tertiary' && styles.tertiaryButtonText,
    disabled && styles.disabledButtonText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={buttonTextStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
  },
  secondaryButton: {
    backgroundColor: theme.colors.neutral200,
    borderWidth: 1,
    borderColor: theme.colors.neutral300,
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
  },
  disabledButton: {
    backgroundColor: theme.colors.neutral300,
  },
  buttonText: {
    fontFamily: theme.typography.fontFamily.medium,
    fontSize: theme.typography.fontSize.md,
  },
  primaryButtonText: {
    color: theme.colors.neutral100,
  },
  secondaryButtonText: {
    color: theme.colors.neutral700,
  },
  tertiaryButtonText: {
    color: theme.colors.primary,
  },
  disabledButtonText: {
    color: theme.colors.neutral500,
  },
});

export default Button;