// app/services/mockDataService.js

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock image generator
const generateProductImages = (id, count = 1) => {
  const images = [];
  for (let i = 0; i < count; i++) {
    images.push({
      id: id * 10 + i,
      src: `https://via.placeholder.com/400x400?text=Product+${id}+Image+${i + 1}`,
      name: `Product ${id} Image ${i + 1}`,
      alt: `Product ${id} image ${i + 1}`
    });
  }
  return images;
};

// Categories with proper structure
export const CATEGORIES = [
  {
    id: 1,
    name: "Electric Tools",
    slug: "electric-tools",
    description: "Professional electric tools for craftsmen",
    image: { src: "https://via.placeholder.com/400x200?text=Electric+Tools" },
    productCount: 42,
    isParent: true,
    parentId: null
  },
  {
    id: 2,
    name: "Hand Tools",
    slug: "hand-tools",
    description: "High-quality hand tools for professionals",
    image: { src: "https://via.placeholder.com/400x200?text=Hand+Tools" },
    productCount: 65,
    isParent: true,
    parentId: null
  },
  {
    id: 3,
    name: "Measuring Instruments",
    slug: "measuring-instruments",
    description: "Precision measuring instruments for every craftsman",
    image: { src: "https://via.placeholder.com/400x200?text=Measuring+Instruments" },
    productCount: 28,
    isParent: true,
    parentId: null
  },
  // Subcategories for Electric Tools
  {
    id: 101,
    name: "Drills",
    slug: "drills",
    description: "Professional drills",
    image: { src: "https://via.placeholder.com/400x200?text=Drills" },
    productCount: 15,
    isParent: false,
    parentId: 1
  },
  {
    id: 102,
    name: "Sanders",
    slug: "sanders",
    description: "Sanders for various applications",
    image: { src: "https://via.placeholder.com/400x200?text=Sanders" },
    productCount: 8,
    isParent: false,
    parentId: 1
  },
  // Subcategories for Hand Tools
  {
    id: 201,
    name: "Screwdrivers",
    slug: "screwdrivers",
    description: "Professional screwdrivers",
    image: { src: "https://via.placeholder.com/400x200?text=Screwdrivers" },
    productCount: 20,
    isParent: false,
    parentId: 2
  },
  {
    id: 202,
    name: "Wrenches",
    slug: "wrenches",
    description: "Spanners, hex keys and more",
    image: { src: "https://via.placeholder.com/400x200?text=Wrenches" },
    productCount: 25,
    isParent: false,
    parentId: 2
  }
];

// Products with consistent structure
export const PRODUCTS = [
  {
    id: 1,
    name: "Amwittools Professional Drill X1000",
    slug: "amwittools-professional-drill-x1000",
    description: "<p>Powerful drill for professional use with variable speed and electronic speed control.</p><h3>Specifications</h3><ul><li>1200W motor</li><li>13mm chuck</li><li>Variable speed: 0-2800 rpm</li></ul>",
    shortDescription: "Powerful 1200W drill with variable speed control.",
    sku: "AM-X1000",
    price: 199.99,
    originalPrice: 249.99,
    inStock: true,
    isNew: false,
    onSale: true,
    images: generateProductImages(1, 3),
    categories: [1, 101], // Electric Tools, Drills
    brand: "Amwittools",
    rating: 4.8,
    attributes: [
      { id: 1, name: "Power", options: ["1200W"] },
      { id: 2, name: "Chuck Size", options: ["13mm"] }
    ]
  },
  {
    id: 2,
    name: "Amwittools Professional Screwdriver Set 12-piece",
    slug: "amwittools-professional-screwdriver-set-12-piece",
    description: "<p>Professional set of screwdrivers with ergonomic handles and hardened tips. Ideal for precision work and daily use.</p><ul><li>12 different sizes</li><li>Ergonomic grip</li><li>Hardened tips for long life</li></ul>",
    shortDescription: "Professional set of 12 screwdrivers with ergonomic handles.",
    sku: "AM-SD-SET-12",
    price: 39.95,
    originalPrice: 49.95,
    inStock: true,
    isNew: false,
    onSale: true,
    images: generateProductImages(2, 2),
    categories: [2, 201], // Hand Tools, Screwdrivers
    brand: "Amwittools",
    rating: 4.7,
    attributes: [
      { id: 1, name: "Material", options: ["Chrome-vanadium steel"] },
      { id: 2, name: "Warranty", options: ["5 years"] }
    ]
  },
  {
    id: 3,
    name: "Amwittools Digital Caliper 150mm",
    slug: "amwittools-digital-caliper-150mm",
    description: "<p>Accurate digital caliper made of stainless steel with LCD display. Measuring range up to 150mm with an accuracy of 0.01mm.</p>",
    shortDescription: "Digital caliper with LCD display and 0.01mm accuracy.",
    sku: "AM-DC-150",
    price: 24.95,
    originalPrice: 24.95,
    inStock: true,
    isNew: true,
    onSale: false,
    images: generateProductImages(3, 1),
    categories: [3], // Measuring Instruments
    brand: "Amwittools",
    rating: 4.6,
    attributes: [
      { id: 1, name: "Material", options: ["Stainless steel"] },
      { id: 2, name: "Measuring Range", options: ["0-150mm"] }
    ]
  }
];

