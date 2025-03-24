import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';

const SearchResults = ({ results, onProductPress }) => {
  const navigation = useNavigation();
  
  // Geen resultaten gevonden
  if (!results || results.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Geen producten gevonden. Probeer een andere zoekopdracht.
        </Text>
      </View>
    );
  }
  
  const handleProductPress = (product) => {
    if (onProductPress) {
      onProductPress(product);
    } else {
      navigation.navigate('ProductDetail', { productId: product.id });
    }
  };
  
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => handleProductPress(item)}
      activeOpacity={0.7}
    >
      <Card style={styles.productCard}>
        <View style={styles.productContainer}>
          {item.images && item.images[0] ? (
            <Image
              style={styles.productImage}
              source={item.images[0].src}
              contentFit="contain"
              transition={200}
              cachePolicy="memory-disk"
            />
          ) : (
            <View style={[styles.productImage, styles.placeholderImage]} />
          )}
          
          <View style={styles.productInfo}>
            <Text style={styles.productName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.productSku}>
              Artikelnr: {item.sku}
            </Text>
            <Text style={styles.productPrice}>
              €{parseFloat(item.price).toFixed(2)}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
  
  return (
    <FlatList
      data={results}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      initialNumToRender={5}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  productCard: {
    marginBottom: 12,
    elevation: 2,
  },
  productContainer: {
    flexDirection: 'row',
    padding: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
  },
  placeholderImage: {
    backgroundColor: '#e0e0e0',
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  productSku: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default React.memo(SearchResults);