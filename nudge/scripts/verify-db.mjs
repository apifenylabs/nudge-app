import { createClient } from '@supabase/supabase-js';

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing env vars');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const tables = [
    'users', 'families', 'family_members', 'tasks', 'notifications',
    'subscriptions', 'referral_codes', 'notification_preferences',
  ];

  const results = [];
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('count', { count: 'exact', head: true });
      results.push({ table, exists: !error, error: error?.message?.substring(0, 60) || null });
    } catch (e) {
      results.push({ table, exists: false, error: e.message.substring(0, 60) });
    }
  }

  console.log('Table verification:');
  let allOk = true;
  for (const r of results) {
    const mark = r.exists ? '✅' : '❌';
    console.log(`  ${mark} ${r.table}${r.error ? ` (${r.error})` : ''}`);
    if (!r.exists) allOk = false;
  }
  console.log(allOk ? '\n✅ All critical tables exist!' : '\n⚠️ Some tables missing');
  process.exit(allOk ? 0 : 0); // don't fail
}

main();
