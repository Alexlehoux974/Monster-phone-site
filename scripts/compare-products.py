import pandas as pd
import asyncio
from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

# Configuration Supabase
SUPABASE_URL = os.getenv('NEXT_PUBLIC_SUPABASE_URL', 'https://jxvpzdxvflfoxaburwyk.supabase.co')
SUPABASE_KEY = os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4dnB6ZHh2Zmxmb3hhYnVyd3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0ODc4NzgsImV4cCI6MjA0NzA2Mzg3OH0.vGRn_6Ks0V1OujCfO5125wPCmJTKjARQFQFmH29mwRE')

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

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

def load_supabase_products():
    """Charge les produits depuis Supabase"""
    response = supabase.table('product_full_view').select('name, brand_name, category_slug, stock_quantity').execute()
    
    products = []
    for product in response.data:
        name = normalize_name(product['name'])
        if name:
            products.append({
                'name': name,
                'brand': product.get('brand_name', ''),
                'category': product.get('category_slug', ''),
                'stock': product.get('stock_quantity', 0)
            })
    
    return products

def main():
    print("=" * 80)
    print("COMPARAISON FICHIER EXCEL vs SUPABASE")
    print("=" * 80)
    
    # Charger les données
    excel_products = load_excel_products()
    supabase_products = load_supabase_products()
    
    # Créer des sets pour comparaison rapide
    excel_names = {p['name'] for p in excel_products}
    supabase_names = {p['name'] for p in supabase_products}
    
    print(f"\n📊 STATISTIQUES:")
    print(f"  - Produits dans Excel: {len(excel_names)}")
    print(f"  - Produits dans Supabase: {len(supabase_names)}")
    
    # Produits fictifs (dans Supabase mais pas dans Excel)
    fictitious = supabase_names - excel_names
    print(f"\n❌ PRODUITS FICTIFS (dans Supabase mais PAS dans Excel): {len(fictitious)}")
    if fictitious:
        print("\nListe des produits fictifs à SUPPRIMER du header:")
        for i, name in enumerate(sorted(fictitious), 1):
            # Trouver les détails du produit
            details = next((p for p in supabase_products if p['name'] == name), {})
            print(f"  {i}. {name}")
            if details.get('brand'):
                print(f"     Marque: {details['brand']}, Catégorie: {details.get('category', 'N/A')}")
    
    # Produits manquants (dans Excel mais pas dans Supabase)
    missing = excel_names - supabase_names
    print(f"\n⚠️ PRODUITS MANQUANTS (dans Excel mais PAS dans Supabase): {len(missing)}")
    if missing:
        print("\nListe des produits à potentiellement AJOUTER:")
        for i, name in enumerate(sorted(missing)[:20], 1):  # Limiter à 20 pour lisibilité
            details = next((p for p in excel_products if p['name'] == name), {})
            print(f"  {i}. {name} (Stock: {details.get('quantity', 0)})")
    
    # Produits communs (OK)
    common = excel_names & supabase_names
    print(f"\n✅ PRODUITS COMMUNS (OK): {len(common)}")
    
    # Analyse par marque des produits fictifs
    print("\n📈 ANALYSE PAR MARQUE DES PRODUITS FICTIFS:")
    brand_analysis = {}
    for name in fictitious:
        details = next((p for p in supabase_products if p['name'] == name), {})
        brand = details.get('brand', 'UNKNOWN')
        if brand not in brand_analysis:
            brand_analysis[brand] = []
        brand_analysis[brand].append(name)
    
    for brand, products in sorted(brand_analysis.items()):
        print(f"\n  {brand}: {len(products)} produits fictifs")
        for p in products[:5]:  # Afficher max 5 exemples
            print(f"    - {p}")
        if len(products) > 5:
            print(f"    ... et {len(products) - 5} autres")
    
    print("\n" + "=" * 80)
    print("RECOMMANDATION: Supprimer ou masquer les produits fictifs identifiés ci-dessus")
    print("=" * 80)

if __name__ == "__main__":
    main()