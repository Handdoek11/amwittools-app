// app/components/common/Card.js
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { layoutStyles, theme } from '../../styles';

const Card = ({
  children,
  style,
  onPress,
  ...props
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.7}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.neutral100,
    borderRadius: theme.borderRadius.md,
    ...theme.shadow.sm,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
});

export default Card;