import { CHALLENGES_DATABASE, generateProceduralChallenge } from '../data/challenges.js';
import { isValidEnglishWord } from '../data/dictionary.js';

class ChallengeEngine {
  constructor() {
    // Session state per level
    this.sessionUsedIds = new Map(); // level -> Set<id>
    this.failedChallengeIds = new Map(); // level -> Set<id>
    this.lastFailedId = null;
    this.currentChallengeId = null;
  }

  // Reset session history for a fresh level run
  resetLevelSession(level) {
    this.sessionUsedIds.delete(level);
    this.failedChallengeIds.delete(level);
    this.lastFailedId = null;
    this.currentChallengeId = null;
  }

  getUsedIdsForLevel(level) {
    if (!this.sessionUsedIds.has(level)) {
      this.sessionUsedIds.set(level, new Set());
    }
    return this.sessionUsedIds.get(level);
  }

  getFailedIdsForLevel(level) {
    if (!this.failedChallengeIds.has(level)) {
      this.failedChallengeIds.set(level, new Set());
    }
    return this.failedChallengeIds.get(level);
  }

  markChallengeUsed(level, challengeId) {
    const used = this.getUsedIdsForLevel(level);
    used.add(challengeId);
    this.currentChallengeId = challengeId;
  }

  markChallengeFailed(level, challengeId) {
    this.markChallengeUsed(level, challengeId);
    const failed = this.getFailedIdsForLevel(level);
    failed.add(challengeId);
    this.lastFailedId = challengeId;
  }

  // Mandatory: Select a guaranteed DIFFERENT challenge for this level on retry
  getNextChallenge(level) {
    const usedSet = this.getUsedIdsForLevel(level);
    const allForLevel = CHALLENGES_DATABASE.filter(c => c.level === level);

    // 1. Filter out all challenges already used in this session, especially the last failed one
    let available = allForLevel.filter(c => !usedSet.has(c.id) && c.id !== this.lastFailedId);

    // 2. If pool for this level is exhausted in this session, reset usedSet for this level but keep lastFailedId excluded
    if (available.length === 0) {
      usedSet.clear();
      available = allForLevel.filter(c => c.id !== this.lastFailedId);
    }

    // 3. If still empty, procedural fallback guaranteed unique
    if (available.length === 0) {
      const proc = generateProceduralChallenge(level, usedSet.size + 1);
      this.markChallengeUsed(level, proc.id);
      return proc;
    }

    // Pick random from available
    const randomIndex = Math.floor(Math.random() * available.length);
    const chosen = available[randomIndex];
    this.markChallengeUsed(level, chosen.id);
    return chosen;
  }

