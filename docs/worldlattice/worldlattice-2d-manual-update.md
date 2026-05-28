# Manual WorldLattice 2D Update Reference

**Purpose:**
Use this when you update the `world-lattice-2d-web` repo and want to manually update the hosted app build on `HaniJahanWebsite`.

This workflow is intentionally **manual**. No GitHub Actions, no deploy token, no automatic cross-repo update.

---

## Quick Future Reference

Use this checklist when you already have a new WorldLattice 2D build and only need to refresh the website-hosted copy.

### Recommended automated refresh

From `HaniJahanWebsite`, point the website build script at your local `world-lattice-2d-web` checkout:

```bash
WORLDLATTICE_2D_DIR=/path/to/world-lattice-2d-web npm run build:worldlattice2d
```

PowerShell example:

```powershell
$env:WORLDLATTICE_2D_DIR="D:/path/to/world-lattice-2d-web"
npm run build:worldlattice2d
```

The app build must use this Vite base path so deployed asset URLs resolve correctly:

```txt
/apps/worldlattice-2d/
```

### Manual refresh from an existing `dist/` folder

If the new app build already exists, replace the hosted static output with the **contents** of `dist/`:

```bash
rm -rf docs/public/apps/worldlattice-2d
mkdir -p docs/public/apps/worldlattice-2d
cp -R /path/to/world-lattice-2d-web/dist/. docs/public/apps/worldlattice-2d/
```

Do not copy the `dist` folder itself. The final shape should be:

```txt
docs/public/apps/worldlattice-2d/index.html
docs/public/apps/worldlattice-2d/assets/...
```

Then test and commit:

```bash
npm run docs:build
npm run docs:preview
git add docs/public/apps/worldlattice-2d
git commit -m "Update WorldLattice 2D hosted app build"
git push
```

After Netlify deploys, verify:

```txt
https://hanijahan.com/apps/worldlattice-2d/
```

---

## Repository Roles

### `world-lattice-2d-web`

This is the source repo for the standalone WorldLattice 2D React/Vite app.

You edit and build the app here.

### `HaniJahanWebsite`

This is the website repo.

It should only receive the built static output of WorldLattice 2D, not the full app source.

The hosted app should live here:

```txt
HaniJahanWebsite/docs/public/apps/worldlattice-2d/
```

Final website URL:

```txt
https://hanijahan.com/apps/worldlattice-2d/
```

---

## Expected Folder Setup

Example local setup:

```txt
D:/2508_PuGit_HaniJahanWebsite/HaniJahanWebsite/
D:/2508_PuGit_WorldLattice/world-lattice-2d-web/
```

The exact parent folders do not matter, but both repos should exist locally.

---

# Step-by-Step Manual Update

## 1. Open the WorldLattice 2D repo

```bash
cd path/to/world-lattice-2d-web
```

Example:

```bash
cd D:/2508_PuGit_WorldLattice/world-lattice-2d-web
```

---

## 2. Make sure the app is working locally

Run the dev server:

```bash
npm run dev
```

Check the local app in the browser.

Only continue if the app works correctly.

---

## 3. Build the hosted app

Run:

```bash
npm run build:embedded
```

The important requirement is that this build must use this base path:

```txt
/apps/worldlattice-2d/
```

The generated output should go into the `dist/` folder:

```txt
world-lattice-2d-web/dist/
```

Expected output shape:

```txt
world-lattice-2d-web/dist/
  index.html
  assets/
    index-[hash].js
    index-[hash].css
  favicon.ico or other public assets
```

The exact asset filenames may change because Vite uses hashed filenames.

---

## 4. Open the website repo

```bash
cd path/to/HaniJahanWebsite
```

Example:

```bash
cd D:/2508_PuGit_HaniJahanWebsite/HaniJahanWebsite
```

---

## 5. Delete the old hosted app build

Delete this folder:

```txt
HaniJahanWebsite/docs/public/apps/worldlattice-2d/
```

You can delete it manually in File Explorer, or use a terminal command.

### PowerShell

```powershell
Remove-Item -Recurse -Force docs/public/apps/worldlattice-2d
```

If the folder does not exist yet, that is fine.

---

## 6. Recreate the target folder

```powershell
New-Item -ItemType Directory -Force docs/public/apps/worldlattice-2d
```

---

## 7. Copy the new build output into the website repo

Copy everything inside:

```txt
world-lattice-2d-web/dist/
```

Into:

