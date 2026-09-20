import fs from 'fs';
import path from 'path';

function getFiles(dir) {
  let res = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) res = res.concat(getFiles(p));
    else if (p.endsWith('.jsx')) res.push(p);
  }
  return res;
}

const jsxClasses = new Set();
for (const file of getFiles('src')) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(/className=(?:["']([^"']+)["']|`([^`]+)`)/g) || [];
  for (const m of matches) {
    const raw = m.replace(/^className=["'`]/, '').replace(/["'`]$/, '');
    raw.split(/\s+/).forEach(c => {
      const clean = c.replace(/[^a-zA-Z0-9_-]/g, '');
      if (clean && clean.length > 1) jsxClasses.add(clean);
    });
  }
}

const gameCss = fs.readFileSync('src/styles/game.css', 'utf8');
const missing = [];
for (const cls of jsxClasses) {
  if (!gameCss.includes('.' + cls)) {
    missing.push(cls);
  }
}

console.log('Total JSX classes:', jsxClasses.size);
console.log('Classes missing in game.css (' + missing.length + '):', missing);
