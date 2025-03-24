// app/components/categories/CategoryList.js
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

const CategoryList = ({ /* your props */ }) => {
  // Component logic
};

export default CategoryList;