// app/services/productService.js
import { mockApi } from './api';

// Mock producten database
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Professionele Boormachine X1000',
    description: 'Krachtige boormachine voor professioneel gebruik',
    price: 199.99,
    category: 'Gereedschap',
    articleNumber: 'BM-X1000',
    brand: 'PowerTech',
    imageUrl: 'https://example.com/boormachine.jpg'
  },
  {
    id: 2,
    name: 'Elektrische Schroevendraaier Set',
    description: 'Complete set met verschillende opzetstukken',
    price: 89.50,
    category: 'Elektrisch Gereedschap',
    articleNumber: 'SD-ELIT-200',
    brand: 'SmartDrill',
    imageUrl: 'https://example.com/schroevendraaier.jpg'
  },
  {
    id: 3,
    name: 'Professionele Hamer',
    description: 'Stevige hamer voor zware klussen',
    price: 45.99,
    category: 'Handgereedschap',
    articleNumber: 'HM-PRO-500',
    brand: 'SteelCraft',
    imageUrl: 'https://example.com/hamer.jpg'
  },
  // Voeg meer mock producten toe...
];

export const productService = {
  // Bestaande methodes...
  
  // Nieuwe zoekfunctie
  searchProducts: async (query) => {
    try {
      // Simuleer API-vertraging
      await new Promise(resolve => setTimeout(resolve, 500));

      // Zoekmethode: zoek in naam, beschrijving, artikelnummer en merk
      const lowercaseQuery = query.toLowerCase().trim();
      const results = MOCK_PRODUCTS.filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.articleNumber.toLowerCase().includes(lowercaseQuery) ||
        product.brand.toLowerCase().includes(lowercaseQuery)
      );

      return {
        data: results,
        error: null
      };
    } catch (error) {
      console.error('Zoeken mislukt:', error);
      return {
        data: [],
        error: 'Zoeken mislukt'
      };
    }
  },

  // Andere bestaande methodes zoals getFeaturedProducts, getCategories, etc.
  getFeaturedProducts: async () => {
    try {
      // Simuleer API-vertraging
      await new Promise(resolve => setTimeout(resolve, 500));

      // Retourneer eerste 4 producten als uitgelichte producten
      return {
        data: MOCK_PRODUCTS.slice(0, 4),
        error: null
      };
    } catch (error) {
      console.error('Ophalen uitgelichte producten mislukt:', error);
      return {
        data: [],
        error: 'Ophalen producten mislukt'
      };
    }
  },

  getCategories: async () => {
    try {
      // Simuleer API-vertraging
      await new Promise(resolve => setTimeout(resolve, 500));

      // Unieke categorieën uit de producten halen
      const categories = [...new Set(MOCK_PRODUCTS.map(product => product.category))];

      return {
        data: categories.map((name, index) => ({
          id: index + 1,
          name: name
        })),
        error: null
      };
    } catch (error) {
      console.error('Ophalen categorieën mislukt:', error);
      return {
        data: [],
        error: 'Ophalen categorieën mislukt'
      };
    }
  }
};