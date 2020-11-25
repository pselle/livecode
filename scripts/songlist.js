const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

// Generate the order of the songs by inspecting their git output, this takes a while
function sortSongs(a, b) {
  const dateA = new Date(execSync(`git log --format=%ci --reverse songs/${a} | head -1`));
  const dateB = new Date(execSync(`git log --format=%ci --reverse songs/${b} | head -1`));
  if (dateA > dateB) {
    return -1;
  }
  if (dateA < dateB) {
    return 1;
  }
  return 0;
}

const songs = fs.readdirSync(path.join(__dirname, '..', 'songs'))
  .filter((s) => {
    return s.includes('.tidal');
  })
  .sort(sortSongs)
  .join('\n');

fs.writeFileSync('../songindex.txt', songs, {encoding:'utf-8'})
