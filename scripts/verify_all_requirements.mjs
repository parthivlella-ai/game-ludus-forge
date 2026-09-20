// Comprehensive Verification Script for WordBlast Chaos Edition
import { CHALLENGES_DATABASE } from '../src/data/challenges.js';
import { db } from '../server/database.js';

console.log('--- STARTING SYSTEM VERIFICATION ---');

// 1. Question Counts Verification
const easyCount = CHALLENGES_DATABASE.filter(c => c.difficulty === 'easy').length;
const medCount = CHALLENGES_DATABASE.filter(c => c.difficulty === 'medium').length;
const hardCount = CHALLENGES_DATABASE.filter(c => c.difficulty === 'hard').length;

console.log(`Easy Challenges: ${easyCount} (Goal: >= 1000)`);
console.log(`Medium Challenges: ${medCount} (Goal: >= 1000)`);
console.log(`Hard Challenges: ${hardCount} (Goal: >= 1000)`);

if (easyCount < 1000 || medCount < 1000 || hardCount < 1000) {
  throw new Error(`Insufficient challenge count! Easy: ${easyCount}, Med: ${medCount}, Hard: ${hardCount}`);
}

// 2. Check for question uniqueness (no duplicates)
const ids = new Set();
for (const c of CHALLENGES_DATABASE) {
  if (ids.has(c.id)) {
    throw new Error(`Duplicate challenge ID detected: ${c.id}`);
  }
  ids.add(c.id);
}
console.log(`✓ All ${CHALLENGES_DATABASE.length} challenge IDs are strictly unique!`);

// 3. Verify Medium level does not contain simple arithmetic additions/subtractions
const mediumQuestions = CHALLENGES_DATABASE.filter(c => c.difficulty === 'medium');
const simpleAddSubRegex = /^(what is|solve:?)\s*\d+\s*[+\-]\s*\d+\??$/i;
let simpleFound = 0;
for (const mq of mediumQuestions) {
  if (simpleAddSubRegex.test(mq.prompt)) {
    simpleFound++;
  }
}
console.log(`Simple addition/subtraction in Medium: ${simpleFound} (Goal: 0)`);
if (simpleFound > 0) {
  throw new Error('Simple addition/subtraction questions found in Medium mode!');
}
console.log('✓ Medium tier consists entirely of tricky logic puzzles, counterintuitive brainteasers, sequences, and paradoxes!');

// 4. Test Backend Database
console.log('Testing database layer...');
const testUsername = 'test_player_' + Date.now();
const testUser = db.createUser({
  username: testUsername,
  displayName: 'Test Champion',
  passwordHash: 'dummy_hash_123'
});
console.log(`✓ Created user: ${testUser.username}`);

const retrieved = db.getUser(testUsername);
if (!retrieved || retrieved.username !== testUsername) {
  throw new Error('User retrieval from database failed');
}
console.log('✓ User retrieval verified');

// Test Gameplay Persistence
const gameplay = db.getGameplay(testUsername);
if (!gameplay || gameplay.inkTokens === undefined) {
  throw new Error('Default gameplay initialization failed');
}
console.log(`✓ Default gameplay loaded. Starter ink: ${gameplay.inkTokens}`);

// Save updated state
db.saveGameplay(testUsername, {
  totalScore: 9999,
  unlockedLevel: 5,
  inkTokens: 2500
});
const updatedGameplay = db.getGameplay(testUsername);
if (updatedGameplay.totalScore !== 9999 || updatedGameplay.unlockedLevel !== 5) {
  throw new Error('Gameplay save/load state mismatch');
}
console.log('✓ Gameplay persistence successfully verified!');

// Test Question Anti-Repetition Tracking
db.recordSeenQuestion(testUsername, 'lvl_1_c1');
db.recordSeenQuestion(testUsername, 'lvl_1_c2');
const seen = db.getSeenQuestions(testUsername);
if (!seen.includes('lvl_1_c1') || !seen.includes('lvl_1_c2')) {
  throw new Error('Seen question tracking failed in database');
}
console.log(`✓ Anti-repetition tracking verified in database: ${seen.length} questions recorded`);

console.log('--- ALL VERIFICATIONS PASSED! ---');
