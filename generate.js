const fs = require('fs');
const execSync = require('child_process').execSync;

function songFragment(filename) {
  const song = filename.replace('.tidal', '');
  return `<figure>
      <figcaption><a href="https://github.com/pselle/livecode/blob/master/songs/${filename}">${song}</a></figcaption>
      <audio
          controls
          preload="metadata"
          src="http://beats.thewebivore.com/${song}.mp3">
              Your browser does not support the
              <code>audio</code> element.
      </audio>
  </figure>
  `;
}

const base = `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Pam Live Codes</title>
    <link rel="stylesheet" type="text/css" href="styles.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Pam's live coding music, made with Tidal Cycles.">
  </head>
  <body>
    <h1>Pam's Live Code Songs</h1>
    <p>
      Below you'll find my songs.
      They're in alphabetical order right now, aka the worst kind of order.
      Each song links to its .tidal file on GitHub, which was saved at the end of the song.
      The source for this site is on <a href="https://github.com/pselle/livecode">GitHub</a>, and I'm
      <a href="https://twitter.com/pamasaur">on Twitter</a> if you'd like to chat.
    </p>
  `;

const songs = fs.readdirSync('./songs')
  .filter((s) => {
    return s.includes('.tidal');
  })
  .map(songFragment)
  .join('');

const end = `</body></html>`;
console.log('writing file');
fs.writeFileSync('./dist/index.html', base+songs+end, { encoding: 'utf-8' });
console.log('uploading to S3');
execSync('cd dist && aws s3 cp index.html s3://beats.thewebivore.com');
