// app/screens/CategoriesScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  RefreshControl,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';

// Services
import { getMainCategories, getPromotionalCategories, getPopularCategories } from '../services/productService';

// Components
import CategoryList from '../components/categories/CategoryList';
import SubcategoryList from '../components/categories/SubcategoryList';
import { DisplaySmall, BodyMedium } from '../components/common/Typography';
import SearchBar from '../components/common/SearchBar';

// Styling
import { theme, layoutStyles } from '../styles';

const CategoriesScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Fetch main categories
  const {
    data: mainCategories,
    isLoading: isLoadingMain,
    isError: isErrorMain,
    error: errorMain,
    refetch: refetchMain,
  } = useQuery(['mainCategories'], () => getMainCategories());

  // Fetch promotional categories
  const {
    data: promotionalCategories,
    isLoading: isLoadingPromo,
    refetch: refetchPromo,
  } = useQuery(['promotionalCategories'], () => getPromotionalCategories());

  // Fetch popular categories
  const {
    data: popularCategories,
    isLoading: isLoadingPopular,
    refetch: refetchPopular,
  } = useQuery(['popularCategories'], () => getPopularCategories());

  // Handle refreshing
  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchMain(), refetchPromo(), refetchPopular()]);
    setRefreshing(false);
  };

  // Handle category press navigation
  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryProducts', { 
      categoryId: category.id,
      categoryName: category.name,
      categoryType: 'main'
    });
  };

  // Handle subcategory press
  const handleSubcategoryPress = (subcategory) => {
    navigation.navigate('CategoryProducts', { 
      categoryId: subcategory.id,
      categoryName: subcategory.name,
      categoryType: 'sub',
      parentCategoryId: subcategory.parentId,
    });
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim()) {
      navigation.navigate('Search', { initialQuery: query });
    }
  };

  // Render loading state
  if (isLoadingMain && !refreshing && !mainCategories) {
    return (
      <View style={layoutStyles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  // Render error state
  if (isErrorMain && !mainCategories) {
    return (
      <View style={[layoutStyles.center, layoutStyles.contentContainer]}>
        <BodyMedium style={styles.errorText}>
          Er is een fout opgetreden bij het laden van de categorieën.
        </BodyMedium>
        <BodyMedium style={styles.errorDetail}>
          {errorMain?.message || 'Probeer het later opnieuw.'}
        </BodyMedium>
      </View>
    );
  }

  return (
    <SafeAreaView style={layoutStyles.screenContainer}>
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Zoek producten of categorieën..."
          value={searchQuery}
          onChangeText={handleSearch}
          onSubmitEditing={() => handleSearch(searchQuery)}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <DisplaySmall style={styles.header}>Categorieën</DisplaySmall>
        
        {/* Promotionele Categorieën */}
        {promotionalCategories && promotionalCategories.length > 0 && (
          <CategoryList
            title="Aanbiedingen & Acties"
            categories={promotionalCategories}
            onCategoryPress={handleCategoryPress}
            horizontal={true}
            cardSize="medium"
            showProductCount={true}
          />
        )}
        
        {/* Populaire Categorieën */}
        {popularCategories && popularCategories.length > 0 && (
          <CategoryList
            title="Populaire Categorieën"
            categories={popularCategories}
            onCategoryPress={handleCategoryPress}
            horizontal={true}
            cardSize="medium"
            showProductCount={true}
          />
        )}
        
        {/* Alle Categorieën */}
        <View style={styles.mainCategoriesSection}>
          <DisplaySmall style={styles.sectionTitle}>Alle Categorieën</DisplaySmall>
          
          {mainCategories && mainCategories.map((category) => (
            <SubcategoryList
              key={category.id}
              category={category}
              subcategories={category.subcategories || []}
              onSubcategoryPress={handleSubcategoryPress}
              initiallyExpanded={false}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
  },
  sectionTitle: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
  },
  mainCategoriesSection: {
    marginTop: theme.spacing.md,
  },
  errorText: {
    color: theme.colors.error,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  errorDetail: {
    color: theme.colors.neutral600,
    textAlign: 'center',
  },
});

export default CategoriesScreen;