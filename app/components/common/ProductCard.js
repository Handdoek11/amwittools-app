// app/components/common/ProductCard.js
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../themes/theme';

const ProductCard = ({ product, style }) => {
  const navigation = useNavigation();

  // Handle product press
  const handlePress = () => {
    navigation.navigate('ProductDetail', {
      productId: product.id,
      productName: product.name
    });
  };

  // Get prices with tax
  const regularPrice = product.regular_price ? 
    parseFloat(product.regular_price).toFixed(2) : null;
  const salePrice = product.sale_price ? 
    parseFloat(product.sale_price).toFixed(2) : null;

  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      style={[styles.container, style]}
    >
      <Card style={styles.card}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          {product.images && product.images.length > 0 ? (
            <Image
              style={styles.image}
              source={product.images[0].src}
              contentFit="contain"
              transition={200}
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>Geen afbeelding</Text>
            </View>
          )}
          
          {/* Sale badge */}
          {salePrice && (
            <View style={styles.saleBadge}>
              <Text style={styles.saleBadgeText}>SALE</Text>
            </View>
          )}
        </View>
        
        <Card.Content style={styles.content}>
          {/* SKU */}
          <Text style={styles.sku}>Art.nr: {product.sku}</Text>
          
          {/* Product Name */}
          <Text 
            style={styles.name} 
            numberOfLines={2} 
            ellipsizeMode="tail"
          >
            {product.name}
          </Text>
          
          {/* Price */}
          <View style={styles.priceContainer}>
            {salePrice ? (
              <>
                <Text style={styles.originalPrice}>€{regularPrice}</Text>
                <Text style={styles.salePrice}>€{salePrice}</Text>
              </>
            ) : (
              <Text style={styles.price}>€{regularPrice}</Text>
            )}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: 12,
  },
  card: {
    height: 220,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 120,
    backgroundColor: '#fff',
    position: 'relative',
  },
  image: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },
  placeholderImage: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
  placeholderText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  saleBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#E53935',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  saleBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    padding: 8,
    paddingTop: 10,
  },
  sku: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    height: 36,
    color: colors.text,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    marginRight: 6,
    color: colors.textSecondary,
  },
  salePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E53935',
  },
});

export default ProductCard;