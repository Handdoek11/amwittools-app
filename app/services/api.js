// app/services/api.js

// Categorieën
const categories = [
  { id: 1, name: "Momentgereedschap", slug: "momentgereedschap" },
  { id: 2, name: "Handgereedschap", slug: "handgereedschap" },
  { id: 3, name: "Inspectiesystemen en Buisreiniging", slug: "inspectiesystemen-buisreiniging" },
  { id: 4, name: "Kabel", slug: "kabel" },
  { id: 5, name: "Meetapparatuur", slug: "meetapparatuur" },
  { id: 6, name: "Tuin, Bouw en Water", slug: "tuin-bouw-water" },
  { id: 7, name: "Markeren en Aftekenen", slug: "markeren-aftekenen" },
  { id: 8, name: "Bevestigen", slug: "bevestigen" },
  { id: 9, name: "Opbergen & Werkplek", slug: "opbergen-werkplek" },
  { id: 10, name: "Stroom & Verlichting", slug: "stroom-verlichting" },
  { id: 11, name: "Veiligheid", slug: "veiligheid" },
  { id: 12, name: "Verspanen", slug: "verspanen" }
];

// Mock product afbeeldingen met placeholder URLs
const generateProductImages = (id, count = 1) => {
  const images = [];
  for (let i = 0; i < count; i++) {
    images.push({
      id: id * 10 + i,
      src: `https://via.placeholder.com/400x400?text=Product+${id}+Image+${i + 1}`,
      name: `Product ${id} Image ${i + 1}`,
      alt: `Product ${id} afbeelding ${i + 1}`
    });
  }
  return images;
};

// Mock producten
const mockProducts = [
  {
    id: 1,
    name: "Amwittools Professional Schroevendraaierset 12-delig",
    slug: "amwittools-professional-schroevendraaierset-12-delig",
    description: "<p>Professionele set schroevendraaiers met ergonomische handgrepen en geharde tips. Ideaal voor precisiewerk en dagelijks gebruik.</p><ul><li>12 verschillende maten</li><li>Ergonomische handgreep</li><li>Geharde tips voor lange levensduur</li></ul>",
    short_description: "Professionele set van 12 schroevendraaiers met ergonomische handgrepen.",
    sku: "AW-10025",
    price: "39.95",
    regular_price: "49.95",
    sale_price: "39.95",
    stock_status: "instock",
    categories: [
      { id: 1, name: "Handgereedschap", slug: "handgereedschap" }
    ],
    images: generateProductImages(1, 3),
    attributes: [
      {
        id: 1,
        name: "Materiaal",
        options: ["Chroom-vanadium staal"]
      },
      {
        id: 2,
        name: "Garantie",
        options: ["5 jaar"]
      }
    ]
  },
  {
    id: 2,
    name: "Amwittools Accumachine 18V Li-Ion",
    slug: "amwittools-accumachine-18v-li-ion",
    description: "<p>Krachtige 18V accumachine met lithium-ion batterij voor zwaar werk. Inclusief 2 batterijen en snellader.</p><h3>Specificaties</h3><ul><li>18V Li-Ion accu</li><li>Koppel: 60Nm</li><li>2 snelheden: 0-500 / 0-1800 rpm</li></ul>",
    short_description: "Krachtige 18V accumachine met 2 batterijen en snellader.",
    sku: "AW-22145",
    price: "129.00",
    regular_price: "159.00",
    sale_price: "129.00",
    stock_status: "instock",
    categories: [
      { id: 2, name: "Elektrisch gereedschap", slug: "elektrisch-gereedschap" }
    ],
    images: generateProductImages(2, 4),
    attributes: [
      {
        id: 1,
        name: "Voltage",
        options: ["18V"]
      },
      {
        id: 2,
        name: "Accu type",
        options: ["Li-Ion"]
      },
      {
        id: 3,
        name: "Garantie",
        options: ["3 jaar"]
      }
    ]
  },
  {
    id: 3,
    name: "Amwittools Digitale Schuifmaat 150mm",
    slug: "amwittools-digitale-schuifmaat-150mm",
    description: "<p>Nauwkeurige digitale schuifmaat van roestvrij staal met LCD-display. Meetbereik tot 150mm met een nauwkeurigheid van 0,01mm.</p>",
    short_description: "Digitale schuifmaat met LCD-display en nauwkeurigheid van 0,01mm.",
    sku: "AW-33078",
    price: "24.95",
    regular_price: "24.95",
    sale_price: null,
    stock_status: "instock",
    categories: [
      { id: 3, name: "Meetgereedschap", slug: "meetgereedschap" }
    ],
    images: generateProductImages(3, 2),
    attributes: [
      {
        id: 1,
        name: "Materiaal",
        options: ["Roestvrij staal"]
      },
      {
        id: 2,
        name: "Meetbereik",
        options: ["0-150mm"]
      }
    ]
  },
  {
    id: 4,
    name: "Amwittools Professionele Hamer 450g",
    slug: "amwittools-professionele-hamer-450g",
    description: "<p>Professionele klauwhamer met stalen kop (450g) en ergonomische anti-slip handgreep. Ideaal voor algemene timmerwerkzaamheden.</p>",
    short_description: "Professionele klauwhamer 450g met anti-slip handgreep.",
    sku: "AW-10436",
    price: "19.95",
    regular_price: "19.95",
    sale_price: null,
    stock_status: "instock",
    categories: [
      { id: 1, name: "Handgereedschap", slug: "handgereedschap" }
    ],
    images: generateProductImages(4, 2),
    attributes: [
      {
        id: 1,
        name: "Gewicht",
        options: ["450g"]
      },
      {
        id: 2,
        name: "Materiaal",
        options: ["Gelegeerd staal, rubber handgreep"]
      }
    ]
  },
  {
    id: 5,
    name: "Amwittools Bohrstation Pro 1200W",
    slug: "amwittools-bohrstation-pro-1200w",
    description: "<p>Krachtig 1200W boorstation met variabele snelheid en elektronische toerentalregeling.</p>",
    short_description: "Krachtig 1200W boorstation met variabele snelheid.",
    sku: "AW-22653",
    price: "89.95",
    regular_price: "99.95",
    sale_price: "89.95",
    stock_status: "instock",
    categories: [
      { id: 2, name: "Elektrisch gereedschap", slug: "elektrisch-gereedschap" }
    ],
    images: generateProductImages(5, 3),
    attributes: [
      {
        id: 1,
        name: "Vermogen",
        options: ["1200W"]
      },
      {
        id: 2,
        name: "Boorkop",
        options: ["13mm"]
      }
    ]
  },
  {
    id: 6,
    name: "Amwittools Waterpas Set 3-delig",
    slug: "amwittools-waterpas-set-3-delig",
    description: "<p>Set van 3 waterpassen (30cm, 60cm en 120cm) met nauwkeurigheid van 0,5mm/m.</p>",
    short_description: "Set van 3 aluminium waterpassen met hoge nauwkeurigheid.",
    sku: "AW-33125",
    price: "34.95",
    regular_price: "34.95",
    sale_price: null,
    stock_status: "instock",
    categories: [
      { id: 3, name: "Meetgereedschap", slug: "meetgereedschap" }
    ],
    images: generateProductImages(6, 2),
    attributes: [
      {
        id: 1,
        name: "Nauwkeurigheid",
        options: ["0,5mm/m"]
      },
      {
        id: 2,
        name: "Materiaal",
        options: ["Aluminium"]
      }
    ]
  }
];

