export interface Activity {
  name: string;
  type: "visit" | "food" | "activity" | "nightlife";
  description: string;
  imageUrl: string;
  tip?: string;
}

export interface CityGuide {
  cityId: string;
  highlights: string[];
  activities: Activity[];
  bestSeason: string;
  budgetPerDay: string; // e.g. "50-80€"
}

const typeEmojis: Record<Activity["type"], string> = {
  visit: "\u{1F3DB}\u{FE0F}",
  food: "\u{1F372}",
  activity: "\u{1F3C4}",
  nightlife: "\u{1F378}",
};

export function getTypeEmoji(type: Activity["type"]): string {
  return typeEmojis[type];
}

export const guides: Record<string, CityGuide> = {
  paris: {
    cityId: "paris",
    highlights: ["Tour Eiffel au coucher du soleil", "Croissant au beurre à Saint-Germain", "Balade sur les quais de Seine"],
    bestSeason: "Avril-Juin / Sept-Oct",
    budgetPerDay: "80-150€",
    activities: [
      { name: "Musée du Louvre", type: "visit", description: "Le plus grand musée du monde — prévoir minimum 3h", imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600", tip: "Entrée gratuite le 1er dimanche du mois" },
      { name: "Croissant chez Du Pain et des Idées", type: "food", description: "Meilleure boulangerie de Paris, le pain des amis est légendaire", imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=600" },
      { name: "Montmartre & Sacré-Cœur", type: "visit", description: "Village dans la ville, artistes de rue et vue panoramique", imageUrl: "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?w=600" },
      { name: "Croisière sur la Seine", type: "activity", description: "1h de bateau pour voir tous les monuments illuminés", imageUrl: "https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=600", tip: "Prendre le billet pour le coucher du soleil" },
      { name: "Le Marais by night", type: "nightlife", description: "Bars à cocktails, galeries et ambiance unique", imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600" },
    ],
  },
  tokyo: {
    cityId: "tokyo",
    highlights: ["Shibuya Crossing à l'heure de pointe", "Ramen à 2h du mat'", "Temple Senso-ji à l'aube"],
    bestSeason: "Mars-Mai (sakura) / Oct-Nov",
    budgetPerDay: "60-120€",
    activities: [
      { name: "Shibuya Crossing", type: "visit", description: "Le carrefour le plus traversé au monde, vertigineux", imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600" },
      { name: "Ramen à Ichiran", type: "food", description: "Ramen tonkotsu dans des box individuels, expérience unique", imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600", tip: "Commander les œufs extra et les nouilles al dente" },
      { name: "Senso-ji, Asakusa", type: "visit", description: "Plus ancien temple de Tokyo, magnifique à l'aube", imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600" },
      { name: "Karaoké à Kabukicho", type: "nightlife", description: "Louer une salle privée et chanter jusqu'au dernier train", imageUrl: "https://images.unsplash.com/photo-1554797589-7241bb691973?w=600" },
      { name: "Marché de Tsukiji", type: "food", description: "Sushi et street food ultra-frais dès 7h du matin", imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600" },
    ],
  },
  marrakech: {
    cityId: "marrakech",
    highlights: ["Place Jemaa el-Fna au crépuscule", "Thé à la menthe sur un rooftop", "Se perdre dans les souks"],
    bestSeason: "Mars-Mai / Oct-Nov",
    budgetPerDay: "30-60€",
    activities: [
      { name: "Place Jemaa el-Fna", type: "visit", description: "Le cœur battant de Marrakech — conteurs, musiciens, stands de jus d'orange", imageUrl: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=600" },
      { name: "Tagine au Café des Épices", type: "food", description: "Tagine d'agneau aux pruneaux avec vue sur la place", imageUrl: "https://images.unsplash.com/photo-1511690743698-d9d18f7e20f1?w=600" },
      { name: "Jardin Majorelle", type: "visit", description: "Oasis bleu de Yves Saint-Laurent, un bijou botanique", imageUrl: "https://images.unsplash.com/photo-1591017403286-fd8493524e1e?w=600", tip: "Y aller tôt le matin pour éviter la foule" },
      { name: "Hammam traditionnel", type: "activity", description: "Expérience spa authentique avec gommage au savon noir", imageUrl: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600" },
    ],
  },
  rio: {
    cityId: "rio",
    highlights: ["Vue depuis le Pain de Sucre", "Caipirinha sur la plage d'Ipanema", "Samba à Lapa"],
    bestSeason: "Déc-Mars (été) / Carnaval en février",
    budgetPerDay: "40-80€",
    activities: [
      { name: "Christ Rédempteur", type: "visit", description: "Statue iconique au sommet du Corcovado, vue 360° sur la baie", imageUrl: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600" },
      { name: "Feijoada chez Bar do Mineiro", type: "food", description: "Le plat national brésilien dans le quartier bohème de Santa Teresa", imageUrl: "https://images.unsplash.com/photo-1579631542720-3a87824835f4?w=600" },
      { name: "Plage d'Ipanema", type: "activity", description: "Poser sa serviette, jouer au frescobol et admirer le coucher de soleil", imageUrl: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?w=600" },
      { name: "Samba à Pedra do Sal", type: "nightlife", description: "Berceau de la samba, concert en plein air chaque lundi", imageUrl: "https://images.unsplash.com/photo-1551279880-03041531e184?w=600", tip: "Lundi et vendredi soir pour l'ambiance authentique" },
    ],
  },
  reykjavik: {
    cityId: "reykjavik",
    highlights: ["Aurores boréales en hiver", "Blue Lagoon au crépuscule", "Midnight sun en été"],
    bestSeason: "Juin-Août (soleil) / Nov-Fév (aurores)",
    budgetPerDay: "100-180€",
    activities: [
      { name: "Blue Lagoon", type: "activity", description: "Bain géothermal bleu laiteux dans un décor lunaire", imageUrl: "https://images.unsplash.com/photo-1515238152791-8216bfcf7e2e?w=600", tip: "Réserver plusieurs semaines à l'avance" },
      { name: "Hallgrimskirkja", type: "visit", description: "Église iconique en forme d'orgue basaltique, vue panoramique du clocher", imageUrl: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=600" },
      { name: "Hot-dog chez Bæjarins Beztu", type: "food", description: "Le meilleur hot-dog du monde selon Bill Clinton — sauce rémoulade obligatoire", imageUrl: "https://images.unsplash.com/photo-1619740455993-9d701b9280b6?w=600" },
      { name: "Chasse aux aurores boréales", type: "activity", description: "Sortie nocturne en 4x4 loin de la pollution lumineuse", imageUrl: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=600" },
    ],
  },
  lyon: {
    cityId: "lyon",
    highlights: ["Bouchons lyonnais authentiques", "Fresques murales géantes", "Confluence des deux fleuves"],
    bestSeason: "Mai-Sept",
    budgetPerDay: "60-100€",
    activities: [
      { name: "Vieux Lyon & traboules", type: "visit", description: "Passages secrets Renaissance entre les immeubles — chasse au trésor urbaine", imageUrl: "https://images.unsplash.com/photo-1524396309943-e03f5249f002?w=600" },
      { name: "Bouchon Chez Paul Bocuse", type: "food", description: "Quenelle de brochet et tablier de sapeur dans un vrai bouchon", imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600" },
      { name: "Fresque des Lyonnais", type: "visit", description: "Mur peint géant de 800m² avec les figures célèbres de Lyon", imageUrl: "https://images.unsplash.com/photo-1560983073-c29bff7438ef?w=600" },
      { name: "Soirée sur les péniches", type: "nightlife", description: "Bars flottants sur le Rhône, ambiance festive garantie", imageUrl: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600" },
    ],
  },
  nice: {
    cityId: "nice",
    highlights: ["Promenade des Anglais au petit matin", "Socca brûlante au Cours Saleya", "Eau turquoise en ville"],
    bestSeason: "Mai-Oct",
    budgetPerDay: "70-120€",
    activities: [
      { name: "Promenade des Anglais", type: "activity", description: "Longer la baie des Anges à pied ou en vélo, 7km de bonheur", imageUrl: "https://images.unsplash.com/photo-1491166617655-0723a0999cfc?w=600" },
      { name: "Socca au marché du Cours Saleya", type: "food", description: "Galette de pois chiches croustillante, le street food niçois par excellence", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600" },
      { name: "Colline du Château", type: "visit", description: "Vue panoramique sur la Baie des Anges et les toits de la vieille ville", imageUrl: "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?w=600" },
    ],
  },
  bordeaux: {
    cityId: "bordeaux",
    highlights: ["Miroir d'eau Place de la Bourse", "Dégustation dans un grand cru", "Architecture XVIIIe siècle"],
    bestSeason: "Mai-Oct",
    budgetPerDay: "60-110€",
    activities: [
      { name: "Miroir d'eau", type: "visit", description: "Plus grand miroir d'eau du monde — magique au coucher du soleil", imageUrl: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600" },
      { name: "Cité du Vin", type: "visit", description: "Musée interactif dédié au vin avec dégustation panoramique au 8e étage", imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600", tip: "Prendre le billet avec dégustation incluse" },
      { name: "Cannelés chez Baillardran", type: "food", description: "Spécialité bordelaise caramélisée, fondante à l'intérieur", imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600" },
      { name: "Darwin Écosystème", type: "nightlife", description: "Friche urbaine reconvertie en lieu de vie : skatepark, bars, street art", imageUrl: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600" },
    ],
  },
  kyoto: {
    cityId: "kyoto",
    highlights: ["Forêt de bambous d'Arashiyama", "Geishas à Gion au crépuscule", "Jardin zen hypnotique"],
    bestSeason: "Mars-Mai (sakura) / Nov (momiji)",
    budgetPerDay: "50-100€",
    activities: [
      { name: "Fushimi Inari-taisha", type: "visit", description: "10 000 torii vermillon qui serpentent dans la montagne", imageUrl: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=600", tip: "Y aller à 6h du matin pour être seul" },
      { name: "Forêt de bambous d'Arashiyama", type: "activity", description: "Marche irréelle au milieu des bambous géants", imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600" },
      { name: "Kaiseki ryori", type: "food", description: "Haute cuisine japonaise multi-plats, art culinaire en miniature", imageUrl: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=600" },
      { name: "Quartier de Gion", type: "visit", description: "Quartier des geishas, maisons de thé en bois et lanternes", imageUrl: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600" },
    ],
  },
  osaka: {
    cityId: "osaka",
    highlights: ["Dotonbori illuminé la nuit", "Takoyaki brûlants dans la rue", "Ambiance folle et accueillante"],
    bestSeason: "Mars-Mai / Oct-Nov",
    budgetPerDay: "50-90€",
    activities: [
      { name: "Dotonbori", type: "visit", description: "Avenue néon mythique — le Glico Man, les crabes géants et la foule", imageUrl: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=600" },
      { name: "Takoyaki chez Wanaka", type: "food", description: "Boulettes de poulpe croustillantes-fondantes, le snack roi d'Osaka", imageUrl: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=600" },
      { name: "Château d'Osaka", type: "visit", description: "Forteresse blanche entourée de douves et de cerisiers", imageUrl: "https://images.unsplash.com/photo-1589452271712-64b8a66c3621?w=600" },
      { name: "Shinsekai by night", type: "nightlife", description: "Quartier rétro aux néons vintage, kushikatsu et bières pas chères", imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600" },
    ],
  },
  bangkok: {
    cityId: "bangkok",
    highlights: ["Pad Thai dans la rue à 1€", "Temples dorés au lever du soleil", "Tuk-tuk ride de nuit"],
    bestSeason: "Nov-Fév (saison sèche)",
    budgetPerDay: "20-50€",
    activities: [
      { name: "Grand Palace & Wat Phra Kaew", type: "visit", description: "Complexe royal éblouissant avec le Bouddha d'Émeraude", imageUrl: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=600", tip: "Y aller dès 8h30, couvrir épaules et genoux" },
      { name: "Street food à Yaowarat (Chinatown)", type: "food", description: "Le meilleur pad thai, mango sticky rice et brochettes de la ville", imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600" },
      { name: "Wat Arun au coucher du soleil", type: "visit", description: "Le temple de l'Aube illuminé depuis l'autre rive du fleuve", imageUrl: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600" },
      { name: "Rooftop bar Sky Bar", type: "nightlife", description: "Cocktail au 63e étage avec vue vertigineuse sur la skyline", imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600" },
    ],
  },
  "chiang-mai": {
    cityId: "chiang-mai",
    highlights: ["300 temples dans la vieille ville", "Cours de cuisine thaï", "Night Bazaar animé"],
    bestSeason: "Nov-Fév",
    budgetPerDay: "15-40€",
    activities: [
      { name: "Doi Suthep", type: "visit", description: "Temple doré au sommet de la montagne avec vue sur toute la vallée", imageUrl: "https://images.unsplash.com/photo-1598935898639-81586f7d2129?w=600", tip: "Y monter pour le coucher du soleil" },
      { name: "Cours de cuisine thaï", type: "activity", description: "Apprendre le pad thai, curry vert et mango sticky rice au marché", imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600" },
      { name: "Khao Soi", type: "food", description: "Soupe de nouilles au curry du Nord, crémeuse et épicée — le plat signature", imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600" },
      { name: "Night Bazaar", type: "nightlife", description: "Marché nocturne géant : artisanat, street food et musique live", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600" },
    ],
  },
  phuket: {
    cityId: "phuket",
    highlights: ["Plages de rêve", "Coucher de soleil à Promthep Cape", "Îles Phi Phi en bateau"],
    bestSeason: "Nov-Avr (saison sèche)",
    budgetPerDay: "30-70€",
    activities: [
      { name: "Plage de Kata", type: "activity", description: "Eau cristalline, sable fin, snorkeling accessible depuis la plage", imageUrl: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600" },
      { name: "Excursion îles Phi Phi", type: "activity", description: "Speedboat vers les falaises calcaires et lagons turquoise", imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600" },
      { name: "Pad Thai au marché de Rawai", type: "food", description: "Poisson grillé et fruits de mer ultra-frais en bord de mer", imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600" },
    ],
  },
  "sao-paulo": {
    cityId: "sao-paulo",
    highlights: ["Street art à Vila Madalena", "Meilleure scène food d'Amérique latine", "Vie nocturne infatigable"],
    bestSeason: "Avr-Sept (hiver doux)",
    budgetPerDay: "35-70€",
    activities: [
      { name: "Beco do Batman", type: "visit", description: "Ruelle entièrement recouverte de graffitis à Vila Madalena", imageUrl: "https://images.unsplash.com/photo-1554168848-228152bcb7f7?w=600" },
      { name: "Mercado Municipal", type: "food", description: "Sandwich mortadella légendaire et fruits tropicaux au marché centenaire", imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600" },
      { name: "Avenida Paulista le dimanche", type: "activity", description: "L'avenue fermée aux voitures — vélo, skate et musique de rue", imageUrl: "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?w=600" },
      { name: "Vila Madalena by night", type: "nightlife", description: "Le quartier bohème qui ne dort jamais — bars, clubs et live music", imageUrl: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600" },
    ],
  },
  salvador: {
    cityId: "salvador",
    highlights: ["Pelourinho coloré", "Acarajé sur la plage", "Capoeira au coucher du soleil"],
    bestSeason: "Déc-Mars / Carnaval en février",
    budgetPerDay: "25-55€",
    activities: [
      { name: "Pelourinho", type: "visit", description: "Centre historique UNESCO aux façades coloniales colorées", imageUrl: "https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?w=600" },
      { name: "Acarajé de Dinha", type: "food", description: "Beignet de haricot farci aux crevettes, emblème de Bahia", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600" },
      { name: "Roda de Capoeira", type: "activity", description: "Assister à un cercle de capoeira sur la place — énergie pure", imageUrl: "https://images.unsplash.com/photo-1551279880-03041531e184?w=600" },
    ],
  },
  fes: {
    cityId: "fes",
    highlights: ["Médina labyrinthique", "Tanneries colorées", "Artisanat millénaire"],
    bestSeason: "Mars-Mai / Oct-Nov",
    budgetPerDay: "25-50€",
    activities: [
      { name: "Tanneries Chouara", type: "visit", description: "Cuves de teinture colorées vues depuis les terrasses — spectacle unique", imageUrl: "https://images.unsplash.com/photo-1580746738099-78d6833aba81?w=600", tip: "Prendre un brin de menthe pour l'odeur" },
      { name: "Médina de Fès el-Bali", type: "activity", description: "Se perdre dans la plus grande zone piétonne au monde, 9000 ruelles", imageUrl: "https://images.unsplash.com/photo-1553244646-44c5c5765b49?w=600" },
      { name: "Pastilla au pigeon", type: "food", description: "Feuilleté sucré-salé au pigeon et amandes, spécialité de Fès", imageUrl: "https://images.unsplash.com/photo-1541518763-a2d3e3363534?w=600" },
    ],
  },
  chefchaouen: {
    cityId: "chefchaouen",
    highlights: ["Tout est bleu", "Randonnée dans le Rif", "Fromage de chèvre local"],
    bestSeason: "Mars-Mai / Sept-Nov",
    budgetPerDay: "20-40€",
    activities: [
      { name: "Médina bleue", type: "visit", description: "Flâner dans les ruelles peintes en bleu — chaque coin est une photo", imageUrl: "https://images.unsplash.com/photo-1553244646-44c5c5765b49?w=600" },
      { name: "Cascade d'Akchour", type: "activity", description: "Randonnée vers des cascades turquoise dans les montagnes du Rif", imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600" },
      { name: "Bissara au marché", type: "food", description: "Soupe de fèves épicée servie avec du pain chaud, petit-déj local à 50 centimes", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600" },
    ],
  },
  rome: {
    cityId: "rome",
    highlights: ["Colisée au lever du soleil", "Pasta alla carbonara authentique", "Fontaine de Trevi à minuit"],
    bestSeason: "Avr-Juin / Sept-Oct",
    budgetPerDay: "70-130€",
    activities: [
      { name: "Colisée & Forum Romain", type: "visit", description: "2000 ans d'histoire concentrés en un seul lieu — frissons garantis", imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600", tip: "Billet combiné Colisée + Palatin + Forum" },
      { name: "Carbonara chez Roscioli", type: "food", description: "La vraie carbonara : guanciale, pecorino, œufs — point final", imageUrl: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600" },
      { name: "Trastevere by night", type: "nightlife", description: "Quartier bohème aux ruelles pavées, terrasses et musique live", imageUrl: "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=600" },
      { name: "Vatican & Chapelle Sixtine", type: "visit", description: "Michel-Ange au plafond — un des moments les plus forts d'une vie", imageUrl: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=600", tip: "Réserver en ligne, entrer dès l'ouverture" },
    ],
  },
  florence: {
    cityId: "florence",
    highlights: ["Dôme de Brunelleschi", "Gelato artisanal", "Ponte Vecchio au coucher du soleil"],
    bestSeason: "Avr-Juin / Sept-Oct",
    budgetPerDay: "60-120€",
    activities: [
      { name: "Galerie des Offices", type: "visit", description: "Botticelli, Raphaël, Léonard — la Renaissance en condensé", imageUrl: "https://images.unsplash.com/photo-1543429258-c5ca3e1b6a68?w=600" },
      { name: "Gelato chez Vivoli", type: "food", description: "Plus ancienne gelateria de Florence depuis 1930 — pistachio obligatoire", imageUrl: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600" },
      { name: "Piazzale Michelangelo", type: "visit", description: "Panorama à couper le souffle sur toute la ville au sunset", imageUrl: "https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?w=600" },
      { name: "Bistecca alla Fiorentina", type: "food", description: "Côte de bœuf de 1kg grillée, l'expérience carnivore ultime", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600" },
    ],
  },
  venice: {
    cityId: "venice",
    highlights: ["Gondole sur le Grand Canal", "Place Saint-Marc à l'aube", "Cicchetti et Spritz"],
    bestSeason: "Avr-Juin / Sept-Oct",
    budgetPerDay: "80-150€",
    activities: [
      { name: "Place Saint-Marc", type: "visit", description: "La plus belle place du monde selon Napoléon — basilique dorée et campanile", imageUrl: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600" },
      { name: "Cicchetti et Spritz", type: "food", description: "Tapas vénitiennes et Aperol Spritz debout au comptoir d'un bacaro", imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600" },
      { name: "Murano & Burano", type: "activity", description: "Îles du verre soufflé et des maisons arc-en-ciel — vaporetto obligatoire", imageUrl: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=600" },
    ],
  },
  "mexico-city": {
    cityId: "mexico-city",
    highlights: ["Tacos al pastor à chaque coin", "Frida Kahlo à la Casa Azul", "Zócalo monumental"],
    bestSeason: "Nov-Avr (saison sèche)",
    budgetPerDay: "25-55€",
    activities: [
      { name: "Museo Frida Kahlo", type: "visit", description: "La Casa Azul — plongée dans l'univers intime de Frida", imageUrl: "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?w=600", tip: "Réserver en ligne, les places partent vite" },
      { name: "Tacos al pastor", type: "food", description: "Porc mariné à la broche, ananas grillé — le taco parfait", imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600" },
      { name: "Xochimilco en trajinera", type: "activity", description: "Balade en barque colorée sur les canaux aztèques avec mariachis", imageUrl: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=600" },
      { name: "Mezcalería à Roma Norte", type: "nightlife", description: "Quartier branché, bars à mezcal artisanal et terrasses sur les trottoirs", imageUrl: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600" },
    ],
  },
};

// Fallback guide for cities without detailed data
export const defaultGuide: CityGuide = {
  cityId: "default",
  highlights: ["Explorer la ville à pied", "Goûter la cuisine locale", "Rencontrer les locaux"],
  bestSeason: "Se renseigner selon le climat",
  budgetPerDay: "Variable",
  activities: [
    { name: "Centre historique", type: "visit", description: "Découvrir le cœur de la ville et son architecture", imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600" },
    { name: "Marché local", type: "food", description: "Goûter les spécialités au marché principal", imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600" },
    { name: "Balade au coucher du soleil", type: "activity", description: "Trouver le meilleur spot pour admirer le sunset", imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600" },
  ],
};

export function getGuide(cityId: string): CityGuide {
  return guides[cityId] || defaultGuide;
}

// Additional guides added to main guides object
Object.assign(guides, {
  oaxaca: {
    cityId: "oaxaca",
    highlights: ["Mole negro légendaire", "Marchés colorés", "Mezcal artisanal"],
    bestSeason: "Oct-Avr",
    budgetPerDay: "20-45€",
    activities: [
      { name: "Mercado Benito Juárez", type: "visit", description: "Marché débordant de mole, chapulines et chocolat", imageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600" },
      { name: "Mole negro", type: "food", description: "30 ingrédients, 3 jours de préparation — le plat le plus complexe du Mexique", imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600" },
      { name: "Monte Albán", type: "visit", description: "Ruines zapotèques au sommet d'une montagne aplanie, vue vertigineuse", imageUrl: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=600" },
    ],
  },
  tulum: {
    cityId: "tulum",
    highlights: ["Ruines mayas face à la mer", "Cénotes cristallins", "Beach clubs bohèmes"],
    bestSeason: "Nov-Avr",
    budgetPerDay: "40-90€",
    activities: [
      { name: "Ruines de Tulum", type: "visit", description: "Seul site maya en bord de mer — falaise, temple et eau turquoise", imageUrl: "https://images.unsplash.com/photo-1682553064750-972e2be0d435?w=600" },
      { name: "Cénote Suytun", type: "activity", description: "Nager dans une grotte souterraine illuminée par un puits de lumière", imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600" },
      { name: "Tacos de poisson sur la plage", type: "food", description: "Poisson grillé, salsa verde et tortilla maison les pieds dans le sable", imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600" },
    ],
  },
  "cape-town": {
    cityId: "cape-town",
    highlights: ["Table Mountain au lever du soleil", "Vignobles de Stellenbosch", "Pingouins à Boulders Beach"],
    bestSeason: "Nov-Mars (été austral)",
    budgetPerDay: "40-80€",
    activities: [
      { name: "Table Mountain", type: "activity", description: "Randonnée ou téléphérique vers un plateau avec vue 360°", imageUrl: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600" },
      { name: "Bo-Kaap", type: "visit", description: "Quartier aux maisons multicolores sur les pentes de Signal Hill", imageUrl: "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?w=600" },
      { name: "Braai au V&A Waterfront", type: "food", description: "BBQ sud-africain avec vue sur le port et Table Mountain", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600" },
    ],
  },
  johannesburg: {
    cityId: "johannesburg",
    highlights: ["Apartheid Museum", "Maboneng branché", "Soweto historique"],
    bestSeason: "Mai-Sept (hiver sec)",
    budgetPerDay: "30-60€",
    activities: [
      { name: "Apartheid Museum", type: "visit", description: "Musée poignant sur l'histoire de la ségrégation — incontournable", imageUrl: "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=600" },
      { name: "Maboneng Precinct", type: "visit", description: "Ancien quartier industriel devenu hub créatif", imageUrl: "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?w=600" },
      { name: "Bunny Chow", type: "food", description: "Pain évidé rempli de curry — street food emblématique", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600" },
    ],
  },
  durban: {
    cityId: "durban",
    highlights: ["Golden Mile en bord de mer", "Curry indien authentique", "Surf toute l'année"],
    bestSeason: "Avr-Sept (hiver doux)",
    budgetPerDay: "25-50€",
    activities: [
      { name: "Golden Mile", type: "activity", description: "Promenade en front de mer, surf et ambiance détendue", imageUrl: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600" },
      { name: "Curry à Britannia Hotel", type: "food", description: "Meilleur curry indien d'Afrique — communauté indienne légendaire", imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600" },
      { name: "Marché Victoria Street", type: "visit", description: "Épices, tissus et artisanat dans le plus grand marché indien d'Afrique", imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600" },
    ],
  },
  sydney: {
    cityId: "sydney",
    highlights: ["Opéra au bord de l'eau", "Bondi to Coogee walk", "Fish & chips à Manly"],
    bestSeason: "Sept-Nov / Mars-Mai",
    budgetPerDay: "70-130€",
    activities: [
      { name: "Sydney Opera House", type: "visit", description: "Chef-d'œuvre architectural au bord du Harbour — prendre un verre au bar", imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600" },
      { name: "Bondi to Coogee Walk", type: "activity", description: "Sentier côtier de 6km entre falaises, plages et piscines naturelles", imageUrl: "https://images.unsplash.com/photo-1523428096049-1c4f7e862b63?w=600" },
      { name: "Fish & chips à Manly", type: "food", description: "Ferry depuis le Harbour puis fish & chips sur la plage", imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600" },
    ],
  },
  melbourne: {
    cityId: "melbourne",
    highlights: ["Meilleur café au monde", "Laneways et street art", "Scène food multiculturelle"],
    bestSeason: "Nov-Avr",
    budgetPerDay: "60-120€",
    activities: [
      { name: "Hosier Lane", type: "visit", description: "La ruelle street art la plus célèbre au monde — change chaque semaine", imageUrl: "https://images.unsplash.com/photo-1514395462725-fb4566210144?w=600" },
      { name: "Flat white dans un café de spécialité", type: "food", description: "Melbourne a inventé le flat white — goûter chez Market Lane ou Seven Seeds", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600" },
      { name: "Queen Victoria Market", type: "activity", description: "Marché couvert historique — food, vintage et ambiance le week-end", imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600" },
    ],
  },
  cairns: {
    cityId: "cairns",
    highlights: ["Grande Barrière de Corail", "Forêt tropicale de Daintree", "Snorkeling de classe mondiale"],
    bestSeason: "Juin-Oct (saison sèche)",
    budgetPerDay: "60-110€",
    activities: [
      { name: "Grande Barrière de Corail", type: "activity", description: "Snorkeling ou plongée sur le plus grand récif du monde", imageUrl: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600" },
      { name: "Forêt de Daintree", type: "activity", description: "Plus ancienne forêt tropicale du monde — 180 millions d'années", imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600" },
      { name: "Barramundi grillé", type: "food", description: "Poisson local grillé au marché nocturne de Cairns", imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600" },
    ],
  },
  montreal: {
    cityId: "montreal",
    highlights: ["Poutine légendaire", "Vieux-Montréal en été", "Festivals non-stop"],
    bestSeason: "Juin-Sept",
    budgetPerDay: "50-90€",
    activities: [
      { name: "Vieux-Montréal", type: "visit", description: "Rues pavées, basilique Notre-Dame et architecture française du XVIIe", imageUrl: "https://images.unsplash.com/photo-1519178614-68673b201f36?w=600" },
      { name: "Poutine chez La Banquise", type: "food", description: "30 variantes de poutine ouverte 24h/24 — la classique est parfaite", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600" },
      { name: "Mont Royal", type: "activity", description: "Randonnée facile avec vue panoramique sur toute la ville", imageUrl: "https://images.unsplash.com/photo-1519178614-68673b201f36?w=600" },
      { name: "Plateau Mont-Royal by night", type: "nightlife", description: "Boulevard Saint-Laurent, terrasses, bars et live music", imageUrl: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600" },
    ],
  },
  vancouver: {
    cityId: "vancouver",
    highlights: ["Montagnes et océan en simultané", "Stanley Park", "Sushi de classe mondiale"],
    bestSeason: "Juin-Sept",
    budgetPerDay: "60-110€",
    activities: [
      { name: "Stanley Park Seawall", type: "activity", description: "Boucle de 10km à vélo entre forêt, totems et vue sur les montagnes", imageUrl: "https://images.unsplash.com/photo-1559511260-66a68eb2dc18?w=600" },
      { name: "Sushi sur Robson Street", type: "food", description: "Le meilleur sushi hors Japon — grâce à la communauté japonaise locale", imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600" },
      { name: "Granville Island", type: "visit", description: "Marché public, brasseries artisanales et galeries sous les ponts", imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600" },
    ],
  },
  "quebec-city": {
    cityId: "quebec-city",
    highlights: ["Château Frontenac iconique", "Vieille ville fortifiée", "Sucre à la crème"],
    bestSeason: "Juin-Sept / Déc-Fév (Carnaval d'hiver)",
    budgetPerDay: "50-90€",
    activities: [
      { name: "Vieux-Québec", type: "visit", description: "Seule ville fortifiée d'Amérique du Nord — charme européen garanti", imageUrl: "https://images.unsplash.com/photo-1568127861456-a56e61e1c3f6?w=600" },
      { name: "Poutine au fromage en grains", type: "food", description: "La poutine originale avec le vrai squeaky cheese québécois", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600" },
      { name: "Terrasse Dufferin", type: "activity", description: "Promenade devant le Château Frontenac avec vue sur le Saint-Laurent", imageUrl: "https://images.unsplash.com/photo-1568127861456-a56e61e1c3f6?w=600" },
    ],
  },
  jaipur: {
    cityId: "jaipur",
    highlights: ["La ville rose", "Hawa Mahal au petit matin", "Chai masala dans la rue"],
    bestSeason: "Oct-Mars",
    budgetPerDay: "15-35€",
    activities: [
      { name: "Hawa Mahal", type: "visit", description: "Le Palais des Vents aux 953 fenêtres — iconique au lever du soleil", imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600" },
      { name: "Amber Fort", type: "visit", description: "Forteresse majestueuse surplombant le lac Maota", imageUrl: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600" },
      { name: "Thali rajasthani", type: "food", description: "Plateau de 15 mini plats épicés — un festival de saveurs", imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600" },
    ],
  },
  varanasi: {
    cityId: "varanasi",
    highlights: ["Ghats au lever du soleil", "Cérémonie Ganga Aarti", "Plus ancienne ville habitée"],
    bestSeason: "Oct-Mars",
    budgetPerDay: "10-25€",
    activities: [
      { name: "Ganga Aarti aux Ghats", type: "visit", description: "Cérémonie du feu au bord du Gange chaque soir — hypnotique", imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600" },
      { name: "Balade en barque à l'aube", type: "activity", description: "Voir les ghats s'éveiller depuis le fleuve au lever du soleil", imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600" },
      { name: "Lassi chez Blue Lassi", type: "food", description: "Yaourt battu aux fruits frais et épices dans un minuscule shop culte", imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600" },
    ],
  },
  goa: {
    cityId: "goa",
    highlights: ["Plages dorées infinies", "Héritage portugais", "Trance et chill"],
    bestSeason: "Nov-Fév",
    budgetPerDay: "15-40€",
    activities: [
      { name: "Plage de Palolem", type: "activity", description: "Baie en croissant de lune bordée de cocotiers — paradis tranquille", imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600" },
      { name: "Old Goa", type: "visit", description: "Églises portugaises UNESCO — la Basilique du Bom Jesus est splendide", imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600" },
      { name: "Fish curry rice", type: "food", description: "Curry de poisson au kokum avec riz — le plat du quotidien goanais", imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600" },
    ],
  },
  athens: {
    cityId: "athens",
    highlights: ["Acropole au coucher du soleil", "Souvlaki à 2€", "Anarchie créative d'Exarchia"],
    bestSeason: "Avr-Juin / Sept-Oct",
    budgetPerDay: "40-70€",
    activities: [
      { name: "Acropole & Parthénon", type: "visit", description: "Le berceau de la démocratie — vue sur toute Athènes depuis le sommet", imageUrl: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=600", tip: "Billet combiné valable 5 jours pour 7 sites" },
      { name: "Souvlaki à Monastiraki", type: "food", description: "Brochette de porc, pita, tzatziki — le meilleur fast-food du monde", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600" },
      { name: "Plaka by night", type: "nightlife", description: "Terrasses sous l'Acropole illuminée, ouzo et musique grecque", imageUrl: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=600" },
    ],
  },
  santorini: {
    cityId: "santorini",
    highlights: ["Coucher de soleil à Oia", "Maisons blanches et dômes bleus", "Vin volcanique"],
    bestSeason: "Mai-Oct",
    budgetPerDay: "70-140€",
    activities: [
      { name: "Coucher de soleil à Oia", type: "visit", description: "Le sunset le plus photographié au monde — arriver 1h avant", imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600" },
      { name: "Dégustation de vin volcanique", type: "activity", description: "Vignes poussant dans la lave — l'assyrtiko est unique au monde", imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600" },
      { name: "Tomatokeftedes", type: "food", description: "Beignets de tomate de Santorin — croustillants et sucrés par le volcan", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600" },
    ],
  },
  crete: {
    cityId: "crete",
    highlights: ["Gorges de Samaria", "Plage d'Elafonissi rose", "Cuisine crétoise ancestrale"],
    bestSeason: "Mai-Oct",
    budgetPerDay: "40-80€",
    activities: [
      { name: "Gorges de Samaria", type: "activity", description: "16km de randonnée dans le plus long canyon d'Europe", imageUrl: "https://images.unsplash.com/photo-1564594736624-def7a10ab047?w=600" },
      { name: "Plage d'Elafonissi", type: "activity", description: "Sable rose, eau turquoise, lagons peu profonds — irréel", imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600" },
      { name: "Dakos", type: "food", description: "Biscotte d'orge, tomate, feta et huile d'olive crétoise — simple et parfait", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600" },
    ],
  },
  lima: {
    cityId: "lima",
    highlights: ["Capitale gastronomique du continent", "Ceviche ultra-frais", "Miraflores face au Pacifique"],
    bestSeason: "Déc-Avr",
    budgetPerDay: "25-55€",
    activities: [
      { name: "Ceviche au Mercado de Surquillo", type: "food", description: "Poisson cru mariné au citron vert — le plat national dans sa forme la plus pure", imageUrl: "https://images.unsplash.com/photo-1531968455001-5c5272a67c78?w=600" },
      { name: "Miraflores & Malecón", type: "visit", description: "Promenade côtière avec vue sur le Pacifique et parapente au-dessus", imageUrl: "https://images.unsplash.com/photo-1531968455001-5c5272a67c78?w=600" },
      { name: "Barranco by night", type: "nightlife", description: "Quartier bohème coloré — bars à pisco sour et musique live", imageUrl: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600" },
    ],
  },
  cusco: {
    cityId: "cusco",
    highlights: ["Ancienne capitale inca", "Altitude 3400m", "Porte du Machu Picchu"],
    bestSeason: "Mai-Sept (saison sèche)",
    budgetPerDay: "20-45€",
    activities: [
      { name: "Machu Picchu", type: "visit", description: "Cité perdue des Incas dans les nuages — une des 7 merveilles du monde", imageUrl: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600", tip: "Réserver le train et l'entrée des mois à l'avance" },
      { name: "San Pedro Market", type: "food", description: "Jus de fruits frais, soupe locale et ambiance authentique à 2 soles", imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600" },
      { name: "Salineras de Maras", type: "activity", description: "3000 bassins de sel en terrasse dans la montagne — vue surréaliste", imageUrl: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600" },
    ],
  },
  arequipa: {
    cityId: "arequipa",
    highlights: ["Ville blanche en sillar", "Canyon de Colca", "Cuisine arequipeña"],
    bestSeason: "Mai-Nov",
    budgetPerDay: "15-35€",
    activities: [
      { name: "Canyon de Colca", type: "activity", description: "Deux fois plus profond que le Grand Canyon — condors en vol libre", imageUrl: "https://images.unsplash.com/photo-1580968614926-4128f0ed4c18?w=600" },
      { name: "Monastère Santa Catalina", type: "visit", description: "Citadelle colorée dans la ville — un monde à part de 20 000m²", imageUrl: "https://images.unsplash.com/photo-1580968614926-4128f0ed4c18?w=600" },
      { name: "Rocoto relleno", type: "food", description: "Piment farci à la viande et fromage gratiné — épicé et addictif", imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600" },
    ],
  },
  akureyri: {
    cityId: "akureyri",
    highlights: ["Capitale du Nord islandais", "Observation de baleines", "Godafoss"],
    bestSeason: "Juin-Août",
    budgetPerDay: "90-160€",
    activities: [
      { name: "Observation de baleines", type: "activity", description: "Excursion en bateau pour voir baleines à bosse et dauphins", imageUrl: "https://images.unsplash.com/photo-1520769945061-0a448c463865?w=600" },
      { name: "Godafoss", type: "visit", description: "La cascade des Dieux — puissante et majestueuse", imageUrl: "https://images.unsplash.com/photo-1520769945061-0a448c463865?w=600" },
      { name: "Soupe d'agneau islandaise", type: "food", description: "Kjötsúpa — soupe réconfortante à l'agneau et légumes racines", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600" },
    ],
  },
  vik: {
    cityId: "vik",
    highlights: ["Plage de sable noir", "Colonnes de basalte", "Bout du monde"],
    bestSeason: "Juin-Août / Nov-Fév (aurores)",
    budgetPerDay: "80-150€",
    activities: [
      { name: "Reynisfjara Black Beach", type: "visit", description: "Plage de sable noir volcanique avec colonnes de basalte — lunaire", imageUrl: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=600", tip: "Attention aux sneaker waves, rester loin de l'eau" },
      { name: "Colonnes de Reynisdrangar", type: "visit", description: "Aiguilles de roche noire émergeant de l'océan — légende de trolls pétrifiés", imageUrl: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=600" },
      { name: "Skyr avec baies sauvages", type: "food", description: "Yaourt islandais crémeux avec myrtilles et crowberries locales", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600" },
    ],
  },
  hanoi: {
    cityId: "hanoi",
    highlights: ["Vieux quartier chaotique et charmant", "Phở au petit matin", "Café aux œufs"],
    bestSeason: "Oct-Déc / Mars-Avr",
    budgetPerDay: "15-30€",
    activities: [
      { name: "Vieux quartier (36 rues)", type: "visit", description: "Chaos organisé de motos, vendeurs ambulants et temples cachés", imageUrl: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600" },
      { name: "Phở bò", type: "food", description: "Bouillon de bœuf mijoté 12h, herbes fraîches, citron vert — le petit-déj parfait", imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600" },
      { name: "Café aux œufs chez Giang", type: "food", description: "Café crémeux battu avec jaune d'œuf — invention hanoi-enne unique", imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600" },
    ],
  },
  "hoi-an": {
    cityId: "hoi-an",
    highlights: ["Ville aux lanternes", "Meilleur bánh mì du monde", "Tailleur sur mesure en 24h"],
    bestSeason: "Fév-Mai",
    budgetPerDay: "15-30€",
    activities: [
      { name: "Vieille ville aux lanternes", type: "visit", description: "Patrimoine UNESCO illuminé de centaines de lanternes en soie la nuit", imageUrl: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600" },
      { name: "Bánh mì Phượng", type: "food", description: "Le meilleur sandwich du monde selon Anthony Bourdain — 30 000 dong", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600" },
      { name: "Cours de cuisine", type: "activity", description: "Marché + cuisine en famille vietnamienne au bord de la rivière", imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600" },
    ],
  },
  "ho-chi-minh": {
    cityId: "ho-chi-minh",
    highlights: ["Énergie folle 24/7", "Street food à chaque mètre", "Histoire intense"],
    bestSeason: "Déc-Avr (saison sèche)",
    budgetPerDay: "15-30€",
    activities: [
      { name: "Tunnels de Cu Chi", type: "visit", description: "Réseau souterrain de 250km utilisé pendant la guerre — saisissant", imageUrl: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600" },
      { name: "Bánh xèo", type: "food", description: "Crêpe vietnamienne croustillante aux crevettes et germes de soja", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600" },
      { name: "Bùi Viện Street", type: "nightlife", description: "La rue qui ne dort jamais — bars de rue, musique et ambiance backpacker", imageUrl: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600" },
    ],
  },
});
