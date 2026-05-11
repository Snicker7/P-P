#!/usr/bin/env bash
set -euo pipefail

INPUT="IMG_2703.mov"
OUT_DIR="public/video"

# Prefer system ffmpeg; fall back to ffmpeg-static (no sudo required)
if command -v ffmpeg >/dev/null 2>&1; then
  FFMPEG="ffmpeg"
elif [ -x "node_modules/ffmpeg-static/ffmpeg" ]; then
  FFMPEG="node_modules/ffmpeg-static/ffmpeg"
else
  echo "ERROR: ffmpeg not found. Install system ffmpeg (apt-get install ffmpeg) or run 'npm install -D ffmpeg-static'." >&2
  exit 1
fi

mkdir -p "$OUT_DIR"

# MP4 (H.264, web-optimized, ~720p max for hero use)
"$FFMPEG" -y -i "$INPUT" \
  -vf "scale='min(1280,iw)':-2" \
  -c:v libx264 -preset slow -crf 23 -movflags +faststart \
  -an \
  "$OUT_DIR/img-2703.mp4"

# WebM (VP9, smaller for capable browsers)
"$FFMPEG" -y -i "$INPUT" \
  -vf "scale='min(1280,iw)':-2" \
  -c:v libvpx-vp9 -b:v 0 -crf 33 \
  -an \
  "$OUT_DIR/img-2703.webm"

# Poster: a still frame at 1s in
"$FFMPEG" -y -ss 00:00:01 -i "$INPUT" -vframes 1 \
  -vf "scale='min(1280,iw)':-2" \
  -q:v 5 \
  "$OUT_DIR/img-2703-poster.jpg"

echo "Transcoded → $OUT_DIR"
ls -la "$OUT_DIR"
