// app/screens/SearchScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  SafeAreaView, 
  ActivityIndicator 
} from 'react-native';
import { Card } from 'react-native-paper';
import SearchBar from '../components/common/SearchBar';
import ProductCard from '../components/common/ProductCard';
import { productService } from '../services/productService';
import { colors } from '../themes/theme';

const SearchScreen = ({ route, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check for initial query from navigation params
  useEffect(() => {
    if (route.params?.initialQuery) {
      setSearchQuery(route.params.initialQuery);
      performSearch(route.params.initialQuery);
    }
  }, [route.params?.initialQuery]);

  const performSearch = async (query) => {
    if (!query || query.trim() === '') return;

    setLoading(true);
    setError(null);

    try {
      const result = await productService.searchProducts(query);
      
      if (result.error) {
        setError(result.error);
        setProducts([]);
      } else {
        setProducts(result.data || []);
      }
    } catch (err) {
      setError('Er is een fout opgetreden bij het zoeken');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    performSearch(query);
  };

  const renderProduct = ({ item }) => (
    <ProductCard 
      product={item} 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Zoek producten of artikelnummers..."
          onSearch={handleSearch}
          initialQuery={searchQuery}
          style={styles.searchBar}
        />
      </View>

      {loading ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Zoeken...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : products.length === 0 && searchQuery ? (
        <View style={styles.centerContent}>
          <Text style={styles.noResultsText}>
            Geen resultaten gevonden voor "{searchQuery}"
          </Text>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          contentContainerStyle={styles.productList}
          ListHeaderComponent={
            products.length > 0 ? (
              <Text style={styles.resultCountText}>
                {products.length} resultaat{products.length !== 1 ? 'en' : ''} gevonden
              </Text>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    backgroundColor: colors.primary,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  searchBar: {
    backgroundColor: '#fff',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: colors.textSecondary,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  noResultsText: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  productList: {
    paddingTop: 16,
  },
  productCard: {
    marginBottom: 16,
    width: '48%',
  },
  resultCountText: {
    marginHorizontal: 16,
    marginBottom: 16,
    color: colors.text,
    fontWeight: 'bold',
  },
});

export default SearchScreen;