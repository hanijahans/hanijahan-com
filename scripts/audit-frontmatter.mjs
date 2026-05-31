#!/usr/bin/env node

import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const DOCS_DIR = 'docs'
const IGNORED_DIRS = new Set(['docs/public'])
const MARKDOWN_EXTENSION = '.md'

const PLACEHOLDER_TITLES = new Set(['portfolio'])
const PLACEHOLDER_DESCRIPTIONS = new Set(['portfolio description'])

const CHECKS = [
  ['missingFrontmatter', 'Missing frontmatter block'],
  ['missingTitle', 'Missing title'],
  ['missingDescription', 'Missing description'],
  ['emptyTitle', 'Empty title'],
  ['emptyDescription', 'Empty description'],
  ['placeholderTitle', 'Placeholder title'],
  ['placeholderDescription', 'Placeholder description'],
]

async function main() {
  const markdownFiles = await collectMarkdownFiles(DOCS_DIR)
  const report = createEmptyReport()

  for (const filePath of markdownFiles) {
    const source = await readFile(filePath, 'utf8')
    const problems = auditFile(source)

    for (const problem of problems) {
      report[problem.type].push({ filePath, ...problem })
    }
  }

  printReport(report, markdownFiles.length)

  if (countProblems(report) > 0) {
    process.exitCode = 1
  }
}

async function collectMarkdownFiles(rootDir) {
  const files = []

  async function walk(currentDir) {
    const normalizedDir = toPosixPath(currentDir)

    if (IGNORED_DIRS.has(normalizedDir)) {
      return
    }

    const entries = await readdir(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      const entryPath = path.join(currentDir, entry.name)

      if (entry.isDirectory()) {
        await walk(entryPath)
        continue
      }

      if (entry.isFile() && path.extname(entry.name) === MARKDOWN_EXTENSION) {
        files.push(toPosixPath(entryPath))
      }
    }
  }

  await walk(rootDir)

  return files.sort((a, b) => a.localeCompare(b))
}

function auditFile(source) {
  const frontmatter = extractFrontmatter(source)

  if (!frontmatter) {
    return [{ type: 'missingFrontmatter' }]
  }

  const fields = parseFrontmatterFields(frontmatter.body)
  const problems = []

  const title = fields.get('title')
  const description = fields.get('description')

  if (!title) {
    problems.push({ type: 'missingTitle' })
  } else if (isEmptyScalar(title.value)) {
    problems.push({ type: 'emptyTitle', line: title.line })
  } else if (PLACEHOLDER_TITLES.has(normalizeScalar(title.value))) {
    problems.push({ type: 'placeholderTitle', line: title.line, value: stringifyValue(title.value) })
  }

  if (!description) {
    problems.push({ type: 'missingDescription' })
  } else if (isEmptyScalar(description.value)) {
    problems.push({ type: 'emptyDescription', line: description.line })
  } else if (PLACEHOLDER_DESCRIPTIONS.has(normalizeScalar(description.value))) {
    problems.push({
      type: 'placeholderDescription',
      line: description.line,
      value: stringifyValue(description.value),
    })
  }

  return problems
}

function extractFrontmatter(source) {
  const normalized = source.replace(/^\uFEFF/, '')

  if (!normalized.startsWith('---\n') && !normalized.startsWith('---\r\n')) {
    return null
  }

  const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)

  if (!match) {
    return null
  }

  return { body: match[1] }
}

function parseFrontmatterFields(frontmatterBody) {
  const fields = new Map()
  const lines = frontmatterBody.split(/\r?\n/)

  lines.forEach((line, index) => {
    if (/^\s/.test(line)) {
      return
    }

    const match = line.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/)

    if (!match) {
      return
    }

    const key = match[1]

    if (key !== 'title' && key !== 'description') {
      return
    }

    if (!fields.has(key)) {
      fields.set(key, {
        line: index + 2,
        value: cleanScalar(match[2] ?? ''),
      })
    }
  })

  return fields
}

function cleanScalar(value) {
  const trimmed = value.trim()

  if (trimmed === '' || trimmed.startsWith('#')) {
    return ''
  }

  if (trimmed.startsWith('"') || trimmed.startsWith("'")) {
    return stripWrappingQuotes(trimmed)
  }

  return trimmed.replace(/\s+#.*$/, '').trim()
}

function stripWrappingQuotes(value) {
  const quote = value[0]
  let result = ''
  let escaped = false

  for (let index = 1; index < value.length; index += 1) {
    const character = value[index]

    if (quote === '"' && character === '\\' && !escaped) {
      escaped = true
      result += character
      continue
    }

    if (character === quote && !escaped) {
      return result.trim()
    }

    result += character
    escaped = false
  }

  return value.slice(1).trim()
}

function isEmptyScalar(value) {
  return value === '' || ['null', '~', 'undefined'].includes(value.toLowerCase())
}

function normalizeScalar(value) {
  return value.trim().toLowerCase()
}

function stringifyValue(value) {
  return value === '' ? '(empty)' : `"${value}"`
}

function createEmptyReport() {
  return Object.fromEntries(CHECKS.map(([key]) => [key, []]))
}

function countProblems(report) {
  return Object.values(report).reduce((total, problems) => total + problems.length, 0)
}

function printReport(report, scannedCount) {
  const totalProblems = countProblems(report)

  console.log('Frontmatter audit')
  console.log('=================')
  console.log(`Scanned: ${scannedCount} Markdown files in ${DOCS_DIR}/`)
  console.log(`Ignored: ${[...IGNORED_DIRS].join(', ')}`)
  console.log(`Problems: ${totalProblems}`)
  console.log('')

  if (totalProblems === 0) {
    console.log('No frontmatter problems found.')
    return
  }

  for (const [key, label] of CHECKS) {
    const problems = report[key]

    if (problems.length === 0) {
      continue
    }

    console.log(`${label} (${problems.length})`)
    console.log('-'.repeat(label.length + String(problems.length).length + 3))

    for (const problem of problems) {
      const line = problem.line ? `:${problem.line}` : ''
      const value = problem.value ? ` — ${problem.value}` : ''
      console.log(`- ${problem.filePath}${line}${value}`)
    }

    console.log('')
  }

  console.log('Frontmatter audit failed. Fix the problems above or intentionally update this audit script.')
}

function toPosixPath(filePath) {
  return filePath.split(path.sep).join('/')
}

main().catch((error) => {
  console.error('Frontmatter audit failed unexpectedly:')
  console.error(error)
  process.exitCode = 1
})
