// app/components/common/SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../styles';

const SearchBar = ({
  placeholder = 'Zoeken...',
  value,
  onChangeText,
  onSubmitEditing,
  onClear,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <MaterialIcons
        name="search"
        size={24}
        color={theme.colors.neutral500}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.neutral500}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value ? (
        <TouchableOpacity
          onPress={() => {
            if (onClear) {
              onClear();
            } else if (onChangeText) {
              onChangeText('');
            }
          }}
          style={styles.clearButton}
        >
          <MaterialIcons name="close" size={20} color={theme.colors.neutral500} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.neutral100,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.sm,
  },
  searchIcon: {
    marginRight: theme.spacing.xs,
  },
  input: {
    flex: 1,
    height: '100%',
    color: theme.colors.neutral800,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
  },
  clearButton: {
    padding: theme.spacing.xs,
  },
});

export default SearchBar;
