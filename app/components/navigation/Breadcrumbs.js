// app/components/navigation/Breadcrumbs.js
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../styles';
import { BodySmall } from '../common/Typography';

const Breadcrumbs = ({ 
  items, 
  style, 
  maxVisible = 3, 
  showHome = true,
}) => {
  const navigation = useNavigation();
  
  if (!items || items.length === 0) {
    return null;
  }
  
  // Als er te veel items zijn, comprimeer ze
  let displayItems = [...items];
  if (displayItems.length > maxVisible) {
    const firstItem = displayItems[0];
    const lastItems = displayItems.slice(displayItems.length - (maxVisible - 1));
    
    displayItems = [
      firstItem,
      { name: '...', isEllipsis: true },
      ...lastItems,
    ];
  }
  
  const handlePress = (item, index) => {
    if (item.isEllipsis || index === displayItems.length - 1) {
      return;
    }
    
    if (item.path) {
      navigation.navigate(item.path, item.params);
    }
  };
  
  return (
    <View style={[styles.container, style]}>
      {/* Home icon if needed */}
      {showHome && (
        <TouchableOpacity 
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.7}
        >
          <MaterialIcons 
            name="home" 
            size={16} 
            color={theme.colors.primary} 
          />
        </TouchableOpacity>
      )}
      
      {/* Breadcrumb items */}
      {displayItems.map((item, index) => {
        const isLast = index === displayItems.length - 1;
        const isClickable = !isLast && !item.isEllipsis && item.path;
        
        return (
          <View key={`${item.name}-${index}`} style={styles.itemContainer}>
            {/* Separator, except for first item */}
            {index > 0 && (
              <MaterialIcons 
                name="chevron-right" 
                size={16} 
                color={theme.colors.neutral500} 
                style={styles.separator}
              />
            )}
            
            {/* Item text */}
            <TouchableOpacity
              disabled={!isClickable}
              onPress={() => handlePress(item, index)}
              activeOpacity={0.7}
              style={styles.item}
            >
              <BodySmall
                style={[
                  styles.text,
                  isLast ? styles.activeText : (isClickable ? styles.linkText : {}),
                ]}
                numberOfLines={1}
              >
                {item.name}
              </BodySmall>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  homeButton: {
    marginRight: theme.spacing.xs,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    paddingVertical: theme.spacing.xs,
  },
  separator: {
    marginHorizontal: 4,
  },
  text: {
    color: theme.colors.neutral600,
    fontSize: theme.typography.fontSize.sm,
  },
  linkText: {
    color: theme.colors.primary,
  },
  activeText: {
    color: theme.colors.neutral800,
    fontFamily: theme.typography.fontFamily.medium,
  },
});

export default Breadcrumbs;

// app/components/navigation/TabBar.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../styles';
import { Caption } from '../common/Typography';

// Helper functie om het juiste pictogram voor elke route te krijgen
const getTabIcon = (routeName) => {
  const iconMap = {
    Home: 'home',
    Categories: 'category',
    Search: 'search',
    Account: 'person',
    Cart: 'shopping-cart',
    // Voeg meer toe zoals nodig
  };

  return iconMap[routeName] || 'circle';
};

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;
        
        const icon = getTabIcon(route.name);
        
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <View style={styles.tabContent}>
              <MaterialIcons
                name={icon}
                size={24}
                color={isFocused ? theme.colors.primary : theme.colors.neutral500}
              />
              <Caption 
                style={[
                  styles.label,
                  isFocused ? styles.labelFocused : styles.labelInactive,
                ]}
              >
                {label}
              </Caption>
              
              {/* Indicator line for active tab */}
              {isFocused && <View style={styles.indicator} />}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: theme.colors.neutral100,
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral300,
    ...theme.shadow.md,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    alignItems: 'center',
    position: 'relative',
    paddingTop: 8,
    width: '100%',
  },
  label: {
    marginTop: 2,
    fontSize: theme.typography.fontSize.xs,
  },
  labelFocused: {
    color: theme.colors.primary,
    fontFamily: theme.typography.fontFamily.medium,
  },
  labelInactive: {
    color: theme.colors.neutral500,
  },
  indicator: {
    position: 'absolute',
    top: -8,
    width: '60%',
    height: 3,
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: theme.borderRadius.sm,
    borderBottomRightRadius: theme.borderRadius.sm,
  },
});