```txt
HaniJahanWebsite/docs/public/apps/worldlattice-2d/
```

After copying, the website repo should look like this:

```txt
HaniJahanWebsite/docs/public/apps/worldlattice-2d/
  index.html
  assets/
    index-[hash].js
    index-[hash].css
  favicon.ico or other public assets
```

Important: do **not** copy the `dist` folder itself.

Correct:

```txt
HaniJahanWebsite/docs/public/apps/worldlattice-2d/index.html
```

Wrong:

```txt
HaniJahanWebsite/docs/public/apps/worldlattice-2d/dist/index.html
```

---

## 8. Test inside the website repo

Run the VitePress dev or preview command.

Prefer preview for production-like testing:

```bash
npm run docs:build
npm run docs:preview
```

Then open:

```txt
http://localhost:4173/apps/worldlattice-2d/
```

If your preview port is different, use that port.

---

## 9. Check the browser console

Open DevTools and check for errors.

Good signs:

* The page loads.
* The canvas appears.
* Assets load from `/apps/worldlattice-2d/assets/...`.
* No 404 errors for the WorldLattice files.
* No redirect loop errors.

Bad signs:

* `404 /apps/worldlattice-2d/`
* `ERR_TOO_MANY_REDIRECTS`
* Assets loading from `/worldlattice/2d/`
* Assets loading from the wrong base path
* Blank page with missing JS/CSS

If assets still point to `/worldlattice/2d/`, the app was built with the wrong base path.

Go back to the WorldLattice 2D repo and rebuild with the `/apps/worldlattice-2d/` base.

---

## 10. Commit the updated hosted app build in the website repo

From `HaniJahanWebsite`:

```bash
git status
```

You should see changed files under:

```txt
docs/public/apps/worldlattice-2d/
```

Then commit:

```bash
git add docs/public/apps/worldlattice-2d
git commit -m "Update WorldLattice 2D hosted app build"
git push
```

Netlify should redeploy the website after the push.

---

## 11. Verify production

After Netlify finishes deploying, open:

```txt
https://hanijahan.com/apps/worldlattice-2d/
```

Check:

* The page loads.
* The app is not blank.
* The latest changes are visible.
* DevTools has no missing WorldLattice asset errors.

---

# Optional: Safer Manual Copy Command

If both repos are siblings under the same parent folder, you can use PowerShell.

Example structure:

```txt
Projects/
  HaniJahanWebsite/
  world-lattice-2d-web/
```

From inside `HaniJahanWebsite`:

```powershell
Remove-Item -Recurse -Force docs/public/apps/worldlattice-2d -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force docs/public/apps/worldlattice-2d
Copy-Item -Recurse -Force ../world-lattice-2d-web/dist/* docs/public/apps/worldlattice-2d/
```

This copies the contents of `dist/`, not the `dist/` folder itself.

---

# Recommended Manual Workflow Summary

```bash
# In world-lattice-2d-web
npm run build:embedded

# In HaniJahanWebsite
# Delete docs/public/apps/worldlattice-2d
# Copy world-lattice-2d-web/dist/* into docs/public/apps/worldlattice-2d/

npm run docs:build
npm run docs:preview

git add docs/public/apps/worldlattice-2d
git commit -m "Update WorldLattice 2D hosted app build"
git push
```

---

# Common Mistakes

## Mistake 1: Copying the whole `dist` folder

Wrong:

```txt
docs/public/apps/worldlattice-2d/dist/index.html
```

Correct:

```txt
docs/public/apps/worldlattice-2d/index.html
```

---

## Mistake 2: Building with the wrong base path

Wrong old path:

```txt
/worldlattice/2d/
```

Correct path:

```txt
/apps/worldlattice-2d/
```

---

## Mistake 3: Leaving old hashed assets around

Vite generates hashed filenames. If old files remain, the folder gets messy and harder to debug.

That is why the old folder should be deleted before copying the new build.

---

## Mistake 4: Expecting `docs:dev` to behave exactly like production

For hosted static apps inside `docs/public`, `docs:preview` is usually a better production-like test than `docs:dev`.

Use:

```bash
npm run docs:build
npm run docs:preview
```

---

# Final Rule

WorldLattice 2D source code stays in:

```txt
world-lattice-2d-web
```

Built static output goes into:

```txt
HaniJahanWebsite/docs/public/apps/worldlattice-2d
```

The website repo should not become a second source-code home for WorldLattice 2D.
