// app/components/common/SearchBar.js
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../themes/theme';

const SearchBar = ({ placeholder = 'Zoek producten...', style }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('SearchTab', {
        screen: 'Search',
        params: { initialQuery: searchQuery.trim() }
      });
      setSearchQuery('');
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Searchbar
        placeholder={placeholder}
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.input}
        iconColor={colors.textSecondary}
        placeholderTextColor={colors.placeholder}
        onSubmitEditing={handleSearch}
        onIconPress={handleSearch}
        theme={{ colors: { primary: colors.primary } }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  searchBar: {
    elevation: 2,
    borderRadius: 8,
    backgroundColor: '#fff',
    height: 48,
  },
  input: {
    fontSize: 15,
    color: colors.text,
  }
});

export default SearchBar;