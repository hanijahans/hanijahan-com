import { getCategoryOrder } from './category-order'

export type PortfolioItem = {
  title: string
  categories?: string[]
  order?: number
  categoryOrderByName?: Record<string, number>
  subtitle?: string
  role?: string
  year?: string
  tags?: string[]
  cover: string
  coverBefore?: string
  coverAfter?: string
  video?: string
  videoEmbed?: string
  mediaPreview?: 'always' | 'hover'
  url?: string
  description?: string
}

type ArchiveDocMeta = {
  title?: string
  description?: string
  shortDescription?: string
  tags?: string[]
  cover?: string
  coverBefore?: string
  coverAfter?: string
  categories?: string[]
  order?: number
  categoryOrderByName?: Record<string, number>
  video?: string
  videoEmbed?: string
  mediaPreview?: string
}

type ParsedArchiveDoc = {
  data: ArchiveDocMeta
  content: string
}

type FrontmatterValue = string | string[]
type Frontmatter = Record<string, FrontmatterValue>

const archiveDocs = import.meta.glob('../portfolio-archive/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>

const fallbackCover = '/portfolio/technical-systems.png'

const toTitle = (slug: string): string =>
  slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

const unwrapQuoted = (value: string): string => {
  const trimmed = value.trim()

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }

  return trimmed
}

const parseFrontmatter = (raw: string): { frontmatter: Frontmatter; content: string } => {
  const lines = raw.split(/\r?\n/)

  if (lines[0]?.trim() !== '---') {
    return { frontmatter: {}, content: raw }
  }

  const endIndex = lines.slice(1).findIndex((line) => line.trim() === '---')
  if (endIndex === -1) {
    return { frontmatter: {}, content: raw }
  }

  const frontmatterLines = lines.slice(1, endIndex + 1)
  const content = lines.slice(endIndex + 2).join('\n')

  const frontmatter: Frontmatter = {}
  for (let i = 0; i < frontmatterLines.length; i++) {
    const line = frontmatterLines[i]
    const trimmed = line.trim()

    if (!trimmed || trimmed.startsWith('#')) continue

    const match = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/)
    if (!match) continue

    const key = match[1]?.trim()
    const rawValue = match[2] ?? ''

    if (!key) continue

    // YAML list support:
    // tags:
    //   - Houdini
    //   - VEX
    if (rawValue.trim() === '') {
      const items: string[] = []
      let j = i + 1

      while (j < frontmatterLines.length) {
        const next = frontmatterLines[j]
        const nextTrim = next.trim()

        // stop if next key starts
        if (/^[A-Za-z0-9_-]+\s*:\s*/.test(next) && !nextTrim.startsWith('-')) break
        if (!nextTrim) {
          j++
          continue
        }

        const li = nextTrim.match(/^-+\s*(.*)$/)
        if (!li) break

        const item = unwrapQuoted(li[1] ?? '').trim()
        if (item) items.push(item)
        j++
      }

      if (items.length > 0) {
        frontmatter[key] = items
        i = j - 1
      } else {
        frontmatter[key] = ''
      }

      continue
    }

    frontmatter[key] = unwrapQuoted(rawValue)
  }

  return { frontmatter, content }
}

