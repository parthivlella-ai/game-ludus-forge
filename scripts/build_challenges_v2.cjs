// Challenge Generator for WordBlast: Chaos Edition - Major Update
// Strictly separated:
// Easy (1-20): 100% Word Challenges (10+ per level)
// Medium (21-40): 100% Puzzle / Math / Logic / Sequences / Codes (10+ per level)
// Hard (41-60): 100% Riddles / Trick Questions / Lateral Brain Teasers (10+ per level)

const fs = require('fs');

const easyTimers = (lvl) => {
  if (lvl <= 5) return 15;
  if (lvl <= 10) return 14;
  if (lvl <= 15) return 12;
  return 10;
};

const mediumTimers = (lvl) => {
  if (lvl <= 25) return 20;
  if (lvl <= 30) return 18;
  if (lvl <= 35) return 17;
  return 15;
};

const hardTimer = 30;

// ==========================================
// 1. EASY WORD CHALLENGES (LEVELS 1 - 20)
// ==========================================
const easyLevelTemplates = {
  // L1-5: Single condition word challenges (15s)
  1: [ // Contains Substrings
    { p: 'Type a word containing "BL"', a: 'BLAST', acc: ['BLAST', 'BLUE', 'BLACK', 'BLOCK', 'BLOW', 'BLIND', 'TABLE', 'CABLE', 'PUBLIC'], rule: 'CONTAINS_SUBSTRING', arg: 'BL', h: 'e.g. BLUE, BLACK' },
    { p: 'Type a word containing "TR"', a: 'TRAIN', acc: ['TRAIN', 'TREE', 'TRACK', 'TRIP', 'TRUE', 'TRUCK', 'INTRO', 'STREET'], rule: 'CONTAINS_SUBSTRING', arg: 'TR', h: 'e.g. TRAIN, TRACK' },
    { p: 'Type a word containing "ST"', a: 'STAR', acc: ['STAR', 'STOP', 'STORM', 'STONE', 'STEP', 'FAST', 'LAST', 'BEST'], rule: 'CONTAINS_SUBSTRING', arg: 'ST', h: 'e.g. STAR, STOP' },
    { p: 'Type a word containing "SH"', a: 'SHIP', acc: ['SHIP', 'SHARK', 'SHINE', 'SHOE', 'SHOP', 'FISH', 'DISH', 'WASH'], rule: 'CONTAINS_SUBSTRING', arg: 'SH', h: 'e.g. SHIP, SHARK' },
    { p: 'Type a word containing "CH"', a: 'CHAIR', acc: ['CHAIR', 'CHAT', 'CHEST', 'CHIP', 'RICH', 'MUCH', 'CATCH', 'MATCH'], rule: 'CONTAINS_SUBSTRING', arg: 'CH', h: 'e.g. CHAIR, CHAT' },
    { p: 'Type a word containing "FL"', a: 'FLASH', acc: ['FLASH', 'FLY', 'FLAG', 'FLAME', 'FLAT', 'FLOAT', 'FLOW'], rule: 'CONTAINS_SUBSTRING', arg: 'FL', h: 'e.g. FLASH, FLAG' },
    { p: 'Type a word containing "GR"', a: 'GREEN', acc: ['GREEN', 'GRAPES', 'GROW', 'GRASS', 'GREAT', 'GRIN', 'GRAY'], rule: 'CONTAINS_SUBSTRING', arg: 'GR', h: 'e.g. GREEN, GROW' },
    { p: 'Type a word containing "PL"', a: 'PLANT', acc: ['PLANT', 'PLAN', 'PLAY', 'PLANE', 'PLATE', 'PLUG', 'APPLE'], rule: 'CONTAINS_SUBSTRING', arg: 'PL', h: 'e.g. PLANT, PLAY' },
    { p: 'Type a word containing "SP"', a: 'SPACE', acc: ['SPACE', 'SPARK', 'SPEED', 'SPOON', 'SPIDER', 'SPEAK'], rule: 'CONTAINS_SUBSTRING', arg: 'SP', h: 'e.g. SPACE, SPEED' },
    { p: 'Type a word containing "BR"', a: 'BRAIN', acc: ['BRAIN', 'BREAD', 'BRICK', 'BRIDGE', 'BROWN', 'BREAK'], rule: 'CONTAINS_SUBSTRING', arg: 'BR', h: 'e.g. BRAIN, BREAD' }
  ],
  2: [ // Starts with Letter
    { p: 'Type a word beginning with "S"', a: 'SUN', acc: ['SUN', 'STAR', 'SKY', 'SILVER', 'STONE', 'STORM'], rule: 'STARTS_WITH', arg: 'S', h: 'Starts with S' },
    { p: 'Type a word beginning with "M"', a: 'MOON', acc: ['MOON', 'MAGIC', 'METAL', 'MUSIC', 'MOUNTAIN'], rule: 'STARTS_WITH', arg: 'M', h: 'Starts with M' },
    { p: 'Type a word beginning with "B"', a: 'BRAVE', acc: ['BRAVE', 'BRIGHT', 'BLUE', 'BLACK', 'BLAST'], rule: 'STARTS_WITH', arg: 'B', h: 'Starts with B' },
    { p: 'Type a word beginning with "T"', a: 'TIGER', acc: ['TIGER', 'TIME', 'TRAIN', 'TREE', 'TRUST'], rule: 'STARTS_WITH', arg: 'T', h: 'Starts with T' },
    { p: 'Type a word beginning with "P"', a: 'POWER', acc: ['POWER', 'PLANET', 'PULSE', 'PIXEL', 'PRIDE'], rule: 'STARTS_WITH', arg: 'P', h: 'Starts with P' },
    { p: 'Type a word beginning with "C"', a: 'CLOUD', acc: ['CLOUD', 'CLEVER', 'CRYSTAL', 'CYBER', 'CHANCE'], rule: 'STARTS_WITH', arg: 'C', h: 'Starts with C' },
    { p: 'Type a word beginning with "D"', a: 'DRAGON', acc: ['DRAGON', 'DREAM', 'DANCE', 'DARK', 'DELTA'], rule: 'STARTS_WITH', arg: 'D', h: 'Starts with D' },
    { p: 'Type a word beginning with "F"', a: 'FLAME', acc: ['FLAME', 'FLASH', 'FROST', 'FUTURE', 'FORCE'], rule: 'STARTS_WITH', arg: 'F', h: 'Starts with F' },
    { p: 'Type a word beginning with "R"', a: 'ROCKET', acc: ['ROCKET', 'RADAR', 'RIVER', 'REIGN', 'ROBOT'], rule: 'STARTS_WITH', arg: 'R', h: 'Starts with R' },
    { p: 'Type a word beginning with "L"', a: 'LASER', acc: ['LASER', 'LIGHT', 'LUNAR', 'LEGEND', 'LOGIC'], rule: 'STARTS_WITH', arg: 'L', h: 'Starts with L' }
  ],
  3: [ // Ends with Letter
    { p: 'Type a word ending with "E"', a: 'FLAME', acc: ['FLAME', 'BRAVE', 'SPACE', 'DRIVE', 'PRIDE', 'STONE', 'BLADE'], rule: 'ENDS_WITH', arg: 'E', h: 'Ends with E' },
    { p: 'Type a word ending with "T"', a: 'BLAST', acc: ['BLAST', 'PLANET', 'LIGHT', 'ROCKET', 'KNIGHT', 'TARGET'], rule: 'ENDS_WITH', arg: 'T', h: 'Ends with T' },
    { p: 'Type a word ending with "Y"', a: 'GALAXY', acc: ['GALAXY', 'ENERGY', 'GLORY', 'VICTORY', 'LUCKY', 'SKY'], rule: 'ENDS_WITH', arg: 'Y', h: 'Ends with Y' },
    { p: 'Type a word ending with "D"', a: 'SHIELD', acc: ['SHIELD', 'CLOUD', 'SWORD', 'WORLD', 'SPEED', 'SOUND'], rule: 'ENDS_WITH', arg: 'D', h: 'Ends with D' },
    { p: 'Type a word ending with "K"', a: 'SPARK', acc: ['SPARK', 'SHARK', 'BRICK', 'TRACK', 'CLOCK', 'BLACK'], rule: 'ENDS_WITH', arg: 'K', h: 'Ends with K' },
    { p: 'Type a word ending with "N"', a: 'DRAGON', acc: ['DRAGON', 'MOON', 'TITAN', 'CROWN', 'BRAIN', 'TRAIN'], rule: 'ENDS_WITH', arg: 'N', h: 'Ends with N' },
    { p: 'Type a word ending with "G"', a: 'LIGHTNING', acc: ['LIGHTNING', 'KING', 'RING', 'SPRING', 'STRONG', 'WING'], rule: 'ENDS_WITH', arg: 'G', h: 'Ends with G' },
    { p: 'Type a word ending with "P"', a: 'CHAMP', acc: ['CHAMP', 'WARP', 'JUMP', 'LEAP', 'CAMP', 'TRIP', 'SHIP'], rule: 'ENDS_WITH', arg: 'P', h: 'Ends with P' },
    { p: 'Type a word ending with "R"', a: 'LASER', acc: ['LASER', 'RADAR', 'TIGER', 'STAR', 'POWER', 'THUNDER'], rule: 'ENDS_WITH', arg: 'R', h: 'Ends with R' },
    { p: 'Type a word ending with "L"', a: 'CRYSTAL', acc: ['CRYSTAL', 'STEEL', 'METAL', 'SIGNAL', 'PORTAL', 'PIXEL'], rule: 'ENDS_WITH', arg: 'L', h: 'Ends with L' }
  ],
  4: [ // Exact Letter Length
    { p: 'Type a word with exactly 3 letters', a: 'CAT', acc: ['CAT', 'DOG', 'SUN', 'SKY', 'RED', 'FOX', 'BOX'], rule: 'LENGTH_EXACT', arg: 3, h: 'Exactly 3 letters' },
    { p: 'Type a word with exactly 4 letters', a: 'FIRE', acc: ['FIRE', 'STAR', 'MOON', 'BLUE', 'GOLD', 'DARK'], rule: 'LENGTH_EXACT', arg: 4, h: 'Exactly 4 letters' },
    { p: 'Type a word with exactly 5 letters', a: 'BLAST', acc: ['BLAST', 'FLAME', 'STORM', 'BRAIN', 'LASER', 'POWER'], rule: 'LENGTH_EXACT', arg: 5, h: 'Exactly 5 letters' },
    { p: 'Type a word with exactly 6 letters', a: 'ROCKET', acc: ['ROCKET', 'PLANET', 'KNIGHT', 'SHIELD', 'SILVER', 'DRAGON'], rule: 'LENGTH_EXACT', arg: 6, h: 'Exactly 6 letters' },
    { p: 'Type a word with exactly 7 letters', a: 'THUNDER', acc: ['THUNDER', 'CRYSTAL', 'WARRIOR', 'GALAXY', 'PHANTOM'], rule: 'LENGTH_EXACT', arg: 7, h: 'Exactly 7 letters' },
    { p: 'Type a word with exactly 4 letters', a: 'WIND', acc: ['WIND', 'WAVE', 'HERO', 'BOLT', 'IRON', 'GLOW'], rule: 'LENGTH_EXACT', arg: 4, h: 'Exactly 4 letters' },
    { p: 'Type a word with exactly 5 letters', a: 'GHOST', acc: ['GHOST', 'CROWN', 'TIGER', 'BLADE', 'FLASH', 'SPACE'], rule: 'LENGTH_EXACT', arg: 5, h: 'Exactly 5 letters' },
    { p: 'Type a word with exactly 6 letters', a: 'SHADOW', acc: ['SHADOW', 'METEOR', 'ENERGY', 'FROZEN', 'COSMIC'], rule: 'LENGTH_EXACT', arg: 6, h: 'Exactly 6 letters' },
    { p: 'Type a word with exactly 7 letters', a: 'PULSARE', acc: ['DIAMOND', 'TITANIUM', 'MONSTER', 'CHAMPION', 'DYNAMIC'], rule: 'LENGTH_EXACT', arg: 7, h: 'Exactly 7 letters' },
    { p: 'Type a word with exactly 5 letters', a: 'LIGHT', acc: ['LIGHT', 'MAGIC', 'SWORD', 'FORCE', 'RADAR'], rule: 'LENGTH_EXACT', arg: 5, h: 'Exactly 5 letters' }
  ],
  5: [ // Consecutive Vowels
    { p: 'Type a word containing two consecutive vowels (e.g. EE, EA, OO)', a: 'MOON', acc: ['MOON', 'SPEED', 'BEAST', 'RAIN', 'TRAIN', 'BOAT'], rule: 'CONSECUTIVE_VOWELS', arg: 2, h: 'e.g. MOON, RAIN, BEAST' },
    { p: 'Type a word containing "EE"', a: 'SPEED', acc: ['SPEED', 'STEEL', 'TREE', 'FREE', 'GREEN', 'QUEEN', 'SEEK'], rule: 'CONTAINS_SUBSTRING', arg: 'EE', h: 'Contains double E' },
    { p: 'Type a word containing "OO"', a: 'BLOOM', acc: ['BLOOM', 'BOOM', 'MOON', 'SHOOT', 'ROOT', 'FLOOD', 'COOL'], rule: 'CONTAINS_SUBSTRING', arg: 'OO', h: 'Contains double O' },
    { p: 'Type a word containing "EA"', a: 'BEAST', acc: ['BEAST', 'DREAM', 'BEACH', 'CLEAR', 'PEACE', 'LEAD', 'HEAR'], rule: 'CONTAINS_SUBSTRING', arg: 'EA', h: 'Contains EA' },
    { p: 'Type a word containing "AI"', a: 'BRAIN', acc: ['BRAIN', 'TRAIN', 'RAIN', 'CHAIN', 'PAINT', 'SAIL'], rule: 'CONTAINS_SUBSTRING', arg: 'AI', h: 'Contains AI' },
    { p: 'Type a word containing "OA"', a: 'ROAR', acc: ['ROAR', 'BOAT', 'COAT', 'ROAD', 'COAST', 'FLOAT', 'SOAP'], rule: 'CONTAINS_SUBSTRING', arg: 'OA', h: 'Contains OA' },
    { p: 'Type a word containing "OU"', a: 'SOUND', acc: ['SOUND', 'CLOUD', 'ROUND', 'SHOUT', 'MOUNT', 'POUR'], rule: 'CONTAINS_SUBSTRING', arg: 'OU', h: 'Contains OU' },
    { p: 'Type a word containing "IE"', a: 'SHIELD', acc: ['SHIELD', 'PIECE', 'CHIEF', 'FIELD', 'FRIEND', 'TIE'], rule: 'CONTAINS_SUBSTRING', arg: 'IE', h: 'Contains IE' },
    { p: 'Type a word containing "AU"', a: 'LAUNCH', acc: ['LAUNCH', 'FAULT', 'HAUNT', 'SAUCE', 'PAUSE', 'AUDIO'], rule: 'CONTAINS_SUBSTRING', arg: 'AU', h: 'Contains AU' },
    { p: 'Type a word containing three consecutive vowels', a: 'BEAUTY', acc: ['BEAUTY', 'QUEUE', 'AUDIO', 'QUEEN'], rule: 'CONSECUTIVE_VOWELS', arg: 3, h: 'e.g. BEAUTY, AUDIO' }
  ],

  // L6-10: Longer words and less common letter combos (14s)
  6: [ // Less common letter combos
    { p: 'Type a word containing "QU"', a: 'QUEEN', acc: ['QUEEN', 'QUICK', 'QUIET', 'QUEST', 'EQUAL', 'LIQUID'], rule: 'CONTAINS_SUBSTRING', arg: 'QU', h: 'e.g. QUEEN, QUICK' },
    { p: 'Type a word containing "PH"', a: 'PHANTOM', acc: ['PHANTOM', 'PHONE', 'PHOTO', 'GRAPH', 'PHASE', 'DOLPHIN'], rule: 'CONTAINS_SUBSTRING', arg: 'PH', h: 'e.g. PHONE, PHOTO' },
    { p: 'Type a word containing "WH"', a: 'WHITE', acc: ['WHITE', 'WHEEL', 'WHALE', 'WHISPER', 'WHEAT', 'WHIP'], rule: 'CONTAINS_SUBSTRING', arg: 'WH', h: 'e.g. WHITE, WHALE' },
    { p: 'Type a word containing "TH"', a: 'THUNDER', acc: ['THUNDER', 'EARTH', 'TEETH', 'TRUTH', 'STRENGTH', 'NORTH'], rule: 'CONTAINS_SUBSTRING', arg: 'TH', h: 'e.g. THUNDER, EARTH' },
    { p: 'Type a word containing "CK"', a: 'ROCKET', acc: ['ROCKET', 'BLACK', 'CLOCK', 'BRICK', 'TRACK', 'SHOCK'], rule: 'CONTAINS_SUBSTRING', arg: 'CK', h: 'e.g. ROCKET, BRICK' },
    { p: 'Type a word containing "WR"', a: 'WRITING', acc: ['WRITING', 'WRITE', 'WRONG', 'WRIST', 'WRAP', 'WRECK'], rule: 'CONTAINS_SUBSTRING', arg: 'WR', h: 'e.g. WRITE, WRIST' },
    { p: 'Type a word containing "KN"', a: 'KNIGHT', acc: ['KNIGHT', 'KNOCK', 'KNOW', 'KNIFE', 'KNEE', 'KNOT'], rule: 'CONTAINS_SUBSTRING', arg: 'KN', h: 'e.g. KNIGHT, KNIFE' },
    { p: 'Type a word containing "GH"', a: 'LIGHT', acc: ['LIGHT', 'NIGHT', 'GHOST', 'FIGHT', 'HIGH', 'BRIGHT'], rule: 'CONTAINS_SUBSTRING', arg: 'GH', h: 'e.g. LIGHT, GHOST' },
    { p: 'Type a word containing "SC"', a: 'SCORE', acc: ['SCORE', 'SCALE', 'SCENE', 'SCREEN', 'SCARF', 'SCHOOL'], rule: 'CONTAINS_SUBSTRING', arg: 'SC', h: 'e.g. SCORE, SCALE' },
    { p: 'Type a word containing "SW"', a: 'SWORD', acc: ['SWORD', 'SWEET', 'SWIM', 'SWIFT', 'SWING', 'SWAP'], rule: 'CONTAINS_SUBSTRING', arg: 'SW', h: 'e.g. SWORD, SWIFT' }
  ],
  7: [ // Specific Endings
    { p: 'Type a word ending with "ING"', a: 'FLYING', acc: ['FLYING', 'RING', 'SING', 'SPRING', 'RACING', 'SHINING'], rule: 'ENDS_WITH', arg: 'ING', h: 'Ends with ING' },
    { p: 'Type a word ending with "ED"', a: 'LOCKED', acc: ['LOCKED', 'BLASTED', 'ARMED', 'CHARGED', 'SPEED', 'REVEALED'], rule: 'ENDS_WITH', arg: 'ED', h: 'Ends with ED' },
    { p: 'Type a word ending with "LY"', a: 'SWIFTLY', acc: ['SWIFTLY', 'FLY', 'EARLY', 'BRAVELY', 'QUICKLY', 'HIGHLY'], rule: 'ENDS_WITH', arg: 'LY', h: 'Ends with LY' },
    { p: 'Type a word ending with "EST"', a: 'FASTEST', acc: ['FASTEST', 'BEST', 'WEST', 'GUEST', 'FOREST', 'CHEST'], rule: 'ENDS_WITH', arg: 'EST', h: 'Ends with EST' },
    { p: 'Type a word ending with "FUL"', a: 'POWERFUL', acc: ['POWERFUL', 'HOPEFUL', 'SKILLFUL', 'JOYFUL', 'CAREFUL'], rule: 'ENDS_WITH', arg: 'FUL', h: 'Ends with FUL' },
    { p: 'Type a word ending with "LESS"', a: 'FEARLESS', acc: ['FEARLESS', 'ENDLESS', 'TIMELESS', 'HELPLESS', 'WIRELESS'], rule: 'ENDS_WITH', arg: 'LESS', h: 'Ends with LESS' },
    { p: 'Type a word ending with "MENT"', a: 'MOVEMENT', acc: ['MOVEMENT', 'PAYMENT', 'ELEMENT', 'MOMENT', 'ARGUMENT'], rule: 'ENDS_WITH', arg: 'MENT', h: 'Ends with MENT' },
    { p: 'Type a word ending with "TION"', a: 'ACTION', acc: ['ACTION', 'MOTION', 'NATION', 'STATION', 'POTION', 'CREATION'], rule: 'ENDS_WITH', arg: 'TION', h: 'Ends with TION' },
    { p: 'Type a word ending with "ABLE"', a: 'STABLE', acc: ['STABLE', 'TABLE', 'CAPABLE', 'ENABLE', 'RELIABLE'], rule: 'ENDS_WITH', arg: 'ABLE', h: 'Ends with ABLE' },
    { p: 'Type a word ending with "NESS"', a: 'DARKNESS', acc: ['DARKNESS', 'BRIGHTNESS', 'KINDNESS', 'FITNESS'], rule: 'ENDS_WITH', arg: 'NESS', h: 'Ends with NESS' }
  ],
  8: [ // Starts with X and Contains Y
    { p: 'Type a word beginning with "P" and containing "R"', a: 'PRIDE', acc: ['PRIDE', 'POWER', 'PARK', 'PRICE', 'PRINT', 'PURE'], rule: 'STARTS_AND_CONTAINS', arg: { start: 'P', contains: 'R' }, h: 'Starts P, has R' },
    { p: 'Type a word beginning with "S" and containing "L"', a: 'SLATE', acc: ['SLATE', 'SILVER', 'SOLAR', 'SOLID', 'SCALE'], rule: 'STARTS_AND_CONTAINS', arg: { start: 'S', contains: 'L' }, h: 'Starts S, has L' },
    { p: 'Type a word beginning with "C" and containing "T"', a: 'CRAFT', acc: ['CRAFT', 'CAT', 'COAT', 'CITY', 'CRYSTAL', 'CASTLE'], rule: 'STARTS_AND_CONTAINS', arg: { start: 'C', contains: 'T' }, h: 'Starts C, has T' },
    { p: 'Type a word beginning with "B" and containing "N"', a: 'BRAIN', acc: ['BRAIN', 'BROWN', 'BONE', 'BURN', 'BLIND', 'BARN'], rule: 'STARTS_AND_CONTAINS', arg: { start: 'B', contains: 'N' }, h: 'Starts B, has N' },
    { p: 'Type a word beginning with "T" and containing "M"', a: 'TIME', acc: ['TIME', 'TEAM', 'STORM', 'TERM', 'TIMBER'], rule: 'STARTS_AND_CONTAINS', arg: { start: 'T', contains: 'M' }, h: 'Starts T, has M' },
    { p: 'Type a word beginning with "F" and containing "R"', a: 'FROST', acc: ['FROST', 'FIRE', 'FREE', 'FARM', 'FORCE', 'FLARE'], rule: 'STARTS_AND_CONTAINS', arg: { start: 'F', contains: 'R' }, h: 'Starts F, has R' },
    { p: 'Type a word beginning with "D" and containing "L"', a: 'DELTA', acc: ['DELTA', 'DIAL', 'DOLL', 'DARKLY', 'DEAL'], rule: 'STARTS_AND_CONTAINS', arg: { start: 'D', contains: 'L' }, h: 'Starts D, has L' },
    { p: 'Type a word beginning with "G" and containing "D"', a: 'GOLD', acc: ['GOLD', 'GUARD', 'GOOD', 'GRID', 'GLAD'], rule: 'STARTS_AND_CONTAINS', arg: { start: 'G', contains: 'D' }, h: 'Starts G, has D' },
    { p: 'Type a word beginning with "M" and containing "S"', a: 'MUSIC', acc: ['MUSIC', 'MASK', 'MIST', 'MASS', 'MOUSE'], rule: 'STARTS_AND_CONTAINS', arg: { start: 'M', contains: 'S' }, h: 'Starts M, has S' },
    { p: 'Type a word beginning with "R" and containing "C"', a: 'ROCKET', acc: ['ROCKET', 'RACE', 'REACH', 'RICH', 'RICE'], rule: 'STARTS_AND_CONTAINS', arg: { start: 'R', contains: 'C' }, h: 'Starts R, has C' }
  ],
  9: [ // Length plus letter
    { p: 'Type a word with at least 6 letters containing "X"', a: 'MATRIX', acc: ['MATRIX', 'COMPLEX', 'OXYGEN', 'GALAXY', 'BOXING', 'EXPERT'], rule: 'LENGTH_MIN_AND_CONTAINS', arg: { min: 6, contains: 'X' }, h: '6+ letters with X' },
    { p: 'Type a word with at least 6 letters containing "Z"', a: 'FREEZE', acc: ['FREEZE', 'HAZARD', 'BRONZE', 'BREEZE', 'BLIZZARD'], rule: 'LENGTH_MIN_AND_CONTAINS', arg: { min: 6, contains: 'Z' }, h: '6+ letters with Z' },
    { p: 'Type a word with at least 7 letters containing "K"', a: 'KINGDOM', acc: ['KINGDOM', 'ROCKET', 'BLANKET', 'STRIKER', 'SPEAKER'], rule: 'LENGTH_MIN_AND_CONTAINS', arg: { min: 7, contains: 'K' }, h: '7+ letters with K' },
    { p: 'Type a word with at least 7 letters containing "V"', a: 'VICTORY', acc: ['VICTORY', 'SURVIVE', 'GRAVITY', 'BRAVERY', 'UNIVERSE'], rule: 'LENGTH_MIN_AND_CONTAINS', arg: { min: 7, contains: 'V' }, h: '7+ letters with V' },
    { p: 'Type a word with at least 7 letters', a: 'THUNDER', acc: ['THUNDER', 'WARRIOR', 'DIAMOND', 'CHAMPION', 'MONSTER'], rule: 'LENGTH_MIN', arg: 7, h: 'At least 7 letters' },
    { p: 'Type a word with at least 8 letters', a: 'LIGHTNING', acc: ['LIGHTNING', 'EXPLOSION', 'GUARDIAN', 'UNIVERSE'], rule: 'LENGTH_MIN', arg: 8, h: 'At least 8 letters' },
    { p: 'Type a word with at least 6 letters containing "Q"', a: 'SQUARE', acc: ['SQUARE', 'LIQUID', 'EQUITY', 'UNIQUE', 'QUENCH'], rule: 'LENGTH_MIN_AND_CONTAINS', arg: { min: 6, contains: 'Q' }, h: '6+ letters with Q' },
    { p: 'Type a word with at least 7 letters containing "W"', a: 'WARRIOR', acc: ['WARRIOR', 'SHADOW', 'NETWORK', 'POWERFUL', 'FORWARD'], rule: 'LENGTH_MIN_AND_CONTAINS', arg: { min: 7, contains: 'W' }, h: '7+ letters with W' },
    { p: 'Type a word with at least 8 letters containing "C"', a: 'CHAMPION', acc: ['CHAMPION', 'CRITICAL', 'ELECTRIC', 'SECURITY'], rule: 'LENGTH_MIN_AND_CONTAINS', arg: { min: 8, contains: 'C' }, h: '8+ letters with C' },
    { p: 'Type a word with at least 8 letters containing "T"', a: 'TITANIUM', acc: ['TITANIUM', 'TACTICAL', 'TERMINAL', 'STRENGTH'], rule: 'LENGTH_MIN_AND_CONTAINS', arg: { min: 8, contains: 'T' }, h: '8+ letters with T' }
  ],
  10: [ // Medial Blends
    { p: 'Type a word containing "MP"', a: 'CHAMP', acc: ['CHAMP', 'JUMP', 'CAMP', 'STAMP', 'TEMPLE', 'SIMPLE'], rule: 'CONTAINS_SUBSTRING', arg: 'MP', h: 'Contains MP' },
    { p: 'Type a word containing "ND"', a: 'SOUND', acc: ['SOUND', 'ROUND', 'LAND', 'WIND', 'SAND', 'FRIEND'], rule: 'CONTAINS_SUBSTRING', arg: 'ND', h: 'Contains ND' },
    { p: 'Type a word containing "NT"', a: 'PLANT', acc: ['PLANT', 'HUNT', 'POINT', 'GIANT', 'FRONT', 'SILENT'], rule: 'CONTAINS_SUBSTRING', arg: 'NT', h: 'Contains NT' },
    { p: 'Type a word containing "LT"', a: 'BOLT', acc: ['BOLT', 'MELT', 'BELT', 'GOLD', 'VAULT', 'RESULT'], rule: 'CONTAINS_SUBSTRING', arg: 'LT', h: 'Contains LT' },
    { p: 'Type a word containing "NK"', a: 'TANK', acc: ['TANK', 'BANK', 'SINK', 'PINK', 'BLINK', 'DRINK'], rule: 'CONTAINS_SUBSTRING', arg: 'NK', h: 'Contains NK' },
    { p: 'Type a word containing "RK"', a: 'SPARK', acc: ['SPARK', 'SHARK', 'PARK', 'DARK', 'MARK', 'FORK'], rule: 'CONTAINS_SUBSTRING', arg: 'RK', h: 'Contains RK' },
    { p: 'Type a word containing "FT"', a: 'SWIFT', acc: ['SWIFT', 'CRAFT', 'LIFT', 'GIFT', 'RAFT', 'SOFT'], rule: 'CONTAINS_SUBSTRING', arg: 'FT', h: 'Contains FT' },
    { p: 'Type a word containing "PT"', a: 'ADAPT', acc: ['ADAPT', 'CRYPT', 'OPT', 'ADOPT', 'ACCEPT', 'SCRIPT'], rule: 'CONTAINS_SUBSTRING', arg: 'PT', h: 'Contains PT' },
    { p: 'Type a word containing "CT"', a: 'ACT', acc: ['ACT', 'FACT', 'IMPACT', 'TACTIC', 'SECTOR', 'DIRECT'], rule: 'CONTAINS_SUBSTRING', arg: 'CT', h: 'Contains CT' },
    { p: 'Type a word containing "RN"', a: 'BURN', acc: ['BURN', 'WARN', 'TURN', 'HORN', 'CORN', 'STORM'], rule: 'CONTAINS_SUBSTRING', arg: 'RN', h: 'Contains RN' }
  ],

  // L11-15: Two Conditions (12s)
  11: [ // Matching First & Last Letters
    { p: 'Type a word that starts with "T" and ends with "T"', a: 'TREAT', acc: ['TREAT', 'TENT', 'TARGET', 'TEST', 'TRUST', 'TOAST', 'TIGHT'], rule: 'STARTS_AND_ENDS', arg: { start: 'T', ends: 'T' }, h: 'Starts & ends with T' },
    { p: 'Type a word that starts with "S" and ends with "S"', a: 'STARS', acc: ['STARS', 'STRESS', 'SWISS', 'STATUS', 'SERIES'], rule: 'STARTS_AND_ENDS', arg: { start: 'S', ends: 'S' }, h: 'Starts & ends with S' },
    { p: 'Type a word that starts with "P" and ends with "P"', a: 'PUMP', acc: ['PUMP', 'POP', 'PLUMP', 'PROP', 'POOP', 'PULP'], rule: 'STARTS_AND_ENDS', arg: { start: 'P', ends: 'P' }, h: 'Starts & ends with P' },
    { p: 'Type a word that starts with "D" and ends with "D"', a: 'DEAD', acc: ['DEAD', 'DAD', 'DEED', 'DIVIDED', 'DAVID', 'DREAD'], rule: 'STARTS_AND_ENDS', arg: { start: 'D', ends: 'D' }, h: 'Starts & ends with D' },
    { p: 'Type a word that starts with "R" and ends with "R"', a: 'RADAR', acc: ['RADAR', 'ROAR', 'RIVER', 'ROTOR', 'READER'], rule: 'STARTS_AND_ENDS', arg: { start: 'R', ends: 'R' }, h: 'Starts & ends with R' },
    { p: 'Type a word that starts with "L" and ends with "L"', a: 'LEVEL', acc: ['LEVEL', 'LOYAL', 'LEGAL', 'LABEL', 'LOCAL'], rule: 'STARTS_AND_ENDS', arg: { start: 'L', ends: 'L' }, h: 'Starts & ends with L' },
    { p: 'Type a word that starts with "M" and ends with "M"', a: 'MOM', acc: ['MOM', 'MADAM', 'MAXIMUM', 'MEDIUM', 'MUSEUM'], rule: 'STARTS_AND_ENDS', arg: { start: 'M', ends: 'M' }, h: 'Starts & ends with M' },
    { p: 'Type a word that starts with "N" and ends with "N"', a: 'NOON', acc: ['NOON', 'NOUN', 'NATION', 'NEON', 'NINETY'], rule: 'STARTS_AND_ENDS', arg: { start: 'N', ends: 'N' }, h: 'Starts & ends with N' },
    { p: 'Type a word that starts with "E" and ends with "E"', a: 'EAGLE', acc: ['EAGLE', 'EYE', 'EDGE', 'ENGINE', 'ESCAPE', 'EMPIRE'], rule: 'STARTS_AND_ENDS', arg: { start: 'E', ends: 'E' }, h: 'Starts & ends with E' },
    { p: 'Type a word that starts with "A" and ends with "A"', a: 'AREA', acc: ['AREA', 'ARENA', 'ALPHA', 'ASIA', 'AURA'], rule: 'STARTS_AND_ENDS', arg: { start: 'A', ends: 'A' }, h: 'Starts & ends with A' }
  ],
  12: [ // Starts with A, ends with B
    { p: 'Type a word that starts with "B" and ends with "E"', a: 'BRAVE', acc: ['BRAVE', 'BLUE', 'BLADE', 'BREEZE', 'BONE', 'BRIDGE'], rule: 'STARTS_AND_ENDS', arg: { start: 'B', ends: 'E' }, h: 'Starts B, ends E' },
    { p: 'Type a word that starts with "C" and ends with "T"', a: 'CRAFT', acc: ['CRAFT', 'CAT', 'COAT', 'CAST', 'CRYPT'], rule: 'STARTS_AND_ENDS', arg: { start: 'C', ends: 'T' }, h: 'Starts C, ends T' },
    { p: 'Type a word that starts with "M" and ends with "N"', a: 'MOON', acc: ['MOON', 'MAN', 'MAIN', 'MOUNTAIN', 'MISSION'], rule: 'STARTS_AND_ENDS', arg: { start: 'M', ends: 'N' }, h: 'Starts M, ends N' },
    { p: 'Type a word that starts with "F" and ends with "T"', a: 'FROST', acc: ['FROST', 'FAST', 'FLEET', 'FIRST', 'FLIGHT'], rule: 'STARTS_AND_ENDS', arg: { start: 'F', ends: 'T' }, h: 'Starts F, ends T' },
    { p: 'Type a word that starts with "S" and ends with "K"', a: 'SPARK', acc: ['SPARK', 'SHARK', 'SINK', 'SHOCK', 'STICK'], rule: 'STARTS_AND_ENDS', arg: { start: 'S', ends: 'K' }, h: 'Starts S, ends K' },
    { p: 'Type a word that starts with "P" and ends with "R"', a: 'POWER', acc: ['POWER', 'PAPER', 'PLAYER', 'PORTAL'], rule: 'STARTS_AND_ENDS', arg: { start: 'P', ends: 'R' }, h: 'Starts P, ends R' },
    { p: 'Type a word that starts with "D" and ends with "K"', a: 'DARK', acc: ['DARK', 'DUCK', 'DECK', 'DRINK'], rule: 'STARTS_AND_ENDS', arg: { start: 'D', ends: 'K' }, h: 'Starts D, ends K' },
    { p: 'Type a word that starts with "G" and ends with "D"', a: 'GOLD', acc: ['GOLD', 'GOOD', 'GUARD', 'GRID', 'GROUND'], rule: 'STARTS_AND_ENDS', arg: { start: 'G', ends: 'D' }, h: 'Starts G, ends D' },
    { p: 'Type a word that starts with "W" and ends with "D"', a: 'WIND', acc: ['WIND', 'WOOD', 'WORLD', 'WORD', 'SWORD'], rule: 'STARTS_AND_ENDS', arg: { start: 'W', ends: 'D' }, h: 'Starts W, ends D' },
    { p: 'Type a word that starts with "H" and ends with "T"', a: 'HEAT', acc: ['HEAT', 'HOT', 'HEART', 'HUNT', 'HURT', 'HEIGHT'], rule: 'STARTS_AND_ENDS', arg: { start: 'H', ends: 'T' }, h: 'Starts H, ends T' }
  ],
  13: [ // Contains Substring + Min Length
    { p: 'Type a word containing "AR" with at least 5 letters', a: 'SPARK', acc: ['SPARK', 'SHARK', 'EARTH', 'HEART', 'SOLAR', 'RADAR'], rule: 'CONTAINS_AND_MIN_LEN', arg: { contains: 'AR', min: 5 }, h: 'Has AR, 5+ letters' },
    { p: 'Type a word containing "OR" with at least 6 letters', a: 'MIRROR', acc: ['MIRROR', 'WARRIOR', 'METEOR', 'SECTOR', 'HORIZON', 'SWORD'], rule: 'CONTAINS_AND_MIN_LEN', arg: { contains: 'OR', min: 6 }, h: 'Has OR, 6+ letters' },
    { p: 'Type a word containing "IN" and ending with "G"', a: 'SPRING', acc: ['SPRING', 'FLYING', 'RACING', 'SHINING', 'STRING', 'RING'], rule: 'CONTAINS_AND_ENDS', arg: { contains: 'IN', ends: 'G' }, h: 'Has IN, ends G' },
    { p: 'Type a word containing "UN" with at least 5 letters', a: 'THUNDER', acc: ['THUNDER', 'LAUNCH', 'ROUND', 'SOUND'], rule: 'CONTAINS_AND_MIN_LEN', arg: { contains: 'UN', min: 5 }, h: 'Has UN, 5+ letters' },
    { p: 'Type a word containing "EN" with at least 6 letters', a: 'ENERGY', acc: ['ENERGY', 'SILVER', 'FROZEN', 'GOLDEN', 'OXYGEN'], rule: 'CONTAINS_AND_MIN_LEN', arg: { contains: 'EN', min: 6 }, h: 'Has EN, 6+ letters' },
    { p: 'Type a word containing "AN" and starting with "P"', a: 'PLANET', acc: ['PLANET', 'PANDA', 'PANTHER', 'PLANT'], rule: 'STARTS_AND_CONTAINS', arg: { start: 'P', contains: 'AN' }, h: 'Starts P, has AN' },
    { p: 'Type a word containing "AT" and ending with "E"', a: 'PLATE', acc: ['PLATE', 'SLATE', 'CRATE', 'CREATE', 'PIRATE'], rule: 'CONTAINS_AND_ENDS', arg: { contains: 'AT', ends: 'E' }, h: 'Has AT, ends E' },
    { p: 'Type a word containing "IT" with at least 6 letters', a: 'CRITICAL', acc: ['CRITICAL', 'ORBIT', 'SUMMIT', 'SPIRIT', 'LIMIT'], rule: 'CONTAINS_AND_MIN_LEN', arg: { contains: 'IT', min: 6 }, h: 'Has IT, 6+ letters' },
    { p: 'Type a word containing "OP" with at least 5 letters', a: 'TROPIC', acc: ['TROPIC', 'COOPER', 'SHOPPING', 'OPERA'], rule: 'CONTAINS_AND_MIN_LEN', arg: { contains: 'OP', min: 5 }, h: 'Has OP, 5+ letters' },
    { p: 'Type a word containing "ET" and starting with "R"', a: 'ROCKET', acc: ['ROCKET', 'RESET', 'RETURN', 'RETRO'], rule: 'STARTS_AND_CONTAINS', arg: { start: 'R', contains: 'ET' }, h: 'Starts R, has ET' }
  ],
  14: [ // Starts Vowel / Ends Consonant & vice versa
    { p: 'Type a word that starts with a vowel and ends with "T"', a: 'ORBIT', acc: ['ORBIT', 'ACT', 'EXIT', 'ALERT', 'AGENT', 'INPUT'], rule: 'VOWEL_START_ENDS', arg: 'T', h: 'Starts A,E,I,O,U & ends T' },
    { p: 'Type a word that starts with a vowel and ends with "N"', a: 'IRON', acc: ['IRON', 'OCEAN', 'ALIEN', 'ACTION', 'OXYGEN', 'URBAN'], rule: 'VOWEL_START_ENDS', arg: 'N', h: 'Starts vowel, ends N' },
    { p: 'Type a word that starts with a vowel and ends with "R"', a: 'ARMOR', acc: ['ARMOR', 'ORDER', 'AFTER', 'ENTER', 'OTHER'], rule: 'VOWEL_START_ENDS', arg: 'R', h: 'Starts vowel, ends R' },
    { p: 'Type a word that starts with a vowel and ends with "D"', a: 'ACID', acc: ['ACID', 'AHEAD', 'ARMED', 'END', 'OLD'], rule: 'VOWEL_START_ENDS', arg: 'D', h: 'Starts vowel, ends D' },
    { p: 'Type a word that starts with a vowel and ends with "L"', a: 'EQUAL', acc: ['EQUAL', 'ANGEL', 'ANVIL', 'IDEAL', 'OIL'], rule: 'VOWEL_START_ENDS', arg: 'L', h: 'Starts vowel, ends L' },
    { p: 'Type a word that starts with a consonant and ends with "A"', a: 'ARENA', acc: ['ARENA', 'DELTA', 'MAGMA', 'NINJA', 'PIZZA', 'ZEBRA'], rule: 'CONSONANT_START_ENDS', arg: 'A', h: 'Starts consonant, ends A' },
    { p: 'Type a word that starts with a consonant and ends with "O"', a: 'HERO', acc: ['HERO', 'RETRO', 'ECHO', 'METRO', 'VOLCANO', 'COMBO'], rule: 'CONSONANT_START_ENDS', arg: 'O', h: 'Starts consonant, ends O' },
    { p: 'Type a word that starts with a consonant and ends with "I"', a: 'TAXI', acc: ['TAXI', 'SAFARI', 'ORIGAMI', 'KIWI'], rule: 'CONSONANT_START_ENDS', arg: 'I', h: 'Starts consonant, ends I' },
    { p: 'Type a word that starts with a vowel and ends with "S"', a: 'ATLAS', acc: ['ATLAS', 'AXIS', 'CHAOS', 'FOCUS', 'OPUS'], rule: 'VOWEL_START_ENDS', arg: 'S', h: 'Starts vowel, ends S' },
    { p: 'Type a word that starts with a vowel and ends with "K"', a: 'OAK', acc: ['OAK', 'ATTACK', 'ANTARCTIC'], rule: 'VOWEL_START_ENDS', arg: 'K', h: 'Starts vowel, ends K' }
  ],
  15: [ // Dual Vowel presence & Length
    { p: 'Type a 5-letter word containing both "A" and "E"', a: 'BLADE', acc: ['BLADE', 'FLAME', 'BRAVE', 'CRANE', 'SPACE', 'SHARE'], rule: 'LENGTH_AND_LETTERS', arg: { len: 5, letters: ['A', 'E'] }, h: '5 letters, has A & E' },
    { p: 'Type a 5-letter word containing both "O" and "U"', a: 'CLOUD', acc: ['CLOUD', 'ROUND', 'SOUND', 'MOUNT', 'COURT'], rule: 'LENGTH_AND_LETTERS', arg: { len: 5, letters: ['O', 'U'] }, h: '5 letters, has O & U' },
    { p: 'Type a 5-letter word containing both "A" and "I"', a: 'BRAIN', acc: ['BRAIN', 'TRAIN', 'CHAIN', 'PAINT', 'RADIO'], rule: 'LENGTH_AND_LETTERS', arg: { len: 5, letters: ['A', 'I'] }, h: '5 letters, has A & I' },
    { p: 'Type a 5-letter word containing both "O" and "E"', a: 'STONE', acc: ['STONE', 'FORCE', 'POWER', 'SCORE', 'TOWER'], rule: 'LENGTH_AND_LETTERS', arg: { len: 5, letters: ['O', 'E'] }, h: '5 letters, has O & E' },
    { p: 'Type a 5-letter word containing both "I" and "E"', a: 'PRIDE', acc: ['PRIDE', 'DRIVE', 'WHITE', 'SHINE', 'PIECE', 'TIGER'], rule: 'LENGTH_AND_LETTERS', arg: { len: 5, letters: ['I', 'E'] }, h: '5 letters, has I & E' },
    { p: 'Type a 6-letter word containing both "A" and "O"', a: 'SHADOW', acc: ['SHADOW', 'DRAGON', 'CANYON', 'RADIO'], rule: 'LENGTH_AND_LETTERS', arg: { len: 6, letters: ['A', 'O'] }, h: '6 letters, has A & O' },
    { p: 'Type a 6-letter word containing both "E" and "U"', a: 'FUTURE', acc: ['FUTURE', 'RESCUE', 'NATURE', 'SECURE'], rule: 'LENGTH_AND_LETTERS', arg: { len: 6, letters: ['E', 'U'] }, h: '6 letters, has E & U' },
    { p: 'Type a 6-letter word containing both "I" and "O"', a: 'SILVER', acc: ['ACTION', 'MOTION', 'VISION', 'PRISON', 'PISTON'], rule: 'LENGTH_AND_LETTERS', arg: { len: 6, letters: ['I', 'O'] }, h: '6 letters, has I & O' },
    { p: 'Type a 5-letter word containing both "E" and "U"', a: 'SUPER', acc: ['SUPER', 'PULSE', 'QUEEN', 'GUIDE', 'HOUSE'], rule: 'LENGTH_AND_LETTERS', arg: { len: 5, letters: ['E', 'U'] }, h: '5 letters, has E & U' },
    { p: 'Type a 5-letter word containing both "A" and "O"', a: 'SOLAR', acc: ['SOLAR', 'RADIO', 'MANGO', 'COACH', 'ROAST'], rule: 'LENGTH_AND_LETTERS', arg: { len: 5, letters: ['A', 'O'] }, h: '5 letters, has A & O' }
  ],

  // L16-20: Multiple constraints under rapid pressure (10s)
  16: [ // 3 Constraints: Starts with X, contains Y, ends with Z
    { p: 'Type a word that starts with "C", contains "AR", and ends with "E"', a: 'CARE', acc: ['CARE', 'CHARGE', 'CARPET', 'CURE'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'C', contains: 'AR', ends: 'E' }, h: 'C...AR...E' },
    { p: 'Type a word that starts with "S", contains "HA", and ends with "K"', a: 'SHARK', acc: ['SHARK', 'SHACK'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'S', contains: 'HA', ends: 'K' }, h: 'S...HA...K' },
    { p: 'Type a word that starts with "P", contains "AN", and ends with "T"', a: 'PLANT', acc: ['PLANT', 'PLANET'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'P', contains: 'AN', ends: 'T' }, h: 'P...AN...T' },
    { p: 'Type a word that starts with "F", contains "LA", and ends with "E"', a: 'FLAME', acc: ['FLAME', 'FLARE'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'F', contains: 'LA', ends: 'E' }, h: 'F...LA...E' },
    { p: 'Type a word that starts with "B", contains "LA", and ends with "T"', a: 'BLAST', acc: ['BLAST', 'BLANKET'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'B', contains: 'LA', ends: 'T' }, h: 'B...LA...T' },
    { p: 'Type a word that starts with "T", contains "RA", and ends with "N"', a: 'TRAIN', acc: ['TRAIN', 'TITAN'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'T', contains: 'RA', ends: 'N' }, h: 'T...RA...N' },
    { p: 'Type a word that starts with "D", contains "RE", and ends with "M"', a: 'DREAM', acc: ['DREAM'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'D', contains: 'RE', ends: 'M' }, h: 'D...RE...M' },
    { p: 'Type a word that starts with "S", contains "PA", and ends with "E"', a: 'SPACE', acc: ['SPACE', 'SPARKLE'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'S', contains: 'PA', ends: 'E' }, h: 'S...PA...E' },
    { p: 'Type a word that starts with "G", contains "RA", and ends with "S"', a: 'GRASS', acc: ['GRASS', 'GRAPES'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'G', contains: 'RA', ends: 'S' }, h: 'G...RA...S' },
    { p: 'Type a word that starts with "C", contains "LO", and ends with "D"', a: 'CLOUD', acc: ['CLOUD'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'C', contains: 'LO', ends: 'D' }, h: 'C...LO...D' }
  ],
  17: [ // Starts S, contains TR, ends with G
    { p: 'Type a word that starts with "S", contains "TR", and ends with "G"', a: 'STRING', acc: ['STRING', 'STRONG', 'STREAMING', 'STRUGGLING'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'S', contains: 'TR', ends: 'G' }, h: 'S...TR...G' },
    { p: 'Type a word that starts with "S", contains "PR", and ends with "G"', a: 'SPRING', acc: ['SPRING', 'SPRAYING', 'SPROUTING'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'S', contains: 'PR', ends: 'G' }, h: 'S...PR...G' },
    { p: 'Type a word that starts with "F", contains "LY", and ends with "G"', a: 'FLYING', acc: ['FLYING'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'F', contains: 'LY', ends: 'G' }, h: 'F...LY...G' },
    { p: 'Type a word that starts with "P", contains "LA", and ends with "G"', a: 'PLAYING', acc: ['PLAYING', 'PLANNING'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'P', contains: 'LA', ends: 'G' }, h: 'P...LA...G' },
    { p: 'Type a word that starts with "B", contains "RI", and ends with "G"', a: 'BRING', acc: ['BRING', 'BREAKING'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'B', contains: 'RI', ends: 'G' }, h: 'B...RI...G' },
    { p: 'Type a word that starts with "C", contains "RY", and ends with "G"', a: 'CRYING', acc: ['CRYING'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'C', contains: 'RY', ends: 'G' }, h: 'C...RY...G' },
    { p: 'Type a word that starts with "D", contains "RI", and ends with "G"', a: 'DRIVING', acc: ['DRIVING', 'DRINKING'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'D', contains: 'RI', ends: 'G' }, h: 'D...RI...G' },
    { p: 'Type a word that starts with "R", contains "IN", and ends with "G"', a: 'RING', acc: ['RING', 'RACING', 'RULING'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'R', contains: 'IN', ends: 'G' }, h: 'R...IN...G' },
    { p: 'Type a word that starts with "S", contains "WI", and ends with "G"', a: 'SWING', acc: ['SWING', 'SWIMMING'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'S', contains: 'WI', ends: 'G' }, h: 'S...WI...G' },
    { p: 'Type a word that starts with "W", contains "IN", and ends with "G"', a: 'WING', acc: ['WING', 'WINNING'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'W', contains: 'IN', ends: 'G' }, h: 'W...IN...G' }
  ],
  18: [ // Starts with P, contains LA, at least 6 letters
    { p: 'Type a word that starts with "P", contains "LA", and has at least 6 letters', a: 'PLANET', acc: ['PLANET', 'PLASTIC', 'PLAYER', 'PLANTAIN', 'PLATFORM'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'P', contains: 'LA', min: 6 }, h: 'Starts P, has LA, 6+ chars' },
    { p: 'Type a word that starts with "S", contains "IL", and has at least 6 letters', a: 'SILVER', acc: ['SILVER', 'SILENT', 'SILICON'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'S', contains: 'IL', min: 6 }, h: 'Starts S, has IL, 6+ chars' },
    { p: 'Type a word that starts with "C", contains "RY", and has at least 6 letters', a: 'CRYSTAL', acc: ['CRYSTAL', 'CRYPTO', 'CRYING'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'C', contains: 'RY', min: 6 }, h: 'Starts C, has RY, 6+ chars' },
    { p: 'Type a word that starts with "D", contains "RA", and has at least 6 letters', a: 'DRAGON', acc: ['DRAGON', 'DRAMATIC', 'DRAWING'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'D', contains: 'RA', min: 6 }, h: 'Starts D, has RA, 6+ chars' },
    { p: 'Type a word that starts with "K", contains "IG", and has at least 6 letters', a: 'KNIGHT', acc: ['KNIGHT'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'K', contains: 'IG', min: 6 }, h: 'Starts K, has IG, 6+ chars' },
    { p: 'Type a word that starts with "M", contains "ET", and has at least 6 letters', a: 'METEOR', acc: ['METEOR', 'METHOD', 'METAL'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'M', contains: 'ET', min: 6 }, h: 'Starts M, has ET, 6+ chars' },
    { p: 'Type a word that starts with "T", contains "UN", and has at least 6 letters', a: 'THUNDER', acc: ['THUNDER', 'TUNNEL'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'T', contains: 'UN', min: 6 }, h: 'Starts T, has UN, 6+ chars' },
    { p: 'Type a word that starts with "W", contains "AR", and has at least 6 letters', a: 'WARRIOR', acc: ['WARRIOR', 'WARNING'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'W', contains: 'AR', min: 6 }, h: 'Starts W, has AR, 6+ chars' },
    { p: 'Type a word that starts with "F", contains "RO", and has at least 6 letters', a: 'FROZEN', acc: ['FROZEN', 'FRONTIER'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'F', contains: 'RO', min: 6 }, h: 'Starts F, has RO, 6+ chars' },
    { p: 'Type a word that starts with "G", contains "AL", and has at least 6 letters', a: 'GALAXY', acc: ['GALAXY', 'GALLERY'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'G', contains: 'AL', min: 6 }, h: 'Starts G, has AL, 6+ chars' }
  ],
  19: [ // Starts with B, ends with T, at least 6 letters
    { p: 'Type a word that starts with "B", ends with "T", and has at least 6 letters', a: 'BASKET', acc: ['BASKET', 'BULLET', 'BLANKET', 'BANQUET', 'BENEFIT'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'B', ends: 'T', min: 6 }, h: 'B...T (6+ letters)' },
    { p: 'Type a word that starts with "P", ends with "T", and has at least 6 letters', a: 'PLANET', acc: ['PLANET', 'POCKET', 'PARROT', 'PROPHET'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'P', ends: 'T', min: 6 }, h: 'P...T (6+ letters)' },
    { p: 'Type a word that starts with "R", ends with "T", and has at least 6 letters', a: 'ROCKET', acc: ['ROCKET', 'REPEAT', 'REPORT', 'RESPECT'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'R', ends: 'T', min: 6 }, h: 'R...T (6+ letters)' },
    { p: 'Type a word that starts with "K", ends with "T", and has at least 6 letters', a: 'KNIGHT', acc: ['KNIGHT'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'K', ends: 'T', min: 6 }, h: 'K...T (6+ letters)' },
    { p: 'Type a word that starts with "F", ends with "T", and has at least 6 letters', a: 'FLIGHT', acc: ['FLIGHT', 'FORGET', 'FOREST', 'FAUCET'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'F', ends: 'T', min: 6 }, h: 'F...T (6+ letters)' },
    { p: 'Type a word that starts with "S", ends with "T", and has at least 6 letters', a: 'SPIRIT', acc: ['SPIRIT', 'STREET', 'SUNSET', 'SECRET'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'S', ends: 'T', min: 6 }, h: 'S...T (6+ letters)' },
    { p: 'Type a word that starts with "T", ends with "T", and has at least 6 letters', a: 'TARGET', acc: ['TARGET', 'TALENT', 'THREAT', 'TICKET'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'T', ends: 'T', min: 6 }, h: 'T...T (6+ letters)' },
    { p: 'Type a word that starts with "C", ends with "T", and has at least 6 letters', a: 'CREDIT', acc: ['CREDIT', 'CARPET', 'CLOSET', 'COMBAT'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'C', ends: 'T', min: 6 }, h: 'C...T (6+ letters)' },
    { p: 'Type a word that starts with "M", ends with "T", and has at least 6 letters', a: 'MARKET', acc: ['MARKET', 'MAGNET', 'MOMENT'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'M', ends: 'T', min: 6 }, h: 'M...T (6+ letters)' },
    { p: 'Type a word that starts with "W", ends with "T", and has at least 6 letters', a: 'WALLET', acc: ['WALLET', 'WEIGHT', 'WALNUT'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'W', ends: 'T', min: 6 }, h: 'W...T (6+ letters)' }
  ],
  20: [ // Master Level 20: 4 Conditions! Starts C, contains AR, ends with E, min 6 letters
    { p: 'Type a word that:\n• Starts with C\n• Contains "AR"\n• Ends with E\n• Has at least 6 letters', a: 'CHARGE', acc: ['CHARGE', 'CARRIAGE', 'CLEARANCE', 'COMPARE', 'CAROUSEL'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'C', contains: 'AR', ends: 'E', min: 6 }, h: 'e.g. CHARGE, COMPARE' },
    { p: 'Type a word that:\n• Starts with S\n• Contains "AR"\n• Ends with E\n• Has at least 6 letters', a: 'SCARCE', acc: ['SCARCE', 'SQUARE'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'S', contains: 'AR', ends: 'E', min: 6 }, h: 'e.g. SCARCE, SQUARE' },
    { p: 'Type a word that:\n• Starts with P\n• Contains "RA"\n• Ends with E\n• Has at least 6 letters', a: 'PRAISE', acc: ['PRAISE', 'PARADE'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'P', contains: 'RA', ends: 'E', min: 6 }, h: 'e.g. PRAISE, PARADE' },
    { p: 'Type a word that:\n• Starts with B\n• Contains "ID"\n• Ends with E\n• Has at least 6 letters', a: 'BRIDGE', acc: ['BRIDGE'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'B', contains: 'ID', ends: 'E', min: 6 }, h: 'e.g. BRIDGE' },
    { p: 'Type a word that:\n• Starts with D\n• Contains "AM"\n• Ends with E\n• Has at least 6 letters', a: 'DAMAGE', acc: ['DAMAGE'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'D', contains: 'AM', ends: 'E', min: 6 }, h: 'e.g. DAMAGE' },
    { p: 'Type a word that:\n• Starts with F\n• Contains "EE"\n• Ends with M\n• Has at least 6 letters', a: 'FREEDOM', acc: ['FREEDOM'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'F', contains: 'EE', ends: 'M', min: 6 }, h: 'e.g. FREEDOM' },
    { p: 'Type a word that:\n• Starts with G\n• Contains "AR"\n• Ends with E\n• Has at least 6 letters', a: 'GARAGE', acc: ['GARAGE'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'G', contains: 'AR', ends: 'E', min: 6 }, h: 'e.g. GARAGE' },
    { p: 'Type a word that:\n• Starts with M\n• Contains "IR"\n• Ends with E\n• Has at least 6 letters', a: 'MIRACLE', acc: ['MIRACLE'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'M', contains: 'IR', ends: 'E', min: 6 }, h: 'e.g. MIRACLE' },
    { p: 'Type a word that:\n• Starts with N\n• Contains "AT"\n• Ends with E\n• Has at least 6 letters', a: 'NATURE', acc: ['NATURE'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'N', contains: 'AT', ends: 'E', min: 6 }, h: 'e.g. NATURE' },
    { p: 'Type a word that:\n• Starts with V\n• Contains "OY"\n• Ends with E\n• Has at least 6 letters', a: 'VOYAGE', acc: ['VOYAGE'], rule: 'MULTI_CONSTRAINTS', arg: { start: 'V', contains: 'OY', ends: 'E', min: 6 }, h: 'e.g. VOYAGE' }
  ]
};

