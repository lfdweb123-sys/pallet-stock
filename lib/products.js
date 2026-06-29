// lib/products.js
// Catalogue en dur — pas de back-office. Pour modifier un produit,
// éditer directement cet objet puis redéployer sur Vercel.
//
// `image` pointe vers un placeholder par catégorie dans /public/images/products/.
// Remplacer par de vraies photos (mêmes noms de fichiers) quand disponibles.

export const CATEGORIES = [
  { slug: 'console', label: { it: 'Console', fr: 'Consoles', en: 'Consoles' }, icon: '🎮' },
  { slug: 'smartphone', label: { it: 'Smartphone', fr: 'Smartphones', en: 'Smartphones' }, icon: '📱' },
  { slug: 'tablet', label: { it: 'Tablet', fr: 'Tablettes', en: 'Tablets' }, icon: '📲' },
  { slug: 'computer', label: { it: 'Computer', fr: 'Ordinateurs', en: 'Computers' }, icon: '💻' },
  { slug: 'frigo', label: { it: 'Frigoriferi', fr: 'Réfrigérateurs', en: 'Fridges' }, icon: '🧊' },
  { slug: 'riscaldamento', label: { it: 'Riscaldamento', fr: 'Chauffage', en: 'Heating' }, icon: '🔥' },
  { slug: 'aspirapolvere', label: { it: 'Aspirapolvere', fr: 'Aspirateurs', en: 'Vacuums' }, icon: '🧹' },
  { slug: 'forno', label: { it: 'Forni', fr: 'Fours', en: 'Ovens' }, icon: '🍽️' }
];