const toNumberOrUndefined = (value: unknown): number | undefined => {
  if (typeof value !== 'string') return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

const toStringOrUndefined = (value: unknown): string | undefined => {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

const toMediaPreviewMode = (value: unknown): PortfolioItem['mediaPreview'] => {
  if (typeof value !== 'string') return undefined
  const normalized = value.trim().toLowerCase()
  return normalized === 'hover' || normalized === 'always' ? normalized : undefined
}

const toStringArrayOrUndefined = (value: unknown): string[] | undefined => {
  if (Array.isArray(value)) {
    const arr = value.map((v) => (typeof v === 'string' ? v.trim() : '')).filter(Boolean)
    return arr.length ? arr : undefined
  }

  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  if (!trimmed) return undefined

  // inline list: [a, b, "c d"]
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    const items = trimmed
      .slice(1, -1)
      .split(',')
      .map((item) => unwrapQuoted(item).trim())
      .filter(Boolean)
    return items.length ? items : undefined
  }

  // comma-separated: a, b, c
  if (trimmed.includes(',')) {
    const items = trimmed
      .split(',')
      .map((item) => unwrapQuoted(item).trim())
      .filter(Boolean)
    return items.length ? items : undefined
  }

  return [unwrapQuoted(trimmed)]
}

const parseCategoryData = (
  value: unknown,
  fallbackOrder?: number
): Pick<ArchiveDocMeta, 'categories' | 'categoryOrderByName'> => {
  const rawCategories = toStringArrayOrUndefined(value)
  if (!rawCategories?.length) {
    return {}
  }

  const categories: string[] = []
  const categoryOrderByName: Record<string, number> = {}

  for (const rawEntry of rawCategories) {
    const entry = rawEntry.trim()
    if (!entry) continue

    const parts = entry.split(',').map((part) => part.trim()).filter(Boolean)
    const maybeOrder = parts.length > 1 ? Number(parts[parts.length - 1]) : Number.NaN

    if (parts.length > 1 && Number.isFinite(maybeOrder)) {
      const categoryName = parts.slice(0, -1).join(', ').trim()
      if (!categoryName) continue

      categories.push(categoryName)
      categoryOrderByName[categoryName] = maybeOrder
      continue
    }

    categories.push(entry)
    if (typeof fallbackOrder === 'number') {
      categoryOrderByName[entry] = fallbackOrder
    }
  }

  return {
    categories: categories.length ? categories : undefined,
    categoryOrderByName: Object.keys(categoryOrderByName).length ? categoryOrderByName : undefined
  }
}

const extractFirstParagraph = (content: string): string | undefined => {
  const lines = content.split(/\r?\n/)
  const paragraphLines: string[] = []

  for (const line of lines) {
    const t = line.trim()

    // skip empty, headings, images
    if (!t || t.startsWith('#') || t.startsWith('![')) {
      if (paragraphLines.length) break
      continue
    }

    // stop before lists / bullets to avoid turning tool lists into "description"
    if (t.startsWith('- ') || t.startsWith('* ')) {
      if (paragraphLines.length) break
      continue
    }

    paragraphLines.push(t)
  }

  if (!paragraphLines.length) return undefined
  return paragraphLines.join(' ').replace(/\s+/g, ' ')
}

const parseArchiveDoc = (raw: string): ParsedArchiveDoc => {
  const { frontmatter, content } = parseFrontmatter(raw)

  const order = toNumberOrUndefined(frontmatter.order)
  const { categories, categoryOrderByName } = parseCategoryData(frontmatter.category, order)

  const data: ArchiveDocMeta = {
    title: toStringOrUndefined(frontmatter.title),
    description: toStringOrUndefined(frontmatter.description),
    shortDescription: toStringOrUndefined(frontmatter.shortDescription),
    tags: toStringArrayOrUndefined(frontmatter.tags),
    cover: toStringOrUndefined(frontmatter.cover),
    coverBefore: toStringOrUndefined(frontmatter.coverBefore),
    coverAfter: toStringOrUndefined(frontmatter.coverAfter),
    categories,
    order,
    categoryOrderByName,
    video: toStringOrUndefined(frontmatter.video),
    videoEmbed: toStringOrUndefined(frontmatter.videoEmbed),
    mediaPreview: toStringOrUndefined(frontmatter.mediaPreview)
  }

  return { data, content }
}

const compareItems = (a: PortfolioItem, b: PortfolioItem): number => {
  const aPrimaryCategory = a.categories?.[0] ?? ''
  const bPrimaryCategory = b.categories?.[0] ?? ''

  return (
    (getCategoryOrder(a.categories) ?? Number.POSITIVE_INFINITY) -
      (getCategoryOrder(b.categories) ?? Number.POSITIVE_INFINITY) ||
    aPrimaryCategory.localeCompare(bPrimaryCategory) ||
    (a.order ?? Number.POSITIVE_INFINITY) - (b.order ?? Number.POSITIVE_INFINITY) ||
    a.title.localeCompare(b.title)
  )
}

export const allPortfolioItems: PortfolioItem[] = Object.entries(archiveDocs)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()?.replace('.md', '')
    if (!slug) return null

    const { data, content } = parseArchiveDoc(raw)

    const firstImage = content.match(/!\[[^\]]*\]\(([^)]+)\)/)?.[1]
    const description =
      data.shortDescription ||
      data.description ||
      extractFirstParagraph(content)

    const tags = data.tags

    return {
      title: data.title || toTitle(slug),
      categories: data.categories,
      order: data.order,
      categoryOrderByName: data.categoryOrderByName,
      tags,
      cover: data.cover || firstImage || fallbackCover,
      coverBefore: data.coverBefore,
      coverAfter: data.coverAfter,
      video: data.video,
      videoEmbed: data.videoEmbed,
      mediaPreview: toMediaPreviewMode(data.mediaPreview),
      url: `/portfolio-archive/${slug}`,
      description
    } satisfies PortfolioItem
  })
  .filter((item): item is PortfolioItem => item !== null)
  .sort(compareItems)

export const getPortfolioByCategory = (category: string): PortfolioItem[] =>
  allPortfolioItems
    .filter((item) => item.categories?.includes(category))
    .sort(
      (a, b) =>
        (a.categoryOrderByName?.[category] ?? a.order ?? Number.POSITIVE_INFINITY) -
          (b.categoryOrderByName?.[category] ?? b.order ?? Number.POSITIVE_INFINITY) ||
        a.title.localeCompare(b.title)
    )
