// lib/products.js

export const CATEGORIES = [
  { slug: 'console', label: { it: 'Console', fr: 'Consoles', en: 'Consoles' }, icon: '🎮' },
  { slug: 'smartphone', label: { it: 'Smartphone', fr: 'Smartphones', en: 'Smartphones' }, icon: '📱' },
  { slug: 'audio', label: { it: 'Audio e Indossabili', fr: 'Audio et Wearables', en: 'Audio & Wearables' }, icon: '🎧' },
  { slug: 'tablet', label: { it: 'Tablet', fr: 'Tablettes', en: 'Tablets' }, icon: '📲' },
  { slug: 'computer', label: { it: 'Computer', fr: 'Ordinateurs', en: 'Computers' }, icon: '💻' },
  { slug: 'drone', label: { it: 'Drone', fr: 'Drones', en: 'Drones' }, icon: '🛸' },
  { slug: 'ebike', label: { it: 'Mobilità Elettrica', fr: 'Mobilité électrique', en: 'Electric Mobility' }, icon: '🚲' },
  { slug: 'frigo', label: { it: 'Frigoriferi', fr: 'Réfrigérateurs', en: 'Fridges' }, icon: '🧊' },
  { slug: 'climatizzatore', label: { it: 'Climatizzatori', fr: 'Climatiseurs', en: 'Air Conditioners' }, icon: '❄️' },
  { slug: 'riscaldamento', label: { it: 'Riscaldamento', fr: 'Chauffage', en: 'Heating' }, icon: '🔥' },
  { slug: 'pellet', label: { it: 'Pellet e Legna', fr: 'Pellets et bois', en: 'Pellets & Firewood' }, icon: '🪵' },
  { slug: 'aspirapolvere', label: { it: 'Aspirapolvere', fr: 'Aspirateurs', en: 'Vacuums' }, icon: '🧹' },
  { slug: 'cucina', label: { it: 'Cucina', fr: 'Cuisine', en: 'Kitchen' }, icon: '🍳' },
  { slug: 'forno', label: { it: 'Forni', fr: 'Fours', en: 'Ovens' }, icon: '🍽️' },
  { slug: 'casa-giardino', label: { it: 'Casa e Giardino', fr: 'Maison et jardin', en: 'Home & Garden' }, icon: '🏡' },
  { slug: 'occhiali', label: { it: 'Occhiali da Sole', fr: 'Lunettes de soleil', en: 'Sunglasses' }, icon: '🕶️' },
  { slug: 'animali', label: { it: 'Animali Domestici', fr: 'Animaux', en: 'Pet Supplies' }, icon: '🐾' },
  { slug: 'fai-da-te', label: { it: 'Fai da Te e Utensili', fr: 'Bricolage et outils', en: 'DIY & Tools' }, icon: '🛠️' }
];

