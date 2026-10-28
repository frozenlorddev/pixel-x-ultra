FROM node:22-slim

# ffmpeg is used by the media/sticker commands; sharp needs these libs
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg libvips42 ca-certificates \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund
COPY . .

ENV NODE_ENV=production
CMD ["node", "console.js"]