  // Normalize string for comparison (removes punctuation, excess spaces, casing)
  normalizeText(str) {
    if (!str || typeof str !== 'string') return '';
    return str
      .trim()
      .toUpperCase()
      .replace(/['’".,!?/\\()$#-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Layered Answer Validation
  validateAnswer(input, challenge) {
    if (!input || typeof input !== 'string') {
      return { isValid: false, reason: 'Answer cannot be blank' };
    }

    const trimmed = input.trim();
    if (trimmed.length === 0) {
      return { isValid: false, reason: 'Answer cannot be blank' };
    }

    const upper = trimmed.toUpperCase();
    const normalizedInput = this.normalizeText(input);

    // ==========================================
    // EASY MODE: WORD CHALLENGE VALIDATION
    // Must be:
    // 1. Valid English word (Dictionary or accepted list)
    // 2. Satisfy all constraints
    // ==========================================
    if (challenge.difficulty === 'easy' || challenge.category === 'WORD') {
      // Must be pure letters
      if (!/^[A-Z]+$/.test(upper)) {
        return { isValid: false, reason: 'Must contain letters only (no numbers/symbols)' };
      }

      // Check dictionary or accepted list
      const isAcceptedExplicitly = challenge.acceptedAnswers && challenge.acceptedAnswers.some(
        a => a.trim().toUpperCase() === upper
      );
      const isCanonical = challenge.answer && challenge.answer.trim().toUpperCase() === upper;
      const isEnglish = isValidEnglishWord(upper) || isAcceptedExplicitly || isCanonical;

      if (!isEnglish) {
        return { isValid: false, reason: `"${upper}" is not a recognized English word` };
      }

      // Check specific constraint rules
      const ruleType = challenge.ruleType;
      const arg = challenge.ruleArg;

      if (ruleType === 'CONTAINS_SUBSTRING') {
        const sub = (arg || '').toUpperCase();
        if (!upper.includes(sub)) {
          return { isValid: false, reason: `Word must contain "${sub}"` };
        }
      } else if (ruleType === 'STARTS_WITH') {
        const letter = (arg || '').toUpperCase();
        if (!upper.startsWith(letter)) {
          return { isValid: false, reason: `Word must start with "${letter}"` };
        }
      } else if (ruleType === 'ENDS_WITH') {
        const ending = (arg || '').toUpperCase();
        if (!upper.endsWith(ending)) {
          return { isValid: false, reason: `Word must end with "${ending}"` };
        }
      } else if (ruleType === 'STARTS_AND_ENDS') {
        const { start, ends } = arg || {};
        if (start && !upper.startsWith(start.toUpperCase())) {
          return { isValid: false, reason: `Word must start with "${start}"` };
        }
        if (ends && !upper.endsWith(ends.toUpperCase())) {
          return { isValid: false, reason: `Word must end with "${ends}"` };
        }
      } else if (ruleType === 'STARTS_AND_CONTAINS') {
        const { start, contains } = arg || {};
        if (start && !upper.startsWith(start.toUpperCase())) {
          return { isValid: false, reason: `Word must start with "${start}"` };
        }
        if (contains && !upper.includes(contains.toUpperCase())) {
          return { isValid: false, reason: `Word must contain "${contains}"` };
        }
      } else if (ruleType === 'LENGTH_EXACT') {
        const targetLen = Number(arg);
        if (upper.length !== targetLen) {
          return { isValid: false, reason: `Word must have exactly ${targetLen} letters (currently ${upper.length})` };
        }
      } else if (ruleType === 'LENGTH_MIN') {
        const minLen = Number(arg);
        if (upper.length < minLen) {
          return { isValid: false, reason: `Word must have at least ${minLen} letters (currently ${upper.length})` };
        }
      } else if (ruleType === 'CONSECUTIVE_VOWELS') {
        const count = Number(arg) || 2;
        const regex = new RegExp(`[AEIOU]{${count},}`);
        if (!regex.test(upper)) {
          return { isValid: false, reason: `Word must contain at least ${count} consecutive vowels` };
        }
      } else if (ruleType === 'CONTAINS_AND_MIN_LEN') {
        const { contains, min } = arg || {};
        if (contains && !upper.includes(contains.toUpperCase())) {
          return { isValid: false, reason: `Word must contain "${contains}"` };
        }
        if (min && upper.length < min) {
          return { isValid: false, reason: `Word must be at least ${min} letters long` };
        }
      } else if (ruleType === 'CONTAINS_AND_ENDS') {
        const { contains, ends } = arg || {};
        if (contains && !upper.includes(contains.toUpperCase())) {
          return { isValid: false, reason: `Word must contain "${contains}"` };
        }
        if (ends && !upper.endsWith(ends.toUpperCase())) {
          return { isValid: false, reason: `Word must end with "${ends}"` };
        }
      } else if (ruleType === 'LENGTH_MIN_AND_CONTAINS') {
        const { min, contains } = arg || {};
        if (min && upper.length < min) {
          return { isValid: false, reason: `Word must be at least ${min} letters long` };
        }
        if (contains && !upper.includes(contains.toUpperCase())) {
          return { isValid: false, reason: `Word must contain "${contains}"` };
        }
      } else if (ruleType === 'VOWEL_START_ENDS') {
        const vowels = ['A', 'E', 'I', 'O', 'U'];
        if (!vowels.includes(upper[0])) {
          return { isValid: false, reason: `Word must start with a vowel (A, E, I, O, U)` };
        }
        const ending = (arg || '').toUpperCase();
        if (ending && !upper.endsWith(ending)) {
          return { isValid: false, reason: `Word must end with "${ending}"` };
        }
      } else if (ruleType === 'CONSONANT_START_ENDS') {
        const vowels = ['A', 'E', 'I', 'O', 'U'];
        if (vowels.includes(upper[0])) {
          return { isValid: false, reason: `Word must start with a consonant` };
        }
        const ending = (arg || '').toUpperCase();
        if (ending && !upper.endsWith(ending)) {
          return { isValid: false, reason: `Word must end with "${ending}"` };
        }
      } else if (ruleType === 'LENGTH_AND_LETTERS') {
        const { len, letters } = arg || {};
        if (len && upper.length !== len) {
          return { isValid: false, reason: `Word must have exactly ${len} letters` };
        }
        if (letters && Array.isArray(letters)) {
          for (const l of letters) {
            if (!upper.includes(l.toUpperCase())) {
              return { isValid: false, reason: `Word must contain the letter "${l}"` };
            }
          }
        }
      } else if (ruleType === 'MULTI_CONSTRAINTS') {
        const { start, contains, ends, min, max } = arg || {};
        if (start && !upper.startsWith(start.toUpperCase())) {
          return { isValid: false, reason: `Word must start with "${start}"` };
        }
        if (contains && !upper.includes(contains.toUpperCase())) {
          return { isValid: false, reason: `Word must contain "${contains}"` };
        }
        if (ends && !upper.endsWith(ends.toUpperCase())) {
          return { isValid: false, reason: `Word must end with "${ends}"` };
        }
        if (min && upper.length < min) {
          return { isValid: false, reason: `Word must have at least ${min} letters (currently ${upper.length})` };
        }
        if (max && upper.length > max) {
          return { isValid: false, reason: `Word must have at most ${max} letters` };
        }
      }

      return { isValid: true, matchType: 'word_valid' };
    }

    // ==========================================
    // MEDIUM & HARD MODES:
    // PUZZLES, MATH, LOGIC, RIDDLES, TRICKS
    // Robust normalized exact & accepted alias matching
    // ==========================================
    const canonicalNormalized = this.normalizeText(challenge.answer);
    if (normalizedInput === canonicalNormalized) {
      return { isValid: true, matchType: 'exact' };
    }

    // Check acceptedAnswers
    if (challenge.acceptedAnswers && Array.isArray(challenge.acceptedAnswers)) {
      for (const accepted of challenge.acceptedAnswers) {
        const normAccepted = this.normalizeText(accepted);
        if (normAccepted === normalizedInput) {
          return { isValid: true, matchType: 'alias' };
        }
      }
    }

    // Special numeric matching (e.g. "180 KM" -> "180" or "$14" -> "14")
    const numericInput = normalizedInput.replace(/[^0-9.]/g, '');
    const numericCanonical = canonicalNormalized.replace(/[^0-9.]/g, '');
    if (numericInput && numericCanonical && numericInput === numericCanonical) {
      return { isValid: true, matchType: 'numeric_equivalent' };
    }

    return { isValid: false, reason: 'Incorrect answer. Try again!' };
  }
}

export const challengeEngine = new ChallengeEngine();