// ==========================================
// 2. MEDIUM PUZZLE BLAST (LEVELS 21 - 40)
// Math, Sequences, Logic, Patterns, Coding (10+ per level)
// ==========================================
const mediumLevelTemplates = {
  // L21-25: Basic math & simple patterns (20s)
  21: [
    { p: 'What is 25 × 4?', a: '100', acc: ['100', 'ONE HUNDRED'], cat: 'MATH', exp: '25 times 4 equals 100.', h: 'Quarter of 400' },
    { p: 'What is 15 × 6?', a: '90', acc: ['90', 'NINETY'], cat: 'MATH', exp: '15 * 6 = 90.', h: '10*6 + 5*6' },
    { p: 'What is 12 × 8?', a: '96', acc: ['96', 'NINETY SIX'], cat: 'MATH', exp: '12 * 8 = 96.', h: 'Just under 100' },
    { p: 'What is 75 + 48?', a: '123', acc: ['123'], cat: 'MATH', exp: '75 + 48 = 123.', h: 'Consecutive digits 1-2-3' },
    { p: 'What is 200 - 67?', a: '133', acc: ['133'], cat: 'MATH', exp: '200 - 67 = 133.', h: 'Two hundreds minus 67' },
    { p: 'What is 144 ÷ 12?', a: '12', acc: ['12', 'TWELVE'], cat: 'MATH', exp: '12 * 12 = 144.', h: 'A dozen' },
    { p: 'What is 9 × 9 + 9?', a: '90', acc: ['90', 'NINETY'], cat: 'MATH', exp: '81 + 9 = 90.', h: '81 + 9' },
    { p: 'What is 50% of 340?', a: '170', acc: ['170'], cat: 'MATH', exp: 'Half of 340 is 170.', h: 'Half of 340' },
    { p: 'What is 25% of 80?', a: '20', acc: ['20', 'TWENTY'], cat: 'MATH', exp: '80 divided by 4 is 20.', h: 'Quarter of 80' },
    { p: 'What is 7 × 8?', a: '56', acc: ['56', 'FIFTY SIX'], cat: 'MATH', exp: '7 * 8 = 56.', h: '5-6-7-8' }
  ],
  22: [
    { p: 'Complete the pattern: 2, 4, 8, 16, ?', a: '32', acc: ['32', 'THIRTY TWO'], cat: 'SEQUENCE', exp: 'Each number doubles: 16 * 2 = 32.', h: 'Double 16' },
    { p: 'Complete the pattern: 3, 6, 12, 24, ?', a: '48', acc: ['48', 'FORTY EIGHT'], cat: 'SEQUENCE', exp: 'Doubling pattern: 24 * 2 = 48.', h: 'Double 24' },
    { p: 'Complete the pattern: 5, 10, 20, 40, ?', a: '80', acc: ['80', 'EIGHTY'], cat: 'SEQUENCE', exp: 'Each doubles: 40 * 2 = 80.', h: 'Double 40' },
    { p: 'Complete the pattern: 1, 3, 9, 27, ?', a: '81', acc: ['81', 'EIGHTY ONE'], cat: 'SEQUENCE', exp: 'Multiply by 3: 27 * 3 = 81.', h: 'Powers of 3' },
    { p: 'Complete the pattern: 100, 90, 80, 70, ?', a: '60', acc: ['60', 'SIXTY'], cat: 'SEQUENCE', exp: 'Decreasing by 10.', h: 'Minus 10' },
    { p: 'Complete the pattern: 4, 9, 14, 19, ?', a: '24', acc: ['24', 'TWENTY FOUR'], cat: 'SEQUENCE', exp: 'Add 5 each step: 19 + 5 = 24.', h: 'Add 5' },
    { p: 'Complete the pattern: 50, 45, 40, 35, ?', a: '30', acc: ['30', 'THIRTY'], cat: 'SEQUENCE', exp: 'Subtract 5 each step.', h: 'Minus 5' },
    { p: 'Complete the pattern: 1, 4, 7, 10, ?', a: '13', acc: ['13', 'THIRTEEN'], cat: 'SEQUENCE', exp: 'Add 3 each step: 10 + 3 = 13.', h: 'Add 3' },
    { p: 'Complete the pattern: 2, 5, 10, 17, ?', a: '26', acc: ['26', 'TWENTY SIX'], cat: 'SEQUENCE', exp: '+3, +5, +7, +9 -> 17 + 9 = 26.', h: 'Diffs increase by 2' },
    { p: 'Complete the pattern: 10, 20, 30, 40, ?', a: '50', acc: ['50', 'FIFTY'], cat: 'SEQUENCE', exp: 'Counting by tens: 50.', h: 'Counting by 10s' }
  ],
  23: [
    { p: 'I am a number. Double me and add 6 to get 20. What am I?', a: '7', acc: ['7', 'SEVEN'], cat: 'LOGIC', exp: '2x + 6 = 20 -> 2x = 14 -> x = 7.', h: '(20 - 6) / 2' },
    { p: 'Triple me and subtract 5 to get 16. What number am I?', a: '7', acc: ['7', 'SEVEN'], cat: 'LOGIC', exp: '3x - 5 = 16 -> 3x = 21 -> x = 7.', h: '(16 + 5) / 3' },
    { p: 'Half of me plus 10 is 25. What number am I?', a: '30', acc: ['30', 'THIRTY'], cat: 'LOGIC', exp: 'x/2 = 15 -> x = 30.', h: '(25 - 10) * 2' },
    { p: 'Subtract 8 from me and double the result to get 24. What am I?', a: '20', acc: ['20', 'TWENTY'], cat: 'LOGIC', exp: '2(x - 8) = 24 -> x - 8 = 12 -> x = 20.', h: '12 + 8' },
    { p: 'A train travels 60 km in 1 hour. How far does it travel in 3 hours?', a: '180', acc: ['180', '180 KM', '180KM'], cat: 'LOGIC', exp: '60 * 3 = 180 km.', h: '60 times 3' },
    { p: 'If 3 apples cost $6, how much do 7 apples cost?', a: '14', acc: ['14', '$14', '14 DOLLARS'], cat: 'LOGIC', exp: '$2 per apple * 7 = $14.', h: 'Each apple is $2' },
    { p: 'If a runner covers 400m in 1 minute, how far in 5 minutes?', a: '2000', acc: ['2000', '2000M', '2 KM', '2KM'], cat: 'LOGIC', exp: '400 * 5 = 2000 meters.', h: '400 * 5' },
    { p: 'A pizza has 8 slices. If 4 friends eat 2 slices each, how many are left?', a: '0', acc: ['0', 'ZERO', 'NONE'], cat: 'LOGIC', exp: '4 * 2 = 8, 8 - 8 = 0.', h: 'All 8 slices eaten' },
    { p: 'If 2 cats catch 2 mice in 2 minutes, how many cats catch 6 mice in 2 minutes?', a: '6', acc: ['6', 'SIX'], cat: 'LOGIC', exp: '1 cat catches 1 mouse in 2 min, so 6 cats catch 6 mice.', h: '1 cat per mouse' },
    { p: 'What number multiplied by itself equals 64?', a: '8', acc: ['8', 'EIGHT', '-8'], cat: 'MATH', exp: '8 * 8 = 64.', h: 'Square root of 64' }
  ],
  24: [
    { p: 'Which number doesn\'t belong: 2, 3, 5, 7, 9, 11?', a: '9', acc: ['9', 'NINE'], cat: 'PATTERN', exp: '9 is composite (3x3); all others are prime numbers.', h: 'Not a prime number' },
    { p: 'Which number is the odd one out: 4, 9, 16, 20, 25?', a: '20', acc: ['20', 'TWENTY'], cat: 'PATTERN', exp: '20 is not a perfect square.', h: 'Not a square number' },
    { p: 'Which number doesn\'t belong: 2, 4, 6, 9, 10, 12?', a: '9', acc: ['9', 'NINE'], cat: 'PATTERN', exp: '9 is odd; all others are even.', h: 'Odd number' },
    { p: 'Which number is the odd one out: 11, 13, 15, 17, 19?', a: '15', acc: ['15', 'FIFTEEN'], cat: 'PATTERN', exp: '15 is divisible by 3 and 5; others are prime.', h: 'Divisible by 3 and 5' },
    { p: 'Which number doesn\'t belong: 10, 20, 35, 40, 50?', a: '35', acc: ['35', 'THIRTY FIVE'], cat: 'PATTERN', exp: '35 does not end in zero.', h: 'Doesn\'t end in 0' },
    { p: 'What is the sum of angles in a triangle (in degrees)?', a: '180', acc: ['180', '180 DEGREES', '180 DEG'], cat: 'MATH', exp: 'The interior angles of a triangle always sum to 180°.', h: 'Straight line degrees' },
    { p: 'How many sides does a hexagon have?', a: '6', acc: ['6', 'SIX'], cat: 'MATH', exp: 'A hexagon has 6 sides.', h: 'Hex = 6' },
    { p: 'How many faces does a standard cube have?', a: '6', acc: ['6', 'SIX'], cat: 'MATH', exp: 'A cube has 6 square faces.', h: 'Sides of a die' },
    { p: 'How many degrees in a right angle?', a: '90', acc: ['90', '90 DEGREES'], cat: 'MATH', exp: 'A right angle is exactly 90°.', h: 'Corner angle' },
    { p: 'What is 2 to the power of 5 (2^5)?', a: '32', acc: ['32', 'THIRTY TWO'], cat: 'MATH', exp: '2 * 2 * 2 * 2 * 2 = 32.', h: '2 * 16' }
  ],
  25: [
    { p: 'If A = 1, B = 2, C = 3... Decode: 3-1-20', a: 'CAT', acc: ['CAT'], cat: 'DECODING', exp: '3 = C, 1 = A, 20 = T -> CAT.', h: 'Letter positions 3, 1, 20' },
    { p: 'If A = 1, B = 2, C = 3... Decode: 4-15-7', a: 'DOG', acc: ['DOG'], cat: 'DECODING', exp: '4 = D, 15 = O, 7 = G -> DOG.', h: 'D-O-G' },
    { p: 'If A = 1, B = 2, C = 3... Decode: 2-1-20', a: 'BAT', acc: ['BAT'], cat: 'DECODING', exp: '2 = B, 1 = A, 20 = T -> BAT.', h: 'B-A-T' },
    { p: 'If A = 1, B = 2, C = 3... Decode: 19-21-14', a: 'SUN', acc: ['SUN'], cat: 'DECODING', exp: '19 = S, 21 = U, 14 = N -> SUN.', h: 'S-U-N' },
    { p: 'If A = 1, B = 2, C = 3... Decode: 18-5-4', a: 'RED', acc: ['RED'], cat: 'DECODING', exp: '18 = R, 5 = E, 4 = D -> RED.', h: 'R-E-D' },
    { p: 'If A = 1, B = 2, C = 3... Decode: 2-12-21-5', a: 'BLUE', acc: ['BLUE'], cat: 'DECODING', exp: '2=B, 12=L, 21=U, 5=E -> BLUE.', h: 'Color' },
    { p: 'If A = 1, B = 2, C = 3... Decode: 6-9-18-5', a: 'FIRE', acc: ['FIRE'], cat: 'DECODING', exp: '6=F, 9=I, 18=R, 5=E -> FIRE.', h: 'Hot element' },
    { p: 'If A = 1, B = 2, C = 3... Decode: 7-15-12-4', a: 'GOLD', acc: ['GOLD'], cat: 'DECODING', exp: '7=G, 15=O, 12=L, 4=D -> GOLD.', h: 'Precious metal' },
    { p: 'If A = 1, B = 2, C = 3... Decode: 19-20-1-18', a: 'STAR', acc: ['STAR'], cat: 'DECODING', exp: '19=S, 20=T, 1=A, 18=R -> STAR.', h: 'Shines at night' },
    { p: 'If A = 1, B = 2, C = 3... Decode: 13-15-15-14', a: 'MOON', acc: ['MOON'], cat: 'DECODING', exp: '13=M, 15=O, 15=O, 14=N -> MOON.', h: 'Earth\'s satellite' }
  ],

  // L26-30: Sequences and logic deduction (18s)
  26: [
    { p: 'Fibonacci: 1, 1, 2, 3, 5, 8, ?', a: '13', acc: ['13', 'THIRTEEN'], cat: 'SEQUENCE', exp: '5 + 8 = 13.', h: 'Sum of previous two' },
    { p: 'Fibonacci: 2, 3, 5, 8, 13, ?', a: '21', acc: ['21', 'TWENTY ONE'], cat: 'SEQUENCE', exp: '8 + 13 = 21.', h: '8 + 13' },
    { p: 'Square numbers: 1, 4, 9, 16, 25, ?', a: '36', acc: ['36', 'THIRTY SIX'], cat: 'SEQUENCE', exp: '6 squared is 36.', h: '6 x 6' },
    { p: 'Square numbers: 4, 9, 16, 25, 36, ?', a: '49', acc: ['49', 'FORTY NINE'], cat: 'SEQUENCE', exp: '7 squared is 49.', h: '7 x 7' },
    { p: 'Cube sequence: 1, 8, 27, 64, ?', a: '125', acc: ['125', 'ONE HUNDRED TWENTY FIVE'], cat: 'SEQUENCE', exp: '5 cubed (5^3) = 125.', h: '5 x 5 x 5' },
    { p: 'Pattern: 2, 6, 18, 54, ?', a: '162', acc: ['162'], cat: 'SEQUENCE', exp: 'Multiply by 3: 54 * 3 = 162.', h: '54 * 3' },
    { p: 'Pattern: 1000, 500, 250, 125, ?', a: '62.5', acc: ['62.5', '125/2'], cat: 'SEQUENCE', exp: 'Halving each time: 125 / 2 = 62.5.', h: 'Half of 125' },
    { p: 'Sequence: 1, 2, 4, 7, 11, ?', a: '16', acc: ['16', 'SIXTEEN'], cat: 'SEQUENCE', exp: '+1, +2, +3, +4, +5 -> 11 + 5 = 16.', h: 'Differences increase by 1' },
    { p: 'Sequence: 30, 28, 25, 21, ?', a: '16', acc: ['16', 'SIXTEEN'], cat: 'SEQUENCE', exp: '-2, -3, -4, -5 -> 21 - 5 = 16.', h: 'Subtract 2, 3, 4, 5' },
    { p: 'Sequence: 0, 3, 8, 15, 24, ?', a: '35', acc: ['35', 'THIRTY FIVE'], cat: 'SEQUENCE', exp: 'n^2 - 1: 6^2 - 1 = 35.', h: 'Squares minus 1' }
  ],
  27: [
    { p: 'If all A are B, and all B are C, what can be concluded about A?', a: 'A is C', acc: ['A IS C', 'ALL A ARE C', 'A=C', 'A ARE C'], cat: 'LOGIC', exp: 'Transitive property: All A are C.', h: 'All A are...' },
    { p: 'If Tom is taller than Bob, and Bob is taller than Jim, who is shortest?', a: 'Jim', acc: ['JIM'], cat: 'LOGIC', exp: 'Tom > Bob > Jim, so Jim is shortest.', h: 'Not Tom or Bob' },
    { p: 'If Red is heavier than Blue, and Green is heavier than Red, which is heaviest?', a: 'Green', acc: ['GREEN'], cat: 'LOGIC', exp: 'Green > Red > Blue.', h: 'The color of grass' },
    { p: 'A clock shows 3:00. What is the angle between the hour and minute hand in degrees?', a: '90', acc: ['90', '90 DEGREES'], cat: 'LOGIC', exp: 'At 3:00 hands form a perpendicular 90° angle.', h: 'Right angle' },
    { p: 'A clock shows 6:00. What is the angle between hands in degrees?', a: '180', acc: ['180', '180 DEGREES'], cat: 'LOGIC', exp: 'Hands point in exact opposite directions (180°).', h: 'Straight angle' },
    { p: 'If today is Saturday, what day will it be in 14 days?', a: 'Saturday', acc: ['SATURDAY'], cat: 'LOGIC', exp: '14 days is exactly 2 weeks.', h: 'Exact same day' },
    { p: 'If tomorrow is Tuesday, what day was yesterday?', a: 'Sunday', acc: ['SUNDAY'], cat: 'LOGIC', exp: 'Tomorrow is Tue -> Today is Mon -> Yesterday was Sun.', h: 'Day before Monday' },
    { p: 'If yesterday was Friday, what day is the day after tomorrow?', a: 'Monday', acc: ['MONDAY'], cat: 'LOGIC', exp: 'Yesterday Fri -> Today Sat -> Tomorrow Sun -> Day after Mon.', h: 'Start of work week' },
    { p: 'How many seconds are in 5 minutes?', a: '300', acc: ['300', '300 SECONDS'], cat: 'MATH', exp: '5 * 60 = 300.', h: '5 * 60' },
    { p: 'How many minutes are in 3.5 hours?', a: '210', acc: ['210', '210 MINUTES'], cat: 'MATH', exp: '3 * 60 + 30 = 210.', h: '180 + 30' }
  ],
  28: [
    { p: 'If 5 machines make 5 widgets in 5 minutes, how many minutes do 100 machines take to make 100 widgets?', a: '5', acc: ['5', '5 MINUTES'], cat: 'LOGIC', exp: 'Each machine takes 5 minutes to make 1 widget.', h: 'Same rate' },
    { p: 'A bat and ball cost $1.10. The bat costs $1.00 more than the ball. How much does the ball cost in cents?', a: '5', acc: ['5', '5 CENTS', '0.05', '$0.05'], cat: 'LOGIC', exp: 'Bat=$1.05, Ball=$0.05. $1.05 + $0.05 = $1.10.', h: 'Not 10 cents!' },
    { p: 'In a lake, a patch of lily pads doubles every day. If it takes 48 days to cover the lake, how many days to cover half?', a: '47', acc: ['47', '47 DAYS'], cat: 'LOGIC', exp: 'One day before day 48 it was half covered.', h: 'One day before full' },
    { p: 'You have 10 pairs of black socks and 10 pairs of white socks in a dark drawer. What is the minimum socks you must pull to guarantee a matching pair?', a: '3', acc: ['3', 'THREE'], cat: 'LOGIC', exp: 'Worst case is 1 black and 1 white; the 3rd must match one.', h: 'Pigeonhole principle' },
    { p: 'How many 9s are there between the numbers 1 and 100?', a: '20', acc: ['20', 'TWENTY'], cat: 'LOGIC', exp: '9, 19, 29, 39, 49, 59, 69, 79, 89 (9) + 90-99 (11) = 20.', h: 'Count units and tens' },
    { p: 'What is 15% of 60?', a: '9', acc: ['9', 'NINE'], cat: 'MATH', exp: '0.15 * 60 = 9.', h: '10% is 6, 5% is 3' },
    { p: 'What is 20% of 150?', a: '30', acc: ['30', 'THIRTY'], cat: 'MATH', exp: '150 / 5 = 30.', h: 'One fifth of 150' },
    { p: 'What is the next prime number after 19?', a: '23', acc: ['23', 'TWENTY THREE'], cat: 'MATH', exp: '20, 21, 22 are composite; 23 is prime.', h: 'Between 20 and 25' },
    { p: 'What is the smallest prime number?', a: '2', acc: ['2', 'TWO'], cat: 'MATH', exp: '2 is the only even prime and the smallest prime.', h: 'The only even prime' },
    { p: 'What is the sum of numbers from 1 to 10?', a: '55', acc: ['55', 'FIFTY FIVE'], cat: 'MATH', exp: '(10 * 11) / 2 = 55.', h: '1+2+...+10' }
  ],
  29: [
    { p: 'If 2 + 2 = 8, 3 + 3 = 18, 4 + 4 = 32, what is 5 + 5?', a: '50', acc: ['50', 'FIFTY'], cat: 'PATTERN', exp: '(n + n) * n -> (5 + 5) * 5 = 50.', h: 'Double then multiply by n' },
    { p: 'If 1 = 3, 2 = 3, 3 = 5, 4 = 4, 5 = 4, what is 6?', a: '3', acc: ['3', 'THREE'], cat: 'PATTERN', exp: 'Number of letters in the word "SIX" is 3.', h: 'Letters in the English word' },
    { p: 'If 1 = 5, 2 = 25, 3 = 125, 4 = 625, then 5 = ?', a: '1', acc: ['1', 'ONE', '3125'], cat: 'PATTERN', exp: 'If 1 = 5, then 5 = 1! (or 5^5 = 3125).', h: 'Look back at the first equation' },
    { p: 'If 12 × 12 = 9, 23 × 23 = 16, what is 34 × 34?', a: '49', acc: ['49'], cat: 'PATTERN', exp: '(3+4) * (3+4) = 7 * 7 = 49.', h: 'Sum of digits squared' },
    { p: 'What letter comes next: O, T, T, F, F, S, S, E, ?', a: 'N', acc: ['N', 'NINE'], cat: 'PATTERN', exp: 'First letters of One, Two, Three, Four... Nine -> N.', h: 'Count from 1 to 9' },
    { p: 'What letter comes next: M, T, W, T, F, ?', a: 'S', acc: ['S', 'SATURDAY'], cat: 'PATTERN', exp: 'Days of week: Mon, Tue, Wed, Thu, Fri, Sat -> S.', h: 'Days of the week' },
    { p: 'What letter comes next: J, F, M, A, M, J, ?', a: 'J', acc: ['J', 'JULY'], cat: 'PATTERN', exp: 'Months: Jan, Feb, Mar, Apr, May, Jun, Jul -> J.', h: 'Months of the year' },
    { p: 'What is binary 101 in decimal?', a: '5', acc: ['5', 'FIVE'], cat: 'DECODING', exp: '4 + 0 + 1 = 5.', h: '4 + 1' },
    { p: 'What is binary 111 in decimal?', a: '7', acc: ['7', 'SEVEN'], cat: 'DECODING', exp: '4 + 2 + 1 = 7.', h: '4 + 2 + 1' },
    { p: 'What is binary 1010 in decimal?', a: '10', acc: ['10', 'TEN'], cat: 'DECODING', exp: '8 + 2 = 10.', h: '8 + 2' }
  ],
  30: [
    { p: 'Solve: 7 + 7 ÷ 7 + 7 × 7 - 7', a: '50', acc: ['50', 'FIFTY'], cat: 'MATH', exp: 'Order of operations: 7 + 1 + 49 - 7 = 50.', h: 'PEMDAS / BODMAS' },
    { p: 'Solve: (8 × 8) - (7 × 7)', a: '15', acc: ['15', 'FIFTEEN'], cat: 'MATH', exp: '64 - 49 = 15.', h: '64 - 49' },
    { p: 'Solve: 100 - (25 × 3)', a: '25', acc: ['25', 'TWENTY FIVE'], cat: 'MATH', exp: '100 - 75 = 25.', h: '100 - 75' },
    { p: 'Solve: (15 + 35) ÷ (25 ÷ 5)', a: '10', acc: ['10', 'TEN'], cat: 'MATH', exp: '50 ÷ 5 = 10.', h: '50 ÷ 5' },
    { p: 'What is 3 squared plus 4 squared?', a: '25', acc: ['25', 'TWENTY FIVE'], cat: 'MATH', exp: '9 + 16 = 25.', h: '9 + 16' },
    { p: 'What is 10 cubed (10^3)?', a: '1000', acc: ['1000', 'ONE THOUSAND'], cat: 'MATH', exp: '10 * 10 * 10 = 1000.', h: 'One followed by 3 zeros' },
    { p: 'A car travels at 80 km/h for 2.5 hours. Total km?', a: '200', acc: ['200', '200 KM', '200KM'], cat: 'MATH', exp: '80 * 2.5 = 200 km.', h: '80 * 2.5' },
    { p: 'If x + y = 20 and x - y = 4, what is x?', a: '12', acc: ['12', 'TWELVE'], cat: 'LOGIC', exp: '2x = 24 -> x = 12.', h: '(20 + 4) / 2' },
    { p: 'If 2a = 18, what is 3a?', a: '27', acc: ['27', 'TWENTY SEVEN'], cat: 'MATH', exp: 'a = 9, 3 * 9 = 27.', h: '3 * 9' },
    { p: 'What is 40% of 250?', a: '100', acc: ['100', 'ONE HUNDRED'], cat: 'MATH', exp: '0.4 * 250 = 100.', h: '4 * 25' }
  ],

  // L31-35: Multi-step puzzles & mini codes (17s)
  31: [
    { p: 'Letter values: A=1, B=2, C=3. If CAT = 24 (3+1+20), what is DOG (4+15+7)?', a: '26', acc: ['26', 'TWENTY SIX'], cat: 'DECODING', exp: '4 + 15 + 7 = 26.', h: '4 + 15 + 7' },
    { p: 'If RED = 27 (18+5+4), what is BLUE (2+12+21+5)?', a: '40', acc: ['40', 'FORTY'], cat: 'DECODING', exp: '2 + 12 + 21 + 5 = 40.', h: 'Sum the letter numbers' },
    { p: 'If SUN = 54 (19+21+14), what is MOON (13+15+15+14)?', a: '57', acc: ['57', 'FIFTY SEVEN'], cat: 'DECODING', exp: '13 + 15 + 15 + 14 = 57.', h: '13 + 30 + 14' },
    { p: 'Caesar Cipher +1 (A->B, B->C): Decode "IBM"', a: 'HAL', acc: ['HAL'], cat: 'DECODING', exp: 'Shift backward 1: I->H, B->A, M->L = HAL.', h: 'Shift each letter backward 1' },
    { p: 'Caesar Cipher +1: Decode "CPNC"', a: 'BOMB', acc: ['BOMB'], cat: 'DECODING', exp: 'C->B, P->O, N->M, C->B = BOMB.', h: 'Explosive device' },
    { p: 'Reverse cipher: If Z=A, Y=B... Decode "TLM"', a: 'GNN', acc: ['GNN', 'WAR'], cat: 'DECODING', exp: 'T->G, L->O, M->N = GON or standard substitution.', h: 'Opposite end of alphabet' },
    { p: 'If BOOK = 43, PAGE = 34, how many letters in CHAPTER?', a: '7', acc: ['7', 'SEVEN'], cat: 'LOGIC', exp: 'C-H-A-P-T-E-R has 7 letters.', h: 'Count the letters' },
    { p: 'Three bells toll every 2, 3, and 4 minutes. In how many minutes will they toll together?', a: '12', acc: ['12', '12 MINUTES'], cat: 'MATH', exp: 'LCM of 2, 3, 4 is 12.', h: 'Least common multiple' },
    { p: 'Two lights flash every 6 and 8 seconds. In how many seconds do they flash together?', a: '24', acc: ['24', '24 SECONDS'], cat: 'MATH', exp: 'LCM of 6 and 8 is 24.', h: 'LCM of 6 and 8' },
    { p: 'What is the average of 10, 20, 30, and 40?', a: '25', acc: ['25', 'TWENTY FIVE'], cat: 'MATH', exp: '100 ÷ 4 = 25.', h: 'Sum is 100' }
  ],
  32: [
    { p: 'A farmer has 17 sheep. All but 9 die. How many sheep are left alive?', a: '9', acc: ['9', 'NINE'], cat: 'LOGIC', exp: '"All but 9 die" means exactly 9 survived!', h: 'Read carefully: "All BUT 9"' },
    { p: 'How many two-cent stamps are in a dozen?', a: '12', acc: ['12', 'TWELVE'], cat: 'LOGIC', exp: 'A dozen is always 12 regardless of price.', h: 'A dozen is always...' },
    { p: 'If you take 2 apples from 3 apples, how many apples do you have?', a: '2', acc: ['2', 'TWO'], cat: 'LOGIC', exp: 'You took 2, so you have 2.', h: 'You took them!' },
    { p: 'A man builds a house with all four sides facing south. A bear walks past. What color is the bear?', a: 'White', acc: ['WHITE'], cat: 'LOGIC', exp: 'The house is at the North Pole; polar bears are white.', h: 'North Pole resident' },
    { p: 'Divide 30 by 1/2 and add 10. What do you get?', a: '70', acc: ['70', 'SEVENTY'], cat: 'MATH', exp: '30 ÷ 0.5 = 60; 60 + 10 = 70.', h: 'Dividing by half doubles it' },
    { p: 'A rope ladder hangs over a ship. Rungs are 1 foot apart. Water rises 4 feet. How many rungs are submerged?', a: '0', acc: ['0', 'NONE', 'ZERO'], cat: 'LOGIC', exp: 'The ship and ladder float on the water!', h: 'The ship floats' },
    { p: 'If 3 cats kill 3 rats in 3 minutes, how many cats are needed to kill 100 rats in 100 minutes?', a: '3', acc: ['3', 'THREE'], cat: 'LOGIC', exp: '3 cats kill 1 rat per minute.', h: 'Same rate of cats' },
    { p: 'What is the product of all numbers on a telephone keypad?', a: '0', acc: ['0', 'ZERO'], cat: 'MATH', exp: 'Zero is on the keypad; anything times zero is 0.', h: 'There is a zero' },
    { p: 'How many birthdays does an average human have?', a: '1', acc: ['1', 'ONE'], cat: 'LOGIC', exp: 'You are only born once; the rest are anniversaries.', h: 'You are only born once' },
    { p: 'A doctor gives you 3 pills to take one every half hour. How many minutes do they last?', a: '60', acc: ['60', '60 MINUTES', '1 HOUR'], cat: 'LOGIC', exp: 'Take at 0 min, 30 min, and 60 min = 60 minutes.', h: '0, 30, and 60 minutes' }
  ],
  33: [
    { p: 'Sequence: 1, 4, 27, 256, ?', a: '3125', acc: ['3125'], cat: 'SEQUENCE', exp: '1^1, 2^2, 3^3, 4^4, 5^5 = 3125.', h: '5 to the 5th power' },
    { p: 'Sequence: 2, 3, 5, 8, 12, 17, ?', a: '23', acc: ['23', 'TWENTY THREE'], cat: 'SEQUENCE', exp: '+1, +2, +3, +4, +5, +6 -> 17 + 6 = 23.', h: '+6 next' },
    { p: 'Sequence: 3, 5, 9, 17, 33, ?', a: '65', acc: ['65', 'SIXTY FIVE'], cat: 'SEQUENCE', exp: 'Double and minus 1: 33 * 2 - 1 = 65.', h: 'Double minus 1' },
    { p: 'Sequence: 1, 2, 6, 24, 120, ?', a: '720', acc: ['720'], cat: 'SEQUENCE', exp: 'Factorials: 6! = 720.', h: '120 * 6' },
    { p: 'What is 5! (5 factorial: 5×4×3×2×1)?', a: '120', acc: ['120', 'ONE HUNDRED TWENTY'], cat: 'MATH', exp: '5 * 4 * 3 * 2 * 1 = 120.', h: 'Product 1 to 5' },
    { p: 'What is 4! (4 factorial)?', a: '24', acc: ['24', 'TWENTY FOUR'], cat: 'MATH', exp: '4 * 3 * 2 * 1 = 24.', h: '4 * 6' },
    { p: 'What is 3 to the power of 4 (3^4)?', a: '81', acc: ['81', 'EIGHTY ONE'], cat: 'MATH', exp: '3 * 3 * 3 * 3 = 81.', h: '9 * 9' },
    { p: 'Solve: √144 + √81', a: '21', acc: ['21', 'TWENTY ONE'], cat: 'MATH', exp: '12 + 9 = 21.', h: '12 + 9' },
    { p: 'Solve: √64 + √49', a: '15', acc: ['15', 'FIFTEEN'], cat: 'MATH', exp: '8 + 7 = 15.', h: '8 + 7' },
    { p: 'Solve: √100 - √25', a: '5', acc: ['5', 'FIVE'], cat: 'MATH', exp: '10 - 5 = 5.', h: '10 - 5' }
  ],
  34: [
    { p: 'Two coins equal 30 cents, and one is not a nickel. What are the two coins?', a: 'Quarter and nickel', acc: ['QUARTER AND NICKEL', 'NICKEL AND QUARTER', '25 AND 5', 'A QUARTER AND A NICKEL'], cat: 'LOGIC', exp: 'One is not a nickel (it\'s a quarter), but the OTHER one is a nickel!', h: 'One is 25 cents, one is 5' },
    { p: 'A bat flies 30 miles in 2 hours against a wind of 5 mph. How fast does it fly with no wind?', a: '20', acc: ['20', '20 MPH'], cat: 'MATH', exp: 'Ground speed = 15 mph. Air speed = 15 + 5 = 20 mph.', h: '15 + 5' },
    { p: 'If a clock strikes 6 times in 5 seconds, how many seconds does it take to strike 12 times?', a: '11', acc: ['11', '11 SECONDS'], cat: 'LOGIC', exp: '5 intervals take 5 seconds (1s per interval); 11 intervals take 11s.', h: 'Count the intervals' },
    { p: 'If 6 people each shake hands with everyone once, how many handshakes happen?', a: '15', acc: ['15', 'FIFTEEN'], cat: 'MATH', exp: '(6 * 5) / 2 = 15.', h: '5+4+3+2+1' },
    { p: 'If 4 people shake hands with each other once, how many handshakes total?', a: '6', acc: ['6', 'SIX'], cat: 'MATH', exp: '(4 * 3) / 2 = 6.', h: '3+2+1' },
    { p: 'What is the sum of angles in a quadrilateral (4-sided shape)?', a: '360', acc: ['360', '360 DEGREES'], cat: 'MATH', exp: 'Two triangles: 2 * 180° = 360°.', h: 'Double 180' },
    { p: 'How many degrees in a circle?', a: '360', acc: ['360', '360 DEGREES'], cat: 'MATH', exp: 'A full turn is 360°.', h: 'Full circle' },
    { p: 'How many edges does a cube have?', a: '12', acc: ['12', 'TWELVE'], cat: 'MATH', exp: 'A cube has 12 straight edges.', h: '4 top + 4 bottom + 4 vertical' },
    { p: 'How many vertices (corners) does a cube have?', a: '8', acc: ['8', 'EIGHT'], cat: 'MATH', exp: 'A cube has 8 corners.', h: '4 on top, 4 on bottom' },
    { p: 'What is 11 squared (11^2)?', a: '121', acc: ['121'], cat: 'MATH', exp: '11 * 11 = 121.', h: 'Palindrome number' }
  ],
  35: [
    { p: 'Find the missing number: 2 -> 8, 3 -> 27, 4 -> 64, 5 -> ?', a: '125', acc: ['125'], cat: 'PATTERN', exp: 'Cubes of the numbers: 5^3 = 125.', h: '5 cubed' },
    { p: 'Find the missing number: 2 -> 4, 3 -> 9, 4 -> 16, 5 -> ?', a: '25', acc: ['25', 'TWENTY FIVE'], cat: 'PATTERN', exp: 'Squares: 5^2 = 25.', h: '5 squared' },
    { p: 'Find missing: 10 -> 100, 20 -> 400, 30 -> ?', a: '900', acc: ['900'], cat: 'PATTERN', exp: '30 * 30 = 900.', h: '30 squared' },
    { p: 'Find missing: 1 -> 2, 2 -> 6, 3 -> 12, 4 -> 20, 5 -> ?', a: '30', acc: ['30', 'THIRTY'], cat: 'PATTERN', exp: 'n * (n + 1) -> 5 * 6 = 30.', h: '5 * 6' },
    { p: 'Find missing: 2 -> 6, 3 -> 12, 4 -> 20, 5 -> 30, 6 -> ?', a: '42', acc: ['42', 'FORTY TWO'], cat: 'PATTERN', exp: '6 * 7 = 42.', h: '6 * 7' },
    { p: 'What is the sum of prime numbers between 1 and 10?', a: '17', acc: ['17', 'SEVENTEEN'], cat: 'MATH', exp: 'Primes: 2 + 3 + 5 + 7 = 17.', h: '2 + 3 + 5 + 7' },
    { p: 'What is the only even prime number?', a: '2', acc: ['2', 'TWO'], cat: 'MATH', exp: '2 is the only even prime.', h: 'Smallest prime' },
    { p: 'What is 13 squared (13^2)?', a: '169', acc: ['169'], cat: 'MATH', exp: '13 * 13 = 169.', h: 'Reverse of 14^2 (196)' },
    { p: 'What is 14 squared (14^2)?', a: '196', acc: ['196'], cat: 'MATH', exp: '14 * 14 = 196.', h: 'Nearly 200' },
    { p: 'What is 15 squared (15^2)?', a: '225', acc: ['225'], cat: 'MATH', exp: '15 * 15 = 225.', h: 'Quarter of 900' }
  ],

  // L36-40: Harder reasoning under time pressure (15s)
  36: [
    { p: 'Sequence: 2, 6, 12, 20, 30, ?', a: '42', acc: ['42', 'FORTY TWO'], cat: 'SEQUENCE', exp: '+4, +6, +8, +10, +12 -> 30 + 12 = 42.', h: 'Add 12' },
    { p: 'Sequence: 7, 14, 28, 56, ?', a: '112', acc: ['112'], cat: 'SEQUENCE', exp: 'Doubling: 56 * 2 = 112.', h: 'Double 56' },
    { p: 'Sequence: 81, 27, 9, 3, ?', a: '1', acc: ['1', 'ONE'], cat: 'SEQUENCE', exp: 'Divide by 3: 3 / 3 = 1.', h: 'Divide by 3' },
    { p: 'Sequence: 64, 32, 16, 8, 4, ?', a: '2', acc: ['2', 'TWO'], cat: 'SEQUENCE', exp: 'Halving each time: 4 / 2 = 2.', h: 'Half of 4' },
    { p: 'Solve: (12 × 12) - (11 × 11)', a: '23', acc: ['23', 'TWENTY THREE'], cat: 'MATH', exp: '144 - 121 = 23.', h: '12 + 11' },
    { p: 'Solve: (10 × 10) - (9 × 9)', a: '19', acc: ['19', 'NINETEEN'], cat: 'MATH', exp: '100 - 81 = 19.', h: '10 + 9' },
    { p: 'Solve: (20 × 20) - (19 × 19)', a: '39', acc: ['39', 'THIRTY NINE'], cat: 'MATH', exp: '400 - 361 = 39.', h: '20 + 19' },
    { p: 'What is 2^6 (2 to the 6th power)?', a: '64', acc: ['64', 'SIXTY FOUR'], cat: 'MATH', exp: '2 * 32 = 64.', h: 'Double 32' },
    { p: 'What is 2^7 (2 to the 7th power)?', a: '128', acc: ['128', 'ONE HUNDRED TWENTY EIGHT'], cat: 'MATH', exp: '2 * 64 = 128.', h: 'Double 64' },
    { p: 'What is 2^8 (2 to the 8th power)?', a: '256', acc: ['256'], cat: 'MATH', exp: '2 * 128 = 256.', h: 'Bytes in a byte' }
  ],
  37: [
    { p: 'A bat and ball cost $110. The bat costs $100 more than the ball. How much is the ball in dollars?', a: '5', acc: ['5', '$5', '5 DOLLARS'], cat: 'LOGIC', exp: 'Bat=$105, Ball=$5. 105 - 5 = 100.', h: 'Not $10!' },
    { p: 'If 8 workers build 8 chairs in 8 hours, how many hours for 1 worker to build 1 chair?', a: '8', acc: ['8', '8 HOURS'], cat: 'LOGIC', exp: 'Each worker makes 1 chair in 8 hours.', h: 'Same duration' },
    { p: 'A car leaves at 60 mph, another at 40 mph opposite direction. Distance apart after 2 hours?', a: '200', acc: ['200', '200 MILES'], cat: 'MATH', exp: '(60 + 40) * 2 = 200 miles.', h: '100 * 2' },
    { p: 'If 10 men take 10 days to dig a trench, how many days for 5 men?', a: '20', acc: ['20', '20 DAYS'], cat: 'LOGIC', exp: 'Half as many men take twice as long: 10 * 2 = 20 days.', h: 'Twice as long' },
    { p: 'What is 75% of 160?', a: '120', acc: ['120', 'ONE HUNDRED TWENTY'], cat: 'MATH', exp: '3/4 * 160 = 120.', h: '3 * 40' },
    { p: 'What is 12.5% of 80?', a: '10', acc: ['10', 'TEN'], cat: 'MATH', exp: '12.5% is 1/8. 80 / 8 = 10.', h: 'One eighth of 80' },
    { p: 'What is the square root of 256?', a: '16', acc: ['16', 'SIXTEEN'], cat: 'MATH', exp: '16 * 16 = 256.', h: '4 squared' },
    { p: 'What is the square root of 225?', a: '15', acc: ['15', 'FIFTEEN'], cat: 'MATH', exp: '15 * 15 = 225.', h: 'Between 14 and 16' },
    { p: 'What is the square root of 196?', a: '14', acc: ['14', 'FOURTEEN'], cat: 'MATH', exp: '14 * 14 = 196.', h: 'Between 13 and 15' },
    { p: 'What is the square root of 289?', a: '17', acc: ['17', 'SEVENTEEN'], cat: 'MATH', exp: '17 * 17 = 289.', h: 'Prime square root' }
  ],
  38: [
    { p: 'What is hexadecimal FF in decimal?', a: '255', acc: ['255'], cat: 'DECODING', exp: '15 * 16 + 15 = 255.', h: 'Max 8-bit value' },
    { p: 'What is hexadecimal 10 in decimal?', a: '16', acc: ['16', 'SIXTEEN'], cat: 'DECODING', exp: '1 * 16 + 0 = 16.', h: 'Base 16 value' },
    { p: 'What is hexadecimal A in decimal?', a: '10', acc: ['10', 'TEN'], cat: 'DECODING', exp: 'A = 10 in hex.', h: 'Two digits in decimal' },
    { p: 'What is hexadecimal F in decimal?', a: '15', acc: ['15', 'FIFTEEN'], cat: 'DECODING', exp: 'F = 15 in hex.', h: 'Highest single hex digit' },
    { p: 'Binary 1111 in decimal is?', a: '15', acc: ['15', 'FIFTEEN'], cat: 'DECODING', exp: '8 + 4 + 2 + 1 = 15.', h: '8 + 4 + 2 + 1' },
    { p: 'Binary 10000 in decimal is?', a: '16', acc: ['16', 'SIXTEEN'], cat: 'DECODING', exp: '2^4 = 16.', h: '2 to the power 4' },
    { p: 'Solve: 5 + 5 × 5 - 5 ÷ 5', a: '29', acc: ['29', 'TWENTY NINE'], cat: 'MATH', exp: '5 + 25 - 1 = 29.', h: 'Multiply and divide first' },
    { p: 'Solve: 6 ÷ 2 × (1 + 2)', a: '9', acc: ['9', 'NINE'], cat: 'MATH', exp: '6 ÷ 2 * 3 = 3 * 3 = 9.', h: 'Left to right: 3 * 3' },
    { p: 'Solve: 8 ÷ 2 × (2 + 2)', a: '16', acc: ['16', 'SIXTEEN'], cat: 'MATH', exp: '4 * 4 = 16.', h: '4 * 4' },
    { p: 'Solve: 20 - 2 × 5 + 3', a: '13', acc: ['13', 'THIRTEEN'], cat: 'MATH', exp: '20 - 10 + 3 = 13.', h: '20 - 10 + 3' }
  ],
  39: [
    { p: 'In a group of 30 students, 18 play soccer, 15 play basketball, and 8 play both. How many play neither?', a: '5', acc: ['5', 'FIVE'], cat: 'LOGIC', exp: '18 + 15 - 8 = 25 play at least one. 30 - 25 = 5 play neither.', h: '30 - 25' },
    { p: 'If 4 coins are tossed, how many possible outcomes are there?', a: '16', acc: ['16', 'SIXTEEN'], cat: 'MATH', exp: '2^4 = 16 outcomes.', h: '2 * 2 * 2 * 2' },
    { p: 'If 3 coins are tossed, how many possible outcomes are there?', a: '8', acc: ['8', 'EIGHT'], cat: 'MATH', exp: '2^3 = 8.', h: '2 * 2 * 2' },
    { p: 'What is the probability of rolling a 6 on a standard 6-sided die?', a: '1/6', acc: ['1/6', 'ONE IN SIX', '1 IN 6'], cat: 'MATH', exp: '1 favorable outcome out of 6 sides.', h: 'One out of six' },
    { p: 'A bag has 3 red and 7 blue balls. Probability of picking red?', a: '3/10', acc: ['3/10', '30%', '0.3', '3 IN 10'], cat: 'MATH', exp: '3 / (3 + 7) = 3/10 or 30%.', h: '3 out of 10' },
    { p: 'What is 17 × 17?', a: '289', acc: ['289'], cat: 'MATH', exp: '17 * 17 = 289.', h: 'Square of 17' },
    { p: 'What is 18 × 18?', a: '324', acc: ['324'], cat: 'MATH', exp: '18 * 18 = 324.', h: 'Square of 18' },
    { p: 'What is 19 × 19?', a: '361', acc: ['361'], cat: 'MATH', exp: '19 * 19 = 361.', h: 'Square of 19' },
    { p: 'What is 21 × 21?', a: '441', acc: ['441'], cat: 'MATH', exp: '21 * 21 = 441.', h: 'Square of 21' },
    { p: 'What is 25 × 25?', a: '625', acc: ['625', 'SIX HUNDRED TWENTY FIVE'], cat: 'MATH', exp: '25 * 25 = 625.', h: 'Square of 25' }
  ],
  40: [
    { p: 'Grand Puzzle: What is (50% of 80) + (25% of 120)?', a: '70', acc: ['70', 'SEVENTY'], cat: 'MATH', exp: '40 + 30 = 70.', h: '40 + 30' },
    { p: 'Grand Puzzle: Double 17, add 16, then divide by 2. What is the result?', a: '25', acc: ['25', 'TWENTY FIVE'], cat: 'MATH', exp: '(34 + 16) / 2 = 50 / 2 = 25.', h: '17 + 8' },
    { p: 'Grand Puzzle: A number multiplied by 4 equals 48. What is the number cubed?', a: '1728', acc: ['1728'], cat: 'MATH', exp: 'x = 12, 12^3 = 1728.', h: '12 cubed' },
    { p: 'Grand Puzzle: What is 2^10 (2 to the 10th power)?', a: '1024', acc: ['1024', 'ONE THOUSAND TWENTY FOUR'], cat: 'MATH', exp: '1024 bytes in a kilobyte.', h: 'Bytes in a Kilobyte' },
    { p: 'Grand Puzzle: In a Roman numeral clock, what represents 9?', a: 'IX', acc: ['IX'], cat: 'DECODING', exp: 'IX = 10 - 1 = 9.', h: 'Roman numeral for 9' },
    { p: 'Grand Puzzle: Roman numeral XIV in standard decimal numbers is?', a: '14', acc: ['14', 'FOURTEEN'], cat: 'DECODING', exp: '10 + 4 = 14.', h: '10 + 4' },
    { p: 'Grand Puzzle: Roman numeral XIX in decimal numbers is?', a: '19', acc: ['19', 'NINETEEN'], cat: 'DECODING', exp: '10 + 9 = 19.', h: '10 + 9' },
    { p: 'Grand Puzzle: Roman numeral L represents what number?', a: '50', acc: ['50', 'FIFTY'], cat: 'DECODING', exp: 'L = 50.', h: 'Half a century' },
    { p: 'Grand Puzzle: Roman numeral C represents what number?', a: '100', acc: ['100', 'ONE HUNDRED'], cat: 'DECODING', exp: 'C = 100 (Century).', h: 'Century' },
    { p: 'Grand Puzzle: Roman numeral M represents what number?', a: '1000', acc: ['1000', 'ONE THOUSAND'], cat: 'DECODING', exp: 'M = 1000 (Millennium).', h: 'Millennium' }
  ]
};

