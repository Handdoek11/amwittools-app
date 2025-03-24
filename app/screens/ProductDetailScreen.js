// app/screens/ProductDetailScreen.js
import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  Text, 
  ActivityIndicator,
  useWindowDimensions,
  TouchableOpacity
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { Card, Button, Divider, Chip } from 'react-native-paper';
import { productService } from '../services/productService';
import RenderHtml from 'react-native-render-html';
import { colors } from '../themes/theme';

const ProductDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const { productId } = route.params;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Fetch product data
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productService.getProductById(productId),
    staleTime: 10 * 60 * 1000, // 10 minutes cache
  });
  
  const product = data?.data;
  
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loaderText}>Product laden...</Text>
      </View>
    );
  }
  
  if (error || !product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Er is een fout opgetreden bij het laden van het product.
        </Text>
        <Button 
          mode="contained" 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          Terug
        </Button>
      </View>
    );
  }
  
  // Get prices with tax
  const regularPrice = product.regular_price ? 
    parseFloat(product.regular_price).toFixed(2) : null;
  const salePrice = product.sale_price ? 
    parseFloat(product.sale_price).toFixed(2) : null;
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Product image gallery */}
      <Card style={styles.imageCard}>
        {product.images && product.images.length > 0 ? (
          <>
            <Image
              style={styles.mainImage}
              source={product.images[selectedImageIndex]?.src}
              contentFit="contain"
              transition={200}
            />
            
            {product.images.length > 1 && (
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.thumbnailContainer}
              >
                {product.images.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedImageIndex(index)}
                    style={[
                      styles.thumbnailButton,
                      index === selectedImageIndex && styles.selectedThumbnail
                    ]}
                  >
                    <Image
                      style={styles.thumbnail}
                      source={image.src}
                      contentFit="contain"
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </>
        ) : (
          <View style={styles.noImageContainer}>
            <Text style={styles.noImageText}>Geen afbeelding beschikbaar</Text>
          </View>
        )}
      </Card>
      
      {/* Product info section */}
      <Card style={styles.infoCard}>
        <Card.Content>
          <Text style={styles.sku}>Artikelnr: {product.sku}</Text>
          <Text style={styles.productName}>{product.name}</Text>
          
          {/* Price display */}
          <View style={styles.priceContainer}>
            {salePrice ? (
              <>
                <Text style={styles.oldPrice}>€{regularPrice}</Text>
                <Text style={styles.salePrice}>€{salePrice}</Text>
              </>
            ) : (
              <Text style={styles.price}>€{regularPrice}</Text>
            )}
          </View>
          
          {/* Product attributes */}
          <View style={styles.attributesContainer}>
            {product.attributes && product.attributes.map(attr => (
              <View key={attr.id} style={styles.attributeRow}>
                <Text style={styles.attributeName}>{attr.name}:</Text>
                <Text style={styles.attributeValue}>
                  {attr.options.join(', ')}
                </Text>
              </View>
            ))}
          </View>
          
          {/* Product description */}
          <Divider style={styles.divider} />
          <Text style={styles.sectionTitle}>Productbeschrijving</Text>
          {product.description ? (
            <RenderHtml 
              source={{ html: product.description }} 
              contentWidth={width - 32}
              baseStyle={styles.description}
              tagsStyles={{
                p: { marginBottom: 10, lineHeight: 20 },
                li: { marginBottom: 5 },
                h2: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
                h3: { fontSize: 16, fontWeight: 'bold', marginVertical: 8 },
              }}
            />
          ) : (
            <Text style={styles.noDescriptionText}>
              Geen beschrijving beschikbaar
            </Text>
          )}
          
          {/* Categories */}
          {product.categories && product.categories.length > 0 && (
            <View style={styles.categoriesContainer}>
              <Text style={styles.sectionTitle}>Categorieën</Text>
              <View style={styles.chipContainer}>
                {product.categories.map(category => (
                  <Chip 
                    key={category.id} 
                    style={styles.chip}
                    mode="outlined"
                  >
                    {category.name}
                  </Chip>
                ))}
              </View>
            </View>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginTop: 10,
  },
  imageCard: {
    margin: 8,
    elevation: 2,
    backgroundColor: '#fff',
  },
  mainImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
  },
  thumbnailContainer: {
    padding: 8,
  },
  thumbnailButton: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: 2,
  },
  selectedThumbnail: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  noImageContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  noImageText: {
    color: '#666',
    fontSize: 16,
  },
  infoCard: {
    margin: 8,
    marginTop: 0,
    elevation: 2,
    backgroundColor: '#fff',
  },
  sku: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  oldPrice: {
    fontSize: 18,
    color: '#666',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  salePrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e53935',
  },
  attributesContainer: {
    marginTop: 10,
  },
  attributeRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  attributeName: {
    fontSize: 14,
    fontWeight: '500',
    width: 120,
  },
  attributeValue: {
    fontSize: 14,
    flex: 1,
  },
  divider: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    lineHeight: 20,
    color: '#333',
  },
  noDescriptionText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  categoriesContainer: {
    marginTop: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 4,
  },
});

export default ProductDetailScreen;