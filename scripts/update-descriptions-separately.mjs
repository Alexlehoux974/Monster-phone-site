import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nswlznqoadjffpxkagoz.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zd2x6bnFvYWRqZmZweGthZ296Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTA3OTkzOSwiZXhwIjoyMDcwNjU1OTM5fQ.npU7jgB3i7GbCJVZgJ1LsEp0vN4_wx715R-oOW5bFuI';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const updates = [
  {
    id: '6011dfb8-086c-4bab-b9f1-724cb6d033f6',
    name: 'MONSTER TH300 TACTILE',
    short_description: 'Écouteurs Bluetooth MONSTER TH300 avec écran tactile innovant, 3 modes audio (Normal/Réduction bruit/Transparent), contrôle intelligent, charge USB-C rapide.'
  },
  {
    id: '50cdf6b8-3d48-402a-85e6-8d08315a0ba6',
    name: 'MONSTER N LITE 203',
    short_description: 'Écouteurs Bluetooth 5.3 MONSTER N LITE 203 aptX Low Latency, drivers 13mm Hi-Fi, 30h autonomie, ultra-légers 3.85g, étanche IPX6, son premium.'
  },
  {
    id: '8cb5c4ae-7e80-433d-bb5a-c2a0e7e683fc',
    name: 'MONSTER N LITE 206',
    short_description: 'Écouteurs Bluetooth 5.4 MONSTER N LITE 206 drivers 10mm DSP, 25h autonomie, ultra-légers 4g, design ergonomique, charge rapide Type-C, IPX6.'
  }
];

async function main() {
  console.log('📝 Mise à jour des descriptions courtes...\n');

  for (const update of updates) {
    const { error } = await supabase
      .from('products')
      .update({ short_description: update.short_description })
      .eq('id', update.id);

    if (error) {
      console.error(`❌ ${update.name}: ${error.message}`);
    } else {
      console.log(`✅ ${update.name}`);
      console.log(`   → ${update.short_description.substring(0, 80)}...\n`);
    }
  }

  console.log('🎉 Descriptions mises à jour !');
}

main().catch(console.error);
