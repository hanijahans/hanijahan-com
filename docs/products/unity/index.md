---
title: Unity Products
description: "Unity Asset Store products and documentation from Hani Jahan Design."
outline: false
---

# Unity Products

A simple index of Unity Asset Store packages and product documentation from Hani Jahan Design.

<div class="product-grid">
  <a class="product-card" href="https://assetstore.unity.com/packages/slug/405844" target="_blank" rel="noopener noreferrer">
    <img src="/portfolio/unity-asset-worldlattice-tool-01.png" alt="WorldLattice Tool preview">
    <span class="product-card__label">World-Building Tool</span>
    <strong>WorldLattice Tool</strong>
    <p>A modular, rule-driven world-generation tool for quickly building and iterating on Unity environments.</p>
  </a>

  <a class="product-card" href="/products/unity/free-pack/">
    <img src="/portfolio/unity-asset-platformer-kit-01.png" alt="Basic Game Tiles – Stylized Blocks Prototyping Pack preview">
    <span class="product-card__label">Free Pack</span>
    <strong>Basic Game Tiles – Stylized Blocks Prototyping Pack</strong>
    <p>Free modular 3D tiles for fast platformer, puzzle, and grid-based Unity prototyping.</p>
  </a>

  <a class="product-card" href="/products/unity/scifi-biolab-pack/">
    <img src="/portfolio/unity-asset-scifi-lab-kit-01.png" alt="Modular Sci-Fi Bio Lab Pack preview">
    <span class="product-card__label">3D Environment Pack</span>
    <strong>Modular Sci-Fi Bio Lab Pack</strong>
    <p>A stylized modular lab tileset for sci-fi rooms, platformer spaces, and puzzle levels.</p>
  </a>

  <a class="product-card" href="/products/unity/stylized-water-shaders/">
    <img src="/portfolio/unity-asset-stylized-water-shader-01.png" alt="Stylized Water Shader Pack preview">
    <span class="product-card__label">Shader Pack</span>
    <strong>Stylized Water Shader Pack</strong>
    <p>Built-in and URP water shaders with foam, waves, ripples, edge highlights, presets, and demo scenes.</p>
  </a>

  <a class="product-card" href="/products/unity/toon-shader-pack/">
    <img src="/portfolio/unity-asset-toon-shader-01.png" alt="Stylized Toon Shader Pack preview">
    <span class="product-card__label">Shader Pack</span>
    <strong>Stylized Toon Shader Pack</strong>
    <p>Built-in and URP toon shaders with flexible shading sources, color modes, rim light, outlines, presets, and demo scenes.</p>
  </a>
</div>

<style>
.product-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  margin-top: 2rem;
}

.product-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  color: var(--vp-c-text-1);
  text-decoration: none !important;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.product-card:hover {
  text-decoration: none !important;
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.product-card img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 12px;
}

.product-card__label {
  width: fit-content;
  padding: 0.2rem 0.55rem;
  color: var(--vp-c-brand-1);
  font-size: 0.78rem;
  font-weight: 700;
  background: var(--vp-c-brand-soft);
  border-radius: 999px;
}

.product-card strong {
  font-size: 1.05rem;
  line-height: 1.3;
}

.product-card :is(strong, p, span) {
  text-decoration: none !important;
}

.product-card p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.55;
}
</style>