export default TabBar;

// app/components/navigation/Header.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../styles';
import { HeadingMedium } from '../common/Typography';
import SearchBar from '../common/SearchBar';

const Header = ({ 
  title, 
  showBack = true,
  showSearch = false,
  showCart = true,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  style,
}) => {
  const navigation = useNavigation();
  
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.iconButton}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            activeOpacity={0.7}
          >
            <MaterialIcons 
              name="arrow-back" 
              size={24} 
              color={theme.colors.neutral100} 
            />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.centerContainer}>
        {showSearch ? (
          <SearchBar
            placeholder="Zoeken..."
            value={searchValue}
            onChangeText={onSearchChange}
            onSubmitEditing={onSearchSubmit}
            style={styles.searchBar}
          />
        ) : (
          <HeadingMedium style={styles.title} numberOfLines={1}>
            {title}
          </HeadingMedium>
        )}
      </View>
      
      <View style={styles.rightContainer}>
        {showCart && (
          <TouchableOpacity 
            onPress={() => navigation.navigate('Cart')} 
            style={styles.iconButton}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            activeOpacity={0.7}
          >
            <MaterialIcons 
              name="shopping-cart" 
              size={24} 
              color={theme.colors.neutral100} 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 88 : 56,
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    ...theme.shadow.md,
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    color: theme.colors.neutral100,
    textAlign: 'center',
  },
  iconButton: {
    padding: 4,
  },
  searchBar: {
    width: '100%',
    height: 40,
  },
});

export default Header;

// app/navigation/AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import SearchScreen from '../screens/SearchScreen';
import AccountScreen from '../screens/AccountScreen';
import CategoryProductsScreen from '../screens/CategoryProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';

// Components
import TabBar from '../components/navigation/TabBar';
import Header from '../components/navigation/Header';

// Theme
import { theme } from '../styles';

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for categories flow
const CategoriesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <Stack.Screen 
        name="CategoriesList" 
        component={CategoriesScreen}
        options={{
          title: 'Categorieën',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="CategoryProducts" 
        component={CategoryProductsScreen}
        options={({ route }) => ({
          title: route.params?.categoryName || 'Producten',
          headerShown: false,
        })}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params?.productName || 'Product',
        })}
      />
    </Stack.Navigator>
  );
};

// Stack navigator for search flow
const SearchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Header {...props} showSearch={true} />,
      }}
    >
      <Stack.Screen 
        name="SearchResults" 
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params?.productName || 'Product',
          showSearch: false,
        })}
      />
    </Stack.Navigator>
  );
};

// Stack navigator for account flow
const AccountStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <Stack.Screen 
        name="AccountMain" 
        component={AccountScreen}
        options={{
          title: 'Mijn Account',
        }}
      />
    </Stack.Navigator>
  );
};

// Stack navigator for home flow
const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen}
        options={{
          title: 'Amwittools',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params?.productName || 'Product',
        })}
      />
      <Stack.Screen 
        name="CategoryProducts" 
        component={CategoryProductsScreen}
        options={({ route }) => ({
          title: route.params?.categoryName || 'Producten',
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};

// Main app navigator with tabs
const AppNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Categories" 
        component={CategoriesStack}
        options={{
          tabBarLabel: 'Categorieën',
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchStack}
        options={{
          tabBarLabel: 'Zoeken',
        }}
      />
      <Tab.Screen 
        name="Account" 
        component={AccountStack}
        options={{
          tabBarLabel: 'Account',
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;