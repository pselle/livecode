const fs = require('fs');
const execSync = require('child_process').execSync;

function songFragment(filename) {
  if (filename.length == 0) {
    return '';
  }
  const song = filename.replace('.tidal', '');
  return `<figure>
      <figcaption><a href="https://github.com/pselle/livecode/blob/master/songs/${filename}">${song}</a></figcaption>
      <audio
          controls
          preload="metadata"
          src="https://beats.thewebivore.com/${song}.mp3">
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
    <h1>Pam the Webivore</h1>
    <h2>[makes music]</h2>
    <p><strong>New!</strong> I now have
    <a href="https://open.spotify.com/album/2S2yL454Shv4zf5oWwjH5p">an EP available on Spotify</a>,
    or available on any streaming service or where music is sold.
    Featuring four mastered tracks!</p>
    <p>Below you'll find my songs.</p>
    <p>
      The songs are in (ish) reverse chronological order, aka, the newest songs are first.
      Each song links to its .tidal file on GitHub, which was saved at the end of the song.
      The source for this site is on <a href="https://github.com/pselle/livecode">GitHub</a>.
    <p>I'm <a href="https://twitter.com/pamasaur">on Twitter</a> if you'd like to chat, or
    <a href="https://buttondown.email/pamselle/">subscribe to my newsletter</a> for infrequent updates</a>.
    </p>
  `;

const songs = fs.readFileSync('./songindex.txt', { encoding: 'utf-8' })
  .split('\n')
  .map(songFragment)
  .join('');

const end = `</body></html>`;
console.log('writing file');
fs.writeFileSync('./dist/index.html', base+songs+end, { encoding: 'utf-8' });
console.log('uploading to S3');
execSync('cd dist && aws s3 cp index.html s3://beats.thewebivore.com');
execSync('aws cloudfront create-invalidation --distribution-id=E12L7X3JJKJR8S --paths /');
console.log('uploaded to S3');
