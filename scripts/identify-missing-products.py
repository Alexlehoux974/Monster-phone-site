#!/usr/bin/env python3
"""
Script pour identifier les produits manquants dans Supabase
en comparant avec le fichier Excel STOCK BOUTIQUE ICELL4 AOUT 2025.xlsx
"""

import pandas as pd
import json
import re
from typing import Dict, List, Set

def clean_model_name(model: str) -> str:
    """Nettoie le nom du modèle pour la comparaison"""
    if pd.isna(model):
        return ""
    model = str(model).upper()
    # Enlever les mentions HT/TTC
    model = re.sub(r'\s+(HT|TTC)$', '', model)
    # Normaliser les espaces
    model = ' '.join(model.split())
    return model.strip()

def extract_brand(model: str) -> str:
    """Extrait la marque depuis le nom du modèle"""
    model_upper = str(model).upper()
    if 'HONOR' in model_upper:
        return 'HONOR'
    elif 'NOKIA' in model_upper:
        return 'NOKIA'
    elif 'MONSTER' in model_upper:
        return 'Monster'
    elif 'HIFUTURE' in model_upper:
        return 'HIFUTURE'
    elif 'MUVIT' in model_upper:
        return 'MUVIT'
    elif 'ASCENDO' in model_upper:
        return 'ASCENDO'
    elif 'MY WAY' in model_upper or 'MYWAY' in model_upper:
        return 'MY WAY'
    elif 'ABYX' in model_upper:
        return 'ABYX'
    else:
        return 'Autre'

def generate_sku(model: str, reference: str = None) -> str:
    """Génère un SKU basé sur le modèle et la référence"""
    brand = extract_brand(model)
    
    # Si on a une référence EAN valide, l'utiliser
    if reference and str(reference) != 'nan' and str(reference) != '0':
        return str(reference)
    
    # Sinon générer un SKU basé sur le nom
    model_clean = clean_model_name(model)
    # Remplacer les espaces par des tirets
    sku_base = model_clean.replace(' ', '-').replace('/', '-')
    # Enlever les caractères spéciaux
    sku_base = re.sub(r'[^A-Z0-9\-]', '', sku_base)
    
    return sku_base[:50]  # Limiter la longueur

def extract_category(model: str) -> str:
    """Détermine la catégorie basée sur le modèle"""
    model_upper = str(model).upper()
    
    if any(word in model_upper for word in ['SMARTPHONE', 'HONOR X', 'NOKIA 110', 'NOKIA G']):
        return 'Smartphones'
    elif any(word in model_upper for word in ['TABLETTE', 'PAD', 'TAB']):
        return 'Tablettes'
    elif any(word in model_upper for word in ['MONTRE', 'WATCH', 'BAND', 'FIT', 'EVO']):
        return 'Montres'
    elif any(word in model_upper for word in ['CASQUE', 'ECOUTEUR', 'EARBUDS', 'FLYBUDS', 'OLYMBUDS', 'AIRLINKS']):
        return 'Audio'
    elif any(word in model_upper for word in ['ENCEINTE', 'SPEAKER', 'PARTYBOX', 'GRAVITY', 'RIPPLE']):
        return 'Audio'
    elif any(word in model_upper for word in ['CABLE', 'CÂBLE', 'HDMI', 'USB', 'LIGHTNING']):
        return 'Accessoires'
    elif any(word in model_upper for word in ['CHARGEUR', 'POWERBANK', 'BATTERIE', 'STATION']):
        return 'Accessoires'
    elif any(word in model_upper for word in ['LED', 'ILLUMINESCENCE', 'LIGHT', 'LAMPE', 'NEON']):
        return 'Éclairage'
    elif any(word in model_upper for word in ['APPAREIL PHOTO', 'KIDPIC']):
        return 'Photo'
    else:
        return 'Accessoires'

# Lire le fichier Excel
print("📖 Lecture du fichier Excel...")
df_excel = pd.read_excel('/root/Monster-Phone-Images/STOCK BOUTIQUE ICELL4 AOUT 2025.xlsx')

# Nettoyer les données
df_excel = df_excel.dropna(subset=['MODELE'])
df_excel = df_excel[df_excel['MODELE'] != 'TOTAL']
df_excel['MODELE_CLEAN'] = df_excel['MODELE'].apply(clean_model_name)
df_excel['Marque'] = df_excel['MODELE'].apply(extract_brand)
df_excel['Categorie'] = df_excel['MODELE'].apply(extract_category)
df_excel['SKU_GENERE'] = df_excel.apply(lambda row: generate_sku(row['MODELE'], row.get('EAN')), axis=1)

