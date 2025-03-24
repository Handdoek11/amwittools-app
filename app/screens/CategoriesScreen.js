// app/screens/CategoriesScreen.js
import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Card } from 'react-native-paper';
import { Image } from 'expo-image';
import { productService } from '../services/productService';
import { colors } from '../themes/theme';
import { useNavigation } from '@react-navigation/native';

const CategoriesScreen = () => {
  const navigation = useNavigation();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => productService.getCategories(),
  });

  const categories = data?.data || [];

  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryProducts', {
      categoryId: category.id,
      categoryName: category.name,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleCategoryPress(item)}
      activeOpacity={0.7}
      style={styles.categoryItem}
    >
      <Card style={styles.card}>
        {item.image ? (
          <Image
            style={styles.categoryImage}
            source={item.image.src}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <View style={[styles.categoryImage, styles.placeholderImage]} />
        )}
        <View style={styles.overlay} />
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{item.name}</Text>
          <Text style={styles.categoryCount}>{item.count} producten</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categorieën</Text>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Categorieën laden...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Er is een fout opgetreden bij het laden van de categorieën.
          </Text>
        </View>
      ) : (
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.categoriesList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Geen categorieën gevonden
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  categoriesList: {
    padding: 16,
  },
  categoryItem: {
    marginBottom: 16,
  },
  card: {
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f5f5f5',
  },
  placeholderImage: {
    backgroundColor: '#e0e0e0',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  categoryInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CategoriesScreen;