// Nep-vertraging om netwerkverzoeken te simuleren
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Vereenvoudigde error handling wrapper
export const handleApiResponse = async (apiCall) => {
  try {
    // Simuleer netwerkvertraging
    await delay(Math.random() * 500 + 200); // 200-700ms vertraging
    
    const response = await apiCall();
    return { data: response, error: null };
  } catch (error) {
    console.error("API Error:", error);
    return { 
      data: null, 
      error: {
        status: 500,
        message: error.message || "Er is een fout opgetreden"
      }
    };
  }
};

// Verbeterde Mock API methodes
export const api = {
  get: (endpoint, params = {}) => {
    return handleApiResponse(() => {
      console.log(`Mock API GET: ${endpoint}`, params);
      
      // Handle verschillende endpoints
      if (endpoint === "products") {
        let result = [...mockProducts];
        
        // Handle zoeken
        if (params.search) {
          const searchLower = params.search.toLowerCase();
          result = result.filter(p => 
            p.name.toLowerCase().includes(searchLower) || 
            p.sku.includes(params.search)
          );
        }
        
        // Handle SKU zoeken
        if (params.sku) {
          result = result.filter(p => p.sku.includes(params.sku));
        }
        
        // Handle categorie filter
        if (params.category) {
          result = result.filter(p => 
            p.categories.some(c => c.id.toString() === params.category.toString())
          );
        }
        
        // Paginering
        const page = parseInt(params.page) || 1;
        const perPage = parseInt(params.per_page) || 20;
        const start = (page - 1) * perPage;
        const paginatedResult = result.slice(start, start + perPage);
        
        return paginatedResult;
      } 
      
      // BELANGRIJK: Dit is veranderd om single product by ID correct te verwerken
      else if (endpoint.startsWith("products/") && !endpoint.includes("categories")) {
        const productId = parseInt(endpoint.split('/')[1]);
        const product = mockProducts.find(p => p.id === productId);
        
        if (!product) {
          throw new Error("Product niet gevonden");
        }
        
        return product;
      } 
      
      // BELANGRIJK: Dit is de gecorrigeerde categories handler
      else if (endpoint === "products/categories") {
        // Retourneer direct de categorieën array
        return categories;
      }
      
      else {
        throw new Error(`Endpoint niet gevonden: ${endpoint}`);
      }
    });
  },
  
  post: (endpoint, data) => {
    return handleApiResponse(() => {
      console.log(`Mock API POST: ${endpoint}`, data);
      throw new Error("POST methode niet geïmplementeerd in mock API");
    });
  }
};