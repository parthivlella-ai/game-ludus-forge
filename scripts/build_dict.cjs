const fs = require('fs');
const https = require('https');

console.log('Downloading english words...');
https.get('https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt', (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    const rawWords = data.split(/\r?\n/);
    console.log('Total raw words:', rawWords.length);
    // Filter words 3 to 12 letters, only standard a-z
    const filtered = rawWords
      .map(w => w.trim().toUpperCase())
      .filter(w => w.length >= 2 && w.length <= 14 && /^[A-Z]+$/.test(w));
    
    console.log('Filtered valid words:', filtered.length);

    // Write dictionary.js
    const outContent = `// English dictionary for WordBlast local validation
const rawWords = ${JSON.stringify(filtered)};

export const ENGLISH_DICTIONARY = new Set(rawWords);

export function isValidEnglishWord(word) {
  if (!word || typeof word !== 'string') return false;
  const clean = word.trim().toUpperCase();
  if (clean.length < 2) return false;
  return ENGLISH_DICTIONARY.has(clean);
}
`;

    fs.writeFileSync('./src/data/dictionary.js', outContent);
    const sizeMb = (fs.statSync('./src/data/dictionary.js').size / (1024 * 1024)).toFixed(2);
    console.log(`dictionary.js created successfully. File size: ${sizeMb} MB`);
  });
}).on('error', (err) => {
  console.error('Download failed:', err);
});
