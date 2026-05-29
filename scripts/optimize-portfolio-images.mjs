import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync, readdirSync, statSync } from 'node:fs'
import { dirname, extname, basename, join, relative } from 'node:path'
import { deflateSync, inflateSync } from 'node:zlib'

const repoRoot = process.cwd()
const publicRoot = join(repoRoot, 'docs/public')
const archiveRoot = join(repoRoot, 'docs/portfolio-archive')
const portfolioRoot = join(publicRoot, 'portfolio')
const thumbnailRoot = join(portfolioRoot, 'thumbnails')
const optimizedRoot = join(portfolioRoot, 'optimized')
const manifestPath = join(repoRoot, 'docs/data/portfolio-image-variants.ts')
const LARGE_PNG_BYTES = 512 * 1024
const THUMB_WIDTH = 640
const FULL_MAX_WIDTH = 1600

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
const crcTable = new Uint32Array(256)
for (let n = 0; n < 256; n++) {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  crcTable[n] = c >>> 0
}

function crc32(buffer) {
  let c = 0xffffffff
  for (const byte of buffer) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data = Buffer.alloc(0)) {
  const typeBuffer = Buffer.from(type)
  const out = Buffer.alloc(12 + data.length)
  out.writeUInt32BE(data.length, 0)
  typeBuffer.copy(out, 4)
  data.copy(out, 8)
  out.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 8 + data.length)
  return out
}

function paeth(a, b, c) {
  const p = a + b - c
  const pa = Math.abs(p - a)
  const pb = Math.abs(p - b)
  const pc = Math.abs(p - c)
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c
}

function readPng(buffer, sourceName = 'Buffer') {
  if (!buffer.subarray(0, 8).equals(PNG_SIGNATURE)) throw new Error(`${file} is not a PNG`)

  let offset = 8
  let width = 0
  let height = 0
  let bitDepth = 0
  let colorType = 0
  let palette = null
  let transparency = null
  const idat = []

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset)
    const type = buffer.toString('ascii', offset + 4, offset + 8)
    const data = buffer.subarray(offset + 8, offset + 8 + length)
    offset += 12 + length

    if (type === 'IHDR') {
      width = data.readUInt32BE(0)
      height = data.readUInt32BE(4)
      bitDepth = data[8]
      colorType = data[9]
      const compression = data[10]
      const filter = data[11]
      const interlace = data[12]
      if (bitDepth !== 8 || compression !== 0 || filter !== 0 || interlace !== 0) {
        throw new Error(`${sourceName} uses unsupported PNG settings`)
      }
      if (![2, 3, 6].includes(colorType)) throw new Error(`${sourceName} uses unsupported PNG color type ${colorType}`)
    } else if (type === 'PLTE') {
      palette = data
    } else if (type === 'tRNS') {
      transparency = data
    } else if (type === 'IDAT') {
      idat.push(data)
    } else if (type === 'IEND') {
      break
    }
  }

  const sourceChannels = colorType === 6 ? 4 : colorType === 2 ? 3 : 1
  const outputChannels = colorType === 3 && transparency ? 4 : colorType === 6 ? 4 : 3
  const bpp = sourceChannels
  const stride = width * sourceChannels
  const inflated = inflateSync(Buffer.concat(idat))
  const scanlines = Buffer.alloc(width * height * sourceChannels)
  let inputOffset = 0
  let outputOffset = 0
  const prior = Buffer.alloc(stride)

  for (let y = 0; y < height; y++) {
    const filterType = inflated[inputOffset++]
    const row = Buffer.from(inflated.subarray(inputOffset, inputOffset + stride))
    inputOffset += stride

    for (let x = 0; x < stride; x++) {
      const left = x >= bpp ? row[x - bpp] : 0
      const up = prior[x]
      const upLeft = x >= bpp ? prior[x - bpp] : 0
      if (filterType === 1) row[x] = (row[x] + left) & 0xff
      else if (filterType === 2) row[x] = (row[x] + up) & 0xff
      else if (filterType === 3) row[x] = (row[x] + Math.floor((left + up) / 2)) & 0xff
      else if (filterType === 4) row[x] = (row[x] + paeth(left, up, upLeft)) & 0xff
      else if (filterType !== 0) throw new Error(`${sourceName} has unsupported PNG filter ${filterType}`)
    }

    row.copy(scanlines, outputOffset)
    row.copy(prior)
    outputOffset += stride
  }

  if (colorType !== 3) return { width, height, channels: outputChannels, pixels: scanlines, name: sourceName }
  if (!palette) throw new Error(`${sourceName} is an indexed PNG without a palette`)

  const pixels = Buffer.alloc(width * height * outputChannels)
  for (let i = 0; i < width * height; i++) {
    const index = scanlines[i]
    const paletteOffset = index * 3
    const outputOffset = i * outputChannels
    pixels[outputOffset] = palette[paletteOffset] ?? 0
    pixels[outputOffset + 1] = palette[paletteOffset + 1] ?? 0
    pixels[outputOffset + 2] = palette[paletteOffset + 2] ?? 0
    if (outputChannels === 4) pixels[outputOffset + 3] = transparency[index] ?? 255
  }

  return { width, height, channels: outputChannels, pixels, name: sourceName }
}

