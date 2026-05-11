import { existsSync, mkdirSync, rmSync, cpSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const appRepo = process.env.WORLDLATTICE_2D_REPO ?? 'https://github.com/hanijahans/world-lattice-2d-web.git'
const appRef = process.env.WORLDLATTICE_2D_REF ?? 'main'
const appDir = resolve(repoRoot, process.env.WORLDLATTICE_2D_DIR ?? '.external/world-lattice-2d-web')
const outputDir = resolve(repoRoot, process.env.WORLDLATTICE_2D_OUTPUT ?? 'docs/public/worldlattice-2d')

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    ...options,
  })

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status}`)
  }
}

function ensureAppSource() {
  if (existsSync(resolve(appDir, 'package.json'))) {
    return
  }

  mkdirSync(dirname(appDir), { recursive: true })
  run('git', ['clone', '--depth', '1', '--branch', appRef, appRepo, appDir])
}

function installDependencies() {
  const installCommand = existsSync(resolve(appDir, 'package-lock.json')) ? 'ci' : 'install'
  run('npm', [installCommand], { cwd: appDir })
}

function buildApp() {
  run('npm', ['run', 'build'], { cwd: appDir })
}

function copyDist() {
  const distDir = resolve(appDir, 'dist')

  if (!existsSync(distDir)) {
    throw new Error(`Expected built WorldLattice 2D files at ${distDir}`)
  }

  rmSync(outputDir, { recursive: true, force: true })
  mkdirSync(outputDir, { recursive: true })
  cpSync(distDir, outputDir, { recursive: true })
}

console.log(`Preparing WorldLattice 2D from ${appRepo}#${appRef}`)
console.log(`Source directory: ${appDir}`)
console.log(`Static output: ${outputDir}`)

ensureAppSource()
installDependencies()
buildApp()
copyDist()
