// app/components/products/ProductList.js
import React from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
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
  // Laadstatus
  if (isLoading && !products) {
    return (
      <View style={[styles.centeredContainer, style]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }
  
  // Foutstatus
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
  
  // Lege status
  if (!products || products.length === 0) {
    return (
      <View style={[styles.centeredContainer, style]}>
        <BodyMedium style={styles.emptyText}>{emptyText}</BodyMedium>
      </View>
    );
  }
  
  return (
    <View style={[styles.container, style]}>
      {title && <HeadingMedium style={styles.title}>{title}</HeadingMedium>}
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
          <ProductCard product={item} onPress={onProductPress} size={cardSize} />
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
