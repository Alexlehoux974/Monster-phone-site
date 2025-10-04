import { createClient } from '@/lib/supabase/client';
import * as fs from 'fs';
import * as path from 'path';

async function applyMigration() {
  const supabase = createClient();

  const migrationPath = path.join(process.cwd(), 'supabase/migrations/20250104_create_orders_tables.sql');
  const sql = fs.readFileSync(migrationPath, 'utf-8');

  console.log('📝 Application de la migration...');

  // Diviser le SQL en commandes individuelles
  const commands = sql
    .split(';')
    .map(cmd => cmd.trim())
    .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

  for (const command of commands) {
    try {
      const { error } = await supabase.rpc('exec_sql', { sql_query: command + ';' });
      if (error) {
        console.error('❌ Erreur:', error);
      } else {
        console.log('✅ Commande exécutée');
      }
    } catch (err) {
      console.error('❌ Erreur d\'exécution:', err);
    }
  }

  console.log('✅ Migration terminée !');
}

applyMigration();
