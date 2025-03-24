// app/components/filters/FilterBar.js
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../styles';
import { BodySmall } from '../common/Typography';
import FilterModal from './FilterModal';
import SortModal from './SortModal';

const FilterBar = ({
  onFilterChange,
  onSortChange,
  onViewTypeChange,
  activeFilters = 0,
  sortBy = 'popularity',
  viewType = 'grid',
  style,
}) => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);

  // Toggle view type (grid/list)
  const handleViewTypeToggle = () => {
    const newViewType = viewType === 'grid' ? 'list' : 'grid';
    onViewTypeChange && onViewTypeChange(newViewType);
  };

  // Open filter modal
  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  // Open sort modal
  const openSortModal = () => {
    setSortModalVisible(true);
  };

  // Handler for filter changes
  const handleFilterChange = (filters) => {
    onFilterChange && onFilterChange(filters);
    setFilterModalVisible(false);
  };

  // Handler for sort changes
  const handleSortChange = (sort) => {
    onSortChange && onSortChange(sort);
    setSortModalVisible(false);
  };

  // Get sort method label
  const getSortLabel = () => {
    const sortLabels = {
      popularity: 'Populariteit',
      priceAsc: 'Prijs: laag - hoog',
      priceDesc: 'Prijs: hoog - laag',
      newest: 'Nieuwste eerst',
      rating: 'Best beoordeeld',
    };

    return sortLabels[sortBy] || 'Sorteer op';
  };

  return (
    <View style={[styles.container, style]}>
      {/* Filter button */}
      <TouchableOpacity 
        style={[
          styles.button, 
          activeFilters > 0 ? styles.activeButton : {}
        ]} 
        onPress={openFilterModal}
        activeOpacity={0.7}
      >
        <MaterialIcons 
          name="filter-list" 
          size={18} 
          color={activeFilters > 0 ? theme.colors.primary : theme.colors.neutral700}
        />
        <BodySmall 
          style={[
            styles.buttonText,
            activeFilters > 0 ? styles.activeButtonText : {}
          ]}
        >
          {activeFilters > 0 ? `Filters (${activeFilters})` : 'Filter'}
        </BodySmall>
      </TouchableOpacity>

      {/* Sort button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={openSortModal}
        activeOpacity={0.7}
      >
        <MaterialIcons 
          name="sort" 
          size={18} 
          color={theme.colors.neutral700}
        />
        <BodySmall style={styles.buttonText}>
          {getSortLabel()}
        </BodySmall>
      </TouchableOpacity>

      {/* View type toggle button */}
      <TouchableOpacity 
        style={styles.viewButton} 
        onPress={handleViewTypeToggle}
        activeOpacity={0.7}
      >
        <MaterialIcons 
          name={viewType === 'grid' ? 'view-list' : 'grid-view'} 
          size={22} 
          color={theme.colors.neutral700}
        />
      </TouchableOpacity>

      {/* Filter Modal */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleFilterChange}
      />

      {/* Sort Modal */}
      <SortModal
        visible={sortModalVisible}
        onClose={() => setSortModalVisible(false)}
        onSelect={handleSortChange}
        selectedSort={sortBy}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.neutral100,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.neutral300,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.neutral300,
    backgroundColor: theme.colors.neutral100,
  },
  activeButton: {
    borderColor: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}10`, // 10% opacity
  },
  buttonText: {
    marginLeft: 4,
    color: theme.colors.neutral700,
  },
  activeButtonText: {
    color: theme.colors.primary,
    fontFamily: theme.typography.fontFamily.medium,
  },
  viewButton: {
    marginLeft: 'auto',
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.neutral300,
  },
});

export default FilterBar;

// app/components/filters/FilterModal.js
import React, { useState, useEffect } from 'react';
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

// Mock filter options - in een echte app zou dit van een API komen
const filterOptions = {
  brands: [
    { id: 'bosch', name: 'Bosch' },
    { id: 'makita', name: 'Makita' },
    { id: 'dewalt', name: 'DeWalt' },
    { id: 'milwaukee', name: 'Milwaukee' },
    { id: 'wiha', name: 'Wiha' },
    { id: 'festool', name: 'Festool' },
    { id: 'metabo', name: 'Metabo' },
  ],
  specifications: [
    { id: '18v', name: '18V' },
    { id: '36v', name: '36V' },
    { id: 'draadloos', name: 'Draadloos' },
    { id: 'bekabeld', name: 'Bekabeld' },
    { id: 'accu', name: 'Accu' },
  ],
  ratings: [
    { id: '4_plus', name: '4 sterren & hoger' },
    { id: '3_plus', name: '3 sterren & hoger' },
    { id: '2_plus', name: '2 sterren & hoger' },
  ],
  status: [
    { id: 'op_voorraad', name: 'Op voorraad' },
    { id: 'nieuw', name: 'Nieuw' },
    { id: 'aanbieding', name: 'Aanbieding' },
  ],
};

const FilterModal = ({
  visible,
  onClose,
  onApply,
  initialFilters = {},
}) => {
  // State voor geselecteerde filters
  const [filters, setFilters] = useState({
    brands: [],
    specifications: [],
    ratings: [],
    status: [],
    priceRange: [0, 1000],
  });

  // Actieve sectie voor mobiele weergave
  const [activeSection, setActiveSection] = useState('brands');

  // Filter initialiseren wanneer modal opent
  useEffect(() => {
    if (visible) {
      setFilters({
        ...filters,
        ...initialFilters,
      });
    }
  }, [visible, initialFilters]);

  // Filters toepassen
  const handleApply = () => {
    onApply(filters);
  };

  // Filters resetten
  const handleReset = () => {
    setFilters({
      brands: [],
      specifications: [],
      ratings: [],
      status: [],
      priceRange: [0, 1000],
    });
  };

  // Filter sectie kiezen
  const handleSectionPress = (section) => {
    setActiveSection(section);
  };

  // Checkbox group waardes updaten
  const handleCheckboxChange = (key, values) => {
    setFilters((prev) => ({
      ...prev,
      [key]: values,
    }));
  };

  // Price range updaten
  const handlePriceChange = (values) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: values,
    }));
  };

  // Tellen van actieve filters
  const countActiveFilters = () => {
    let count = 0;
    
    if (filters.brands.length) count += filters.brands.length;
    if (filters.specifications.length) count += filters.specifications.length;
    if (filters.ratings.length) count += filters.ratings.length;
    if (filters.status.length) count += filters.status.length;
    
    // Alleen tellen als prijsbereik is aangepast
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) {
      count += 1;
    }
    
    return count;
  };

  // Render sectie navigatie (voor mobile)
  const renderSectionNav = () => (
    <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.sectionNavContent}
    >
      {Object.keys(filterOptions).map((section) => (
        <TouchableOpacity
          key={section}
          style={[
            styles.sectionTab,
            activeSection === section ? styles.activeTab : {},
          ]}
          onPress={() => handleSectionPress(section)}
        >
          <BodySmall
            style={activeSection === section ? styles.activeTabText : {}}
          >
            {getSectionTitle(section)}
          </BodySmall>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={[
          styles.sectionTab,
          activeSection === 'price' ? styles.activeTab : {},
        ]}
        onPress={() => handleSectionPress('price')}
      >
        <BodySmall
          style={activeSection === 'price' ? styles.activeTabText : {}}
        >
          Prijs
        </BodySmall>
      </TouchableOpacity>
    </ScrollView>
  );

  // Helper functie voor sectie titels
  const getSectionTitle = (section) => {
    const titles = {
      brands: 'Merken',
      specifications: 'Specificaties',
      ratings: 'Beoordelingen',
      status: 'Status',
      price: 'Prijs',
    };
    return titles[section] || section;
  };

  // Render sectie content
  const renderSectionContent = () => {
    if (activeSection === 'price') {
      return (
        <View style={styles.sectionContainer}>
          <Label style={styles.sectionTitle}>Prijsbereik</Label>
          <PriceRangeSlider
            min={0}
            max={1000}
            values={filters.priceRange}
            onValuesChange={handlePriceChange}
          />
        </View>
      );
    }

    return (
      <View style={styles.sectionContainer}>
        <Label style={styles.sectionTitle}>{getSectionTitle(activeSection)}</Label>
        <CheckboxGroup
          options={filterOptions[activeSection]}
          selectedValues={filters[activeSection]}
          onChange={(values) => handleCheckboxChange(activeSection, values)}
        />
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <HeadingMedium>Filters</HeadingMedium>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons 
                name="close" 
                size={24} 
                color={theme.colors.neutral700} 
              />
            </TouchableOpacity>
          </View>
          
          <Divider />
          
          {/* Navigatie voor mobiel */}
          {Platform.OS !== 'web' && renderSectionNav()}
          
          {/* Content */}
          <View style={styles.content}>
            {/* Grotere schermen: weergave van alle secties */}
            {Platform.OS === 'web' ? (
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Prijsbereik */}
                <View style={styles.sectionContainer}>
                  <Label style={styles.sectionTitle}>Prijsbereik</Label>
                  <PriceRangeSlider
                    min={0}
                    max={1000}
                    values={filters.priceRange}
                    onValuesChange={handlePriceChange}
                  />
                </View>
                
                <Divider />
                
                {/* Merken */}
                <View style={styles.sectionContainer}>
                  <Label style={styles.sectionTitle}>Merken</Label>
                  <CheckboxGroup
                    options={filterOptions.brands}
                    selectedValues={filters.brands}
                    onChange={(values) => handleCheckboxChange('brands', values)}
                  />
                </View>
                
                <Divider />
                
                {/* Specificaties */}
                <View style={styles.sectionContainer}>
                  <Label style={styles.sectionTitle}>Specificaties</Label>
                  <CheckboxGroup
                    options={filterOptions.specifications}
                    selectedValues={filters.specifications}
                    onChange={(values) => handleCheckboxChange('specifications', values)}
                  />
                </View>
                
                <Divider />
                
                {/* Beoordelingen */}
                <View style={styles.sectionContainer}>
                  <Label style={styles.sectionTitle}>Beoordelingen</Label>
                  <CheckboxGroup
                    options={filterOptions.ratings}
                    selectedValues={filters.ratings}
                    onChange={(values) => handleCheckboxChange('ratings', values)}
                  />
                </View>
                
                <Divider />
                
                {/* Status */}
                <View style={styles.sectionContainer}>
                  <Label style={styles.sectionTitle}>Status</Label>
                  <CheckboxGroup
                    options={filterOptions.status}
                    selectedValues={filters.status}
                    onChange={(values) => handleCheckboxChange('status', values)}
                  />
                </View>
              </ScrollView>
            ) : (
              // Mobiele weergave: alleen actieve sectie
              <ScrollView showsVerticalScrollIndicator={false}>
                {renderSectionContent()}
              </ScrollView>
            )}
          </View>
          
          {/* Footer met acties */}
          <View style={styles.footer}>
            <View style={styles.filterCount}>
              <BodyMedium>{countActiveFilters()} filters geselecteerd</BodyMedium>
            </View>
            
            <View style={styles.actions}>
              <Button
                title="Reset"
                variant="tertiary"
                onPress={handleReset}
                style={styles.resetButton}
              />
              
              <Button
                title="Toepassen"
                onPress={handleApply}
                style={styles.applyButton}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', // Modal van onderaan laten komen
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: theme.colors.neutral100,
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
    maxHeight: '90%',
    ...(Platform.OS === 'web' ? {
      maxWidth: 600,
      width: '100%',
      alignSelf: 'center',
      borderRadius: theme.borderRadius.lg,
      marginBottom: theme.spacing.lg,
      ...theme.shadow.lg,
    } : {}),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  closeButton: {
    padding: theme.spacing.xs,
  },
  sectionNavContent: {
    padding: theme.spacing.sm,
  },
  sectionTab: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.neutral200,
  },
  activeTab: {
    backgroundColor: theme.colors.primary,
  },
  activeTabText: {
    color: theme.colors.neutral100,
    fontFamily: theme.typography.fontFamily.medium,
  },
  content: {
    flex: 1,
  },
  sectionContainer: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    marginBottom: theme.spacing.sm,
  },
  footer: {
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral300,
  },
  filterCount: {
    marginBottom: theme.spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resetButton: {
    marginRight: theme.spacing.sm,
  },
  applyButton: {
    flex: 1,
  },
});

export default FilterModal;

// app/components/filters/SortModal.js
import React from 'react';
import { 
  View, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../styles';
import { HeadingMedium, BodyMedium } from '../common/Typography';

const sortOptions = [
  { id: 'popularity', label: 'Populariteit', icon: 'trending-up' },
  { id: 'priceAsc', label: 'Prijs: laag - hoog', icon: 'arrow-upward' },
  { id: 'priceDesc', label: 'Prijs: hoog - laag', icon: 'arrow-downward' },
  { id: 'newest', label: 'Nieuwste eerst', icon: 'new-releases' },
  { id: 'rating', label: 'Best beoordeeld', icon: 'grade' },
];

const SortModal = ({
  visible,
  onClose,
  onSelect,
  selectedSort = 'popularity',
}) => {
  // Sortering selecteren
  const handleSelect = (sortId) => {
    onSelect(sortId);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <HeadingMedium>Sorteren op</HeadingMedium>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons 
                name="close" 
                size={24} 
                color={theme.colors.neutral700} 
              />
            </TouchableOpacity>
          </View>
          
          {/* Opties */}
          <ScrollView>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.sortOption,
                  selectedSort === option.id ? styles.selectedOption : {},
                ]}
                onPress={() => handleSelect(option.id)}
              >
                <MaterialIcons
                  name={option.icon}
                  size={24}
                  color={selectedSort === option.id ? theme.colors.primary : theme.colors.neutral700}
                  style={styles.optionIcon}
                />
                
                <BodyMedium
                  style={selectedSort === option.id ? styles.selectedText : {}}
                >
                  {option.label}
                </BodyMedium>
                
                {selectedSort === option.id && (
                  <MaterialIcons
                    name="check"
                    size={24}
                    color={theme.colors.primary}
                    style={styles.checkIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', // Modal van onderaan laten komen
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: theme.colors.neutral100,
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
    maxHeight: '50%',
    ...(Platform.OS === 'web' ? {
      maxWidth: 400,
      width: '100%',
      alignSelf: 'center',
      borderRadius: theme.borderRadius.lg,
      marginBottom: theme.spacing.lg,
      ...theme.shadow.lg,
    } : {}),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  closeButton: {
    padding: theme.spacing.xs,
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral300,
  },
  selectedOption: {
    backgroundColor: `${theme.colors.primary}10`, // 10% opacity
  },
  optionIcon: {
    marginRight: theme.spacing.md,
  },
  selectedText: {
    color: theme.colors.primary,
    fontFamily: theme.typography.fontFamily.medium,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
});

export default SortModal;

// app/components/filters/PriceRangeSlider.js
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MultiSlider from 'react-native-multi-slider';
import { theme } from '../../styles';
import { BodySmall } from '../common/Typography';

const PriceRangeSlider = ({
  min = 0,
  max = 1000,
  step = 10,
  values = [min, max],
  onValuesChange,
  style,
}) => {
  // Formateer prijs voor weergave
  const formatPrice = (value) => {
    return `€ ${value.toFixed(0)}`;
  };

  // Custom marker voor de slider
  const CustomMarker = ({ currentValue }) => (
    <View style={styles.marker}>
      <View style={styles.markerInner} />
      <View style={styles.tooltip}>
        <BodySmall style={styles.tooltipText}>
          {formatPrice(currentValue)}
        </BodySmall>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.rangeLabels}>
        <BodySmall>Min: {formatPrice(values[0])}</BodySmall>
        <BodySmall>Max: {formatPrice(values[1])}</BodySmall>
      </View>
      
      <View style={styles.sliderContainer}>
        <MultiSlider
          values={values}
          min={min}
          max={max}
          step={step}
          sliderLength={280}
          onValuesChange={onValuesChange}
          allowOverlap={false}
          snapped
          minMarkerOverlapDistance={40}
          customMarker={CustomMarker}
          selectedStyle={styles.selectedTrack}
          unselectedStyle={styles.unselectedTrack}
          containerStyle={styles.sliderInner}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.md,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  sliderContainer: {
    alignItems: 'center',
  },
  sliderInner: {
    height: 50,
  },
  selectedTrack: {
    backgroundColor: theme.colors.primary,
    height: 4,
  },
  unselectedTrack: {
    backgroundColor: theme.colors.neutral300,
    height: 4,
  },
  marker: {
    width: 20,
    height: 20,
    alignItems: 'center',
  },
  markerInner: {
    width: 20,
    height: 20,
    backgroundColor: theme.colors.neutral100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    ...theme.shadow.sm,
  },
  tooltip: {
    position: 'absolute',
    top: -30,
    backgroundColor: theme.colors.primary,
    padding: 4,
    borderRadius: theme.borderRadius.sm,
    minWidth: 60,
    alignItems: 'center',
  },
  tooltipText: {
    color: theme.colors.neutral100,
    fontSize: theme.typography.fontSize.xs,
  },
});

export default PriceRangeSlider;

// app/components/filters/CheckboxGroup.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../styles';
import { BodyMedium } from '../common/Typography';

const CheckboxGroup = ({
  options = [],
  selectedValues = [],
  onChange,
  style,
}) => {
  // Checkbox toggle handler
  const handleToggle = (optionId) => {
    let newValues;
    
    if (selectedValues.includes(optionId)) {
      // Verwijder waarde als deze al geselecteerd is
      newValues = selectedValues.filter(id => id !== optionId);
    } else {
      // Voeg waarde toe als deze nog niet geselecteerd is
      newValues = [...selectedValues, optionId];
    }
    
    onChange(newValues);
  };

  return (
    <View style={[styles.container, style]}>
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.id);
        
        return (
          <TouchableOpacity
            key={option.id}
            style={styles.checkboxRow}
            onPress={() => handleToggle(option.id)}
            activeOpacity={0.7}
          >
            <View style={[
              styles.checkbox,
              isSelected ? styles.checkedBox : {},
            ]}>
              {isSelected && (
                <MaterialIcons
                  name="check"
                  size={16}
                  color={theme.colors.neutral100}
                />
              )}
            </View>
            
            <BodyMedium style={styles.label}>
              {option.name}
            </BodyMedium>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: theme.borderRadius.xs,
    borderWidth: 2,
    borderColor: theme.colors.neutral500,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  checkedBox: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  label: {
    flex: 1,
  },
});

export default CheckboxGroup;