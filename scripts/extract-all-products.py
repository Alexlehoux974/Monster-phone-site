import pandas as pd

df = pd.read_excel('/root/Monster-Phone-Images/STOCK BOUTIQUE ICELL4 AOUT 2025.xlsx')
df = df.dropna(subset=['MODELE'])
df = df[df['MODELE'].str.strip() != '']

products = []
for _, row in df.iterrows():
    model = str(row['MODELE']).strip()
    if model and model != 'TOTAL':
        products.append(model)

# Retirer les duplicatas
products = list(set(products))

# Trier par marque
brands = {}
for p in products:
    if 'HONOR' in p.upper():
        brand = 'HONOR'
    elif 'HIFUTURE' in p.upper():
        brand = 'HIFUTURE'
    elif 'MONSTER' in p.upper():
        brand = 'MONSTER'
    elif 'NOKIA' in p.upper():
        brand = 'NOKIA'
    elif 'MY WAY' in p.upper() or 'MYWAY' in p.upper():
        brand = 'MY WAY'
    elif 'MUVIT' in p.upper():
        brand = 'MUVIT'
    elif 'ABYX' in p.upper():
        brand = 'ABYX'
    else:
        brand = 'AUTRES'
    
    if brand not in brands:
        brands[brand] = []
    brands[brand].append(p)

# Afficher pour copier
for brand, items in sorted(brands.items()):
    print(f'\n// {brand} ({len(items)} produits)')
    for item in sorted(items):
        print(f'  "{item}",')