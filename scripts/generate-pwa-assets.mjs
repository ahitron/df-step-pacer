import sharp from 'sharp'
import { readFileSync } from 'fs'

const fav = readFileSync('public/favicon.svg')
const mask = readFileSync('public/maskable-source.svg')

await Promise.all([
  sharp(fav).resize(192, 192).png().toFile('public/pwa-192x192.png'),
  sharp(fav).resize(512, 512).png().toFile('public/pwa-512x512.png'),
  sharp(fav).resize(180, 180).png().toFile('public/apple-touch-icon-180x180.png'),
  sharp(mask).resize(512, 512).png().toFile('public/maskable-icon-512x512.png'),
])

console.log('PWA assets generated.')
