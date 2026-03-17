// Structure de données enrichie pour Monster Phone Boutique
// Données importées depuis Supabase
// Last updated: 2025-11-05T16:12:09.104Z

export interface ProductVariant {
  id?: string;
  color: string;
  colorCode: string;
  ean: string;
  stock: number;
  images?: string[];
  is_default?: boolean;
  adminDiscountPercent?: number;
  capacity?: string | null;
  size?: string | null;
}

export interface ProductSpecification {
  label: string;
  value: string;
  icon?: string;
}

export interface ProductRating {
  average: number;
  count: number;
  distribution?: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  reviews?: Review[];
}

export interface Review {
  id?: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  title?: string;
  helpful?: number;
}

export interface Product {
  // Identifiers
  id: string;
  airtableId: string;
  sku: string;

  // Basic info
  name: string;
  urlSlug: string;
  shortDescription: string;
  fullDescription: string;

  // Pricing
  basePrice: number;
  originalPrice?: number;
  discountPercent: number;

  // Brand & Category
  brandId: string;
  brandName: string;
  brandSlug: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  subcategory?: string;

  // Features
  features: string[];
  specifications: ProductSpecification[];

  // Compliance
  repairabilityIndex?: number;
  d3e?: number;
  dasHead?: string;
  dasBody?: string;
  dasLimb?: string;
  energyClass?: string;

  // Meta
  tags: string[];
  isFeatured: boolean;
  isNewArrival: boolean;
  showOnHomepage: boolean;
  status: string;

  // Variants
  variants: ProductVariant[];

  // Rating
  rating: ProductRating;
}