// ==========================================
// 3. HARD RIDDLE / TRICK MODE (LEVELS 41 - 60)
// Riddles, Trick Questions, Lateral Thinking (10+ per level)
// Timer: Fixed 30 seconds
// ==========================================
const hardLevelTemplates = {
  41: [
    { p: 'The more you take, the more you leave behind. What am I?', a: 'Footsteps', acc: ['FOOTSTEPS', 'FOOT STEPS', 'STEPS', 'FOOTPRINTS', 'FOOT PRINTS'], cat: 'RIDDLE', exp: 'Every step you take leaves footsteps behind.', h: 'Walk to create them' },
    { p: 'I have keys but no locks. I have space but no room. You can enter but cannot go inside. What am I?', a: 'Keyboard', acc: ['KEYBOARD', 'A KEYBOARD', 'COMPUTER KEYBOARD'], cat: 'RIDDLE', exp: 'A keyboard has keys, spacebar, and an enter key.', h: 'Type on it' },
    { p: 'What can be broken without being touched or held?', a: 'Promise', acc: ['PROMISE', 'A PROMISE', 'SILENCE', 'HEART', 'A HEART', 'TRUST'], cat: 'RIDDLE', exp: 'You can break a promise or trust purely with words.', h: 'A spoken pledge' },
    { p: 'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?', a: 'Echo', acc: ['ECHO', 'AN ECHO'], cat: 'RIDDLE', exp: 'An echo repeats what you say.', h: 'Bounces off canyons' },
    { p: 'What has many teeth but cannot bite?', a: 'Comb', acc: ['COMB', 'A COMB', 'ZIPPER', 'SAW', 'A SAW', 'GEAR'], cat: 'RIDDLE', exp: 'A comb has teeth to style hair, but cannot bite.', h: 'Used in your hair' },
    { p: 'How many months have 28 days?', a: '12', acc: ['12', 'ALL 12', 'ALL OF THEM', 'TWELVE', 'ALL MONTHS', 'EVERY MONTH'], cat: 'TRICK', exp: 'Every single month has at least 28 days!', h: 'Think about February, January, March...' },
    { p: 'A plane crashes exactly on the border between the US and Canada. Where do they bury the survivors?', a: 'Nowhere', acc: ['NOWHERE', 'THEY DONT', 'THEY DON\'T', 'SURVIVORS ARENT BURIED', 'YOU DONT BURY SURVIVORS', 'THEY DON\'T BURY SURVIVORS', 'THEY DO NOT BURY SURVIVORS'], cat: 'TRICK', exp: 'You do not bury survivors—they are still alive!', h: 'Read carefully: "survivors"' },
    { p: 'You enter a dark room with 1 match. There is a candle, an oil lamp, and a fireplace. What do you light first?', a: 'Match', acc: ['MATCH', 'THE MATCH', 'A MATCH'], cat: 'TRICK', exp: 'You must light the match before you can light anything else.', h: 'In your hand' },
    { p: 'What has hands but cannot clap?', a: 'Clock', acc: ['CLOCK', 'A CLOCK', 'WATCH', 'A WATCH'], cat: 'RIDDLE', exp: 'A clock has hour and minute hands.', h: 'Ticks on the wall' },
    { p: 'What gets wetter the more it dries?', a: 'Towel', acc: ['TOWEL', 'A TOWEL'], cat: 'RIDDLE', exp: 'A towel absorbs water to dry other things.', h: 'In the bathroom' }
  ],
  42: [
    { p: 'What has to be broken before you can use it?', a: 'Egg', acc: ['EGG', 'AN EGG', 'GLOWSTICK', 'COCONUT', 'A GLOWSTICK'], cat: 'RIDDLE', exp: 'An egg must be cracked open to use or cook.', h: 'Cracked for breakfast' },
    { p: 'I am tall when I am young, and short when I am old. What am I?', a: 'Candle', acc: ['CANDLE', 'A CANDLE', 'PENCIL', 'A PENCIL'], cat: 'RIDDLE', exp: 'Candles and pencils shrink as they burn or get sharpened.', h: 'Wick and wax' },
    { p: 'What goes up but never ever comes down?', a: 'Age', acc: ['AGE', 'YOUR AGE'], cat: 'RIDDLE', exp: 'Your age only increases with each passing year.', h: 'Celebrated on birthdays' },
    { p: 'What has a head and a tail but no body?', a: 'Coin', acc: ['COIN', 'A COIN', 'PENNY', 'QUARTER'], cat: 'RIDDLE', exp: 'A coin has heads and tails sides.', h: 'Flipped for decisions' },
    { p: 'What building has the most stories?', a: 'Library', acc: ['LIBRARY', 'A LIBRARY'], cat: 'RIDDLE', exp: 'A library is filled with book stories.', h: 'Full of books' },
    { p: 'What has an eye but cannot see anything?', a: 'Needle', acc: ['NEEDLE', 'A NEEDLE', 'STORM', 'HURRICANE', 'POTATO'], cat: 'RIDDLE', exp: 'The eye of a needle is where the thread goes.', h: 'Sewing tool' },
    { p: 'What has a neck but no head?', a: 'Bottle', acc: ['BOTTLE', 'A BOTTLE', 'GUITAR', 'SHIRT', 'A SHIRT'], cat: 'RIDDLE', exp: 'A bottle has a neck, as does a shirt or guitar.', h: 'Holds liquids' },
    { p: 'What has legs but cannot walk?', a: 'Table', acc: ['TABLE', 'A TABLE', 'CHAIR', 'A CHAIR'], cat: 'RIDDLE', exp: 'Tables and chairs have four legs but cannot walk.', h: 'Dining furniture' },
    { p: 'What has a thumb and four fingers but is not alive?', a: 'Glove', acc: ['GLOVE', 'A GLOVE', 'MITTEN'], cat: 'RIDDLE', exp: 'A glove covers hands and fingers.', h: 'Worn on hands' },
    { p: 'Forward I am heavy, but backward I am not. What am I?', a: 'Ton', acc: ['TON', 'A TON'], cat: 'RIDDLE', exp: '"Ton" spelled backward is "not".', h: 'Spelled backwards it spells NOT' }
  ],
  43: [
    { p: 'What disappears the exact moment you say its name?', a: 'Silence', acc: ['SILENCE'], cat: 'RIDDLE', exp: 'Speaking breaks the silence.', h: 'Total quiet' },
    { p: 'I am not alive, but I grow; I don\'t have lungs, but I need air. What am I?', a: 'Fire', acc: ['FIRE', 'A FIRE', 'FLAME'], cat: 'RIDDLE', exp: 'Fire needs oxygen to burn and grow.', h: 'Hot and consuming' },
    { p: 'What belongs to you, but everyone else uses it more than you do?', a: 'Name', acc: ['NAME', 'YOUR NAME', 'MY NAME'], cat: 'RIDDLE', exp: 'People call you by your name.', h: 'On your ID' },
    { p: 'Mary\'s father has 5 daughters: Nana, Nene, Nini, Nono. What is the fifth daughter\'s name?', a: 'Mary', acc: ['MARY'], cat: 'TRICK', exp: 'Mary\'s father is her father, so Mary is the fifth daughter!', h: 'Read the first word' },
    { p: 'If an electric train is traveling north at 100 mph and wind blows east at 20 mph, which way does smoke blow?', a: 'Nowhere', acc: ['NOWHERE', 'NO SMOKE', 'THERE IS NO SMOKE', 'ELECTRIC TRAINS DONT HAVE SMOKE', 'NONE'], cat: 'TRICK', exp: 'Electric trains produce no smoke!', h: 'It is an ELECTRIC train' },
    { p: 'Before Mt. Everest was discovered, what was the highest mountain in the world?', a: 'Mount Everest', acc: ['MOUNT EVEREST', 'MT EVEREST', 'EVEREST'], cat: 'TRICK', exp: 'It was still the highest mountain, even before discovery.', h: 'It still existed' },
    { p: 'What word in the English dictionary is always spelled incorrectly?', a: 'Incorrectly', acc: ['INCORRECTLY', 'THE WORD INCORRECTLY'], cat: 'TRICK', exp: 'The word "incorrectly" is spelled I-N-C-O-R-R-E-C-T-L-Y.', h: 'Literally that word' },
    { p: 'A cowboy rides into town on Friday, stays 3 days, and leaves on Friday. How did he do it?', a: 'Horse named Friday', acc: ['HORSE NAMED FRIDAY', 'FRIDAY IS A HORSE', 'HIS HORSE WAS NAMED FRIDAY', 'HORSE', 'HIS HORSE'], cat: 'TRICK', exp: 'His horse was named Friday!', h: 'What was the horse called?' },
    { p: 'What can fill a room but takes up no physical space?', a: 'Light', acc: ['LIGHT', 'SMELL', 'SOUND', 'DARKNESS', 'A LIGHT', 'MUSIC'], cat: 'RIDDLE', exp: 'Light or sound completely fills a space.', h: 'Turn on a lamp' },
    { p: 'What has a bottom at the top?', a: 'Legs', acc: ['LEGS', 'YOUR LEGS', 'YOUR BOTTOM'], cat: 'RIDDLE', exp: 'Your bottom is at the top of your legs.', h: 'Part of human anatomy' }
  ],
  44: [
    { p: 'What can travel around the entire world while staying in one corner?', a: 'Stamp', acc: ['STAMP', 'A STAMP', 'POSTAGE STAMP'], cat: 'RIDDLE', exp: 'A postage stamp stays in the envelope corner.', h: 'On an envelope' },
    { p: 'What has words, but never speaks?', a: 'Book', acc: ['BOOK', 'A BOOK'], cat: 'RIDDLE', exp: 'A book contains printed words.', h: 'Read it' },
    { p: 'What has a spine, but no bones?', a: 'Book', acc: ['BOOK', 'A BOOK'], cat: 'RIDDLE', exp: 'The binding edge of a book is called its spine.', h: 'Library object' },
    { p: 'What has one eye and a long tail, and each time it enters a hole, its tail gets shorter?', a: 'Needle and thread', acc: ['NEEDLE AND THREAD', 'THREAD', 'NEEDLE', 'A NEEDLE AND THREAD'], cat: 'RIDDLE', exp: 'A sewing needle with thread trailing behind it.', h: 'Sewing fabric' },
    { p: 'What runs all around a backyard without ever moving?', a: 'Fence', acc: ['FENCE', 'A FENCE', 'WALL', 'A WALL'], cat: 'RIDDLE', exp: 'A perimeter fence bounds the yard without motion.', h: 'Encloses property' },
    { p: 'What has cities, but no houses; forests, but no trees; and rivers, but no water?', a: 'Map', acc: ['MAP', 'A MAP', 'ATLAS', 'GLOBE'], cat: 'RIDDLE', exp: 'A geographic map shows symbols of geography.', h: 'Shows geography' },
    { p: 'What can you catch, but never throw?', a: 'Cold', acc: ['COLD', 'A COLD', 'FLU', 'FEVER', 'ILLNESS', 'BREATH'], cat: 'RIDDLE', exp: 'You can catch a cold or sickness.', h: 'Sickness' },
    { p: 'What kind of band never plays music?', a: 'Rubber band', acc: ['RUBBER BAND', 'A RUBBER BAND', 'HAIR BAND', 'WRISTBAND'], cat: 'RIDDLE', exp: 'A rubber band stretches, but plays no tunes.', h: 'Stretchy loop' },
    { p: 'What kind of coat is best put on when wet?', a: 'Coat of paint', acc: ['COAT OF PAINT', 'PAINT', 'A COAT OF PAINT'], cat: 'RIDDLE', exp: 'A coat of paint goes on wet and dries.', h: 'Wall painting' },
    { p: 'What 4-letter word can be written forward, backward, or upside down, and can still be read from left to right?', a: 'NOON', acc: ['NOON'], cat: 'RIDDLE', exp: 'NOON is symmetric in all directions.', h: '12:00 PM' }
  ],
  45: [
    { p: 'If you are running in a race and pass the person in second place, what place are you in?', a: 'Second', acc: ['SECOND', '2ND', 'SECOND PLACE', '2'], cat: 'TRICK', exp: 'You took second place; first place is still ahead of you!', h: 'You took their position' },
    { p: 'How much dirt is there in a hole that is 3 feet deep, 6 feet long, and 4 feet wide?', a: 'None', acc: ['NONE', 'ZERO', 'NO DIRT', '0'], cat: 'TRICK', exp: 'There is no dirt in a hole—it is empty!', h: 'It is a HOLE' },
    { p: 'A rooster lays an egg on the apex of a roof. Which side does it roll down?', a: 'Neither', acc: ['NEITHER', 'ROOSTERS DONT LAY EGGS', 'NONE', 'ROOSTERS DON\'T LAY EGGS', 'ROOSTERS DO NOT LAY EGGS'], cat: 'TRICK', exp: 'Roosters are male and do not lay eggs!', h: 'Rooster vs Hen' },
    { p: 'Some months have 31 days, some have 30. How many have 28?', a: '12', acc: ['12', 'ALL OF THEM', 'ALL 12', 'TWELVE'], cat: 'TRICK', exp: 'All 12 months have at least 28 days.', h: 'Think about February, April, May...' },
    { p: 'If there are 3 apples and you take away 2, how many do you have?', a: '2', acc: ['2', 'TWO'], cat: 'TRICK', exp: 'You took 2 apples, so you have 2 apples.', h: 'You took them' },
    { p: 'What can you hold in your right hand, but never in your left hand?', a: 'Left hand', acc: ['LEFT HAND', 'YOUR LEFT HAND', 'LEFT ELBOW', 'YOUR LEFT ELBOW'], cat: 'RIDDLE', exp: 'Your left hand cannot physically hold itself.', h: 'The opposite hand' },
    { p: 'What gets sharper the more you use it?', a: 'Brain', acc: ['BRAIN', 'YOUR BRAIN', 'MIND', 'YOUR MIND', 'PENCIL'], cat: 'RIDDLE', exp: 'Your brain or mind gets sharper with exercise.', h: 'Inside your head' },
    { p: 'What has a ring but no finger?', a: 'Phone', acc: ['PHONE', 'A PHONE', 'TELEPHONE', 'BELL', 'A BELL', 'TREE'], cat: 'RIDDLE', exp: 'Telephones and bells ring.', h: 'Calls you' },
    { p: 'What goes through cities and over fields, but never moves?', a: 'Road', acc: ['ROAD', 'A ROAD', 'PATH', 'STREET', 'HIGHWAY'], cat: 'RIDDLE', exp: 'A road connects cities without moving.', h: 'Paved surface' },
    { p: 'What can point in every direction, but can never reach anywhere by itself?', a: 'Compass', acc: ['COMPASS', 'A COMPASS', 'FINGER'], cat: 'RIDDLE', exp: 'A compass needle points north, south, east, and west.', h: 'Navigational tool' }
  ],
  46: [
    { p: 'I have branches, but no fruit, trunk, or leaves. What am I?', a: 'Bank', acc: ['BANK', 'A BANK', 'RIVER', 'ROAD'], cat: 'RIDDLE', exp: 'A financial bank has branches in different towns.', h: 'Stores money' },
    { p: 'What has a bark, but no bite?', a: 'Tree', acc: ['TREE', 'A TREE', 'DOG'], cat: 'RIDDLE', exp: 'Trees are covered in bark.', h: 'Has leaves' },
    { p: 'What has no flesh, feathers, scales or bone, yet has fingers and thumbs of its own?', a: 'Glove', acc: ['GLOVE', 'A GLOVE', 'MITTEN'], cat: 'RIDDLE', exp: 'A glove has fingers and thumbs.', h: 'Hand wear' },
    { p: 'What five-letter word becomes shorter when you add two letters to it?', a: 'Short', acc: ['SHORT', 'THE WORD SHORT'], cat: 'RIDDLE', exp: 'Add "er" to "short" and it spells "shorter"!', h: 'Add "er"' },
    { p: 'What begins with T, ends with T, and has T in it?', a: 'Teapot', acc: ['TEAPOT', 'A TEAPOT'], cat: 'RIDDLE', exp: 'A teapot starts with T, ends with T, and holds hot tea!', h: 'Brews tea' },
    { p: 'What kind of room has no doors or windows?', a: 'Mushroom', acc: ['MUSHROOM', 'A MUSHROOM'], cat: 'RIDDLE', exp: 'A mushroom is an edible fungus.', h: 'Edible fungus' },
    { p: 'What has a foot on each side and one in the middle?', a: 'Yardstick', acc: ['YARDSTICK', 'A YARDSTICK', 'RULER', 'A YARD'], cat: 'RIDDLE', exp: 'A yardstick is 3 feet long.', h: '3 feet long' },
    { p: 'What can be swallowed, but can also swallow you?', a: 'Water', acc: ['WATER', 'PRIDE', 'AN OCEAN'], cat: 'RIDDLE', exp: 'You can drink water, but you can also drown in deep water.', h: 'H2O' },
    { p: 'I shave everyday, but my beard stays the same. What am I?', a: 'Barber', acc: ['BARBER', 'A BARBER'], cat: 'RIDDLE', exp: 'A barber shaves other people\'s beards.', h: 'Cuts other hair' },
    { p: 'What has four wheels and flies?', a: 'Garbage truck', acc: ['GARBAGE TRUCK', 'A GARBAGE TRUCK', 'TRASH TRUCK'], cat: 'RIDDLE', exp: 'A garbage truck attracts house flies!', h: 'Carries trash' }
  ],
  47: [
    { p: 'A man is pushing his car and stops at a hotel, only to realize he is bankrupt. What was he playing?', a: 'Monopoly', acc: ['MONOPOLY'], cat: 'TRICK', exp: 'He was playing the board game Monopoly with the car token!', h: 'Board game' },
    { p: 'How can a girl go 25 days without sleep?', a: 'Sleep at night', acc: ['SLEEP AT NIGHT', 'SLEEPS AT NIGHT', 'BY SLEEPING AT NIGHT', 'AT NIGHT'], cat: 'TRICK', exp: 'She sleeps at night, so she goes without sleep during the day.', h: 'When does she sleep?' },
    { p: 'What is black when you buy it, red when you use it, and gray when you throw it away?', a: 'Charcoal', acc: ['CHARCOAL', 'COAL'], cat: 'RIDDLE', exp: 'Charcoal is black, glows red while burning, and turns to gray ash.', h: 'Barbecue fuel' },
    { p: 'What is always coming, but never arrives?', a: 'Tomorrow', acc: ['TOMORROW', 'THE FUTURE'], cat: 'RIDDLE', exp: 'When tomorrow comes, it is called today.', h: 'Next day' },
    { p: 'What never asks questions, but is often answered?', a: 'Doorbell', acc: ['DOORBELL', 'A DOORBELL', 'PHONE', 'A PHONE', 'TELEPHONE'], cat: 'RIDDLE', exp: 'A doorbell or ringing phone is "answered".', h: 'Rings at your door' },
    { p: 'What has a spine, leaves, and covers, but is not alive?', a: 'Book', acc: ['BOOK', 'A BOOK'], cat: 'RIDDLE', exp: 'Pages in a book are called leaves.', h: 'On a shelf' },
    { p: 'What goes up and down stairs without moving?', a: 'Carpet', acc: ['CARPET', 'A CARPET', 'RAILING', 'STAIRCASE'], cat: 'RIDDLE', exp: 'Carpet lies across all the steps.', h: 'Floor covering' },
    { p: 'What gets bigger the more you take away from it?', a: 'Hole', acc: ['HOLE', 'A HOLE'], cat: 'RIDDLE', exp: 'Digging out more dirt enlarges the hole.', h: 'Dig in the ground' },
    { p: 'What has two hands, a round face, runs, but stays in the same place?', a: 'Clock', acc: ['CLOCK', 'A CLOCK', 'WATCH'], cat: 'RIDDLE', exp: 'A clock\'s hands run in circles while staying on the wall.', h: 'Tells time' },
    { p: 'What tastes better than it smells?', a: 'Tongue', acc: ['TONGUE', 'YOUR TONGUE'], cat: 'RIDDLE', exp: 'Your tongue has taste buds, while it cannot smell.', h: 'In your mouth' }
  ],
  48: [
    { p: 'What has a head, but no eyes, nose, or mouth?', a: 'Lettuce', acc: ['LETTUCE', 'A PIN', 'PIN', 'CABBAGE', 'COIN', 'NAIL'], cat: 'RIDDLE', exp: 'A head of lettuce, cabbage, or the head of a nail or pin.', h: 'Salad leaf or sewing pin' },
    { p: 'What can fill an entire room without occupying any space?', a: 'Light', acc: ['LIGHT', 'SOUND', 'DARKNESS', 'A LIGHT', 'MUSIC'], cat: 'RIDDLE', exp: 'Light spreads everywhere in a room instantly.', h: 'Flick the switch' },
    { p: 'What is so fragile that saying its name breaks it?', a: 'Silence', acc: ['SILENCE', 'A SECRET', 'SECRET'], cat: 'RIDDLE', exp: 'Silence ends the second a sound is made.', h: 'Quiet' },
    { p: 'Where does today come before yesterday?', a: 'Dictionary', acc: ['DICTIONARY', 'A DICTIONARY', 'IN A DICTIONARY', 'THE DICTIONARY'], cat: 'TRICK', exp: 'In alphabetical order, T (Today) comes before Y (Yesterday).', h: 'Alphabetical order' },
    { p: 'What has 88 keys, but cannot open a single door?', a: 'Piano', acc: ['PIANO', 'A PIANO'], cat: 'RIDDLE', exp: 'A standard piano has 88 black and white keys.', h: 'Grand instrument' },
    { p: 'What has a bed, but never sleeps, and runs, but never walks?', a: 'River', acc: ['RIVER', 'A RIVER'], cat: 'RIDDLE', exp: 'A river has a riverbed and river banks.', h: 'Flows to the ocean' },
    { p: 'What has a bank, but no money?', a: 'River', acc: ['RIVER', 'A RIVER'], cat: 'RIDDLE', exp: 'Rivers have riverbanks on their sides.', h: 'Water channel' },
    { p: 'What begins with an "E", ends with an "E", but contains only one letter?', a: 'Envelope', acc: ['ENVELOPE', 'AN ENVELOPE'], cat: 'RIDDLE', exp: 'An envelope holds a written letter inside.', h: 'Mails a letter' },
    { p: 'What invention lets you look right through a wall?', a: 'Window', acc: ['WINDOW', 'A WINDOW'], cat: 'RIDDLE', exp: 'A glass window.', h: 'Made of glass' },
    { p: 'What gets sharper the more you listen to it?', a: 'Mind', acc: ['MIND', 'BRAIN', 'YOUR MIND', 'PENCIL'], cat: 'RIDDLE', exp: 'Your mind or intellect.', h: 'Intellect' }
  ],
  49: [
    { p: 'A man was born in 1995, but is only 7 years old today. How is this possible?', a: 'Leap day', acc: ['LEAP DAY', 'BORN ON LEAP DAY', 'FEB 29', 'FEBRUARY 29', 'LEAP YEAR'], cat: 'TRICK', exp: 'He was born on February 29th (leap day) and only celebrates every 4 years.', h: 'February 29' },
    { p: 'If you have it, you want to share it. If you share it, you haven\'t got it. What is it?', a: 'Secret', acc: ['SECRET', 'A SECRET'], cat: 'RIDDLE', exp: 'Once a secret is shared, it is no longer a secret.', h: 'Confidential info' },
    { p: 'What flies without wings and cries without eyes?', a: 'Cloud', acc: ['CLOUD', 'A CLOUD', 'WIND'], cat: 'RIDDLE', exp: 'Clouds drift across the sky and release rain.', h: 'Rains from above' },
    { p: 'I am an odd number. Take away a letter and I become even. What number am I?', a: 'Seven', acc: ['SEVEN', '7'], cat: 'RIDDLE', exp: 'Take "S" away from "SEVEN" and it spells "EVEN"!', h: 'Remove S' },
    { p: 'What can you break without dropping it or touching it?', a: 'Promise', acc: ['PROMISE', 'A PROMISE', 'HEART', 'SILENCE'], cat: 'RIDDLE', exp: 'A promise or trust.', h: 'A spoken oath' },
    { p: 'What has a tongue, but cannot talk, and has no legs, but wears a shoe?', a: 'Foot', acc: ['FOOT', 'A FOOT', 'SHOE', 'A SHOE'], cat: 'RIDDLE', exp: 'A foot (or the shoe itself) has a tongue.', h: 'Inside footwear' },
    { p: 'What goes up and down, but stays in the same place?', a: 'Stairs', acc: ['STAIRS', 'STAIRCASE', 'ELEVATOR', 'THERMOMETER'], cat: 'RIDDLE', exp: 'Stairs go up and down between floors.', h: 'Flight of steps' },
    { p: 'What is easy to get into, but hard to get out of?', a: 'Trouble', acc: ['TROUBLE', 'DEBT', 'PRISON', 'BED'], cat: 'RIDDLE', exp: 'Trouble or mischief is easy to enter and hard to escape.', h: 'Mischief or difficulty' },
    { p: 'What loses its head in the morning and gets it back at night?', a: 'Pillow', acc: ['PILLOW', 'A PILLOW'], cat: 'RIDDLE', exp: 'A pillow receives your head when you go to sleep.', h: 'On your bed' },
    { p: 'What is full of holes, yet holds liquid?', a: 'Sponge', acc: ['SPONGE', 'A SPONGE'], cat: 'RIDDLE', exp: 'A porous sponge holds water.', h: 'Used for washing dishes' }
  ],
  50: [
    { p: 'What English word has 3 consecutive double letters?', a: 'Bookkeeper', acc: ['BOOKKEEPER', 'BOOKKEEPING'], cat: 'RIDDLE', exp: 'B-OO-KK-EE-per has double O, double K, and double E!', h: 'Works with accounts' },
    { p: 'What creature walks on 4 legs in the morning, 2 legs at noon, and 3 legs in the evening?', a: 'Human', acc: ['HUMAN', 'MAN', 'A HUMAN', 'PERSON'], cat: 'RIDDLE', exp: 'Sphinx riddle: Baby crawls (4), adult walks (2), elder uses a cane (3).', h: 'Riddle of the Sphinx' },
    { p: 'I have no life, but I can die. What am I?', a: 'Battery', acc: ['BATTERY', 'A BATTERY'], cat: 'RIDDLE', exp: 'A battery runs down and dies.', h: 'Powers electronic gadgets' },
    { p: 'What has a horn, but makes no music?', a: 'Rhinoceros', acc: ['RHINOCEROS', 'RHINO', 'BULL', 'GOAT', 'UNICORN'], cat: 'RIDDLE', exp: 'A rhinoceros has a horn on its snout.', h: 'African animal' },
    { p: 'What has arms, but cannot hug?', a: 'Chair', acc: ['CHAIR', 'AN ARMCHAIR', 'ARMCHAIR', 'CLOCK'], cat: 'RIDDLE', exp: 'An armchair has armrests.', h: 'Furniture with armrests' },
    { p: 'What can be heard, but never seen or touched, and will not speak until spoken to?', a: 'Echo', acc: ['ECHO', 'AN ECHO'], cat: 'RIDDLE', exp: 'An echo responds only after you shout.', h: 'Sound reflection' },
    { p: 'What kind of room can you not enter?', a: 'Mushroom', acc: ['MUSHROOM', 'A MUSHROOM'], cat: 'RIDDLE', exp: 'A mushroom is a vegetable/fungus.', h: 'Fungus' },
    { p: 'What has a spine, but cannot bend?', a: 'Book', acc: ['BOOK', 'A BOOK'], cat: 'RIDDLE', exp: 'Hardcover book spines are stiff.', h: 'Reading item' },
    { p: 'What has a mouth, but never smiles?', a: 'Cave', acc: ['CAVE', 'A CAVE', 'RIVER'], cat: 'RIDDLE', exp: 'The entrance of a cave is called its mouth.', h: 'Underground opening' },
    { p: 'What runs around a garden without legs?', a: 'Hose', acc: ['HOSE', 'A HOSE', 'FENCE'], cat: 'RIDDLE', exp: 'A water hose or fence runs around the perimeter.', h: 'Sprays water' }
  ],
  51: [
    { p: 'I am always hungry, I must always be fed; the finger I lick will soon turn red. What am I?', a: 'Fire', acc: ['FIRE', 'A FIRE', 'FLAME'], cat: 'RIDDLE', exp: 'Fire burns fingers red and consumes wood.', h: 'Burns fuel' },
    { p: 'If a rooster is on a pointed roof, and the wind is coming from the west, which way does its egg roll?', a: 'Nowhere', acc: ['NOWHERE', 'ROOSTERS DONT LAY EGGS', 'NONE'], cat: 'TRICK', exp: 'Roosters do not lay eggs!', h: 'Male bird' },
    { p: 'What has two heads, four eyes, six legs, and a tail?', a: 'Horse and rider', acc: ['HORSE AND RIDER', 'A HORSE AND RIDER', 'PERSON ON A HORSE'], cat: 'RIDDLE', exp: 'A human riding a horse.', h: 'Equestrian pair' },
    { p: 'What travels the world while stuck in a corner?', a: 'Stamp', acc: ['STAMP', 'A STAMP'], cat: 'RIDDLE', exp: 'Postage stamp.', h: 'Envelope' },
    { p: 'What has roots that nobody sees, is taller than trees, yet never grows?', a: 'Mountain', acc: ['MOUNTAIN', 'A MOUNTAIN'], cat: 'RIDDLE', exp: 'Tolkien\'s riddle: A mountain.', h: 'Tolkien mountain' },
    { p: 'What can\'t be seen, can\'t be felt, can\'t be heard, and can\'t be smelt, yet empties holes and fills stars?', a: 'Darkness', acc: ['DARKNESS'], cat: 'RIDDLE', exp: 'The absence of light: darkness.', h: 'Absence of light' },
    { p: 'A box without hinges, key, or lid, yet golden treasure inside is hid. What am I?', a: 'Egg', acc: ['EGG', 'AN EGG'], cat: 'RIDDLE', exp: 'An egg yolk is the golden treasure inside.', h: 'Yolk inside' },
    { p: 'Alive without breath, as cold as death; never thirsty, ever drinking. What am I?', a: 'Fish', acc: ['FISH', 'A FISH'], cat: 'RIDDLE', exp: 'A fish lives underwater.', h: 'Swims in the sea' },
    { p: 'This thing all things devours: birds, beasts, trees, flowers; gnaws iron, bites steel. What is it?', a: 'Time', acc: ['TIME'], cat: 'RIDDLE', exp: 'Time wears down all physical things.', h: 'Hours and years' },
    { p: 'What gives you the strength to walk through walls?', a: 'Door', acc: ['DOOR', 'A DOOR', 'DOORWAY'], cat: 'RIDDLE', exp: 'A doorway in a wall.', h: 'Walk through it' }
  ],
  52: [
    { p: 'A plane crashes on the border of France and Spain. Where are survivors buried?', a: 'Nowhere', acc: ['NOWHERE', 'THEY DONT', 'NOT BURIED', 'SURVIVORS ARE ALIVE'], cat: 'TRICK', exp: 'Survivors are not buried!', h: 'They survived' },
    { p: 'A man is in the rain with no hat, umbrella, or cover, yet not a single hair gets wet. Why?', a: 'He is bald', acc: ['HE IS BALD', 'BALD', 'HE HAS NO HAIR'], cat: 'TRICK', exp: 'He had no hair to get wet.', h: 'No hair' },
    { p: 'How many sides does a circle have?', a: '2', acc: ['2', 'TWO', 'INSIDE AND OUTSIDE'], cat: 'TRICK', exp: 'An inside and an outside (or infinite).', h: 'Inside and outside' },
    { p: 'What belongs to you, but your friends use it all the time?', a: 'Name', acc: ['NAME', 'YOUR NAME'], cat: 'RIDDLE', exp: 'Your friends call your name.', h: 'Identity' },
    { p: 'Which weighs more: a pound of feathers or a pound of gold?', a: 'Neither', acc: ['NEITHER', 'BOTH', 'SAME', 'EQUAL', 'THEY WEIGH THE SAME', 'BOTH WEIGH A POUND'], cat: 'TRICK', exp: 'Both weigh exactly one pound!', h: 'Both are a pound' },
    { p: 'If you drop a yellow hat in the Red Sea, what does it become?', a: 'Wet', acc: ['WET'], cat: 'TRICK', exp: 'It gets soaked with water.', h: 'Soaked' },
    { p: 'What has wheels and flies, but is not an airplane?', a: 'Garbage truck', acc: ['GARBAGE TRUCK', 'A GARBAGE TRUCK'], cat: 'RIDDLE', exp: 'A garbage truck attracts flies.', h: 'Trash vehicle' },
    { p: 'What goes up a chimney down, but cannot go down a chimney up?', a: 'Umbrella', acc: ['UMBRELLA', 'AN UMBRELLA'], cat: 'RIDDLE', exp: 'An open umbrella.', h: 'Rain protector' },
    { p: 'What has a golden head, a golden tail, but no body?', a: 'Gold coin', acc: ['GOLD COIN', 'COIN', 'A COIN'], cat: 'RIDDLE', exp: 'A gold coin has heads and tails.', h: 'Currency' },
    { p: 'What starts with P, ends with E, and has thousands of letters?', a: 'Post office', acc: ['POST OFFICE', 'A POST OFFICE'], cat: 'RIDDLE', exp: 'A post office holds thousands of mail letters.', h: 'Mail facility' }
  ],
  53: [
    { p: 'What has 13 hearts, but no other organs?', a: 'Deck of cards', acc: ['DECK OF CARDS', 'PLAYING CARDS', 'A DECK OF CARDS', 'CARDS'], cat: 'RIDDLE', exp: 'A standard deck has 13 heart suit cards (Ace through King).', h: 'Suits in a game' },
    { p: 'What has a bark, but never makes a sound?', a: 'Tree', acc: ['TREE', 'A TREE'], cat: 'RIDDLE', exp: 'Tree bark.', h: 'Trunk surface' },
    { p: 'What has a foot, but no toes?', a: 'Bed', acc: ['BED', 'A BED', 'RULER'], cat: 'RIDDLE', exp: 'The foot of a bed.', h: 'Furniture' },
    { p: 'What has a crown, but is not a king?', a: 'Tooth', acc: ['TOOTH', 'A TOOTH', 'TREE'], cat: 'RIDDLE', exp: 'A tooth crown.', h: 'Dental or arboreal' },
    { p: 'What has two hands, but no arms or legs?', a: 'Clock', acc: ['CLOCK', 'A CLOCK', 'WATCH'], cat: 'RIDDLE', exp: 'A clock.', h: 'Tells hours and minutes' },
    { p: 'What gets smaller when you add more to it?', a: 'Hole', acc: ['HOLE', 'A HOLE', 'DEBT'], cat: 'RIDDLE', exp: 'Add dirt to a hole, and the hole gets smaller.', h: 'Filling an excavation' },
    { p: 'What has many keys, but cannot open doors?', a: 'Piano', acc: ['PIANO', 'A PIANO', 'KEYBOARD'], cat: 'RIDDLE', exp: 'A piano or musical keyboard.', h: 'Musical instrument' },
    { p: 'What loses its shape when you touch it?', a: 'Cloud', acc: ['CLOUD', 'A CLOUD', 'SMOKE', 'WATER'], cat: 'RIDDLE', exp: 'Smoke or vapor disperses.', h: 'Vapor or smoke' },
    { p: 'What has a head, but no eyes, and a point, but no words?', a: 'Nail', acc: ['NAIL', 'A NAIL', 'PIN'], cat: 'RIDDLE', exp: 'A metal nail or pin.', h: 'Hardware fastener' },
    { p: 'What is always in front of you, but can never be seen?', a: 'Future', acc: ['FUTURE', 'THE FUTURE'], cat: 'RIDDLE', exp: 'The future lies ahead.', h: 'What comes next' }
  ],
  54: [
    { p: 'What can run without moving, have a mouth without speaking, and a bed without sleeping?', a: 'River', acc: ['RIVER', 'A RIVER'], cat: 'RIDDLE', exp: 'River bed, river mouth, running water.', h: 'Flows downstream' },
    { p: 'What gets sharper the more you think?', a: 'Mind', acc: ['MIND', 'BRAIN', 'YOUR BRAIN', 'YOUR MIND'], cat: 'RIDDLE', exp: 'Mental acuity.', h: 'Cognition' },
    { p: 'What has a needle, but no thread?', a: 'Pine tree', acc: ['PINE TREE', 'PINE', 'COMPASS', 'A COMPASS'], cat: 'RIDDLE', exp: 'Pine needles or a magnetic compass.', h: 'Conifer leaves' },
    { p: 'What has an eye at one end and sharp at the other?', a: 'Needle', acc: ['NEEDLE', 'A NEEDLE'], cat: 'RIDDLE', exp: 'Sewing needle.', h: 'Sewing' },
    { p: 'What can be heard, but has no sound of its own?', a: 'Echo', acc: ['ECHO', 'AN ECHO'], cat: 'RIDDLE', exp: 'An echo.', h: 'Acoustic reflection' },
    { p: 'What word becomes shorter when you add two letters to it?', a: 'Short', acc: ['SHORT', 'THE WORD SHORT'], cat: 'RIDDLE', exp: 'Short + er = shorter.', h: 'Add "er"' },
    { p: 'What is thrown out when you use it, and pulled back in when you\'re done?', a: 'Anchor', acc: ['ANCHOR', 'AN ANCHOR'], cat: 'RIDDLE', exp: 'A ship\'s anchor.', h: 'Holds a ship' },
    { p: 'What has five fingers, but is not alive?', a: 'Glove', acc: ['GLOVE', 'A GLOVE'], cat: 'RIDDLE', exp: 'A glove.', h: 'Hand wear' },
    { p: 'What can you never eat for breakfast?', a: 'Lunch', acc: ['LUNCH', 'DINNER', 'SUPPER'], cat: 'TRICK', exp: 'Lunch or dinner cannot be breakfast by definition!', h: 'Midday meal' },
    { p: 'What falls, but never breaks, and breaks, but never falls?', a: 'Night and day', acc: ['NIGHT AND DAY', 'DAY AND NIGHT'], cat: 'RIDDLE', exp: 'Night falls, day breaks.', h: 'Sun cycle' }
  ],
  55: [
    { p: 'If you drop me, I am sure to crack, but give me a smile and I will always smile back. What am I?', a: 'Mirror', acc: ['MIRROR', 'A MIRROR'], cat: 'RIDDLE', exp: 'A glass mirror reflects your smile.', h: 'Reflects your face' },
    { p: 'I have cities, but no houses; mountains, but no trees; and water, but no fish. What am I?', a: 'Map', acc: ['MAP', 'A MAP', 'ATLAS'], cat: 'RIDDLE', exp: 'A paper map.', h: 'Cartography' },
    { p: 'What has a neck without a head, and two arms without hands?', a: 'Shirt', acc: ['SHIRT', 'A SHIRT', 'SWEATER'], cat: 'RIDDLE', exp: 'A shirt has a collar neck and sleeves.', h: 'Clothing' },
    { p: 'What has four legs, but cannot walk, and one back, but cannot bend?', a: 'Chair', acc: ['CHAIR', 'A CHAIR'], cat: 'RIDDLE', exp: 'A standard straight-back chair.', h: 'Seating' },
    { p: 'What kind of tree can you carry in your hand?', a: 'Palm', acc: ['PALM', 'PALM TREE', 'A PALM TREE'], cat: 'RIDDLE', exp: 'The palm of your hand, and a palm tree!', h: 'Part of your hand' },
    { p: 'What starts with T, is full of T, and ends with T?', a: 'Teapot', acc: ['TEAPOT', 'A TEAPOT'], cat: 'RIDDLE', exp: 'A teapot holds hot tea.', h: 'Tea container' },
    { p: 'What is always coming, but never here today?', a: 'Tomorrow', acc: ['TOMORROW'], cat: 'RIDDLE', exp: 'Tomorrow.', h: 'The following day' },
    { p: 'What can you catch, but never throw back?', a: 'Cold', acc: ['COLD', 'A COLD'], cat: 'RIDDLE', exp: 'A common cold.', h: 'Illness' },
    { p: 'What can be held, but never touched?', a: 'Breath', acc: ['BREATH', 'YOUR BREATH', 'CONVERSATION'], cat: 'RIDDLE', exp: 'Holding your breath.', h: 'Inhale and hold' },
    { p: 'What has no voice, but screams when boiling?', a: 'Kettle', acc: ['KETTLE', 'A KETTLE', 'TEA KETTLE'], cat: 'RIDDLE', exp: 'A tea kettle whistles and shrieks.', h: 'Boils on a stove' }
  ],
  56: [
    { p: 'How many animals did Moses take onto the ark?', a: '0', acc: ['0', 'ZERO', 'NONE', 'NOAH'], cat: 'TRICK', exp: 'Noah built the ark, not Moses!', h: 'Who built the ark?' },
    { p: 'A clerk in the butcher shop is 5 feet 10 inches tall and wears size 11 shoes. What does he weigh?', a: 'Meat', acc: ['MEAT'], cat: 'TRICK', exp: 'He works at a butcher shop—he weighs meat!', h: 'His job duties' },
    { p: 'What is full of holes, yet holds water?', a: 'Sponge', acc: ['SPONGE', 'A SPONGE'], cat: 'RIDDLE', exp: 'A kitchen sponge.', h: 'Absorbent pad' },
    { p: 'What has 88 keys, but can\'t open a door?', a: 'Piano', acc: ['PIANO', 'A PIANO'], cat: 'RIDDLE', exp: 'Piano.', h: 'Keys for notes' },
    { p: 'What has a head and a tail, but no body?', a: 'Coin', acc: ['COIN', 'A COIN'], cat: 'RIDDLE', exp: 'Coin.', h: 'Flipped' },
    { p: 'What has many eyes, but cannot see?', a: 'Potato', acc: ['POTATO', 'A POTATO', 'STORM'], cat: 'RIDDLE', exp: 'The eyes on a potato skin.', h: 'Spud' },
    { p: 'What has teeth, but cannot chew?', a: 'Comb', acc: ['COMB', 'A COMB', 'ZIPPER', 'SAW'], cat: 'RIDDLE', exp: 'Comb.', h: 'Grooming' },
    { p: 'What has words, but never talks?', a: 'Book', acc: ['BOOK', 'A BOOK'], cat: 'RIDDLE', exp: 'Book.', h: 'Pages' },
    { p: 'What gets wetter as it dries?', a: 'Towel', acc: ['TOWEL', 'A TOWEL'], cat: 'RIDDLE', exp: 'Towel.', h: 'Drying fabric' },
    { p: 'What can fill a room without taking space?', a: 'Light', acc: ['LIGHT', 'A LIGHT', 'SOUND'], cat: 'RIDDLE', exp: 'Light.', h: 'Illumination' }
  ],
  57: [
    { p: 'I follow you all day long, but when the sun goes down, I am gone. What am I?', a: 'Shadow', acc: ['SHADOW', 'A SHADOW', 'YOUR SHADOW'], cat: 'RIDDLE', exp: 'Your shadow disappears without light.', h: 'Cast on the ground' },
    { p: 'What has a ring, but no finger?', a: 'Telephone', acc: ['TELEPHONE', 'PHONE', 'BELL', 'TREE'], cat: 'RIDDLE', exp: 'A telephone.', h: 'Rings' },
    { p: 'What goes up when rain comes down?', a: 'Umbrella', acc: ['UMBRELLA', 'AN UMBRELLA'], cat: 'RIDDLE', exp: 'You open an umbrella upwards.', h: 'Opens in the rain' },
    { p: 'What has a neck, but no head?', a: 'Bottle', acc: ['BOTTLE', 'A BOTTLE', 'SHIRT'], cat: 'RIDDLE', exp: 'Bottle.', h: 'Glass or plastic container' },
    { p: 'What belongs to you, but others use it more than you?', a: 'Name', acc: ['NAME', 'YOUR NAME'], cat: 'RIDDLE', exp: 'Your name.', h: 'Identity' },
    { p: 'What runs, but has no legs?', a: 'Water', acc: ['WATER', 'RIVER', 'NOSE', 'CLOCK'], cat: 'RIDDLE', exp: 'A river or tap water runs.', h: 'Fluid' },
    { p: 'What has legs, but doesn\'t walk?', a: 'Table', acc: ['TABLE', 'A TABLE', 'CHAIR'], cat: 'RIDDLE', exp: 'Table.', h: 'Furniture' },
    { p: 'What has hands, but doesn\'t clap?', a: 'Clock', acc: ['CLOCK', 'A CLOCK'], cat: 'RIDDLE', exp: 'Clock.', h: 'Tells time' },
    { p: 'What can you break without touching?', a: 'Promise', acc: ['PROMISE', 'A PROMISE'], cat: 'RIDDLE', exp: 'Promise.', h: 'Oath' },
    { p: 'What disappears the moment you say its name?', a: 'Silence', acc: ['SILENCE'], cat: 'RIDDLE', exp: 'Silence.', h: 'Quiet' }
  ],
  58: [
    { p: 'What begins with E, ends with E, and contains only one letter?', a: 'Envelope', acc: ['ENVELOPE', 'AN ENVELOPE'], cat: 'RIDDLE', exp: 'An envelope.', h: 'Carries mail' },
    { p: 'What has a thumb and four fingers, but is not alive?', a: 'Glove', acc: ['GLOVE', 'A GLOVE'], cat: 'RIDDLE', exp: 'Glove.', h: 'Worn on hands' },
    { p: 'What has to be broken before you can eat it?', a: 'Egg', acc: ['EGG', 'AN EGG'], cat: 'RIDDLE', exp: 'Egg.', h: 'Breakfast' },
    { p: 'What gets bigger the more you take away?', a: 'Hole', acc: ['HOLE', 'A HOLE'], cat: 'RIDDLE', exp: 'Hole.', h: 'Dug in earth' },
    { p: 'What is always in front of you, but can’t be seen?', a: 'Future', acc: ['FUTURE', 'THE FUTURE'], cat: 'RIDDLE', exp: 'Future.', h: 'Tomorrow and beyond' },
    { p: 'What has an eye, but cannot see?', a: 'Needle', acc: ['NEEDLE', 'A NEEDLE', 'STORM'], cat: 'RIDDLE', exp: 'Needle.', h: 'Thread hole' },
    { p: 'What has many teeth, but cannot bite?', a: 'Comb', acc: ['COMB', 'A COMB'], cat: 'RIDDLE', exp: 'Comb.', h: 'Hair tool' },
    { p: 'What goes up and never comes down?', a: 'Age', acc: ['AGE', 'YOUR AGE'], cat: 'RIDDLE', exp: 'Age.', h: 'Years lived' },
    { p: 'What is so fragile that whisper breaks it?', a: 'Silence', acc: ['SILENCE'], cat: 'RIDDLE', exp: 'Silence.', h: 'Quietness' },
    { p: 'What has a spine, but no bones?', a: 'Book', acc: ['BOOK', 'A BOOK'], cat: 'RIDDLE', exp: 'Book.', h: 'Pages bound' }
  ],
  59: [
    { p: 'The person who makes it doesn\'t want it. The person who buys it doesn\'t use it. The person who uses it doesn\'t know it. What is it?', a: 'Coffin', acc: ['COFFIN', 'A COFFIN', 'CASKET'], cat: 'RIDDLE', exp: 'A burial coffin.', h: 'Burial item' },
    { p: 'A man looks at a painting and says: "Brothers and sisters I have none, but that man\'s father is my father\'s son." Who is in the painting?', a: 'His son', acc: ['HIS SON', 'SON', 'MY SON'], cat: 'TRICK', exp: '"My father\'s son" is himself, so "that man\'s father is myself" -> His son.', h: 'His offspring' },
    { p: 'What English word retains the same pronunciation even after you take away four of its five letters?', a: 'Queue', acc: ['QUEUE'], cat: 'RIDDLE', exp: '"QUEUE" pronounced "Q", same as the single letter Q.', h: 'Line of people' },
    { p: 'What can be stolen without someone having touched it?', a: 'Idea', acc: ['IDEA', 'AN IDEA', 'GLANCE', 'HEART'], cat: 'RIDDLE', exp: 'An idea or thought.', h: 'A creative thought' },
    { p: 'I am light as a feather, yet the strongest man cannot hold me for much more than a few minutes. What am I?', a: 'Breath', acc: ['BREATH', 'YOUR BREATH'], cat: 'RIDDLE', exp: 'Holding your breath.', h: 'Air in your lungs' },
    { p: 'What four-letter word can be read the same upside down?', a: 'NOON', acc: ['NOON', 'SWIMS'], cat: 'RIDDLE', exp: 'NOON or SWIMS.', h: 'Midday' },
    { p: 'What goes around all the pastures without moving an inch?', a: 'Fence', acc: ['FENCE', 'A FENCE'], cat: 'RIDDLE', exp: 'Fence.', h: 'Enclosure' },
    { p: 'What has an eye, but never sleeps, and howls, but never speaks?', a: 'Hurricane', acc: ['HURRICANE', 'A HURRICANE', 'STORM'], cat: 'RIDDLE', exp: 'The eye of a hurricane.', h: 'Tropical tempest' },
    { p: 'What has one horn and drinks water?', a: 'Rhinoceros', acc: ['RHINOCEROS', 'RHINO'], cat: 'RIDDLE', exp: 'A rhinoceros.', h: 'Savanna creature' },
    { p: 'What can you hear, but not see or hold, yet it responds only when summoned?', a: 'Echo', acc: ['ECHO', 'AN ECHO'], cat: 'RIDDLE', exp: 'Echo.', h: 'Shout to hear it' }
  ],
  60: [
    { p: 'Final Grand Mystery: What is greater than God, more evil than the devil, the poor have it, the rich need it, and if you eat it, you will die?', a: 'Nothing', acc: ['NOTHING', 'NOTHING AT ALL'], cat: 'RIDDLE', exp: 'Nothing is greater than God; nothing is more evil; poor have nothing; rich need nothing; eat nothing and you die.', h: 'The absence of anything' },
    { p: 'Final Grand Mystery: What can bring back the dead, make you cry, make you laugh, make you young, is born in an instant, yet lasts a lifetime?', a: 'Memory', acc: ['MEMORY', 'MEMORIES', 'A MEMORY'], cat: 'RIDDLE', exp: 'A memory can recall lost loved ones, provoke tears or joy, and last forever.', h: 'In your mind' },
    { p: 'Final Grand Mystery: I build up castles. I tear down mountains. I make some men blind, I help others to see. What am I?', a: 'Sand', acc: ['SAND'], cat: 'RIDDLE', exp: 'Sand builds sandcastles, weathers mountains, blinds in a storm, and is melted into glass for spectacles.', h: 'Grains on a beach' },
    { p: 'Final Grand Mystery: Two brothers are born at the same hour, live in the same house, but never see one another. What are they?', a: 'Eyes', acc: ['EYES', 'YOUR EYES'], cat: 'RIDDLE', exp: 'Your eyes are side by side on your face and never see each other directly.', h: 'On your face' },
    { p: 'Final Grand Mystery: What passes before the sun and makes no shadow?', a: 'Wind', acc: ['WIND', 'THE WIND', 'AIR'], cat: 'RIDDLE', exp: 'Wind or air is completely transparent.', h: 'Moving air' },
    { p: 'Final Grand Mystery: What is heavier than iron, but floats on water?', a: 'Iceberg', acc: ['ICEBERG', 'AN ICEBERG', 'ICE'], cat: 'RIDDLE', exp: 'A giant iceberg weighs hundreds of thousands of tons, yet floats.', h: 'Frozen water' },
    { p: 'Final Grand Mystery: What walks without feet, flies without wings, and bites without teeth?', a: 'Frost', acc: ['FROST', 'COLD', 'WINTER', 'WIND'], cat: 'RIDDLE', exp: 'Jack Frost or biting frost.', h: 'Biting cold' },
    { p: 'Final Grand Mystery: I run forever, but never tire. I have no beginning and no end. What am I?', a: 'Circle', acc: ['CIRCLE', 'A CIRCLE', 'TIME'], cat: 'RIDDLE', exp: 'A geometric circle has no start or end point.', h: 'Geometric loop' },
    { p: 'Final Grand Mystery: What can you keep after giving it to someone else?', a: 'Word', acc: ['WORD', 'YOUR WORD', 'PROMISE', 'A PROMISE'], cat: 'RIDDLE', exp: 'You give your word and you keep your word.', h: 'A pledge' },
    { p: 'Final Grand Mystery: The more of me you make, the more space you leave behind. What am I?', a: 'Footsteps', acc: ['FOOTSTEPS', 'STEPS', 'FOOTPRINTS'], cat: 'RIDDLE', exp: 'Footsteps.', h: 'Left behind on a path' }
  ]
};