// Filter options for consistent filtering
export const FILTER_OPTIONS = {
  priceRanges: [
    { id: 1, name: "< €50", min: 0, max: 50 },
    { id: 2, name: "€50 - €100", min: 50, max: 100 },
    { id: 3, name: "€100 - €200", min: 100, max: 200 },
    { id: 4, name: "> €200", min: 200, max: null }
  ],
  brands: [
    { id: 1, name: "Amwittools" },
    { id: 2, name: "Bosch" },
    { id: 3, name: "DeWalt" },
    { id: 4, name: "Makita" }
  ],
  ratings: [
    { id: 1, name: "4 stars & higher" },
    { id: 2, name: "3 stars & higher" }
  ]
};

// Mock API Service
export const MockApiService = {
  /**
   * Get all products with optional filters
   */
  getProducts: async (filters = {}) => {
    await delay();
    
    let filteredProducts = [...PRODUCTS];
    
    // Apply category filter
    if (filters.categoryId) {
      filteredProducts = filteredProducts.filter(product => 
        product.categories.includes(Number(filters.categoryId))
      );
    }
    
    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.sku.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply price filter
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => {
        if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
          return product.price >= filters.minPrice && product.price <= filters.maxPrice;
        } else if (filters.minPrice !== undefined) {
          return product.price >= filters.minPrice;
        } else if (filters.maxPrice !== undefined) {
          return product.price <= filters.maxPrice;
        }
        return true;
      });
    }
    
    // Apply brand filter
    if (filters.brand) {
      filteredProducts = filteredProducts.filter(product => 
        product.brand === filters.brand
      );
    }
    
    // Apply rating filter
    if (filters.minRating) {
      filteredProducts = filteredProducts.filter(product => 
        product.rating >= filters.minRating
      );
    }
    
    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'priceAsc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'priceDesc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          filteredProducts = filteredProducts.filter(p => p.isNew).concat(
            filteredProducts.filter(p => !p.isNew)
          );
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        default: // popularity - default sort
          break;
      }
    }
    
    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    return {
      data: paginatedProducts,
      total: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / limit),
      page,
      limit
    };
  },
  
  /**
   * Get a single product by ID
   */
  getProductById: async (productId) => {
    await delay();
    const product = PRODUCTS.find(p => p.id === Number(productId));
    
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    
    return { data: product };
  },
  
  /**
   * Get categories with optional parent filter
   */
  getCategories: async (parentOnly = false) => {
    await delay();
    
    if (parentOnly) {
      return { 
        data: CATEGORIES.filter(c => c.isParent) 
      };
    }
    
    return { data: CATEGORIES };
  },
  
  /**
   * Get subcategories for a specific parent category
   */
  getSubcategories: async (parentId) => {
    await delay();
    
    if (!parentId) {
      throw new Error('Parent ID is required');
    }
    
    const subcategories = CATEGORIES.filter(c => 
      c.parentId === Number(parentId)
    );
    
    return { data: subcategories };
  },
  
  /**
   * Get available filter options
   */
  getFilterOptions: async () => {
    await delay(300); // Shorter delay for better UX
    return { data: FILTER_OPTIONS };
  }
};

export default MockApiService;