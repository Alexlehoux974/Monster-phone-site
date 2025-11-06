#!/usr/bin/env tsx
/**
 * IMPORT COMPLET DES PRODUITS DEPUIS CSV
 * Généré automatiquement avec détection intelligente des variants
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Catégories et leurs IDs
const CATEGORIES = {
  'SMARTPHONE': { id: '80194285-ea90-40ff-8e2a-8edbe3609330', name: 'Smartphones' },
  'TABLETTE': { id: 'd5a2e3f4-9b8c-4d7e-8f1a-2b3c4d5e6f7a', name: 'Tablettes' },
  'MONTRES': { id: 'c8f5a3d2-9e4b-4a7c-8b5f-2d3e4f5a6b7c', name: 'Montres' },
  'ACCESSOIRES': { id: '5c4b3a2f-8e7d-4c6b-9a5c-3b2d4e6f8a9c', name: 'Accessoires' },
  'AUDIO': { id: '032b2296-f6e4-4529-a019-c5c74fbc64e1', name: 'Audio' },
  'LED': { id: 'f7e8d9c3-4b5a-6c7d-8e9f-3a4b5c6d7e8f', name: 'LED' },
};

// Cache des marques
const BRANDS: Record<string, string> = {};

async function getBrandId(brandName: string): Promise<string> {
  if (BRANDS[brandName]) {
    return BRANDS[brandName];
  }

  const { data, error } = await supabase
    .from('brands')
    .select('id')
    .eq('name', brandName)
    .single();

  if (error || !data) {
    const slug = brandName.toLowerCase().replace(/\s+/g, '-');
    const { data: newBrand, error: createError } = await supabase
      .from('brands')
      .insert({ name: brandName, slug })
      .select('id')
      .single();

    if (createError || !newBrand) {
      throw new Error(`Failed to create brand: ${brandName}`);
    }
    BRANDS[brandName] = newBrand.id;
    return newBrand.id;
  }

  BRANDS[brandName] = data.id;
  return data.id;
}

// Liste des produits à importer
const PRODUCTS_TO_IMPORT = [
  { // PRODUIT #1 - AVEC VARIANTS
    sku: 'SKU-0001',
    name: 'HONOR X5B 4+',
    urlSlug: 'honor-x5b-4',
    brand: 'HONOR',
    category: 'SMARTPHONE',
    price: 149.99,
    repairability: 8.1,
    dasHead: '1,04 W/kg' || null,
    dasBody: '1,00 W/kg' || null,
    dasLimb: 'NC' || null,
    d3e: 2.54,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6936520854851',
        stock: 91,
        isDefault: true,
        capacity: '4/64'
      },
      {
        color: 'Bleu',
        colorCode: '#0066CC',
        ean: '6936520854868',
        stock: 109,
        isDefault: false,
        capacity: '4/64'
      },
    ],
  },
  { // PRODUIT #2 - AVEC VARIANTS
    sku: 'SKU-0002',
    name: 'HONOR X6C 6+',
    urlSlug: 'honor-x6c-6',
    brand: 'HONOR',
    category: 'SMARTPHONE',
    price: 199.99,
    repairability: 8.1,
    dasHead: '0,76 W/kg' || null,
    dasBody: '1,19 W/kg' || null,
    dasLimb: '2,66 W/kg' || null,
    d3e: 2.54,
    variants: [
      {
        color: 'Bleu',
        colorCode: '#0066CC',
        ean: '6936520869527',
        stock: 0,
        isDefault: true,
        capacity: '6/128'
      },
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6936520869510',
        stock: 0,
        isDefault: false,
        capacity: '6/128'
      },
    ],
  },
  { // PRODUIT #3 - AVEC VARIANTS
    sku: 'SKU-0003',
    name: 'HONOR X7C 8+',
    urlSlug: 'honor-x7c-8',
    brand: 'HONOR',
    category: 'SMARTPHONE',
    price: 269.99,
    repairability: 8.1,
    dasHead: '0,77 W/kg' || null,
    dasBody: '1,05 W/kg' || null,
    dasLimb: '2,55 W/kg' || null,
    d3e: 2.54,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6936520854738',
        stock: 29,
        isDefault: true,
        capacity: '6/256'
      },
      {
        color: 'Vert',
        colorCode: '#00AA44',
        ean: '6936520854721',
        stock: 35,
        isDefault: false,
        capacity: '6/256'
      },
    ],
  },
  { // PRODUIT #4 - AVEC VARIANTS
    sku: 'SKU-0004',
    name: 'TELEPHONE HONOR 200 PRO 12+',
    urlSlug: 'telephone-honor-200-pro-12',
    brand: 'TELEPHONE',
    category: 'SMARTPHONE',
    price: 799.99,
    repairability: 8.1,
    dasHead: '0,87 W/kg' || null,
    dasBody: '1,11 W/kg' || null,
    dasLimb: '2,97 W/kg' || null,
    d3e: 2.54,
    variants: [
      {
        color: 'Vert',
        colorCode: '#00AA44',
        ean: '6936520845231',
        stock: 11,
        isDefault: true,
        capacity: '12/512'
      },
      {
        color: 'Blanc',
        colorCode: '#FFFFFF',
        ean: '6936520845248',
        stock: 8,
        isDefault: false,
        capacity: '12/512'
      },
    ],
  },
  { // PRODUIT #5 - AVEC VARIANTS
    sku: 'SKU-0005',
    name: 'POWERBANK ABYX 10K MAH',
    urlSlug: 'powerbank-abyx-10k-mah',
    brand: 'POWERBANK',
    category: 'ACCESSOIRES',
    price: 19.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.04,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '4897069737123',
        stock: 0,
        isDefault: true
      },
      {
        color: 'Blanc',
        colorCode: '#FFFFFF',
        ean: '4897069737130',
        stock: 369,
        isDefault: false
      },
    ],
  },
  { // PRODUIT #6 - AVEC VARIANTS
    sku: 'SKU-0006',
    name: 'APPAREIL PHOTO ENFANT MUVIT KIDPIC',
    urlSlug: 'appareil-photo-enfant-muvit-kidpic',
    brand: 'APPAREIL',
    category: 'ACCESSOIRES',
    price: 59.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 1.01,
    variants: [
      {
        color: 'Bleu',
        colorCode: '#0066CC',
        ean: '3663111187236',
        stock: 38,
        isDefault: true
      },
      {
        color: 'Rose',
        colorCode: '#FFB6C1',
        ean: '3663111187243',
        stock: 38,
        isDefault: false
      },
    ],
  },
  { // PRODUIT #7 - AVEC VARIANTS
    sku: 'SKU-0007',
    name: 'MONSTER N LITE 203',
    urlSlug: 'monster-n-lite-203',
    brand: 'MONSTER',
    category: 'MONTRES',
    price: 49.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '0810079707041',
        stock: 113,
        isDefault: true
      },
      {
        color: 'Gold',
        colorCode: '#FFD700',
        ean: '0810079707034',
        stock: 116,
        isDefault: false
      },
    ],
  },
  { // PRODUIT #8 - AVEC VARIANTS
    sku: 'SKU-0008',
    name: 'MONSTER N LITE 206',
    urlSlug: 'monster-n-lite-206',
    brand: 'MONSTER',
    category: 'MONTRES',
    price: 89.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '0810079706433',
        stock: 0,
        isDefault: true
      },
      {
        color: 'Blanc',
        colorCode: '#FFFFFF',
        ean: '0810079706440',
        stock: 0,
        isDefault: false
      },
    ],
  },
  { // PRODUIT #9 - AVEC VARIANTS
    sku: 'SKU-0009',
    name: 'MONSTER TH300 TACTILE',
    urlSlug: 'monster-th300-tactile',
    brand: 'MONSTER',
    category: 'MONTRES',
    price: 69.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '0810079705924',
        stock: 0,
        isDefault: true
      },
      {
        color: 'Blanc',
        colorCode: '#FFFFFF',
        ean: '0810079705931',
        stock: 0,
        isDefault: false
      },
    ],
  },
  { // PRODUIT #10 - AVEC VARIANTS
    sku: 'SKU-0010',
    name: 'MONSTER MISSION 100',
    urlSlug: 'monster-mission-100',
    brand: 'MONSTER',
    category: 'AUDIO',
    price: 59.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '0810079705863',
        stock: 0,
        isDefault: true
      },
      {
        color: 'Blanc',
        colorCode: '#FFFFFF',
        ean: '0810079705108',
        stock: 0,
        isDefault: false
      },
    ],
  },
  { // PRODUIT #11 - AVEC VARIANTS
    sku: 'SKU-0011',
    name: 'MONSTER PERSONA SE ANC',
    urlSlug: 'monster-persona-se-anc',
    brand: 'MONSTER',
    category: 'AUDIO',
    price: 99.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '0810079706082',
        stock: 0,
        isDefault: true
      },
      {
        color: 'Gris',
        colorCode: '#808080',
        ean: '0810079705733',
        stock: 0,
        isDefault: false
      },
    ],
  },
  { // PRODUIT #12 - AVEC VARIANTS
    sku: 'SKU-0012',
    name: 'MONTRE HIFUTURE ZONE 2',
    urlSlug: 'montre-hifuture-zone-2',
    brand: 'MONTRE',
    category: 'MONTRES',
    price: 49.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.06,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972576181244',
        stock: 70,
        isDefault: true
      },
      {
        color: 'Rose',
        colorCode: '#FFB6C1',
        ean: '6972576181251',
        stock: 7,
        isDefault: false
      },
      {
        color: 'Gris',
        colorCode: '#808080',
        ean: '6972576181268',
        stock: 66,
        isDefault: false
      },
    ],
  },
  { // PRODUIT #13 - AVEC VARIANTS
    sku: 'SKU-0013',
    name: 'MONTRE HIFUTURE LUME',
    urlSlug: 'montre-hifuture-lume',
    brand: 'MONTRE',
    category: 'MONTRES',
    price: 54.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.06,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972576182302',
        stock: 28,
        isDefault: true
      },
      {
        color: 'Gris',
        colorCode: '#808080',
        ean: '6972576182319',
        stock: 46,
        isDefault: false
      },
      {
        color: 'Vert',
        colorCode: '#00AA44',
        ean: '6972576182333',
        stock: 45,
        isDefault: false
      },
    ],
  },
  { // PRODUIT #14 - AVEC VARIANTS
    sku: 'SKU-0014',
    name: 'MONTRE HIFUTURE LUME PRO',
    urlSlug: 'montre-hifuture-lume-pro',
    brand: 'MONTRE',
    category: 'MONTRES',
    price: 69.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.06,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972576182401',
        stock: 53,
        isDefault: true
      },
      {
        color: 'Vert',
        colorCode: '#00AA44',
        ean: '6972576182425',
        stock: 58,
        isDefault: false
      },
      {
        color: 'Pink',
        colorCode: '#FFB6C1',
        ean: '6972576182432',
        stock: 45,
        isDefault: false
      },
    ],
  },
  { // PRODUIT #15 - AVEC VARIANTS
    sku: 'SKU-0015',
    name: 'MONTRE HIFUTURE AURA 2',
    urlSlug: 'montre-hifuture-aura-2',
    brand: 'MONTRE',
    category: 'MONTRES',
    price: 89.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.06,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972576182524',
        stock: 28,
        isDefault: true
      },
      {
        color: 'Gris',
        colorCode: '#808080',
        ean: '6972576182531',
        stock: 28,
        isDefault: false
      },
    ],
  },
  { // PRODUIT #16 - AVEC VARIANTS
    sku: 'SKU-0016',
    name: 'MONTRE HIFUTURE GO PRO 2',
    urlSlug: 'montre-hifuture-go-pro-2',
    brand: 'MONTRE',
    category: 'MONTRES',
    price: 109.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.06,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972576182340',
        stock: 29,
        isDefault: true
      },
      {
        color: 'Gris',
        colorCode: '#808080',
        ean: '6972576182357',
        stock: 29,
        isDefault: false
      },
    ],
  },
  { // PRODUIT #17 - AVEC VARIANTS
    sku: 'SKU-0017',
    name: 'ECOUTEUR CONDUCTION A AIR MATE',
    urlSlug: 'ecouteur-conduction-a-air-mate',
    brand: 'ECOUTEUR',
    category: 'AUDIO',
    price: 34.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972576180933',
        stock: 70,
        isDefault: true
      },
      {
        color: 'Gris',
        colorCode: '#808080',
        ean: '6972576180940',
        stock: 72,
        isDefault: false
      },
    ],
  },
  { // PRODUIT #18 - AVEC VARIANTS
    sku: 'SKU-0018',
    name: 'ECOUTEUR HIFUTURE OLYMBUDS 3',
    urlSlug: 'ecouteur-hifuture-olymbuds-3',
    brand: 'ECOUTEUR',
    category: 'AUDIO',
    price: 24.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6872576181688',
        stock: 64,
        isDefault: true
      },
      {
        color: 'Blanc',
        colorCode: '#FFFFFF',
        ean: '6972576181695',
        stock: 94,
        isDefault: false
      },
    ],
  },
  { // PRODUIT #19 - AVEC VARIANTS
    sku: 'SKU-0019',
    name: 'ECOUTEUR HIFUTURE SONIC AIR',
    urlSlug: 'ecouteur-hifuture-sonic-air',
    brand: 'ECOUTEUR',
    category: 'AUDIO',
    price: 24.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972576181657',
        stock: 101,
        isDefault: true
      },
      {
        color: 'Blanc',
        colorCode: '#FFFFFF',
        ean: '6972576181664',
        stock: 108,
        isDefault: false
      },
    ],
  },
  { // PRODUIT #20 - AVEC VARIANTS
    sku: 'SKU-0020',
    name: 'ECOUTEUR HIFUTURE YACHT',
    urlSlug: 'ecouteur-hifuture-yacht',
    brand: 'ECOUTEUR',
    category: 'AUDIO',
    price: 59.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Rose',
        colorCode: '#FFB6C1',
        ean: '6972576181381',
        stock: 8,
        isDefault: true
      },
      {
        color: 'Black',
        colorCode: '#000000',
        ean: '6972576181367',
        stock: 9,
        isDefault: false
      },
    ],
  },
  { // PRODUIT #21 - AVEC VARIANTS
    sku: 'SKU-0021',
    name: 'ENCEINTE HIFUTURE ALTUS',
    urlSlug: 'enceinte-hifuture-altus',
    brand: 'ENCEINTE',
    category: 'AUDIO',
    price: 29.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.75,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972576181312',
        stock: 30,
        isDefault: true
      },
      {
        color: 'Rouge',
        colorCode: '#DC2626',
        ean: '6972576181336',
        stock: 10,
        isDefault: false
      },
      {
        color: 'Bleu',
        colorCode: '#0066CC',
        ean: '6972576181329',
        stock: 5,
        isDefault: false
      },
    ],
  },
  { // PRODUIT #22 - AVEC VARIANTS
    sku: 'SKU-0022',
    name: 'ENCEINTE HIFUTURE ASCENDO',
    urlSlug: 'enceinte-hifuture-ascendo',
    brand: 'ENCEINTE',
    category: 'AUDIO',
    price: 54.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.75,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972576181565',
        stock: 21,
        isDefault: true
      },
      {
        color: 'Rose',
        colorCode: '#FFB6C1',
        ean: '6972576182128',
        stock: 26,
        isDefault: false
      },
    ],
  },
  { // PRODUIT #23 - AVEC VARIANTS
    sku: 'SKU-0023',
    name: 'ENCEINTE HIFUTURE RIPPLE',
    urlSlug: 'enceinte-hifuture-ripple',
    brand: 'ENCEINTE',
    category: 'AUDIO',
    price: 64.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.75,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972576181039',
        stock: 9,
        isDefault: true
      },
      {
        color: 'Rouge',
        colorCode: '#DC2626',
        ean: '6972576181046',
        stock: 11,
        isDefault: false
      },
      {
        color: 'Bleu',
        colorCode: '#0066CC',
        ean: '6972576181053',
        stock: 3,
        isDefault: false
      },
    ],
  },
  { // PRODUIT #24 - AVEC VARIANTS
    sku: 'SKU-0024',
    name: 'ENCEINTE HIFUTURE GRAVITY',
    urlSlug: 'enceinte-hifuture-gravity',
    brand: 'ENCEINTE',
    category: 'AUDIO',
    price: 89.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.75,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972576181121',
        stock: 23,
        isDefault: true
      },
      {
        color: 'Bleu',
        colorCode: '#0066CC',
        ean: '6972576181138',
        stock: 15,
        isDefault: false
      },
    ],
  },
  { // PRODUIT #25 - SIMPLE
    sku: 'SKU-0025',
    name: 'HONOR X9C 12+',
    urlSlug: 'honor-x9c-12',
    brand: 'HONOR',
    category: 'SMARTPHONE',
    price: 499.99,
    repairability: 8.0,
    dasHead: '0,82 W/kg' || null,
    dasBody: '1,27 W/kg' || null,
    dasLimb: '2,81 W/kg' || null,
    d3e: 2.54,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6936520857951',
        stock: 0,
        isDefault: true,
        capacity: '8/256'
      }
    ],
  },
  { // PRODUIT #26 - SIMPLE
    sku: 'SKU-0026',
    name: 'HON PAD 9 WIFI 8+',
    urlSlug: 'hon-pad-9-wifi-8',
    brand: 'HONOR',
    category: 'TABLETTE',
    price: 359.99,
    repairability: 8.3,
    dasHead: 'NC' || null,
    dasBody: '1,09 W/kg' || null,
    dasLimb: '2,50 W/kg' || null,
    d3e: 1.3,
    variants: [
      {
        color: 'Or',
        colorCode: '#FFD700',
        ean: '6936520834839',
        stock: 15,
        isDefault: true,
        capacity: '8/256'
      }
    ],
  },
  { // PRODUIT #27 - SIMPLE
    sku: 'SKU-0027',
    name: 'HON X5',
    urlSlug: 'hon-x5',
    brand: 'HONOR',
    category: 'MONTRES',
    price: 49.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Or',
        colorCode: '#FFD700',
        ean: '6975840260126',
        stock: 315,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #28 - SIMPLE
    sku: 'SKU-0028',
    name: 'POWERBANK MYWAY 10K MAH',
    urlSlug: 'powerbank-myway-10k-mah',
    brand: 'POWERBANK',
    category: 'ACCESSOIRES',
    price: 19.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.04,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '3663111191578',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #29 - SIMPLE
    sku: 'SKU-0029',
    name: 'POWERBANK MYWAY 20K MAH',
    urlSlug: 'powerbank-myway-20k-mah',
    brand: 'POWERBANK',
    category: 'ACCESSOIRES',
    price: 29.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.04,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '3663111191585',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #30 - SIMPLE
    sku: 'SKU-0030',
    name: 'POWERBANK MY WAY 5K MAH MAGSAFE',
    urlSlug: 'powerbank-my-way-5k-mah-magsafe',
    brand: 'POWERBANK',
    category: 'ACCESSOIRES',
    price: 29.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.04,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '3663111190434',
        stock: 120,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #31 - SIMPLE
    sku: 'SKU-0031',
    name: 'CABLE LUMINEUX MY WAY USB A - USB C',
    urlSlug: 'cable-lumineux-my-way-usb-a-usb-c',
    brand: 'CABLE',
    category: 'ACCESSOIRES',
    price: 14.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.04,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '3663111196221',
        stock: 190,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #32 - SIMPLE
    sku: 'SKU-0032',
    name: 'CABLE LUMINEUX MY WAY USB C - USB C',
    urlSlug: 'cable-lumineux-my-way-usb-c-usb-c',
    brand: 'CABLE',
    category: 'ACCESSOIRES',
    price: 16.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.04,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '3663111196238',
        stock: 164,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #33 - SIMPLE
    sku: 'SKU-0033',
    name: 'CABLE LUMINEUX MY WAY USB A - LIGHTNING',
    urlSlug: 'cable-lumineux-my-way-usb-a-lightning',
    brand: 'CABLE',
    category: 'ACCESSOIRES',
    price: 14.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.04,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '3663111196245',
        stock: 93,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #34 - SIMPLE
    sku: 'SKU-0034',
    name: 'CABLE LUMINEUX MY WAY USB C - LIGHTNING',
    urlSlug: 'cable-lumineux-my-way-usb-c-lightning',
    brand: 'CABLE',
    category: 'ACCESSOIRES',
    price: 16.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.04,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '3663111196252',
        stock: 200,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #35 - SIMPLE
    sku: 'SKU-0035',
    name: 'CABLE RETRACTABLE MY WAY USB C 3 EN 1 100 W',
    urlSlug: 'cable-retractable-my-way-usb-c-3-en-1-100-w',
    brand: 'CABLE',
    category: 'ACCESSOIRES',
    price: 19.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.04,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '3663111196269',
        stock: 91,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #36 - SIMPLE
    sku: 'SKU-0036',
    name: 'CHARGEUR SANS FILS MY WAY 15W MAGSAFE DONUTS',
    urlSlug: 'chargeur-sans-fils-my-way-15w-magsafe-donuts',
    brand: 'CHARGEUR',
    category: 'ACCESSOIRES',
    price: 24.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.04,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '3663111183221',
        stock: 45,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #37 - SIMPLE
    sku: 'SKU-0037',
    name: 'CABLE TIGER POWER LITE 6 EN 1 AVEC APPLE WATCH',
    urlSlug: 'cable-tiger-power-lite-6-en-1-avec-apple-watch',
    brand: 'CABLE',
    category: 'ACCESSOIRES',
    price: 29.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.04,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '3663111196283',
        stock: 96,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #38 - SIMPLE
    sku: 'SKU-0038',
    name: 'ROULEAUX PAPIER PHOTO X5 KIDPIC ENFANT',
    urlSlug: 'rouleaux-papier-photo-x5-kidpic-enfant',
    brand: 'ROULEAUX',
    category: 'ACCESSOIRES',
    price: 7.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.0,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '3663111187250',
        stock: 185,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #39 - SIMPLE
    sku: 'SKU-0039',
    name: 'CASQUE SANS FILS ENFANTS MUVIT CHAT',
    urlSlug: 'casque-sans-fils-enfants-muvit-chat',
    brand: 'CASQUE',
    category: 'AUDIO',
    price: 39.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '3663111190502',
        stock: 19,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #40 - SIMPLE
    sku: 'SKU-0040',
    name: 'CASQUE SANS FILS ENFANTS MUVIT LAPIN',
    urlSlug: 'casque-sans-fils-enfants-muvit-lapin',
    brand: 'CASQUE',
    category: 'AUDIO',
    price: 39.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '3663111190496',
        stock: 24,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #41 - SIMPLE
    sku: 'SKU-0041',
    name: 'CASQUE SANS FILS ENFANTS MUVIT PIKA',
    urlSlug: 'casque-sans-fils-enfants-muvit-pika',
    brand: 'CASQUE',
    category: 'AUDIO',
    price: 39.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '3663111190489',
        stock: 21,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #42 - SIMPLE
    sku: 'SKU-0042',
    name: 'CASQUE SANS FILS ENFANTS MUVIT LICNE',
    urlSlug: 'casque-sans-fils-enfants-muvit-licne',
    brand: 'CASQUE',
    category: 'AUDIO',
    price: 39.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Or',
        colorCode: '#FFD700',
        ean: '3663111190472',
        stock: 15,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #43 - SIMPLE
    sku: 'SKU-0043',
    name: 'CASQUE SANS FILS ENFANTS MUVIT DRAGON',
    urlSlug: 'casque-sans-fils-enfants-muvit-dragon',
    brand: 'CASQUE',
    category: 'AUDIO',
    price: 39.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '3663111190519',
        stock: 22,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #44 - SIMPLE
    sku: 'SKU-0044',
    name: 'NOKIA 110 4G 2025',
    urlSlug: 'nokia-110-4g-2025',
    brand: 'NOKIA',
    category: 'SMARTPHONE',
    price: 64.99,
    repairability: 4.1,
    dasHead: '1.321 W/kg' || null,
    dasBody: '1.524 W/kg' || null,
    dasLimb: '3.739 W/kg' || null,
    d3e: 2.44,
    variants: [
      {
        color: 'Bleu',
        colorCode: '#0066CC',
        ean: '6438409099341',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #45 - SIMPLE
    sku: 'SKU-0045',
    name: 'MONSTER CHAMPION AIRLINKS',
    urlSlug: 'monster-champion-airlinks',
    brand: 'MONSTER',
    category: 'AUDIO',
    price: 139.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0850015401817',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #46 - SIMPLE
    sku: 'SKU-0046',
    name: 'MONSTER CASQUE HDTV',
    urlSlug: 'monster-casque-hdtv',
    brand: 'MONSTER',
    category: 'AUDIO',
    price: 44.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0805106893651',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #47 - SIMPLE
    sku: 'SKU-0047',
    name: 'MONSTER ELEMENT AIR',
    urlSlug: 'monster-element-air',
    brand: 'MONSTER',
    category: 'AUDIO',
    price: 199.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0810131220969',
        stock: 35,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #48 - SIMPLE
    sku: 'SKU-0048',
    name: 'MONSTER BLASTER MICRO',
    urlSlug: 'monster-blaster-micro',
    brand: 'MONSTER',
    category: 'AUDIO',
    price: 39.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.75,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '0810079706099',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #49 - SIMPLE
    sku: 'SKU-0049',
    name: 'MONSTER ENCEINTE CUBE 1',
    urlSlug: 'monster-enceinte-cube-1',
    brand: 'MONSTER',
    category: 'AUDIO',
    price: 49.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.75,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '0810079705528',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #50 - SIMPLE
    sku: 'SKU-0050',
    name: 'MONSTER ENCEINTE S150',
    urlSlug: 'monster-enceinte-s150',
    brand: 'MONSTER',
    category: 'AUDIO',
    price: 59.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.75,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '0810079705764',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #51 - SIMPLE
    sku: 'SKU-0051',
    name: 'MONSTER ENCEINTE S150 PLUS',
    urlSlug: 'monster-enceinte-s150-plus',
    brand: 'MONSTER',
    category: 'AUDIO',
    price: 99.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.75,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '0810079705467',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #52 - SIMPLE
    sku: 'SKU-0052',
    name: 'MONSTER ENCEINTE PARTY BOX SPARKLE',
    urlSlug: 'monster-enceinte-party-box-sparkle',
    brand: 'MONSTER',
    category: 'AUDIO',
    price: 179.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.75,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0810079707645',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #53 - SIMPLE
    sku: 'SKU-0053',
    name: 'MONSTER ENCEINTE PARTY MUSIC BOX GO + 2 MICRO',
    urlSlug: 'monster-enceinte-party-music-box-go-2-micro',
    brand: 'MONSTER',
    category: 'AUDIO',
    price: 279.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.75,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0810079706518',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #54 - SIMPLE
    sku: 'SKU-0054',
    name: 'MONSTER ENCEINTE TRAVELER',
    urlSlug: 'monster-enceinte-traveler',
    brand: 'MONSTER',
    category: 'AUDIO',
    price: 299.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.75,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0810079706860',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #55 - SIMPLE
    sku: 'SKU-0055',
    name: 'MONSTER NETTOYANT ET LINGETTE 200ML',
    urlSlug: 'monster-nettoyant-et-lingette-200ml',
    brand: 'MONSTER',
    category: 'ACCESSOIRES',
    price: 19.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.04,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0741835115209',
        stock: 96,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #56 - SIMPLE
    sku: 'SKU-0056',
    name: 'MONSTER CABLE HDMI ESSENTIAL 4K 1M8',
    urlSlug: 'monster-cable-hdmi-essential-4k-1m8',
    brand: 'MONSTER',
    category: 'ACCESSOIRES',
    price: 24.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.04,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0741835115131',
        stock: 149,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #57 - SIMPLE
    sku: 'SKU-0057',
    name: 'MONSTER CABLE HDMI ESSENTIAL 4K 3M6',
    urlSlug: 'monster-cable-hdmi-essential-4k-3m6',
    brand: 'MONSTER',
    category: 'ACCESSOIRES',
    price: 34.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.04,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0741835115148',
        stock: 19,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #58 - SIMPLE
    sku: 'SKU-0058',
    name: 'MONSTER CABLE HDMI ESSENTIAL 8K 1M8',
    urlSlug: 'monster-cable-hdmi-essential-8k-1m8',
    brand: 'MONSTER',
    category: 'ACCESSOIRES',
    price: 44.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.04,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0741835116626',
        stock: 96,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #59 - SIMPLE
    sku: 'SKU-0059',
    name: 'MONSTER CABLE ESSENTIAL FIBRE OPTIQUE 1M5',
    urlSlug: 'monster-cable-essential-fibre-optique-1m5',
    brand: 'MONSTER',
    category: 'ACCESSOIRES',
    price: 22.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.04,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0850015401039',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #60 - SIMPLE
    sku: 'SKU-0060',
    name: 'MONSTER CABLE ESSENTIAL FIBRE OPTIQUE 3M',
    urlSlug: 'monster-cable-essential-fibre-optique-3m',
    brand: 'MONSTER',
    category: 'ACCESSOIRES',
    price: 27.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.04,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0850015401046',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #61 - SIMPLE
    sku: 'SKU-0061',
    name: 'MONSTER CABLE TYPE C VERS HDMI 4K 2M',
    urlSlug: 'monster-cable-type-c-vers-hdmi-4k-2m',
    brand: 'MONSTER',
    category: 'ACCESSOIRES',
    price: 49.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.04,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0850015401374',
        stock: 80,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #62 - SIMPLE
    sku: 'SKU-0062',
    name: 'MONSTER MULTIPRISE 4 PRISES',
    urlSlug: 'monster-multiprise-4-prises',
    brand: 'MONSTER',
    category: 'ACCESSOIRES',
    price: 29.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.04,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0850017011410',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #63 - SIMPLE
    sku: 'SKU-0063',
    name: 'MONSTER ILLUMINESCENCE BASIC AMPOULE A19 NON-SMART',
    urlSlug: 'monster-illuminescence-basic-ampoule-a19-non-smart',
    brand: 'MONSTER',
    category: 'LED',
    price: 10.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0805106893378',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #64 - SIMPLE
    sku: 'SKU-0064',
    name: 'MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 2M MULTICOULEUR INT',
    urlSlug: 'monster-illuminescence-basic-lightstrip-2m-multicouleur-int',
    brand: 'MONSTER',
    category: 'LED',
    price: 13.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0805106235765',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #65 - SIMPLE
    sku: 'SKU-0065',
    name: 'MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 2M COLOR/ INT',
    urlSlug: 'monster-illuminescence-basic-lightstrip-2m-color-int',
    brand: 'MONSTER',
    category: 'LED',
    price: 17.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Blanc',
        colorCode: '#FFFFFF',
        ean: '0805106893330',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #66 - SIMPLE
    sku: 'SKU-0066',
    name: 'MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 2M MULTICOL SOUND FLOW INT',
    urlSlug: 'monster-illuminescence-basic-lightstrip-2m-multicol-sound-flow-int',
    brand: 'MONSTER',
    category: 'LED',
    price: 19.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Or',
        colorCode: '#FFD700',
        ean: '0805106896478',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #67 - SIMPLE
    sku: 'SKU-0067',
    name: 'MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 2M MOTION REACTIVE PILES INT',
    urlSlug: 'monster-illuminescence-basic-lightstrip-2m-motion-reactive-piles-int',
    brand: 'MONSTER',
    category: 'LED',
    price: 21.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0805106896355',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #68 - SIMPLE
    sku: 'SKU-0068',
    name: 'MONSTER ILLUMINESCENCE BASIC LED LIGHT BAR PAIR RGB INT',
    urlSlug: 'monster-illuminescence-basic-led-light-bar-pair-rgb-int',
    brand: 'MONSTER',
    category: 'LED',
    price: 21.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0805106897246',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #69 - SIMPLE
    sku: 'SKU-0069',
    name: 'MONSTER ILLUMINESCENCE SMART LIGHT STRIP 2M INT',
    urlSlug: 'monster-illuminescence-smart-light-strip-2m-int',
    brand: 'MONSTER',
    category: 'LED',
    price: 24.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0805106893194',
        stock: 15,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #70 - SIMPLE
    sku: 'SKU-0070',
    name: 'MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 4M MULTICOL SOUND FLOW INT',
    urlSlug: 'monster-illuminescence-basic-lightstrip-4m-multicol-sound-flow-int',
    brand: 'MONSTER',
    category: 'LED',
    price: 26.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Or',
        colorCode: '#FFD700',
        ean: '0805106897277',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #71 - SIMPLE
    sku: 'SKU-0071',
    name: 'MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 2M NEON RGB SOUND REACTIVE INT',
    urlSlug: 'monster-illuminescence-basic-lightstrip-2m-neon-rgb-sound-reactive-int',
    brand: 'MONSTER',
    category: 'LED',
    price: 26.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0805106897260',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #72 - SIMPLE
    sku: 'SKU-0072',
    name: 'MONSTER ILLUMINESCENCE BASIC LED TOUCH LIGHT X3 RGB INT',
    urlSlug: 'monster-illuminescence-basic-led-touch-light-x3-rgb-int',
    brand: 'MONSTER',
    category: 'LED',
    price: 26.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0805106897253',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #73 - SIMPLE
    sku: 'SKU-0073',
    name: 'MONSTER ILLUMINESCENCE SMART LIGHT STRIP 2M MULTICOL FLOW INT',
    urlSlug: 'monster-illuminescence-smart-light-strip-2m-multicol-flow-int',
    brand: 'MONSTER',
    category: 'LED',
    price: 27.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Or',
        colorCode: '#FFD700',
        ean: '0805106896317',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #74 - SIMPLE
    sku: 'SKU-0074',
    name: 'MONSTER ILLUMINESCENCE SMART LIGHT STRIP 4M MULTICOL FLOW INT',
    urlSlug: 'monster-illuminescence-smart-light-strip-4m-multicol-flow-int',
    brand: 'MONSTER',
    category: 'LED',
    price: 39.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Or',
        colorCode: '#FFD700',
        ean: '0805106896454',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #75 - SIMPLE
    sku: 'SKU-0075',
    name: 'MONSTER ILLUMINESCENCE SMART LIGHT STRIP 5M RGB+W SOUND REACT INT',
    urlSlug: 'monster-illuminescence-smart-light-strip-5m-rgbw-sound-react-int',
    brand: 'MONSTER',
    category: 'LED',
    price: 39.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0805106897376',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #76 - SIMPLE
    sku: 'SKU-0076',
    name: 'MONSTER ILLUMINESCENCE BASIC LIGHT STRIP 5M MULTICOL INT/EXT IPX6',
    urlSlug: 'monster-illuminescence-basic-light-strip-5m-multicol-intext-ipx6',
    brand: 'MONSTER',
    category: 'LED',
    price: 39.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Or',
        colorCode: '#FFD700',
        ean: '0805106893323',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #77 - SIMPLE
    sku: 'SKU-0077',
    name: 'MONSTER ILLUMINESCENCE BASIC LIGHTSTRIP 5M MULTICOL SOUND FLOW INT',
    urlSlug: 'monster-illuminescence-basic-lightstrip-5m-multicol-sound-flow-int',
    brand: 'MONSTER',
    category: 'LED',
    price: 44.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Or',
        colorCode: '#FFD700',
        ean: '0805106896447',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #78 - SIMPLE
    sku: 'SKU-0078',
    name: 'MONSTER ILLUMINESCENCE DUO + SOUND REACTIVE MONIT LIGHT',
    urlSlug: 'monster-illuminescence-duo-sound-reactive-monit-light',
    brand: 'MONSTER',
    category: 'LED',
    price: 44.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Or',
        colorCode: '#FFD700',
        ean: '0805106897413',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #79 - SIMPLE
    sku: 'SKU-0079',
    name: 'MONSTER ILLUMINESCENCE SMART CHROMA LIGHT 2X BARS RGB IC',
    urlSlug: 'monster-illuminescence-smart-chroma-light-2x-bars-rgb-ic',
    brand: 'MONSTER',
    category: 'LED',
    price: 49.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0805106898397',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #80 - SIMPLE
    sku: 'SKU-0080',
    name: 'MONSTER ILLUMINESCENCE SMART LIGHT STRIP 5M RGB + IC FLOW INT',
    urlSlug: 'monster-illuminescence-smart-light-strip-5m-rgb-ic-flow-int',
    brand: 'MONSTER',
    category: 'LED',
    price: 54.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0805106896461',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #81 - SIMPLE
    sku: 'SKU-0081',
    name: 'MONSTER ILLUMINESCENCE BASIC LIGHT STRIP 2X 5M RGB+W SOUND REACTIVE INT',
    urlSlug: 'monster-illuminescence-basic-light-strip-2x-5m-rgbw-sound-reactive-int',
    brand: 'MONSTER',
    category: 'LED',
    price: 55.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0805106896416',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #82 - SIMPLE
    sku: 'SKU-0082',
    name: 'MONSTER ILLUMINESCENCE SMART LIGHT STRIP 5M NEON INT/EXT',
    urlSlug: 'monster-illuminescence-smart-light-strip-5m-neon-intext',
    brand: 'MONSTER',
    category: 'LED',
    price: 56.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0805106893200',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #83 - SIMPLE
    sku: 'SKU-0083',
    name: 'MONSTER ILLUMINESCENCE SMART LIGHT STRIP 2X 5M RGB+W SOUND REACT INT',
    urlSlug: 'monster-illuminescence-smart-light-strip-2x-5m-rgbw-sound-react-int',
    brand: 'MONSTER',
    category: 'LED',
    price: 64.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0805106897321',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #84 - SIMPLE
    sku: 'SKU-0084',
    name: 'MONSTER ILLUMINESCENCE SMART PRISM II X6 RGB+IC FLOW',
    urlSlug: 'monster-illuminescence-smart-prism-ii-x6-rgbic-flow',
    brand: 'MONSTER',
    category: 'LED',
    price: 64.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0805106898625',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #85 - SIMPLE
    sku: 'SKU-0085',
    name: 'MONSTER ILLUMINESCENCE BASIC LIGHT STRIP 30M RGB INT',
    urlSlug: 'monster-illuminescence-basic-light-strip-30m-rgb-int',
    brand: 'MONSTER',
    category: 'LED',
    price: 74.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0805106897314',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #86 - SIMPLE
    sku: 'SKU-0086',
    name: 'MONSTER ILLUMINESCENCE SMART LIGHT STRIP 5M NEON FLOW MULTICOL INT/EXT',
    urlSlug: 'monster-illuminescence-smart-light-strip-5m-neon-flow-multicol-intext',
    brand: 'MONSTER',
    category: 'LED',
    price: 99.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Or',
        colorCode: '#FFD700',
        ean: '0805106897345',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #87 - SIMPLE
    sku: 'SKU-0087',
    name: 'MONSTER ILLUMINESCENCE SMART BEAM + 2X BARS RGB IC SOUND REACTIVE',
    urlSlug: 'monster-illuminescence-smart-beam-2x-bars-rgb-ic-sound-reactive',
    brand: 'MONSTER',
    category: 'LED',
    price: 149.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.1,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '0805106897406',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #88 - SIMPLE
    sku: 'SKU-0088',
    name: 'HIFUTURE MONTRE EVO 2',
    urlSlug: 'hifuture-montre-evo-2',
    brand: 'HIFUTURE',
    category: 'MONTRES',
    price: 34.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.06,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972576181701',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #89 - SIMPLE
    sku: 'SKU-0089',
    name: 'HIFUTURE MONTRE EVO 2 BEIGE',
    urlSlug: 'hifuture-montre-evo-2-beige',
    brand: 'HIFUTURE',
    category: 'MONTRES',
    price: 34.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.06,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '6972576181725',
        stock: 87,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #90 - SIMPLE
    sku: 'SKU-0090',
    name: 'HIFUTURE MONTRE EVO 2 GOLD',
    urlSlug: 'hifuture-montre-evo-2-gold',
    brand: 'HIFUTURE',
    category: 'MONTRES',
    price: 34.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.06,
    variants: [
      {
        color: 'Rose',
        colorCode: '#FFB6C1',
        ean: '6972576181718',
        stock: 45,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #91 - SIMPLE
    sku: 'SKU-0091',
    name: 'MONTRE HIFUTURE LUME CHAMPAGNE',
    urlSlug: 'montre-hifuture-lume-champagne',
    brand: 'MONTRE',
    category: 'MONTRES',
    price: 54.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.06,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '6972576182326',
        stock: 45,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #92 - SIMPLE
    sku: 'SKU-0092',
    name: 'MONTRE HIFUTURE LUME PRO TITANIUM',
    urlSlug: 'montre-hifuture-lume-pro-titanium',
    brand: 'MONTRE',
    category: 'MONTRES',
    price: 69.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.06,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '6972576182418',
        stock: 52,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #93 - SIMPLE
    sku: 'SKU-0093',
    name: 'MONTRE HIFUTURE AURA 2 GOLD',
    urlSlug: 'montre-hifuture-aura-2-gold',
    brand: 'MONTRE',
    category: 'MONTRES',
    price: 89.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.06,
    variants: [
      {
        color: 'Rose',
        colorCode: '#FFB6C1',
        ean: '6972576182548',
        stock: 24,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #94 - SIMPLE
    sku: 'SKU-0094',
    name: 'MONTRE HIFUTURE AURA SILVER',
    urlSlug: 'montre-hifuture-aura-silver',
    brand: 'MONTRE',
    category: 'MONTRES',
    price: 89.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.06,
    variants: [
      {
        color: 'Or',
        colorCode: '#FFD700',
        ean: '6972576182029',
        stock: 16,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #95 - SIMPLE
    sku: 'SKU-0095',
    name: 'MONTRE HIFUTURE AURA BROWN',
    urlSlug: 'montre-hifuture-aura-brown',
    brand: 'MONTRE',
    category: 'MONTRES',
    price: 89.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.06,
    variants: [
      {
        color: 'Or',
        colorCode: '#FFD700',
        ean: '6972576182050',
        stock: 18,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #96 - SIMPLE
    sku: 'SKU-0096',
    name: 'MONTRE HIFUTURE AURORA',
    urlSlug: 'montre-hifuture-aurora',
    brand: 'MONTRE',
    category: 'MONTRES',
    price: 89.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.06,
    variants: [
      {
        color: 'Bleu',
        colorCode: '#0066CC',
        ean: '6972576182036',
        stock: 27,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #97 - SIMPLE
    sku: 'SKU-0097',
    name: 'MONTRE HIFUTURE MIXX 3',
    urlSlug: 'montre-hifuture-mixx-3',
    brand: 'MONTRE',
    category: 'MONTRES',
    price: 99.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.06,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972576182494',
        stock: 27,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #98 - SIMPLE
    sku: 'SKU-0098',
    name: 'MONTRE HIFUTURE MIXX 3 FLUO',
    urlSlug: 'montre-hifuture-mixx-3-fluo',
    brand: 'MONTRE',
    category: 'MONTRES',
    price: 99.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.06,
    variants: [
      {
        color: 'Jaune',
        colorCode: '#FFD700',
        ean: '6972576182562',
        stock: 27,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #99 - SIMPLE
    sku: 'SKU-0099',
    name: 'MONTRE HIFUTURE AIX ACIER',
    urlSlug: 'montre-hifuture-aix-acier',
    brand: 'MONTRE',
    category: 'MONTRES',
    price: 119.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.06,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972576181428',
        stock: 5,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #100 - SIMPLE
    sku: 'SKU-0100',
    name: 'MONTRE HIFUTURE AIX E ACIER',
    urlSlug: 'montre-hifuture-aix-e-acier',
    brand: 'MONTRE',
    category: 'MONTRES',
    price: 119.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.06,
    variants: [
      {
        color: 'Gris',
        colorCode: '#808080',
        ean: '6972576181435',
        stock: 10,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #101 - SIMPLE
    sku: 'SKU-0101',
    name: 'MONTRE HIFUTURE VELA',
    urlSlug: 'montre-hifuture-vela',
    brand: 'MONTRE',
    category: 'MONTRES',
    price: 129.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.06,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972576182371',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #102 - SIMPLE
    sku: 'SKU-0102',
    name: 'MONTRE HIFUTURE VELA BEIGE',
    urlSlug: 'montre-hifuture-vela-beige',
    brand: 'MONTRE',
    category: 'MONTRES',
    price: 129.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.06,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '6972576182388',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #103 - SIMPLE
    sku: 'SKU-0103',
    name: 'HIFUTURE MONTRE ACTIVE + RED',
    urlSlug: 'hifuture-montre-active-red',
    brand: 'HIFUTURE',
    category: 'MONTRES',
    price: 169.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.06,
    variants: [
      {
        color: 'Black',
        colorCode: '#000000',
        ean: '6972576181992',
        stock: 18,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #104 - SIMPLE
    sku: 'SKU-0104',
    name: 'HIFUTURE MONTRE ACTIVE',
    urlSlug: 'hifuture-montre-active',
    brand: 'HIFUTURE',
    category: 'MONTRES',
    price: 169.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.06,
    variants: [
      {
        color: 'Silver',
        colorCode: '#C0C0C0',
        ean: '6972576182012',
        stock: 20,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #105 - SIMPLE
    sku: 'SKU-0105',
    name: 'CASQUE ANC HIFUTURE TOUR',
    urlSlug: 'casque-anc-hifuture-tour',
    brand: 'CASQUE',
    category: 'AUDIO',
    price: 44.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972576181350',
        stock: 109,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #106 - SIMPLE
    sku: 'SKU-0106',
    name: 'CASQUE ANC HIFUTURE TOUR X CHAMPAGNE',
    urlSlug: 'casque-anc-hifuture-tour-x-champagne',
    brand: 'CASQUE',
    category: 'AUDIO',
    price: 69.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '6972576182210',
        stock: 31,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #107 - SIMPLE
    sku: 'SKU-0107',
    name: 'CASQUE ANC HIFUTURE TOUR X',
    urlSlug: 'casque-anc-hifuture-tour-x',
    brand: 'CASQUE',
    category: 'AUDIO',
    price: 69.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972576182203',
        stock: 30,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #108 - SIMPLE
    sku: 'SKU-0108',
    name: 'ECOUTEUR HIFUTURE SONIFY',
    urlSlug: 'ecouteur-hifuture-sonify',
    brand: 'ECOUTEUR',
    category: 'AUDIO',
    price: 44.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972576182067',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #109 - SIMPLE
    sku: 'SKU-0109',
    name: 'ECOUTEUR HIFUTURE SONIFY CHAMPAGNE',
    urlSlug: 'ecouteur-hifuture-sonify-champagne',
    brand: 'ECOUTEUR',
    category: 'AUDIO',
    price: 44.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '6972576182074',
        stock: 18,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #110 - SIMPLE
    sku: 'SKU-0110',
    name: 'ECOUTEUR FILLAIRE HIFUTURE HI5 CHAMPAGNE',
    urlSlug: 'ecouteur-fillaire-hifuture-hi5-champagne',
    brand: 'ECOUTEUR',
    category: 'AUDIO',
    price: 16.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '6972576181626',
        stock: 61,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #111 - SIMPLE
    sku: 'SKU-0111',
    name: 'ECOUTEUR HIFUTURE SONIC AIR CHAMPAGNE',
    urlSlug: 'ecouteur-hifuture-sonic-air-champagne',
    brand: 'ECOUTEUR',
    category: 'AUDIO',
    price: 24.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '6972576181671',
        stock: 100,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #112 - SIMPLE
    sku: 'SKU-0112',
    name: 'ECOUTEUR HIFUTURE FLYBUDS 4 ANC',
    urlSlug: 'ecouteur-hifuture-flybuds-4-anc',
    brand: 'ECOUTEUR',
    category: 'AUDIO',
    price: 44.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972576182265',
        stock: 19,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #113 - SIMPLE
    sku: 'SKU-0113',
    name: 'ECOUTEUR HIFUTURE FLYBUDS 4 ANC CHAUD',
    urlSlug: 'ecouteur-hifuture-flybuds-4-anc-chaud',
    brand: 'ECOUTEUR',
    category: 'AUDIO',
    price: 44.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Rose',
        colorCode: '#FFB6C1',
        ean: '6972576182289',
        stock: 20,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #114 - SIMPLE
    sku: 'SKU-0114',
    name: 'ECOUTEUR HIFUTURE FLYBUDS 4 ANC BEIGE',
    urlSlug: 'ecouteur-hifuture-flybuds-4-anc-beige',
    brand: 'ECOUTEUR',
    category: 'AUDIO',
    price: 44.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Standard',
        colorCode: '#808080',
        ean: '6972576182296',
        stock: 22,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #115 - SIMPLE
    sku: 'SKU-0115',
    name: 'ECOUTEUR HIFUTURE YACHT GOLD',
    urlSlug: 'ecouteur-hifuture-yacht-gold',
    brand: 'ECOUTEUR',
    category: 'AUDIO',
    price: 59.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.12,
    variants: [
      {
        color: 'Black',
        colorCode: '#000000',
        ean: '6972576181374',
        stock: 3,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #116 - SIMPLE
    sku: 'SKU-0116',
    name: 'ENCEINTE HIFUTURE ALTUS CAMO',
    urlSlug: 'enceinte-hifuture-altus-camo',
    brand: 'ENCEINTE',
    category: 'AUDIO',
    price: 29.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.75,
    variants: [
      {
        color: 'Vert',
        colorCode: '#00AA44',
        ean: '6972576181510',
        stock: 0,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #117 - SIMPLE
    sku: 'SKU-0117',
    name: 'PARTYBOX HIFUTURE MUSICBOX',
    urlSlug: 'partybox-hifuture-musicbox',
    brand: 'PARTYBOX',
    category: 'AUDIO',
    price: 149.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.75,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972576181343',
        stock: 6,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #118 - SIMPLE
    sku: 'SKU-0118',
    name: 'PARTYBOX HIFUTURE EVENT HORIZON',
    urlSlug: 'partybox-hifuture-event-horizon',
    brand: 'PARTYBOX',
    category: 'AUDIO',
    price: 199.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.75,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972576181206',
        stock: 6,
        isDefault: true
      }
    ],
  },
  { // PRODUIT #119 - SIMPLE
    sku: 'SKU-0119',
    name: 'PARTYBOX HIFUTURE VOCALIST 300',
    urlSlug: 'partybox-hifuture-vocalist-300',
    brand: 'PARTYBOX',
    category: 'AUDIO',
    price: 269.99,
    repairability: null,
    dasHead: '' || null,
    dasBody: '' || null,
    dasLimb: '' || null,
    d3e: 0.75,
    variants: [
      {
        color: 'Noir',
        colorCode: '#000000',
        ean: '6972576181770',
        stock: 0,
        isDefault: true
      }
    ],
  },
];

async function importProducts() {
  console.log('🚀 IMPORT DES PRODUITS DANS SUPABASE');
  console.log('=' + '='.repeat(79));

  let success = 0;
  let errors = 0;

  for (const product of PRODUCTS_TO_IMPORT) {
    try {
      console.log(`\n⏳ Import: ${product.name}...`);

      const brandId = await getBrandId(product.brand);
      const categoryInfo = CATEGORIES[product.category];

      if (!categoryInfo) {
        console.error(`❌ Catégorie inconnue: ${product.category}`);
        errors++;
        continue;
      }

      const { data: productData, error: productError } = await supabase
        .from('products')
        .insert({
          sku: product.sku,
          name: product.name,
          url_slug: product.urlSlug,
          brand_id: brandId,
          category_id: categoryInfo.id,
          subcategory_id: null,
          price: product.price,
          description: `<div class="max-w-4xl mx-auto">
  <h3 class="text-2xl font-bold text-gray-900 mb-6">${product.name}</h3>
  <p class="text-gray-700">[PLACEHOLDER] Description à compléter</p>
</div>`,
          short_description: null,
          status: 'active',
          warranty: '2 ans',
          delivery_time: '24-48h',
          repairability_index: product.repairability,
          das_head: product.dasHead,
          das_body: product.dasBody,
          das_limb: product.dasLimb,
          d3e_tax: product.d3e,
          tva_rate: 8.5,
          images: null,
          specifications: {},
          highlights: ['[PLACEHOLDER]', '[PLACEHOLDER]', '[PLACEHOLDER]'],
        })
        .select('id')
        .single();

      if (productError || !productData) {
        console.error(`❌ Erreur produit: ${productError?.message}`);
        errors++;
        continue;
      }

      for (const variant of product.variants) {
        const variantData: any = {
          product_id: productData.id,
          color: variant.color,
          color_code: variant.colorCode,
          ean: variant.ean,
          stock: variant.stock,
          is_default: variant.isDefault,
        };

        if (variant.capacity) variantData.capacity = variant.capacity;
        if (variant.size) variantData.size = variant.size;

        const { error: variantError } = await supabase
          .from('product_variants')
          .insert(variantData);

        if (variantError) {
          console.error(`  ❌ Variant ${variant.color}: ${variantError.message}`);
        } else {
          console.log(`  ✅ Variant ${variant.color}`);
        }
      }

      console.log(`✅ ${product.name} importé!`);
      success++;

    } catch (error) {
      console.error(`❌ Erreur: ${error}`);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('📊 RÉSUMÉ');
  console.log('='.repeat(80));
  console.log(`✅ Succès: ${success}`);
  console.log(`❌ Erreurs: ${errors}`);
  console.log(`📦 Total: ${PRODUCTS_TO_IMPORT.length}`);
}

importProducts().catch(console.error);