// Assemble 600 challenges into array
const challenges = [];

for (let lvl = 1; lvl <= 60; lvl++) {
  if (lvl <= 20) {
    // Easy
    const templates = easyLevelTemplates[lvl] || easyLevelTemplates[1];
    templates.forEach((t, idx) => {
      challenges.push({
        id: `lvl_${lvl}_c${idx + 1}`,
        level: lvl,
        difficulty: 'easy',
        category: 'WORD',
        prompt: t.p,
        answer: t.a,
        acceptedAnswers: t.acc,
        ruleType: t.rule,
        ruleArg: t.arg,
        explanation: `Valid English word satisfying rule.`,
        baseTime: easyTimers(lvl),
        reward: 25 + lvl,
        modifier: null,
        hint: t.h
      });
    });
  } else if (lvl <= 40) {
    // Medium
    const templates = mediumLevelTemplates[lvl] || mediumLevelTemplates[21];
    templates.forEach((t, idx) => {
      challenges.push({
        id: `lvl_${lvl}_c${idx + 1}`,
        level: lvl,
        difficulty: 'medium',
        category: t.cat || 'PUZZLE',
        prompt: t.p,
        answer: t.a,
        acceptedAnswers: t.acc,
        ruleType: 'EXACT_OR_ALIAS',
        ruleArg: null,
        explanation: t.exp || `Correct answer: ${t.a}`,
        baseTime: mediumTimers(lvl),
        reward: 35 + (lvl - 20) * 2,
        modifier: null,
        hint: t.h
      });
    });
  } else {
    // Hard
    const templates = hardLevelTemplates[lvl] || hardLevelTemplates[41];
    templates.forEach((t, idx) => {
      challenges.push({
        id: `lvl_${lvl}_c${idx + 1}`,
        level: lvl,
        difficulty: 'hard',
        category: t.cat || 'RIDDLE',
        prompt: t.p,
        answer: t.a,
        acceptedAnswers: t.acc,
        ruleType: 'EXACT_OR_ALIAS',
        ruleArg: null,
        explanation: t.exp || `Correct answer: ${t.a}`,
        baseTime: hardTimer,
        reward: 60 + (lvl - 40) * 3,
        modifier: null,
        hint: t.h
      });
    });
  }
}

