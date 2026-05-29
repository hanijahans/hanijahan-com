import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync, unlinkSync, readdirSync, statSync } from 'node:fs'
import { extname, join, relative } from 'node:path'
// Keep sharp as a required top-level dependency so the script exits before
// generating a partial PNG-only manifest or running stale asset cleanup.
import sharp from 'sharp'

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
