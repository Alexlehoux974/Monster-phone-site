import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;

async function deleteHonorX5FromAirtable() {
  console.log('\n🔍 Recherche HONOR X5 dans Airtable\n');
  console.log('================================================\n');

  try {
    // Rechercher le produit
    const searchResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Produits?filterByFormula=OR(FIND('hon-x5',LOWER({Slug URL})),FIND('honor x5',LOWER({Nom})),FIND('honor-x5',LOWER({Slug URL})))`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const searchData = await searchResponse.json();

    if (!searchData.records || searchData.records.length === 0) {
      console.log('❌ Aucun produit HONOR X5 trouvé dans Airtable\n');
      return;
    }

    console.log(`✅ ${searchData.records.length} produit(s) trouvé(s):\n`);

    for (const record of searchData.records) {
      console.log('📦 Produit:');
      console.log('   ID Airtable:', record.id);
      console.log('   Nom:', record.fields['Nom']);
      console.log('   Slug:', record.fields['Slug URL']);
      console.log('   Marque:', record.fields['Marque']);
      console.log('   Catégorie:', record.fields['Catégorie']);
      console.log();

      // Supprimer le produit
      console.log('🗑️  Suppression du produit...');
      const deleteResponse = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Produits/${record.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          },
        }
      );

      if (deleteResponse.ok) {
        console.log('   ✅ Produit supprimé avec succès d\'Airtable\n');
      } else {
        const error = await deleteResponse.json();
        console.log('   ❌ Erreur:', error.error.message, '\n');
      }
    }

    console.log('================================================');
    console.log('✅ Suppression terminée\n');
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

deleteHonorX5FromAirtable();
