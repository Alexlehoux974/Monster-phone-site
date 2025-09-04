import json
import pandas as pd

def normalize_name(name):
    """Normalise les noms de produits pour la comparaison"""
    if not name:
        return ""
    # Enlever les espaces multiples et mettre en majuscules
    name = ' '.join(str(name).upper().split())
    # Enlever HT à la fin
    name = name.replace(' HT', '').replace(' TTC', '')
    return name.strip()

def load_excel_products():
    """Charge les produits depuis le fichier Excel"""
    df = pd.read_excel('/root/Monster-Phone-Images/STOCK BOUTIQUE ICELL4 AOUT 2025.xlsx')
    df = df.dropna(subset=['MODELE'])
    df = df[df['MODELE'].str.strip() != '']
    
    products = set()
    for _, row in df.iterrows():
        model = normalize_name(row['MODELE'])
        if model and model != 'TOTAL':
            products.add(model)
    
    return products

# Charger les produits Excel
print("=" * 80)
print("ANALYSE DES PRODUITS FICTIFS")
print("=" * 80)

excel_products = load_excel_products()
print(f"\n✅ Produits réels dans Excel: {len(excel_products)} produits uniques")

# Charger les produits Supabase depuis le fichier JSON
with open('/root/monster-phone-dev/monster-phone-boutique/scripts/supabase_products.json', 'w') as f:
    supabase_data = [
        {"name": "MONSTER Illuminescence Smart Beam + 2X Bars Kit", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "MONSTER Enceinte Karaoké Enfants", "brand_name": "MONSTER", "category_slug": "audio"},
        {"name": "HIFUTURE AirLinks Pro", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "HONOR PAD 9 WiFi", "brand_name": "HONOR", "category_slug": "tablettes"},
        {"name": "HIFUTURE Enceinte Ascendo Noir", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "HIFUTURE Enceinte Ascendo Rose", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "MONSTER Party Lights Pro", "brand_name": "MONSTER", "category_slug": None},
        {"name": "HONOR X9B 12+8/256", "brand_name": "HONOR", "category_slug": "smartphones"},
        {"name": "MONSTER Mission 100", "brand_name": "MONSTER", "category_slug": "audio"},
        {"name": "HONOR X6B 6+6/128", "brand_name": "HONOR", "category_slug": "smartphones"},
        {"name": "MY WAY Câble Lumineux USB-C", "brand_name": "MY WAY", "category_slug": "accessoires"},
        {"name": "MY WAY Câble Lumineux USB-A", "brand_name": "MY WAY", "category_slug": "accessoires"},
        {"name": "MONSTER Ambient Light Bar", "brand_name": "MONSTER", "category_slug": None},
        {"name": "HONOR X8B Gris 8+8/512", "brand_name": "HONOR", "category_slug": "smartphones"},
        {"name": "HIFUTURE Montre EVO 2 Beige", "brand_name": "HIFUTURE", "category_slug": "montres"},
        {"name": "MONSTER UV Black Light", "brand_name": "MONSTER", "category_slug": None},
        {"name": "MONSTER Illuminescence LED Strip 10M", "brand_name": "MONSTER", "category_slug": None},
        {"name": "MONSTER Illuminescence LED Strip 30M", "brand_name": "MONSTER", "category_slug": None},
        {"name": "NOKIA G42 5G", "brand_name": "NOKIA", "category_slug": "smartphones"},
        {"name": "HONOR Watch 4", "brand_name": "HONOR", "category_slug": "montres"},
        {"name": "HIFUTURE Montre EVO 2 Noir", "brand_name": "HIFUTURE", "category_slug": "montres"},
        {"name": "MONSTER Câble USB-C 100W PD", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Illuminescence Smart Hexa", "brand_name": "MONSTER", "category_slug": None},
        {"name": "MONSTER Solar Path Lights", "brand_name": "MONSTER", "category_slug": None},
        {"name": "MONSTER Grow Light Full Spectrum", "brand_name": "MONSTER", "category_slug": None},
        {"name": "MY WAY PowerBank 20000mAh", "brand_name": "MY WAY", "category_slug": "accessoires"},
        {"name": "MONSTER ENCEINTE PARTY", "brand_name": "MONSTER", "category_slug": "audio"},
        {"name": "MUVIT KidPic Rouleaux Papier Photo", "brand_name": "MUVIT", "category_slug": "accessoires"},
        {"name": "MONSTER Chargeur Voiture 100W", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "NOKIA 110 4G 2024", "brand_name": "NOKIA", "category_slug": "smartphones"},
        {"name": "NOKIA C32", "brand_name": "NOKIA", "category_slug": "smartphones"},
        {"name": "NOKIA 105 2023", "brand_name": "NOKIA", "category_slug": "smartphones"},
        {"name": "MONSTER Protection Écran Verre Trempé", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Support Téléphone Vélo", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Kit Nettoyage Tech Complet", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "HIFUTURE Zone 2 Rose", "brand_name": "HIFUTURE", "category_slug": "montres"},
        {"name": "HIFUTURE Enceinte Ascendo", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "MONSTER LED Ring Light Studio Pro 18\"", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "HONOR X8B Noir 8+8/512", "brand_name": "HONOR", "category_slug": "smartphones"},
        {"name": "HIFUTURE Zone 2 Noir", "brand_name": "HIFUTURE", "category_slug": "montres"},
        {"name": "HIFUTURE GRAVITY Enceinte Bluetooth", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "HIFUTURE Aurora", "brand_name": "HIFUTURE", "category_slug": "montres"},
        {"name": "HONOR Choice Watch", "brand_name": "HONOR", "category_slug": "montres"},
        {"name": "MONSTER Illuminescence Basic Light Strip 30M RGB", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "MONSTER Cube LED Modulaire Smart", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "MONSTER Organisateur Câbles Pro", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Webcam 4K Pro", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Clavier Mécanique Gaming RGB", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Souris Gaming 16000 DPI", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MY WAY Câble Lumineux Lightning", "brand_name": "MY WAY", "category_slug": "accessoires"},
        {"name": "MONSTER Smart Prism 3", "brand_name": "MONSTER", "category_slug": None},
        {"name": "MONSTER TH300 Tactile", "brand_name": "MONSTER", "category_slug": "audio"},
        {"name": "CASQUE ANC HIFUTURE TOUR X", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "HIFUTURE Lume", "brand_name": "HIFUTURE", "category_slug": "montres"},
        {"name": "NOKIA 110 4G 2025", "brand_name": "NOKIA", "category_slug": "smartphones"},
        {"name": "MONSTER Illuminescence Smart Chroma Light 2X Bars", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "MONSTER Câble HDMI 8K Ultra HD", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Lightning Pro Corner RGB", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "HIFUTURE Active", "brand_name": "HIFUTURE", "category_slug": "montres"},
        {"name": "MONSTER Station Charge Sans Fil 3-en-1", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "HIFUTURE Kids Watch", "brand_name": "HIFUTURE", "category_slug": "montres"},
        {"name": "NOKIA 2720 Flip", "brand_name": "NOKIA", "category_slug": "smartphones"},
        {"name": "HONOR X7C 8+6/256", "brand_name": "HONOR", "category_slug": "smartphones"},
        {"name": "HIFUTURE Enceinte Ripple", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "NOKIA 225 4G", "brand_name": "NOKIA", "category_slug": "smartphones"},
        {"name": "MONSTER Ventilateur RGB PC 120mm", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "HONOR X8a", "brand_name": "HONOR", "category_slug": "smartphones"},
        {"name": "HONOR X7a", "brand_name": "HONOR", "category_slug": "smartphones"},
        {"name": "MONSTER Illuminescence Light Strip Pack 2X 5M RGB+W", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "MONSTER Illuminescence Smart Prism II RGB+IC", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "HIFUTURE Casque ANC Tour", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "MY WAY Câble Lumineux Micro USB", "brand_name": "MY WAY", "category_slug": "accessoires"},
        {"name": "MONSTER Écouteurs Gaming RGB", "brand_name": "MONSTER", "category_slug": "audio"},
        {"name": "MONSTER Dissipateur CPU Tower RGB", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "HIFUTURE Lume Pro", "brand_name": "HIFUTURE", "category_slug": "montres"},
        {"name": "NOKIA X30 5G", "brand_name": "NOKIA", "category_slug": "smartphones"},
        {"name": "MONSTER Flood Light Extérieur 50W", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "HONOR Router 3", "brand_name": "HONOR", "category_slug": "accessoires"},
        {"name": "HIFUTURE HappyBuds", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "MY WAY Écouteurs Sport Bluetooth", "brand_name": "MY WAY", "category_slug": "audio"},
        {"name": "MONSTER N-Lite 206", "brand_name": "MONSTER", "category_slug": "audio"},
        {"name": "MONSTER Tapis Charge Sans Fil XXL", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER SSD Externe 1TB", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Batterie Solaire 30000mAh", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "HIFUTURE Vela", "brand_name": "HIFUTURE", "category_slug": "montres"},
        {"name": "MONSTER Illuminescence Smart Light Strip Multicolor Flow", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "NOKIA 8210 4G", "brand_name": "NOKIA", "category_slug": "smartphones"},
        {"name": "HONOR X5B 4+4/64", "brand_name": "HONOR", "category_slug": "smartphones"},
        {"name": "MY WAY PowerBank 10000mAh Slim", "brand_name": "MY WAY", "category_slug": "accessoires"},
        {"name": "MY WAY Powerbank", "brand_name": "MY WAY", "category_slug": "accessoires"},
        {"name": "MONSTER Illuminescence Neon Light Strip", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "MONSTER Illuminescence Light Strip 5M Multicolor IPX6", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "MONSTER Illuminescence Light Strip Color/Blanc", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "MONSTER Pack Gaming Starter", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Illuminescence Basic Ampoule A19", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "MONSTER Smart Bulb RGB WiFi Pack x4", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "MONSTER N-Lite 203 Batterie Portable Premium 20000mAh", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Câble HDMI Standard", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "NOKIA G22", "brand_name": "NOKIA", "category_slug": "smartphones"},
        {"name": "NOKIA T20 Tablette", "brand_name": "NOKIA", "category_slug": "tablettes"},
        {"name": "MY WAY Support Voiture Aimanté Premium", "brand_name": "MY WAY", "category_slug": "accessoires"},
        {"name": "HIFUTURE Trek Outdoor Speaker", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "MONSTER Câble Micro USB Renforcé Military Grade", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "HIFUTURE Écouteur Yacht", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "HIFUTURE Enceinte Altus", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "HIFUTURE Écouteur Olymbuds 3", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "MY WAY Chargeur GaN 65W", "brand_name": "MY WAY", "category_slug": "accessoires"},
        {"name": "MONSTER Câble Multi 6-en-1", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Câble HDMI Ultra HD 4K 2M", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "HIFUTURE Écouteur Sonic Air", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "MONSTER Illuminescence LED Touch Light X3 RGB", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "MONSTER Illuminescence Basic Lightstrip Sound Flow", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "HIFUTURE FlyBuds 3", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "HIFUTURE Titan Smartwatch", "brand_name": "HIFUTURE", "category_slug": "montres"},
        {"name": "HIFUTURE SoundBox Pro", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "HIFUTURE ColorBuds 2", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "MONSTER CABLE HDMI ESSENTIAL 4K", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "NOKIA 110 2023", "brand_name": "NOKIA", "category_slug": "smartphones"},
        {"name": "MONSTER Illuminescence Basic Lightstrip Multicouleur", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "MONSTER Illuminescence Smart Light Strip RGB+W", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "MONSTER Illuminescence Basic Ampoule A19", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "HIFUTURE MegaBoom", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "MONSTER Adaptateur Universel Voyage", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Persona SE ANC", "brand_name": "MONSTER", "category_slug": "audio"},
        {"name": "HIFUTURE Neckband Pro", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "HIFUTURE Speaker Float", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "HIFUTURE EVO 2", "brand_name": "HIFUTURE", "category_slug": "montres"},
        {"name": "MONSTER Dock Station USB-C 11-en-1", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "HONOR 200 PRO 12+12/512", "brand_name": "HONOR", "category_slug": "smartphones"},
        {"name": "MONSTER Carte Micro SD 256GB", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Ring Light Pro 18\" Streaming", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Support Manette Gaming RGB Premium", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Câble USB-C Charge Rapide 100W", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Champion Airlinks", "brand_name": "MONSTER", "category_slug": "audio"},
        {"name": "MONSTER Néon LED Gaming \"GAME ON\"", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Câble Multi 3-en-1 Universal", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Element Air", "brand_name": "MONSTER", "category_slug": "audio"},
        {"name": "MONSTER Câble AUX 3.5mm Gold Plated Pro", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Câble Lightning Pro MFi Certifié", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Lampe Bureau LED Tactile", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Cube LED RGB Intelligent WiFi", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Barre LED Écran Eye-Care", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER LED Strip RGB Gaming 5M Sync Music", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "HIFUTURE Écouteur Flybuds 4 ANC", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "HIFUTURE Écouteur Sonify", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "MONSTER Batterie Externe 20000mAh PD 22.5W", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Bungee Souris Gaming Anti-Friction", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Panneaux LED Hexagonaux x6", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Projecteur LED Galaxie Bluetooth", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Smart LED Panel Hexagonal Kit", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "MONSTER Station Charge Sans Fil 15W Qi", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Station Charge 6 Ports 120W Desktop", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Chargeur Mural GaN 65W 3 Ports", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Tapis Souris Gaming XXL RGB 900x400mm", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Ambient TV LED Backlight 4K", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "MONSTER LED Strip Gaming Setup 5M", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "MONSTER Chargeur Voiture 45W Dual USB-C", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Support Écran Gaming RGB avec Tiroirs", "brand_name": "MONSTER", "category_slug": "accessoires"},
        {"name": "MONSTER Infinity Mirror LED 3D", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "MONSTER Projecteur LED Galaxy Starlight", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "HIFUTURE MIXX 3", "brand_name": "HIFUTURE", "category_slug": "montres"},
        {"name": "MONSTER RGB Gaming Light Bars Pro", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "HIFUTURE Écouteur Filaire Hi5", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "HIFUTURE PartyBox Event Horizon", "brand_name": "HIFUTURE", "category_slug": "audio"},
        {"name": "MONSTER ENCEINTE S150", "brand_name": "MONSTER", "category_slug": "audio"},
        {"name": "MONSTER Illuminescence DUO Monitor Light", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "MONSTER Illuminescence Neon Flex", "brand_name": "MONSTER", "category_slug": None},
        {"name": "MONSTER Illuminescence Smart Light Strip 5M RGB+IC", "brand_name": "MONSTER", "category_slug": "led"},
        {"name": "HIFUTURE Pulse Fitness Band", "brand_name": "HIFUTURE", "category_slug": "montres"},
        {"name": "HIFUTURE Aura 2", "brand_name": "HIFUTURE", "category_slug": "montres"},
        {"name": "HIFUTURE Écouteur Conduction Air Mate", "brand_name": "HIFUTURE", "category_slug": "audio"}
    ]
    json.dump(supabase_data, f, indent=2, ensure_ascii=False)

# Analyser les produits Supabase
supabase_names = set()
for product in supabase_data:
    name = normalize_name(product['name'])
    supabase_names.add(name)

print(f"📊 Produits dans Supabase: {len(supabase_names)}")

# Identifier les produits fictifs
fictitious = supabase_names - excel_products
real_products = supabase_names & excel_products
missing_from_supabase = excel_products - supabase_names

print(f"\n❌ PRODUITS FICTIFS (dans Supabase mais PAS dans Excel): {len(fictitious)}")
print(f"✅ PRODUITS RÉELS (présents dans les deux): {len(real_products)}")
print(f"⚠️ PRODUITS MANQUANTS dans Supabase (dans Excel mais pas dans Supabase): {len(missing_from_supabase)}")

# Afficher les produits fictifs par marque
print("\n" + "=" * 80)
print("PRODUITS FICTIFS À SUPPRIMER DU HEADER")
print("=" * 80)

fictitious_by_brand = {}
for product in supabase_data:
    normalized = normalize_name(product['name'])
    if normalized in fictitious:
        brand = product['brand_name']
        if brand not in fictitious_by_brand:
            fictitious_by_brand[brand] = []
        fictitious_by_brand[brand].append(product['name'])

for brand, products in sorted(fictitious_by_brand.items()):
    print(f"\n{brand} ({len(products)} produits fictifs):")
    for p in products[:10]:
        print(f"  - {p}")
    if len(products) > 10:
        print(f"  ... et {len(products) - 10} autres")

# Sauvegarder les produits fictifs
with open('/root/monster-phone-dev/monster-phone-boutique/scripts/fictitious_products.json', 'w') as f:
    json.dump(list(fictitious), f, indent=2, ensure_ascii=False)

# Sauvegarder les produits réels
with open('/root/monster-phone-dev/monster-phone-boutique/scripts/real_products.json', 'w') as f:
    json.dump(list(real_products), f, indent=2, ensure_ascii=False)

print("\n" + "=" * 80)
print("FICHIERS SAUVEGARDÉS:")
print("  - fictitious_products.json (produits à supprimer)")
print("  - real_products.json (produits à garder)")
print("=" * 80)