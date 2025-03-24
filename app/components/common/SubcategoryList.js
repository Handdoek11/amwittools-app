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

export default SubcategoryList;