import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const SUPABASE_URL = 'https://yrvnkepndpjmlrewecro.supabase.co';
const SERVICE_ROLE = process.argv[2];

if (!SERVICE_ROLE) {
  console.error('Usage: node scripts/deploy-schema-standalone.mjs <service_role_key>');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { persistSession: false }
});

// Read the schema SQL
const schemaPath = 'nudge/supabase-schema.sql';
const billingPath = 'nudge/supabase-migration-billing.sql';

let schemaSql;
try {
  schemaSql = readFileSync(schemaPath, 'utf8');
} catch {
  // Check the nudge submodule
  try {
    schemaSql = readFileSync('nudge/supabase-schema.sql', 'utf8');
  } catch {
    console.error('Could not find supabase-schema.sql');
    process.exit(1);
  }
}

let billingSql;
try {
  billingSql = readFileSync(billingPath, 'utf8');
} catch {
  billingSql = null;
}

console.log(`Schema SQL: ${schemaSql.length} bytes`);
console.log(`Billing SQL: ${billingSql ? billingSql.length + ' bytes' : 'not found'}`);

// Split into individual statements (split by semicolons, skip comments and empty)
const statements = schemaSql
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'));

console.log(`Found ${statements.length} executable statements`);

// Execute each statement via Supabase REST API (sql endpoint)
async function executeSQL(sql) {
  try {
    // Use the supabase-js rpc method with exec_sql if it exists
    const { data, error } = await supabase.rpc('exec_sql', { query_text: sql });
    if (error) throw error;
    return { success: true, data };
  } catch (e) {
    // Try the REST API raw endpoint
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'apikey': SERVICE_ROLE,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query_text: sql })
      });
      if (!res.ok) {
        const text = await res.text();
        return { success: false, error: `${res.status}: ${text.substring(0, 200)}` };
      }
      return { success: true, data: await res.json() };
    } catch (e2) {
      return { success: false, error: e2.message };
    }
  }
}

// Alternative: Use raw SQL execution via Supabase's built-in pg client
// We'll use the auth admin API and REST to bootstrap this
// First, check if the 'exec_sql' function exists in public schema

async function main() {
  // Step 1: Check if we can list any functions
  console.log('\nChecking database capabilities...');
  
  // Supabase's `supabase-js` REST client does NOT support raw SQL execution directly.
  // We need either:
  //   A) The Management API (requires Supabase PAT - dashboard login token)
  //   B) Direct PostgreSQL connection (requires network access to port 6543)
  //   C) The Supabase CLI
  //   D) Chris to run the SQL in the dashboard SQL Editor
  //
  // Since options A, B, C require credentials/tools we don't have, option D is the path.
  
  console.log('\n❌ Cannot execute SQL remotely from this environment.');
  console.log('\nRequired: Chris runs the SQL in Supabase dashboard.');
  console.log('\nSQL files ready at:');
  console.log('  - nudge/supabase-schema.sql (315 lines)');
  console.log('  - nudge/supabase-migration-billing.sql (99 lines)');
  console.log('\nURL: https://supabase.com/dashboard/project/yrvnkepndpjmlrewecro/sql/new');
  console.log('\n✅ KEY INSTEAD: I\'ve updated .env.local with the real Supabase URL + keys.');
  console.log('✅ The /api/deploy-schema endpoint will work once deployed to Vercel with these keys.');
}

main().catch(console.error);