function resizeNearest(image, targetWidth) {
  if (image.width <= targetWidth) return image
  const targetHeight = Math.max(1, Math.round((image.height * targetWidth) / image.width))
  const out = Buffer.alloc(targetWidth * targetHeight * image.channels)

  for (let y = 0; y < targetHeight; y++) {
    const sourceY = Math.min(image.height - 1, Math.floor((y * image.height) / targetHeight))
    for (let x = 0; x < targetWidth; x++) {
      const sourceX = Math.min(image.width - 1, Math.floor((x * image.width) / targetWidth))
      const sourceOffset = (sourceY * image.width + sourceX) * image.channels
      const targetOffset = (y * targetWidth + x) * image.channels
      for (let c = 0; c < image.channels; c++) out[targetOffset + c] = image.pixels[sourceOffset + c]
    }
  }

  return { width: targetWidth, height: targetHeight, channels: image.channels, pixels: out }
}

function writePng(image, file) {
  const colorType = image.channels === 4 ? 6 : 2
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(image.width, 0)
  ihdr.writeUInt32BE(image.height, 4)
  ihdr[8] = 8
  ihdr[9] = colorType
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  const stride = image.width * image.channels
  const raw = Buffer.alloc((stride + 1) * image.height)
  for (let y = 0; y < image.height; y++) {
    const rowOffset = y * (stride + 1)
    raw[rowOffset] = 0
    image.pixels.copy(raw, rowOffset + 1, y * stride, (y + 1) * stride)
  }

  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, Buffer.concat([PNG_SIGNATURE, chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw, { level: 9 })), chunk('IEND')]))
}

async function loadSharp() {
  try {
    return (await import('sharp')).default
  } catch {
    return null
  }
}

function publicPath(file) {
  return `/${relative(publicRoot, file).replaceAll('\\', '/')}`
}

function variantBaseFor(sourcePublicPath) {
  const parsed = sourcePublicPath.replace(/^\/portfolio\//, '').replace(/\.[^.]+$/, '')
  return parsed.replaceAll('/', '__')
}

function collectArchiveCovers() {
  const covers = new Set()
  for (const entry of readdirRecursive(archiveRoot).filter((file) => file.endsWith('.md'))) {
    const raw = readFileSync(entry, 'utf8')
    
    // Extract covers from frontmatter (cover, coverBefore, coverAfter)
    const fmMatches = raw.matchAll(/^(?:cover|coverBefore|coverAfter):\s*["']?([^"'\n]+)["']?\s*$/gm)
    for (const m of fmMatches) {
      const cover = m[1]?.trim()
      if (cover?.startsWith('/portfolio/')) covers.add(cover)
    }

    // Extract covers from markdown images
    const firstImage = raw.match(/!\[[^\]]*\]\(([^)]+)\)/)?.[1]?.trim()
    if (firstImage?.startsWith('/portfolio/')) covers.add(firstImage)
  }
  return covers
}

function readdirRecursive(root) {
  const out = []
  for (const name of readdirSync(root)) {
    const file = join(root, name)
    const stat = statSync(file)
    if (stat.isDirectory()) out.push(...readdirRecursive(file))
    else out.push(file)
  }
  return out
}

const sharp = await loadSharp()
if (!sharp) {
  console.warn('\x1b[33m%s\x1b[0m', 'WARNING: sharp is not installed; generating PNG thumbnails only. Install sharp to emit WebP/AVIF variants.')
}

mkdirSync(thumbnailRoot, { recursive: true })
mkdirSync(optimizedRoot, { recursive: true })

const covers = collectArchiveCovers()
const largePngs = new Set(
  readdirRecursive(portfolioRoot)
    .filter((file) => extname(file).toLowerCase() === '.png')
    .filter((file) => !file.includes('/thumbnails/') && !file.includes('/optimized/'))
    .filter((file) => statSync(file).size >= LARGE_PNG_BYTES)
    .map(publicPath)
)

