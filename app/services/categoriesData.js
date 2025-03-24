// app/services/categoriesData.js
export const categoriesData = {
  // Top level categories
  categories: [
    {
      id: 1,
      name: "Elektrisch gereedschap",
      slug: "elektrisch-gereedschap",
      description: "Professioneel elektrisch gereedschap voor vakmensen",
      image: { src: "https://via.placeholder.com/400x200?text=Elektrisch+Gereedschap" },
      count: 42, // Mock product count
      isParent: true,
      parentId: null
    },
    {
      id: 2,
      name: "Handgereedschap",
      slug: "handgereedschap",
      description: "Hoogwaardig handgereedschap voor professionals",
      image: { src: "https://via.placeholder.com/400x200?text=Handgereedschap" },
      count: 65,
      isParent: true,
      parentId: null
    },
    {
      id: 3,
      name: "Meetinstrumenten",
      slug: "meetinstrumenten",
      description: "Precisie meetinstrumenten voor elke vakman",
      image: { src: "https://via.placeholder.com/400x200?text=Meetinstrumenten" },
      count: 28,
      isParent: true,
      parentId: null
    },
    {
      id: 4,
      name: "Bevestigingsmaterialen",
      slug: "bevestigingsmaterialen",
      description: "Professionele bevestigingsmaterialen",
      image: { src: "https://via.placeholder.com/400x200?text=Bevestigingsmaterialen" },
      count: 50,
      isParent: true,
      parentId: null
    },
    {
      id: 5,
      name: "Accessoires",
      slug: "accessoires",
      description: "Essentiële accessoires voor uw gereedschap",
      image: { src: "https://via.placeholder.com/400x200?text=Accessoires" },
      count: 37,
      isParent: true,
      parentId: null
    },
    {
      id: 6,
      name: "Persoonlijke beschermingsmiddelen",
      slug: "persoonlijke-beschermingsmiddelen",
      description: "Beschermingsmiddelen voor optimale veiligheid",
      image: { src: "https://via.placeholder.com/400x200?text=Beschermingsmiddelen" },
      count: 22,
      isParent: true,
      parentId: null
    },

    // Subcategories for Elektrisch gereedschap
    {
      id: 101,
      name: "Boormachines",
      slug: "boormachines",
      description: "Professionele boormachines",
      image: { src: "https://via.placeholder.com/400x200?text=Boormachines" },
      count: 15,
      isParent: false,
      parentId: 1
    },
    {
      id: 102,
      name: "Schuurmachines",
      slug: "schuurmachines",
      description: "Schuurmachines voor verschillende toepassingen",
      image: { src: "https://via.placeholder.com/400x200?text=Schuurmachines" },
      count: 8,
      isParent: false,
      parentId: 1
    },
    {
      id: 103,
      name: "Decoupeerzagen",
      slug: "decoupeerzagen",
      description: "Precisie decoupeerzagen",
      image: { src: "https://via.placeholder.com/400x200?text=Decoupeerzagen" },
      count: 6,
      isParent: false,
      parentId: 1
    },
    {
      id: 104,
      name: "Slijptollen",
      slug: "slijptollen",
      description: "Professionele slijptollen",
      image: { src: "https://via.placeholder.com/400x200?text=Slijptollen" },
      count: 9,
      isParent: false,
      parentId: 1
    },

    // Subcategories for Handgereedschap
    {
      id: 201,
      name: "Schroevendraaiers",
      slug: "schroevendraaiers",
      description: "Professionele schroevendraaiers",
      image: { src: "https://via.placeholder.com/400x200?text=Schroevendraaiers" },
      count: 20,
      isParent: false,
      parentId: 2
    },
    {
      id: 202,
      name: "Sleutels",
      slug: "sleutels",
      description: "Steeksleutels, inbussleutels en meer",
      image: { src: "https://via.placeholder.com/400x200?text=Sleutels" },
      count: 25,
      isParent: false,
      parentId: 2
    },
    {
      id: 203,
      name: "Hamer en beitel",
      slug: "hamer-beitel",
      description: "Professionele hamers en beitels",
      image: { src: "https://via.placeholder.com/400x200?text=Hamer+Beitel" },
      count: 12,
      isParent: false,
      parentId: 2
    },
    {
      id: 204,
      name: "Zaaggereedschap",
      slug: "zaaggereedschap",
      description: "Handmatig zaaggereedschap",
      image: { src: "https://via.placeholder.com/400x200?text=Zaaggereedschap" },
      count: 8,
      isParent: false,
      parentId: 2
    },

    // Subcategories for Meetinstrumenten
    {
      id: 301,
      name: "Waterpassen",
      slug: "waterpassen",
      description: "Professionele waterpassen",
      image: { src: "https://via.placeholder.com/400x200?text=Waterpassen" },
      count: 14,
      isParent: false,
      parentId: 3
    },
    {
      id: 302,
      name: "Multimeters",
      slug: "multimeters",
      description: "Digitale en analoge multimeters",
      image: { src: "https://via.placeholder.com/400x200?text=Multimeters" },
      count: 8,
      isParent: false,
      parentId: 3
    },
    {
      id: 303,
      name: "Laserwaterpassen",
      slug: "laserwaterpassen",
      description: "Laser meetinstrumenten en waterpassen",
      image: { src: "https://via.placeholder.com/400x200?text=Laserwaterpassen" },
      count: 6,
      isParent: false,
      parentId: 3
    },
    
    // Subcategories for Bevestigingsmaterialen
    {
      id: 401,
      name: "Schroeven",
      slug: "schroeven",
      description: "Alle soorten schroeven",
      image: { src: "https://via.placeholder.com/400x200?text=Schroeven" },
      count: 22,
      isParent: false,
      parentId: 4
    },
    {
      id: 402,
      name: "Bouten en moeren",
      slug: "bouten-moeren",
      description: "Bouten, moeren en ringen",
      image: { src: "https://via.placeholder.com/400x200?text=Bouten+Moeren" },
      count: 18,
      isParent: false,
      parentId: 4
    },
    {
      id: 403,
      name: "Pluggen",
      slug: "pluggen",
      description: "Muurpluggen en andere bevestigingspluggen",
      image: { src: "https://via.placeholder.com/400x200?text=Pluggen" },
      count: 10,
      isParent: false,
      parentId: 4
    },
    
    // Subcategories for Accessoires
    {
      id: 501,
      name: "Boren",
      slug: "boren",
      description: "Boren voor verschillende materialen",
      image: { src: "https://via.placeholder.com/400x200?text=Boren" },
      count: 15,
      isParent: false,
      parentId: 5
    },
    {
      id: 502,
      name: "Zaagbladen",
      slug: "zaagbladen",
      description: "Zaagbladen voor verschillende toepassingen",
      image: { src: "https://via.placeholder.com/400x200?text=Zaagbladen" },
      count: 12,
      isParent: false,
      parentId: 5
    },
    {
      id: 503,
      name: "Slijpschijven",
      slug: "slijpschijven",
      description: "Slijpschijven voor doorslijp- en afbraamwerkzaamheden",
      image: { src: "https://via.placeholder.com/400x200?text=Slijpschijven" },
      count: 10,
      isParent: false,
      parentId: 5
    },
    
    // Subcategories for Persoonlijke beschermingsmiddelen
    {
      id: 601,
      name: "Handschoenen",
      slug: "handschoenen",
      description: "Werkhandschoenen voor verschillende toepassingen",
      image: { src: "https://via.placeholder.com/400x200?text=Handschoenen" },
      count: 8,
      isParent: false,
      parentId: 6
    },
    {
      id: 602,
      name: "Veiligheidsbrillen",
      slug: "veiligheidsbrillen",
      description: "Beschermende brillen",
      image: { src: "https://via.placeholder.com/400x200?text=Veiligheidsbrillen" },
      count: 7,
      isParent: false,
      parentId: 6
    },
    {
      id: 603,
      name: "Gehoorbescherming",
      slug: "gehoorbescherming",
      description: "Oordoppen en gehoorkappen",
      image: { src: "https://via.placeholder.com/400x200?text=Gehoorbescherming" },
      count: 5,
      isParent: false,
      parentId: 6
    },
  ],

  // Product tags/labels
  tags: [
    { id: 1, name: "Draadloos" },
    { id: 2, name: "Oplaadbaar" },
    { id: 3, name: "Professioneel gebruik" },
    { id: 4, name: "DIY" },
    { id: 5, name: "Populair" },
    { id: 6, name: "Nieuw in assortiment" },
    { id: 7, name: "Aanbieding" }
  ],

  // Product filter options
  filterOptions: {
    priceRanges: [
      { id: 1, name: "< €50", min: 0, max: 50 },
      { id: 2, name: "€50 - €100", min: 50, max: 100 },
      { id: 3, name: "€100 - €200", min: 100, max: 200 },
      { id: 4, name: "€200 - €500", min: 200, max: 500 },
      { id: 5, name: "> €500", min: 500, max: null }
    ],
    brands: [
      { id: 1, name: "Bosch" },
      { id: 2, name: "Makita" },
      { id: 3, name: "DeWalt" },
      { id: 4, name: "Wiha" },
      { id: 5, name: "Festool" },
      { id: 6, name: "Milwaukee" },
      { id: 7, name: "Amwittools" }
    ],
    specifications: [
      { id: 1, name: "18V" },
      { id: 2, name: "36V" },
      { id: 3, name: "Draadloos" },
      { id: 4, name: "Met kabel" },
      { id: 5, name: "Hoog koppel" }
    ],
    ratings: [
      { id: 1, name: "4 sterren & hoger" },
      { id: 2, name: "3 sterren & hoger" }
    ],
    productStatus: [
      { id: 1, name: "Nieuw" },
      { id: 2, name: "Aanbieding" },
      { id: 3, name: "Beperkte voorraad" }
    ],
    applications: [
      { id: 1, name: "Houtbewerking" },
      { id: 2, name: "Metaalbewerking" },
      { id: 3, name: "Bouw" },
      { id: 4, name: "Installatiewerk" }
    ]
  },

  // Dynamic/campaign categories
  campaignCategories: [
    { 
      id: 1, 
      name: "Voorjaarsdeals", 
      slug: "voorjaarsdeals",
      description: "Speciale aanbiedingen voor het voorjaar",
      image: { src: "https://via.placeholder.com/400x200?text=Voorjaarsdeals" },
      isActive: true
    },
    { 
      id: 2, 
      name: "Bestsellers 2024", 
      slug: "bestsellers-2024",
      description: "Meest verkochte producten van 2024",
      image: { src: "https://via.placeholder.com/400x200?text=Bestsellers" },
      isActive: true
    },
    { 
      id: 3, 
      name: "Nieuw in assortiment", 
      slug: "nieuw-assortiment",
      description: "Ontdek onze nieuwste producten",
      image: { src: "https://via.placeholder.com/400x200?text=Nieuw" },
      isActive: true
    },
    { 
      id: 4, 
      name: "Outlet", 
      slug: "outlet",
      description: "Afgeprijsde producten",
      image: { src: "https://via.placeholder.com/400x200?text=Outlet" },
      isActive: true
    }
  ]
};

// Helper functions to work with categories
export const categoryHelpers = {
  // Get all parent categories
  getParentCategories: () => {
    return categoriesData.categories.filter(cat => cat.isParent);
  },
  
  // Get subcategories for a specific parent category
  getSubcategories: (parentId) => {
    return categoriesData.categories.filter(cat => cat.parentId === parentId);
  },
  
  // Get a category by ID
  getCategoryById: (categoryId) => {
    return categoriesData.categories.find(cat => cat.id === categoryId);
  },
  
  // Get active campaign categories
  getActiveCampaigns: () => {
    return categoriesData.campaignCategories.filter(camp => camp.isActive);
  }
};