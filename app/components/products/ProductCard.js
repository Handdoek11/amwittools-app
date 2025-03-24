// app/components/products/ProductCard.js
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../../styles';
import Card from '../common/Card';
import { HeadingSmall, BodySmall, Price, Discount, Caption } from '../common/Typography';
import Badge from '../common/Badge';

const ProductCard = ({
  product,
  onPress,
  size = 'medium',
  style,
}) => {
  const {
    id,
    name,
    brand,
    price,
    originalPrice,
    image,
    inStock,
    isNew,
    onSale,
    rating,
  } = product;

  // Berekenen van korting percentage
  const discountPercentage = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  
  // Bepaal stijlen op basis van de grootte
  const getCardSize = () => {
    switch(size) {
      case 'small':
        return {
          width: 140,
          imageHeight: 100,
        };
      case 'large':
        return {
          width: 200,
          imageHeight: 160,
        };
      case 'medium':
      default:
        return {
          width: 170,
          imageHeight: 130,
        };
    }
  };
  
  const sizeStyles = getCardSize();
  
  return (
    <TouchableOpacity
      onPress={() => onPress(product)}
      activeOpacity={0.7}
      style={[
        styles.container,
        { width: sizeStyles.width },
        style
      ]}
    >
      <Card elevation="sm" style={styles.card}>
        {/* Product Image Container */}
        <View style={[styles.imageContainer, { height: sizeStyles.imageHeight }]}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.noImageContainer}>
              <MaterialCommunityIcons
                name="image-off"
                size={32}
                color={theme.colors.neutral400}
              />
            </View>
          )}
          
          {/* Badges */}
          <View style={styles.badgesContainer}>
            {isNew && (
              <Badge label="Nieuw" color={theme.colors.info} style={styles.badge} />
            )}
            
            {onSale && discountPercentage > 0 && (
              <Badge 
                label={`-${discountPercentage}%`} 
                color={theme.colors.secondary} 
                style={styles.badge} 
              />
            )}
            
            {!inStock && (
              <Badge 
                label="Niet op voorraad" 
                color={theme.colors.error} 
                style={styles.badge} 
              />
            )}
          </View>
        </View>
        
        {/* Product Info */}
        <View style={styles.infoContainer}>
          {brand && (
            <Caption style={styles.brand}>{brand}</Caption>
          )}
          
          <HeadingSmall 
            style={styles.name} 
            numberOfLines={2}
          >
            {name}
          </HeadingSmall>
          
          {/* Price info */}
          <View style={styles.priceContainer}>
            <Price>{`€ ${price.toFixed(2)}`}</Price>
            
            {originalPrice && originalPrice > price && (
              <Discount style={styles.originalPrice}>
                {`€ ${originalPrice.toFixed(2)}`}
              </Discount>
            )}
          </View>
          
          {/* Rating */}
          {rating && (
            <View style={styles.ratingContainer}>
              <MaterialCommunityIcons
                name="star"
                size={16}
                color={theme.colors.warning}
              />
              <BodySmall style={styles.ratingText}>
                {rating.toFixed(1)}
              </BodySmall>
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
    height: 40, // Fixed height for 2 lines of text
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

// app/components/products/ProductList.js
import { theme } from '../../styles';
import ProductCard from './ProductCard';
import { BodyMedium, HeadingMedium } from '../common/Typography';
import Button from '../common/Button';

const ProductList = ({
  title,
  products,
  onProductPress,
  isLoading,
  isError,
  errorMessage,
  onRetry,
  horizontal = true,
  cardSize = 'medium',
  emptyText = 'Geen producten gevonden',
  style,
  contentContainerStyle,
  numColumns = 2,
  onEndReached,
  onEndReachedThreshold = 0.5,
  ListFooterComponent,
  showsVerticalScrollIndicator = true,
}) => {
  // Render loading state
  if (isLoading && !products) {
    return (
      <View style={[styles.centeredContainer, style]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }
  
  // Render error state
  if (isError) {
    return (
      <View style={[styles.centeredContainer, style]}>
        <BodyMedium style={styles.errorText}>
          {errorMessage || 'Er is een fout opgetreden bij het laden van de producten.'}
        </BodyMedium>
        {onRetry && (
          <Button 
            title="Opnieuw proberen" 
            onPress={onRetry} 
            variant="secondary"
            size="small"
            style={styles.retryButton}
          />
        )}
      </View>
    );
  }
  
  // Render empty state
  if (!products || products.length === 0) {
    return (
      <View style={[styles.centeredContainer, style]}>
        <BodyMedium style={styles.emptyText}>{emptyText}</BodyMedium>
      </View>
    );
  }
  
  return (
    <View style={[styles.container, style]}>
      {title && (
        <HeadingMedium style={styles.title}>{title}</HeadingMedium>
      )}
      
      <FlatList
        data={products}
        horizontal={horizontal}
        numColumns={horizontal ? 1 : numColumns}
        key={horizontal ? 'horizontal' : `vertical-${numColumns}`}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          horizontal ? styles.horizontalList : styles.verticalList,
          contentContainerStyle,
        ]}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={onProductPress}
            size={cardSize}
          />
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  title: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  horizontalList: {
    paddingHorizontal: theme.spacing.sm,
  },
  verticalList: {
    padding: theme.spacing.sm,
  },
  centeredContainer: {
    padding: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,
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
  retryButton: {
    marginTop: theme.spacing.sm,
  },
});

export default ProductList;

// app/components/common/Badge.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../styles';
import { BodySmall } from './Typography';

const Badge = ({ 
  label, 
  color = theme.colors.primary, 
  textColor,
  style,
}) => {
  return (
    <View style={[
      styles.container, 
      { backgroundColor: color },
      style,
    ]}>
      <BodySmall style={[
        styles.text,
        { color: textColor || theme.colors.neutral100 },
      ]}>
        {label}
      </BodySmall>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.medium,
  },
});

export default Badge;

// app/components/common/SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../styles';

const SearchBar = ({
  placeholder = 'Zoeken...',
  value,
  onChangeText,
  onSubmitEditing,
  onClear,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <MaterialIcons
        name="search"
        size={24}
        color={theme.colors.neutral500}
        style={styles.searchIcon}
      />
      
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.neutral500}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      {value ? (
        <TouchableOpacity 
          onPress={() => {
            if (onClear) {
              onClear();
            } else if (onChangeText) {
              onChangeText('');
            }
          }}
          style={styles.clearButton}
        >
          <MaterialIcons
            name="close"
            size={20}
            color={theme.colors.neutral500}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.neutral100,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.sm,
  },
  searchIcon: {
    marginRight: theme.spacing.xs,
  },
  input: {
    flex: 1,
    height: '100%',
    color: theme.colors.neutral800,
    fontSize: theme.typography.fontSize.md,
    fontFamily: theme.typography.fontFamily.regular,
  },
  clearButton: {
    padding: theme.spacing.xs,
  },
});

export default SearchBar;