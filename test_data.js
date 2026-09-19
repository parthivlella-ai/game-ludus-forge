// Challenge Database Integrity Checker
import { CHALLENGES_DATABASE, generateProceduralChallenge } from './src/data/challenges.js';

console.log('Validating 60-Level Challenge Bank...');

const levelsPresent = new Set();
let errors = 0;

CHALLENGES_DATABASE.forEach((c, idx) => {
  if (!c.id || !c.level || !c.prompt || !c.answer) {
    console.error(`Malformed challenge at index ${idx}:`, c);
    errors++;
  }
  if (!c.baseTime || c.baseTime <= 0) {
    console.error(`Invalid baseTime at ${c.id}: ${c.baseTime}`);
    errors++;
  }
  levelsPresent.add(c.level);
});

console.log(`Total hand-crafted challenges in database: ${CHALLENGES_DATABASE.length}`);

// Test procedural generator for every level from 1 to 60
for (let lvl = 1; lvl <= 60; lvl++) {
  const proc = generateProceduralChallenge(lvl, 1);
  if (!proc || !proc.prompt || !proc.answer) {
    console.error(`Procedural challenge failed for level ${lvl}`);
    errors++;
  }
}

console.log(`Procedural generator verified for all 60 levels.`);
if (errors === 0) {
  console.log('✅ ALL CHALLENGES PASSED DATA INTEGRITY AUDIT!');
} else {
  console.error(`❌ Found ${errors} errors in challenge database.`);
}
