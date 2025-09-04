import pandas as pd
import json

def normalize_name(name):
    """Normalise les noms de produits pour la comparaison"""
    if pd.isna(name) or not name:
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
    
    products = []
    for _, row in df.iterrows():
        model = normalize_name(row['MODELE'])
        if model and model != 'TOTAL':
            products.append({
                'name': model,
                'reference': row.get('Référence', ''),
                'quantity': row.get('QUANTITE STOCK TOTAL', 0)
            })
    
    return products

# Charger les produits Excel
excel_products = load_excel_products()
excel_names = {p['name'] for p in excel_products}

print("=" * 80)
print("PRODUITS DU FICHIER EXCEL (STOCK RÉEL)")
print("=" * 80)
print(f"\nTotal: {len(excel_names)} produits uniques\n")

# Organiser par marque
by_brand = {}
for name in sorted(excel_names):
    if 'HONOR' in name:
        brand = 'HONOR'
    elif 'HIFUTURE' in name:
        brand = 'HIFUTURE'
    elif 'MONSTER' in name:
        brand = 'MONSTER'
    elif 'NOKIA' in name:
        brand = 'NOKIA'
    elif 'MY WAY' in name or 'MYWAY' in name:
        brand = 'MY WAY'
    elif 'MUVIT' in name:
        brand = 'MUVIT'
    elif 'ABYX' in name:
        brand = 'ABYX'
    else:
        brand = 'AUTRES'
    
    if brand not in by_brand:
        by_brand[brand] = []
    by_brand[brand].append(name)

# Afficher par marque
for brand, products in sorted(by_brand.items()):
    print(f"\n{brand} ({len(products)} produits):")
    for p in products[:10]:  # Afficher max 10 produits par marque
        print(f"  - {p}")
    if len(products) > 10:
        print(f"  ... et {len(products) - 10} autres")

# Sauvegarder la liste pour usage ultérieur
with open('/root/monster-phone-dev/monster-phone-boutique/scripts/excel_products.json', 'w') as f:
    json.dump(list(excel_names), f, indent=2, ensure_ascii=False)

print("\n" + "=" * 80)
print("Liste sauvegardée dans excel_products.json")
print("=" * 80)