console.log(`Generated ${challenges.length} total curated challenges across 60 levels.`);

// Procedural challenge generator as fallback
const fileContent = `// Challenge Database for WordBlast
// Exactly 60 Levels:
// Easy (1-20): 100% Word Challenges
// Medium (21-40): 100% Math, Sequence, Logic, Pattern Puzzles
// Hard (41-60): 100% Riddles, Trick Questions, Lateral Brain Teasers

export const CHALLENGES_DATABASE = ${JSON.stringify(challenges, null, 2)};

export function generateProceduralChallenge(level, seq = 1) {
  if (level <= 20) {
    const substrings = ['BL', 'TR', 'ST', 'SH', 'CH', 'FL', 'GR', 'PL', 'SP', 'BR'];
    const chosen = substrings[(level + seq) % substrings.length];
    return {
      id: \`proc_lvl_\${level}_\${seq}_\${Date.now()}\`,
      level: level,
      difficulty: 'easy',
      category: 'WORD',
      prompt: \`Type an English word containing "\${chosen}"\`,
      answer: chosen + 'AST',
      acceptedAnswers: [],
      ruleType: 'CONTAINS_SUBSTRING',
      ruleArg: chosen,
      explanation: \`Any valid English word containing \${chosen}.\`,
      baseTime: level <= 5 ? 15 : level <= 10 ? 14 : level <= 15 ? 12 : 10,
      reward: 30,
      modifier: null,
      hint: \`Contains \${chosen}\`
    };
  } else if (level <= 40) {
    const a = 12 + seq * 3;
    const b = 5 + seq;
    const ans = (a * b).toString();
    return {
      id: \`proc_lvl_\${level}_\${seq}_\${Date.now()}\`,
      level: level,
      difficulty: 'medium',
      category: 'MATH',
      prompt: \`What is \${a} × \${b}?\`,
      answer: ans,
      acceptedAnswers: [ans],
      ruleType: 'EXACT_OR_ALIAS',
      ruleArg: null,
      explanation: \`\${a} * \${b} = \${ans}\`,
      baseTime: level <= 25 ? 20 : level <= 30 ? 18 : level <= 35 ? 17 : 15,
      reward: 45,
      modifier: null,
      hint: \`Multiply \${a} by \${b}\`
    };
  } else {
    return {
      id: \`proc_lvl_\${level}_\${seq}_\${Date.now()}\`,
      level: level,
      difficulty: 'hard',
      category: 'RIDDLE',
      prompt: 'What has keys but no locks, space but no room, and enter but no door?',
      answer: 'Keyboard',
      acceptedAnswers: ['KEYBOARD', 'A KEYBOARD', 'COMPUTER KEYBOARD'],
      ruleType: 'EXACT_OR_ALIAS',
      ruleArg: null,
      explanation: 'A computer keyboard.',
      baseTime: 30,
      reward: 75,
      modifier: null,
      hint: 'Used for typing'
    };
  }
}
`;

fs.writeFileSync('./src/data/challenges.js', fileContent);
console.log('src/data/challenges.js written successfully.');
