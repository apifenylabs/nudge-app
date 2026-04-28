/**
 * Integration test: Run the full pipeline end-to-end.
 */

async function run() {
  console.log('═'.repeat(50));
  console.log('  INTEGRATION TEST — Full Pipeline');
  console.log('═'.repeat(50));

  const pipeline = require('../daily-pipeline');

  const result = await pipeline.run({
    maxItemsPerSource: 2,
  });

  // Check results
  const checks = [
    ['itemsProcessed > 0', result.itemsProcessed > 0],
    ['itemsTransformed > 0', result.itemsTransformed > 0],
    ['itemsTransformed === itemsProcessed * 8', result.itemsTransformed === result.itemsProcessed * 8,
      `Expected ${result.itemsProcessed * 8}, got ${result.itemsTransformed}`],
    ['itemsApproved >= itemsPublished', result.itemsApproved >= result.itemsPublished],
    ['itemsPublished > 0', result.itemsPublished > 0],
    ['errors is array', Array.isArray(result.errors)],
    ['date is string', typeof result.date === 'string'],
    ['publishLogs is array', Array.isArray(result.publishLogs)],
  ];

  let passed = 0;
  let failed = 0;

  console.log('\nResults:');
  console.log(`  Source items:      ${result.itemsProcessed}`);
  console.log(`  Transformed items: ${result.itemsTransformed}`);
  console.log(`  Approved items:    ${result.itemsApproved}`);
  console.log(`  Published items:   ${result.itemsPublished}`);

  console.log('\nChecks:');
  for (const [name, ok, detail] of checks) {
    if (ok) {
      console.log(`  ✓ ${name}`);
      passed++;
    } else {
      console.log(`  ✗ ${name} ${detail || ''}`);
      failed++;
    }
  }

  if (result.errors.length > 0) {
    console.log('\nWarnings/Errors:');
    result.errors.forEach(e => console.log(`  ⚠ ${e}`));
  }

  console.log(`\n${'═'.repeat(50)}`);
  console.log(`  ${passed}/${passed + failed} checks passed`);
  console.log(`${'═'.repeat(50)}`);

  if (failed > 0) {
    process.exit(1);
  }
}

run().catch(err => {
  console.error('Integration test failed:', err);
  process.exit(1);
});
