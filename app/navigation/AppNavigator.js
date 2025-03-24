// app/navigation/AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../themes/theme';

// Screens
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryProductsScreen from '../screens/CategoryProductsScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigation for search
const SearchStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '500',
      },
    }}
  >
    <Stack.Screen 
      name="SearchMain" 
      component={SearchScreen} 
      options={{ 
        title: 'Zoeken',
        headerShown: false 
      }} 
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

// Stack navigation for products (Home)
const ProductsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '500',
      },
    }}
  >
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ 
        headerShown: false 
      }}
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

// Stack navigation for categories
const CategoriesStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '500',
      },
    }}
  >
    <Stack.Screen 
      name="Categories" 
      component={CategoriesScreen} 
      options={{ 
        headerShown: false 
      }}
    />
    <Stack.Screen 
      name="CategoryProducts" 
      component={CategoryProductsScreen} 
      options={{ 
        headerShown: false
      }}
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

// Main tab navigation
const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SearchTab') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'CategoriesTab') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'AccountTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopColor: colors.border,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={ProductsStack} 
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="SearchTab" 
        component={SearchStack} 
        options={{ title: 'Zoeken' }}
      />
      <Tab.Screen 
        name="CategoriesTab" 
        component={CategoriesStack} 
        options={{ title: 'Categorieën' }}
      />
      <Tab.Screen 
        name="AccountTab" 
        component={AccountScreen} 
        options={{ title: 'Account' }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;