const sources = new Set([...covers, ...largePngs])
const manifest = {}
const allGeneratedFiles = new Set()
let processed = 0

for (const sourcePublicPath of [...sources].sort()) {
  const sourceFile = join(publicRoot, sourcePublicPath.slice(1))
  if (!existsSync(sourceFile) || extname(sourceFile).toLowerCase() !== '.png') continue
  const sourceBuffer = readFileSync(sourceFile)
  const keyBase = variantBaseFor(sourcePublicPath)
  const hash = createHash('sha1').update(sourceBuffer).digest('hex').slice(0, 10)
  const thumbPngFile = join(thumbnailRoot, `${keyBase}-${THUMB_WIDTH}-${hash}.png`)
  const thumbWebpFile = join(thumbnailRoot, `${keyBase}-${THUMB_WIDTH}-${hash}.webp`)
  const thumbAvifFile = join(thumbnailRoot, `${keyBase}-${THUMB_WIDTH}-${hash}.avif`)
  const fullWebpFile = join(optimizedRoot, `${keyBase}-${hash}.webp`)
  const fullAvifFile = join(optimizedRoot, `${keyBase}-${hash}.avif`)

  const entry = {}

  if (sharp) {
    // Generate PNG thumbnail using sharp (Normal Path)
    if (!existsSync(thumbPngFile)) {
      await sharp(sourceBuffer).resize({ width: THUMB_WIDTH, withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(thumbPngFile)
    }
    entry.thumbnail = publicPath(thumbPngFile)
    allGeneratedFiles.add(thumbPngFile)

    if (!existsSync(thumbWebpFile)) {
      await sharp(sourceBuffer).resize({ width: THUMB_WIDTH, withoutEnlargement: true }).webp({ quality: 78 }).toFile(thumbWebpFile)
    }
    if (!existsSync(thumbAvifFile)) {
      await sharp(sourceBuffer).resize({ width: THUMB_WIDTH, withoutEnlargement: true }).avif({ quality: 52 }).toFile(thumbAvifFile)
    }
    
    allGeneratedFiles.add(thumbWebpFile)
    allGeneratedFiles.add(thumbAvifFile)
    entry.thumbnailWebp = publicPath(thumbWebpFile)
    entry.thumbnailAvif = publicPath(thumbAvifFile)

    if (largePngs.has(sourcePublicPath)) {
      if (!existsSync(fullWebpFile)) {
        await sharp(sourceBuffer).resize({ width: FULL_MAX_WIDTH, withoutEnlargement: true }).webp({ quality: 82 }).toFile(fullWebpFile)
      }
      if (!existsSync(fullAvifFile)) {
        await sharp(sourceBuffer).resize({ width: FULL_MAX_WIDTH, withoutEnlargement: true }).avif({ quality: 58 }).toFile(fullAvifFile)
      }
      
      allGeneratedFiles.add(fullWebpFile)
      allGeneratedFiles.add(fullAvifFile)
      entry.webp = publicPath(fullWebpFile)
      entry.avif = publicPath(fullAvifFile)
    }
  } else {
    // Pure-JS PNG fallback (Emergency Path)
    if (!existsSync(thumbPngFile)) {
      const image = readPng(sourceBuffer, sourcePublicPath)
      writePng(resizeNearest(image, THUMB_WIDTH), thumbPngFile)
    }
    entry.thumbnail = publicPath(thumbPngFile)
    allGeneratedFiles.add(thumbPngFile)
  }

  manifest[sourcePublicPath] = entry
  processed++
}

// Stale asset cleanup
let deletedCount = 0
for (const root of [thumbnailRoot, optimizedRoot]) {
  if (!existsSync(root)) continue
  const files = readdirSync(root)
  for (const name of files) {
    const fullPath = join(root, name)
    if (!allGeneratedFiles.has(fullPath)) {
      unlinkSync(fullPath)
      deletedCount++
    }
  }
}

const manifestBody = `export type PortfolioImageVariant = {\n  thumbnail?: string\n  thumbnailWebp?: string\n  thumbnailAvif?: string\n  webp?: string\n  avif?: string\n}\n\nexport const portfolioImageVariants: Record<string, PortfolioImageVariant> = ${JSON.stringify(manifest, null, 2)}\n`
writeFileSync(manifestPath, manifestBody)

console.log(`Optimized ${processed} portfolio PNG source images.`)
if (deletedCount > 0) console.log(`Cleaned up ${deletedCount} stale assets.`)
console.log(`Manifest written to ${relative(repoRoot, manifestPath)}.`)
