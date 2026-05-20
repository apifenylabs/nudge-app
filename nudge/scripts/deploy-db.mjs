import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing env vars: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  // Read the schema files
  const files = [
    'supabase-schema.sql',
    'supabase-migration-billing.sql',
    'supabase-migration-onboarding.sql',
    'supabase-migration-referral-gamification.sql',
    'supabase-migration-inline.sql',
    'supabase-migration-soft-delete.sql',
    'supabase-migration-notifications.sql',
  ];

  for (const file of files) {
    const path = resolve(root, file);
    const sql = readFileSync(path, 'utf8');
    console.log(`\n=== ${file} ===`);

    try {
      // Use supabase.rpc to execute SQL via a custom function
      // Fallback: try using the REST API with raw SQL
      const { error } = await supabase.rpc('exec_sql', { sql });
      if (error) {
        console.log(`rpc error (expected if not exists): ${error.message.substring(0, 100)}`);
        // Fallback: try using pg_graphql mutation
        const query = `
          mutation {
            execute(sql: ${JSON.stringify(sql)})
          }
        `;
        const { data, error: gqlError } = await supabase.graphql(query);
        if (gqlError) {
          console.log(`gql error: ${gqlError.message.substring(0, 100)}`);
          // Final fallback: direct SQL via rest
          const resp = await fetch(`${supabaseUrl}/rest/v1/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': serviceRoleKey,
              'Authorization': `Bearer ${serviceRoleKey}`,
              'Prefer': 'params=single-object',
            },
            body: JSON.stringify({ query: sql }),
          });
          if (resp.ok) {
            console.log('OK via REST');
          } else {
            const text = await resp.text();
            console.log(`REST error (${resp.status}): ${text.substring(0, 100)}`);
            console.log('SQL: ' + sql.substring(0, 100) + '...');
          }
        } else {
          console.log('OK via graphql');
        }
      } else {
        console.log('OK via rpc');
      }
    } catch (err) {
      console.log(`Unexpected error: ${err.message.substring(0, 100)}`);
      console.log('Manual step needed for: ' + file);
    }
  }

  // Verify deployment by checking if tables exist
  console.log('\n=== VERIFICATION ===');
  const { data: tables, error } = await supabase
    .from('users')
    .select('count', { count: 'exact', head: true });
  
  if (error) {
    console.log(`Table check error: ${error.message.substring(0, 100)}`);
    console.log('Schema may not be deployed. Manual SQL execution needed.');
  } else {
    console.log('users table exists ✅');
  }
}

main();
