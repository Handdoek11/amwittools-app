// app/components/common/SearchBar.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import theme from '../../themes/theme';

/**
 * Universal search bar component with customizable behavior
 * 
 * @param {Object} props
 * @param {string} [props.placeholder="Search..."] - Placeholder text
 * @param {string} [props.value] - Current search value (for controlled component)
 * @param {function} [props.onChangeText] - Handler for text changes
 * @param {function} [props.onSubmitEditing] - Handler for submit action
 * @param {function} [props.onSearch] - Handler for search button press
 * @param {function} [props.onClear] - Handler for clear button press
 * @param {string} [props.initialQuery=""] - Initial search query
 * @param {boolean} [props.autoNavigate=false] - Whether to auto-navigate to search screen
 * @param {Object} [props.style] - Additional styles for the container
 */
const SearchBar = ({
  placeholder = "Search...",
  value,
  onChangeText,
  onSubmitEditing,
  onSearch,
  onClear,
  initialQuery = "",
  autoNavigate = false,
  style,
  ...props
}) => {
  const navigation = useNavigation();
  // Internal state for uncontrolled mode
  const [query, setQuery] = useState(initialQuery);
  
  // Determine if in controlled or uncontrolled mode
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : query;
  
  // Handle text changes
  const handleChangeText = (text) => {
    if (isControlled) {
      if (onChangeText) onChangeText(text);
    } else {
      setQuery(text);
    }
  };
  
  // Handle search action
  const handleSearch = () => {
    const searchText = currentValue.trim();
    
    if (searchText === '') return;
    
    if (onSearch) {
      onSearch(searchText);
    } else if (autoNavigate) {
      // Auto navigate to search screen with query
      navigation.navigate('SearchTab', {
        screen: 'SearchMain',
        params: { initialQuery: searchText }
      });
    }
    
    if (!isControlled && !autoNavigate) {
      // Reset internal state if not controlled and not navigating
      setQuery('');
    }
  };
  
  // Handle clear action
  const handleClear = () => {
    if (isControlled) {
      if (onClear) {
        onClear();
      } else if (onChangeText) {
        onChangeText('');
      }
    } else {
      setQuery('');
    }
  };

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
        value={currentValue}
        onChangeText={handleChangeText}
        onSubmitEditing={onSubmitEditing || handleSearch}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode={Platform.OS === 'ios' ? 'while-editing' : 'never'}
        {...props}
      />
      
      {currentValue ? (
        <TouchableOpacity 
          onPress={handleClear}
          style={styles.clearButton}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <MaterialIcons
            name="close"
            size={20}
            color={theme.colors.neutral500}
          />
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
    ...theme.shadow.sm
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