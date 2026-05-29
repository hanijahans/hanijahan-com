# Hani Jahan Website

Main website repository for [hanijahan.com](https://hanijahan.com).

This repo contains the portfolio, documentation pages, blog/content pages, and static public files served by the website.

## Purpose

This repository is the website shell.

It owns:

* Portfolio and project pages
* Documentation pages
* Blog/content pages
* Navigation and site structure
* Static builds copied from separate interactive app repositories

Interactive projects should keep their source code in their own repositories. This website repo should only contain their final built output when needed for hosting.


## Local Development

Run the VitePress development server:

```bash
npm run docs:dev
```

Use this for editing website pages and documentation.

## Production Check

The development server does not always match the final hosted site, especially for static app assets.

Before publishing, run:

```bash
npm run docs:build
npm run docs:preview
```

Then check the site locally in the preview server.

## Useful Scripts

```bash
npm run docs:dev
```

Starts the VitePress development server.

```bash
npm run docs:build
```

Builds the website.

```bash
npm run docs:preview
```

Previews the built website locally.

```bash
npm run build:worldlattice2d
```

Builds the external WorldLattice 2D app and copies its output into:

```text
docs/public/apps/worldlattice-2d/
```

```bash
npm run build:all
```

Builds WorldLattice 2D, then builds the website.

## License

Website source code in this repository is licensed under the MIT License.

Unless otherwise stated, portfolio content, blog posts, project descriptions, images, videos, artwork, screenshots, generated media, maps, static project assets, and other non-code materials are © Hani Jahan. All rights reserved.

See `LICENSE` and `CONTENT-LICENSE.md` for details.
