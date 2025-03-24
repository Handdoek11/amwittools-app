// app/navigation/navigationUtils.js
import { CommonActions } from '@react-navigation/native';

/**
 * Utilities for consistent navigation across the app
 */
export const AppNavigation = {
  /**
   * Navigate to product detail screen
   * @param {object} navigation - Navigation object
   * @param {object} product - Product object with id and name
   */
  navigateToProduct: (navigation, product) => {
    if (!product || !product.id) {
      console.warn('Cannot navigate to product: Invalid product data');
      return;
    }
    
    navigation.navigate('ProductDetail', {
      productId: product.id,
      productName: product.name || 'Product Details'
    });
  },
  
  /**
   * Navigate to category products screen
   * @param {object} navigation - Navigation object
   * @param {object} category - Category object with id, name, and type
   */
  navigateToCategory: (navigation, category) => {
    if (!category || !category.id) {
      console.warn('Cannot navigate to category: Invalid category data');
      return;
    }
    
    navigation.navigate('CategoryProducts', {
      categoryId: category.id,
      categoryName: category.name || 'Category',
      categoryType: category.isParent ? 'main' : 'sub',
      parentCategoryId: category.parentId
    });
  },
  
  /**
   * Navigate to search screen with query
   * @param {object} navigation - Navigation object
   * @param {string} query - Search query
   */
  navigateToSearch: (navigation, query = '') => {
    navigation.navigate('SearchTab', {
      screen: 'SearchMain',
      params: { initialQuery: query }
    });
  },
  
  /**
   * Navigate to home screen and reset stack
   * @param {object} navigation - Navigation object
   */
  navigateToHome: (navigation) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'HomeTab' }]
      })
    );
  },
  
  /**
   * Navigate to account screen
   * @param {object} navigation - Navigation object
   */
  navigateToAccount: (navigation) => {
    navigation.navigate('AccountTab');
  },
  
  /**
   * Go back or navigate home if can't go back
   * @param {object} navigation - Navigation object
   */
  goBackOrHome: (navigation) => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      AppNavigation.navigateToHome(navigation);
    }
  }
};

export default AppNavigation;