// app/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  Text, 
  FlatList, 
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Title, Card, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { productService } from '../services/productService';
import ProductCard from '../components/common/ProductCard';
import SearchBar from '../components/common/SearchBar';
import { colors, spacing } from '../themes/theme';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Data laden
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Eerst categorieën ophalen
      try {
        const categoriesResponse = await productService.getCategories();
        if (categoriesResponse.error) {
          console.warn('Fout bij het laden van categorieën:', categoriesResponse.error);
        } else {
          setCategories(categoriesResponse.data || []);
        }
      } catch (categoryError) {
        console.error('Fout bij het laden van categorieën:', categoryError);
      }
      
      // Dan uitgelichte producten ophalen
      try {
        const productsResponse = await productService.getFeaturedProducts();
        if (productsResponse.error) {
          throw new Error(productsResponse.error.message);
        }
        setFeaturedProducts(productsResponse.data || []);
      } catch (productError) {
        console.error('Fout bij het laden van producten:', productError);
        setError('Er is een fout opgetreden bij het laden van de producten');
      }
      
    } catch (err) {
      console.error('Algemene fout bij het laden van data:', err);
      setError(err.message || 'Er is een fout opgetreden bij het laden van de gegevens');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initieel laden
  useEffect(() => {
    loadData();
  }, []);

  // Vernieuwen afhandelen
  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
  };
  
  // Elk product renderen
  const renderProduct = ({ item }) => (
    <ProductCard product={item} style={styles.productCard} />
  );
  
  // Zoekfunctie
  const handleSearch = (query) => {
    navigation.navigate('SearchTab', { 
      screen: 'SearchMain', 
      params: { initialQuery: query } 
    });
  };
  
  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Producten laden...</Text>
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
          />
        }
      >
        {/* Header banner met zoekbalk */}
        <Card style={styles.banner}>
          <Card.Content style={styles.bannerContent}>
            <Title style={styles.bannerTitle}>
              Welkom bij Amwittools
            </Title>
            <Text style={styles.bannerText}>
              Professioneel gereedschap voor elke vakman
            </Text>
            
            {/* Zoekbalk direct in de banner */}
            <SearchBar 
              style={styles.searchBar} 
              placeholder="Zoek een product of artikelnummer..."
              onSearch={handleSearch}
            />
          </Card.Content>
        </Card>
        
        {/* Categorieën */}
        {categories.length > 0 && (
          <View style={styles.sectionContainer}>
            <Title style={styles.sectionTitle}>Categorieën</Title>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
            >
              {categories.map(category => (
                <Chip 
                  key={category.id}
                  style={styles.categoryChip}
                  textStyle={styles.categoryChipText}
                  mode="outlined"
                  onPress={() => navigation.navigate('SearchTab', { 
                    screen: 'SearchMain', 
                    params: { initialQuery: category.name } 
                  })}
                >
                  {category.name}
                </Chip>
              ))}
            </ScrollView>
          </View>
        )}
        
        {/* Uitgelichte producten */}
        <View style={styles.sectionContainer}>
          <Title style={styles.sectionTitle}>Uitgelichte producten</Title>
          
          {error ? (
            <Card style={styles.errorCard}>
              <Card.Content>
                <Text style={styles.errorText}>{error}</Text>
              </Card.Content>
            </Card>
          ) : featuredProducts.length > 0 ? (
            <FlatList
              data={featuredProducts}
              renderItem={renderProduct}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={styles.productRow}
              scrollEnabled={false} // Scrollen uitschakelen omdat we binnen ScrollView zitten
            />
          ) : (
            <Card style={styles.emptyCard}>
              <Card.Content>
                <Text style={styles.emptyText}>
                  Geen producten gevonden
                </Text>
              </Card.Content>
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.textSecondary,
  },
  banner: {
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.primary,
  },
  bannerContent: {
    paddingTop: 24,
    paddingBottom: 16,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  bannerText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  searchBar: {
    marginTop: 8,
    paddingHorizontal: 0,
  },
  sectionContainer: {
    marginVertical: 16,
  },
  sectionTitle: {
    marginHorizontal: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  categoriesContainer: {
    padding: 16,
    paddingTop: 8,
  },
  categoryChip: {
    margin: 4,
    backgroundColor: colors.secondary,
    borderColor: colors.primary,
  },
  categoryChipText: {
    color: colors.primary,
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  productCard: {
    marginTop: 16,
    width: '48%',
  },
  errorCard: {
    margin: 16,
    backgroundColor: '#ffebee',
  },
  errorText: {
    color: '#b71c1c',
    textAlign: 'center',
  },
  emptyCard: {
    margin: 16,
    backgroundColor: colors.secondary,
  },
  emptyText: {
    textAlign: 'center',
    padding: 16,
    color: colors.textSecondary,
  },
});

export default HomeScreen;