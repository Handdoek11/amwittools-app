// app/components/products/ProductCard.js
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../styles';
import Card from '../common/Card';
import { HeadingSmall, BodySmall, Price, Discount, Caption } from '../common/Typography';
import Badge from '../common/Badge';

const ProductCard = ({ product, onPress, size = 'medium', style }) => {
  const { id, name, brand, price, originalPrice, image, inStock, isNew, onSale, rating } = product;

  // Bereken het kortingspercentage
  const discountPercentage = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  
  // Bepaal de grootte van de card op basis van de 'size'-prop
  const getCardSize = () => {
    switch (size) {
      case 'small':
        return { width: 140, imageHeight: 100 };
      case 'large':
        return { width: 200, imageHeight: 160 };
      case 'medium':
      default:
        return { width: 170, imageHeight: 130 };
    }
  };
  
  const sizeStyles = getCardSize();
  
  return (
    <TouchableOpacity
      onPress={() => onPress(product)}
      activeOpacity={0.7}
      style={[styles.container, { width: sizeStyles.width }, style]}
    >
      <Card elevation="sm" style={styles.card}>
        {/* Product Image Container */}
        <View style={[styles.imageContainer, { height: sizeStyles.imageHeight }]}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
          ) : (
            <View style={styles.noImageContainer}>
              <MaterialCommunityIcons name="image-off" size={32} color={theme.colors.neutral400} />
            </View>
          )}
          
          {/* Badges */}
          <View style={styles.badgesContainer}>
            {isNew && <Badge label="Nieuw" color={theme.colors.info} style={styles.badge} />}
            {onSale && discountPercentage > 0 && (
              <Badge label={`-${discountPercentage}%`} color={theme.colors.secondary} style={styles.badge} />
            )}
            {!inStock && <Badge label="Niet op voorraad" color={theme.colors.error} style={styles.badge} />}
          </View>
        </View>
        
        {/* Product Info */}
        <View style={styles.infoContainer}>
          {brand && <Caption style={styles.brand}>{brand}</Caption>}
          <HeadingSmall style={styles.name} numberOfLines={2}>{name}</HeadingSmall>
          {/* Prijsinformatie */}
          <View style={styles.priceContainer}>
            <Price>{`€ ${price.toFixed(2)}`}</Price>
            {originalPrice && originalPrice > price && (
              <Discount style={styles.originalPrice}>{`€ ${originalPrice.toFixed(2)}`}</Discount>
            )}
          </View>
          {/* Rating */}
          {rating && (
            <View style={styles.ratingContainer}>
              <MaterialCommunityIcons name="star" size={16} color={theme.colors.warning} />
              <BodySmall style={styles.ratingText}>{rating.toFixed(1)}</BodySmall>
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: theme.spacing.xs,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    backgroundColor: theme.colors.neutral200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  noImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgesContainer: {
    position: 'absolute',
    top: theme.spacing.xs,
    left: theme.spacing.xs,
  },
  badge: {
    marginBottom: theme.spacing.xs,
  },
  infoContainer: {
    padding: theme.spacing.sm,
  },
  brand: {
    marginBottom: 2,
  },
  name: {
    marginBottom: theme.spacing.xs,
    height: 40, // Vaste hoogte voor 2 regels tekst
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  originalPrice: {
    marginLeft: theme.spacing.xs,
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    color: theme.colors.neutral600,
  },
});

export default ProductCard;
