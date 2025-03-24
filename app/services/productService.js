// app/services/productService.js
// Importeer categorieën data met fallback
let categoriesData, categoryHelpers;
try {
  const categoriesModule = require('./categoriesData');
  categoriesData = categoriesModule.categoriesData;
  categoryHelpers = categoriesModule.categoryHelpers;
} catch (e) {
  console.warn('Fout bij laden van categoriesData.js:', e);
  // Fallback basic data
  categoriesData = {
    categories: [],
    tags: [],
    filterOptions: {},
    campaignCategories: []
  };
  
  categoryHelpers = {
    getParentCategories: () => [],
    getSubcategories: () => [],
    getCategoryById: () => null,
    getActiveCampaigns: () => []
  };
}

// Mock products database
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Amwittools Professional Boormachine X1000',
    description: 'Krachtige boormachine voor professioneel gebruik met variabele snelheid en elektronische toerentalregeling.',
    price: 199.99,
    regular_price: '199.99',
    sale_price: null,
    sku: 'AM-X1000',
    stock_status: 'instock',
    images: [{ id: 1, src: 'https://via.placeholder.com/400x400?text=Boormachine+X1000', alt: 'Boormachine X1000' }],
    categories: [
      { id: 1, name: 'Elektrisch gereedschap', slug: 'elektrisch-gereedschap' },
      { id: 101, name: 'Boormachines', slug: 'boormachines' }
    ],
    tags: [1, 3, 5], // Draadloos, Professioneel gebruik, Populair
    brand: 'Amwittools',
    ratings: 4.8,
    attributes: [
      { id: 1, name: 'Voltage', options: ['18V'] },
      { id: 2, name: 'Koppel', options: ['60Nm'] }
    ]
  },
  {
    id: 2,
    name: 'Amwittools Elektrische Schroevendraaier Set',
    description: 'Complete set met verschillende opzetstukken voor diverse schroeven en bouten.',
    price: 89.50,
    regular_price: '99.50',
    sale_price: '89.50',
    sku: 'AM-SD-ELIT-200',
    stock_status: 'instock',
    images: [{ id: 2, src: 'https://via.placeholder.com/400x400?text=Schroevendraaier+Set', alt: 'Schroevendraaier Set' }],
    categories: [
      { id: 1, name: 'Elektrisch gereedschap', slug: 'elektrisch-gereedschap' }
    ],
    tags: [1, 2, 3], // Draadloos, Oplaadbaar, Professioneel gebruik
    brand: 'Amwittools',
    ratings: 4.5,
    attributes: [
      { id: 1, name: 'Voltage', options: ['12V'] },
      { id: 2, name: 'Aantal bits', options: ['12'] }
    ]
  },
  {
    id: 3,
    name: 'Amwittools Professionele Hamer 450g',
    description: 'Stevige hamer voor zware klussen met ergonomische anti-slip handgreep.',
    price: 45.99,
    regular_price: '45.99',
    sale_price: null,
    sku: 'AM-HM-PRO-500',
    stock_status: 'instock',
    images: [{ id: 3, src: 'https://via.placeholder.com/400x400?text=Hamer+450g', alt: 'Hamer 450g' }],
    categories: [
      { id: 2, name: 'Handgereedschap', slug: 'handgereedschap' },
      { id: 203, name: 'Hamer en beitel', slug: 'hamer-beitel' }
    ],
    tags: [3, 5], // Professioneel gebruik, Populair
    brand: 'Amwittools',
    ratings: 4.9,
    attributes: [
      { id: 1, name: 'Gewicht', options: ['450g'] },
      { id: 2, name: 'Materiaal', options: ['Gelegeerd staal, rubber handgreep'] }
    ]
  },
  {
    id: 4,
    name: 'Amwittools Schroevendraaier Set 12-delig',
    description: 'Professionele set schroevendraaiers met ergonomische handgrepen en geharde tips.',
    price: 39.95,
    regular_price: '49.95',
    sale_price: '39.95',
    sku: 'AM-SD-PRO-12',
    stock_status: 'instock',
    images: [{ id: 4, src: 'https://via.placeholder.com/400x400?text=Schroevendraaier+Set+12', alt: 'Schroevendraaier Set 12-delig' }],
    categories: [
      { id: 2, name: 'Handgereedschap', slug: 'handgereedschap' },
      { id: 201, name: 'Schroevendraaiers', slug: 'schroevendraaiers' }
    ],
    tags: [3], // Professioneel gebruik
    brand: 'Amwittools',
    ratings: 4.7,
    attributes: [
      { id: 1, name: 'Aantal delen', options: ['12'] },
      { id: 2, name: 'Type', options: ['Plat, Phillips, Torx'] }
    ]
  },
  {
    id: 5,
    name: 'Amwittools Digitale Schuifmaat 150mm',
    description: 'Nauwkeurige digitale schuifmaat van roestvrij staal met LCD-display.',
    price: 24.95,
    regular_price: '24.95',
    sale_price: null,
    sku: 'AM-DM-150',
    stock_status: 'instock',
    images: [{ id: 5, src: 'https://via.placeholder.com/400x400?text=Digitale+Schuifmaat', alt: 'Digitale Schuifmaat' }],
    categories: [
      { id: 3, name: 'Meetinstrumenten', slug: 'meetinstrumenten' }
    ],
    tags: [3, 6], // Professioneel gebruik, Nieuw in assortiment
    brand: 'Amwittools',
    ratings: 4.6,
    attributes: [
      { id: 1, name: 'Meetbereik', options: ['0-150mm'] },
      { id: 2, name: 'Nauwkeurigheid', options: ['0,01mm'] }
    ]
  },
  // Add more mock products as needed
];