export const PRODUCTS = [

    // ── CONSOLE ──────────────────────────────────
  {
    slug: 'ps5-1to',
    sku: 'LOT-PS5-01',
    category: 'console',
    brand: 'Sony',
    name: 'PlayStation 5 – 1 TB (con lettore)',
    price: 449.99,
    oldPrice: 549.99,
    stock: 8,
    image: 'https://media.direct.playstation.com/is/image/psdglobal/2025-PS5-Disc-Hero-1-Console?$Background_Large$',
    rating: 4.9,
    reviewsCount: 12400,
    reviewsList: [
      { stars: 5, text: { it: 'Console incredibile, il caricamento è praticamente istantaneo e la grafica è mozzafiato.', fr: 'Console incroyable, le chargement est quasi instantané et les graphismes sont époustouflants.', en: 'Incredible console, loading is nearly instant and the graphics are breathtaking.' } },
      { stars: 5, text: { it: 'La DualSense è una rivoluzione, il feedback aptico cambia completamente il modo di giocare.', fr: 'La DualSense est une révolution, le retour haptique change complètement la façon de jouer.', en: 'The DualSense is a revolution, haptic feedback completely changes the way you play.' } }
    ],
    description: {
      it: 'Console PS5 con lettore Blu-ray. SSD 1 TB ultra-rapido, GPU RDNA 2, audio 3D Tempest. Retrocompatibile con PS4.',
      fr: 'Console PS5 avec lecteur Blu-ray. SSD 1 To ultra-rapide, GPU RDNA 2, audio 3D Tempest. Rétrocompatible PS4.',
      en: 'PS5 console with Blu-ray drive. 1TB ultra-fast SSD, RDNA 2 GPU, 3D Tempest Audio. PS4 backwards compatible.'
    }
  },
  {
    slug: 'ps5-digital',
    sku: 'LOT-PS5-02',
    category: 'console',
    brand: 'Sony',
    name: 'PS5 Edizione Digitale – 825 GB',
    price: 369.99,
    oldPrice: 449.99,
    stock: 5,
    image: 'https://media.direct.playstation.com/is/image/psdglobal/2025-PS5-Digital-Hero-1-console-dualsense?$Background_Large$',
    rating: 4.7,
    reviewsCount: 6800,
    reviewsList: [
      { stars: 5, text: { it: 'Perfetta per chi compra solo giochi digitali, design slim molto elegante sotto la TV.', fr: 'Parfaite pour ceux qui achètent uniquement des jeux dématérialisés, design slim très élégant sous la TV.', en: 'Perfect for digital-only gamers, the slim design looks very sleek under the TV.' } },
      { stars: 4, text: { it: 'Stessa potenza della versione standard ma senza lettore disco. Silenziosissima.', fr: 'Même puissance que la version standard mais sans lecteur disque. Très silencieuse.', en: 'Same power as the standard version but without the disc drive. Very quiet.' } }
    ],
    description: {
      it: 'PS5 Edizione Digitale senza lettore disco. SSD 825 GB, design slim. Lettore esterno compatibile venduto separatamente.',
      fr: 'PS5 Édition Numérique sans lecteur. SSD 825 Go, design slim. Lecteur externe compatible vendu séparément.',
      en: 'PS5 Digital Edition without disc drive. 825GB SSD, slim design. External drive compatible, sold separately.'
    }
  },
  {
    slug: 'ps5-pro',
    sku: 'LOT-PS5-03',
    category: 'console',
    brand: 'Sony',
    name: 'PlayStation 5 Pro',
    price: 699.99,
    oldPrice: 799.99,
    stock: 3,
    image: 'https://media.direct.playstation.com/is/image/psdglobal/ps5-pro-Hero-1-angled?$Background_Large$',
    rating: 4.9,
    reviewsCount: 3200,
    reviewsList: [
      { stars: 5, text: { it: 'La grafica in 8K e il ray tracing sono qualcosa di mai visto prima su console.', fr: 'Les graphismes 8K et le ray tracing sont du jamais vu sur console.', en: '8K graphics and ray tracing are something never seen before on a console.' } },
      { stars: 5, text: { it: 'PSSR fa miracoli per la fluidità. Vale ogni centesimo per chi ha una TV di fascia alta.', fr: 'Le PSSR fait des miracles pour la fluidité. Vaut chaque centime pour ceux qui ont une TV haut de gamme.', en: 'PSSR does wonders for smoothness. Worth every penny for high-end TV owners.' } }
    ],
    description: {
      it: 'PS5 Pro: GPU 45% più veloce, PlayStation Spectral Super Resolution (PSSR), Wi-Fi 7, SSD 2 TB.',
      fr: 'PS5 Pro : GPU 45% plus rapide, PlayStation Spectral Super Resolution (PSSR), Wi-Fi 7, SSD 2 To.',
      en: 'PS5 Pro: GPU 45% faster, PlayStation Spectral Super Resolution (PSSR), Wi-Fi 7, 2TB SSD.'
    }
  },
  {
    slug: 'xbox-series-x',
    sku: 'LOT-XBX-01',
    category: 'console',
    brand: 'Microsoft',
    name: 'Xbox Series X – 1 TB',
    price: 499.99,
    oldPrice: 549.99,
    stock: 6,
    image: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/66743890_Hero-0_3000x1682:VP5-1920x720',
    rating: 4.6,
    reviewsCount: 5100,
    reviewsList: [
      { stars: 5, text: { it: 'Potenza pazzesca, il Game Pass è incluso e offre una libreria infinita di giochi.', fr: 'Puissance dingue, le Game Pass est inclus et offre une bibliothèque infinie de jeux.', en: 'Insane power, Game Pass is included and offers an infinite game library.' } },
      { stars: 4, text: { it: 'Silenziosa e veloce, il Quick Resume tra un gioco e l\'altro è una funzione fantastica.', fr: 'Silencieuse et rapide, le Quick Resume entre les jeux est une fonctionnalité géniale.', en: 'Quiet and fast, Quick Resume between games is a fantastic feature.' } }
    ],
    description: {
      it: 'Xbox Series X 1 TB, 4K 120fps, SSD NVMe, retrocompatibile con 4 generazioni, compatibile con Game Pass Ultimate.',
      fr: 'Xbox Series X 1 To, 4K 120fps, SSD NVMe, rétrocompatibilité 4 générations, Game Pass Ultimate compatible.',
      en: 'Xbox Series X 1TB, 4K 120fps, NVMe SSD, 4 generations backwards compatible, Game Pass Ultimate ready.'
    }
  },
  {
    slug: 'dualsense-white',
    sku: 'LOT-PS5-ACC-01',
    category: 'console',
    brand: 'Sony',
    name: 'Controller DualSense – Bianco',
    price: 74.99,
    oldPrice: 79.99,
    stock: 25,
    image: 'https://media.direct.playstation.com/is/image/psdglobal/2025-dualsense-ps5-controller-white-accessory-front-hero-1?$Background_Large$',
    rating: 4.8,
    reviewsCount: 18700,
    reviewsList: [
      { stars: 5, text: { it: 'Il feedback aptico è incredibile, i grilletti adattivi ti fanno sentire ogni colpo e ogni tensione.', fr: 'Le retour haptique est incroyable, les gâchettes adaptatives font ressentir chaque coup et chaque tension.', en: 'Haptic feedback is amazing, adaptive triggers let you feel every hit and every tension.' } },
      { stars: 5, text: { it: 'Design iconico, ergonomia perfetta e autonomia di circa 12 ore. Il miglior controller di sempre.', fr: 'Design iconique, ergonomie parfaite et autonomie d\'environ 12 heures. La meilleure manette de tous les temps.', en: 'Iconic design, perfect ergonomics and around 12 hours battery life. The best controller ever made.' } }
    ],
    description: {
      it: 'Controller DualSense bianco per PS5 e PC. Feedback aptico, grilletti adattivi, microfono e altoparlante integrati. Batteria USB-C 12h.',
      fr: 'Manette DualSense blanche pour PS5 et PC. Retour haptique, gâchettes adaptatives, micro et haut-parleur intégrés. Batterie USB-C 12h.',
      en: 'White DualSense controller for PS5 and PC. Haptic feedback, adaptive triggers, built-in mic and speaker. 12h USB-C battery.'
    }
  },
  {
    slug: 'dualsense-edge',
    sku: 'LOT-PS5-ACC-02',
    category: 'console',
    brand: 'Sony',
    name: 'Controller DualSense Edge',
    price: 239.99,
    oldPrice: 249.99,
    stock: 10,
    image: 'https://media.direct.playstation.com/is/image/psdglobal/DualSense-Edge-Main-v2?$Background_Large$',
    rating: 4.7,
    reviewsCount: 2900,
    reviewsList: [
      { stars: 5, text: { it: 'Controller professionale definitivo, stick e pulsanti intercambiabili e profili salvabili. Perfetto per il competitivo.', fr: 'Manette pro ultime, sticks et boutons interchangeables et profils sauvegardables. Parfaite pour la compétition.', en: 'The ultimate pro controller, swappable sticks and buttons with savable profiles. Perfect for competitive gaming.' } },
      { stars: 4, text: { it: 'Prezzo alto ma qualità costruttiva eccezionale, i tasti posteriori fanno una differenza enorme.', fr: 'Prix élevé mais qualité de fabrication exceptionnelle, les palettes arrière font une énorme différence.', en: 'Pricey but exceptional build quality, the back paddles make a huge difference.' } }
    ],
    description: {
      it: 'Controller pro DualSense Edge per PS5 e PC. Stick e tasti posteriori intercambiabili, profili di gioco salvabili, cavo intrecciato incluso.',
      fr: 'Manette pro DualSense Edge pour PS5 et PC. Sticks et palettes arrière interchangeables, profils de jeu sauvegardables, câble tressé inclus.',
      en: 'DualSense Edge pro controller for PS5 and PC. Swappable sticks and back paddles, savable game profiles, braided cable included.'
    }
  },
  {
    slug: 'pulse-elite',
    sku: 'LOT-PS5-ACC-03',
    category: 'console',
    brand: 'Sony',
    name: 'Cuffie PULSE Elite – Wireless',
    price: 149.99,
    oldPrice: 159.99,
    stock: 15,
    image: 'https://media.direct.playstation.com/is/image/psdglobal/EliteHeadeset-Hero-1?$Background_Large$',
    rating: 4.6,
    reviewsCount: 2300,
    reviewsList: [
      { stars: 5, text: { it: 'Audio 3D spettacolare, il microfono con IA filtra perfettamente i rumori di fondo.', fr: 'Audio 3D spectaculaire, le micro avec IA filtre parfaitement les bruits de fond.', en: 'Spectacular 3D audio, the AI microphone perfectly filters background noise.' } },
      { stars: 4, text: { it: 'Confortevole per sessioni lunghe, la tecnologia PlayStation Link è comodissima.', fr: 'Confortable pour les longues sessions, la technologie PlayStation Link est très pratique.', en: 'Comfortable for long sessions, PlayStation Link technology is very convenient.' } }
    ],
    description: {
      it: 'Cuffie wireless PULSE Elite per PS5 e PC. Audio 3D, microfono retrattile con IA, tecnologia PlayStation Link, trasduttori planari.',
      fr: 'Casque sans fil PULSE Elite pour PS5 et PC. Audio 3D, micro rétractable IA, technologie PlayStation Link, transducteurs planaires.',
      en: 'PULSE Elite wireless headset for PS5 and PC. 3D Audio, retractable AI mic, PlayStation Link technology, planar transducers.'
    }
  },
  {
    slug: 'ps-portal',
    sku: 'LOT-PS5-ACC-04',
    category: 'console',
    brand: 'Sony',
    name: 'PlayStation Portal™',
    price: 219.99,
    oldPrice: 229.99,
    stock: 12,
    image: 'https://media.direct.playstation.com/is/image/psdglobal/ps-portal-remoteplayer-hero-1?$Background_Large$',
    rating: 4.5,
    reviewsCount: 4200,
    reviewsList: [
      { stars: 5, text: { it: 'Perfetto per giocare a letto o quando la TV è occupata, lo schermo è grande e nitido.', fr: 'Parfait pour jouer au lit ou quand la TV est occupée, l\'écran est grand et net.', en: 'Perfect for playing in bed or when the TV is taken, the screen is large and sharp.' } },
      { stars: 4, text: { it: 'Comodissimo, unico neo la latenza che dipende molto dalla qualità del Wi-Fi di casa.', fr: 'Très pratique, seul bémol la latence qui dépend beaucoup de la qualité du Wi-Fi domestique.', en: 'Very handy, the only downside is latency which heavily depends on home Wi-Fi quality.' } }
    ],
    description: {
      it: 'PlayStation Portal, lettore remoto PS5 via Wi-Fi. Schermo LCD 8 pollici 1080p 60fps, comandi DualSense integrati.',
      fr: 'PlayStation Portal, lecteur à distance PS5 via Wi-Fi. Écran LCD 8 pouces 1080p 60fps, commandes DualSense intégrées.',
      en: 'PlayStation Portal remote player for PS5 over Wi-Fi. 8-inch 1080p 60fps LCD screen, integrated DualSense controls.'
    }
  },

  // ── SMARTPHONE ──────────────────────────────
  {
    slug: 'iphone-15-128',
    sku: 'LOT-IPH-01',
    category: 'smartphone',
    brand: 'Apple',
    name: 'iPhone 15 128GB',
    price: 629,
    oldPrice: 729,
    stock: 18,
    image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-blue-select-202309?wid=1144&hei=1144&fmt=png-alpha&.v=1692923777972',

    rating: 4.7,
    reviewsCount: 1842,
    reviewsList: [
      { stars: 5, text: { it: 'Telefono perfetto, sembra nuovo e la batteria dura tutto il giorno. Consegna velocissima.', fr: 'Téléphone parfait, comme neuf, et la batterie tient toute la journée. Livraison ultra rapide.', en: 'Perfect phone, looks brand new and the battery lasts all day. Super fast delivery.' } },
      { stars: 4, text: { it: 'Ottimo rapporto qualità prezzo rispetto al negozio ufficiale. Solo la scatola era leggermente segnata.', fr: 'Excellent rapport qualité-prix par rapport au magasin officiel. Seule la boîte était un peu marquée.', en: 'Great value compared to the official store. Only the box was slightly marked.' } }
    ],
    description: {
      it: 'iPhone 15 128GB, chip A16 Bionic, doppia fotocamera 48MP, Dynamic Island. Nuovo, garanzia 24 mesi.',
      fr: 'iPhone 15 128 Go, puce A16 Bionic, double appareil photo 48 Mpx, Dynamic Island. Neuf, garantie 24 mois.',
      en: 'iPhone 15 128GB, A16 Bionic chip, 48MP dual camera, Dynamic Island. New, 24-month warranty.'
    }
  },
  {
    slug: 'iphone-15-pro-256',
    sku: 'LOT-IPH-02',
    category: 'smartphone',
    brand: 'Apple',
    name: 'iPhone 15 Pro 256GB',
    price: 899,
    oldPrice: 1049,
    stock: 11,
    image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-pro-natural-select-202309?wid=1144&hei=1144&fmt=png-alpha&.v=1692895703811',

    rating: 4.8,
    reviewsCount: 967,
    reviewsList: [
      { stars: 5, text: { it: 'Il titanio si vede e si sente, fotocamera incredibile di notte. Top di gamma vero.', fr: 'Le titane se voit et se sent, photo de nuit incroyable. Du vrai haut de gamme.', en: 'The titanium really shows, amazing night camera. True flagship feel.' } },
      { stars: 5, text: { it: 'Acquistato per lavoro, velocissimo e zoom 3x utilissimo. Lo consiglio senza dubbi.', fr: 'Acheté pour le travail, ultra rapide et zoom 3x très utile. Je le recommande sans hésiter.', en: 'Bought it for work, super fast and the 3x zoom is genuinely useful. Highly recommend.' } }
    ],
    description: {
      it: 'iPhone 15 Pro 256GB in titanio, chip A17 Pro, zoom 3x, USB-C. Nuovo, scatola sigillata.',
      fr: 'iPhone 15 Pro 256 Go en titane, puce A17 Pro, zoom 3x, USB-C. Neuf, boîte scellée.',
      en: 'iPhone 15 Pro 256GB titanium, A17 Pro chip, 3x zoom, USB-C. New, sealed box.'
    }
  },
  {
    slug: 'iphone-16-128',
    sku: 'LOT-IPH-03',
    category: 'smartphone',
    brand: 'Apple',
    name: 'iPhone 16 128GB',
    price: 749,
    oldPrice: 859,
    stock: 16,
    image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-ultramarine-select-202409?wid=1144&hei=1144&fmt=png-alpha',

    rating: 4.8,
    reviewsCount: 612,
    reviewsList: [
      { stars: 5, text: { it: 'Camera Control è più comodo di quanto pensassi, e Apple Intelligence inizia a essere davvero utile.', fr: 'Le Camera Control est plus pratique que je ne le pensais, et Apple Intelligence devient vraiment utile.', en: 'Camera Control is handier than I expected, and Apple Intelligence is starting to feel genuinely useful.' } },
      { stars: 4, text: { it: 'Bellissimo telefono, unico difetto è l\'autonomia leggermente sotto le mie aspettative.', fr: 'Très beau téléphone, seul défaut : l\'autonomie un peu en dessous de mes attentes.', en: 'Beautiful phone, the only downside is battery life being slightly below my expectations.' } }
    ],
    description: {
      it: 'iPhone 16 128GB con chip A18, Camera Control e Apple Intelligence. Nuovo, garanzia ufficiale.',
      fr: 'iPhone 16 128 Go avec puce A18, Camera Control et Apple Intelligence. Neuf, garantie officielle.',
      en: 'iPhone 16 128GB with A18 chip, Camera Control and Apple Intelligence. New, official warranty.'
    }
  },
  {
    slug: 'iphone-16-pro-max-256',
    sku: 'LOT-IPH-04',
    category: 'smartphone',
    brand: 'Apple',
    name: 'iPhone 16 Pro Max 256GB',
    price: 1199,
    oldPrice: 1379,
    stock: 6,
    image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-16-pro-max-desert-titanium-select-202409?wid=1144&hei=1144&fmt=png-alpha',
    rating: 4.9,
    reviewsCount: 388,
    reviewsList: [
      { stars: 5, text: { it: 'Schermo enorme e nitidissimo, il teleobiettivo 5x è pazzesco per essere su un telefono.', fr: 'Écran immense et très net, le téléobjectif 5x est bluffant pour un téléphone.', en: 'Huge, super sharp screen, the 5x telephoto is wild for a phone.' } },
      { stars: 5, text: { it: 'Prezzo alto ma giustificato, autonomia da fine giornata senza problemi.', fr: 'Prix élevé mais justifié, autonomie qui tient toute la journée sans problème.', en: 'Expensive but justified, easily lasts a full day without issue.' } }
    ],
    description: {
      it: 'iPhone 16 Pro Max 256GB, schermo 6.9", chip A18 Pro, fotocamera teleobiettivo 5x. Nuovo.',
      fr: 'iPhone 16 Pro Max 256 Go, écran 6,9", puce A18 Pro, téléobjectif 5x. Neuf.',
      en: 'iPhone 16 Pro Max 256GB, 6.9" display, A18 Pro chip, 5x telephoto camera. New.'
    }
  },
  {
    slug: 'iphone-se-2024',
    sku: 'LOT-IPH-05',
    category: 'smartphone',
    brand: 'Apple',
    name: 'iPhone SE (2024) 128GB',
    price: 429,
    oldPrice: 499,
    stock: 13,
    image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-se-midnight-select-202203?wid=1144&hei=1144&fmt=png-alpha',
    rating: 4.5,
    reviewsCount: 754,
    reviewsList: [
      { stars: 4, text: { it: 'Formato compatto perfetto per chi non vuole un telefono enorme, ottimo per iniziare con iOS.', fr: 'Format compact parfait pour qui ne veut pas un téléphone énorme, idéal pour découvrir iOS.', en: 'Compact size, perfect if you don\'t want a giant phone — great way to get into iOS.' } },
      { stars: 5, text: { it: 'Preso per mia figlia, rapporto qualità prezzo eccellente e Face ID funziona benissimo.', fr: 'Pris pour ma fille, excellent rapport qualité-prix et Face ID fonctionne très bien.', en: 'Got it for my daughter, excellent value and Face ID works great.' } }
    ],
    description: {
      it: 'iPhone SE 128GB, formato compatto, chip A15 Bionic, Face ID. Ottimo rapporto qualità-prezzo.',
      fr: 'iPhone SE 128 Go, format compact, puce A15 Bionic, Face ID. Excellent rapport qualité-prix.',
      en: 'iPhone SE 128GB, compact form factor, A15 Bionic chip, Face ID. Great value for money.'
    }
  },
  {
    slug: 'samsung-s24',
    sku: 'LOT-SAM-01',
    category: 'smartphone',
    brand: 'Samsung',
    name: 'Samsung Galaxy S24 256GB',
    price: 599,
    oldPrice: 729,
    stock: 10,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/it/sm-s921bzkgeue/gallery/it-galaxy-s24-s921-sm-s921bzkgeue-thumb-539319223',
    rating: 4.6,
    reviewsCount: 1320,
    reviewsList: [
      { stars: 5, text: { it: 'Schermo AMOLED splendido, Galaxy AI utile per tradurre i testi al volo.', fr: 'Écran AMOLED magnifique, Galaxy AI bien pratique pour traduire les textes à la volée.', en: 'Beautiful AMOLED screen, Galaxy AI is handy for translating text on the fly.' } },
      { stars: 4, text: { it: 'Telefono solido e veloce, fotocamera ottima in condizioni di buona luce.', fr: 'Téléphone solide et rapide, photo très bonne en bonne lumière.', en: 'Solid, fast phone, great camera in good lighting conditions.' } }
    ],
    description: {
      it: 'Samsung Galaxy S24 256GB, AMOLED 6.2", Galaxy AI, tripla fotocamera 50MP. Nuovo, sigillato.',
      fr: 'Samsung Galaxy S24 256 Go, AMOLED 6,2", Galaxy AI, triple capteur 50 Mpx. Neuf, scellé.',
      en: 'Samsung Galaxy S24 256GB, 6.2" AMOLED, Galaxy AI, 50MP triple camera. New, sealed.'
    }
  },

  // ── AUDIO E INDOSSABILI ──────────────────────
  {
  slug: 'airpods-pro-2',
  sku: 'LOT-AUD-01',
  category: 'audio',
  brand: 'Apple',
  name: 'Apple AirPods Pro 2 (USB-C)',
  price: 219,
  oldPrice: 279,
  stock: 22,
  image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MTJV3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1694014871985',
  rating: 4.8,
  reviewsCount: 5460,
  reviewsList: [
    { stars: 5, text: { it: 'Cancellazione del rumore eccezionale, perfetti per il treno e l\'aereo.', fr: 'Réduction de bruit exceptionnelle, parfaits pour le train et l\'avion.', en: 'Outstanding noise cancellation, perfect for train and plane rides.' } },
    { stars: 5, text: { it: 'Si accoppiano all\'istante con iPhone, audio spaziale fantastico per i film.', fr: 'Appairage instantané avec l\'iPhone, audio spatial génial pour les films.', en: 'Instant pairing with iPhone, fantastic spatial audio for movies.' } }
  ],
  description: {
    it: 'AirPods Pro 2 con USB-C, cancellazione attiva del rumore, audio spaziale personalizzato e custodia con altoparlante integrato.',
    fr: 'AirPods Pro 2 avec USB-C, réduction de bruit active, audio spatial personnalisé et boîtier avec haut-parleur intégré.',
    en: 'AirPods Pro 2 with USB-C, active noise cancellation, personalized spatial audio and case with built-in speaker.'
  }
},
{
  slug: 'samsung-galaxy-buds3-pro',
  sku: 'LOT-AUD-02',
  category: 'audio',
  brand: 'Samsung',
  name: 'Samsung Galaxy Buds3 Pro',
  price: 169,
  oldPrice: 249,
  stock: 17,
  image: 'https://images.samsung.com/is/image/samsung/p6pim/it/sm-r630nzaaitv/gallery/it-galaxy-buds3-pro-r630-sm-r630nzaaitv-thumb-543201877',
  rating: 4.6,
  reviewsCount: 1980,
  reviewsList: [
    { stars: 5, text: { it: 'Suono ricco e bilanciato, il controllo del rumore adattivo funziona davvero bene in città.', fr: 'Son riche et équilibré, le contrôle de bruit adaptatif marche vraiment bien en ville.', en: 'Rich, balanced sound, adaptive noise control genuinely works well in the city.' } },
    { stars: 4, text: { it: 'Comodi tutto il giorno, unico difetto la custodia un po\' scivolosa.', fr: 'Confortables toute la journée, seul défaut le boîtier un peu glissant.', en: 'Comfortable all day, only downside is the slightly slippery case.' } }
  ],
  description: {
    it: 'Auricolari Galaxy Buds3 Pro, design a stelo, Adaptive Noise Control, audio Hi-Fi 24 bit, IP57.',
    fr: 'Écouteurs Galaxy Buds3 Pro, design à tige, Adaptive Noise Control, audio Hi-Fi 24 bits, IP57.',
    en: 'Galaxy Buds3 Pro earbuds, stem design, Adaptive Noise Control, 24-bit Hi-Fi audio, IP57.'
  }
},
{
  slug: 'apple-watch-se-2',
  sku: 'LOT-AUD-03',
  category: 'audio',
  brand: 'Apple',
  name: 'Apple Watch SE (2ª gen.) 40mm GPS',
  price: 229,
  oldPrice: 279,
  stock: 14,
  image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MPLT3ref_VW_34FR+watch-40-alum-starlight-se-2024_VW_34FR_WF_CO?wid=1144&hei=1144&fmt=png-alpha',
  rating: 4.7,
  reviewsCount: 2110,
  reviewsList: [
    { stars: 5, text: { it: 'Perfetto per monitorare l\'allenamento e ricevere le notifiche senza tirare fuori il telefono.', fr: 'Parfaite pour suivre l\'entraînement et recevoir les notifications sans sortir le téléphone.', en: 'Perfect for tracking workouts and getting notifications without pulling out my phone.' } },
    { stars: 4, text: { it: 'Ottimo primo smartwatch, batteria che dura circa una giornata e mezza.', fr: 'Excellente première montre connectée, batterie qui tient environ une journée et demie.', en: 'Great first smartwatch, battery lasts about a day and a half.' } }
  ],
  description: {
    it: 'Apple Watch SE 40mm GPS, monitoraggio del sonno e dell\'attività fisica, rilevamento cadute, resistente all\'acqua.',
    fr: 'Apple Watch SE 40mm GPS, suivi du sommeil et de l\'activité physique, détection de chute, résistante à l\'eau.',
    en: 'Apple Watch SE 40mm GPS, sleep and fitness tracking, fall detection, water resistant.'
  }
},
{
  slug: 'samsung-galaxy-watch7',
  sku: 'LOT-AUD-04',
  category: 'audio',
  brand: 'Samsung',
  name: 'Samsung Galaxy Watch7 44mm',
  price: 259,
  oldPrice: 319,
  stock: 9,
  image: 'https://images.samsung.com/is/image/samsung/p6pim/it/sm-l310nzsaeue/gallery/it-galaxy-watch7-l310-sm-l310nzsaeue-thumb-542154585',
  rating: 4.6,
  reviewsCount: 870,
  reviewsList: [
    { stars: 5, text: { it: 'Schermo luminoso anche al sole, l\'analisi del sonno è dettagliata e precisa.', fr: 'Écran lumineux même au soleil, l\'analyse du sommeil est détaillée et précise.', en: 'Bright screen even in sunlight, sleep analysis is detailed and accurate.' } },
    { stars: 4, text: { it: 'Buon orologio sportivo, il cinturino di base è un po\' rigido i primi giorni.', fr: 'Bonne montre sportive, le bracelet de base est un peu rigide les premiers jours.', en: 'Good sports watch, the stock strap is a bit stiff for the first few days.' } }
  ],
  description: {
    it: 'Galaxy Watch7 44mm, sensore BioActive, monitoraggio energia corporea, GPS, compatibile Android.',
    fr: 'Galaxy Watch7 44mm, capteur BioActive, suivi de l\'énergie corporelle, GPS, compatible Android.',
    en: 'Galaxy Watch7 44mm, BioActive sensor, body energy tracking, GPS, Android compatible.'
  }
},

  // ── TABLET ──────────────────────────────────
  {
  slug: 'ipad-10-64',
  sku: 'LOT-IPD-01',
  category: 'tablet',
  brand: 'Apple',
  name: 'iPad (10ª generazione) 64GB Wi-Fi',
  price: 379,
  oldPrice: 449,
  stock: 20,
  image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-10th-gen-finish-select-202212-blue?wid=1144&hei=1144&fmt=png-alpha',
  rating: 4.7,
  reviewsCount: 1640,
  reviewsList: [
    { stars: 5, text: { it: 'Perfetto per i compiti dei bambini e per guardare film in viaggio. Schermo bellissimo.', fr: 'Parfait pour les devoirs des enfants et regarder des films en voyage. Très bel écran.', en: 'Perfect for kids\' homework and watching movies on the go. Beautiful screen.' } },
    { stars: 4, text: { it: 'Buon tablet di base, un po\' lento con app pesanti ma per uso quotidiano va benissimo.', fr: 'Bonne tablette d\'entrée de gamme, un peu lente avec des applis lourdes mais parfaite au quotidien.', en: 'Good entry-level tablet, a bit slow with heavy apps but great for daily use.' } }
  ],
  description: {
    it: 'iPad 10ª generazione, schermo 10.9" Liquid Retina, chip A14 Bionic, USB-C. Nuovo.',
    fr: 'iPad 10ᵉ génération, écran 10,9" Liquid Retina, puce A14 Bionic, USB-C. Neuf.',
    en: '10th-generation iPad, 10.9" Liquid Retina display, A14 Bionic chip, USB-C. New.'
  }
},
{
  slug: 'ipad-air-m2-128',
  sku: 'LOT-IPD-02',
  category: 'tablet',
  brand: 'Apple',
  name: 'iPad Air (M2) 128GB Wi-Fi',
  price: 619,
  oldPrice: 719,
  stock: 9,
  image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-air-finish-select-202405-spacegray?wid=1144&hei=1144&fmt=png-alpha',
  rating: 4.8,
  reviewsCount: 540,
  reviewsList: [
    { stars: 5, text: { it: 'Velocissimo con il chip M2, uso anche Procreate e gira tutto senza scatti.', fr: 'Très rapide avec la puce M2, j\'utilise même Procreate et tout tourne sans accroc.', en: 'Super fast with the M2 chip, I even use Procreate and everything runs smoothly.' } },
    { stars: 5, text: { it: 'Ottima alternativa al Pro per chi non vuole spendere troppo, schermo fantastico.', fr: 'Excellente alternative au Pro pour qui ne veut pas trop dépenser, écran magnifique.', en: 'Great alternative to the Pro if you don\'t want to overspend, fantastic screen.' } }
  ],
  description: {
    it: 'iPad Air con chip M2, schermo 11" Liquid Retina, compatibile Apple Pencil Pro. Nuovo, sigillato.',
    fr: 'iPad Air avec puce M2, écran 11" Liquid Retina, compatible Apple Pencil Pro. Neuf, scellé.',
    en: 'iPad Air with M2 chip, 11" Liquid Retina display, Apple Pencil Pro compatible. New, sealed.'
  }
},
{
  slug: 'ipad-pro-11-256',
  sku: 'LOT-IPD-03',
  category: 'tablet',
  brand: 'Apple',
  name: 'iPad Pro 11" M4 256GB Wi-Fi',
  price: 1099,
  oldPrice: 1259,
  stock: 4,
  image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-pro-finish-select-202405-spaceblack?wid=1144&hei=1144&fmt=png-alpha',
  rating: 4.9,
  reviewsCount: 215,
  reviewsList: [
    { stars: 5, text: { it: 'Display Ultra Retina XDR spettacolare, lo uso per il montaggio video ed è velocissimo.', fr: 'Écran Ultra Retina XDR spectaculaire, je l\'utilise pour le montage vidéo et c\'est ultra rapide.', en: 'Spectacular Ultra Retina XDR display, I use it for video editing and it\'s blazing fast.' } },
    { stars: 4, text: { it: 'Prodotto top ma il prezzo resta alto, da considerare con accessori a parte.', fr: 'Produit haut de gamme mais le prix reste élevé, à considérer avec les accessoires en plus.', en: 'Top-tier product but the price stays high, factor in accessories separately.' } }
  ],
  description: {
    it: 'iPad Pro 11" con chip M4, display Ultra Retina XDR, design ultrasottile in alluminio riciclato.',
    fr: 'iPad Pro 11" avec puce M4, écran Ultra Retina XDR, design ultrafin en aluminium recyclé.',
    en: 'iPad Pro 11" with M4 chip, Ultra Retina XDR display, ultra-thin recycled aluminium design.'
  }
},

  // ── COMPUTER ────────────────────────────────
  {
  slug: 'macbook-air-m3-13',
  sku: 'LOT-MAC-01',
  category: 'computer',
  brand: 'Apple',
  name: 'MacBook Air 13" M3 8GB/256GB',
  price: 1099,
  oldPrice: 1249,
  stock: 8,
  image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/macbook-air-13-m3-midnight-select-202402?wid=1144&hei=1144&fmt=png-alpha',
  rating: 4.8,
  reviewsCount: 980,
  reviewsList: [
    { stars: 5, text: { it: 'Silenziosissimo, nessuna ventola, batteria che dura davvero tutto il giorno di lavoro.', fr: 'Ultra silencieux, aucun ventilateur, batterie qui tient vraiment toute la journée de travail.', en: 'Dead silent, no fan, battery genuinely lasts the whole work day.' } },
    { stars: 5, text: { it: 'Passato da Windows, non torno più indietro. Leggero e veloce per ufficio e browser.', fr: 'Passé de Windows, je ne reviens plus en arrière. Léger et rapide pour le bureau et le navigateur.', en: 'Switched from Windows, never going back. Light and fast for office work and browsing.' } }
  ],
  description: {
    it: 'MacBook Air 13" con chip M3, 8GB RAM, SSD 256GB. Silenzioso, autonomia fino a 18 ore.',
    fr: 'MacBook Air 13" avec puce M3, 8 Go de RAM, SSD 256 Go. Silencieux, autonomie jusqu\'à 18h.',
    en: 'MacBook Air 13" with M3 chip, 8GB RAM, 256GB SSD. Silent, up to 18 hours of battery life.'
  }
},
{
  slug: 'macbook-pro-14-m3',
  sku: 'LOT-MAC-02',
  category: 'computer',
  brand: 'Apple',
  name: 'MacBook Pro 14" M3 Pro 18GB/512GB',
  price: 1899,
  oldPrice: 2199,
  stock: 4,
  image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp14-spaceblack-select-202310?wid=1144&hei=1144&fmt=png-alpha',
  rating: 4.9,
  reviewsCount: 312,
  reviewsList: [
    { stars: 5, text: { it: 'Display Liquid Retina XDR fantastico per editing foto e video, mai un rallentamento.', fr: 'Écran Liquid Retina XDR fantastique pour la retouche photo et vidéo, jamais un ralentissement.', en: 'Fantastic Liquid Retina XDR display for photo and video editing, never a slowdown.' } },
    { stars: 4, text: { it: 'Macchina potente e ben costruita, investimento giustificato per uso professionale.', fr: 'Machine puissante et bien construite, investissement justifié pour un usage professionnel.', en: 'Powerful, well-built machine, justified investment for professional use.' } }
  ],
  description: {
    it: 'MacBook Pro 14" con chip M3 Pro, 18GB RAM, SSD 512GB. Display Liquid Retina XDR per uso professionale.',
    fr: 'MacBook Pro 14" avec puce M3 Pro, 18 Go de RAM, SSD 512 Go. Écran Liquid Retina XDR pour usage professionnel.',
    en: 'MacBook Pro 14" with M3 Pro chip, 18GB RAM, 512GB SSD. Liquid Retina XDR display for professional use.'
  }
},
{
  slug: 'dell-xps-15',
  sku: 'LOT-PC-01',
  category: 'computer',
  brand: 'Dell',
  name: 'Dell XPS 15 i7 16GB/512GB RTX 4050',
  price: 1349,
  oldPrice: 1599,
  stock: 6,
  image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/page/category/laptop/xps/xps-15-9530/media-gallery/notebook-xps-15-9530-gallery-2.psd?fmt=png-alpha',
  rating: 4.5,
  reviewsCount: 421,
  reviewsList: [
    { stars: 5, text: { it: 'Schermo OLED stupendo, perfetto per grafica e montaggio video in mobilità.', fr: 'Écran OLED magnifique, parfait pour le graphisme et le montage vidéo en mobilité.', en: 'Gorgeous OLED screen, perfect for graphics and video editing on the move.' } },
    { stars: 4, text: { it: 'Ottime prestazioni ma scalda un po\' sotto carico prolungato.', fr: 'Excellentes performances mais chauffe un peu sous charge prolongée.', en: 'Great performance but it does run a bit hot under sustained load.' } }
  ],
  description: {
    it: 'Dell XPS 15, Intel Core i7, 16GB RAM, SSD 512GB, GPU RTX 4050. Display 15.6" 3.5K OLED.',
    fr: 'Dell XPS 15, Intel Core i7, 16 Go de RAM, SSD 512 Go, GPU RTX 4050. Écran 15,6" 3,5K OLED.',
    en: 'Dell XPS 15, Intel Core i7, 16GB RAM, 512GB SSD, RTX 4050 GPU. 15.6" 3.5K OLED display.'
  }
},
{
  slug: 'pc-gaming-rtx4070',
  sku: 'LOT-PC-02',
  category: 'computer',
  brand: 'PalletBuild',
  name: 'PC Desktop Gaming Ryzen 7 / RTX 4070 / 32GB',
  price: 1499,
  oldPrice: 1799,
  stock: 5,
  image: 'https://nzxt.com/assets/cms/34299/1715859787-player-three-prime-black-angle.png',
  rating: 4.6,
  reviewsCount: 198,
  reviewsList: [
    { stars: 5, text: { it: 'Gira tutto in 4K senza problemi, montaggio ordinato e cablaggio pulito.', fr: 'Tout tourne en 4K sans problème, montage soigné et câblage propre.', en: 'Runs everything in 4K with no issues, neat build and clean cable management.' } },
    { stars: 4, text: { it: 'Ottimo rapporto prezzo prestazioni, ventole un po\' rumorose sotto stress.', fr: 'Excellent rapport prix-performances, ventilateurs un peu bruyants sous stress.', en: 'Great price-to-performance ratio, fans are a bit loud under stress.' } }
  ],
  description: {
    it: 'PC gaming assemblato: AMD Ryzen 7, 32GB RAM DDR5, SSD NVMe 1TB, GPU RTX 4070. Pronto per il 4K gaming.',
    fr: 'PC gaming assemblé : AMD Ryzen 7, 32 Go de RAM DDR5, SSD NVMe 1 To, GPU RTX 4070. Prêt pour le gaming 4K.',
    en: 'Assembled gaming PC: AMD Ryzen 7, 32GB DDR5 RAM, 1TB NVMe SSD, RTX 4070 GPU. Ready for 4K gaming.'
  }
},
{
  slug: 'laptop-hp-pavilion',
  sku: 'LOT-PC-03',
  category: 'computer',
  brand: 'HP',
  name: 'HP Pavilion 15 i5 16GB/512GB',
  price: 599,
  oldPrice: 729,
  stock: 12,
  image: 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08467457.png',
  rating: 4.4,
  reviewsCount: 860,
  reviewsList: [
    { stars: 4, text: { it: 'Ottimo per studio e ufficio, leggero da portare in università ogni giorno.', fr: 'Très bon pour les études et le bureau, léger à transporter à la fac tous les jours.', en: 'Great for studying and office work, light enough for daily campus use.' } },
    { stars: 4, text: { it: 'Buon rapporto qualità prezzo, autonomia nella media ma sufficiente per una giornata di lezioni.', fr: 'Bon rapport qualité-prix, autonomie moyenne mais suffisante pour une journée de cours.', en: 'Good value for money, average battery life but enough for a day of classes.' } }
  ],
  description: {
    it: 'HP Pavilion 15, Intel Core i5, 16GB RAM, SSD 512GB. Ideale per studio e ufficio.',
    fr: 'HP Pavilion 15, Intel Core i5, 16 Go de RAM, SSD 512 Go. Idéal pour les études et le bureau.',
    en: 'HP Pavilion 15, Intel Core i5, 16GB RAM, 512GB SSD. Ideal for study and office use.'
  }
},

// ── DRONE ───────────────────────────────────

{
  slug: 'dji-mini-4-pro',
  sku: 'LOT-DRN-01',
  category: 'drone',
  brand: 'DJI',
  name: 'DJI Mini 4 Pro (con telecomando RC 2)',
  price: 749,
  oldPrice: 899,
  stock: 7,
  image: 'https://dji-official-fe.djicdn.com/dps/5fbe4bdfd5d9d0b8d5eab42f68fcb9bb.png',
  rating: 4.8,
  reviewsCount: 430,
  reviewsList: [
    { stars: 5, text: { it: 'Video 4K stabilissimi, sensori anticollisione efficaci anche tra gli alberi.', fr: 'Vidéos 4K très stables, capteurs anticollision efficaces même entre les arbres.', en: 'Super stable 4K footage, collision sensors work great even between trees.' } },
    { stars: 5, text: { it: 'Compatto e leggero sotto 250g, perfetto per viaggiare senza problemi di normativa.', fr: 'Compact et léger sous 250g, parfait pour voyager sans soucis réglementaires.', en: 'Compact and light under 250g, perfect for travel without regulation headaches.' } }
  ],
  description: {
    it: 'Drone DJI Mini 4 Pro, video 4K/60fps HDR, rilevamento ostacoli omnidirezionale, peso sotto 249g.',
    fr: 'Drone DJI Mini 4 Pro, vidéo 4K/60fps HDR, détection d\'obstacles omnidirectionnelle, poids sous 249g.',
    en: 'DJI Mini 4 Pro drone, 4K/60fps HDR video, omnidirectional obstacle sensing, under 249g.'
  }
},
{
  slug: 'dji-neo',
  sku: 'LOT-DRN-02',
  category: 'drone',
  brand: 'DJI',
  name: 'DJI Neo – Mini Drone con protezioni',
  price: 199,
  oldPrice: 249,
  stock: 13,
  image: 'https://dji-official-fe.djicdn.com/dps/0b86d80e4c7ea4e35c29c6d2d70a70fd.png',
  rating: 4.5,
  reviewsCount: 612,
  reviewsList: [
    { stars: 5, text: { it: 'Si lancia dal palmo della mano, perfetto per iniziare senza spendere troppo.', fr: 'Se lance depuis la paume de la main, parfait pour débuter sans trop dépenser.', en: 'Launches right from your palm, perfect for getting started without overspending.' } },
    { stars: 4, text: { it: 'Divertente da usare ma autonomia limitata, da comprare batterie extra.', fr: 'Amusant à utiliser mais autonomie limitée, prévoir des batteries supplémentaires.', en: 'Fun to fly but limited battery life, worth getting extra batteries.' } }
  ],
  description: {
    it: 'DJI Neo, mini drone con eliche protette, decollo dal palmo della mano, video 4K stabilizzato.',
    fr: 'DJI Neo, mini drone avec hélices protégées, décollage depuis la paume de la main, vidéo 4K stabilisée.',
    en: 'DJI Neo, mini drone with propeller guards, palm takeoff, stabilized 4K video.'
  }
},

  // ── MOBILITÀ ELETTRICA (vélos / trottinettes) ─
  {
  slug: 'ebike-city-fat-bike',
  sku: 'LOT-EBK-01',
  category: 'ebike',
  brand: 'PalletMove',
  name: 'E-Bike City 28" Motore 250W Batteria 36V/14Ah',
  price: 899,
  oldPrice: 1099,
  stock: 6,
  image: 'https://engwe-bikes-eu.com/cdn/shop/files/EnginePro2.0-Black.png',
  rating: 4.5,
  reviewsCount: 214,
  reviewsList: [
    { stars: 5, text: { it: 'Pedalata assistita fluida, ottima per i tragitti casa-lavoro, autonomia reale di circa 50 km.', fr: 'Assistance au pédalage fluide, idéale pour le trajet domicile-travail, autonomie réelle d\'environ 50 km.', en: 'Smooth pedal assist, great for the daily commute, real-world range around 50 km.' } },
    { stars: 4, text: { it: 'Robusta e comoda, montaggio richiesto all\'arrivo ma istruzioni chiare.', fr: 'Robuste et confortable, montage requis à la livraison mais instructions claires.', en: 'Sturdy and comfortable, assembly required on arrival but instructions are clear.' } }
  ],
  description: {
    it: 'E-bike city 28", motore 250W, batteria removibile 36V/14Ah, autonomia fino a 60 km, cambio Shimano 7 velocità.',
    fr: 'Vélo électrique city 28", moteur 250W, batterie amovible 36V/14Ah, autonomie jusqu\'à 60 km, dérailleur Shimano 7 vitesses.',
    en: '28" city e-bike, 250W motor, removable 36V/14Ah battery, up to 60 km range, Shimano 7-speed gears.'
  }
},
{
  slug: 'monopattino-elettrico-xiaomi-4-pro',
  sku: 'LOT-EBK-02',
  category: 'ebike',
  brand: 'Xiaomi',
  name: 'Monopattino Elettrico Xiaomi Electric Scooter 4 Pro',
  price: 449,
  oldPrice: 549,
  stock: 11,
  image: 'https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-electric-scooter-4-pro/pc/4d2ec8d96fcb1b9d73dfc6b00e8e4fdd.png',
  rating: 4.6,
  reviewsCount: 980,
  reviewsList: [
    { stars: 5, text: { it: 'Stabilissimo anche sopra i 20 km/h, freni a disco rassicuranti in città.', fr: 'Très stable même au-dessus de 20 km/h, freins à disque rassurants en ville.', en: 'Very stable even above 20 km/h, disc brakes feel reassuring in city traffic.' } },
    { stars: 4, text: { it: 'Pieghevole comodo da portare sui mezzi pubblici, un po\' pesante da trasportare a mano.', fr: 'Pliable, pratique dans les transports en commun, un peu lourd à porter à la main.', en: 'Foldable and handy on public transport, a bit heavy to carry by hand.' } }
  ],
  description: {
    it: 'Monopattino elettrico pieghevole, motore 300W, autonomia fino a 45 km, velocità max 25 km/h, display LED.',
    fr: 'Trottinette électrique pliable, moteur 300W, autonomie jusqu\'à 45 km, vitesse max 25 km/h, écran LED.',
    en: 'Foldable electric scooter, 300W motor, up to 45 km range, max speed 25 km/h, LED display.'
  }
},

// ── FRIGO ───────────────────────────────────

{
  slug: 'samsung-frigo-combinato',
  sku: 'LOT-FRG-01',
  category: 'frigo',
  brand: 'Samsung',
  name: 'Samsung Frigorifero combinato No Frost 360L',
  price: 489,
  oldPrice: 599,
  stock: 7,
  image: 'https://images.samsung.com/is/image/samsung/p6pim/it/rb34c675esa-ef/gallery/it-combinato-rb7300t-rb34c675esa-ef-537587160.png',
  rating: 4.6,
  reviewsCount: 540,
  reviewsList: [
    { stars: 5, text: { it: 'Silenzioso e capiente, il No Frost evita davvero la formazione di ghiaccio nel freezer.', fr: 'Silencieux et spacieux, le No Frost évite vraiment la formation de glace dans le congélateur.', en: 'Quiet and spacious, No Frost genuinely prevents ice build-up in the freezer.' } },
    { stars: 4, text: { it: 'Consegna e installazione gestite senza problemi, manca solo qualche ripiano regolabile in più.', fr: 'Livraison et installation gérées sans problème, il manque juste quelques étagères réglables en plus.', en: 'Delivery and installation handled smoothly, just wish it had a few more adjustable shelves.' } }
  ],
  description: {
    it: 'Frigorifero combinato Samsung 360L, tecnologia No Frost, classe energetica E. Consegna e installazione disponibili.',
    fr: 'Réfrigérateur combiné Samsung 360L, technologie No Frost, classe énergétique E. Livraison et installation disponibles.',
    en: 'Samsung 360L combi fridge-freezer, No Frost technology, energy class E. Delivery and installation available.'
  }
},
{
  slug: 'bosch-frigo-americano',
  sku: 'LOT-FRG-02',
  category: 'frigo',
  brand: 'Bosch',
  name: 'Bosch Frigorifero Side-by-Side americano 540L',
  price: 999,
  oldPrice: 1199,
  stock: 3,
  image: 'https://media3.bosch-home.com/Product_Shots/1800x1012/MCSA04874665_KAD93AIEP_def.png',
  rating: 4.7,
  reviewsCount: 188,
  reviewsList: [
    { stars: 5, text: { it: 'Capacità enorme, perfetto per famiglia numerosa, dispenser di acqua e ghiaccio molto comodo.', fr: 'Capacité énorme, parfait pour une famille nombreuse, distributeur d\'eau et de glace très pratique.', en: 'Huge capacity, perfect for a large family, water and ice dispenser is very convenient.' } },
    { stars: 4, text: { it: 'Qualità Bosch percepibile, va misurato bene lo spazio prima dell\'acquisto perché è davvero grande.', fr: 'Qualité Bosch perceptible, bien mesurer l\'espace avant l\'achat car il est vraiment imposant.', en: 'You can feel the Bosch quality, measure your space carefully before buying as it\'s genuinely large.' } }
  ],
  description: {
    it: 'Frigorifero americano Bosch Side-by-Side 540L, dispenser acqua e ghiaccio, classe E. Ingombro extra-large.',
    fr: 'Réfrigérateur américain Bosch Side-by-Side 540L, distributeur d\'eau et de glace, classe E. Grand volume.',
    en: 'Bosch Side-by-Side American fridge 540L, water and ice dispenser, energy class E. Extra-large capacity.'
  }
},
{
  slug: 'whirlpool-mini-frigo',
  sku: 'LOT-FRG-03',
  category: 'frigo',
  brand: 'Whirlpool',
  name: 'Whirlpool Mini frigorifero da tavolo 95L',
  price: 149,
  oldPrice: 189,
  stock: 15,
  image: 'https://www.whirlpool.it/content/dam/global/documents/202303/product-images-argos/859991608920_01.png',
  rating: 4.4,
  reviewsCount: 760,
  reviewsList: [
    { stars: 4, text: { it: 'Perfetto per la cameretta dei figli o l\'ufficio, silenzioso anche di notte.', fr: 'Parfait pour la chambre des enfants ou le bureau, silencieux même la nuit.', en: 'Perfect for a kid\'s room or office, quiet even at night.' } },
    { stars: 5, text: { it: 'Compatto ma sorprendentemente capiente, ottimo secondo frigo per le bevande.', fr: 'Compact mais étonnamment spacieux, excellent second réfrigérateur pour les boissons.', en: 'Compact but surprisingly roomy, great second fridge for drinks.' } }
  ],
  description: {
    it: 'Mini frigorifero Whirlpool 95L, ideale per camera, ufficio o monolocale. Compatto e silenzioso.',
    fr: 'Mini réfrigérateur Whirlpool 95L, idéal pour chambre, bureau ou studio. Compact et silencieux.',
    en: 'Whirlpool 95L mini fridge, ideal for bedroom, office or studio. Compact and quiet.'
  }
},


  // ── CLIMATIZZATORI ───────────────────────────
  {
  slug: 'climatizzatore-portatile-delonghi',
  sku: 'LOT-CLM-01',
  category: 'climatizzatore',
  brand: "De'Longhi",
  name: "De'Longhi Climatizzatore Portatile 12000 BTU",
  price: 399,
  oldPrice: 489,
  stock: 14,
  image: 'https://www.delonghi.com/medias/PAC-EM90-SILENT-0132250036-hero-001.png',
  rating: 4.4,
  reviewsCount: 920,
  reviewsList: [
    { stars: 5, text: { it: 'Rinfresca davvero bene una camera da 25mq, telecomando comodo e timer utile di notte.', fr: 'Rafraîchit vraiment bien une pièce de 25m², télécommande pratique et minuteur utile la nuit.', en: 'Really cools a 25 sqm room well, handy remote and useful night timer.' } },
    { stars: 4, text: { it: 'Buon climatizzatore ma un po\' rumoroso alla massima potenza, da spostare con il tubo verso la finestra.', fr: 'Bon climatiseur mais un peu bruyant à pleine puissance, à placer avec le tuyau vers la fenêtre.', en: 'Good AC unit but a bit noisy at max power, position the hose toward the window.' } }
  ],
  description: {
    it: 'Climatizzatore portatile 12000 BTU, modalità raffrescamento e deumidificazione, telecomando incluso, ruote per spostamento facile.',
    fr: 'Climatiseur portable 12000 BTU, mode rafraîchissement et déshumidification, télécommande incluse, roulettes pour déplacement facile.',
    en: 'Portable 12000 BTU air conditioner, cooling and dehumidifying modes, remote included, wheels for easy moving.'
  }
},
{
  slug: 'climatizzatore-portatile-compatto',
  sku: 'LOT-CLM-02',
  category: 'climatizzatore',
  brand: 'PalletHome',
  name: 'Climatizzatore Portatile Compatto 9000 BTU',
  price: 269,
  oldPrice: 329,
  stock: 19,
  image: 'https://m.media-amazon.com/images/I/71Q3+4cXwFL._AC_SL1500_.jpg',
  rating: 4.2,
  reviewsCount: 540,
  reviewsList: [
    { stars: 4, text: { it: 'Buon rapporto qualità prezzo per una camera piccola, facile da installare da solo.', fr: 'Bon rapport qualité-prix pour une petite pièce, facile à installer soi-même.', en: 'Good value for a small room, easy to install on your own.' } },
    { stars: 4, text: { it: 'Funziona bene ma il serbatoio condensa va vuotato regolarmente nei giorni più umidi.', fr: 'Fonctionne bien mais le réservoir de condensation doit être vidé régulièrement les jours humides.', en: 'Works well but the condensation tank needs regular emptying on humid days.' } }
  ],
  description: {
    it: 'Climatizzatore portatile compatto 9000 BTU, ideale per camere fino a 20mq, filtro lavabile, basso consumo energetico.',
    fr: 'Climatiseur portable compact 9000 BTU, idéal pour pièces jusqu\'à 20m², filtre lavable, faible consommation énergétique.',
    en: 'Compact portable 9000 BTU air conditioner, ideal for rooms up to 20 sqm, washable filter, low energy use.'
  }
},

// ── RISCALDAMENTO ───────────────────────────

{
  slug: 'delonghi-radiatore-elettrico',
  sku: 'LOT-RIS-01',
  category: 'riscaldamento',
  brand: "De'Longhi",
  name: "De'Longhi Radiatore elettrico a olio 2000W",
  price: 89,
  oldPrice: 119,
  stock: 25,
  image: 'https://www.delonghi.com/medias/TRRS1225-0112598300-hero-001.png',
  rating: 4.5,
  reviewsCount: 1340,
  reviewsList: [
    { stars: 5, text: { it: 'Scalda in fretta una stanza media, termostato preciso e silenzioso durante la notte.', fr: 'Chauffe vite une pièce moyenne, thermostat précis et silencieux la nuit.', en: 'Heats a medium room quickly, accurate thermostat and quiet at night.' } },
    { stars: 4, text: { it: 'Buon radiatore di emergenza, le ruote rendono comodo spostarlo tra le stanze.', fr: 'Bon radiateur d\'appoint, les roulettes facilitent le déplacement entre les pièces.', en: 'Good backup heater, the wheels make it easy to move between rooms.' } }
  ],
  description: {
    it: "Radiatore elettrico a olio De'Longhi 2000W, 7 elementi, termostato regolabile e ruote per spostamento.",
    fr: "Radiateur électrique à bain d'huile De'Longhi 2000W, 7 éléments, thermostat réglable et roulettes.",
    en: "De'Longhi 2000W oil-filled electric radiator, 7 fins, adjustable thermostat and castor wheels."
  }
},
{
  slug: 'radiatore-soffiante-ceramico',
  sku: 'LOT-RIS-02',
  category: 'riscaldamento',
  brand: 'PalletHome',
  name: 'Termoventilatore ceramico 2200W con timer',
  price: 39,
  oldPrice: 59,
  stock: 30,
  image: 'https://m.media-amazon.com/images/I/71g5z4+QKTL._AC_SL1500_.jpg',
  rating: 4.3,
  reviewsCount: 1880,
  reviewsList: [
    { stars: 4, text: { it: 'Scalda subito il bagno appena entro sotto la doccia, compatto e leggero.', fr: 'Chauffe immédiatement la salle de bain dès que j\'entre sous la douche, compact et léger.', en: 'Heats the bathroom instantly right when I step in for a shower, compact and light.' } },
    { stars: 4, text: { it: 'Ottimo prezzo, il timer è comodo ma il rumore della ventola è percepibile.', fr: 'Très bon prix, le minuteur est pratique mais le bruit du ventilateur se fait sentir.', en: 'Great price, the timer is handy but the fan noise is noticeable.' } }
  ],
  description: {
    it: 'Termoventilatore ceramico 2200W, riscaldamento rapido, timer programmabile e protezione anti-surriscaldamento.',
    fr: 'Radiateur soufflant céramique 2200W, chauffe rapide, minuteur programmable et protection anti-surchauffe.',
    en: '2200W ceramic fan heater, fast heating, programmable timer and overheat protection.'
  }
},
{
  slug: 'pannello-infrarossi',
  sku: 'LOT-RIS-03',
  category: 'riscaldamento',
  brand: 'PalletHome',
  name: 'Pannello radiante a infrarossi 600W da parete',
  price: 129,
  oldPrice: 169,
  stock: 18,
  image: 'https://m.media-amazon.com/images/I/71R0GQeJq-L._AC_SL1500_.jpg',
  rating: 4.5,
  reviewsCount: 410,
  reviewsList: [
    { stars: 5, text: { it: 'Calore avvolgente e silenzioso, consumo molto più basso del radiatore tradizionale che avevo prima.', fr: 'Chaleur enveloppante et silencieuse, consommation bien plus basse que mon ancien radiateur traditionnel.', en: 'Cozy, silent heat, much lower consumption than my previous traditional radiator.' } },
    { stars: 4, text: { it: 'Bello da vedere a parete, l\'installazione richiede un po\' di attenzione per i tasselli.', fr: 'Joli au mur, l\'installation demande un peu d\'attention pour les chevilles.', en: 'Looks nice on the wall, installation needs a bit of care with the wall anchors.' } }
  ],
  description: {
    it: 'Pannello a infrarossi 600W da parete, riscaldamento uniforme e silenzioso, consumo energetico ridotto.',
    fr: 'Panneau radiant infrarouge 600W mural, chaleur homogène et silencieuse, consommation réduite.',
    en: '600W wall-mounted infrared panel, even and silent heat, reduced energy consumption.'
  }
},


  // ── PELLET E LEGNA ───────────────────────────
  {
  slug: 'pellet-faggio-premium-15kg',
  sku: 'LOT-PEL-01',
  category: 'pellet',
  brand: 'PalletWood',
  name: 'Pellet di Faggio Premium ENplus A1 – Sacco 15kg',
  price: 6.9,
  oldPrice: 8.5,
  stock: 240,
  image: 'https://m.media-amazon.com/images/I/71v0y9q0k-L._AC_SL1500_.jpg',
  rating: 4.7,
  reviewsCount: 3100,
  reviewsList: [
    { stars: 5, text: { it: 'Bruciano benissimo, pochissima cenere e ottimo calore costante per tutta la stagione.', fr: 'Brûlent très bien, très peu de cendres et chaleur constante excellente toute la saison.', en: 'Burns great, very little ash and excellent steady heat all season long.' } },
    { stars: 5, text: { it: 'Consegna a domicilio puntuale, sacchi ben sigillati e pellet asciutto al 100%.', fr: 'Livraison à domicile ponctuelle, sacs bien scellés et pellet 100% sec.', en: 'On-time home delivery, well-sealed bags and 100% dry pellets.' } }
  ],
  description: {
    it: 'Pellet di faggio certificato ENplus A1, basso tasso di umidità e cenere, sacco da 15kg, ideale per stufe e caldaie domestiche.',
    fr: 'Pellet de hêtre certifié ENplus A1, faible taux d\'humidité et de cendres, sac de 15kg, idéal pour poêles et chaudières domestiques.',
    en: 'ENplus A1 certified beech wood pellets, low moisture and ash content, 15kg bag, ideal for home stoves and boilers.'
  }
},
{
  slug: 'legna-da-ardere-faggio-secca',
  sku: 'LOT-PEL-02',
  category: 'pellet',
  brand: 'PalletWood',
  name: 'Legna da Ardere di Faggio Stagionata – Bancale 1mc',
  price: 159,
  oldPrice: 199,
  stock: 35,
  image: 'https://m.media-amazon.com/images/I/81xA+2m1d9L._AC_SL1500_.jpg',
  rating: 4.6,
  reviewsCount: 740,
  reviewsList: [
    { stars: 5, text: { it: 'Legna ben stagionata e secca, si accende facilmente e dura tantissimo nel camino.', fr: 'Bois bien sec et bien stocké, s\'allume facilement et dure très longtemps dans la cheminée.', en: 'Well-seasoned, dry wood, lights easily and lasts a long time in the fireplace.' } },
    { stars: 4, text: { it: 'Ottima qualità, solo la consegna con bancale richiede spazio per lo scarico nel cortile.', fr: 'Très bonne qualité, seule la livraison sur palette nécessite de l\'espace pour le déchargement dans la cour.', en: 'Great quality, just note the pallet delivery needs space for unloading in the yard.' } }
  ],
  description: {
    it: 'Legna da ardere di faggio stagionata 2 anni, umidità inferiore al 20%, bancale da 1 metro cubo pronto per il camino.',
    fr: 'Bois de chauffage de hêtre séché 2 ans, humidité inférieure à 20%, palette de 1 mètre cube prête pour la cheminée.',
    en: 'Beech firewood seasoned for 2 years, under 20% moisture, 1 cubic metre pallet ready for the fireplace.'
  }
},

// ── ASPIRAPOLVERE ───────────────────────────

{
  slug: 'dyson-v15-detect',
  sku: 'LOT-ASP-01',
  category: 'aspirapolvere',
  brand: 'Dyson',
  name: 'Dyson V15 Detect Aspirapolvere senza fili',
  price: 549,
  oldPrice: 699,
  stock: 9,
  image: 'https://www.dyson.com/content/dam/dyson/images/products/primary/447261-01.png',
  rating: 4.7,
  reviewsCount: 2640,
  reviewsList: [
    { stars: 5, text: { it: 'Il laser mostra davvero la polvere invisibile, potenza di aspirazione impressionante sui tappeti.', fr: 'Le laser révèle vraiment la poussière invisible, puissance d\'aspiration impressionnante sur les tapis.', en: 'The laser genuinely reveals invisible dust, impressive suction power on carpets.' } },
    { stars: 4, text: { it: 'Ottimo aspirapolvere, prezzo alto ma l\'autonomia di 60 minuti basta per tutta la casa.', fr: 'Excellent aspirateur, prix élevé mais l\'autonomie de 60 minutes suffit pour toute la maison.', en: 'Excellent vacuum, pricey but the 60-minute battery is enough for the whole house.' } }
  ],
  description: {
    it: 'Aspirapolvere Dyson V15 Detect, laser per rilevare la polvere, potenza di aspirazione elevata, autonomia fino a 60 minuti.',
    fr: 'Aspirateur Dyson V15 Detect, laser de détection de poussière, forte puissance d\'aspiration, jusqu\'à 60 min d\'autonomie.',
    en: 'Dyson V15 Detect vacuum, laser dust detection, high suction power, up to 60 minutes runtime.'
  }
},
{
  slug: 'roborock-q7',
  sku: 'LOT-ASP-02',
  category: 'aspirapolvere',
  brand: 'Roborock',
  name: 'Roborock Q7 Aspirapolvere robot con lavapavimenti',
  price: 299,
  oldPrice: 399,
  stock: 11,
  image: 'https://global.roborock.com/images/products/q7-max/q7-max-black.png',
  rating: 4.5,
  reviewsCount: 1290,
  reviewsList: [
    { stars: 5, text: { it: 'La navigazione LiDAR è precisissima, mappa la casa alla perfezione fin dal primo giro.', fr: 'La navigation LiDAR est très précise, cartographie la maison parfaitement dès le premier passage.', en: 'LiDAR navigation is very precise, maps the home perfectly from the first run.' } },
    { stars: 4, text: { it: 'Funzione lavapavimenti comoda per il mantenimento quotidiano, da svuotare spesso il serbatoio acqua.', fr: 'Fonction lavage pratique pour l\'entretien quotidien, le réservoir d\'eau doit être vidé souvent.', en: 'Mopping function is handy for daily maintenance, the water tank needs frequent emptying.' } }
  ],
  description: {
    it: 'Robot aspirapolvere Roborock Q7 con funzione lavapavimenti, navigazione laser LiDAR e controllo da app.',
    fr: 'Robot aspirateur Roborock Q7 avec fonction lavage, navigation laser LiDAR et contrôle via application.',
    en: 'Roborock Q7 robot vacuum with mopping function, LiDAR laser navigation and app control.'
  }
},
{
  slug: 'aspirapolvere-traino-bosch',
  sku: 'LOT-ASP-03',
  category: 'aspirapolvere',
  brand: 'Bosch',
  name: 'Bosch Aspirapolvere con sacco 700W',
  price: 79,
  oldPrice: 109,
  stock: 22,
  image: 'https://media3.bosch-home.com/Product_Shots/1800x1012/MCSA02892941_BGLS4X200_def.png',
  rating: 4.3,
  reviewsCount: 960,
  reviewsList: [
    { stars: 4, text: { it: 'Classico aspirapolvere affidabile, filtro Hepa utile per chi ha allergie in casa.', fr: 'Aspirateur classique et fiable, filtre HEPA utile pour les personnes allergiques à la maison.', en: 'Classic, reliable vacuum, HEPA filter is useful if someone at home has allergies.' } },
    { stars: 4, text: { it: 'Buona potenza di aspirazione, un po\' pesante da trasportare su per le scale.', fr: 'Bonne puissance d\'aspiration, un peu lourd à transporter dans les escaliers.', en: 'Good suction power, a bit heavy to carry up the stairs.' } }
  ],
  description: {
    it: 'Aspirapolvere a traino Bosch 700W con sacco, filtro Hepa e ampia capacità per uso domestico quotidiano.',
    fr: 'Aspirateur traîneau Bosch 700W avec sac, filtre HEPA et grande capacité pour un usage domestique quotidien.',
    en: 'Bosch 700W bagged canister vacuum, HEPA filter and large capacity for everyday home use.'
  }
},

  // ── CUCINA ──────────────────────────────────
{
  slug: 'delonghi-macchina-caffe-magnifica',
  sku: 'LOT-CUC-01',
  category: 'cucina',
  brand: "De'Longhi",
  name: "De'Longhi Magnifica Start Macchina da Caffè Automatica",
  price: 349,
  oldPrice: 429,
  stock: 16,
  image: 'https://www.delonghi.com/medias/ECAM220-22-GB.jpg',
  rating: 4.6,
  reviewsCount: 1480,
  reviewsList: [
    { stars: 5, text: { it: 'Caffè sempre perfetto, macina i chicchi al momento e la pulizia è semplicissima.', fr: 'Café toujours parfait, mouline les grains à l\'instant et le nettoyage est très simple.', en: 'Always perfect coffee, grinds beans fresh and cleaning is very simple.' } },
    { stars: 4, text: { it: 'Ottima per uso quotidiano, il montalatte manuale richiede un po\' di pratica.', fr: 'Excellente pour un usage quotidien, le mousseur manuel demande un peu de pratique.', en: 'Great for daily use, the manual milk frother takes a bit of practice.' } }
  ],
  description: {
    it: "Macchina da caffè automatica De'Longhi con macinacaffè integrato, regolazione intensità, pannello intuitivo.",
    fr: "Machine à café automatique De'Longhi avec broyeur intégré, réglage de l'intensité, panneau intuitif.",
    en: "De'Longhi automatic coffee machine with built-in grinder, intensity adjustment, intuitive panel."
  }
},
{
  slug: 'airfryer-philips-xxl',
  sku: 'LOT-CUC-02',
  category: 'cucina',
  brand: 'Philips',
  name: 'Philips Airfryer XXL 7.3L',
  price: 199,
  oldPrice: 259,
  stock: 20,
  image: 'https://images.philips.com/is/image/philipsconsumer/HD9650_90',
  rating: 4.7,
  reviewsCount: 2210,
  reviewsList: [
    { stars: 5, text: { it: 'Capacità enorme, riesco a cucinare per tutta la famiglia in un colpo solo. Patatine croccanti senza olio.', fr: 'Capacité énorme, je peux cuisiner pour toute la famille en une fois. Frites croustillantes sans huile.', en: 'Huge capacity, I can cook for the whole family in one go. Crispy fries with no oil.' } },
    { stars: 5, text: { it: 'Cestello facile da pulire, programmi preimpostati molto comodi per chi ha poco tempo.', fr: 'Panier facile à nettoyer, programmes préréglés très pratiques quand on a peu de temps.', en: 'Basket is easy to clean, preset programs are very handy when short on time.' } }
  ],
  description: {
    it: 'Airfryer Philips XXL 7.3L, tecnologia Rapid Air, programmi preimpostati, cestello antiaderente removibile.',
    fr: 'Airfryer Philips XXL 7,3L, technologie Rapid Air, programmes préréglés, panier antiadhésif amovible.',
    en: 'Philips Airfryer XXL 7.3L, Rapid Air technology, preset programs, removable non-stick basket.'
  }
},
{
  slug: 'robot-da-cucina-kenwood',
  sku: 'LOT-CUC-03',
  category: 'cucina',
  brand: 'Kenwood',
  name: 'Kenwood Robot da Cucina Multifunzione 1000W',
  price: 249,
  oldPrice: 319,
  stock: 9,
  image: 'https://www.kenwoodworld.com/medias/KHC29A0SI.jpg',
  rating: 4.5,
  reviewsCount: 670,
  reviewsList: [
    { stars: 5, text: { it: 'Impasta il pane perfettamente, motore potente e ciotola capiente per famiglie numerose.', fr: 'Pétrit le pain parfaitement, moteur puissant et bol spacieux pour les grandes familles.', en: 'Kneads bread perfectly, powerful motor and large bowl for big families.' } },
    { stars: 4, text: { it: 'Robot solido e versatile, gli accessori extra vanno acquistati separatamente.', fr: 'Robot solide et polyvalent, les accessoires supplémentaires s\'achètent séparément.', en: 'Sturdy, versatile mixer, extra attachments are sold separately.' } }
  ],
  description: {
    it: 'Robot da cucina Kenwood 1000W, ciotola in acciaio 4.3L, accessori per impastare, montare e sbattere incluso.',
    fr: 'Robot de cuisine Kenwood 1000W, bol en acier 4,3L, accessoires pour pétrir, monter et battre inclus.',
    en: 'Kenwood kitchen mixer 1000W, 4.3L steel bowl, kneading, whisking and beating attachments included.'
  }
},
{
  slug: 'batteria-cucina-tognana-10pz',
  sku: 'LOT-CUC-04',
  category: 'cucina',
  brand: 'Tognana',
  name: 'Tognana Batteria di Pentole Antiaderenti 10 Pezzi',
  price: 119,
  oldPrice: 159,
  stock: 17,
  image: 'https://www.tognana.com/media/catalog/product/b/a/batteria-10-pezzi.jpg',
  rating: 4.4,
  reviewsCount: 530,
  reviewsList: [
    { stars: 4, text: { it: 'Set completo per iniziare casa nuova, antiaderenza ottima nei primi mesi di utilizzo.', fr: 'Set complet pour s\'installer, antiadhésif excellent durant les premiers mois d\'utilisation.', en: 'Complete set for moving into a new home, great non-stick performance in the first months.' } },
    { stars: 4, text: { it: 'Buona qualità per il prezzo, i manici restano freddi anche dopo un\'ora sul fuoco.', fr: 'Bonne qualité pour le prix, les manches restent froides même après une heure sur le feu.', en: 'Good quality for the price, handles stay cool even after an hour on the stove.' } }
  ],
  description: {
    it: 'Batteria di pentole antiaderenti Tognana, 10 pezzi, adatta a tutti i piani cottura incluso induzione.',
    fr: 'Batterie de casseroles antiadhésives Tognana, 10 pièces, compatible avec toutes les plaques y compris induction.',
    en: 'Tognana non-stick cookware set, 10 pieces, suitable for all hobs including induction.'
  }
},

// ── FORNO ───────────────────────────────────
{
  slug: 'forno-incasso-bosch',
  sku: 'LOT-FRN-01',
  category: 'forno',
  brand: 'Bosch',
  name: 'Bosch Forno da incasso multifunzione 71L',
  price: 379,
  oldPrice: 459,
  stock: 8,
  image: 'https://media3.bosch-home.com/Product_Shots/1200x675/HBG675BS1.jpg',
  rating: 4.6,
  reviewsCount: 410,
  reviewsList: [
    { stars: 5, text: { it: 'La pulizia pirolitica è un vero salvavita, cottura uniforme su tutti i ripiani.', fr: 'Le nettoyage pyrolytique est un vrai sauveur, cuisson uniforme sur toutes les grilles.', en: 'The pyrolytic cleaning is a real lifesaver, even cooking on every shelf.' } },
    { stars: 4, text: { it: 'Ottimo forno, installazione da affidare a un tecnico per i collegamenti elettrici.', fr: 'Excellent four, installation à confier à un professionnel pour les branchements électriques.', en: 'Great oven, have a professional handle the electrical installation.' } }
  ],
  description: {
    it: 'Forno da incasso Bosch 71L, 8 funzioni di cottura, pulizia pirolitica, classe energetica A+.',
    fr: 'Four encastrable Bosch 71L, 8 fonctions de cuisson, nettoyage pyrolytique, classe énergétique A+.',
    en: 'Bosch built-in oven 71L, 8 cooking functions, pyrolytic self-cleaning, energy class A+.'
  }
},
{
  slug: 'microonde-samsung',
  sku: 'LOT-FRN-02',
  category: 'forno',
  brand: 'Samsung',
  name: 'Samsung Forno a microonde con grill 28L',
  price: 119,
  oldPrice: 149,
  stock: 16,
  image: 'https://images.samsung.com/is/image/samsung/p6pim/it/mg28f303tfk',
  rating: 4.4,
  reviewsCount: 690,
  reviewsList: [
    { stars: 4, text: { it: 'Funzione grill molto utile, decongelamento automatico funziona meglio del previsto.', fr: 'Fonction gril très utile, décongélation automatique fonctionne mieux que prévu.', en: 'Grill function is very handy, auto-defrost works better than expected.' } },
    { stars: 4, text: { it: 'Pannello digitale semplice da capire, capacità sufficiente per piatti e teglie medie.', fr: 'Panneau numérique simple à comprendre, capacité suffisante pour plats et plaques moyennes.', en: 'Digital panel is easy to understand, enough capacity for plates and medium trays.' } }
  ],
  description: {
    it: 'Forno a microonde Samsung 28L con funzione grill e decongelamento automatico. Pannello digitale intuitivo.',
    fr: 'Four à micro-ondes Samsung 28L avec fonction gril et décongélation automatique. Panneau numérique intuitif.',
    en: 'Samsung 28L microwave oven with grill function and auto-defrost. Intuitive digital panel.'
  }
},
{
  slug: 'fornetto-elettrico-delonghi',
  sku: 'LOT-FRN-03',
  category: 'forno',
  brand: "De'Longhi",
  name: "De'Longhi Fornetto elettrico ventilato 45L",
  price: 99,
  oldPrice: 139,
  stock: 14,
  image: 'https://www.delonghi.com/medias/EO40112-BK.jpg',
  rating: 4.3,
  reviewsCount: 350,
  reviewsList: [
    { stars: 4, text: { it: 'Ottima alternativa al forno grande in estate, scalda la cucina molto meno.', fr: 'Excellente alternative au grand four en été, chauffe beaucoup moins la cuisine.', en: 'Great alternative to the big oven in summer, heats the kitchen much less.' } },
    { stars: 4, text: { it: 'Compatto e capiente per una teglia media, la ventilazione cuoce in modo uniforme.', fr: 'Compact et spacieux pour une plaque moyenne, la ventilation cuit de façon homogène.', en: 'Compact and roomy enough for a medium tray, the fan cooks evenly.' } }
  ],
  description: {
    it: "Fornetto elettrico De'Longhi 45L ventilato, ideale come alternativa compatta al forno tradizionale.",
    fr: "Mini-four électrique ventilé De'Longhi 45L, idéal comme alternative compacte au four traditionnel.",
    en: "De'Longhi 45L convection mini-oven, ideal as a compact alternative to a traditional oven."
  }
},

  // ── CASA E GIARDINO ───────────────────────────
  {
    slug: 'lampada-led-da-terra-dimmerabile',
    sku: 'LOT-CAS-01',
    category: 'casa-giardino',
    brand: "PalletHome",
    name: "Lampada LED da Terra Dimmerabile con Telecomando",
    price: 59,
    oldPrice: 79,
    stock: 33,
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=60',
    rating: 4.5,
    reviewsCount: 480,
    reviewsList: [
      {
        stars: 5,
        text: {
          it: 'Luce calda e regolabile perfetta per le serate sul divano, telecomando comodo dal letto.',
          fr: 'Lumière chaude et réglable parfaite pour les soirées canapé, télécommande pratique depuis le lit.',
          en: 'Warm, adjustable light perfect for cozy evenings, remote is handy from the bed.'
        }
      },
      {
        stars: 4,
        text: {
          it: "Design elegante, base un po' leggera quindi va posizionata lontano dal passaggio.",
          fr: 'Design élégant, base un peu légère donc à placer loin du passage.',
          en: 'Elegant design, base is a bit light so position it away from foot traffic.'
        }
      }
    ],
    description: {
      it: 'Lampada da terra a LED dimmerabile, 3 temperature di colore, telecomando incluso, basso consumo energetico.',
      fr: 'Lampadaire LED dimmable, 3 températures de couleur, télécommande incluse, faible consommation énergétique.',
      en: 'Dimmable LED floor lamp, 3 color temperatures, remote included, low energy consumption.'
    }
  },
  {
    slug: 'set-attrezzi-giardinaggio-9pz',
    sku: 'LOT-CAS-02',
    category: 'casa-giardino',
    brand: 'PalletGarden',
    name: 'Set Attrezzi da Giardinaggio 9 Pezzi con Borsa',
    price: 45,
    oldPrice: 65,
    stock: 28,
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=60',
    rating: 4.4,
    reviewsCount: 320,
    reviewsList: [
      {
        stars: 4,
        text: {
          it: 'Set completo per il rinvaso, la borsa rende tutto facile da trasportare in balcone o giardino.',
          fr: 'Set complet pour le rempotage, le sac rend tout facile à transporter sur le balcon ou au jardin.',
          en: 'Complete set for repotting, the bag makes everything easy to carry to the balcony or garden.'
        }
      },
      {
        stars: 4,
        text: {
          it: "Buona qualità per uso occasionale, i guanti incluso sono un' aggiunta gradita.",
          fr: 'Bonne qualité pour un usage occasionnel, les gants inclus sont un plus appréciable.',
          en: 'Good quality for occasional use, the included gloves are a nice touch.'
        }
      }
    ],
    description: {
      it: 'Set 9 pezzi per giardinaggio: pala, rastrello, forbici, guanti e altri utensili, con borsa da trasporto.',
      fr: 'Set de 9 outils de jardinage : pelle, râteau, sécateur, gants et autres outils, avec sac de transport.',
      en: '9-piece gardening tool set: shovel, rake, shears, gloves and more, with carrying bag.'
    }
  },
  {
    slug: 'mobile-tv-design-moderno',
    sku: 'LOT-CAS-03',
    category: 'casa-giardino',
    brand: 'PalletHome',
    name: 'Mobile TV Design Moderno 140cm con Ante',
    price: 169,
    oldPrice: 219,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=60',
    rating: 4.3,
    reviewsCount: 210,
    reviewsList: [
      {
        stars: 4,
        text: {
          it: "Bel design moderno, montaggio richiede circa un'ora ma le istruzioni sono chiare.",
          fr: 'Beau design moderne, montage demande environ une heure mais les instructions sont claires.',
          en: 'Nice modern design, assembly takes about an hour but instructions are clear.'
        }
      },
      {
        stars: 4,
        text: {
          it: 'Ottimo rapporto qualità prezzo, le ante chiudono bene e nascondono i cavi.',
          fr: 'Excellent rapport qualité-prix, les portes ferment bien et cachent les câbles.',
          en: 'Great value, the doors close nicely and hide the cables well.'
        }
      }
    ],
    description: {
      it: 'Mobile porta TV 140cm, design moderno, ante con cerniere soft-close, vano passacavi integrato.',
      fr: 'Meuble TV 140cm, design moderne, portes avec charnières soft-close, passage de câbles intégré.',
      en: '140cm TV unit, modern design, soft-close hinged doors, integrated cable management.'
    }
  },

  {
    slug: 'occhiali-da-sole-polarizzati-aviator',
    sku: 'LOT-OCC-01',
    category: 'occhiali',
    brand: 'PalletStyle',
    name: 'Occhiali da Sole Polarizzati Stile Aviator UV400',
    price: 29,
    oldPrice: 45,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f8e66?auto=format&fit=crop&w=800&q=60',
    rating: 4.5,
    reviewsCount: 870,
    reviewsList: [
      {
        stars: 5,
        text: {
          it: 'Lenti polarizzate davvero efficaci, niente più riflessi guidando contro sole.',
          fr: 'Verres polarisés vraiment efficaces, plus de reflets en conduisant face au soleil.',
          en: 'Polarized lenses really work, no more glare when driving into the sun.'
        }
      },
      {
        stars: 4,
        text: {
          it: "Bel design classico, la montatura è leggera ma sembra solida nell'uso quotidiano.",
          fr: 'Beau design classique, la monture est légère mais semble solide à l’usage quotidien.',
          en: 'Nice classic design, the frame is light but feels sturdy in daily use.'
        }
      }
    ],
    description: {
      it: 'Occhiali da sole polarizzati stile aviator, protezione UV400, montatura leggera in metallo, custodia rigida incl.',
      fr: 'Lunettes de soleil polarisées style aviateur, protection UV400, monture légère en métal, étui rigide incl.',
      en: 'Polarized aviator-style sunglasses, UV400 protection, lightweight metal frame, hard case included.'
    }
  },
  {
    slug: 'occhiali-da-sole-sportivi-tr90',
    sku: 'LOT-OCC-02',
    category: 'occhiali',
    brand: 'PalletStyle',
    name: 'Occhiali da Sole Sportivi TR90 Antiscivolo',
    price: 24,
    oldPrice: 39,
    stock: 75,
    image: 'https://images.unsplash.com/photo-1520975958225-1a6d6a6b6f74?auto=format&fit=crop&w=800&q=60',
    rating: 4.3,
    reviewsCount: 540,
    reviewsList: [
      {
        stars: 4,
        text: {
          it: 'Perfetti per correre, non scivolano nemmeno sudando molto.',
          fr: 'Parfaites pour courir, ne glissent pas même en transpirant beaucoup.',
          en: "Perfect for running, they don't slip even when sweating a lot."
        }
      },
      {
        stars: 4,
        text: {
          it: 'Leggerissimi e flessibili, ottimi per ciclismo e attività outdoor in genere.',
          fr: 'Très légères et flexibles, idéales pour le cyclisme et les activités outdoor en général.',
          en: 'Very light and flexible, great for cycling and outdoor activities in general.'
        }
      }
    ],
    description: {
      it: 'Occhiali da sole sportivi in TR90 flessibile, lenti antiriflesso, naso e aste antiscivolo, ideali per running e ciclismo.',
      fr: 'Lunettes de soleil sportives en TR90 flexible, verres antireflet, nez et branches antidérapantes, idéales running et cyclisme.',
      en: 'Sports sunglasses in flexible TR90, anti-glare lenses, non-slip nose and temples, ideal for running and cycling.'
    }
  },

  // ── ANIMALI DOMESTICI ─────────────────────────
    {
    slug: 'crocchette-cane-adulto-12kg',
    sku: 'LOT-ANI-01',
    category: 'animali',
    brand: 'PalletPet',
    name: 'Crocchette per Cane Adulto Pollo e Riso – Sacco 12kg',
    price: 39,
    oldPrice: 49,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=60',
    rating: 4.6,
    reviewsCount: 1120,
    reviewsList: [
      { stars: 5, text: { it: 'Il mio cane le adora e il pelo è diventato più lucido dopo un mese.', fr: 'Mon chien les adore et son poil est devenu plus brillant après un mois.', en: 'My dog loves them and his coat got shinier after a month.' } },
      { stars: 4, text: { it: 'Buon rapporto qualità prezzo, sacco resistente e crocchette di dimensione adatta.', fr: 'Bon rapport qualité-prix, sac résistant et croquettes de taille adaptée.', en: 'Good value for money, sturdy bag and right-sized kibble.' } }
    ],
    description: {
      it: 'Crocchette per cane adulto a base di pollo e riso, senza coloranti artificiali, sacco da 12kg.',
      fr: 'Croquettes pour chien adulte à base de poulet et de riz, sans colorants artificiels, sac de 12kg.',
      en: 'Adult dog kibble with chicken and rice, no artificial colorants, 12kg bag.'
    }
  },
  {
    slug: 'crocchette-gatto-sterilizzato-7kg',
    sku: 'LOT-ANI-02',
    category: 'animali',
    brand: 'PalletPet',
    name: 'Crocchette per Gatto Sterilizzato – Sacco 7kg',
    price: 27,
    oldPrice: 36,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=60',
    rating: 4.5,
    reviewsCount: 980,
    reviewsList: [
      { stars: 5, text: { it: 'Formula specifica per sterilizzati, il mio gatto ha mantenuto il peso ideale.', fr: 'Formule spécifique pour stérilisés, mon chat a gardé son poids idéal.', en: 'Specific formula for neutered cats, my cat maintained his ideal weight.' } },
      { stars: 4, text: { it: 'Crocchette gradite anche dai gatti più selettivi, confezione richiudibile comoda.', fr: 'Croquettes appréciées même par les chats les plus difficiles, emballage refermable pratique.', en: 'Kibble liked even by picky cats, resealable packaging is convenient.' } }
    ],
    description: {
      it: 'Crocchette per gatto sterilizzato, formula a basso contenuto calorico, supporto al benessere urinario, sacco 7kg.',
      fr: 'Croquettes pour chat stérilisé, formule basse en calories, soutien du bien-être urinaire, sac de 7kg.',
      en: 'Kibble for neutered cats, low-calorie formula, urinary health support, 7kg bag.'
    }
  },
  {
    slug: 'lettiera-gatto-bentonite-agglomerante',
    sku: 'LOT-ANI-03',
    category: 'animali',
    brand: 'PalletPet',
    name: 'Lettiera per Gatti in Bentonite Agglomerante – 10L',
    price: 14,
    oldPrice: 19,
    stock: 70,
    image: 'https://images.unsplash.com/photo-1608848461950-0fe54bd0a3f2?auto=format&fit=crop&w=800&q=60',
    rating: 4.4,
    reviewsCount: 640,
    reviewsList: [
      { stars: 4, text: { it: 'Forma palline compatte facilissime da rimuovere, controllo odori molto buono.', fr: 'Forme des boules compactes très faciles à retirer, bon contrôle des odeurs.', en: 'Forms compact clumps that are very easy to scoop, good odor control.' } },
      { stars: 4, text: { it: "Poca polvere quando la verso, il mio gatto l'a accettata senza problemi.", fr: 'Peu de poussière en versant, mon chat l’a acceptée sans problème.', en: 'Low dust when pouring, my cat accepted it without any issue.' } }
    ],
    description: {
      it: 'Lettiera agglomerante in bentonite, alto potere assorbente, controllo odori, sacco 10 litri.',
      fr: 'Litière agglomérante en bentonite, fort pouvoir absorbant, contrôle des odeurs, sac de 10 litres.',
      en: 'Clumping bentonite litter, high absorbency, odor control, 10-litre bag.'
    }
  },
  {
    slug: 'tiragraffi-albero-per-gatti-150cm',
    sku: 'LOT-ANI-04',
    category: 'animali',
    brand: 'PalletPet',
    name: 'Tiragraffi Albero per Gatti 150cm con Tana',
    price: 69,
    oldPrice: 89,
    stock: 24,
    image: 'https://images.unsplash.com/photo-1611003229186-80c9c7d0b1b0?auto=format&fit=crop&w=800&q=60',
    rating: 4.5,
    reviewsCount: 410,
    reviewsList: [
      { stars: 5, text: { it: "I miei due gatti lo usano tutto il giorno, struttura stabile e robusta.", fr: 'Mes deux chats l’utilisent toute la journée.', en: 'My two cats use it all day, very stable and sturdy.' } }
    ],
    description: {
      it: 'Tiragraffi albero per gatti alto 150cm, con tana e piattaforme multiple.',
      fr: 'Arbre à chat de 150cm avec niche et plateformes.',
      en: '150cm cat tree with den and multiple platforms.'
    }
  },
  {
    slug: 'giochi-interattivi-cane-set',
    sku: 'LOT-ANI-05',
    category: 'animali',
    brand: 'PalletPet',
    name: 'Set Giochi Interattivi per Cane – 5 Pezzi',
    price: 22,
    oldPrice: 32,
    stock: 38,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=60',
    rating: 4.4,
    reviewsCount: 290,
    reviewsList: [
      { stars: 4, text: { it: 'Il mio cucciolo si diverte molto, materiali resistenti.', fr: 'Mon chiot s’amuse beaucoup.', en: 'My puppy loves it, very durable materials.' } }
    ],
    description: {
      it: 'Set di 5 giochi interattivi per cane con corde e palline.',
      fr: 'Set de 5 jouets interactifs pour chien.',
      en: '5-piece interactive dog toy set.'
    }
  },

  {
    slug: 'portacarte-slim-pelle-marrone',
    sku: 'JBL-WWYbRipR2p',
    category: 'fai-da-te',
    brand: 'Jobalots',
    name: 'Porta-carte Slim in Pelle – Marrone',
    price: 18,
    oldPrice: 35,
    stock: 47,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=60',
    rating: 4.5,
    reviewsCount: 96,
    reviewsList: [
      { stars: 5, text: { it: 'Sottilissimo e pratico.', fr: 'Très fin et pratique.', en: 'Very slim and practical.' } }
    ],
    description: {
      it: 'Porta-carte minimalista in pelle marrone.',
      fr: 'Porte-cartes minimaliste en cuir marron.',
      en: 'Slim brown leather card holder.'
    }
  },
  {
    slug: 'set-chiavi-a-cricchetto-eneacro-12pz',
    sku: 'JBL-spIy811BfQx',
    category: 'fai-da-te',
    brand: 'ENEACRO',
    name: 'Set di Chiavi a Cricchetto ENEACRO 12 Pezzi 6-19mm',
    price: 27,
    oldPrice: 38,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1581147036324-c3b7e9c0a2c0?auto=format&fit=crop&w=800&q=60',
    rating: 4.6,
    reviewsCount: 540,
    reviewsList: [
      { stars: 5, text: { it: 'Ottime chiavi robuste.', fr: 'Clés très solides.', en: 'Very strong wrench set.' } }
    ],
    description: {
      it: 'Set 12 chiavi a cricchetto in acciaio.',
      fr: 'Set de 12 clés à cliquet.',
      en: '12-piece ratcheting wrench set.'
    }
  }
];

export function getAllProducts() {
  return PRODUCTS;
}

export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

export function getProductsByCategory(categorySlug) {
  if (!categorySlug || categorySlug === 'all') return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === categorySlug);
}

export function getCategoryBySlug(slug) {
  return CATEGORIES.find((c) => c.slug === slug) || null;
}