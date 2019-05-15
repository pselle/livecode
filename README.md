# Pam's Home for Live Code

## What's this?

The files are the source, saved at the end of a recording/jam, of music made with [TidalCycles](https://tidalcycles.org/index.php/Welcome), which is a means of live coding music in the Haskell language using the SuperDirt synth.

## Organization

- curiosities: things in progress, other people's files, experimentation, scripts
- dist: website stuff
- sets: files from performances (when done live)
- songs: the song source files!

##  Updating the site

Run `node generate.js` which will generate the site from the `songs` directory, and push the update to S3.

## Helpful notes
`ffmpeg -i foo.aiff -f mp3 -acodec libmp3lame -ab 320000 -ar 44100 foo.mp3`

`aws s3 cp ./foo.mp3 s3://beats.thewebivore.com
