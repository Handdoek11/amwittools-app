// app/components/common/FilterBar.js
import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Chip, Button, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../themes/theme';

const FilterBar = ({ 
  filterOptions, 
  appliedFilters = {}, 
  onApplyFilter, 
  onResetFilters,
  style
}) => {
  // Format applied filters for display
  const getFilterCount = () => {
    return Object.keys(appliedFilters).length;
  };
  
  // Get price range label
  const getPriceRangeLabel = () => {
    if (filterOptions?.priceRanges && appliedFilters.priceMin !== undefined) {
      const range = filterOptions.priceRanges.find(
        r => r.min === appliedFilters.priceMin && r.max === appliedFilters.priceMax
      );
      return range ? range.name : null;
    }
    return null;
  };
  
  return (
    <View style={[styles.container, style]}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Filter button */}
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => onApplyFilter('showFilterModal', true)}
        >
          <Ionicons name="options-outline" size={18} color={colors.primary} />
          <Text style={styles.filterButtonText}>
            Filters {getFilterCount() > 0 ? `(${getFilterCount()})` : ''}
          </Text>
        </TouchableOpacity>
        
        {/* Applied filters as chips */}
        {appliedFilters.brand && (
          <Chip 
            style={styles.filterChip}
            onClose={() => onApplyFilter('brand', null)}
          >
            Merk: {appliedFilters.brand}
          </Chip>
        )}
        
        {getPriceRangeLabel() && (
          <Chip
            style={styles.filterChip}
            onClose={() => {
              onApplyFilter('priceMin', null);
              onApplyFilter('priceMax', null);
            }}
          >
            Prijs: {getPriceRangeLabel()}
          </Chip>
        )}
        
        {appliedFilters.minRating && (
          <Chip
            style={styles.filterChip}
            onClose={() => onApplyFilter('minRating', null)}
          >
            {appliedFilters.minRating}+ sterren
          </Chip>
        )}
        
        {getFilterCount() > 0 && (
          <Button 
            mode="text" 
            compact 
            onPress={onResetFilters}
            style={styles.resetButton}
          >
            Wissen
          </Button>
        )}
      </ScrollView>
      <Divider style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
  },
  filterButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  filterChip: {
    marginRight: 8,
    backgroundColor: colors.primary + '20',
  },
  resetButton: {
    marginLeft: 4,
  },
  divider: {
    marginTop: 8,
  },
});

export default FilterBar;