print(f"✅ {len(df_excel)} produits trouvés dans Excel après nettoyage")

# Charger les produits existants de Supabase
print("\n📖 Lecture des produits Supabase...")
supabase_products = [
    "CASQUE ANC HIFUTURE TOUR X", "HIFUTURE Active", "HIFUTURE Aura 2", "HIFUTURE Aurora",
    "HIFUTURE Casque ANC Tour", "HIFUTURE Écouteur Conduction Air Mate", "HIFUTURE Écouteur Filaire Hi5",
    "HIFUTURE Écouteur Flybuds 4 ANC", "HIFUTURE Écouteur Olymbuds 3", "HIFUTURE Écouteur Sonic Air",
    "HIFUTURE Écouteur Sonify", "HIFUTURE Écouteur Yacht", "HIFUTURE Enceinte Altus", "HIFUTURE Enceinte Ascendo",
    "HIFUTURE Enceinte Ripple", "HIFUTURE EVO 2", "HIFUTURE GRAVITY Enceinte Bluetooth", "HIFUTURE Lume",
    "HIFUTURE Lume Pro", "HIFUTURE MIXX 3", "HIFUTURE PartyBox Event Horizon", "HIFUTURE Vela",
    "HONOR 200 PRO 12+12/512", "HONOR PAD 9 WiFi", "HONOR X5B 4+4/64", "HONOR X6B 6+6/128", "HONOR X7C 8+6/256",
    "HONOR X9B 12+8/256", "MONSTER Ambient TV LED Backlight 4K", "MONSTER Barre LED Écran Eye-Care",
    "MONSTER Batterie Externe 20000mAh PD 22.5W", "MONSTER Bungee Souris Gaming Anti-Friction",
    "MONSTER Câble AUX 3.5mm Gold Plated Pro", "MONSTER CABLE HDMI ESSENTIAL 4K", "MONSTER Câble HDMI Standard",
    "MONSTER Câble HDMI Ultra HD 4K 2M", "MONSTER Câble Lightning Pro MFi Certifié",
    "MONSTER Câble Micro USB Renforcé Military Grade", "MONSTER Câble Multi 3-en-1 Universal",
    "MONSTER Câble USB-C Charge Rapide 100W", "MONSTER Champion Airlinks", "MONSTER Chargeur Mural GaN 65W 3 Ports",
    "MONSTER Chargeur Voiture 45W Dual USB-C", "MONSTER Cube LED Modulaire Smart", "MONSTER Cube LED RGB Intelligent WiFi",
    "MONSTER Element Air", "MONSTER ENCEINTE PARTY", "MONSTER ENCEINTE S150", "MONSTER Flood Light Extérieur 50W",
    "MONSTER Illuminescence Basic Ampoule A19", "MONSTER Illuminescence Basic Light Strip 30M RGB",
    "MONSTER Illuminescence Basic Lightstrip Multicouleur", "MONSTER Illuminescence Basic Lightstrip Sound Flow",
    "MONSTER Illuminescence DUO Monitor Light", "MONSTER Illuminescence LED Touch Light X3 RGB",
    "MONSTER Illuminescence Light Strip 5M Multicolor IPX6", "MONSTER Illuminescence Light Strip Color/Blanc",
    "MONSTER Illuminescence Light Strip Pack 2X 5M RGB+W", "MONSTER Illuminescence Neon Light Strip",
    "MONSTER Illuminescence Smart Beam + 2X Bars Kit", "MONSTER Illuminescence Smart Chroma Light 2X Bars",
    "MONSTER Illuminescence Smart Light Strip 5M RGB+IC", "MONSTER Illuminescence Smart Light Strip Multicolor Flow",
    "MONSTER Illuminescence Smart Light Strip RGB+W", "MONSTER Illuminescence Smart Prism II RGB+IC",
    "MONSTER Infinity Mirror LED 3D", "MONSTER Lampe Bureau LED Tactile", "MONSTER LED Ring Light Studio Pro 18\"",
    "MONSTER LED Strip Gaming Setup 5M", "MONSTER LED Strip RGB Gaming 5M Sync Music", "MONSTER Lightning Pro Corner RGB",
    "MONSTER Mission 100", "MONSTER N-Lite 203 Batterie Portable Premium 20000mAh", "MONSTER N-Lite 206",
    "MONSTER Néon LED Gaming \"GAME ON\"", "MONSTER Panneaux LED Hexagonaux x6", "MONSTER Persona SE ANC",
    "MONSTER Projecteur LED Galaxie Bluetooth", "MONSTER Projecteur LED Galaxy Starlight", "MONSTER RGB Gaming Light Bars Pro",
    "MONSTER Ring Light Pro 18\" Streaming", "MONSTER Smart Bulb RGB WiFi Pack x4", "MONSTER Smart LED Panel Hexagonal Kit",
    "MONSTER Station Charge 6 Ports 120W Desktop", "MONSTER Station Charge Sans Fil 15W Qi",
    "MONSTER Support Écran Gaming RGB avec Tiroirs", "MONSTER Support Manette Gaming RGB Premium",
    "MONSTER Tapis Souris Gaming XXL RGB 900x400mm", "MONSTER TH300 Tactile", "MUVIT Casque Sans Fil Enfant",
    "MUVIT KidPic Appareil Photo Enfant", "MUVIT KidPic Rouleaux Papier Photo", "MY WAY Câble Lumineux USB-A",
    "MY WAY Câble Lumineux USB-C", "MY WAY Powerbank", "NOKIA 110 2023", "NOKIA 110 4G 2025", "NOKIA G22"
]