export const PRODUCTS: Product[] = [
  {
    "id": "b5098e5a-102f-4513-bfa6-67f0e414f7d3",
    "airtableId": "b5098e5a-102f-4513-bfa6-67f0e414f7d3",
    "sku": "SKU-0006",
    "name": "APPAREIL PHOTO ENFANT MUVIT KIDPIC",
    "urlSlug": "appareil-photo-enfant-muvit-kidpic",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">APPAREIL PHOTO ENFANT MUVIT KIDPIC</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "5b8a13ee-afad-4e68-b2c0-5d7922d91f5d",
    "brandName": "MUVIT",
    "brandSlug": "muvit",
    "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
    "categoryName": "Accessoires",
    "categorySlug": "accessoires",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "1e2dfe1f-e2c4-401c-b63a-ca890fde22a8",
        "color": "Bleu",
        "colorCode": "#0066CC",
        "ean": "3663111187236",
        "stock": 38,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "55fd947e-5d28-433d-b159-aa8c8b4b8a0e",
        "color": "Rose",
        "colorCode": "#FFB6C1",
        "ean": "3663111187243",
        "stock": 38,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "7f8ee2dc-1087-4400-839b-f0e1938b0978",
    "airtableId": "7f8ee2dc-1087-4400-839b-f0e1938b0978",
    "sku": "SKU-0033",
    "name": "CABLE LUMINEUX MY WAY USB A - LIGHTNING",
    "urlSlug": "cable-lumineux-my-way-usb-a-lightning",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">CABLE LUMINEUX MY WAY USB A - LIGHTNING</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    "brandName": "MY WAY",
    "brandSlug": "my-way",
    "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
    "categoryName": "Accessoires",
    "categorySlug": "accessoires",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "13d23493-0f8e-4666-b3e1-418a8a430e1c",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "3663111196245",
        "stock": 93,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "df1b8b78-3561-4475-a7f2-0778b9614877",
    "airtableId": "df1b8b78-3561-4475-a7f2-0778b9614877",
    "sku": "SKU-0031",
    "name": "CABLE LUMINEUX MY WAY USB A - USB C",
    "urlSlug": "cable-lumineux-my-way-usb-a-usb-c",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">CABLE LUMINEUX MY WAY USB A - USB C</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    "brandName": "MY WAY",
    "brandSlug": "my-way",
    "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
    "categoryName": "Accessoires",
    "categorySlug": "accessoires",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "dc46dddf-a7de-4e14-9b83-4f1fd3fb62b6",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "3663111196221",
        "stock": 190,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "2123d911-2452-43ab-a89e-4aa0cfb56d23",
    "airtableId": "2123d911-2452-43ab-a89e-4aa0cfb56d23",
    "sku": "SKU-0034",
    "name": "CABLE LUMINEUX MY WAY USB C - LIGHTNING",
    "urlSlug": "cable-lumineux-my-way-usb-c-lightning",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">CABLE LUMINEUX MY WAY USB C - LIGHTNING</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    "brandName": "MY WAY",
    "brandSlug": "my-way",
    "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
    "categoryName": "Accessoires",
    "categorySlug": "accessoires",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "be16414c-07d3-4044-bb44-2c2f20628bba",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "3663111196252",
        "stock": 200,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "5fd029f5-c0fa-4f23-88a5-bd0b1811de21",
    "airtableId": "5fd029f5-c0fa-4f23-88a5-bd0b1811de21",
    "sku": "SKU-0032",
    "name": "CABLE LUMINEUX MY WAY USB C - USB C",
    "urlSlug": "cable-lumineux-my-way-usb-c-usb-c",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">CABLE LUMINEUX MY WAY USB C - USB C</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    "brandName": "MY WAY",
    "brandSlug": "my-way",
    "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
    "categoryName": "Accessoires",
    "categorySlug": "accessoires",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "3ed3d5ed-0d37-49c0-8d8d-08866f87817f",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "3663111196238",
        "stock": 164,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "26f75f19-cf80-451b-8b9c-5819ab452170",
    "airtableId": "26f75f19-cf80-451b-8b9c-5819ab452170",
    "sku": "SKU-0035",
    "name": "CABLE RETRACTABLE MY WAY USB C 3 EN 1 100 W",
    "urlSlug": "cable-retractable-my-way-usb-c-3-en-1-100-w",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">CABLE RETRACTABLE MY WAY USB C 3 EN 1 100 W</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    "brandName": "MY WAY",
    "brandSlug": "my-way",
    "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
    "categoryName": "Accessoires",
    "categorySlug": "accessoires",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "ebdd3228-50c5-4648-960c-a591e5b88eef",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "3663111196269",
        "stock": 91,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "755b5dac-d6f5-493d-a4a0-5d641646c1d9",
    "airtableId": "755b5dac-d6f5-493d-a4a0-5d641646c1d9",
    "sku": "SKU-0037",
    "name": "CABLE TIGER POWER LITE 6 EN 1 AVEC APPLE WATCH",
    "urlSlug": "cable-tiger-power-lite-6-en-1-avec-apple-watch",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">CABLE TIGER POWER LITE 6 EN 1 AVEC APPLE WATCH</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "bfada6a7-6a64-4429-b6c5-90b518ad6345",
    "brandName": "TIGER POWER",
    "brandSlug": "tiger-power",
    "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
    "categoryName": "Accessoires",
    "categorySlug": "accessoires",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "e91bb55f-5d17-4467-ae3c-63f1795e9ba7",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "3663111196283",
        "stock": 96,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "ba16c6f3-0202-4145-b19d-014193946151",
    "airtableId": "ba16c6f3-0202-4145-b19d-014193946151",
    "sku": "SKU-0105",
    "name": "CASQUE ANC HIFUTURE TOUR",
    "urlSlug": "casque-anc-hifuture-tour",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">CASQUE ANC HIFUTURE TOUR</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "df838c5b-9d71-4fb0-a993-0e4d854a349d",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6972576181350",
        "stock": 109,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "08e2329b-a0aa-464d-9a63-5313c150689f",
    "airtableId": "08e2329b-a0aa-464d-9a63-5313c150689f",
    "sku": "SKU-0107",
    "name": "CASQUE ANC HIFUTURE TOUR X",
    "urlSlug": "casque-anc-hifuture-tour-x",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">CASQUE ANC HIFUTURE TOUR X</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "bf00b274-2f83-4ed8-b6e6-d2416862be16",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6972576182203",
        "stock": 30,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "1d8892c5-373f-4134-8039-9600d6485ce5",
    "airtableId": "1d8892c5-373f-4134-8039-9600d6485ce5",
    "sku": "SKU-0106",
    "name": "CASQUE ANC HIFUTURE TOUR X CHAMPAGNE",
    "urlSlug": "casque-anc-hifuture-tour-x-champagne",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">CASQUE ANC HIFUTURE TOUR X CHAMPAGNE</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "ade8646f-55ec-4607-bbc9-374b2b26e40f",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "6972576182210",
        "stock": 31,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "c638fb0f-d76e-4ea9-b7b8-6a06e2719635",
    "airtableId": "c638fb0f-d76e-4ea9-b7b8-6a06e2719635",
    "sku": "SKU-0039",
    "name": "CASQUE SANS FILS ENFANTS MUVIT CHAT",
    "urlSlug": "casque-sans-fils-enfants-muvit-chat",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">CASQUE SANS FILS ENFANTS MUVIT CHAT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "5b8a13ee-afad-4e68-b2c0-5d7922d91f5d",
    "brandName": "MUVIT",
    "brandSlug": "muvit",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "3885306b-f0b3-4e24-8107-9d3d2a58e334",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "3663111190502",
        "stock": 19,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "5dc8b4ed-d8b9-4b32-8a97-4ec4586365f9",
    "airtableId": "5dc8b4ed-d8b9-4b32-8a97-4ec4586365f9",
    "sku": "SKU-0043",
    "name": "CASQUE SANS FILS ENFANTS MUVIT DRAGON",
    "urlSlug": "casque-sans-fils-enfants-muvit-dragon",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">CASQUE SANS FILS ENFANTS MUVIT DRAGON</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "5b8a13ee-afad-4e68-b2c0-5d7922d91f5d",
    "brandName": "MUVIT",
    "brandSlug": "muvit",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "080746c7-e6a5-40f0-8fa6-a42a5e8dbf18",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "3663111190519",
        "stock": 22,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "b225215a-2a00-4ad6-90f9-4324ca0da5e7",
    "airtableId": "b225215a-2a00-4ad6-90f9-4324ca0da5e7",
    "sku": "SKU-0040",
    "name": "CASQUE SANS FILS ENFANTS MUVIT LAPIN",
    "urlSlug": "casque-sans-fils-enfants-muvit-lapin",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">CASQUE SANS FILS ENFANTS MUVIT LAPIN</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "5b8a13ee-afad-4e68-b2c0-5d7922d91f5d",
    "brandName": "MUVIT",
    "brandSlug": "muvit",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "2376189d-310b-48e0-9fce-18d3837c15ec",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "3663111190496",
        "stock": 24,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "4e50a127-d108-4040-ac1c-88db7f3938ee",
    "airtableId": "4e50a127-d108-4040-ac1c-88db7f3938ee",
    "sku": "SKU-0042",
    "name": "CASQUE SANS FILS ENFANTS MUVIT LICNE",
    "urlSlug": "casque-sans-fils-enfants-muvit-licne",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">CASQUE SANS FILS ENFANTS MUVIT LICNE</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "5b8a13ee-afad-4e68-b2c0-5d7922d91f5d",
    "brandName": "MUVIT",
    "brandSlug": "muvit",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "4822a804-a7c8-4b2a-bace-64ce6ccee164",
        "color": "Or",
        "colorCode": "#FFD700",
        "ean": "3663111190472",
        "stock": 15,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "3a7d779f-2b12-45bd-8d40-47a7c2c26755",
    "airtableId": "3a7d779f-2b12-45bd-8d40-47a7c2c26755",
    "sku": "SKU-0041",
    "name": "CASQUE SANS FILS ENFANTS MUVIT PIKA",
    "urlSlug": "casque-sans-fils-enfants-muvit-pika",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">CASQUE SANS FILS ENFANTS MUVIT PIKA</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "5b8a13ee-afad-4e68-b2c0-5d7922d91f5d",
    "brandName": "MUVIT",
    "brandSlug": "muvit",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "939ff8e1-4211-4ab6-9566-257e6795b841",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "3663111190489",
        "stock": 21,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "918ed2b9-ffdc-4c55-97b3-9ed4863028fb",
    "airtableId": "918ed2b9-ffdc-4c55-97b3-9ed4863028fb",
    "sku": "SKU-0036",
    "name": "CHARGEUR SANS FILS MY WAY 15W MAGSAFE DONUTS",
    "urlSlug": "chargeur-sans-fils-my-way-15w-magsafe-donuts",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">CHARGEUR SANS FILS MY WAY 15W MAGSAFE DONUTS</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    "brandName": "MY WAY",
    "brandSlug": "my-way",
    "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
    "categoryName": "Accessoires",
    "categorySlug": "accessoires",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "b6199e62-aec2-4ec7-844d-cee77d8f9642",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "3663111183221",
        "stock": 45,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "06d52792-8ce1-4923-b51a-050a96e0b4d9",
    "airtableId": "06d52792-8ce1-4923-b51a-050a96e0b4d9",
    "sku": "SKU-0017",
    "name": "ECOUTEUR CONDUCTION A AIR MATE",
    "urlSlug": "ecouteur-conduction-a-air-mate",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">ECOUTEUR CONDUCTION A AIR MATE</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "6dd8d72e-93d7-432a-9079-e458bd19d2dc",
    "brandName": "Autre",
    "brandSlug": "autre",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "4646d4e2-83de-49c9-9558-aab02f1600c3",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6972576180933",
        "stock": 70,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "0c17e4c1-261b-4432-a116-baf13369fb34",
        "color": "Gris",
        "colorCode": "#808080",
        "ean": "6972576180940",
        "stock": 72,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "b95adcd9-1c3a-434f-9666-26948229f288",
    "airtableId": "b95adcd9-1c3a-434f-9666-26948229f288",
    "sku": "SKU-0110",
    "name": "ECOUTEUR FILLAIRE HIFUTURE HI5 CHAMPAGNE",
    "urlSlug": "ecouteur-fillaire-hifuture-hi5-champagne",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">ECOUTEUR FILLAIRE HIFUTURE HI5 CHAMPAGNE</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "c7732fda-5a87-4087-965a-e1c73d1b8c24",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "6972576181626",
        "stock": 61,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "0d34db80-54b3-4d89-b278-776d8410b1a4",
    "airtableId": "0d34db80-54b3-4d89-b278-776d8410b1a4",
    "sku": "SKU-0112",
    "name": "ECOUTEUR HIFUTURE FLYBUDS 4 ANC",
    "urlSlug": "ecouteur-hifuture-flybuds-4-anc",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">ECOUTEUR HIFUTURE FLYBUDS 4 ANC</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "50c22422-ccb5-4fe0-91e7-54ab065b5c12",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6972576182265",
        "stock": 19,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "32ebff2d-7294-4cdf-9433-05400fa6a8dc",
    "airtableId": "32ebff2d-7294-4cdf-9433-05400fa6a8dc",
    "sku": "SKU-0114",
    "name": "ECOUTEUR HIFUTURE FLYBUDS 4 ANC BEIGE",
    "urlSlug": "ecouteur-hifuture-flybuds-4-anc-beige",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">ECOUTEUR HIFUTURE FLYBUDS 4 ANC BEIGE</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "70329885-4819-4a19-b076-189812bfb642",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "6972576182296",
        "stock": 22,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "7697ad3d-044e-4b0c-b6f6-31231d3e1f5c",
    "airtableId": "7697ad3d-044e-4b0c-b6f6-31231d3e1f5c",
    "sku": "SKU-0113",
    "name": "ECOUTEUR HIFUTURE FLYBUDS 4 ANC CHAUD",
    "urlSlug": "ecouteur-hifuture-flybuds-4-anc-chaud",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">ECOUTEUR HIFUTURE FLYBUDS 4 ANC CHAUD</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "5b9af5fd-a66a-4fda-8092-d8bea7cbb6c0",
        "color": "Rose",
        "colorCode": "#FFB6C1",
        "ean": "6972576182289",
        "stock": 20,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "51390bc6-39ca-4689-8e0e-028b8643bf7e",
    "airtableId": "51390bc6-39ca-4689-8e0e-028b8643bf7e",
    "sku": "SKU-0018",
    "name": "ECOUTEUR HIFUTURE OLYMBUDS 3",
    "urlSlug": "ecouteur-hifuture-olymbuds-3",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">ECOUTEUR HIFUTURE OLYMBUDS 3</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "37aebdf5-f0be-4da1-b5e5-68c3caf1144e",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6872576181688",
        "stock": 64,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "f5a16fe9-11cd-4df6-8b31-446450b1e1b1",
        "color": "Blanc",
        "colorCode": "#FFFFFF",
        "ean": "6972576181695",
        "stock": 94,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "036a947b-aeff-4d2a-bdf8-924f2fb49c10",
    "airtableId": "036a947b-aeff-4d2a-bdf8-924f2fb49c10",
    "sku": "SKU-0019",
    "name": "ECOUTEUR HIFUTURE SONIC AIR",
    "urlSlug": "ecouteur-hifuture-sonic-air",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">ECOUTEUR HIFUTURE SONIC AIR</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "078f2a3c-dfca-40a9-862b-3bbc35bdc761",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6972576181657",
        "stock": 101,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "ed119d4e-678a-4e86-9016-32178d09aab0",
        "color": "Blanc",
        "colorCode": "#FFFFFF",
        "ean": "6972576181664",
        "stock": 108,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "d239f800-ae04-43bb-ae85-4db0ed7d4b61",
    "airtableId": "d239f800-ae04-43bb-ae85-4db0ed7d4b61",
    "sku": "SKU-0111",
    "name": "ECOUTEUR HIFUTURE SONIC AIR CHAMPAGNE",
    "urlSlug": "ecouteur-hifuture-sonic-air-champagne",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">ECOUTEUR HIFUTURE SONIC AIR CHAMPAGNE</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "568b704c-f12e-411a-a8e4-064530c89b36",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "6972576181671",
        "stock": 100,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "6474330f-1333-48a2-bf66-8cb4c4840b85",
    "airtableId": "6474330f-1333-48a2-bf66-8cb4c4840b85",
    "sku": "SKU-0108",
    "name": "ECOUTEUR HIFUTURE SONIFY",
    "urlSlug": "ecouteur-hifuture-sonify",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">ECOUTEUR HIFUTURE SONIFY</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "dc93dc44-2171-4dc9-81b3-e9ee2f88df10",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6972576182067",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "9bd77389-6e2a-4667-88cd-5528f1a0cd53",
    "airtableId": "9bd77389-6e2a-4667-88cd-5528f1a0cd53",
    "sku": "SKU-0109",
    "name": "ECOUTEUR HIFUTURE SONIFY CHAMPAGNE",
    "urlSlug": "ecouteur-hifuture-sonify-champagne",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">ECOUTEUR HIFUTURE SONIFY CHAMPAGNE</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "18b58c89-dfc5-4b3d-819a-11d9e6a125b3",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "6972576182074",
        "stock": 18,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "4bccfd96-5ac1-45f9-8f05-a7a181cb106c",
    "airtableId": "4bccfd96-5ac1-45f9-8f05-a7a181cb106c",
    "sku": "SKU-0020",
    "name": "ECOUTEUR HIFUTURE YACHT",
    "urlSlug": "ecouteur-hifuture-yacht",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">ECOUTEUR HIFUTURE YACHT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "87c3f2cc-dc13-4ccc-bda2-491816513803",
        "color": "Rose",
        "colorCode": "#FFB6C1",
        "ean": "6972576181381",
        "stock": 8,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "af74d6bd-4c27-4c04-9954-59cbe9557a0d",
        "color": "Black",
        "colorCode": "#000000",
        "ean": "6972576181367",
        "stock": 9,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "bb07c193-4b0e-4d52-a356-f4698bee12f4",
    "airtableId": "bb07c193-4b0e-4d52-a356-f4698bee12f4",
    "sku": "SKU-0115",
    "name": "ECOUTEUR HIFUTURE YACHT GOLD",
    "urlSlug": "ecouteur-hifuture-yacht-gold",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">ECOUTEUR HIFUTURE YACHT GOLD</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "fc6d7ea2-5a6c-45f4-835d-3140a40362cb",
        "color": "Black",
        "colorCode": "#000000",
        "ean": "6972576181374",
        "stock": 3,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "f7752632-a185-43ab-8eb7-1a19b13085df",
    "airtableId": "f7752632-a185-43ab-8eb7-1a19b13085df",
    "sku": "SKU-0021",
    "name": "ENCEINTE HIFUTURE ALTUS",
    "urlSlug": "enceinte-hifuture-altus",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">ENCEINTE HIFUTURE ALTUS</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "6985070e-4f7c-4f1b-81c0-6eee565cc578",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6972576181312",
        "stock": 30,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "1ed62a9a-2b40-4219-a44d-4783e124b367",
        "color": "Rouge",
        "colorCode": "#DC2626",
        "ean": "6972576181336",
        "stock": 10,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "10c256b1-8f53-4364-b551-fbb1f7634e1b",
        "color": "Bleu",
        "colorCode": "#0066CC",
        "ean": "6972576181329",
        "stock": 5,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "1abc1cf2-f77a-4630-bb49-1bef7017c248",
    "airtableId": "1abc1cf2-f77a-4630-bb49-1bef7017c248",
    "sku": "SKU-0116",
    "name": "ENCEINTE HIFUTURE ALTUS CAMO",
    "urlSlug": "enceinte-hifuture-altus-camo",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">ENCEINTE HIFUTURE ALTUS CAMO</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "34d5248e-3d34-4873-a39a-388862543723",
        "color": "Vert",
        "colorCode": "#00AA44",
        "ean": "6972576181510",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "2bcc6ff3-9d0d-42a3-9b9e-e4f78bb0d467",
    "airtableId": "2bcc6ff3-9d0d-42a3-9b9e-e4f78bb0d467",
    "sku": "SKU-0022",
    "name": "ENCEINTE HIFUTURE ASCENDO",
    "urlSlug": "enceinte-hifuture-ascendo",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">ENCEINTE HIFUTURE ASCENDO</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "658fd18a-f1f3-4410-aab3-049380a5d248",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6972576181565",
        "stock": 21,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "47738821-c0a2-402c-bcb3-491a8ba46311",
        "color": "Rose",
        "colorCode": "#FFB6C1",
        "ean": "6972576182128",
        "stock": 26,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "f493ba5e-24ac-498c-baec-1bf19523fc08",
    "airtableId": "f493ba5e-24ac-498c-baec-1bf19523fc08",
    "sku": "SKU-0024",
    "name": "ENCEINTE HIFUTURE GRAVITY",
    "urlSlug": "enceinte-hifuture-gravity",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">ENCEINTE HIFUTURE GRAVITY</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "b46feecd-a589-4b78-aed2-677bbe3c33df",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6972576181121",
        "stock": 23,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "c5bb5aaf-1786-467b-897e-2cf3add552a7",
        "color": "Bleu",
        "colorCode": "#0066CC",
        "ean": "6972576181138",
        "stock": 15,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "e48ee6c7-d122-4ce3-a1bb-a72a6c588b5b",
    "airtableId": "e48ee6c7-d122-4ce3-a1bb-a72a6c588b5b",
    "sku": "SKU-0023",
    "name": "ENCEINTE HIFUTURE RIPPLE",
    "urlSlug": "enceinte-hifuture-ripple",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">ENCEINTE HIFUTURE RIPPLE</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "73367b40-8f8a-4d72-8251-2c74fa2a2157",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6972576181039",
        "stock": 9,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "2563e056-12eb-4a3c-914e-1a8eb78c9b52",
        "color": "Rouge",
        "colorCode": "#DC2626",
        "ean": "6972576181046",
        "stock": 11,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "83fcdaad-7a99-4744-b96d-7e839893c904",
        "color": "Bleu",
        "colorCode": "#0066CC",
        "ean": "6972576181053",
        "stock": 3,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "f6026bd6-292f-4686-a797-d36baad20554",
    "airtableId": "f6026bd6-292f-4686-a797-d36baad20554",
    "sku": "SKU-0104",
    "name": "HIFUTURE MONTRE ACTIVE",
    "urlSlug": "hifuture-montre-active",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">HIFUTURE MONTRE ACTIVE</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "77722b9f-d9b9-42b8-a9a4-8b98a8cdd6ad",
        "color": "Silver",
        "colorCode": "#C0C0C0",
        "ean": "6972576182012",
        "stock": 20,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "16985cbe-f388-4920-bf4c-8c37f202e282",
    "airtableId": "16985cbe-f388-4920-bf4c-8c37f202e282",
    "sku": "SKU-0103",
    "name": "HIFUTURE MONTRE ACTIVE + RED",
    "urlSlug": "hifuture-montre-active-red",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">HIFUTURE MONTRE ACTIVE + RED</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "8e978b75-7735-4e45-9fa8-b5d3e0608817",
        "color": "Black",
        "colorCode": "#000000",
        "ean": "6972576181992",
        "stock": 18,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "c177d59c-dcf1-43a9-919f-a819e314096b",
    "airtableId": "c177d59c-dcf1-43a9-919f-a819e314096b",
    "sku": "SKU-0088",
    "name": "HIFUTURE MONTRE EVO 2",
    "urlSlug": "hifuture-montre-evo-2",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">HIFUTURE MONTRE EVO 2</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "c7b9382f-10f0-46b3-8fbf-c6c3bdcad389",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6972576181701",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "a89c9034-00c2-4753-bb22-a5c5c9ae2735",
    "airtableId": "a89c9034-00c2-4753-bb22-a5c5c9ae2735",
    "sku": "SKU-0089",
    "name": "HIFUTURE MONTRE EVO 2 BEIGE",
    "urlSlug": "hifuture-montre-evo-2-beige",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">HIFUTURE MONTRE EVO 2 BEIGE</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "49bbe2f4-fec1-4406-8e4d-e9af399fdee5",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "6972576181725",
        "stock": 87,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "09753cf3-aa5e-4157-ac81-fcf598bd09f0",
    "airtableId": "09753cf3-aa5e-4157-ac81-fcf598bd09f0",
    "sku": "SKU-0090",
    "name": "HIFUTURE MONTRE EVO 2 GOLD",
    "urlSlug": "hifuture-montre-evo-2-gold",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">HIFUTURE MONTRE EVO 2 GOLD</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "6346bea4-94b0-421a-8338-4a2644e55ef6",
        "color": "Rose",
        "colorCode": "#FFB6C1",
        "ean": "6972576181718",
        "stock": 45,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "ed0af51a-a47d-4d8e-a0b2-a13c4209d4e7",
    "airtableId": "ed0af51a-a47d-4d8e-a0b2-a13c4209d4e7",
    "sku": "SKU-0026",
    "name": "HONOR PAD 9 WIFI 8+",
    "urlSlug": "hon-pad-9-wifi-8",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">HON PAD 9 WIFI 8+</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "0787543a-2ab3-4c65-850d-9abb59ca4d4c",
    "brandName": "HONOR",
    "brandSlug": "honor",
    "categoryId": "d5a2e3f4-9b8c-4d7e-8f1a-2b3c4d5e6f7a",
    "categoryName": "Tablettes",
    "categorySlug": "tablettes",
    "features": [],
    "specifications": [],
    "repairabilityIndex": 8.3,
    "dasHead": "NC",
    "dasBody": "1,09 W/kg",
    "dasLimb": "2,50 W/kg",
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "b2625324-a25b-4dfe-9c6b-d13140abec65",
        "color": "Or",
        "colorCode": "#FFD700",
        "ean": "6936520834839",
        "stock": 15,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": "8/256",
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "a0ecbdab-2fc8-4a45-95ef-8914a7647b2e",
    "airtableId": "a0ecbdab-2fc8-4a45-95ef-8914a7647b2e",
    "sku": "SKU-0001",
    "name": "HONOR X5B 4+",
    "urlSlug": "honor-x5b-4",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">HONOR X5B 4+</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "0787543a-2ab3-4c65-850d-9abb59ca4d4c",
    "brandName": "HONOR",
    "brandSlug": "honor",
    "categoryId": "80194285-ea90-40ff-8e2a-8edbe3609330",
    "categoryName": "Smartphones",
    "categorySlug": "smartphones",
    "features": [],
    "specifications": [],
    "repairabilityIndex": 8.1,
    "dasHead": "1,04 W/kg",
    "dasBody": "1,00 W/kg",
    "dasLimb": "NC",
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "9f12ff7f-79be-4a53-b711-c1bd7f1b73c5",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6936520854851",
        "stock": 91,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": "4/64",
        "size": null
      },
      {
        "id": "8843deeb-91f8-4590-a075-d71739f7c0ca",
        "color": "Bleu",
        "colorCode": "#0066CC",
        "ean": "6936520854868",
        "stock": 109,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": "4/64",
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "6a5acd4b-798c-4ce9-b437-bce52bb24c50",
    "airtableId": "6a5acd4b-798c-4ce9-b437-bce52bb24c50",
    "sku": "SKU-0002",
    "name": "HONOR X6C 6+",
    "urlSlug": "honor-x6c-6",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">HONOR X6C 6+</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "0787543a-2ab3-4c65-850d-9abb59ca4d4c",
    "brandName": "HONOR",
    "brandSlug": "honor",
    "categoryId": "80194285-ea90-40ff-8e2a-8edbe3609330",
    "categoryName": "Smartphones",
    "categorySlug": "smartphones",
    "features": [],
    "specifications": [],
    "repairabilityIndex": 8.1,
    "dasHead": "0,76 W/kg",
    "dasBody": "1,19 W/kg",
    "dasLimb": "2,66 W/kg",
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "dc1c5207-e326-4db0-b413-84bb9f2de258",
        "color": "Bleu",
        "colorCode": "#0066CC",
        "ean": "6936520869527",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": "6/128",
        "size": null
      },
      {
        "id": "16fa48c7-1d84-47b3-af7b-ba41d5ce489b",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6936520869510",
        "stock": 0,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": "6/128",
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "db8252d6-25a9-4795-994d-55302668136c",
    "airtableId": "db8252d6-25a9-4795-994d-55302668136c",
    "sku": "SKU-0003",
    "name": "HONOR X7C 8+",
    "urlSlug": "honor-x7c-8",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">HONOR X7C 8+</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "0787543a-2ab3-4c65-850d-9abb59ca4d4c",
    "brandName": "HONOR",
    "brandSlug": "honor",
    "categoryId": "80194285-ea90-40ff-8e2a-8edbe3609330",
    "categoryName": "Smartphones",
    "categorySlug": "smartphones",
    "features": [],
    "specifications": [],
    "repairabilityIndex": 8.1,
    "dasHead": "0,77 W/kg",
    "dasBody": "1,05 W/kg",
    "dasLimb": "2,55 W/kg",
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "8782a7b1-650a-4b35-a415-02755ca000c8",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6936520854738",
        "stock": 29,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": "6/256",
        "size": null
      },
      {
        "id": "7b1d3c8b-83f8-4cbf-9379-f9033e6a3756",
        "color": "Vert",
        "colorCode": "#00AA44",
        "ean": "6936520854721",
        "stock": 35,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": "6/256",
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "367e7c23-13bf-4190-bf27-000a2207b3c8",
    "airtableId": "367e7c23-13bf-4190-bf27-000a2207b3c8",
    "sku": "SKU-0025",
    "name": "HONOR X9C 12+",
    "urlSlug": "honor-x9c-12",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">HONOR X9C 12+</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "0787543a-2ab3-4c65-850d-9abb59ca4d4c",
    "brandName": "HONOR",
    "brandSlug": "honor",
    "categoryId": "80194285-ea90-40ff-8e2a-8edbe3609330",
    "categoryName": "Smartphones",
    "categorySlug": "smartphones",
    "features": [],
    "specifications": [],
    "repairabilityIndex": 8,
    "dasHead": "0,82 W/kg",
    "dasBody": "1,27 W/kg",
    "dasLimb": "2,81 W/kg",
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "eea7539f-4051-451c-93f7-9b92cad2b99e",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6936520857951",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": "8/256",
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "1ec88882-d40d-4796-ba9e-3e0291e37c43",
    "airtableId": "1ec88882-d40d-4796-ba9e-3e0291e37c43",
    "sku": "SKU-0048",
    "name": "MONSTER BLASTER MICRO",
    "urlSlug": "monster-blaster-micro",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER BLASTER MICRO</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "cc1c8d71-63ff-483d-af11-d90647ec1c81",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "0810079706099",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "1067b02a-d934-46ea-a3b3-faec42891b55",
    "airtableId": "1067b02a-d934-46ea-a3b3-faec42891b55",
    "sku": "SKU-0059",
    "name": "MONSTER CABLE ESSENTIAL FIBRE OPTIQUE 1M5",
    "urlSlug": "monster-cable-essential-fibre-optique-1m5",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER CABLE ESSENTIAL FIBRE OPTIQUE 1M5</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
    "categoryName": "Accessoires",
    "categorySlug": "accessoires",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "7c45091f-5db3-43f3-aee9-ad94ff804a0f",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0850015401039",
        "stock": 0,
        "is_default": true,
        "images": [
          "MONSTER_CABLE_ESSENTIAL_FIBRE_OPTIQUE_1M5_2_ryuxc9",
          "MONSTER_CABLE_ESSENTIAL_FIBRE_OPTIQUE_1M5.jpg_1_idcxth",
          "MONSTER_CABLE_ESSENTIAL_FIBRE_OPTIQUE_1M5.jpg_2_b3mszt",
          "MONSTER_CABLE_ESSENTIAL_FIBRE_OPTIQUE_1M5.jpg_3_vhqgkz"
        ],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "ff1b7fba-cf66-4fbd-9044-5155d12d86a1",
    "airtableId": "ff1b7fba-cf66-4fbd-9044-5155d12d86a1",
    "sku": "SKU-0060",
    "name": "MONSTER CABLE ESSENTIAL FIBRE OPTIQUE 3M",
    "urlSlug": "monster-cable-essential-fibre-optique-3m",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER CABLE ESSENTIAL FIBRE OPTIQUE 3M</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
    "categoryName": "Accessoires",
    "categorySlug": "accessoires",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "aa963fc8-1c88-4190-91fc-d1c9fe23758d",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0850015401046",
        "stock": 0,
        "is_default": true,
        "images": [
          "MONSTER_CABLE_ESSENTIAL_FIBRE_OPTIQUE_3M_gdf8rs",
          "MONSTER_CABLE_ESSENTIAL_FIBRE_OPTIQUE_3M_1_ulb6y9",
          "MONSTER_CABLE_ESSENTIAL_FIBRE_OPTIQUE_3M_4_gvy2d8",
          "MONSTER_CABLE_ESSENTIAL_FIBRE_OPTIQUE_3M_6_x7tg4o"
        ],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "0cb4ab7a-5bdc-402e-bed4-eb45a7217a1b",
    "airtableId": "0cb4ab7a-5bdc-402e-bed4-eb45a7217a1b",
    "sku": "SKU-0056",
    "name": "MONSTER CABLE HDMI ESSENTIAL 4K 1M8",
    "urlSlug": "monster-cable-hdmi-essential-4k-1m8",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER CABLE HDMI ESSENTIAL 4K 1M8</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
    "categoryName": "Accessoires",
    "categorySlug": "accessoires",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "c2cd0f51-e79d-4596-8a65-155b80bb44e2",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0741835115131",
        "stock": 149,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "4f1b1794-a379-4047-9199-a4aa42b6007a",
    "airtableId": "4f1b1794-a379-4047-9199-a4aa42b6007a",
    "sku": "SKU-0057",
    "name": "MONSTER CABLE HDMI ESSENTIAL 4K 3M6",
    "urlSlug": "monster-cable-hdmi-essential-4k-3m6",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER CABLE HDMI ESSENTIAL 4K 3M6</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
    "categoryName": "Accessoires",
    "categorySlug": "accessoires",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "49acff9b-2580-468a-be0a-37a855c76792",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0741835115148",
        "stock": 19,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "631855e7-d479-46b1-bf61-9a43e6e9ec43",
    "airtableId": "631855e7-d479-46b1-bf61-9a43e6e9ec43",
    "sku": "SKU-0058",
    "name": "MONSTER CABLE HDMI ESSENTIAL 8K 1M8",
    "urlSlug": "monster-cable-hdmi-essential-8k-1m8",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER CABLE HDMI ESSENTIAL 8K 1M8</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
    "categoryName": "Accessoires",
    "categorySlug": "accessoires",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "add61b5a-c5b3-4bee-a893-10c355b78741",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0741835116626",
        "stock": 96,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "f27e6f61-52b2-4d8a-87ee-60720a516b4b",
    "airtableId": "f27e6f61-52b2-4d8a-87ee-60720a516b4b",
    "sku": "SKU-0061",
    "name": "MONSTER CABLE TYPE C VERS HDMI 4K 2M",
    "urlSlug": "monster-cable-type-c-vers-hdmi-4k-2m",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER CABLE TYPE C VERS HDMI 4K 2M</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
    "categoryName": "Accessoires",
    "categorySlug": "accessoires",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "8e06d987-03a7-4a2d-be26-d3afd93d8ce5",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0850015401374",
        "stock": 80,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "231bffb6-042c-4b17-8261-939e3547f962",
    "airtableId": "231bffb6-042c-4b17-8261-939e3547f962",
    "sku": "SKU-0046",
    "name": "MONSTER CASQUE HDTV",
    "urlSlug": "monster-casque-hdtv",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER CASQUE HDTV</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "9a5a1d50-0397-4f7d-a7ff-5fca310c3242",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0805106893651",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "851c111f-1d58-47df-9210-41c48894eb3e",
    "airtableId": "851c111f-1d58-47df-9210-41c48894eb3e",
    "sku": "SKU-0045",
    "name": "MONSTER CHAMPION AIRLINKS",
    "urlSlug": "monster-champion-airlinks",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER CHAMPION AIRLINKS</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "40f54c36-9f74-4a66-82e0-8bb7902edce9",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0850015401817",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "ca75406e-6ad8-41f3-919f-cee82c228a0d",
    "airtableId": "ca75406e-6ad8-41f3-919f-cee82c228a0d",
    "sku": "SKU-0047",
    "name": "CASQUE MONSTER ELEMENT AIR",
    "urlSlug": "monster-element-air",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">CASQUE MONSTER ELEMENT AIR</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "b6ae0ffe-3915-447f-b7e8-bbbc8977e860",
    "categoryName": "Casques",
    "categorySlug": "casques-audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "049a25b9-f030-48d8-968f-caea3ca4e075",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0810131220969",
        "stock": 35,
        "is_default": true,
        "images": [
          "MONSTER_ELEMENT_AIR_HT_2_gsvoh4",
          "MONSTER_ELEMENT_AIR_HT_1_eslx27",
          "MONSTER_ELEMENT_AIR_HT_u6wq95",
          "MONSTER_ELEMENT_AIR_HT_5_j3ca52"
        ],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "e509827c-6d1f-48a0-8d7f-24ed9191f558",
    "airtableId": "e509827c-6d1f-48a0-8d7f-24ed9191f558",
    "sku": "SKU-0049",
    "name": "MONSTER ENCEINTE CUBE 1",
    "urlSlug": "monster-enceinte-cube-1",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ENCEINTE CUBE 1</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "c7f504f7-7225-4b3e-9b88-7be11f689fd8",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "0810079705528",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "472286c0-f9ec-40e2-ba73-1a1db36137cb",
    "airtableId": "472286c0-f9ec-40e2-ba73-1a1db36137cb",
    "sku": "SKU-0052",
    "name": "MONSTER ENCEINTE PARTY BOX SPARKLE",
    "urlSlug": "monster-enceinte-party-box-sparkle",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ENCEINTE PARTY BOX SPARKLE</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "c49875cf-0997-47e0-8076-39bcbfd98fd7",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0810079707645",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "98cb7ff8-a2dc-4b2a-a7d9-97964f4b9db7",
    "airtableId": "98cb7ff8-a2dc-4b2a-a7d9-97964f4b9db7",
    "sku": "SKU-0053",
    "name": "MONSTER ENCEINTE PARTY MUSIC BOX GO + 2 MICRO",
    "urlSlug": "monster-enceinte-party-music-box-go-2-micro",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ENCEINTE PARTY MUSIC BOX GO + 2 MICRO</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "cacadeff-cbe2-40b3-ba9f-8750627c16c1",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0810079706518",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "97cf96cc-8530-4ebf-b831-429c8f3a6b41",
    "airtableId": "97cf96cc-8530-4ebf-b831-429c8f3a6b41",
    "sku": "SKU-0050",
    "name": "MONSTER ENCEINTE S150",
    "urlSlug": "monster-enceinte-s150",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ENCEINTE S150</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "87ef426b-10e1-47b1-acee-7762490a9477",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "0810079705764",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "12d08c29-0c3b-4f40-883b-68e0f7aa78fb",
    "airtableId": "12d08c29-0c3b-4f40-883b-68e0f7aa78fb",
    "sku": "SKU-0051",
    "name": "MONSTER ENCEINTE S150 PLUS",
    "urlSlug": "monster-enceinte-s150-plus",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ENCEINTE S150 PLUS</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "f304e7d3-81c2-4b7e-981f-8540c052f466",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "0810079705467",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "26a891a3-78b8-4f22-8301-1457492e3c0e",
    "airtableId": "26a891a3-78b8-4f22-8301-1457492e3c0e",
    "sku": "SKU-0054",
    "name": "MONSTER ENCEINTE TRAVELER",
    "urlSlug": "monster-enceinte-traveler",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ENCEINTE TRAVELER</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "21c45d53-e64c-4ab6-a533-f4e3f770d5c0",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0810079706860",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "a7e17ad9-b677-4c40-a2e7-52d6ef5cfd98",
    "airtableId": "a7e17ad9-b677-4c40-a2e7-52d6ef5cfd98",
    "sku": "SKU-0063",
    "name": "MONSTER ILLUMINESCENCE BASIC AMPOULE A19 NON-SMART",
    "urlSlug": "monster-illuminescence-basic-ampoule-a19-non-smart",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE BASIC AMPOULE A19 NON-SMART</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "4d0d123c-c630-42db-99ce-841637902cb0",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0805106893378",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "9e85c7d7-28d6-45fe-8a4c-68a80285793a",
    "airtableId": "9e85c7d7-28d6-45fe-8a4c-68a80285793a",
    "sku": "SKU-0068",
    "name": "MONSTER ILLUMINESCENCE BASIC LED LIGHT BAR PAIR RGB INT",
    "urlSlug": "monster-illuminescence-basic-led-light-bar-pair-rgb-int",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE BASIC LED LIGHT BAR PAIR RGB INT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "53c95697-a567-4688-b805-7955c4cd3fe5",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0805106897246",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "80bb3ed1-c923-4779-b8ec-187551e0c354",
    "airtableId": "80bb3ed1-c923-4779-b8ec-187551e0c354",
    "sku": "SKU-0072",
    "name": "MONSTER ILLUMINESCENCE BASIC LED TOUCH LIGHT X3 RGB INT",
    "urlSlug": "monster-illuminescence-basic-led-touch-light-x3-rgb-int",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE BASIC LED TOUCH LIGHT X3 RGB INT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "ca5c12e7-461d-48ab-bdf8-41faf39769a8",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0805106897253",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "cce69460-6308-427a-9496-94fc58d3f339",
    "airtableId": "cce69460-6308-427a-9496-94fc58d3f339",
    "sku": "SKU-0081",
    "name": "MONSTER ILLUMINESCENCE BASIC LIGHT STRIP 2X 5M RGB+W SOUND REACTIVE INT",
    "urlSlug": "monster-illuminescence-basic-light-strip-2x-5m-rgbw-sound-reactive-int",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE BASIC LIGHT STRIP 2X 5M RGB+W SOUND REACTIVE INT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "721ad0a0-839e-489b-8346-5ee5566c8fd6",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0805106896416",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "14fc84b7-0720-48ff-8e75-ea2a41f9fd31",
    "airtableId": "14fc84b7-0720-48ff-8e75-ea2a41f9fd31",
    "sku": "SKU-0085",
    "name": "MONSTER ILLUMINESCENCE BASIC LIGHT STRIP 30M RGB INT",
    "urlSlug": "monster-illuminescence-basic-light-strip-30m-rgb-int",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE BASIC LIGHT STRIP 30M RGB INT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "c72bb7ec-f336-4e54-8709-8e10ef6be16a",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0805106897314",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "9a33bb0d-a5a3-4d2a-89a1-2cc09492e9e4",
    "airtableId": "9a33bb0d-a5a3-4d2a-89a1-2cc09492e9e4",
    "sku": "SKU-0076",
    "name": "MONSTER ILLUMINESCENCE BASIC LIGHT STRIP 5M MULTICOL INT/EXT IPX6",
    "urlSlug": "monster-illuminescence-basic-light-strip-5m-multicol-intext-ipx6",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE BASIC LIGHT STRIP 5M MULTICOL INT/EXT IPX6</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "428a2f38-b7b2-43f0-a20f-7213ea57ee85",
        "color": "Or",
        "colorCode": "#FFD700",
        "ean": "0805106893323",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "887b514c-9cb0-45f2-9fb4-1d9a34dd3d3d",
    "airtableId": "887b514c-9cb0-45f2-9fb4-1d9a34dd3d3d",
    "sku": "SKU-0065",
    "name": "MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 2M COLOR/ INT",
    "urlSlug": "monster-illuminescence-basic-lightstrip-2m-color-int",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 2M COLOR/ INT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "8980d98d-9a03-42b3-abb5-f8643aa0c5ab",
        "color": "Blanc",
        "colorCode": "#FFFFFF",
        "ean": "0805106893330",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "b38cdb71-8822-4614-8537-d1e3d961c924",
    "airtableId": "b38cdb71-8822-4614-8537-d1e3d961c924",
    "sku": "SKU-0067",
    "name": "MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 2M MOTION REACTIVE PILES INT",
    "urlSlug": "monster-illuminescence-basic-lightstrip-2m-motion-reactive-piles-int",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 2M MOTION REACTIVE PILES INT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "cd9f2474-9f47-4eed-b477-b3d7c0f5d37f",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0805106896355",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "bdcb6432-7e56-42a3-be12-5e3ef1a9ab53",
    "airtableId": "bdcb6432-7e56-42a3-be12-5e3ef1a9ab53",
    "sku": "SKU-0066",
    "name": "MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 2M MULTICOL SOUND FLOW INT",
    "urlSlug": "monster-illuminescence-basic-lightstrip-2m-multicol-sound-flow-int",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 2M MULTICOL SOUND FLOW INT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "412b070c-0012-462c-acd3-442268120366",
        "color": "Or",
        "colorCode": "#FFD700",
        "ean": "0805106896478",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "9bbd10c3-5d77-4957-a05b-b98687f88cf9",
    "airtableId": "9bbd10c3-5d77-4957-a05b-b98687f88cf9",
    "sku": "SKU-0064",
    "name": "MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 2M MULTICOULEUR INT",
    "urlSlug": "monster-illuminescence-basic-lightstrip-2m-multicouleur-int",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 2M MULTICOULEUR INT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "940ff17c-867f-49b1-8147-eb0595902b7d",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0805106235765",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "fa1c591c-050f-4863-9d77-f08a1a3c14c9",
    "airtableId": "fa1c591c-050f-4863-9d77-f08a1a3c14c9",
    "sku": "SKU-0071",
    "name": "MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 2M NEON RGB SOUND REACTIVE INT",
    "urlSlug": "monster-illuminescence-basic-lightstrip-2m-neon-rgb-sound-reactive-int",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 2M NEON RGB SOUND REACTIVE INT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "bd81c800-12fc-4702-baf5-2dabe19b9c52",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0805106897260",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "eb3072cc-d8f9-455a-8ddd-5df2d1a0444b",
    "airtableId": "eb3072cc-d8f9-455a-8ddd-5df2d1a0444b",
    "sku": "SKU-0070",
    "name": "MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 4M MULTICOL SOUND FLOW INT",
    "urlSlug": "monster-illuminescence-basic-lightstrip-4m-multicol-sound-flow-int",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 4M MULTICOL SOUND FLOW INT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "044299ce-90af-407d-aa96-13d5a88bb0ea",
        "color": "Or",
        "colorCode": "#FFD700",
        "ean": "0805106897277",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "580d9503-9f2b-4cda-b328-895ed16c878d",
    "airtableId": "580d9503-9f2b-4cda-b328-895ed16c878d",
    "sku": "SKU-0077",
    "name": "MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 5M MULTICOL SOUND FLOW INT",
    "urlSlug": "monster-illuminescence-basic-lightstrip-5m-multicol-sound-flow-int",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 5M MULTICOL SOUND FLOW INT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "cb11cd61-5c5b-4388-89c0-02013e452bce",
        "color": "Or",
        "colorCode": "#FFD700",
        "ean": "0805106896447",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "76322f73-01ba-49a4-8b3e-45ba77d19a13",
    "airtableId": "76322f73-01ba-49a4-8b3e-45ba77d19a13",
    "sku": "SKU-0078",
    "name": "MONSTER ILLUMINESCENCE DUO + SOUND REACTIVE MONIT LIGHT",
    "urlSlug": "monster-illuminescence-duo-sound-reactive-monit-light",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE DUO + SOUND REACTIVE MONIT LIGHT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "0e05049a-9260-4964-bff1-7193e30905d3",
        "color": "Or",
        "colorCode": "#FFD700",
        "ean": "0805106897413",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "752dac43-c71d-4d61-99b3-68da2ff70aa0",
    "airtableId": "752dac43-c71d-4d61-99b3-68da2ff70aa0",
    "sku": "SKU-0087",
    "name": "MONSTER ILLUMINESCENCE SMART BEAM + 2X BARS RGB IC SOUND REACTIVE",
    "urlSlug": "monster-illuminescence-smart-beam-2x-bars-rgb-ic-sound-reactive",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE SMART BEAM + 2X BARS RGB IC SOUND REACTIVE</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "305e2d2a-5da5-482f-8f88-e19841223d96",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0805106897406",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "3801608a-361d-4933-8d10-edb232d63c74",
    "airtableId": "3801608a-361d-4933-8d10-edb232d63c74",
    "sku": "SKU-0079",
    "name": "MONSTER ILLUMINESCENCE SMART CHROMA LIGHT 2X BARS RGB IC",
    "urlSlug": "monster-illuminescence-smart-chroma-light-2x-bars-rgb-ic",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE SMART CHROMA LIGHT 2X BARS RGB IC</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "39d22995-2c39-4236-a1e5-204ec3647395",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0805106898397",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "5d049f32-0769-4b4f-9692-c05c5b13b784",
    "airtableId": "5d049f32-0769-4b4f-9692-c05c5b13b784",
    "sku": "SKU-0069",
    "name": "MONSTER ILLUMINESCENCE SMART LIGHT STRIP 2M INT",
    "urlSlug": "monster-illuminescence-smart-light-strip-2m-int",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE SMART LIGHT STRIP 2M INT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "8b911afa-1012-402d-8c35-93080cda5bfc",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0805106893194",
        "stock": 15,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "e1fc5348-63a4-475d-a6b1-d6c6282aff98",
    "airtableId": "e1fc5348-63a4-475d-a6b1-d6c6282aff98",
    "sku": "SKU-0073",
    "name": "MONSTER ILLUMINESCENCE SMART LIGHT STRIP 2M MULTICOL FLOW INT",
    "urlSlug": "monster-illuminescence-smart-light-strip-2m-multicol-flow-int",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE SMART LIGHT STRIP 2M MULTICOL FLOW INT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "f3b76ee4-4dd6-4cc8-9307-fa3fb940ba3c",
        "color": "Or",
        "colorCode": "#FFD700",
        "ean": "0805106896317",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "4dfe4e9b-4118-4663-8a5b-5ecc9c01100e",
    "airtableId": "4dfe4e9b-4118-4663-8a5b-5ecc9c01100e",
    "sku": "SKU-0083",
    "name": "LED MONSTER ILLUMINESCENCE SMART LIGHT STRIP 2X 5M RGB+W SOUND REACT INT",
    "urlSlug": "monster-illuminescence-smart-light-strip-2x-5m-rgbw-sound-react-int",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE SMART LIGHT STRIP 2X 5M RGB+W SOUND REACT INT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "7b70b9e1-605d-4532-9f51-b8d79eef5a7a",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0805106897321",
        "stock": 0,
        "is_default": true,
        "images": [
          "MLB7-1033-RGB_SPOOL_Primary2_v2_rd3rsu",
          "MONSTER_ILLUMINESCENCE_SMART_LIGHT_STRIP_5M_NEON_INT_EXT_HT_Neon_off_wdxvya",
          "MLB7-1033-RGB_SPOOL_Primary_yhiuqp",
          "MONSTER_ILLUMINESCENCE_SMART_LIGHT_STRIP_5M_NEON_INT_EXT_HT-RGB_IN_THE_BOX_wegy3k"
        ],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "bc2038fc-b136-452e-9bd0-a6334f151bbe",
    "airtableId": "bc2038fc-b136-452e-9bd0-a6334f151bbe",
    "sku": "SKU-0074",
    "name": "MONSTER ILLUMINESCENCE SMART LIGHT STRIP 4M MULTICOL FLOW INT",
    "urlSlug": "monster-illuminescence-smart-light-strip-4m-multicol-flow-int",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE SMART LIGHT STRIP 4M MULTICOL FLOW INT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "bfd8b570-04c5-49e7-bb55-8b8a18462705",
        "color": "Or",
        "colorCode": "#FFD700",
        "ean": "0805106896454",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "e4fa90ac-0266-4013-930d-7183fe7d7bbe",
    "airtableId": "e4fa90ac-0266-4013-930d-7183fe7d7bbe",
    "sku": "SKU-0086",
    "name": "MONSTER ILLUMINESCENCE SMART LIGHT STRIP 5M NEON FLOW MULTICOL INT/EXT",
    "urlSlug": "monster-illuminescence-smart-light-strip-5m-neon-flow-multicol-intext",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE SMART LIGHT STRIP 5M NEON FLOW MULTICOL INT/EXT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "75ed4a61-c596-4462-9b4c-ec7588056d4f",
        "color": "Or",
        "colorCode": "#FFD700",
        "ean": "0805106897345",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "93412fa1-50fd-4eec-9ae0-e0d14c50d58a",
    "airtableId": "93412fa1-50fd-4eec-9ae0-e0d14c50d58a",
    "sku": "SKU-0082",
    "name": "MONSTER ILLUMINESCENCE SMART LIGHT STRIP 5M NEON INT/EXT",
    "urlSlug": "monster-illuminescence-smart-light-strip-5m-neon-intext",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE SMART LIGHT STRIP 5M NEON INT/EXT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "d3ac8229-582f-4376-b320-d691f95f7dae",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0805106893200",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "7747248f-6a26-45f7-9882-895000821fb6",
    "airtableId": "7747248f-6a26-45f7-9882-895000821fb6",
    "sku": "SKU-0080",
    "name": "MONSTER ILLUMINESCENCE SMART LIGHT STRIP 5M RGB + IC FLOW INT",
    "urlSlug": "monster-illuminescence-smart-light-strip-5m-rgb-ic-flow-int",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE SMART LIGHT STRIP 5M RGB + IC FLOW INT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "c54033f0-a05b-4bee-a4fb-62e2e6c1a7a4",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0805106896461",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "f8c65086-507a-4c41-831a-cefe4afbc227",
    "airtableId": "f8c65086-507a-4c41-831a-cefe4afbc227",
    "sku": "SKU-0075",
    "name": "MONSTER ILLUMINESCENCE SMART LIGHT STRIP 5M RGB+W SOUND REACT INT",
    "urlSlug": "monster-illuminescence-smart-light-strip-5m-rgbw-sound-react-int",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE SMART LIGHT STRIP 5M RGB+W SOUND REACT INT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "c6e1024b-e128-4128-a6a3-ef63b4f90050",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0805106897376",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "374c6cc5-4ef0-4589-9b7b-009040ef7485",
    "airtableId": "374c6cc5-4ef0-4589-9b7b-009040ef7485",
    "sku": "SKU-0084",
    "name": "MONSTER ILLUMINESCENCE SMART PRISM II X6 RGB+IC FLOW",
    "urlSlug": "monster-illuminescence-smart-prism-ii-x6-rgbic-flow",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER ILLUMINESCENCE SMART PRISM II X6 RGB+IC FLOW</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f",
    "categoryName": "LED",
    "categorySlug": "led",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "e96fbdf4-ee00-4721-bada-1bd46521a69a",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0805106898625",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "72dda355-66ff-444c-9bfc-6844a6ec629a",
    "airtableId": "72dda355-66ff-444c-9bfc-6844a6ec629a",
    "sku": "SKU-0010",
    "name": "CASQUE MONSTER MISSION 100",
    "urlSlug": "monster-mission-100",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">CASQUE MONSTER MISSION 100</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "b6ae0ffe-3915-447f-b7e8-bbbc8977e860",
    "categoryName": "Casques",
    "categorySlug": "casques-audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "d722cc5d-6106-4d09-a4b5-85b9c4021deb",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "0810079705863",
        "stock": 0,
        "is_default": true,
        "images": [
          "MONSTER_MISSION_100_NOIR_HT_1_wuycze",
          "MONSTER_Mission_100_E58_lxcevb",
          "MONSTER_MISSION_100_NOIR_HT_2_k9pora",
          "MONSTER_MISSION_100_NOIR_HT_qvstqr"
        ],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "a5696327-ea73-447e-896b-ffabc1bfa0ad",
        "color": "Blanc",
        "colorCode": "#FFFFFF",
        "ean": "0810079705108",
        "stock": 0,
        "is_default": false,
        "images": [
          "MONSTER_MISSION_100_NOIR_HT_1_wuycze",
          "MONSTER_Mission_100_E58_lxcevb",
          "MONSTER_MISSION_100_NOIR_HT_2_k9pora",
          "MONSTER_MISSION_100_NOIR_HT_qvstqr"
        ],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "5906aeb3-7ce9-497d-b3b2-660f8eedefc2",
    "airtableId": "5906aeb3-7ce9-497d-b3b2-660f8eedefc2",
    "sku": "SKU-0062",
    "name": "MONSTER MULTIPRISE 4 PRISES",
    "urlSlug": "monster-multiprise-4-prises",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER MULTIPRISE 4 PRISES</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
    "categoryName": "Accessoires",
    "categorySlug": "accessoires",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "1643c9b7-500b-44aa-96d3-14a793f350a6",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0850017011410",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "50cdf6b8-3d48-402a-85e6-8d08315a0ba6",
    "airtableId": "50cdf6b8-3d48-402a-85e6-8d08315a0ba6",
    "sku": "SKU-0007",
    "name": "MONSTER N LITE 203",
    "urlSlug": "monster-n-lite-203",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER N LITE 203</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "63704d23-d1f5-4c21-9760-8659ccca4c92",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "0810079707041",
        "stock": 113,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "29631314-1ef7-4ba3-88d2-0351a6291d58",
        "color": "Gold",
        "colorCode": "#FFD700",
        "ean": "0810079707034",
        "stock": 116,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "8cb5c4ae-7e80-433d-bb5a-c2a0e7e683fc",
    "airtableId": "8cb5c4ae-7e80-433d-bb5a-c2a0e7e683fc",
    "sku": "SKU-0008",
    "name": "MONSTER N LITE 206",
    "urlSlug": "monster-n-lite-206",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER N LITE 206</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "c1158f5f-7304-43c9-8d7e-b931f520c2dd",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "0810079706433",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "72090544-31f1-4243-9175-260c6277838f",
        "color": "Blanc",
        "colorCode": "#FFFFFF",
        "ean": "0810079706440",
        "stock": 0,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "d5c2028d-5edd-41d7-a99e-4de5f755873a",
    "airtableId": "d5c2028d-5edd-41d7-a99e-4de5f755873a",
    "sku": "SKU-0055",
    "name": "MONSTER NETTOYANT ET LINGETTE 200ML",
    "urlSlug": "monster-nettoyant-et-lingette-200ml",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER NETTOYANT ET LINGETTE 200ML</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
    "categoryName": "Accessoires",
    "categorySlug": "accessoires",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "42794fac-66f3-4e0a-bd7d-7509e9026c2b",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "0741835115209",
        "stock": 96,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "1d87626f-aa3f-45d6-9923-c55062932bc3",
    "airtableId": "1d87626f-aa3f-45d6-9923-c55062932bc3",
    "sku": "SKU-0011",
    "name": "CASQUE MONSTER PERSONA SE ANC",
    "urlSlug": "monster-persona-se-anc",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">CASQUE MONSTER PERSONA SE ANC</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "b6ae0ffe-3915-447f-b7e8-bbbc8977e860",
    "categoryName": "Casques",
    "categorySlug": "casques-audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "277e688f-062e-423c-857e-873aa9bb3cba",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "0810079706082",
        "stock": 0,
        "is_default": true,
        "images": [
          "MONSTER_PERSONA_SE_ANC_NOIR_HT_arjw8w",
          "MONSTER_PERSONA_SE_ANC_GRIS_HT_ou7fhl"
        ],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "d31748f0-b7b1-4f2e-9534-78bd7e33a0f4",
        "color": "Gris",
        "colorCode": "#808080",
        "ean": "0810079705733",
        "stock": 0,
        "is_default": false,
        "images": [
          "MONSTER_PERSONA_SE_ANC_GRIS_HT_ou7fhl",
          "MONSTER_PERSONA_SE_ANC_NOIR_HT_arjw8w"
        ],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "6011dfb8-086c-4bab-b9f1-724cb6d033f6",
    "airtableId": "6011dfb8-086c-4bab-b9f1-724cb6d033f6",
    "sku": "SKU-0009",
    "name": "MONSTER TH300 TACTILE",
    "urlSlug": "monster-th300-tactile",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER TH300 TACTILE</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
    "brandName": "MONSTER",
    "brandSlug": "monster",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "c0232317-f29c-4c0e-af35-a2f066e7d16d",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "0810079705924",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "df5dee03-040e-443a-b95d-e62e77ce6b7c",
        "color": "Blanc",
        "colorCode": "#FFFFFF",
        "ean": "0810079705931",
        "stock": 0,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "a4ea9e9f-4908-40ff-a7bb-7b7af48eec81",
    "airtableId": "a4ea9e9f-4908-40ff-a7bb-7b7af48eec81",
    "sku": "SKU-0099",
    "name": "MONTRE HIFUTURE AIX ACIER",
    "urlSlug": "montre-hifuture-aix-acier",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONTRE HIFUTURE AIX ACIER</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "e25c2670-61fd-461d-8404-bd21af57905b",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6972576181428",
        "stock": 5,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "c43af4ad-a05a-49f3-a0e1-3bb4ac32ee24",
    "airtableId": "c43af4ad-a05a-49f3-a0e1-3bb4ac32ee24",
    "sku": "SKU-0100",
    "name": "MONTRE HIFUTURE AIX E ACIER",
    "urlSlug": "montre-hifuture-aix-e-acier",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONTRE HIFUTURE AIX E ACIER</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "d6d41813-4d24-4c7f-a04f-b5d8374480b6",
        "color": "Gris",
        "colorCode": "#808080",
        "ean": "6972576181435",
        "stock": 10,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "7d795aa5-662e-4bb2-ad78-935f60203900",
    "airtableId": "7d795aa5-662e-4bb2-ad78-935f60203900",
    "sku": "SKU-0015",
    "name": "MONTRE HIFUTURE AURA 2",
    "urlSlug": "montre-hifuture-aura-2",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONTRE HIFUTURE AURA 2</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "6c60d2d7-f79b-4554-8b22-2467c45247a1",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6972576182524",
        "stock": 28,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "9428cbf7-df0d-4d91-8a6b-21a41ff43886",
        "color": "Gris",
        "colorCode": "#808080",
        "ean": "6972576182531",
        "stock": 28,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "8d1ec784-77dc-4faf-b187-5e67688eee28",
    "airtableId": "8d1ec784-77dc-4faf-b187-5e67688eee28",
    "sku": "SKU-0093",
    "name": "MONTRE HIFUTURE AURA 2 GOLD",
    "urlSlug": "montre-hifuture-aura-2-gold",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONTRE HIFUTURE AURA 2 GOLD</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "fdf71f28-4b89-4c7a-a13c-d056bb158e4e",
        "color": "Rose",
        "colorCode": "#FFB6C1",
        "ean": "6972576182548",
        "stock": 24,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "8c8d3e26-7051-42bb-aba7-e717244b3a51",
    "airtableId": "8c8d3e26-7051-42bb-aba7-e717244b3a51",
    "sku": "SKU-0095",
    "name": "MONTRE HIFUTURE AURA BROWN",
    "urlSlug": "montre-hifuture-aura-brown",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONTRE HIFUTURE AURA BROWN</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "32e69175-1459-4ed7-9eee-906559fd4c0a",
        "color": "Or",
        "colorCode": "#FFD700",
        "ean": "6972576182050",
        "stock": 18,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "bd7ac6ef-6ad4-4f90-ab93-fcd85c557413",
    "airtableId": "bd7ac6ef-6ad4-4f90-ab93-fcd85c557413",
    "sku": "SKU-0094",
    "name": "MONTRE HIFUTURE AURA SILVER",
    "urlSlug": "montre-hifuture-aura-silver",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONTRE HIFUTURE AURA SILVER</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "f94e51f7-aac7-4cf7-a8dc-cdaaba6fcf47",
        "color": "Or",
        "colorCode": "#FFD700",
        "ean": "6972576182029",
        "stock": 16,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "a59221a7-430e-420c-b452-c2bc54c1e1cc",
    "airtableId": "a59221a7-430e-420c-b452-c2bc54c1e1cc",
    "sku": "SKU-0096",
    "name": "MONTRE HIFUTURE AURORA",
    "urlSlug": "montre-hifuture-aurora",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONTRE HIFUTURE AURORA</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "53cf98ca-89b1-4c81-84fe-3cd00b35450e",
        "color": "Bleu",
        "colorCode": "#0066CC",
        "ean": "6972576182036",
        "stock": 27,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "8162ff77-d29c-4b93-a43d-ec7f8db7cf88",
    "airtableId": "8162ff77-d29c-4b93-a43d-ec7f8db7cf88",
    "sku": "SKU-0016",
    "name": "MONTRE HIFUTURE GO PRO 2",
    "urlSlug": "montre-hifuture-go-pro-2",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONTRE HIFUTURE GO PRO 2</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "eb915c5c-c02a-4185-b508-66b9eb578699",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6972576182340",
        "stock": 29,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "d5761b89-95cc-411f-8116-e9fb8806caba",
        "color": "Gris",
        "colorCode": "#808080",
        "ean": "6972576182357",
        "stock": 29,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "6c4ffa5e-5572-437d-aa1b-fc0143231519",
    "airtableId": "6c4ffa5e-5572-437d-aa1b-fc0143231519",
    "sku": "SKU-0013",
    "name": "MONTRE HIFUTURE LUME",
    "urlSlug": "montre-hifuture-lume",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto space-y-12\">\n  <section class=\"text-center\">\n    <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">Description</h3>\n    <img src=\"https://res.cloudinary.com/dw4t8vpkh/image/upload/v1/monster-phone/MONTRE_HIFUTURE_LUME_VERT_HT_01_at5swc\" alt=\"MONTRE HIFUTURE LUME - Description\" class=\"w-full max-w-2xl mx-auto rounded-lg shadow-lg mb-4\" />\n    <p class=\"text-gray-700\">Découvrez la MONTRE HIFUTURE LUME, une montre connectée qui allie style et performance.</p>\n  </section>\n  \n  <section class=\"text-center\">\n    <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">Points forts</h3>\n    <img src=\"https://res.cloudinary.com/dw4t8vpkh/image/upload/v1/monster-phone/MONTRE_HIFUTURE_LUME_VERT_HT_09_vbu6yu\" alt=\"MONTRE HIFUTURE LUME - Points forts\" class=\"w-full max-w-2xl mx-auto rounded-lg shadow-lg mb-4\" />\n    <p class=\"text-gray-700\">Profitez de fonctionnalités avancées et d'un design moderne.</p>\n  </section>\n  \n  <section class=\"text-center\">\n    <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">Pourquoi choisir ce produit</h3>\n    <img src=\"https://res.cloudinary.com/dw4t8vpkh/image/upload/v1/monster-phone/MONTRE_HIFUTURE_LUME_VERT_HT_07_dyyofi\" alt=\"MONTRE HIFUTURE LUME - Pourquoi choisir\" class=\"w-full max-w-2xl mx-auto rounded-lg shadow-lg mb-4\" />\n    <p class=\"text-gray-700\">Une montre qui répond à tous vos besoins du quotidien.</p>\n  </section>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "484dbe95-3b98-4c3d-aaa2-be75c99f2d58",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6972576182302",
        "stock": 28,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "a69d8a51-a0b9-40f2-b36a-6ac6149d5c76",
        "color": "Gris",
        "colorCode": "#808080",
        "ean": "6972576182319",
        "stock": 46,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "1ac5d73c-6f42-4c21-92ae-190ee13b40c7",
        "color": "Vert",
        "colorCode": "#00AA44",
        "ean": "6972576182333",
        "stock": 45,
        "is_default": true,
        "images": [
          "MONTRE_HIFUTURE_LUME_VERT_HT_05_yru0p5",
          "MONTRE_HIFUTURE_LUME_VERT_HT_07_dyyofi",
          "MONTRE_HIFUTURE_LUME_VERT_HT_01_at5swc",
          "MONTRE_HIFUTURE_LUME_VERT_HT_09_vbu6yu",
          "MONTRE_HIFUTURE_LUME_VERT_HT_02_rdnwgj",
          "MONTRE_HIFUTURE_LUME_VERT_HT_04_udx9zx",
          "MONTRE_HIFUTURE_LUME_VERT_HT_06_yuzrmc",
          "MONTRE_HIFUTURE_LUME_VERT_HT_03_s0vovm"
        ],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "a41c6cf1-80c2-4065-af8a-9830fbfb6d68",
    "airtableId": "a41c6cf1-80c2-4065-af8a-9830fbfb6d68",
    "sku": "SKU-0091",
    "name": "MONTRE HIFUTURE LUME CHAMPAGNE",
    "urlSlug": "montre-hifuture-lume-champagne",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONTRE HIFUTURE LUME CHAMPAGNE</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "a65adb4e-9664-4a16-84ef-abe2188e377e",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "6972576182326",
        "stock": 45,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "b1c58a2c-0d72-47b6-be41-dcab2db98163",
    "airtableId": "b1c58a2c-0d72-47b6-be41-dcab2db98163",
    "sku": "SKU-0014",
    "name": "MONTRE HIFUTURE LUME PRO",
    "urlSlug": "montre-hifuture-lume-pro",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONTRE HIFUTURE LUME PRO</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "13329e1b-4a49-401a-b0f5-78f238930d27",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6972576182401",
        "stock": 53,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "25112864-0a94-4da6-b57f-15d6ba38cefa",
        "color": "Vert",
        "colorCode": "#00AA44",
        "ean": "6972576182425",
        "stock": 58,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "77c7aca8-5815-4b6a-a415-6d8decbb1c7e",
        "color": "Pink",
        "colorCode": "#FFB6C1",
        "ean": "6972576182432",
        "stock": 45,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "40d98d5e-f2a9-4a2e-88ab-7be0da40b482",
    "airtableId": "40d98d5e-f2a9-4a2e-88ab-7be0da40b482",
    "sku": "SKU-0092",
    "name": "MONTRE HIFUTURE LUME PRO TITANIUM",
    "urlSlug": "montre-hifuture-lume-pro-titanium",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONTRE HIFUTURE LUME PRO TITANIUM</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "dad057bc-9173-47b4-b047-9cf96d21e710",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "6972576182418",
        "stock": 52,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "f0d4cb08-0e96-4c58-9608-5780f61ac48e",
    "airtableId": "f0d4cb08-0e96-4c58-9608-5780f61ac48e",
    "sku": "SKU-0097",
    "name": "MONTRE HIFUTURE MIXX 3",
    "urlSlug": "montre-hifuture-mixx-3",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONTRE HIFUTURE MIXX 3</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "ed089683-68ad-4db1-8d23-7ab606b17d4c",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6972576182494",
        "stock": 27,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "dff58ed2-1ca3-49c4-a167-a703956b24f2",
    "airtableId": "dff58ed2-1ca3-49c4-a167-a703956b24f2",
    "sku": "SKU-0098",
    "name": "MONTRE HIFUTURE MIXX 3 FLUO",
    "urlSlug": "montre-hifuture-mixx-3-fluo",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONTRE HIFUTURE MIXX 3 FLUO</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "adfa5902-6e08-4ba4-abdd-f2298470e651",
        "color": "Jaune",
        "colorCode": "#FFD700",
        "ean": "6972576182562",
        "stock": 27,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "397ca08e-3d1f-4025-ab89-118e8e8f4df9",
    "airtableId": "397ca08e-3d1f-4025-ab89-118e8e8f4df9",
    "sku": "SKU-0101",
    "name": "MONTRE HIFUTURE VELA",
    "urlSlug": "montre-hifuture-vela",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONTRE HIFUTURE VELA</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "f1129c32-0119-4208-9990-13811fa3f365",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6972576182371",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "ed71f9fb-bb74-4c02-ad2c-a5caf6df468b",
    "airtableId": "ed71f9fb-bb74-4c02-ad2c-a5caf6df468b",
    "sku": "SKU-0102",
    "name": "MONTRE HIFUTURE VELA BEIGE",
    "urlSlug": "montre-hifuture-vela-beige",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONTRE HIFUTURE VELA BEIGE</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "be57f318-03d4-49a2-81a6-4455118c3fc7",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "6972576182388",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "7933b705-6140-4c74-b870-5b96ce070520",
    "airtableId": "7933b705-6140-4c74-b870-5b96ce070520",
    "sku": "SKU-0012",
    "name": "MONTRE HIFUTURE ZONE 2",
    "urlSlug": "montre-hifuture-zone-2",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONTRE HIFUTURE ZONE 2</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
    "brandName": "HIFUTURE",
    "brandSlug": "hifuture",
    "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
    "categoryName": "Montres",
    "categorySlug": "montres",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "7f2ef406-ddd9-418b-af8c-0f830b176335",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6972576181244",
        "stock": 70,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "b77622ab-a6da-45f6-beb5-fae4ae6a2b49",
        "color": "Rose",
        "colorCode": "#FFB6C1",
        "ean": "6972576181251",
        "stock": 7,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "fa9e91e6-d34b-4379-8841-e99a59fffc80",
        "color": "Gris",
        "colorCode": "#808080",
        "ean": "6972576181268",
        "stock": 66,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "42821a9c-9402-4047-9279-c33b0ce40b17",
    "airtableId": "42821a9c-9402-4047-9279-c33b0ce40b17",
    "sku": "NOKIA-110-4G-2025",
    "name": "Nokia 110 4G 2025",
    "urlSlug": "nokia-110-4g-2025",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n      <h3 class=\"text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3\">\n        <span class=\"w-1 h-8 bg-red-500 rounded-full\"></span>\n        Nokia 110 2023 Noir - Le classique réinventé avec style\n      </h3>\n      \n      <div class=\"prose prose-lg max-w-none mb-8 text-gray-700\">\n        <p>\n          Redécouvrez la simplicité avec le <strong>Nokia 110 2023 Noir</strong>, le téléphone classique qui revient avec des fonctionnalités modernisées pour La Réunion 974.\n          Parfait pour ceux qui recherchent l'essentiel ou comme téléphone de secours, il offre une autonomie exceptionnelle de 15 jours en veille.\n        </p>\n        <p>\n          Ce modèle 2023 intègre les meilleures innovations Nokia : écran couleur lumineux, clavier T9 réactif et radio FM pour vos déplacements.\n          Avec sa double SIM, gérez facilement vos lignes personnelle et professionnelle.\n        </p>\n      </div>\n    </div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "f67727b5-4b61-4ee8-8b36-0efbd06e454e",
    "brandName": "NOKIA",
    "brandSlug": "nokia",
    "categoryId": "80194285-ea90-40ff-8e2a-8edbe3609330",
    "categoryName": "Smartphones",
    "categorySlug": "smartphones",
    "features": [],
    "specifications": [
      { "label": "SIM", "value": "Double SIM" },
      { "label": "Couleur", "value": "Noir" },
      { "label": "Jeux", "value": "Snake et autres jeux classiques" },
      { "label": "Radio", "value": "FM avec enregistrement" },
      { "label": "Lampe torche", "value": "LED intégrée" },
      { "label": "Batterie", "value": "1000 mAh" },
      { "label": "Réseau", "value": "2G/3G" },
      { "label": "Garantie", "value": "2 ans" },
      { "label": "Taille écran", "value": "1.77 pouces" }
    ],
    "repairabilityIndex": null,
    "dasHead": "1.226",
    "dasBody": "1.226",
    "dasLimb": "1.65",
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "c4064196-290a-46c4-9c44-2d268ca24e17",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6438409084484",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "dd596486-6883-41fb-a0d0-5f1446ea9bce",
        "color": "Bleu",
        "colorCode": "#0066CC",
        "ean": "6438409084491",
        "stock": 3,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "dfd34122-9584-483d-b83c-cb136589b1f5",
    "airtableId": "dfd34122-9584-483d-b83c-cb136589b1f5",
    "sku": "SKU-0118",
    "name": "PARTYBOX HIFUTURE EVENT HORIZON",
    "urlSlug": "partybox-hifuture-event-horizon",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">PARTYBOX HIFUTURE EVENT HORIZON</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "f528c98c-99db-4c5f-9a4f-93f09b1a993c",
    "brandName": "PARTYBOX",
    "brandSlug": "partybox",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "b0741d83-6582-4084-8fa9-91c177754ae2",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6972576181206",
        "stock": 6,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "9ea5a859-39b9-4137-b2a9-e4b845f91154",
    "airtableId": "9ea5a859-39b9-4137-b2a9-e4b845f91154",
    "sku": "SKU-0117",
    "name": "PARTYBOX HIFUTURE MUSICBOX",
    "urlSlug": "partybox-hifuture-musicbox",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">PARTYBOX HIFUTURE MUSICBOX</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "f528c98c-99db-4c5f-9a4f-93f09b1a993c",
    "brandName": "PARTYBOX",
    "brandSlug": "partybox",
    "categoryId": "da7f55c0-35f7-4cbb-9262-24352fdb44f3",
    "categoryName": "Enceintes",
    "categorySlug": "enceintes",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "9323be4b-ad93-4641-bf5b-04ee63248c85",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6972576181343",
        "stock": 6,
        "is_default": true,
        "images": [
          "PARTYBOX_HIFUTURE_MUSICBOX_NOIR_HT_2_avp8af",
          "PARTYBOX_HIFUTURE_MUSICBOX_NOIR_HT_3_kgtzfw",
          "speaker_grey.28_zgotct",
          "speaker.1_juhjys",
          "PARTYBOX_HIFUTURE_MUSICBOX_NOIR_HT_jnv1wn"
        ],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "fa2331ed-4f9a-48dd-ad9e-6cf07f87c4c1",
    "airtableId": "fa2331ed-4f9a-48dd-ad9e-6cf07f87c4c1",
    "sku": "SKU-0119",
    "name": "PARTYBOX HIFUTURE VOCALIST 300",
    "urlSlug": "partybox-hifuture-vocalist-300",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">PARTYBOX HIFUTURE VOCALIST 300</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "f528c98c-99db-4c5f-9a4f-93f09b1a993c",
    "brandName": "PARTYBOX",
    "brandSlug": "partybox",
    "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
    "categoryName": "Audio",
    "categorySlug": "audio",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "60e2bc74-68f3-4886-b131-498344206019",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "6972576181770",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "8d271b61-aa92-4e59-a9a2-a513c33884f0",
    "airtableId": "8d271b61-aa92-4e59-a9a2-a513c33884f0",
    "sku": "SKU-0005",
    "name": "POWERBANK ABYX 10K MAH",
    "urlSlug": "powerbank-abyx-10k-mah",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">POWERBANK ABYX 10K MAH</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "b2c3d4e5-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
    "brandName": "ABYX",
    "brandSlug": "abyx",
    "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
    "categoryName": "Accessoires",
    "categorySlug": "accessoires",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "6028fab7-2905-462e-995b-70215e25f0d6",
        "color": "Noir",
        "colorCode": "#000000",
        "ean": "4897069737123",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      },
      {
        "id": "7d321dd4-f632-4bf9-939f-92d08c84a514",
        "color": "Blanc",
        "colorCode": "#FFFFFF",
        "ean": "4897069737130",
        "stock": 369,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "2f8d8a49-1b03-4a1f-8a47-45ac90945650",
    "airtableId": "2f8d8a49-1b03-4a1f-8a47-45ac90945650",
    "sku": "SKU-0030",
    "name": "POWERBANK MY WAY 5K MAH MAGSAFE",
    "urlSlug": "powerbank-my-way-5k-mah-magsafe",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">POWERBANK MY WAY 5K MAH MAGSAFE</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    "brandName": "MY WAY",
    "brandSlug": "my-way",
    "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
    "categoryName": "Accessoires",
    "categorySlug": "accessoires",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "19a246ae-1449-4669-9d54-07f066d17c01",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "3663111190434",
        "stock": 120,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "3778f8ae-e9d5-43a7-b4b5-3f7df1109ed0",
    "airtableId": "3778f8ae-e9d5-43a7-b4b5-3f7df1109ed0",
    "sku": "SKU-0028",
    "name": "POWERBANK MYWAY 10K MAH",
    "urlSlug": "powerbank-myway-10k-mah",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">POWERBANK MYWAY 10K MAH</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    "brandName": "MY WAY",
    "brandSlug": "my-way",
    "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
    "categoryName": "Accessoires",
    "categorySlug": "accessoires",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "2b5f9e66-da9f-404b-a4b5-c150758bf24d",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "3663111191578",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "ceb5a9e3-764e-4f59-8e24-5ee1fb2a1bd2",
    "airtableId": "ceb5a9e3-764e-4f59-8e24-5ee1fb2a1bd2",
    "sku": "SKU-0029",
    "name": "POWERBANK MYWAY 20K MAH",
    "urlSlug": "powerbank-myway-20k-mah",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">POWERBANK MYWAY 20K MAH</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    "brandName": "MY WAY",
    "brandSlug": "my-way",
    "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
    "categoryName": "Accessoires",
    "categorySlug": "accessoires",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "b6536d48-1e59-44f5-acc7-d4fe3a4ab3d3",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "3663111191585",
        "stock": 0,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "8a9e8744-7fba-4cf2-a18a-505c33a54fe5",
    "airtableId": "8a9e8744-7fba-4cf2-a18a-505c33a54fe5",
    "sku": "SKU-0038",
    "name": "ROULEAUX PAPIER PHOTO X5 KIDPIC ENFANT",
    "urlSlug": "rouleaux-papier-photo-x5-kidpic-enfant",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">ROULEAUX PAPIER PHOTO X5 KIDPIC ENFANT</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "5b8a13ee-afad-4e68-b2c0-5d7922d91f5d",
    "brandName": "MUVIT",
    "brandSlug": "muvit",
    "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
    "categoryName": "Accessoires",
    "categorySlug": "accessoires",
    "features": [],
    "specifications": [],
    "repairabilityIndex": null,
    "dasHead": null,
    "dasBody": null,
    "dasLimb": null,
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "f1b42615-b42c-4e93-8420-bfc58bce76b5",
        "color": "Standard",
        "colorCode": "#808080",
        "ean": "3663111187250",
        "stock": 185,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": null,
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
  {
    "id": "dd19162c-7324-4f9b-8282-6fd5cdb3c8c6",
    "airtableId": "dd19162c-7324-4f9b-8282-6fd5cdb3c8c6",
    "sku": "SKU-0004",
    "name": "TELEPHONE HONOR 200 PRO 12+",
    "urlSlug": "telephone-honor-200-pro-12",
    "shortDescription": "",
    "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">TELEPHONE HONOR 200 PRO 12+</h3>\n  <p class=\"text-gray-700\">[PLACEHOLDER] Description à compléter</p>\n</div>",
    "originalPrice": null,
    "basePrice": 0,
    "discountPercent": 0,
    "brandId": "0787543a-2ab3-4c65-850d-9abb59ca4d4c",
    "brandName": "HONOR",
    "brandSlug": "honor",
    "categoryId": "80194285-ea90-40ff-8e2a-8edbe3609330",
    "categoryName": "Smartphones",
    "categorySlug": "smartphones",
    "features": [],
    "specifications": [],
    "repairabilityIndex": 8.1,
    "dasHead": "0,87 W/kg",
    "dasBody": "1,11 W/kg",
    "dasLimb": "2,97 W/kg",
    "energyClass": "",
    "tags": [],
    "isFeatured": false,
    "isNewArrival": false,
    "showOnHomepage": false,
    "status": "active",
    "variants": [
      {
        "id": "d18ba20b-a50c-4dd8-ad58-a9ed244977a0",
        "color": "Vert",
        "colorCode": "#00AA44",
        "ean": "6936520845231",
        "stock": 11,
        "is_default": true,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": "12/512",
        "size": null
      },
      {
        "id": "f25a8b43-8e9b-4686-8737-e0160ff7143b",
        "color": "Blanc",
        "colorCode": "#FFFFFF",
        "ean": "6936520845248",
        "stock": 8,
        "is_default": false,
        "images": [],
        "adminDiscountPercent": 0,
        "capacity": "12/512",
        "size": null
      }
    ],
    "rating": {
      "average": 0,
      "count": 0,
      "distribution": {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
      },
      "reviews": []
    }
  },
{
  "id": "9279ad1e-f530-47c3-863f-3277ebbcd280",
  "airtableId": "9279ad1e-f530-47c3-863f-3277ebbcd280",
  "sku": "SKU-0120",
  "name": "HONOR X5C 4+",
  "urlSlug": "honor-x5c-4",
  "shortDescription": "Smartphone HONOR X5C avec écran 6.77\" HD+ 90Hz, batterie 5260 mAh et appareil photo 50 MP",
  "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">HONOR X5C - L'essentiel à petit prix</h3>\n  <p class=\"text-gray-700 mb-4\">Le HONOR X5C est le smartphone idéal pour ceux qui recherchent l'essentiel à petit prix. Doté d'une batterie longue durée de 5260 mAh et d'un écran LCD HD+ de 6,77 pouces avec un taux de rafraîchissement de 90 Hz, il offre une expérience fluide au quotidien.</p>\n  <p class=\"text-gray-700 mb-4\">Son appareil photo de 50 MP capture vos moments avec une qualité surprenante pour son segment de prix, tandis que le processeur MediaTek Helio G81 assure des performances fiables sous Android 15 avec MagicOS 9.0.</p>\n  <p class=\"text-gray-700\">Avec 4 Go de RAM et 64 Go de stockage extensible par microSD, le HONOR X5C couvre tous vos besoins essentiels : navigation, réseaux sociaux, photos et communication.</p>\n</div>",
  "originalPrice": null,
  "basePrice": 89.9,
  "discountPercent": 0,
  "brandId": "0787543a-2ab3-4c65-850d-9abb59ca4d4c",
  "brandName": "HONOR",
  "brandSlug": "honor",
  "categoryId": "80194285-ea90-40ff-8e2a-8edbe3609330",
  "categoryName": "Smartphones",
  "categorySlug": "smartphones",
  "features": [
    "Écran 6.77\" HD+ 90Hz",
    "Batterie 5260 mAh",
    "Appareil photo 50 MP",
    "Android 15 + MagicOS 9.0",
    "Stockage extensible microSD"
  ],
  "specifications": [
    {
      "label": "Écran",
      "value": "6.77\" LCD IPS HD+ 720x1600, 90 Hz"
    },
    {
      "label": "Processeur",
      "value": "MediaTek Helio G81, Octa-core 2.0 GHz, 12 nm"
    },
    {
      "label": "RAM",
      "value": "4 Go"
    },
    {
      "label": "Stockage",
      "value": "64 Go (extensible microSD)"
    },
    {
      "label": "Batterie",
      "value": "5260 mAh, charge 15W"
    },
    {
      "label": "Caméra arrière",
      "value": "50 MP (f/1.8)"
    },
    {
      "label": "Caméra avant",
      "value": "5 MP (f/2.2)"
    },
    {
      "label": "Système",
      "value": "Android 15 + MagicOS 9.0"
    },
    {
      "label": "Connectivité",
      "value": "4G LTE, WiFi 5, Bluetooth 5.1, NFC"
    },
    {
      "label": "Dimensions",
      "value": "167.0 x 77.0 x 7.9 mm"
    },
    {
      "label": "Poids",
      "value": "186 g"
    },
    {
      "label": "Sécurité",
      "value": "Capteur d'empreintes latéral"
    }
  ],
  "repairabilityIndex": 8.1,
  "dasHead": "0,69 W/kg",
  "dasBody": "0,88 W/kg",
  "dasLimb": "1,87 W/kg",
  "energyClass": "",
  "tags": [],
  "isFeatured": false,
  "isNewArrival": true,
  "showOnHomepage": false,
  "status": "active",
  "variants": [
    {
      "id": "3b3def45-8e65-4066-857a-b61782a3a26e",
      "color": "Bleu",
      "colorCode": "#0066CC",
      "ean": "6936520878017",
      "stock": 0,
      "is_default": true,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": "4/64",
      "size": null
    },
    {
      "id": "1579c613-ce1f-4063-a9ef-20b1b97f1430",
      "color": "Noir",
      "colorCode": "#000000",
      "ean": "6936520878000",
      "stock": 0,
      "is_default": false,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": "4/64",
      "size": null
    }
  ],
  "rating": {
    "average": 0,
    "count": 0,
    "distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "reviews": []
  }
},
{
  "id": "3dbffcf3-a505-4410-ba6d-445aedef4382",
  "airtableId": "3dbffcf3-a505-4410-ba6d-445aedef4382",
  "sku": "SKU-0121",
  "name": "HONOR X7D 5G 8+",
  "urlSlug": "honor-x7d-5g-8",
  "shortDescription": "Smartphone HONOR X7D 5G avec batterie 6500 mAh, Snapdragon 6s Gen 3 et écran 120Hz",
  "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">HONOR X7D 5G - Endurance et connectivité 5G</h3>\n  <p class=\"text-gray-700 mb-4\">Le HONOR X7D 5G allie endurance et connectivité de nouvelle génération. Sa batterie massive de 6500 mAh avec charge rapide 35W assure une autonomie exceptionnelle, tandis que la 5G via le Snapdragon 6s Gen 3 offre des vitesses de connexion ultra-rapides.</p>\n  <p class=\"text-gray-700 mb-4\">Certifié IP65 et SGS 5 étoiles pour la résistance aux chutes, c'est un compagnon robuste au quotidien. Son écran LCD 120 Hz de 6,77 pouces et son appareil photo 50 MP complètent un ensemble très équilibré pour un budget maîtrisé.</p>\n  <p class=\"text-gray-700\">Avec 8 Go de RAM et 256 Go de stockage, le HONOR X7D 5G offre un espace généreux pour toutes vos applications et contenus multimédias.</p>\n</div>",
  "originalPrice": null,
  "basePrice": 219.9,
  "discountPercent": 0,
  "brandId": "0787543a-2ab3-4c65-850d-9abb59ca4d4c",
  "brandName": "HONOR",
  "brandSlug": "honor",
  "categoryId": "80194285-ea90-40ff-8e2a-8edbe3609330",
  "categoryName": "Smartphones",
  "categorySlug": "smartphones",
  "features": [
    "5G avec Snapdragon 6s Gen 3",
    "Batterie 6500 mAh + charge 35W",
    "Écran 6.77\" 120Hz",
    "Certifié IP65",
    "Appareil photo 50 MP"
  ],
  "specifications": [
    {
      "label": "Écran",
      "value": "6.77\" TFT LCD HD+ 720x1600, 120 Hz, 850 nits"
    },
    {
      "label": "Processeur",
      "value": "Qualcomm Snapdragon 6s Gen 3, Octa-core 2.3 GHz, 6 nm"
    },
    {
      "label": "RAM",
      "value": "8 Go"
    },
    {
      "label": "Stockage",
      "value": "256 Go"
    },
    {
      "label": "Batterie",
      "value": "6500 mAh, charge rapide 35W HONOR SuperCharge"
    },
    {
      "label": "Caméra arrière",
      "value": "50 MP (f/1.8) + 2 MP profondeur"
    },
    {
      "label": "Caméra avant",
      "value": "5 MP (f/2.2)"
    },
    {
      "label": "Système",
      "value": "Android 15 + MagicOS 9.0"
    },
    {
      "label": "Connectivité",
      "value": "5G, 4G LTE, WiFi 5, Bluetooth 5.1, NFC, USB-C"
    },
    {
      "label": "Résistance",
      "value": "IP65, SGS 5 étoiles anti-chute"
    },
    {
      "label": "Dimensions",
      "value": "166.9 x 76.8 x 8.2 mm"
    },
    {
      "label": "Poids",
      "value": "206 g"
    },
    {
      "label": "Sécurité",
      "value": "Capteur d'empreintes latéral"
    }
  ],
  "repairabilityIndex": null,
  "dasHead": null,
  "dasBody": null,
  "dasLimb": null,
  "energyClass": "",
  "tags": [],
  "isFeatured": false,
  "isNewArrival": true,
  "showOnHomepage": false,
  "status": "active",
  "variants": [
    {
      "id": "df27900a-9498-4bb9-af8d-5bc02f71ddf9",
      "color": "Noir",
      "colorCode": "#000000",
      "ean": "6936520876846",
      "stock": 0,
      "is_default": true,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": "8/256",
      "size": null
    },
    {
      "id": "c9cec024-d9a9-4d21-b859-8efca0047218",
      "color": "Gold",
      "colorCode": "#FFD700",
      "ean": "6936520876853",
      "stock": 0,
      "is_default": false,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": "8/256",
      "size": null
    }
  ],
  "rating": {
    "average": 0,
    "count": 0,
    "distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "reviews": []
  }
},
{
  "id": "0eb7fc68-f813-483e-93fe-33cec70236be",
  "airtableId": "0eb7fc68-f813-483e-93fe-33cec70236be",
  "sku": "SKU-0122",
  "name": "HONOR 400 LITE 5G 8+8",
  "urlSlug": "honor-400-lite-5g-8-8",
  "shortDescription": "Smartphone HONOR 400 Lite 5G avec écran AMOLED 120Hz, appareil photo 108 MP et charge 35W",
  "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">HONOR 400 Lite 5G - La photo 108 MP en AMOLED</h3>\n  <p class=\"text-gray-700 mb-4\">Le HONOR 400 Lite 5G repousse les limites du milieu de gamme avec son écran AMOLED 120 Hz de 6,7 pouces d'une luminosité éclatante de 3500 nits et son capteur photo principal de 108 MP avec zoom sans perte 3x.</p>\n  <p class=\"text-gray-700 mb-4\">Propulsé par le Dimensity 7025 Ultra et 8+8 Go de RAM (dont 8 Go de RAM virtuelle), il assure une fluidité exemplaire en multitâche et en jeu. Sa finesse de 7,3 mm et son poids plume de 171 g en font l'un des smartphones les plus élégants de sa catégorie.</p>\n  <p class=\"text-gray-700\">Certifié IP65 et équipé d'un capteur d'empreintes sous l'écran, il fonctionne sous Android 15 avec MagicOS 9.0 et la connectivité 5G pour des performances sans compromis.</p>\n</div>",
  "originalPrice": 299.9,
  "basePrice": 249.9,
  "discountPercent": 0,
  "brandId": "0787543a-2ab3-4c65-850d-9abb59ca4d4c",
  "brandName": "HONOR",
  "brandSlug": "honor",
  "categoryId": "80194285-ea90-40ff-8e2a-8edbe3609330",
  "categoryName": "Smartphones",
  "categorySlug": "smartphones",
  "features": [
    "Écran AMOLED 6.7\" 120Hz, 3500 nits",
    "Appareil photo 108 MP + zoom 3x",
    "5G Dimensity 7025 Ultra",
    "8+8 Go RAM virtuelle",
    "Certifié IP65"
  ],
  "specifications": [
    {
      "label": "Écran",
      "value": "6.7\" AMOLED FHD+ 1080x2412, 120 Hz, 3500 nits, DCI-P3"
    },
    {
      "label": "Processeur",
      "value": "MediaTek Dimensity 7025 Ultra, Octa-core 2.5 GHz, 6 nm"
    },
    {
      "label": "RAM",
      "value": "8 Go + 8 Go RAM virtuelle"
    },
    {
      "label": "Stockage",
      "value": "256 Go"
    },
    {
      "label": "Batterie",
      "value": "5230 mAh, charge rapide 35W HONOR SuperCharge"
    },
    {
      "label": "Caméra arrière",
      "value": "108 MP Samsung HM6 (f/1.75, zoom 3x) + 5 MP ultra-grand-angle"
    },
    {
      "label": "Caméra avant",
      "value": "16 MP (f/2.45)"
    },
    {
      "label": "Système",
      "value": "Android 15 + MagicOS 9.0"
    },
    {
      "label": "Connectivité",
      "value": "5G, 4G LTE, WiFi 5 MIMO, Bluetooth 5.3, NFC, USB-C"
    },
    {
      "label": "Résistance",
      "value": "IP65"
    },
    {
      "label": "Dimensions",
      "value": "161.0 x 74.6 x 7.3 mm"
    },
    {
      "label": "Poids",
      "value": "171 g"
    },
    {
      "label": "Sécurité",
      "value": "Capteur d'empreintes sous l'écran"
    }
  ],
  "repairabilityIndex": 8.3,
  "dasHead": "0,85 W/kg",
  "dasBody": "1,30 W/kg",
  "dasLimb": "2,95 W/kg",
  "energyClass": "",
  "tags": [],
  "isFeatured": false,
  "isNewArrival": true,
  "showOnHomepage": false,
  "status": "active",
  "variants": [
    {
      "id": "11ffb09c-3e24-4181-bec1-8dfdf2b359db",
      "color": "Noir",
      "colorCode": "#000000",
      "ean": "6936520868216",
      "stock": 0,
      "is_default": true,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": "8+8/256",
      "size": null
    },
    {
      "id": "256c391e-a0cc-43b4-903f-8d28db36c0c8",
      "color": "Vert",
      "colorCode": "#2E8B57",
      "ean": "6936520868230",
      "stock": 0,
      "is_default": false,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": "8+8/256",
      "size": null
    }
  ],
  "rating": {
    "average": 0,
    "count": 0,
    "distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "reviews": []
  }
},
{
  "id": "129305f4-953e-4094-8677-0db6b4098d06",
  "airtableId": "129305f4-953e-4094-8677-0db6b4098d06",
  "sku": "SKU-0123",
  "name": "HONOR X9D 12+",
  "urlSlug": "honor-x9d-12",
  "shortDescription": "Smartphone HONOR X9D avec batterie 8300 mAh, écran AMOLED QHD 6000 nits et IP68/IP69K",
  "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">HONOR X9D - Endurance extrême et robustesse IP69K</h3>\n  <p class=\"text-gray-700 mb-4\">Le HONOR X9D est taillé pour l'endurance extrême avec sa batterie colossale de 8300 mAh et sa charge rapide 66W. Son écran AMOLED QHD de 6,79 pouces offre une luminosité record de 6000 nits pour une visibilité parfaite en toute condition.</p>\n  <p class=\"text-gray-700 mb-4\">Certifié IP68/IP69K, il résiste à l'immersion jusqu'à 6 mètres et aux jets d'eau haute pression, ce qui en fait l'un des smartphones les plus robustes du marché.</p>\n  <p class=\"text-gray-700\">Le Snapdragon 6 Gen 4 gravé en 4 nm avec GPU Adreno 810, 12 Go de RAM et l'appareil photo 108 MP avec OIS complètent un ensemble haut de gamme à prix contenu.</p>\n</div>",
  "originalPrice": null,
  "basePrice": 389.9,
  "discountPercent": 0,
  "brandId": "0787543a-2ab3-4c65-850d-9abb59ca4d4c",
  "brandName": "HONOR",
  "brandSlug": "honor",
  "categoryId": "80194285-ea90-40ff-8e2a-8edbe3609330",
  "categoryName": "Smartphones",
  "categorySlug": "smartphones",
  "features": [
    "Batterie 8300 mAh + charge 66W",
    "Écran AMOLED QHD 6000 nits",
    "IP68/IP69K ultra-robuste",
    "Snapdragon 6 Gen 4 (4 nm)",
    "Appareil photo 108 MP OIS"
  ],
  "specifications": [
    {
      "label": "Écran",
      "value": "6.79\" AMOLED QHD 1200x2640, 120 Hz, 6000 nits"
    },
    {
      "label": "Processeur",
      "value": "Qualcomm Snapdragon 6 Gen 4, Octa-core, 4 nm, GPU Adreno 810"
    },
    {
      "label": "RAM",
      "value": "12 Go"
    },
    {
      "label": "Stockage",
      "value": "256 Go"
    },
    {
      "label": "Batterie",
      "value": "8300 mAh, charge rapide 66W, charge inversée filaire"
    },
    {
      "label": "Caméra arrière",
      "value": "108 MP Samsung HM6 (OIS, zoom 10x) + 5 MP ultra-grand-angle"
    },
    {
      "label": "Caméra avant",
      "value": "16 MP (punch-hole)"
    },
    {
      "label": "Système",
      "value": "Android 15 + MagicOS 9.0"
    },
    {
      "label": "Connectivité",
      "value": "5G, WiFi 6, Bluetooth 5.2 (aptX HD), NFC, USB-C"
    },
    {
      "label": "Résistance",
      "value": "IP68 + IP69K (immersion 6m + jets haute pression)"
    },
    {
      "label": "Dimensions",
      "value": "161.9 x 76.1 x 7.8 mm"
    },
    {
      "label": "Poids",
      "value": "193 g"
    },
    {
      "label": "Vidéo",
      "value": "Enregistrement 4K"
    }
  ],
  "repairabilityIndex": null,
  "dasHead": null,
  "dasBody": null,
  "dasLimb": null,
  "energyClass": "",
  "tags": [],
  "isFeatured": false,
  "isNewArrival": true,
  "showOnHomepage": false,
  "status": "active",
  "variants": [
    {
      "id": "2dabd72e-6217-405b-af99-eb34d1572c94",
      "color": "Noir",
      "colorCode": "#000000",
      "ean": "6936520881130",
      "stock": 0,
      "is_default": true,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": "12/256",
      "size": null
    },
    {
      "id": "2ec54771-b7c4-44ac-a723-2d5d444a3113",
      "color": "Gold",
      "colorCode": "#FFD700",
      "ean": "6936520881154",
      "stock": 0,
      "is_default": false,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": "12/256",
      "size": null
    }
  ],
  "rating": {
    "average": 0,
    "count": 0,
    "distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "reviews": []
  }
},
{
  "id": "61ad1e11-8b8f-4be2-891c-25ac5bae2860",
  "airtableId": "61ad1e11-8b8f-4be2-891c-25ac5bae2860",
  "sku": "SKU-0124",
  "name": "HONOR PAD 10",
  "urlSlug": "honor-pad-10",
  "shortDescription": "Tablette HONOR Pad 10 avec écran 12.1\" 2.5K 120Hz, Snapdragon 7 Gen 3 et 6 haut-parleurs",
  "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">HONOR Pad 10 - Grand écran 2.5K et son immersif</h3>\n  <p class=\"text-gray-700 mb-4\">La HONOR Pad 10 est une tablette multimédia polyvalente dotée d'un grand écran 2.5K de 12,1 pouces à 120 Hz, idéal pour le divertissement et la productivité.</p>\n  <p class=\"text-gray-700 mb-4\">Propulsée par le Snapdragon 7 Gen 3 (4 nm) et équipée de 6 haut-parleurs avec HONOR Spatial Audio, elle offre une expérience audiovisuelle immersive. Compatible avec le stylet HONOR Magic Pencil 3 pour la prise de notes et le dessin.</p>\n  <p class=\"text-gray-700\">Sa batterie de 10 100 mAh avec charge rapide 35W garantit une autonomie exceptionnelle. Son design en métal ultra-fin de seulement 6,29 mm d'épaisseur et 525 g en font un compagnon portable et élégant.</p>\n</div>",
  "originalPrice": 299.9,
  "basePrice": 249.9,
  "discountPercent": 0,
  "brandId": "0787543a-2ab3-4c65-850d-9abb59ca4d4c",
  "brandName": "HONOR",
  "brandSlug": "honor",
  "categoryId": "d5a2e3f4-9b8c-4d7e-8f1a-2b3c4d5e6f7a",
  "categoryName": "Tablettes",
  "categorySlug": "tablettes",
  "features": [
    "Écran 12.1\" 2.5K 120Hz",
    "6 haut-parleurs Spatial Audio",
    "Snapdragon 7 Gen 3 (4 nm)",
    "Batterie 10 100 mAh + charge 35W",
    "Compatible HONOR Magic Pencil 3"
  ],
  "specifications": [
    {
      "label": "Écran",
      "value": "12.1\" IPS LCD 2.5K (2560x1600), 120 Hz, 500 nits, DCI-P3"
    },
    {
      "label": "Processeur",
      "value": "Qualcomm Snapdragon 7 Gen 3, Octa-core 2.63 GHz, 4 nm"
    },
    {
      "label": "RAM",
      "value": "8 Go"
    },
    {
      "label": "Stockage",
      "value": "256 Go (UFS 3.1)"
    },
    {
      "label": "Batterie",
      "value": "10 100 mAh, charge rapide 35W HONOR SuperCharge"
    },
    {
      "label": "Caméra arrière",
      "value": "8 MP (f/2.0)"
    },
    {
      "label": "Caméra avant",
      "value": "8 MP (f/2.0)"
    },
    {
      "label": "Système",
      "value": "Android 15 + MagicOS 9.0"
    },
    {
      "label": "Audio",
      "value": "6 haut-parleurs, HONOR Spatial Audio, 2 microphones"
    },
    {
      "label": "Connectivité",
      "value": "WiFi 6, Bluetooth 5.3, USB-C (WiFi uniquement)"
    },
    {
      "label": "Dimensions",
      "value": "277.07 x 179.28 x 6.29 mm"
    },
    {
      "label": "Poids",
      "value": "525 g"
    },
    {
      "label": "Matériaux",
      "value": "Corps métal"
    }
  ],
  "repairabilityIndex": 8.1,
  "dasHead": null,
  "dasBody": null,
  "dasLimb": null,
  "energyClass": "",
  "tags": [],
  "isFeatured": false,
  "isNewArrival": true,
  "showOnHomepage": false,
  "status": "active",
  "variants": [
    {
      "id": "ec0fad6e-0ee9-4311-8578-eb96e99b344e",
      "color": "Gris",
      "colorCode": "#808080",
      "ean": "6936520869718",
      "stock": 0,
      "is_default": true,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    }
  ],
  "rating": {
    "average": 0,
    "count": 0,
    "distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "reviews": []
  }
},
{
  "id": "9c689b89-49eb-4391-a7b7-1b6a2fc459b9",
  "airtableId": "9c689b89-49eb-4391-a7b7-1b6a2fc459b9",
  "sku": "SKU-0125",
  "name": "ECOUTEUR HONOR CHOICE EARBUDS X5",
  "urlSlug": "ecouteur-honor-choice-earbuds-x5",
  "shortDescription": "Écouteurs TWS HONOR Choice Earbuds X5 avec ANC 30 dB, Bluetooth 5.3 et 35h d'autonomie",
  "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">HONOR Choice Earbuds X5 - ANC et autonomie record</h3>\n  <p class=\"text-gray-700 mb-4\">Les HONOR Choice Earbuds X5 offrent une expérience audio immersive grâce à leur réduction active du bruit de 30 dB et leurs haut-parleurs dynamiques de 10 mm.</p>\n  <p class=\"text-gray-700 mb-4\">Avec une autonomie totale de 35 heures grâce au boîtier de charge et une certification IP54, ils accompagnent facilement toutes vos activités quotidiennes.</p>\n  <p class=\"text-gray-700\">Le Bluetooth 5.3 assure une connexion stable et économe en énergie, tandis que la double technologie micro ENC garantit des appels clairs même en environnement bruyant. Ultra-légers à seulement 4,26 g par écouteur.</p>\n</div>",
  "originalPrice": null,
  "basePrice": 34.9,
  "discountPercent": 0,
  "brandId": "0787543a-2ab3-4c65-850d-9abb59ca4d4c",
  "brandName": "HONOR",
  "brandSlug": "honor",
  "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
  "categoryName": "Audio",
  "categorySlug": "audio",
  "features": [
    "ANC 30 dB + mode transparence",
    "Bluetooth 5.3",
    "35h d'autonomie totale",
    "IP54 résistant eau/poussière",
    "Ultra-léger : 4.26g par écouteur"
  ],
  "specifications": [
    {
      "label": "Type",
      "value": "TWS intra-auriculaires"
    },
    {
      "label": "Transducteur",
      "value": "10 mm dynamique (32 ohm)"
    },
    {
      "label": "ANC",
      "value": "Réduction active du bruit jusqu'à 30 dB + mode transparence"
    },
    {
      "label": "Bluetooth",
      "value": "5.3 dual-mode (AAC, SBC)"
    },
    {
      "label": "Autonomie",
      "value": "9h (ANC off) / 35h total avec boîtier"
    },
    {
      "label": "Batterie écouteur",
      "value": "45 mAh par écouteur"
    },
    {
      "label": "Batterie boîtier",
      "value": "460 mAh"
    },
    {
      "label": "Charge",
      "value": "USB-C"
    },
    {
      "label": "Étanchéité",
      "value": "IP54"
    },
    {
      "label": "Microphone",
      "value": "Double micro ENC"
    },
    {
      "label": "Poids",
      "value": "4.26 g par écouteur"
    },
    {
      "label": "Dimensions boîtier",
      "value": "58.9 x 58.9 x 24.3 mm"
    }
  ],
  "repairabilityIndex": null,
  "dasHead": null,
  "dasBody": null,
  "dasLimb": null,
  "energyClass": "",
  "tags": [],
  "isFeatured": false,
  "isNewArrival": true,
  "showOnHomepage": false,
  "status": "active",
  "variants": [
    {
      "id": "70d6a897-7a1c-4c26-a5fc-4fcfb9c52b66",
      "color": "Blanc",
      "colorCode": "#FFFFFF",
      "ean": "6975840260126",
      "stock": 0,
      "is_default": true,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    }
  ],
  "rating": {
    "average": 0,
    "count": 0,
    "distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "reviews": []
  }
},
{
  "id": "0d32ff6e-3b63-4379-b261-d3a0b04f1e99",
  "airtableId": "0d32ff6e-3b63-4379-b261-d3a0b04f1e99",
  "sku": "SKU-0126",
  "name": "ADAPTATEUR UNIVERSEL DE VOYAGE MY WAY",
  "urlSlug": "adaptateur-universel-voyage-my-way",
  "shortDescription": "Adaptateur de voyage universel compatible 150+ pays avec fusible de protection intégré",
  "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">Adaptateur Universel de Voyage My Way</h3>\n  <p class=\"text-gray-700 mb-4\">L'adaptateur universel de voyage My Way vous accompagne partout dans le monde. Compatible avec les prises de plus de 150 pays (Europe, USA, Royaume-Uni, Australie), il vous permet de brancher vos appareils en toute sécurité grâce à son fusible de protection intégré.</p>\n  <p class=\"text-gray-700\">Son format compact et son design coulissant tout-en-un en font le compagnon idéal de tous vos déplacements professionnels et personnels.</p>\n</div>",
  "originalPrice": null,
  "basePrice": 14.9,
  "discountPercent": 0,
  "brandId": "a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
  "brandName": "MY WAY",
  "brandSlug": "my-way",
  "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
  "categoryName": "Accessoires",
  "categorySlug": "accessoires",
  "features": [
    "Compatible 150+ pays (EU/US/UK/AUS)",
    "Fusible de protection 8A intégré",
    "Design compact coulissant",
    "100-240V AC, 50/60Hz"
  ],
  "specifications": [
    {
      "label": "Compatibilité",
      "value": "Prises EU, US, UK, AUS (150+ pays)"
    },
    {
      "label": "Tension d'entrée",
      "value": "100-240V AC, 50/60Hz"
    },
    {
      "label": "Courant max",
      "value": "8A"
    },
    {
      "label": "Puissance max",
      "value": "880W (110V) / 1840W (230V)"
    },
    {
      "label": "Fusible",
      "value": "8A intégré"
    },
    {
      "label": "Matériau",
      "value": "ABS ignifuge"
    },
    {
      "label": "Poids",
      "value": "~120 g"
    }
  ],
  "repairabilityIndex": null,
  "dasHead": null,
  "dasBody": null,
  "dasLimb": null,
  "energyClass": "",
  "tags": [],
  "isFeatured": false,
  "isNewArrival": true,
  "showOnHomepage": false,
  "status": "active",
  "variants": [
    {
      "id": "f32aa6c4-7b88-48cf-9110-6a252c7f28a1",
      "color": "Blanc",
      "colorCode": "#FFFFFF",
      "ean": "3663111197716",
      "stock": 0,
      "is_default": true,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    }
  ],
  "rating": {
    "average": 0,
    "count": 0,
    "distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "reviews": []
  }
},
{
  "id": "ade860ad-0614-4ac3-b4ca-a269ce4ff213",
  "airtableId": "ade860ad-0614-4ac3-b4ca-a269ce4ff213",
  "sku": "SKU-0127",
  "name": "HUB USB C 6 EN 1 MUVIT HDMI",
  "urlSlug": "hub-usb-c-6-en-1-muvit-hdmi",
  "shortDescription": "Hub USB-C 6-en-1 Muvit avec HDMI 4K@60Hz, USB-C PD 100W, 2 USB-A et lecteur SD",
  "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">Hub USB-C 6-en-1 Muvit For Change</h3>\n  <p class=\"text-gray-700 mb-4\">Le Hub USB-C 6-en-1 Muvit For Change transforme votre port USB-C en une station de connectivité complète. Profitez d'une sortie HDMI 4K à 60Hz, de deux ports USB-A, d'un lecteur de cartes SD/Micro SD et d'une recharge USB-C Power Delivery 100W.</p>\n  <p class=\"text-gray-700\">Le tout dans un boîtier compact en aluminium et plastique recyclé, conçu dans une démarche éco-responsable. Plug & Play, aucun pilote nécessaire.</p>\n</div>",
  "originalPrice": null,
  "basePrice": 34.9,
  "discountPercent": 0,
  "brandId": "5b8a13ee-afad-4e68-b2c0-5d7922d91f5d",
  "brandName": "MUVIT",
  "brandSlug": "muvit",
  "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
  "categoryName": "Accessoires",
  "categorySlug": "accessoires",
  "features": [
    "HDMI 4K @ 60Hz",
    "USB-C PD 100W pass-through",
    "2 ports USB-A (3.0 + 2.0)",
    "Lecteur SD + Micro SD",
    "Plastique 100% recyclé"
  ],
  "specifications": [
    {
      "label": "Entrée",
      "value": "USB-C"
    },
    {
      "label": "Sortie vidéo",
      "value": "HDMI Ultra HD 4K @ 60Hz"
    },
    {
      "label": "USB-C",
      "value": "Power Delivery 100W (pass-through)"
    },
    {
      "label": "USB-A 1",
      "value": "USB 3.0 (5 Gb/s)"
    },
    {
      "label": "USB-A 2",
      "value": "USB 2.0 (480 Mb/s)"
    },
    {
      "label": "Lecteur cartes",
      "value": "SD + Micro SD / TF"
    },
    {
      "label": "Matériaux",
      "value": "Aluminium + plastique TPE & ABS 100% recyclé"
    },
    {
      "label": "Compatibilité",
      "value": "MacBook Pro/Air, PC USB-C, tablettes, Samsung DeX"
    }
  ],
  "repairabilityIndex": null,
  "dasHead": null,
  "dasBody": null,
  "dasLimb": null,
  "energyClass": "",
  "tags": [],
  "isFeatured": false,
  "isNewArrival": true,
  "showOnHomepage": false,
  "status": "active",
  "variants": [
    {
      "id": "68caa3aa-8dc6-4573-ae82-c2b25911993a",
      "color": "Gris",
      "colorCode": "#808080",
      "ean": "3663111197068",
      "stock": 0,
      "is_default": true,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    }
  ],
  "rating": {
    "average": 0,
    "count": 0,
    "distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "reviews": []
  }
},
{
  "id": "32ff2134-cb4e-456b-a78f-1b32827835f1",
  "airtableId": "32ff2134-cb4e-456b-a78f-1b32827835f1",
  "sku": "SKU-0128",
  "name": "HUB USB C 3 EN 1 MUVIT HDMI",
  "urlSlug": "hub-usb-c-3-en-1-muvit-hdmi",
  "shortDescription": "Hub USB-C 3-en-1 Muvit avec HDMI 4K@30Hz, USB-A 3.0 et USB-C PD",
  "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">Hub USB-C 3-en-1 Muvit HDMI</h3>\n  <p class=\"text-gray-700 mb-4\">L'adaptateur USB-C 3-en-1 Muvit vous offre l'essentiel de la connectivité : une sortie HDMI 4K pour projeter vos contenus sur grand écran, un port USB-A 3.0 pour connecter vos périphériques et un port USB-C Power Delivery pour recharger simultanément votre appareil.</p>\n  <p class=\"text-gray-700\">Compact et léger, il se glisse facilement dans votre sac. Plug & Play, compatible avec tous les appareils USB-C.</p>\n</div>",
  "originalPrice": null,
  "basePrice": 24.9,
  "discountPercent": 0,
  "brandId": "5b8a13ee-afad-4e68-b2c0-5d7922d91f5d",
  "brandName": "MUVIT",
  "brandSlug": "muvit",
  "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
  "categoryName": "Accessoires",
  "categorySlug": "accessoires",
  "features": [
    "HDMI 4K @ 30Hz",
    "USB-A 3.0 (5 Gb/s)",
    "USB-C PD pass-through",
    "Compact et Plug & Play"
  ],
  "specifications": [
    {
      "label": "Entrée",
      "value": "USB-C mâle"
    },
    {
      "label": "Sortie vidéo",
      "value": "HDMI 4K @ 30Hz"
    },
    {
      "label": "USB-A",
      "value": "USB 3.0 (5 Gb/s)"
    },
    {
      "label": "USB-C",
      "value": "Power Delivery pass-through (jusqu'à 100W)"
    },
    {
      "label": "Câble intégré",
      "value": "~15 cm"
    },
    {
      "label": "Compatibilité",
      "value": "MacBook, PC USB-C, tablettes, Samsung DeX"
    }
  ],
  "repairabilityIndex": null,
  "dasHead": null,
  "dasBody": null,
  "dasLimb": null,
  "energyClass": "",
  "tags": [],
  "isFeatured": false,
  "isNewArrival": true,
  "showOnHomepage": false,
  "status": "active",
  "variants": [
    {
      "id": "2150fb40-0bd4-44e7-9cad-0ed7d830e559",
      "color": "Gris",
      "colorCode": "#808080",
      "ean": "3663111197044",
      "stock": 0,
      "is_default": true,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    }
  ],
  "rating": {
    "average": 0,
    "count": 0,
    "distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "reviews": []
  }
},
{
  "id": "67f3c962-2cf5-42bc-a49a-5e18a465f717",
  "airtableId": "67f3c962-2cf5-42bc-a49a-5e18a465f717",
  "sku": "SKU-0129",
  "name": "CHARGEUR TIGER POWER GAN 65W 2 USB C",
  "urlSlug": "chargeur-tiger-power-gan-65w-2-usb-c",
  "shortDescription": "Chargeur GaN 65W Tiger Power avec 2 ports USB-C, Power Delivery 3.0 et PPS",
  "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">Chargeur Tiger Power GaN 65W - Puissance compacte</h3>\n  <p class=\"text-gray-700 mb-4\">Le chargeur Tiger Power GaN 65W offre une puissance de charge exceptionnelle dans un format ultra-compact de seulement 132g. Grâce à la technologie GaN (Nitrure de Gallium), il délivre jusqu'à 65W via ses deux ports USB-C.</p>\n  <p class=\"text-gray-700 mb-4\">Chargez simultanément un ordinateur portable et un smartphone (45W + 20W). Atteignez 50% de batterie en seulement 30 minutes grâce au protocole Power Delivery 3.0 et PPS.</p>\n  <p class=\"text-gray-700\">Compatible avec MacBook Air/Pro, iPhone, iPad, Samsung Galaxy, Nintendo Switch et tous les appareils USB-C.</p>\n</div>",
  "originalPrice": null,
  "basePrice": 49.9,
  "discountPercent": 0,
  "brandId": "bfada6a7-6a64-4429-b6c5-90b518ad6345",
  "brandName": "TIGER POWER",
  "brandSlug": "tiger-power",
  "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
  "categoryName": "Accessoires",
  "categorySlug": "accessoires",
  "features": [
    "Technologie GaN ultra-compact (132g)",
    "65W de puissance totale",
    "2 ports USB-C simultanés (45W + 20W)",
    "Power Delivery 3.0 + PPS",
    "50% en 30 minutes"
  ],
  "specifications": [
    {
      "label": "Technologie",
      "value": "GaN (Nitrure de Gallium)"
    },
    {
      "label": "Puissance totale",
      "value": "65W"
    },
    {
      "label": "Ports",
      "value": "2x USB-C"
    },
    {
      "label": "Sortie USB-C",
      "value": "5V/3A, 9V/3A, 12V/3A, 15V/3A, 20V/3.25A"
    },
    {
      "label": "PPS",
      "value": "3.3-11V/3A, 3.3-21V/3A"
    },
    {
      "label": "Double sortie",
      "value": "45W + 20W simultané"
    },
    {
      "label": "Entrée",
      "value": "AC 100-240V, 50/60Hz"
    },
    {
      "label": "Dimensions",
      "value": "55 x 35.6 x 91 mm"
    },
    {
      "label": "Poids",
      "value": "132 g"
    },
    {
      "label": "Protocoles",
      "value": "USB Power Delivery 3.0, PPS"
    }
  ],
  "repairabilityIndex": null,
  "dasHead": null,
  "dasBody": null,
  "dasLimb": null,
  "energyClass": "",
  "tags": [],
  "isFeatured": false,
  "isNewArrival": true,
  "showOnHomepage": false,
  "status": "active",
  "variants": [
    {
      "id": "924f4063-f936-4072-8b31-92f0dbff7e35",
      "color": "Blanc",
      "colorCode": "#FFFFFF",
      "ean": "3663111183887",
      "stock": 0,
      "is_default": true,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    }
  ],
  "rating": {
    "average": 0,
    "count": 0,
    "distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "reviews": []
  }
},
{
  "id": "f0eb2ed2-d277-4f56-b18e-95f20bcf36f2",
  "airtableId": "f0eb2ed2-d277-4f56-b18e-95f20bcf36f2",
  "sku": "SKU-0130",
  "name": "PACK MUVIT RECHARGE VOITURE + 8 ADAPTATEURS",
  "urlSlug": "pack-muvit-recharge-voiture-8-adaptateurs",
  "shortDescription": "Pack de charge universel Muvit avec chargeur secteur, allume-cigare et 8 connecteurs",
  "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">Pack Muvit Recharge Universel</h3>\n  <p class=\"text-gray-700 mb-4\">Le Pack Muvit Recharge Universel est la solution de charge tout-en-un pour tous vos appareils mobiles. Comprenant un chargeur secteur, un chargeur voiture allume-cigare et 8 connecteurs universels, il permet de recharger tous les téléphones portables, que ce soit à la maison, au bureau ou en voiture.</p>\n  <p class=\"text-gray-700\">Le tout est livré dans une pratique pochette en daim pour un transport facile et organisé.</p>\n</div>",
  "originalPrice": null,
  "basePrice": 19.9,
  "discountPercent": 0,
  "brandId": "5b8a13ee-afad-4e68-b2c0-5d7922d91f5d",
  "brandName": "MUVIT",
  "brandSlug": "muvit",
  "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
  "categoryName": "Accessoires",
  "categorySlug": "accessoires",
  "features": [
    "Chargeur secteur + allume-cigare inclus",
    "8 connecteurs universels",
    "Compatible téléphones depuis 2007",
    "Pochette de rangement fournie"
  ],
  "specifications": [
    {
      "label": "Chargeur secteur",
      "value": "1x USB, 100-240V AC"
    },
    {
      "label": "Chargeur voiture",
      "value": "Allume-cigare 12V/24V, 1x USB"
    },
    {
      "label": "Connecteurs",
      "value": "8 (Mini USB, Micro USB, Lightning, etc.)"
    },
    {
      "label": "Sortie USB",
      "value": "5V / 1A"
    },
    {
      "label": "Accessoire",
      "value": "Pochette en daim"
    }
  ],
  "repairabilityIndex": null,
  "dasHead": null,
  "dasBody": null,
  "dasLimb": null,
  "energyClass": "",
  "tags": [],
  "isFeatured": false,
  "isNewArrival": true,
  "showOnHomepage": false,
  "status": "active",
  "variants": [
    {
      "id": "e75a04f2-fa18-4440-aec1-40fef0b96ce3",
      "color": "Noir",
      "colorCode": "#000000",
      "ean": "3700615001054",
      "stock": 0,
      "is_default": true,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    }
  ],
  "rating": {
    "average": 0,
    "count": 0,
    "distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "reviews": []
  }
},

{
  "id": "2d60c8e2-cce3-48fd-b93e-94f91fb5aac6",
  "airtableId": "2d60c8e2-cce3-48fd-b93e-94f91fb5aac6",
  "sku": "SKU-0132",
  "name": "MONSTER CABLE ESSENTIAL JACK 3.5MM/2 RCA 1.5M",
  "urlSlug": "monster-cable-essential-jack-3-5mm-2-rca-1-5m",
  "shortDescription": "Câble audio Monster Essentials Jack 3.5mm vers 2 RCA, 1.5m, OFC plaqué or",
  "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER CABLE ESSENTIAL JACK 3.5MM/2 RCA 1.5M</h3>\n  <p class=\"text-gray-700 mb-4\">Le câble Monster Essentials offre une connexion audio haute fidélité grâce à ses conducteurs en cuivre OFC (Oxygen-Free Copper) et ses connecteurs plaqués or 24K résistants à la corrosion.</p>\n  <p class=\"text-gray-700\">Sa gaine Duraflex Monster résiste à l'abrasion et aux torsions pour une durabilité exceptionnelle au quotidien. Idéal pour relier vos sources audio à vos équipements Hi-Fi, enceintes ou casques.</p>\n</div>",
  "originalPrice": null,
  "basePrice": 9.9,
  "discountPercent": 0,
  "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
  "brandName": "MONSTER",
  "brandSlug": "monster",
  "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
  "categoryName": "Accessoires",
  "categorySlug": "accessoires",
  "features": [
    "Conducteurs OFC (cuivre désoxygéné)",
    "Connecteurs plaqués or 24K",
    "Gaine Duraflex résistante",
    "Garantie Monster"
  ],
  "specifications": [
    {
      "label": "Connecteurs",
      "value": "Jack 3.5mm mâle vers 2x RCA mâle"
    },
    {
      "label": "Longueur",
      "value": "1.50 m"
    },
    {
      "label": "Conducteurs",
      "value": "OFC (Oxygen-Free Copper)"
    },
    {
      "label": "Connecteurs",
      "value": "Plaqués or 24K"
    },
    {
      "label": "Gaine",
      "value": "Duraflex Monster"
    }
  ],
  "repairabilityIndex": null,
  "dasHead": null,
  "dasBody": null,
  "dasLimb": null,
  "energyClass": "",
  "tags": [],
  "isFeatured": false,
  "isNewArrival": true,
  "showOnHomepage": false,
  "status": "active",
  "variants": [
    {
      "id": "01cf818d-b2dd-4f72-952f-110cc0b623b7",
      "color": "Noir",
      "colorCode": "#000000",
      "ean": "850015401428",
      "stock": 0,
      "is_default": true,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    }
  ],
  "rating": {
    "average": 0,
    "count": 0,
    "distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "reviews": []
  }
},
{
  "id": "4742f6a0-8dcb-4807-862a-aaaef9b80dc7",
  "airtableId": "4742f6a0-8dcb-4807-862a-aaaef9b80dc7",
  "sku": "SKU-0133",
  "name": "MONSTER CABLE ESSENTIAL RCA/RCA M/M 1.5M",
  "urlSlug": "monster-cable-essential-rca-rca-m-m-1-5m",
  "shortDescription": "Câble audio Monster Essentials RCA mâle/mâle, 1.5m, double blindage OFC",
  "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER CABLE ESSENTIAL RCA/RCA M/M 1.5M</h3>\n  <p class=\"text-gray-700 mb-4\">Le câble Monster Essentials offre une connexion audio haute fidélité grâce à ses conducteurs en cuivre OFC (Oxygen-Free Copper) et ses connecteurs plaqués or 24K résistants à la corrosion.</p>\n  <p class=\"text-gray-700\">Sa gaine Duraflex Monster résiste à l'abrasion et aux torsions pour une durabilité exceptionnelle au quotidien. Idéal pour relier vos sources audio à vos équipements Hi-Fi, enceintes ou casques.</p>\n</div>",
  "originalPrice": null,
  "basePrice": 12.9,
  "discountPercent": 0,
  "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
  "brandName": "MONSTER",
  "brandSlug": "monster",
  "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
  "categoryName": "Accessoires",
  "categorySlug": "accessoires",
  "features": [
    "Conducteurs OFC (cuivre désoxygéné)",
    "Connecteurs plaqués or 24K",
    "Gaine Duraflex résistante",
    "Garantie Monster"
  ],
  "specifications": [
    {
      "label": "Connecteurs",
      "value": "RCA mâle vers RCA mâle"
    },
    {
      "label": "Longueur",
      "value": "1.50 m"
    },
    {
      "label": "Conducteurs",
      "value": "OFC (Oxygen-Free Copper)"
    },
    {
      "label": "Connecteurs",
      "value": "Plaqués or 24K"
    },
    {
      "label": "Gaine",
      "value": "Duraflex Monster"
    }
  ],
  "repairabilityIndex": null,
  "dasHead": null,
  "dasBody": null,
  "dasLimb": null,
  "energyClass": "",
  "tags": [],
  "isFeatured": false,
  "isNewArrival": true,
  "showOnHomepage": false,
  "status": "active",
  "variants": [
    {
      "id": "e8534099-d0a8-4de0-a0dd-3371c347f7de",
      "color": "Noir",
      "colorCode": "#000000",
      "ean": "850015401053",
      "stock": 0,
      "is_default": true,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    }
  ],
  "rating": {
    "average": 0,
    "count": 0,
    "distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "reviews": []
  }
},
{
  "id": "17052c40-b503-442a-8d9d-cd2f00563831",
  "airtableId": "17052c40-b503-442a-8d9d-cd2f00563831",
  "sku": "SKU-0134",
  "name": "MONSTER CABLE ESSENTIAL JACK 3.5 M/M 1.5M",
  "urlSlug": "monster-cable-essential-jack-3-5-m-m-1-5m",
  "shortDescription": "Câble audio Monster Essentials Jack 3.5mm mâle/mâle, 1.5m, OFC plaqué or",
  "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER CABLE ESSENTIAL JACK 3.5 M/M 1.5M</h3>\n  <p class=\"text-gray-700 mb-4\">Le câble Monster Essentials offre une connexion audio haute fidélité grâce à ses conducteurs en cuivre OFC (Oxygen-Free Copper) et ses connecteurs plaqués or 24K résistants à la corrosion.</p>\n  <p class=\"text-gray-700\">Sa gaine Duraflex Monster résiste à l'abrasion et aux torsions pour une durabilité exceptionnelle au quotidien. Idéal pour relier vos sources audio à vos équipements Hi-Fi, enceintes ou casques.</p>\n</div>",
  "originalPrice": null,
  "basePrice": 7.9,
  "discountPercent": 0,
  "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
  "brandName": "MONSTER",
  "brandSlug": "monster",
  "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
  "categoryName": "Accessoires",
  "categorySlug": "accessoires",
  "features": [
    "Conducteurs OFC (cuivre désoxygéné)",
    "Connecteurs plaqués or 24K",
    "Gaine Duraflex résistante",
    "Garantie Monster"
  ],
  "specifications": [
    {
      "label": "Connecteurs",
      "value": "Jack 3.5mm mâle vers Jack 3.5mm mâle"
    },
    {
      "label": "Longueur",
      "value": "1.50 m"
    },
    {
      "label": "Conducteurs",
      "value": "OFC (Oxygen-Free Copper)"
    },
    {
      "label": "Connecteurs",
      "value": "Plaqués or 24K"
    },
    {
      "label": "Gaine",
      "value": "Duraflex Monster"
    }
  ],
  "repairabilityIndex": null,
  "dasHead": null,
  "dasBody": null,
  "dasLimb": null,
  "energyClass": "",
  "tags": [],
  "isFeatured": false,
  "isNewArrival": true,
  "showOnHomepage": false,
  "status": "active",
  "variants": [
    {
      "id": "c20ec98d-e14d-4979-becd-a15c71de57f1",
      "color": "Noir",
      "colorCode": "#000000",
      "ean": "850015401497",
      "stock": 0,
      "is_default": true,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    }
  ],
  "rating": {
    "average": 0,
    "count": 0,
    "distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "reviews": []
  }
},
{
  "id": "f8487aa6-e431-4e91-90b7-b51898b92710",
  "airtableId": "f8487aa6-e431-4e91-90b7-b51898b92710",
  "sku": "SKU-0135",
  "name": "MONSTER CABLE ESSENTIAL REPARTITEUR JACK 3.5MM M/2F 0.15M",
  "urlSlug": "monster-cable-essential-repartiteur-jack-3-5mm-m-2f-0-15m",
  "shortDescription": "Répartiteur audio Monster Essentials Jack 3.5mm mâle vers 2 femelles, 0.15m",
  "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">MONSTER CABLE ESSENTIAL REPARTITEUR JACK 3.5MM M/2F 0.15M</h3>\n  <p class=\"text-gray-700 mb-4\">Le câble Monster Essentials offre une connexion audio haute fidélité grâce à ses conducteurs en cuivre OFC (Oxygen-Free Copper) et ses connecteurs plaqués or 24K résistants à la corrosion.</p>\n  <p class=\"text-gray-700\">Sa gaine Duraflex Monster résiste à l'abrasion et aux torsions pour une durabilité exceptionnelle au quotidien. Idéal pour relier vos sources audio à vos équipements Hi-Fi, enceintes ou casques.</p>\n</div>",
  "originalPrice": null,
  "basePrice": 6.9,
  "discountPercent": 0,
  "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
  "brandName": "MONSTER",
  "brandSlug": "monster",
  "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
  "categoryName": "Accessoires",
  "categorySlug": "accessoires",
  "features": [
    "Conducteurs OFC (cuivre désoxygéné)",
    "Connecteurs plaqués or 24K",
    "Gaine Duraflex résistante",
    "Garantie Monster"
  ],
  "specifications": [
    {
      "label": "Connecteurs",
      "value": "Jack 3.5mm mâle vers 2x Jack 3.5mm femelle"
    },
    {
      "label": "Longueur",
      "value": "0.15 m"
    },
    {
      "label": "Conducteurs",
      "value": "OFC (Oxygen-Free Copper)"
    },
    {
      "label": "Connecteurs",
      "value": "Plaqués or 24K"
    },
    {
      "label": "Gaine",
      "value": "Duraflex Monster"
    }
  ],
  "repairabilityIndex": null,
  "dasHead": null,
  "dasBody": null,
  "dasLimb": null,
  "energyClass": "",
  "tags": [],
  "isFeatured": false,
  "isNewArrival": true,
  "showOnHomepage": false,
  "status": "active",
  "variants": [
    {
      "id": "2ef6eb7c-24ba-47ec-a135-4ff164f599ae",
      "color": "Noir",
      "colorCode": "#000000",
      "ean": "850015401411",
      "stock": 0,
      "is_default": true,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    }
  ],
  "rating": {
    "average": 0,
    "count": 0,
    "distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "reviews": []
  }
},
{
  "id": "2b311ecc-582e-4dfc-9ef0-54669a741f85",
  "airtableId": "2b311ecc-582e-4dfc-9ef0-54669a741f85",
  "sku": "SKU-0136",
  "name": "MONSTER MULTIPRISE PARAFOUDRE 4 PRISES",
  "urlSlug": "monster-multiprise-parafoudre-4-prises",
  "shortDescription": "Multiprise parafoudre Monster 4 prises avec protection 608 Joules et filtration secteur",
  "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">Monster Power - Multiprise Parafoudre 4 Prises</h3>\n  <p class=\"text-gray-700 mb-4\">La multiprise Monster Power 4 prises offre une protection parafoudre de 608 Joules avec la technologie exclusive MOV Fireproof qui protège votre domicile autant que vos équipements grâce à des composants enveloppés de céramique anti-incendie résistant à 750°C.</p>\n  <p class=\"text-gray-700\">Sa filtration du courant électrique élimine les interférences secteur et améliore la qualité de l'image et du son de vos appareils. Garantie Monster à hauteur de 100 000 € sur les équipements connectés.</p>\n</div>",
  "originalPrice": null,
  "basePrice": 24.9,
  "discountPercent": 0,
  "brandId": "491a212f-a6ce-4ca8-ac19-29969c4f1ddb",
  "brandName": "MONSTER",
  "brandSlug": "monster",
  "categoryId": "5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c",
  "categoryName": "Accessoires",
  "categorySlug": "accessoires",
  "features": [
    "Protection parafoudre 608 Joules",
    "Technologie MOV Fireproof",
    "Filtration secteur intégrée",
    "Garantie 100 000 € équipements",
    "Interrupteur On/Off LED"
  ],
  "specifications": [
    {
      "label": "Prises",
      "value": "4 prises protégées (Type E, norme française)"
    },
    {
      "label": "Protection",
      "value": "608 Joules"
    },
    {
      "label": "Technologie",
      "value": "MOV Fireproof (céramique 750°C)"
    },
    {
      "label": "Filtration",
      "value": "Filtration secteur intégrée"
    },
    {
      "label": "Cordon",
      "value": "1.40 m"
    },
    {
      "label": "Interrupteur",
      "value": "On/Off avec témoin LED"
    },
    {
      "label": "Dimensions",
      "value": "70 x 85 x 92 mm"
    },
    {
      "label": "Poids",
      "value": "770 g"
    },
    {
      "label": "Garantie équipements",
      "value": "100 000 €"
    }
  ],
  "repairabilityIndex": null,
  "dasHead": null,
  "dasBody": null,
  "dasLimb": null,
  "energyClass": "",
  "tags": [],
  "isFeatured": false,
  "isNewArrival": true,
  "showOnHomepage": false,
  "status": "active",
  "variants": [
    {
      "id": "997fa643-cf8c-4c71-99e1-d89e62f8352b",
      "color": "Noir",
      "colorCode": "#000000",
      "ean": "850017011410",
      "stock": 0,
      "is_default": true,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    }
  ],
  "rating": {
    "average": 0,
    "count": 0,
    "distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "reviews": []
  }
},
{
  "id": "6844f13b-c5cb-4c20-ba42-b991bafe418a",
  "airtableId": "6844f13b-c5cb-4c20-ba42-b991bafe418a",
  "sku": "SKU-0137",
  "name": "MONTRE HIFUTURE ZONE 3",
  "urlSlug": "montre-hifuture-zone-3",
  "shortDescription": "Montre connectée HiFuture Zone 3 avec écran AMOLED 1.96\", appels Bluetooth et 100+ sports",
  "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">HiFuture Zone 3 - Élégance et performance</h3>\n  <p class=\"text-gray-700 mb-4\">La HiFuture Zone 3 allie élégance et performance avec son écran AMOLED de 1,96 pouces et sa construction en acier inoxydable premium. Suivez votre santé 24/7 avec plus de 100 modes sportifs, le monitoring cardiaque, SpO2 et le suivi du sommeil.</p>\n  <p class=\"text-gray-700\">Passez vos appels directement depuis votre poignet grâce au Bluetooth intégré. Avec 7 jours d'autonomie et une étanchéité IP68, c'est le compagnon idéal pour un quotidien actif et connecté.</p>\n</div>",
  "originalPrice": null,
  "basePrice": 42.9,
  "discountPercent": 0,
  "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
  "brandName": "HIFUTURE",
  "brandSlug": "hifuture",
  "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
  "categoryName": "Montres",
  "categorySlug": "montres",
  "features": [
    "Écran AMOLED 1.96\"",
    "Appels Bluetooth",
    "100+ modes sportifs",
    "IP68 étanche",
    "7 jours d'autonomie"
  ],
  "specifications": [
    {
      "label": "Écran",
      "value": "1.96\" AMOLED"
    },
    {
      "label": "Batterie",
      "value": "350 mAh, ~7 jours d'autonomie"
    },
    {
      "label": "Capteurs santé",
      "value": "Fréquence cardiaque 24/7, SpO2, suivi du sommeil"
    },
    {
      "label": "Sports",
      "value": "100+ modes sportifs"
    },
    {
      "label": "Étanchéité",
      "value": "IP68 (1 ATM)"
    },
    {
      "label": "Bluetooth",
      "value": "Appels Bluetooth intégrés"
    },
    {
      "label": "Application",
      "value": "HiFuture Fit"
    },
    {
      "label": "Compatibilité",
      "value": "iOS 9.0+ / Android 5.0+"
    },
    {
      "label": "Cadrans",
      "value": "100+ cadrans personnalisables"
    },
    {
      "label": "Boîtier",
      "value": "Acier inoxydable + bracelet silicone"
    },
    {
      "label": "Dimensions",
      "value": "45.7 x 38.6 x 11.8 mm"
    }
  ],
  "repairabilityIndex": null,
  "dasHead": null,
  "dasBody": null,
  "dasLimb": null,
  "energyClass": "",
  "tags": [],
  "isFeatured": false,
  "isNewArrival": true,
  "showOnHomepage": false,
  "status": "active",
  "variants": [
    {
      "id": "b6cbff5f-2a84-4c24-913a-824edc1ca716",
      "color": "Noir",
      "colorCode": "#000000",
      "ean": "6972576183002",
      "stock": 0,
      "is_default": true,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    },
    {
      "id": "4d18d4a3-29dd-47eb-8bd6-17d8f27eac94",
      "color": "Gris",
      "colorCode": "#808080",
      "ean": "6972576183019",
      "stock": 0,
      "is_default": false,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    },
    {
      "id": "0564fe0d-a599-4ab3-bcca-b2609574fe54",
      "color": "Rose Gold",
      "colorCode": "#B76E79",
      "ean": "6972576183026",
      "stock": 0,
      "is_default": false,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    }
  ],
  "rating": {
    "average": 0,
    "count": 0,
    "distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "reviews": []
  }
},

{
  "id": "4d61dfbb-bfbe-45bf-9f82-5fd6e3106abb",
  "airtableId": "4d61dfbb-bfbe-45bf-9f82-5fd6e3106abb",
  "sku": "SKU-0139",
  "name": "MONTRE HIFUTURE GO PRO 2",
  "urlSlug": "montre-hifuture-go-pro-2",
  "shortDescription": "Montre connectée HiFuture GO PRO 2 avec écran AMOLED 1.32\" rond et design acier inoxydable",
  "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">HiFuture GO PRO 2 - Élégance horlogère connectée</h3>\n  <p class=\"text-gray-700 mb-4\">Inspirée du savoir-faire horloger suisse, la HiFuture GO PRO 2 est une montre connectée premium en acier inoxydable avec un écran AMOLED de 1,32 pouces d'une clarté exceptionnelle (360x360px).</p>\n  <p class=\"text-gray-700\">Propulsée par l'intelligence Syntra AI et un processeur dual-core, elle offre un suivi santé complet avec jusqu'à 10 jours d'autonomie grâce à sa batterie de 430 mAh. Un accessoire raffiné qui allie élégance classique et technologie moderne.</p>\n</div>",
  "originalPrice": null,
  "basePrice": 65.9,
  "discountPercent": 0,
  "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
  "brandName": "HIFUTURE",
  "brandSlug": "hifuture",
  "categoryId": "c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c",
  "categoryName": "Montres",
  "categorySlug": "montres",
  "features": [
    "Écran AMOLED 1.32\" rond (360x360)",
    "Boîtier acier inoxydable",
    "Syntra AI dual-core",
    "10 jours d'autonomie",
    "100+ cadrans"
  ],
  "specifications": [
    {
      "label": "Écran",
      "value": "1.32\" AMOLED rond, 360x360 px"
    },
    {
      "label": "Processeur",
      "value": "Dual-core avec Syntra AI"
    },
    {
      "label": "Batterie",
      "value": "430 mAh, jusqu'à 10 jours"
    },
    {
      "label": "Capteurs santé",
      "value": "Fréquence cardiaque 24/7, SpO2, suivi du sommeil"
    },
    {
      "label": "Étanchéité",
      "value": "1 ATM"
    },
    {
      "label": "Bluetooth",
      "value": "5.0"
    },
    {
      "label": "Application",
      "value": "HiFuture Fit / GloryFit"
    },
    {
      "label": "Compatibilité",
      "value": "iOS / Android"
    },
    {
      "label": "Matériaux",
      "value": "Acier inoxydable intégral"
    },
    {
      "label": "Cadrans",
      "value": "100+ cadrans personnalisables"
    }
  ],
  "repairabilityIndex": null,
  "dasHead": null,
  "dasBody": null,
  "dasLimb": null,
  "energyClass": "",
  "tags": [],
  "isFeatured": false,
  "isNewArrival": true,
  "showOnHomepage": false,
  "status": "active",
  "variants": [
    {
      "id": "dcb27ec0-6dbc-4920-990f-609b0da90317",
      "color": "Gold",
      "colorCode": "#FFD700",
      "ean": "6972576182678",
      "stock": 0,
      "is_default": true,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    }
  ],
  "rating": {
    "average": 0,
    "count": 0,
    "distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "reviews": []
  }
},

{
  "id": "dd75f0d7-f671-45e1-a254-a2f3bf6c25c8",
  "airtableId": "dd75f0d7-f671-45e1-a254-a2f3bf6c25c8",
  "sku": "SKU-0141",
  "name": "CASQUE ANC HIFUTURE TOUR MK2",
  "urlSlug": "casque-anc-hifuture-tour-mk2",
  "shortDescription": "Casque sans fil HiFuture Tour MK2 avec ANC hybride, drivers 40mm et 40h d'autonomie",
  "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">HiFuture Tour MK2 - ANC hybride et son Hi-Fi</h3>\n  <p class=\"text-gray-700 mb-4\">Le casque HiFuture Tour MK2 offre une expérience sonore immersive grâce à ses drivers dynamiques 40 mm et sa technologie Hybrid ANC qui élimine efficacement les bruits ambiants.</p>\n  <p class=\"text-gray-700\">Son design pliable en métal, ses coussinets à mémoire de forme haute densité et ses 40 heures d'autonomie (sans ANC) en font le compagnon idéal pour les longs trajets. Bluetooth 5.4 et 4 microphones MEMS pour des appels cristallins.</p>\n</div>",
  "originalPrice": null,
  "basePrice": 47.9,
  "discountPercent": 0,
  "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
  "brandName": "HIFUTURE",
  "brandSlug": "hifuture",
  "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
  "categoryName": "Audio",
  "categorySlug": "audio",
  "features": [
    "ANC Hybride (feedforward + feedback)",
    "Drivers 40 mm Hi-Fi",
    "40h d'autonomie (sans ANC)",
    "Bluetooth 5.4",
    "Design pliable métal"
  ],
  "specifications": [
    {
      "label": "Type",
      "value": "Circum-auriculaire (over-ear) ANC"
    },
    {
      "label": "Transducteur",
      "value": "40 mm dynamique Hi-Fi"
    },
    {
      "label": "ANC",
      "value": "Hybrid ANC (~30 dB)"
    },
    {
      "label": "Bluetooth",
      "value": "5.4 (SBC, AAC)"
    },
    {
      "label": "Réponse en fréquence",
      "value": "20 Hz - 20 kHz"
    },
    {
      "label": "Microphones",
      "value": "4 MEMS microphones (ENC)"
    },
    {
      "label": "Batterie",
      "value": "400 mAh"
    },
    {
      "label": "Autonomie",
      "value": "40h sans ANC / 20h avec ANC"
    },
    {
      "label": "Charge",
      "value": "USB-C, ~2h"
    },
    {
      "label": "Portée",
      "value": "10 m"
    },
    {
      "label": "Coussinets",
      "value": "Mousse à mémoire haute densité"
    },
    {
      "label": "Design",
      "value": "Pliable, arceau métal ajustable"
    }
  ],
  "repairabilityIndex": null,
  "dasHead": null,
  "dasBody": null,
  "dasLimb": null,
  "energyClass": "",
  "tags": [],
  "isFeatured": false,
  "isNewArrival": true,
  "showOnHomepage": false,
  "status": "active",
  "variants": [
    {
      "id": "df992b5f-6743-48be-af87-0d80e74ec8df",
      "color": "Noir",
      "colorCode": "#000000",
      "ean": "6972576183149",
      "stock": 0,
      "is_default": true,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    },
    {
      "id": "7d331a71-dfab-40f1-96c3-4fd987c1e0cd",
      "color": "Blanc",
      "colorCode": "#FFFFFF",
      "ean": "6972576183156",
      "stock": 0,
      "is_default": false,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    }
  ],
  "rating": {
    "average": 0,
    "count": 0,
    "distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "reviews": []
  }
},
{
  "id": "0b17e551-6843-4bd3-9ee8-7ecee01a6700",
  "airtableId": "0b17e551-6843-4bd3-9ee8-7ecee01a6700",
  "sku": "SKU-0142",
  "name": "ECOUTEUR HIFUTURE MATE 2 PRO",
  "urlSlug": "ecouteur-hifuture-mate-2-pro",
  "shortDescription": "Écouteurs open-ear HiFuture Mate 2 Pro avec Qualcomm aptX Adaptive et 30h d'autonomie",
  "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">HiFuture Mate 2 Pro - Open-Ear Qualcomm aptX</h3>\n  <p class=\"text-gray-700 mb-4\">Les écouteurs HiFuture Mate 2 Pro adoptent un design open-ear ultra-léger de seulement 7 g par écouteur, vous permettant de rester connecté à votre environnement tout en profitant d'un son premium.</p>\n  <p class=\"text-gray-700\">Équipés du chipset Qualcomm QCC3040 avec support aptX Adaptive et de drivers 15.4 mm, ils délivrent des basses profondes et des aigus cristallins. Certification IPX5 et autonomie de 30 heures pour le sport et l'usage quotidien.</p>\n</div>",
  "originalPrice": null,
  "basePrice": 37.9,
  "discountPercent": 0,
  "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
  "brandName": "HIFUTURE",
  "brandSlug": "hifuture",
  "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
  "categoryName": "Audio",
  "categorySlug": "audio",
  "features": [
    "Design open-ear ultra-léger (7g)",
    "Qualcomm QCC3040 + aptX Adaptive",
    "Drivers 15.4 mm",
    "IPX5 résistant eau",
    "30h d'autonomie totale"
  ],
  "specifications": [
    {
      "label": "Type",
      "value": "TWS Open-Ear avec crochets d'oreille"
    },
    {
      "label": "Transducteur",
      "value": "15.4 mm"
    },
    {
      "label": "Chipset",
      "value": "Qualcomm QCC3040"
    },
    {
      "label": "Bluetooth",
      "value": "5.2 (SBC, AAC, aptX Adaptive)"
    },
    {
      "label": "Microphones",
      "value": "4 microphones ENC"
    },
    {
      "label": "Batterie écouteur",
      "value": "70 mAh par écouteur"
    },
    {
      "label": "Batterie boîtier",
      "value": "500 mAh"
    },
    {
      "label": "Autonomie",
      "value": "20-30h total avec boîtier"
    },
    {
      "label": "Étanchéité",
      "value": "IPX5"
    },
    {
      "label": "Poids",
      "value": "7 g par écouteur"
    },
    {
      "label": "Commandes",
      "value": "Tactiles"
    },
    {
      "label": "Portée",
      "value": "10 m"
    }
  ],
  "repairabilityIndex": null,
  "dasHead": null,
  "dasBody": null,
  "dasLimb": null,
  "energyClass": "",
  "tags": [],
  "isFeatured": false,
  "isNewArrival": true,
  "showOnHomepage": false,
  "status": "active",
  "variants": [
    {
      "id": "d34d0782-d382-4f58-b075-f5bf91017681",
      "color": "Noir",
      "colorCode": "#000000",
      "ean": "6972576181503",
      "stock": 0,
      "is_default": true,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    }
  ],
  "rating": {
    "average": 0,
    "count": 0,
    "distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "reviews": []
  }
},
{
  "id": "ff05229f-5bf0-441d-b473-8c70e15131cf",
  "airtableId": "ff05229f-5bf0-441d-b473-8c70e15131cf",
  "sku": "SKU-0143",
  "name": "ENCEINTE HIFUTURE LINO S",
  "urlSlug": "enceinte-hifuture-lino-s",
  "shortDescription": "Enceinte portable Bluetooth HiFuture Lino S, compacte et colorée avec autonomie longue durée",
  "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">HiFuture Lino S - Son portable coloré</h3>\n  <p class=\"text-gray-700 mb-4\">L'enceinte portable HiFuture Lino S combine un design compact et coloré avec une qualité sonore surprenante pour son format. Disponible en plusieurs coloris tendance, elle se glisse facilement dans un sac pour accompagner toutes vos sorties.</p>\n  <p class=\"text-gray-700\">Résistante aux éclaboussures et dotée d'une batterie longue durée, c'est l'accessoire musical idéal pour profiter de votre musique partout, à la maison, en pique-nique ou à la plage.</p>\n</div>",
  "originalPrice": null,
  "basePrice": 27.9,
  "discountPercent": 0,
  "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
  "brandName": "HIFUTURE",
  "brandSlug": "hifuture",
  "categoryId": "032b2296-f6e4-4529-a019-c5c74fbc64e1",
  "categoryName": "Audio",
  "categorySlug": "audio",
  "features": [
    "Design compact et coloré",
    "Bluetooth 5.3",
    "Résistance aux éclaboussures",
    "Autonomie longue durée",
    "Charge USB-C"
  ],
  "specifications": [
    {
      "label": "Type",
      "value": "Enceinte portable Bluetooth"
    },
    {
      "label": "Bluetooth",
      "value": "5.3"
    },
    {
      "label": "Puissance",
      "value": "5-10W RMS"
    },
    {
      "label": "Autonomie",
      "value": "8-12 heures"
    },
    {
      "label": "Étanchéité",
      "value": "IPX5"
    },
    {
      "label": "Charge",
      "value": "USB-C"
    }
  ],
  "repairabilityIndex": null,
  "dasHead": null,
  "dasBody": null,
  "dasLimb": null,
  "energyClass": "",
  "tags": [],
  "isFeatured": false,
  "isNewArrival": true,
  "showOnHomepage": false,
  "status": "active",
  "variants": [
    {
      "id": "3cf0889e-26da-4470-9f54-415b22cedefd",
      "color": "Noir",
      "colorCode": "#000000",
      "ean": "6972576182838",
      "stock": 0,
      "is_default": true,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    },
    {
      "id": "0a8fceb6-fe14-4c5a-b55c-88d6d54e2889",
      "color": "Bleu",
      "colorCode": "#0066CC",
      "ean": "6972576182869",
      "stock": 0,
      "is_default": false,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    },
    {
      "id": "5d0386be-992f-4094-8042-4fad5ce4b41d",
      "color": "Violet",
      "colorCode": "#800080",
      "ean": "6972576182852",
      "stock": 0,
      "is_default": false,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    }
  ],
  "rating": {
    "average": 0,
    "count": 0,
    "distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "reviews": []
  }
},
{
  "id": "c3caf886-af6b-440d-a7b6-f599aea7ecaa",
  "airtableId": "c3caf886-af6b-440d-a7b6-f599aea7ecaa",
  "sku": "SKU-0144",
  "name": "PARTYBOX HIFUTURE BOOMBEAT",
  "urlSlug": "partybox-hifuture-boombeat",
  "shortDescription": "Enceinte party HiFuture BoomBeat 100W avec 2 micros sans fil, éclairage RGB et karaoke",
  "fullDescription": "<div class=\"max-w-4xl mx-auto\">\n  <h3 class=\"text-2xl font-bold text-gray-900 mb-6\">HiFuture BoomBeat - La Party Speaker ultime</h3>\n  <p class=\"text-gray-700 mb-4\">La HiFuture BoomBeat est l'enceinte party ultime, délivrant 100W de puissance grâce à sa configuration 4 haut-parleurs (2 tweeters + 2 woofers) pour un son puissant et équilibré.</p>\n  <p class=\"text-gray-700 mb-4\">Livrée avec deux microphones sans fil pour des sessions karaoké endiablées, elle brille de mille feux grâce à son éclairage RGB synchronisé avec la musique.</p>\n  <p class=\"text-gray-700\">Son mode TWS pour coupler deux enceintes, son DSP intégré avec égaliseur multi-bandes et sa batterie haute capacité en font le cœur de la fête, partout et à tout moment.</p>\n</div>",
  "originalPrice": null,
  "basePrice": 145.9,
  "discountPercent": 0,
  "brandId": "a44be79d-dac2-4ba6-8497-625a0a79196d",
  "brandName": "HIFUTURE",
  "brandSlug": "hifuture",
  "categoryId": "da7f55c0-35f7-4cbb-9262-24352fdb44f3",
  "categoryName": "Enceintes",
  "categorySlug": "enceintes",
  "features": [
    "100W de puissance (2 tweeters + 2 woofers)",
    "2 microphones sans fil inclus",
    "Éclairage RGB synchronisé",
    "Mode karaoké",
    "TWS pour coupler 2 enceintes"
  ],
  "specifications": [
    {
      "label": "Type",
      "value": "Enceinte party / karaoké"
    },
    {
      "label": "Puissance",
      "value": "100W total"
    },
    {
      "label": "Configuration",
      "value": "2 tweeters + 2 woofers"
    },
    {
      "label": "Bluetooth",
      "value": "5.0 / 5.3"
    },
    {
      "label": "Microphones",
      "value": "2 microphones sans fil inclus"
    },
    {
      "label": "Éclairage",
      "value": "RGB synchronisé avec la musique"
    },
    {
      "label": "DSP",
      "value": "Intégré avec EQ multi-bandes"
    },
    {
      "label": "TWS",
      "value": "Oui (appairage de 2 enceintes)"
    },
    {
      "label": "Connectivité",
      "value": "Bluetooth, AUX, USB"
    },
    {
      "label": "Power Bank",
      "value": "Oui (5V/1A)"
    },
    {
      "label": "Batterie",
      "value": "Haute capacité (8000-12000 mAh)"
    }
  ],
  "repairabilityIndex": null,
  "dasHead": null,
  "dasBody": null,
  "dasLimb": null,
  "energyClass": "",
  "tags": [],
  "isFeatured": false,
  "isNewArrival": true,
  "showOnHomepage": false,
  "status": "active",
  "variants": [
    {
      "id": "e264f5fc-160b-4dbe-85f3-615c8fa311c2",
      "color": "Noir",
      "colorCode": "#000000",
      "ean": "6972576183057",
      "stock": 0,
      "is_default": true,
      "images": [],
      "adminDiscountPercent": 0,
      "capacity": null,
      "size": null
    }
  ],
  "rating": {
    "average": 0,
    "count": 0,
    "distribution": {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    "reviews": []
  }
}
];

export default PRODUCTS;
