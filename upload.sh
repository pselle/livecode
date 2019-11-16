#!/bin/bash

cd /Users/pamselle/Music/SuperCollider\ Recordings
title=$(echo $1 | tr  '[:upper:]' '[:lower:]')
if [ "$title" == "" ]; then
  echo "Give a title! No extension, just the name."
  exit 1
fi

echo $title
echo "Copying the SuperCollider recording to $title.aiff file..."
cp SC_*.aiff $title.aiff
echo "Converting to mp3..."
ffmpeg -i $title.aiff -f mp3 -acodec libmp3lame -ab 320000 -ar 44100 $title.mp3
echo "Uploading to S3..."
aws s3 cp ./$title.mp3 s3://beats.thewebivore.com
