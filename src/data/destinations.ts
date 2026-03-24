export interface City {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  lat: number;
  lng: number;
}

export interface Country {
  code: string; // ISO_A2
  name: string;
  continent: string;
  flag: string;
  cities: City[];
  // Center coordinates for globe zoom
  lat: number;
  lng: number;
}

export const countries: Country[] = [
  {
    code: "FR",
    name: "France",
    continent: "Europe",
    flag: "\u{1F1EB}\u{1F1F7}",
    lat: 46.6,
    lng: 2.3,
    cities: [
      { id: "paris", name: "Paris", description: "La ville lumière, capitale de l'art et de la gastronomie", imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800", lat: 48.86, lng: 2.35 },
      { id: "lyon", name: "Lyon", description: "Capitale mondiale de la gastronomie et du street art", imageUrl: "https://images.unsplash.com/photo-1524396309943-e03f5249f002?w=800", lat: 45.76, lng: 4.83 },
      { id: "nice", name: "Nice", description: "Perle de la Côte d'Azur entre mer et montagnes", imageUrl: "https://images.unsplash.com/photo-1491166617655-0723a0999cfc?w=800", lat: 43.71, lng: 7.26 },
      { id: "bordeaux", name: "Bordeaux", description: "Capitale du vin et joyau architectural du XVIIIe", imageUrl: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800", lat: 44.84, lng: -0.57 },
    ],
  },
  {
    code: "JP",
    name: "Japon",
    continent: "Asie",
    flag: "\u{1F1EF}\u{1F1F5}",
    lat: 36.2,
    lng: 138.3,
    cities: [
      { id: "tokyo", name: "Tokyo", description: "Mégalopole futuriste où tradition et modernité se mêlent", imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800", lat: 35.68, lng: 139.69 },
      { id: "kyoto", name: "Kyoto", description: "Ancienne capitale impériale aux 2000 temples", imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800", lat: 35.01, lng: 135.77 },
      { id: "osaka", name: "Osaka", description: "Capitale du street food et de la bonne humeur", imageUrl: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800", lat: 34.69, lng: 135.5 },
    ],
  },
  {
    code: "BR",
    name: "Brésil",
    continent: "Amérique du Sud",
    flag: "\u{1F1E7}\u{1F1F7}",
    lat: -14.2,
    lng: -51.9,
    cities: [
      { id: "rio", name: "Rio de Janeiro", description: "La cidade maravilhosa entre plages et montagnes", imageUrl: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800", lat: -22.91, lng: -43.17 },
      { id: "sao-paulo", name: "São Paulo", description: "Métropole culturelle la plus vibrante d'Amérique latine", imageUrl: "https://images.unsplash.com/photo-1554168848-228152bcb7f7?w=800", lat: -23.55, lng: -46.63 },
      { id: "salvador", name: "Salvador de Bahia", description: "Berceau de la culture afro-brésilienne et du carnaval", imageUrl: "https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?w=800", lat: -12.97, lng: -38.51 },
    ],
  },
  {
    code: "MA",
    name: "Maroc",
    continent: "Afrique",
    flag: "\u{1F1F2}\u{1F1E6}",
    lat: 31.8,
    lng: -7.1,
    cities: [
      { id: "marrakech", name: "Marrakech", description: "La ville rouge aux souks enivrants et à la place Jemaa el-Fna", imageUrl: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800", lat: 31.63, lng: -8.0 },
      { id: "fes", name: "Fès", description: "Plus grande médina piétonne au monde, voyage dans le temps garanti", imageUrl: "https://images.unsplash.com/photo-1580746738099-78d6833aba81?w=800", lat: 34.03, lng: -5.0 },
      { id: "chefchaouen", name: "Chefchaouen", description: "La perle bleue du Rif, un village de carte postale", imageUrl: "https://images.unsplash.com/photo-1553244646-44c5c5765b49?w=800", lat: 35.17, lng: -5.27 },
    ],
  },
  {
    code: "TH",
    name: "Thaïlande",
    continent: "Asie",
    flag: "\u{1F1F9}\u{1F1ED}",
    lat: 15.9,
    lng: 100.5,
    cities: [
      { id: "bangkok", name: "Bangkok", description: "Temples dorés, street food légendaire et vie nocturne électrique", imageUrl: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800", lat: 13.76, lng: 100.5 },
      { id: "chiang-mai", name: "Chiang Mai", description: "Rose du Nord entourée de montagnes et de temples", imageUrl: "https://images.unsplash.com/photo-1598935898639-81586f7d2129?w=800", lat: 18.79, lng: 98.98 },
      { id: "phuket", name: "Phuket", description: "Île paradisiaque aux eaux turquoise et falaises calcaires", imageUrl: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800", lat: 7.88, lng: 98.39 },
    ],
  },
  {
    code: "IT",
    name: "Italie",
    continent: "Europe",
    flag: "\u{1F1EE}\u{1F1F9}",
    lat: 41.9,
    lng: 12.6,
    cities: [
      { id: "rome", name: "Rome", description: "La ville éternelle, musée à ciel ouvert de 3000 ans d'histoire", imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800", lat: 41.9, lng: 12.5 },
      { id: "florence", name: "Florence", description: "Berceau de la Renaissance et paradis des amateurs d'art", imageUrl: "https://images.unsplash.com/photo-1543429258-c5ca3e1b6a68?w=800", lat: 43.77, lng: 11.25 },
      { id: "venice", name: "Venise", description: "Cité des amoureux flottant sur 118 îles", imageUrl: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800", lat: 45.44, lng: 12.32 },
    ],
  },
  {
    code: "MX",
    name: "Mexique",
    continent: "Amérique du Nord",
    flag: "\u{1F1F2}\u{1F1FD}",
    lat: 23.6,
    lng: -102.6,
    cities: [
      { id: "mexico-city", name: "Mexico City", description: "Mégapole culturelle avec une scène food de classe mondiale", imageUrl: "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=800", lat: 19.43, lng: -99.13 },
      { id: "oaxaca", name: "Oaxaca", description: "Capitale culinaire du Mexique aux marchés colorés", imageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800", lat: 17.07, lng: -96.72 },
      { id: "tulum", name: "Tulum", description: "Ruines mayas surplombant les eaux cristallines des Caraïbes", imageUrl: "https://images.unsplash.com/photo-1682553064750-972e2be0d435?w=800", lat: 20.21, lng: -87.43 },
    ],
  },
  {
    code: "ZA",
    name: "Afrique du Sud",
    continent: "Afrique",
    flag: "\u{1F1FF}\u{1F1E6}",
    lat: -30.6,
    lng: 22.9,
    cities: [
      { id: "cape-town", name: "Le Cap", description: "Entre Table Mountain et deux océans, un décor à couper le souffle", imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800", lat: -33.93, lng: 18.42 },
      { id: "johannesburg", name: "Johannesburg", description: "Ville la plus dynamique d'Afrique, art et histoire à chaque coin", imageUrl: "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=800", lat: -26.2, lng: 28.04 },
      { id: "durban", name: "Durban", description: "Surf, curry et Golden Mile sur l'océan Indien", imageUrl: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800", lat: -29.86, lng: 31.02 },
    ],
  },
  {
    code: "AU",
    name: "Australie",
    continent: "Océanie",
    flag: "\u{1F1E6}\u{1F1FA}",
    lat: -25.3,
    lng: 133.8,
    cities: [
      { id: "sydney", name: "Sydney", description: "Opéra iconique, Harbour Bridge et plages mythiques", imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800", lat: -33.87, lng: 151.21 },
      { id: "melbourne", name: "Melbourne", description: "Capitale culturelle, street art et meilleur café au monde", imageUrl: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800", lat: -37.81, lng: 144.96 },
      { id: "cairns", name: "Cairns", description: "Porte d'entrée de la Grande Barrière de Corail", imageUrl: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800", lat: -16.92, lng: 145.77 },
    ],
  },
  {
    code: "CA",
    name: "Canada",
    continent: "Amérique du Nord",
    flag: "\u{1F1E8}\u{1F1E6}",
    lat: 56.1,
    lng: -106.3,
    cities: [
      { id: "montreal", name: "Montréal", description: "Mélange unique de culture francophone et énergie nord-américaine", imageUrl: "https://images.unsplash.com/photo-1519178614-68673b201f36?w=800", lat: 45.5, lng: -73.57 },
      { id: "vancouver", name: "Vancouver", description: "Entre montagnes enneigées et océan Pacifique", imageUrl: "https://images.unsplash.com/photo-1559511260-66a68eb2dc18?w=800", lat: 49.28, lng: -123.12 },
      { id: "quebec-city", name: "Québec", description: "Vieille ville fortifiée, charme européen en Amérique", imageUrl: "https://images.unsplash.com/photo-1568127861456-a56e61e1c3f6?w=800", lat: 46.81, lng: -71.21 },
    ],
  },
  {
    code: "IN",
    name: "Inde",
    continent: "Asie",
    flag: "\u{1F1EE}\u{1F1F3}",
    lat: 20.6,
    lng: 78.9,
    cities: [
      { id: "jaipur", name: "Jaipur", description: "La ville rose, porte d'entrée du Rajasthan royal", imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800", lat: 26.91, lng: 75.79 },
      { id: "varanasi", name: "Varanasi", description: "Ville sacrée millénaire sur les rives du Gange", imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800", lat: 25.32, lng: 82.99 },
      { id: "goa", name: "Goa", description: "Plages dorées, héritage portugais et fêtes légendaires", imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800", lat: 15.3, lng: 74.12 },
    ],
  },
  {
    code: "GR",
    name: "Grèce",
    continent: "Europe",
    flag: "\u{1F1EC}\u{1F1F7}",
    lat: 39.1,
    lng: 21.8,
    cities: [
      { id: "athens", name: "Athènes", description: "Berceau de la civilisation occidentale au pied de l'Acropole", imageUrl: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800", lat: 37.97, lng: 23.73 },
      { id: "santorini", name: "Santorin", description: "Couchers de soleil magiques sur les maisons blanches et bleues", imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800", lat: 36.39, lng: 25.46 },
      { id: "crete", name: "Crète", description: "Plus grande île grecque, entre gorges sauvages et plages de rêve", imageUrl: "https://images.unsplash.com/photo-1564594736624-def7a10ab047?w=800", lat: 35.24, lng: 24.9 },
    ],
  },
  {
    code: "PE",
    name: "Pérou",
    continent: "Amérique du Sud",
    flag: "\u{1F1F5}\u{1F1EA}",
    lat: -9.2,
    lng: -75.0,
    cities: [
      { id: "lima", name: "Lima", description: "Capitale gastronomique de l'Amérique du Sud", imageUrl: "https://images.unsplash.com/photo-1531968455001-5c5272a67c78?w=800", lat: -12.05, lng: -77.04 },
      { id: "cusco", name: "Cusco", description: "Ancienne capitale inca, porte du Machu Picchu", imageUrl: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800", lat: -13.53, lng: -71.97 },
      { id: "arequipa", name: "Arequipa", description: "La ville blanche au pied des volcans andins", imageUrl: "https://images.unsplash.com/photo-1580968614926-4128f0ed4c18?w=800", lat: -16.41, lng: -71.54 },
    ],
  },
  {
    code: "IS",
    name: "Islande",
    continent: "Europe",
    flag: "\u{1F1EE}\u{1F1F8}",
    lat: 64.9,
    lng: -19.0,
    cities: [
      { id: "reykjavik", name: "Reykjavik", description: "Capitale la plus septentrionale au monde, colorée et créative", imageUrl: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800", lat: 64.15, lng: -21.94 },
      { id: "akureyri", name: "Akureyri", description: "Capitale du Nord, base pour les fjords et les baleines", imageUrl: "https://images.unsplash.com/photo-1520769945061-0a448c463865?w=800", lat: 65.68, lng: -18.09 },
      { id: "vik", name: "Vik", description: "Plage de sable noir, colonnes de basalte et aurores boréales", imageUrl: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800", lat: 63.42, lng: -19.01 },
    ],
  },
  {
    code: "VN",
    name: "Vietnam",
    continent: "Asie",
    flag: "\u{1F1FB}\u{1F1F3}",
    lat: 14.1,
    lng: 108.3,
    cities: [
      { id: "hanoi", name: "Hanoï", description: "Capitale millénaire entre lacs, temples et chaos charmant", imageUrl: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800", lat: 21.03, lng: 105.85 },
      { id: "hoi-an", name: "Hoi An", description: "Ville aux lanternes, patrimoine UNESCO et meilleure cuisine locale", imageUrl: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800", lat: 15.88, lng: 108.33 },
      { id: "ho-chi-minh", name: "Hô Chi Minh-Ville", description: "Ancienne Saïgon, énergie folle et street food à chaque coin", imageUrl: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800", lat: 10.82, lng: 106.63 },
    ],
  },
];

// Helper to find country by ISO code
export function getCountryByCode(code: string): Country | undefined {
  return countries.find((c) => c.code === code);
}

// Helper to get a random country
export function getRandomCountry(): Country {
  return countries[Math.floor(Math.random() * countries.length)];
}

// Helper to get city by ID
export function getCityById(cityId: string): { city: City; country: Country } | undefined {
  for (const country of countries) {
    const city = country.cities.find((c) => c.id === cityId);
    if (city) return { city, country };
  }
  return undefined;
}
