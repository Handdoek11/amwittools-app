// app/components/filters/FilterModal.js
import { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Modal, 
  TouchableOpacity, 
  ScrollView,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../styles';
import { HeadingMedium, BodyMedium, BodySmall, Label } from '../common/Typography';
import Button from '../common/Button';
import Divider from '../common/Divider';
import PriceRangeSlider from './PriceRangeSlider';
import CheckboxGroup from './CheckboxGroup';

const FilterModal = ({ 
  visible, 
  onClose, 
  filterOptions, 
  appliedFilters = {}, 
  onApplyFilters 
}) => {
  // Local state for filter values, initialized with current appliedFilters
  const [tempFilters, setTempFilters] = useState({ ...appliedFilters });
  
  // Update tempFilters when appliedFilters changes (e.g., when reset)
  useEffect(() => {
    setTempFilters({ ...appliedFilters });
  }, [appliedFilters]);
  
  // Update a single filter
  const handleFilterChange = (type, value) => {
    setTempFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };
  
  // Apply all temp filters and close the modal
  const handleApply = () => {
    onApplyFilters(tempFilters);
    onClose();
  };
  
  // Reset local filters
  const handleReset = () => {
    setTempFilters({});
  };
  
  // Check if a price range is selected
  const isPriceRangeSelected = (min, max) => {
    return tempFilters.priceMin === min && tempFilters.priceMax === max;
  };
  
  // Select a price range
  const selectPriceRange = (min, max) => {
    handleFilterChange('priceMin', min);
    handleFilterChange('priceMax', max);
  };
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Filters</Text>
          <Button onPress={handleReset} mode="text">
            Reset
          </Button>
        </View>
        
        <ScrollView style={styles.content}>
          {/* Price Ranges */}
          {filterOptions?.priceRanges && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Prijsklasse</Text>
              <RadioButton.Group
                onValueChange={(value) => {
                  const [min, max] = value.split(',').map(v => v === 'null' ? null : parseFloat(v));
                  selectPriceRange(min, max);
                }}
                value={`${tempFilters.priceMin},${tempFilters.priceMax}`}
              >
                {filterOptions.priceRanges.map(range => (
                  <RadioButton.Item
                    key={range.id}
                    label={range.name}
                    value={`${range.min},${range.max}`}
                    color={colors.primary}
                    uncheckedColor={colors.textSecondary}
                    style={styles.radioItem}
                  />
                ))}
              </RadioButton.Group>
            </View>
          )}
          
          <Divider style={styles.divider} />
          
          {/* Brands */}
          {filterOptions?.brands && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Merk</Text>
              <RadioButton.Group
                onValueChange={(value) => handleFilterChange('brand', value)}
                value={tempFilters.brand || ''}
              >
                {filterOptions.brands.map(brand => (
                  <RadioButton.Item
                    key={brand.id}
                    label={brand.name}
                    value={brand.name}
                    color={colors.primary}
                    uncheckedColor={colors.textSecondary}
                    style={styles.radioItem}
                  />
                ))}
              </RadioButton.Group>
            </View>
          )}
          
          <Divider style={styles.divider} />
          
          {/* Specifications */}
          {filterOptions?.specifications && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Specificaties</Text>
              <View style={styles.chipContainer}>
                {filterOptions.specifications.map(spec => (
                  <Chip
                    key={spec.id}
                    selected={tempFilters.specifications?.includes(spec.name)}
                    onPress={() => {
                      const specs = tempFilters.specifications || [];
                      if (specs.includes(spec.name)) {
                        handleFilterChange('specifications', 
                          specs.filter(s => s !== spec.name)
                        );
                      } else {
                        handleFilterChange('specifications', [...specs, spec.name]);
                      }
                    }}
                    style={styles.chip}
                    selectedColor={colors.primary}
                  >
                    {spec.name}
                  </Chip>
                ))}
              </View>
            </View>
          )}
          
          <Divider style={styles.divider} />
          
          {/* Ratings */}
          {filterOptions?.ratings && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Beoordeling</Text>
              <RadioButton.Group
                onValueChange={(value) => handleFilterChange('minRating', parseFloat(value))}
                value={tempFilters.minRating?.toString() || ''}
              >
                {filterOptions.ratings.map(rating => (
                  <RadioButton.Item
                    key={rating.id}
                    label={rating.name}
                    value={rating.name === "4 sterren & hoger" ? "4" : "3"}
                    color={colors.primary}
                    uncheckedColor={colors.textSecondary}
                    style={styles.radioItem}
                  />
                ))}
              </RadioButton.Group>
            </View>
          )}
          
          <Divider style={styles.divider} />
          
          {/* Product Status */}
          {filterOptions?.productStatus && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Status</Text>
              <View style={styles.chipContainer}>
                {filterOptions.productStatus.map(status => (
                  <Chip
                    key={status.id}
                    selected={tempFilters.status === status.name}
                    onPress={() => handleFilterChange('status', status.name)}
                    style={styles.chip}
                    selectedColor={colors.primary}
                  >
                    {status.name}
                  </Chip>
                ))}
              </View>
            </View>
          )}
          
          <Divider style={styles.divider} />
          
          {/* Applications */}
          {filterOptions?.applications && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Toepassing</Text>
              <View style={styles.chipContainer}>
                {filterOptions.applications.map(app => (
                  <Chip
                    key={app.id}
                    selected={tempFilters.application === app.name}
                    onPress={() => handleFilterChange('application', app.name)}
                    style={styles.chip}
                    selectedColor={colors.primary}
                  >
                    {app.name}
                  </Chip>
                ))}
              </View>
            </View>
          )}
          
          {/* Add spacing at bottom */}
          <View style={styles.bottomSpace} />
        </ScrollView>
        
        <View style={styles.footer}>
          <Button 
            mode="contained" 
            onPress={handleApply}
            style={styles.applyButton}
            contentStyle={styles.applyButtonContent}
            labelStyle={styles.applyButtonLabel}
          >
            Toepassen
          </Button>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  closeButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.text,
  },
  radioItem: {
    paddingVertical: 6,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 4,
  },
  divider: {
    backgroundColor: colors.border,
    height: 1,
  },
  bottomSpace: {
    height: 40,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  applyButton: {
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  applyButtonContent: {
    height: 48,
  },
  applyButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilterModal;