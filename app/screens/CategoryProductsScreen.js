// app/screens/CategoryProductsScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  StyleSheet, 
  RefreshControl, 
  FlatList,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from 'react-query';

// Services
import { getProductsByCategory, getCategoryById } from '../services/productService';

// Components
import ProductCard from '../components/products/ProductCard';
import FilterBar from '../components/filters/FilterBar';
import { DisplaySmall, BodyMedium, HeadingSmall } from '../components/common/Typography';
import Button from '../components/common/Button';
import SearchBar from '../components/common/SearchBar';
import Breadcrumbs from '../components/navigation/Breadcrumbs';

// Styling
import { theme, layoutStyles } from '../styles';

const CategoryProductsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId, categoryName, categoryType, parentCategoryId } = route.params || {};
  
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('popularity');
  const [viewType, setViewType] = useState('grid');
  const [page, setPage] = useState(1);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  
  // Fetch category
  const {
    data: category,
    isLoading: isLoadingCategory,
    refetch: refetchCategory,
  } = useQuery(['category', categoryId], () => getCategoryById(categoryId), {
    enabled: !!categoryId,
  });
  
  // Fetch products
  const {
    data: productsResponse,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    error: errorProducts,
    refetch: refetchProducts,
  } = useQuery(
    ['products', categoryId, page, sortBy, filters], 
    () => getProductsByCategory(categoryId, { 
      page, 
      limit: 10, 
      sortBy, 
      filters,
      search: searchQuery 
    }),
    {
      enabled: !!categoryId,
      keepPreviousData: true,
    }
  );

  // Extract products and pagination from response
  const products = productsResponse?.data || [];
  const totalPages = productsResponse?.totalPages || 0;
  const totalProducts = productsResponse?.total || 0;
  
  // Set up breadcrumbs
  useEffect(() => {
    const setupBreadcrumbs = async () => {
      const crumbs = [{ name: 'Home', path: 'Home' }];
      
      if (categoryType === 'sub' && parentCategoryId) {
        try {
          const parentCategory = await getCategoryById(parentCategoryId);
          if (parentCategory) {
            crumbs.push({ 
              name: parentCategory.name, 
              path: 'CategoryProducts',
              params: { 
                categoryId: parentCategoryId,
                categoryName: parentCategory.name,
                categoryType: 'main'
              }
            });
          }
        } catch (error) {
          console.error('Error fetching parent category:', error);
        }
      }
      
      crumbs.push({ name: categoryName || 'Categorie' });
      setBreadcrumbs(crumbs);
    };
    
    setupBreadcrumbs();
  }, [categoryId, categoryName, categoryType, parentCategoryId]);
  
  // Refresh handler
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchCategory(), refetchProducts()]);
    setRefreshing(false);
  }, [refetchCategory, refetchProducts]);
  
  // Load more products
  const handleLoadMore = useCallback(() => {
    if (page < totalPages && !isLoadingProducts) {
      setPage(prevPage => prevPage + 1);
    }
  }, [page, totalPages, isLoadingProducts]);
  
  // Handle product press
  const handleProductPress = useCallback((product) => {
    navigation.navigate('ProductDetail', { productId: product.id });
  }, [navigation]);
  
  // Handle filter change
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  }, []);
  
  // Handle sort change
  const handleSortChange = useCallback((newSortBy) => {
    setSortBy(newSortBy);
    setPage(1); // Reset to first page when sort changes
  }, []);
  
  // Handle view type change
  const handleViewTypeChange = useCallback((newViewType) => {
    setViewType(newViewType);
  }, []);
  
  // Handle search
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setPage(1); // Reset to first page when search changes
  }, []);
  
  // Render item for grid view
  const renderGridItem = useCallback(({ item }) => (
    <ProductCard
      product={item}
      onPress={handleProductPress}
      size="medium"
      style={styles.gridItem}
    />
  ), [handleProductPress]);
  
  // Render item for list view
  const renderListItem = useCallback(({ item }) => (
    <ProductCard
      product={item}
      onPress={handleProductPress}
      size="large"
      style={styles.listItem}
    />
  ), [handleProductPress]);
  
  // Render footer with load more button or loading indicator
  const renderFooter = useCallback(() => {
    if (isLoadingProducts && page > 1) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
        </View>
      );
    }
    
    if (page < totalPages) {
      return (
        <View style={styles.footerButton}>
          <Button
            title="Meer laden"
            onPress={handleLoadMore}
            variant="secondary"
          />
        </View>
      );
    }
    
    return null;
  }, [isLoadingProducts, page, totalPages, handleLoadMore]);
  
  // Render main content
  return (
    <SafeAreaView style={layoutStyles.screenContainer}>
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Zoek in deze categorie..."
          value={searchQuery}
          onChangeText={handleSearch}
          onSubmitEditing={() => handleSearch(searchQuery)}
        />
      </View>
      
      <Breadcrumbs items={breadcrumbs} style={styles.breadcrumbs} />
      
      <View style={styles.headerContainer}>
        <DisplaySmall style={styles.categoryTitle}>
          {category?.name || categoryName || 'Producten'}
        </DisplaySmall>
        
        {totalProducts > 0 && (
          <HeadingSmall style={styles.productCount}>
            {totalProducts} producten
          </HeadingSmall>
        )}
      </View>
      
      <FilterBar
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onViewTypeChange={handleViewTypeChange}
        activeFilters={Object.keys(filters).length}
        sortBy={sortBy}
        viewType={viewType}
        style={styles.filterBar}
      />
      
      {/* Show loading state for initial load */}
      {isLoadingProducts && page === 1 && !products.length ? (
        <View style={layoutStyles.center}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        /* Show error state if there's an error */
        isErrorProducts ? (
          <View style={[layoutStyles.center, layoutStyles.contentContainer]}>
            <BodyMedium style={styles.errorText}>
              Er is een fout opgetreden bij het laden van de producten.
            </BodyMedium>
            <BodyMedium style={styles.errorDetail}>
              {errorProducts?.message || 'Probeer het later opnieuw.'}
            </BodyMedium>
            <Button
              title="Opnieuw proberen"
              onPress={handleRefresh}
              variant="secondary"
              style={styles.retryButton}
            />
          </View>
        ) : (
          /* Show products in grid or list view */
          <FlatList
            data={products}
            renderItem={viewType === 'grid' ? renderGridItem : renderListItem}
            keyExtractor={(item) => item.id.toString()}
            key={viewType} // Force re-render when view type changes
            numColumns={viewType === 'grid' ? 2 : 1}
            contentContainerStyle={[
              styles.productList,
              viewType === 'grid' ? styles.gridContainer : styles.listContainer
            ]}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <BodyMedium style={styles.emptyText}>
                  Geen producten gevonden.
                </BodyMedium>
              </View>
            }
          />
        )
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
  },
  breadcrumbs: {
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  headerContainer: {
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  categoryTitle: {
    marginBottom: theme.spacing.xs,
  },
  productCount: {
    color: theme.colors.neutral600,
  },
  filterBar: {
    marginBottom: theme.spacing.sm,
  },
  productList: {
    paddingBottom: theme.spacing.xxl,
  },
  gridContainer: {
    paddingHorizontal: theme.spacing.sm,
  },
  listContainer: {
    paddingHorizontal: theme.spacing.md,
  },
  gridItem: {
    width: '48%',
    marginHorizontal: '1%',
    marginBottom: theme.spacing.md,
  },
  listItem: {
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  footerLoader: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  footerButton: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
  },
  emptyContainer: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: theme.colors.neutral500,
    textAlign: 'center',
  },
  errorText: {
    color: theme.colors.error,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  errorDetail: {
    color: theme.colors.neutral600,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  retryButton: {
    marginTop: theme.spacing.sm,
  },
});