// app/services/mockData.js

// Mock categories
const categories = [
  { id: 1, name: "Handgereedschap", slug: "handgereedschap" },
  { id: 2, name: "Elektrisch gereedschap", slug: "elektrisch-gereedschap" },
  { id: 3, name: "Meetgereedschap", slug: "meetgereedschap" },
  { id: 4, name: "Accessoires", slug: "accessoires" },
  { id: 5, name: "Tuin & Buiten", slug: "tuin-buiten" }
];

// Mock product images with realistic URLs
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

// Generate mock products
export const mockProducts = [
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
    description: "<p>Nauwkeurige digitale schuifmaat van roestvrij staal met LCD-display. Meetbereik tot 150mm met een nauwkeurigheid van 0,01mm.</p><h3>Kenmerken</h3><ul><li>Nauwkeurigheid: 0,01mm</li><li>Roestvrij staal</li><li>LCD-display</li><li>Inch/mm schakelbaar</li></ul>",
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
    description: "<p>Krachtig 1200W boorstation met variabele snelheid en elektronische toerentalregeling. Boordiameter tot 13mm in metaal.</p><h3>Specificaties</h3><ul><li>Vermogen: 1200W</li><li>Boorkop: 13mm</li><li>Elektronische toerentalregeling</li></ul>",
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
    description: "<p>Set van 3 waterpassen (30cm, 60cm en 120cm) met nauwkeurigheid van 0,5mm/m. Gemaakt van sterk aluminium met schokabsorberende eindkappen.</p>",
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
  },
  {
    id: 7,
    name: "Amwittools Bitset 42-delig",
    slug: "amwittools-bitset-42-delig",
    description: "<p>Complete set met 42 bits voor elke klus. Inclusief precisieschroevendraaier en magnetische bithouder.</p>",
    short_description: "Complete set met 42 bits en magnetische bithouder.",
    sku: "AW-10587",
    price: "29.95",
    regular_price: "34.95",
    sale_price: "29.95",
    stock_status: "instock",
    categories: [
      { id: 1, name: "Handgereedschap", slug: "handgereedschap" },
      { id: 4, name: "Accessoires", slug: "accessoires" }
    ],
    images: generateProductImages(7, 2),
    attributes: [
      {
        id: 1,
        name: "Aantal delen",
        options: ["42"]
      },
      {
        id: 2,
        name: "Type",
        options: ["Torx, Phillips, Pozidriv, Hex, Plat"]
      }
    ]
  },
  {
    id: 8,
    name: "Amwittools Hogedrukreiniger 2200W",
    slug: "amwittools-hogedrukreiniger-2200w",
    description: "<p>Krachtige 2200W hogedrukreiniger voor huis, tuin en auto. Met verschillende sproeikoppen en ingebouwd reinigingsmiddelreservoir.</p><h3>Specificaties</h3><ul><li>Vermogen: 2200W</li><li>Max. druk: 150 bar</li><li>Wateropbrengst: 450 l/u</li></ul>",
    short_description: "Krachtige 2200W hogedrukreiniger met 150 bar druk.",
    sku: "AW-55231",
    price: "149.00",
    regular_price: "179.00",
    sale_price: "149.00",
    stock_status: "instock",
    categories: [
      { id: 5, name: "Tuin & Buiten", slug: "tuin-buiten" }
    ],
    images: generateProductImages(8, 3),
    attributes: [
      {
        id: 1,
        name: "Vermogen",
        options: ["2200W"]
      },
      {
        id: 2,
        name: "Max. druk",
        options: ["150 bar"]
      }
    ]
  },
  {
    id: 9,
    name: "Amwittools Precisiezaag 550W",
    slug: "amwittools-precisiezaag-550w",
    description: "<p>Compacte 550W precisiezaag met fijne tandzaagbladen voor nauwkeurig zaagwerk in hout, kunststof en zacht metaal.</p>",
    short_description: "Compacte precisiezaag 550W voor nauwkeurig zaagwerk.",
    sku: "AW-22789",
    price: "69.95",
    regular_price: "69.95",
    sale_price: null,
    stock_status: "instock",
    categories: [
      { id: 2, name: "Elektrisch gereedschap", slug: "elektrisch-gereedschap" }
    ],
    images: generateProductImages(9, 2),
    attributes: [
      {
        id: 1,
        name: "Vermogen",
        options: ["550W"]
      },
      {
        id: 2,
        name: "Zaagdiepte",
        options: ["65mm (hout), 10mm (aluminium)"]
      }
    ]
  },
  {
    id: 10,
    name: "Amwittools Handschoenen Pro-Grip Maat L",
    slug: "amwittools-handschoenen-pro-grip-maat-l",
    description: "<p>Hoogwaardige werkhandschoenen met uitstekende grip en vingergevoeligheid. Gemaakt van duurzaam materiaal met versterkte vingertoppen.</p>",
    short_description: "Hoogwaardige werkhandschoenen met uitstekende grip, maat L.",
    sku: "AW-44120",
    price: "12.95",
    regular_price: "12.95",
    sale_price: null,
    stock_status: "instock",
    categories: [
      { id: 4, name: "Accessoires", slug: "accessoires" }
    ],
    images: generateProductImages(10, 1),
    attributes: [
      {
        id: 1,
        name: "Maat",
        options: ["L"]
      },
      {
        id: 2,
        name: "Materiaal",
        options: ["Synthetisch leer, elastaan"]
      }
    ]
  },
  {
    id: 11,
    name: "Amwittools Accu Haagschaar 20V",
    slug: "amwittools-accu-haagschaar-20v",
    description: "<p>Draadloze haagschaar met 20V lithium-ion accu. Meslengte van 51cm en snijcapaciteit tot 16mm. Inclusief accu en lader.</p>",
    short_description: "Draadloze haagschaar met 51cm meslengte en 20V accu.",
    sku: "AW-55347",
    price: "89.95",
    regular_price: "99.95",
    sale_price: "89.95",
    stock_status: "instock",
    categories: [
      { id: 5, name: "Tuin & Buiten", slug: "tuin-buiten" }
    ],
    images: generateProductImages(11, 2),
    attributes: [
      {
        id: 1,
        name: "Voltage",
        options: ["20V"]
      },
      {
        id: 2,
        name: "Meslengte",
        options: ["51cm"]
      }
    ]
  },
  {
    id: 12,
    name: "Amwittools Professionele Rolmaat 5m",
    slug: "amwittools-professionele-rolmaat-5m",
    description: "<p>Robuuste rolmaat van 5 meter met anti-slip behuizing en automatische vergrendeling. Schaal in mm en inches.</p>",
    short_description: "Robuuste rolmaat 5m met anti-slip behuizing.",
    sku: "AW-33256",
    price: "9.95",
    regular_price: "9.95",
    sale_price: null,
    stock_status: "instock",
    categories: [
      { id: 3, name: "Meetgereedschap", slug: "meetgereedschap" }
    ],
    images: generateProductImages(12, 1),
    attributes: [
      {
        id: 1,
        name: "Lengte",
        options: ["5m / 16ft"]
      },
      {
        id: 2,
        name: "Breedte",
        options: ["19mm"]
      }
    ]
  },
];