# Normaliser les noms pour la comparaison
supabase_names_clean = [clean_model_name(name) for name in supabase_products]

print(f"✅ {len(supabase_products)} produits trouvés dans Supabase")

# Identifier les produits manquants
print("\n🔍 Identification des produits manquants...")
missing_products = []

for idx, row in df_excel.iterrows():
    model_clean = row['MODELE_CLEAN']
    
    # Vérifier si le produit existe dans Supabase (comparaison approximative)
    found = False
    for supabase_name in supabase_names_clean:
        # Comparaison flexible
        if model_clean in supabase_name or supabase_name in model_clean:
            found = True
            break
        
        # Comparaison par mots clés pour les variantes de couleur
        model_words = set(model_clean.split())
        supabase_words = set(supabase_name.split())
        common_words = model_words.intersection(supabase_words)
        
        # Si on a au moins 3 mots en commun et c'est le même produit de base
        if len(common_words) >= 3:
            # Vérifier si c'est juste une variante de couleur
            color_words = {'NOIR', 'BLEU', 'VERT', 'ROSE', 'BLANC', 'ROUGE', 'BEIGE', 'GOLD'}
            diff = model_words.symmetric_difference(supabase_words)
            if diff.issubset(color_words):
                found = True
                break
    
    if not found:
        missing_products.append({
            'reference': row.get('Référence', ''),
            'modele': row['MODELE'],
            'modele_clean': model_clean,
            'marque': row['Marque'],
            'categorie': row['Categorie'],
            'sku': row['SKU_GENERE'],
            'ean': row.get('EAN', ''),
            'prix': row.get('PVC', row.get('PRIX UNITAIRE', 0)),
            'stock': row.get('QUANTITE STOCK TOTAL', 0),
            'indice_reparabilite': row.get('INDICE REPARABILITE', None),
            'das_tete': row.get('DAS tête', None),
            'das_corps': row.get('DAS Corps', None),
            'das_membre': row.get('Das Membre', None)
        })

print(f"\n📊 Résultat de l'analyse:")
print(f"  • Total produits Excel: {len(df_excel)}")
print(f"  • Produits dans Supabase: {len(supabase_products)}")
print(f"  • Produits manquants: {len(missing_products)}")

# Afficher le résumé par marque
if missing_products:
    print("\n📦 Produits manquants par marque:")
    marques_count = {}
    for product in missing_products:
        marque = product['marque']
        if marque not in marques_count:
            marques_count[marque] = []
        marques_count[marque].append(product['modele'])
    
    for marque, produits in sorted(marques_count.items()):
        print(f"\n  {marque} ({len(produits)} produits):")
        for i, produit in enumerate(produits[:5], 1):  # Afficher max 5 exemples
            print(f"    {i}. {produit}")
        if len(produits) > 5:
            print(f"    ... et {len(produits) - 5} autres")

# Sauvegarder les produits manquants
output_file = '/root/monster-phone-dev/monster-phone-boutique/scripts/missing-products.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(missing_products, f, ensure_ascii=False, indent=2)

print(f"\n✅ Liste des produits manquants sauvegardée dans: {output_file}")
print(f"   Utilisez ce fichier pour ajouter les produits manquants à Supabase")