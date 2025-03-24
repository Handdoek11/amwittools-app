import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '../common/Card';
import { HeadingSmall, Caption } from '../common/Typography';
import { theme } from '../../styles';

// Helper functies
const getCategoryIcon = (categoryId) => {
  const iconMap = {
    elektrisch: 'tools',
    handgereedschap: 'hammer',
    meetinstrumenten: 'ruler',
    bevestigingsmaterialen: 'screwdriver',
    accessoires: 'toolbox',
    beschermingsmiddelen: 'safety-goggles',
  };

  return iconMap[categoryId] || 'tools';
};

const getCategoryColor = (categoryId) => {
  const colorMap = {
    elektrisch: theme.colors.categories.electric,
    handgereedschap: theme.colors.categories.hand,
    meetinstrumenten: theme.colors.categories.measure,
    bevestigingsmaterialen: theme.colors.categories.fixation,
    accessoires: theme.colors.categories.accessories,
    beschermingsmiddelen: theme.colors.categories.protection,
  };

  return colorMap[categoryId] || theme.colors.primary;
};

// Definieer de CategoryCard component als een functionele component
const CategoryCard = ({ category, onPress, size = 'medium', style, showProductCount = true }) => {
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
      style={[styles.container, { width: sizeStyles.width }, style]}
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
          
          <HeadingSmall style={styles.title} numberOfLines={2}>
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
    height: 40, // Vaste hoogte voor 2 regels tekst
  },
  count: {
    textAlign: 'center',
    color: theme.colors.neutral500,
  },
});

export default CategoryCard;
