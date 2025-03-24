// app/components/categories/CategoryCard.js
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { HeadingSmall, Caption } from '../common/Typography';
import Card from '../common/Card';
import { theme } from '../../styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Helper functie om het juiste pictogram voor elke categorie te krijgen
const getCategoryIcon = (categoryId) => {
  const iconMap = {
    elektrisch: 'tools', // Elektrisch gereedschap
    handgereedschap: 'hammer', // Handgereedschap
    meetinstrumenten: 'ruler', // Meetinstrumenten
    bevestigingsmaterialen: 'screwdriver', // Bevestigingsmaterialen
    accessoires: 'toolbox', // Accessoires
    beschermingsmiddelen: 'safety-goggles', // Persoonlijke beschermingsmiddelen
    // Voeg meer toe zoals nodig
  };

  // Fallback naar generiek gereedschapspictogram als niet gevonden
  return iconMap[categoryId] || 'tools';
};

// Helper functie om de juiste achtergrondkleur voor elke categorie te krijgen
const getCategoryColor = (categoryId) => {
  const colorMap = {
    elektrisch: theme.colors.categories.electric,
    handgereedschap: theme.colors.categories.hand,
    meetinstrumenten: theme.colors.categories.measure,
    bevestigingsmaterialen: theme.colors.categories.fixation,
    accessoires: theme.colors.categories.accessories,
    beschermingsmiddelen: theme.colors.categories.protection,
    // Voeg meer toe zoals nodig
  };

  // Fallback naar primaire kleur als niet gevonden
  return colorMap[categoryId] || theme.colors.primary;
};

const CategoryCard = ({ 
  category, 
  onPress, 
  size = 'medium',
  showProductCount = true,
  style
}) => {
  const { id, name, image, productCount } = category;
  
  // Bepaal stijlen op basis van de grootte
  const getCardSize = () => {
    switch(size) {
      case 'small':
        return {
          width: 100,
          height: 120,
          iconSize: 32,
          iconBox: 60,
        };
      case 'large':
        return {
          width: 160,
          height: 180,
          iconSize: 48,
          iconBox: 80,
        };
      case 'medium':
      default:
        return {
          width: 140,
          height: 150,
          iconSize: 40,
          iconBox: 70,
        };
    }
  };
  
  const sizeStyles = getCardSize();
  const categoryColor = getCategoryColor(id);
  const categoryIcon = getCategoryIcon(id);
  
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        { width: sizeStyles.width },
        style
      ]}
    >
      <Card elevation="sm" style={styles.card}>
        <View style={styles.contentContainer}>
          <View 
            style={[
              styles.iconContainer, 
              { 
                backgroundColor: `${categoryColor}20`, // 20% opaciteit
                width: sizeStyles.iconBox,
                height: sizeStyles.iconBox,
              }
            ]}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: sizeStyles.iconSize, height: sizeStyles.iconSize }}
                resizeMode="contain"
              />
            ) : (
              <MaterialCommunityIcons
                name={categoryIcon}
                size={sizeStyles.iconSize}
                color={categoryColor}
              />
            )}
          </View>
          
          <HeadingSmall 
            style={styles.title} 
            numberOfLines={2}
          >
            {name}
          </HeadingSmall>
          
          {showProductCount && productCount !== undefined && (
            <Caption style={styles.count}>
              {productCount} producten
            </Caption>
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
  contentContainer: {
    alignItems: 'center',
    padding: theme.spacing.sm,
  },
  iconContainer: {
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
    height: 40, // Fixed height for 2 lines of text
  },
  count: {
    textAlign: 'center',
    color: theme.colors.neutral500,
  },
});

export default CategoryCard;

// app/components/categories/CategoryList.js
import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { theme } from '../../styles';
import CategoryCard from './CategoryCard';
import { HeadingMedium, BodyMedium } from '../common/Typography';

const CategoryList = ({
  title,
  categories,
  onCategoryPress,
  horizontal = true,
  cardSize = 'medium',
  showProductCount = true,
  emptyText = 'Geen categorieën gevonden',
  style,
}) => {
  if (!categories || categories.length === 0) {
    return (
      <View style={[styles.emptyContainer, style]}>
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
        data={categories}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          horizontal ? styles.horizontalList : styles.verticalList,
        ]}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            onPress={() => onCategoryPress(item)}
            size={cardSize}
            showProductCount={showProductCount}
          />
        )}
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
    paddingHorizontal: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyContainer: {
    padding: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: theme.colors.neutral500,
    textAlign: 'center',
  },
});

export default CategoryList;

// app/components/categories/SubcategoryList.js
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { theme } from '../../styles';
import { BodyMedium, HeadingSmall, Caption } from '../common/Typography';
import { MaterialIcons } from '@expo/vector-icons';
import Divider from '../common/Divider';

const SubcategoryList = ({
  category,
  subcategories,
  onSubcategoryPress,
  initiallyExpanded = false,
  style,
}) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const [animation] = useState(new Animated.Value(initiallyExpanded ? 1 : 0));

  const toggleExpand = () => {
    const toValue = expanded ? 0 : 1;
    
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    
    setExpanded(!expanded);
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, subcategories.length * 50], // Ongeveer 50 hoogte per item
  });

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const animatedStyles = {
    height: heightInterpolate,
    opacity: animation,
    transform: [{ rotateX: rotateInterpolate }],
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity 
        style={styles.header} 
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <View style={styles.titleContainer}>
          <HeadingSmall>{category.name}</HeadingSmall>
          {category.productCount !== undefined && (
            <Caption style={styles.count}>
              {category.productCount} producten
            </Caption>
          )}
        </View>
        
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <MaterialIcons 
            name="keyboard-arrow-down" 
            size={24} 
            color={theme.colors.neutral700} 
          />
        </Animated.View>
      </TouchableOpacity>
      
      <Divider />
      
      <Animated.View style={[styles.subcategoriesContainer, animatedStyles]}>
        {subcategories.map((subcategory) => (
          <TouchableOpacity
            key={subcategory.id}
            style={styles.subcategoryItem}
            onPress={() => onSubcategoryPress(subcategory)}
            activeOpacity={0.7}
          >
            <BodyMedium>{subcategory.name}</BodyMedium>
            {subcategory.productCount !== undefined && (
              <Caption>
                {subcategory.productCount} producten
              </Caption>
            )}
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.neutral100,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    ...theme.shadow.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
  },
  titleContainer: {
    flex: 1,
  },
  count: {
    marginTop: 2,
  },
  subcategoriesContainer: {
    overflow: 'hidden',
  },
  subcategoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral200,
  },
});