export const productService = {
  // Get all products
  getAllProducts: async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        data: MOCK_PRODUCTS,
        error: null
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      return {
        data: [],
        error: 'Failed to fetch products'
      };
    }
  },
  
  // Search products with enhanced filtering
  searchProducts: async (query, filters = {}) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Base filtering: search in name, description, SKU, and brand
      let results = MOCK_PRODUCTS;
      
      if (query && query.trim() !== '') {
        const lowercaseQuery = query.toLowerCase().trim();
        results = results.filter(product => 
          product.name.toLowerCase().includes(lowercaseQuery) ||
          product.description.toLowerCase().includes(lowercaseQuery) ||
          product.sku.toLowerCase().includes(lowercaseQuery) ||
          product.brand.toLowerCase().includes(lowercaseQuery)
        );
      }
      
      // Apply category filter if provided
      if (filters.categoryId) {
        // Check if it's a parent category
        const category = categoryHelpers.getCategoryById(filters.categoryId);
        
        if (category) {
          if (category.isParent) {
            // For parent categories, include all products in this category or its subcategories
            const subcategories = categoryHelpers.getSubcategories(category.id);
            const subcategoryIds = subcategories.map(sub => sub.id);
            
            results = results.filter(product => 
              product.categories.some(cat => 
                cat.id === category.id || subcategoryIds.includes(cat.id)
              )
            );
          } else {
            // For subcategories, only include products in this specific subcategory
            results = results.filter(product => 
              product.categories.some(cat => cat.id === category.id)
            );
          }
        }
      }
      
      // Apply price range filter if provided
      if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
        results = results.filter(product => {
          const price = parseFloat(product.price);
          
          if (filters.priceMin !== undefined && filters.priceMax !== undefined) {
            return price >= filters.priceMin && price <= filters.priceMax;
          } else if (filters.priceMin !== undefined) {
            return price >= filters.priceMin;
          } else if (filters.priceMax !== undefined) {
            return price <= filters.priceMax;
          }
          
          return true;
        });
      }
      
      // Apply brand filter if provided
      if (filters.brand) {
        results = results.filter(product => 
          product.brand.toLowerCase() === filters.brand.toLowerCase()
        );
      }
      
      // Apply tag filter if provided
      if (filters.tagId) {
        results = results.filter(product => 
          product.tags && product.tags.includes(filters.tagId)
        );
      }
      
      // Apply rating filter if provided
      if (filters.minRating) {
        results = results.filter(product => 
          product.ratings >= filters.minRating
        );
      }
      
      return {
        data: results,
        error: null
      };
    } catch (error) {
      console.error('Search failed:', error);
      return {
        data: [],
        error: 'Search failed'
      };
    }
  },
  
  // Get featured products
  getFeaturedProducts: async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get products with the "Popular" tag (ID: 5)
      const featuredProducts = MOCK_PRODUCTS.filter(product => 
        product.tags && product.tags.includes(5)
      );
      
      return {
        data: featuredProducts.length > 0 ? featuredProducts : MOCK_PRODUCTS.slice(0, 4),
        error: null
      };
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return {
        data: [],
        error: 'Failed to fetch featured products'
      };
    }
  },
  
  // Get all categories with enhanced structure
  getCategories: async (parentOnly = false) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return either all categories or just parent categories
      const categories = parentOnly ? 
        categoryHelpers.getParentCategories() : 
        categoriesData.categories;
      
      return {
        data: categories,
        error: null
      };
    } catch (error) {
      console.error('Error fetching categories:', error);
      return {
        data: [],
        error: 'Failed to fetch categories'
      };
    }
  },
  
  // Get subcategories for a specific parent category
  getSubcategories: async (parentId) => {
    try {
      // Controleer of parentId bestaat en een geldig nummer is
      if (parentId === null || parentId === undefined) {
        console.warn('getSubcategories called with null/undefined parentId');
        return {
          data: [],
          error: null
        };
      }
      
      const parentIdNum = parseInt(parentId);
      if (isNaN(parentIdNum)) {
        console.warn(`getSubcategories called with invalid parentId: ${parentId}`);
        return {
          data: [],
          error: null
        };
      }
      
      // Simulate API delay (shorter for better UX)
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Zorg ervoor dat categoryHelpers bestaat en de getSubcategories functie heeft
      if (!categoryHelpers || typeof categoryHelpers.getSubcategories !== 'function') {
        console.error('categoryHelpers not properly initialized');
        return {
          data: [],
          error: 'Category helpers not available'
        };
      }
      
      // Haal subcategorieën op
      const subcategories = categoryHelpers.getSubcategories(parentIdNum);
      
      // Log resultaat voor debug
      console.log(`Found ${subcategories.length} subcategories for parent ${parentIdNum}`);
      
      return {
        data: subcategories,
        error: null
      };
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      return {
        data: [],
        error: 'Failed to fetch subcategories'
      };
    }
  },
  
  // Get product by ID
  getProductById: async (productId) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const productIdNum = parseInt(productId);
      const product = MOCK_PRODUCTS.find(p => p.id === productIdNum);
      
      if (!product) {
        throw new Error('Product not found');
      }
      
      return {
        data: product,
        error: null
      };
    } catch (error) {
      console.error('Error fetching product:', error);
      return {
        data: null,
        error: 'Failed to fetch product'
      };
    }
  },
  
  // Get filter options
  getFilterOptions: async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        data: categoriesData.filterOptions,
        error: null
      };
    } catch (error) {
      console.error('Error fetching filter options:', error);
      return {
        data: null,
        error: 'Failed to fetch filter options'
      };
    }
  },
  
  // Get active campaign categories
  getCampaignCategories: async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        data: categoryHelpers.getActiveCampaigns(),
        error: null
      };
    } catch (error) {
      console.error('Error fetching campaign categories:', error);
      return {
        data: [],
        error: 'Failed to fetch campaign categories'
      };
    }
  }
};