/**
 * Test du dashboard commandes client
 * Vérifie si les commandes s'affichent correctement
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ywfkzjxuobbxhqyebmks.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3Zmt6anh1b2JieGhxeWVibWtzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI4NTI3NSwiZXhwIjoyMDU4ODYxMjc1fQ.GgjlDbsN5NqOVE3sCB0CY_YE69gLI2Qg1jhb3p6sC0s';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testOrdersDashboard() {
  console.log('\n🔍 Test Dashboard Commandes Client\n');
  console.log('='.repeat(60));

  try {
    // 1. Récupérer toutes les commandes récentes
    console.log('\n1️⃣  Récupération des dernières commandes...\n');

    const { data: recentOrders, error: ordersError } = await supabase
      .from('orders')
      .select(`
        id,
        user_id,
        customer_email,
        customer_name,
        status,
        total,
        created_at,
        order_items (
          id,
          product_name,
          quantity,
          unit_price
        )
      `)
      .order('created_at', { ascending: false })
      .limit(5);

    if (ordersError) {
      console.error('❌ Erreur récupération commandes:', ordersError);
      return;
    }

    if (!recentOrders || recentOrders.length === 0) {
      console.log('❌ Aucune commande trouvée dans la base');
      return;
    }

    console.log(`✅ ${recentOrders.length} commande(s) trouvée(s)\n`);

    // 2. Afficher les détails de chaque commande
    for (const order of recentOrders) {
      console.log('─'.repeat(60));
      console.log(`\n📦 Commande #${order.id.substring(0, 8).toUpperCase()}`);
      console.log(`   User ID: ${order.user_id || 'NULL (PROBLÈME!)'}`);
      console.log(`   Email: ${order.customer_email}`);
      console.log(`   Nom: ${order.customer_name}`);
      console.log(`   Statut: ${order.status}`);
      console.log(`   Total: ${order.total}€`);
      console.log(`   Date: ${new Date(order.created_at).toLocaleString('fr-FR')}`);
      console.log(`   Nb articles: ${order.order_items?.length || 0}`);

      // Vérifier si user_id est NULL
      if (!order.user_id) {
        console.log(`   ⚠️  WARNING: user_id est NULL ! La commande ne sera pas visible dans le dashboard client`);
      }
    }

    console.log('\n' + '─'.repeat(60));

    // 3. Vérifier les users auth Supabase
    console.log('\n2️⃣  Vérification des utilisateurs Supabase Auth...\n');

    const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers();

    if (usersError) {
      console.error('❌ Erreur récupération users:', usersError);
      return;
    }

    console.log(`✅ ${users.length} utilisateur(s) trouvé(s) dans Supabase Auth\n`);

    for (const user of users.slice(0, 3)) {
      console.log(`👤 User: ${user.email}`);
      console.log(`   ID: ${user.id}`);
      console.log(`   Créé: ${new Date(user.created_at).toLocaleString('fr-FR')}`);

      // Chercher les commandes de cet utilisateur
      const userOrders = recentOrders.filter(o => o.user_id === user.id);
      const userOrdersByEmail = recentOrders.filter(o => o.customer_email === user.email);

      console.log(`   Commandes par user_id: ${userOrders.length}`);
      console.log(`   Commandes par email: ${userOrdersByEmail.length}`);

      if (userOrdersByEmail.length > 0 && userOrders.length === 0) {
        console.log(`   ⚠️  WARNING: Des commandes existent avec cet email mais user_id est NULL!`);
      }
      console.log('');
    }

    // 4. Diagnostic du problème
    console.log('\n3️⃣  Diagnostic du problème\n');
    console.log('─'.repeat(60));

    const ordersWithoutUserId = recentOrders.filter(o => !o.user_id);
    const ordersWithUserId = recentOrders.filter(o => o.user_id);

    console.log(`\n📊 Statistiques:`);
    console.log(`   Total commandes: ${recentOrders.length}`);
    console.log(`   Avec user_id: ${ordersWithUserId.length} ✅`);
    console.log(`   Sans user_id: ${ordersWithoutUserId.length} ❌`);

    if (ordersWithoutUserId.length > 0) {
      console.log(`\n❌ PROBLÈME IDENTIFIÉ:`);
      console.log(`   ${ordersWithoutUserId.length} commande(s) n'ont pas de user_id`);
      console.log(`   Ces commandes ne s'afficheront PAS dans le dashboard client`);
      console.log(`\n💡 CAUSE PROBABLE:`);
      console.log(`   Le webhook Stripe ne reçoit pas le user_id lors de la création de commande`);
      console.log(`   Ou la session Stripe ne contient pas le metadata.userId`);
    }

    if (ordersWithUserId.length > 0) {
      console.log(`\n✅ ${ordersWithUserId.length} commande(s) sont correctement liées à un utilisateur`);
      console.log(`   Exemple d'user_id valide: ${ordersWithUserId[0].user_id}`);
    }

    console.log('\n' + '='.repeat(60));
    console.log('Test terminé\n');

  } catch (error) {
    console.error('❌ Erreur durant le test:', error);
  }
}

testOrdersDashboard();