export const PRODUCTS = [
  // ── CONSOLE ─────────────────────────────────
  {
    slug: 'ps5-slim-digital',
    sku: 'LOT-PS5-01',
    category: 'console',
    brand: 'Sony',
    name: 'PlayStation 5 Slim Digital Edition 1TB',
    price: 449,
    oldPrice: 549,
    stock: 14,
    image: '/images/products/console.svg',
    description: {
      it: 'Console PlayStation 5 Slim Digital Edition con SSD da 1TB. Caricamenti ultrarapidi, audio 3D e grafica 4K. Nuova, scatola sigillata.',
      fr: 'Console PlayStation 5 Slim Digital Edition avec SSD 1To. Chargements ultra-rapides, audio 3D et graphismes 4K. Neuve, boîte scellée.',
      en: 'PlayStation 5 Slim Digital Edition console with 1TB SSD. Ultra-fast loading, 3D audio and 4K graphics. New, sealed box.'
    }
  },
  {
    slug: 'ps5-slim-disc',
    sku: 'LOT-PS5-02',
    category: 'console',
    brand: 'Sony',
    name: 'PlayStation 5 Slim con lettore disco 1TB',
    price: 499,
    oldPrice: 599,
    stock: 9,
    image: '/images/products/console.svg',
    description: {
      it: 'Console PlayStation 5 Slim con lettore disco e SSD 1TB. Compatibile con tutti i giochi PS5 in formato fisico.',
      fr: 'Console PlayStation 5 Slim avec lecteur disque et SSD 1To. Compatible avec tous les jeux PS5 au format physique.',
      en: 'PlayStation 5 Slim console with disc drive and 1TB SSD. Compatible with all physical-format PS5 games.'
    }
  },
  {
    slug: 'ps5-pro',
    sku: 'LOT-PS5-03',
    category: 'console',
    brand: 'Sony',
    name: 'PlayStation 5 Pro 2TB',
    price: 749,
    oldPrice: 869,
    stock: 5,
    image: '/images/products/console.svg',
    description: {
      it: 'PlayStation 5 Pro con SSD 2TB, GPU potenziata per ray tracing avanzato e risoluzione 4K a frame rate elevato.',
      fr: 'PlayStation 5 Pro avec SSD 2To, GPU renforcé pour le ray tracing avancé et résolution 4K à haute fréquence.',
      en: 'PlayStation 5 Pro with 2TB SSD, enhanced GPU for advanced ray tracing and high frame-rate 4K resolution.'
    }
  },
  {
    slug: 'ps5-dualsense-pack',
    sku: 'LOT-PS5-04',
    category: 'console',
    brand: 'Sony',
    name: 'PS5 Slim Digital + 2 controller DualSense',
    price: 519,
    oldPrice: 629,
    stock: 7,
    image: '/images/products/console.svg',
    description: {
      it: 'Pacco lotto: console PS5 Slim Digital 1TB + secondo controller DualSense incluso. Ideale per giocare in due.',
      fr: 'Lot pack : console PS5 Slim Digital 1To + second contrôleur DualSense inclus. Idéal pour jouer à deux.',
      en: 'Bundle lot: PS5 Slim Digital 1TB console + second DualSense controller included. Ideal for two-player gaming.'
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
    image: '/images/products/smartphone.svg',
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
    image: '/images/products/smartphone.svg',
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
    image: '/images/products/smartphone.svg',
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
    image: '/images/products/smartphone.svg',
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
    image: '/images/products/smartphone.svg',
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
    image: '/images/products/smartphone.svg',
    description: {
      it: 'Samsung Galaxy S24 256GB, AMOLED 6.2", Galaxy AI, tripla fotocamera 50MP. Nuovo, sigillato.',
      fr: 'Samsung Galaxy S24 256 Go, AMOLED 6,2", Galaxy AI, triple capteur 50 Mpx. Neuf, scellé.',
      en: 'Samsung Galaxy S24 256GB, 6.2" AMOLED, Galaxy AI, 50MP triple camera. New, sealed.'
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
    image: '/images/products/tablet.svg',
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
    image: '/images/products/tablet.svg',
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
    image: '/images/products/tablet.svg',
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
    image: '/images/products/computer.svg',
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
    image: '/images/products/computer.svg',
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
    image: '/images/products/computer.svg',
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
    image: '/images/products/computer.svg',
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
    image: '/images/products/computer.svg',
    description: {
      it: 'HP Pavilion 15, Intel Core i5, 16GB RAM, SSD 512GB. Ideale per studio e ufficio.',
      fr: 'HP Pavilion 15, Intel Core i5, 16 Go de RAM, SSD 512 Go. Idéal pour les études et le bureau.',
      en: 'HP Pavilion 15, Intel Core i5, 16GB RAM, 512GB SSD. Ideal for study and office use.'
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
    image: '/images/products/frigo.svg',
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
    image: '/images/products/frigo.svg',
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
    image: '/images/products/frigo.svg',
    description: {
      it: 'Mini frigorifero Whirlpool 95L, ideale per camera, ufficio o monolocale. Compatto e silenzioso.',
      fr: 'Mini réfrigérateur Whirlpool 95L, idéal pour chambre, bureau ou studio. Compact et silencieux.',
      en: 'Whirlpool 95L mini fridge, ideal for bedroom, office or studio. Compact and quiet.'
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
    image: '/images/products/riscaldamento.svg',
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
    image: '/images/products/riscaldamento.svg',
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
    image: '/images/products/riscaldamento.svg',
    description: {
      it: 'Pannello a infrarossi 600W da parete, riscaldamento uniforme e silenzioso, consumo energetico ridotto.',
      fr: 'Panneau radiant infrarouge 600W mural, chaleur homogène et silencieuse, consommation réduite.',
      en: '600W wall-mounted infrared panel, even and silent heat, reduced energy consumption.'
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
    image: '/images/products/aspirapolvere.svg',
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
    image: '/images/products/aspirapolvere.svg',
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
    image: '/images/products/aspirapolvere.svg',
    description: {
      it: 'Aspirapolvere a traino Bosch 700W con sacco, filtro Hepa e ampia capacità per uso domestico quotidiano.',
      fr: 'Aspirateur traîneau Bosch 700W avec sac, filtre HEPA et grande capacité pour un usage domestique quotidien.',
      en: 'Bosch 700W bagged canister vacuum, HEPA filter and large capacity for everyday home use.'
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
    image: '/images/products/forno.svg',
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
    image: '/images/products/forno.svg',
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
    image: '/images/products/forno.svg',
    description: {
      it: "Fornetto elettrico De'Longhi 45L ventilato, ideale come alternativa compatta al forno tradizionale.",
      fr: "Mini-four électrique ventilé De'Longhi 45L, idéal comme alternative compacte au four traditionnel.",
      en: "De'Longhi 45L convection mini-oven, ideal as a compact alternative to a traditional oven."
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
