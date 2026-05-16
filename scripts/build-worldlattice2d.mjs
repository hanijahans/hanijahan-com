import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// Route ownership: the standalone WorldLattice 2D app is always published at
// /worldlattice-2d/. The app repo must build with a matching Vite base path
// (normally base: '/worldlattice-2d/') so its asset URLs keep working after the
// dist directory is copied into VitePress public assets below.
const canonicalRoute = '/worldlattice-2d/'
const canonicalUrl = 'https://hanijahan.com/worldlattice-2d/'

// The website repo orchestrates deployment, but it does not own the app source.
// GitHub Actions (or a local developer) must place the separate checkout here.
// This script deliberately contains no git clone/fetch/checkout behavior so the
// source revision is explicit and controlled by the caller.
const appDir = resolve(repoRoot, process.env.WORLDLATTICE_2D_DIR ?? '.external/world-lattice-2d-web')

// VitePress copies docs/public/* verbatim into docs/.vitepress/dist/*. This
// generated directory is therefore the injection point for the already-built
// standalone app. It must stay ignored by git because it contains build output.
const outputDir = resolve(repoRoot, process.env.WORLDLATTICE_2D_OUTPUT ?? 'docs/public/worldlattice-2d')
const distDir = resolve(appDir, 'dist')

function fail(message) {
  throw new Error(`WorldLattice 2D build failed: ${message}`)
}

function assertDirectory(path, label) {
  if (!existsSync(path)) {
    fail(`${label} is missing at ${path}`)
  }

  if (!statSync(path).isDirectory()) {
    fail(`${label} exists but is not a directory: ${path}`)
  }
}

function assertFile(path, label) {
  if (!existsSync(path)) {
    fail(`${label} is missing at ${path}`)
  }

  if (!statSync(path).isFile()) {
    fail(`${label} exists but is not a file: ${path}`)
  }
}

function run(command, args, options = {}) {
  console.log(`\n> ${command} ${args.join(' ')}`)

  const result = spawnSync(command, args, {
    cwd: repoRoot,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    ...options,
  })

  if (result.error) {
    fail(`${command} ${args.join(' ')} could not start: ${result.error.message}`)
  }

  if (result.status !== 0) {
    fail(`${command} ${args.join(' ')} exited with code ${result.status}`)
  }
}

function validateExternalCheckout() {
  assertDirectory(appDir, 'External WorldLattice 2D checkout')
  assertFile(resolve(appDir, 'package.json'), 'External WorldLattice 2D package.json')
}

function installDependencies() {
  const installCommand = existsSync(resolve(appDir, 'package-lock.json')) ? 'ci' : 'install'
  run('npm', [installCommand], { cwd: appDir })
}

function buildApp() {
  run('npm', ['run', 'build'], { cwd: appDir })
}

function copyDist() {
  assertDirectory(distDir, 'External WorldLattice 2D dist output')
  assertFile(resolve(distDir, 'index.html'), 'External WorldLattice 2D dist/index.html')

  const distEntries = readdirSync(distDir)
  if (distEntries.length === 0) {
    fail(`External WorldLattice 2D dist output is empty: ${distDir}`)
  }

  rmSync(outputDir, { recursive: true, force: true })
  mkdirSync(outputDir, { recursive: true })
  cpSync(distDir, outputDir, { recursive: true })
}

function ensureCanonicalLink() {
  const indexPath = resolve(outputDir, 'index.html')
  assertFile(indexPath, 'Copied WorldLattice 2D index.html')

  const html = readFileSync(indexPath, 'utf8')
  const canonicalTag = `<link rel="canonical" href="${canonicalUrl}">`

  let updatedHtml = html.replace(
    /<link\s+rel=["']canonical["'][^>]*>/i,
    canonicalTag,
  )

  if (updatedHtml === html) {
    updatedHtml = html.replace(/<head>/i, `<head>\n    ${canonicalTag}`)
  }

  if (updatedHtml === html) {
    fail('Copied WorldLattice 2D index.html does not contain a <head> element for canonical URL injection')
  }

  writeFileSync(indexPath, updatedHtml)
}

console.log('Building standalone WorldLattice 2D app for VitePress static hosting')
console.log(`Canonical route: ${canonicalRoute}`)
console.log(`External checkout: ${appDir}`)
console.log(`Expected dist output: ${distDir}`)
console.log(`VitePress public output: ${outputDir}`)

validateExternalCheckout()
installDependencies()
buildApp()
copyDist()
ensureCanonicalLink()

console.log(`\nWorldLattice 2D static files copied to ${outputDir}`)
