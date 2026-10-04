---
title: WorldLattice Tool
description: "Generate Unity levels from a small painted sample with a wave-function-collapse workflow."
outline: deep
---

# WorldLattice Tool

<p align="center">
  <a href="https://assetstore.unity.com/packages/slug/405844" target="_blank" rel="noopener noreferrer">
    <img src="/portfolio/unity-asset-worldlattice-tool-01.png" alt="WorldLattice Tool level-generation workflow" width="800">
  </a>
</p>

<p align="center">
  <a href="https://assetstore.unity.com/packages/slug/405844" target="_blank" rel="noopener noreferrer">
    <strong>View WorldLattice Tool on the Unity Asset Store</strong>
  </a>
</p>

---

WorldLattice Tool is a standalone Unity editor extension for generating a larger level from a small, painted example. It extracts the example's local tile relationships, then uses a weighted wave-function-collapse solver to arrange your prefabs across a new grid while preserving those learned relationships.

The workflow has three stages:

1. **Space** — choose the output plane, dimensions, cell size, origin, and optional mask.
2. **Sample** — add prefabs, paint an example, extract neighborhoods, and inspect their compatibility.
3. **Generate** — solve with a seed, preview the result, and apply it to the scene or save it as a prefab.

- [Requirements](#requirements)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Space](#space)
- [Sample and Pattern Extraction](#sample-and-pattern-extraction)
- [Generate](#generate)
- [Configuration JSON](#configuration-json)
- [Included Content](#included-content)
- [Troubleshooting](#troubleshooting)
- [Known Limitations](#known-limitations)
- [Support](#support)
- [Changelog](#changelog)

## Requirements

- Unity **2022.3 LTS or newer**.
- The editor generator supports both the **Built-in Render Pipeline** and **Universal Render Pipeline (URP)** because its generation algorithm is render-pipeline independent.
- The included URP example material requires **URP 14** when used in Unity 2022.3. A Built-in material is also included for Built-in projects.
- 2D generation on the **XY** or **XZ** plane is supported. Full 3D generation is not available in version 1.0.0.
- Mask textures must have **Read/Write** enabled in their texture import settings.

WorldLattice Tool is self-contained. It does not require another WorldLattice product, and generated levels do not require WorldLattice scripts at runtime.

## Installation

Import the complete `WorldLatticeTool` folder, including its `.meta` files, and preserve the folder structure. After Unity finishes compiling, open:

**Tools > HaniJahanDesign > WorldLattice Tool > Level Generation**

No scene component or additional editor setup is required.

## Quick Start

1. Open **Tools > HaniJahanDesign > WorldLattice Tool > Level Generation**.
2. On **1 Space**, select **2D (XY Plane)** or **2D (XZ Plane)** and set the output **Grid Size**, **Cell Size**, and **Grid Origin**.
3. Optionally enable **Mask**. Paint available cells directly in the grid, or assign a readable texture and select **Apply Mask**.
4. On **2 Sample**, set a smaller sample grid and add your tile prefabs to **Tile Prefabs**.
5. Select **Paint**, then left-click or drag across the sample grid. Right-click or right-drag to paint **Empty/Air**.
6. Choose the **Neighborhood** size, transformation options, and boundary behavior. Select **Rebuild Patterns**.
7. Inspect the extracted patterns and the compatibility map. Revise the sample if it does not teach the relationships you need.
8. On **3 Generate**, choose a **Seed** and **Max Attempts**, then select **Generate**.
9. Select **Apply to Scene** for an editable scene hierarchy, or **Create Prefab** to save the generated hierarchy as a prefab asset.

## Space

### Dimension and grid

**Dimension** selects the active 2D plane:

| Mode | Active axes | Fixed axis |
| --- | --- | --- |
| 2D (XY Plane) | X and Y | Z is fixed to 1 cell |
| 2D (XZ Plane) | X and Z | Y is fixed to 1 cell |

**Grid Size** controls the number of output cells. **Cell Size** controls the spacing between generated prefab pivots and is clamped to a positive value. **Grid Origin** is the world-space corner from which cell-center offsets are calculated.

Use consistently positioned prefab pivots and make each tile's geometry fit the chosen cell size. The tool places a tile at the center of its output cell and preserves the prefab's authored transform values other than position.

### Generation mask

Leave **Mask** disabled to make the entire output grid available. When it is enabled, you can:

- click cells in the grid view to toggle them;
- select **Invert** to swap available and blocked cells;
- select **Clear / All Available** to enable all cells; or
- assign a `Texture2D` and select **Apply Mask**.

Texture masks are sampled across the active plane. A pixel enables a cell when its alpha is at least 0.5 **or** its grayscale value is at least 0.5; darker transparent pixels block cells. If Unity reports that the texture is not readable, enable **Read/Write** in the texture's import settings and apply it again.

Blocked cells are excluded from solving, preview, and scene output.

## Sample and Pattern Extraction

### Paint a sample

The sample should be small enough to edit comfortably but large enough to demonstrate every connection and layout rule you want the generator to learn.

1. Set the sample **Grid Size**.
2. Add prefab assets to the reorderable **Tile Prefabs** list.
3. Select a tile's **Paint** button.
4. Left-click or left-drag to paint it. Right-click or right-drag to erase a cell to **Empty/Air**.

Removing a tile from the list does not automatically repaint cells that used its ID. Repaint affected cells before rebuilding patterns. Changing painted cells clears the existing extracted patterns and generated result so stale data is not reused.

### Neighborhoods

**Neighborhood** selects a pattern size from 2 to 5. In 2D, each extracted pattern is an `N × N` window over the sample. Every active sample dimension must be at least as large as the neighborhood.

Duplicate neighborhoods are merged. Their number of occurrences becomes the pattern's weight, so relationships seen more often in the sample are more likely to be selected during generation.

The transformation options augment what is learned:

- **Allow rotations** adds quarter-turn variants of each neighborhood.
- **Allow reflections** adds mirrored variants.

These options transform learned patterns; they do not rotate or mirror the instantiated prefab itself. Include separate prefab variants when visual orientation must change.

### Sample boundaries

Boundary behavior is configured independently for each active axis:

| Boundary | Behavior |
| --- | --- |
| None | Extracts only windows that remain inside the painted sample. |
| Padding | Teaches an additional one-cell border of Empty/Air outside that sample edge. |
| Periodic | Wraps pattern windows to the opposite edge, teaching a repeating sample. |

An axis cannot use Padding and Periodic at the same time. Use **Padding** when tiles should learn how to meet empty space at the edge. Use **Periodic** when opposite edges of the sample are intended to connect seamlessly.

### Pattern and compatibility views

Select **Rebuild Patterns** after changing extraction settings. The **Patterns** area displays each unique neighborhood and its weight (`×N`). Select a pattern to make it the center of the **Compatibility** view.

Compatibility is derived by comparing overlapping cells between patterns. The directional map shows which patterns can sit to the left, right, above, or below the selected pattern on the active plane. Use this view to find missing relationships before running the solver.

## Generate

### Seed and attempts

**Seed** makes the random choice sequence reproducible for the same configuration. Select **Randomize** to choose another seed. **Max Attempts** sets how many solves, from 1 to 100, may be tried; each retry derives a deterministic alternate random sequence from the seed.

Select **Generate** to run the solver. The result panel reports:

- success or the contradiction message;
- the number of collapsed cells;
- attempts used; and
- elapsed time in milliseconds.

Each cell begins with every learned pattern as a possibility. The solver repeatedly chooses a lowest-entropy cell, makes a weighted choice, and propagates compatibility constraints to its neighbors. A contradiction occurs when a required cell has no compatible pattern remaining.

### Output

After a successful solve:

- **Apply to Scene** creates an undoable root named `WorldLattice Generated {seed}`, instantiates prefab children, and selects the root.
- **Create Prefab** asks for an asset path, builds the same hierarchy, saves it as a prefab, removes the temporary scene hierarchy, and selects the new asset.

Empty/Air cells, blocked mask cells, missing tile IDs, and tiles without an assigned prefab do not create GameObjects. Generated objects are ordinary prefab instances and remain editable without WorldLattice.

## Configuration JSON

Use **Export JSON** and **Import JSON** in the window toolbar to transfer the complete editor configuration between sessions or projects. Exports default to the included `Configurations/` folder and use names such as:

`WorldLatticeConfig_20260912_143527_UTC.json`

The current format uses `"schemaVersion": 1`. A configuration stores the dimension, output and sample grids, cell size, origin, mask, sample cells, tile asset GUIDs, extraction settings, derived patterns and compatibility, seed, and maximum attempts.

Important details:

- `dimensionMode` is `0` for 2D XZ and `1` for 2D XY. The legacy value `2` is accepted but converted to 2D XZ because 3D is not currently exposed.
- `paddedAxes` and `periodicAxes` are bit masks: X = 1, Y = 2, and Z = 4. Their active bits must not overlap.
- Prefabs are resolved through their Unity asset GUIDs. Keep the prefab `.meta` files when moving a configuration to another project.
- Missing prefab references are retained as empty tile entries and reported as an import warning.
- Imported data is validated for its schema, grid sizes, array lengths, IDs, patterns, compatibility indices, boundaries, cell size, and attempt count.

Each file must contain exactly one JSON object. Prefer making changes in the tool and exporting again instead of hand-editing derived pattern or compatibility arrays.

## Included Content

The package includes:

- a self-contained editor window and generation algorithm;
- example bridge, crate, ground, floating-ground, slope, and ladder models and prefabs;
- example level-map mask textures;
- a color-palette texture;
- Built-in and URP example materials;
- an example URP scene; and
- importable XY and XZ configuration examples.

The generator itself is pipeline independent. If an included example prefab appears pink in a Built-in project, replace its URP material with the included `HJD_BuiltIn_Normal` material. In a URP project, use `HJD_URP_Normal` and ensure a URP Asset is active.

## Troubleshooting

- **No patterns are extracted:** Make every active sample dimension at least as large as the neighborhood, paint the sample, and select **Rebuild Patterns**.
- **Generation reaches a contradiction:** Increase **Max Attempts**, try another seed, add the missing relationship to the sample, change boundary behavior, or reduce the neighborhood size.
- **Results have too little variety:** Paint more examples, enable rotations or reflections when appropriate, or add alternative relationships to the sample.
- **Results contain unwanted connections:** Locate the responsible neighborhoods in the Patterns and Compatibility views, then revise the sample or use a larger neighborhood to provide more context.
- **The mask has no effect:** Enable **Mask**, select **Apply Mask**, and verify that the source texture is readable. Remember that either alpha or grayscale at 0.5 and above enables a cell.
- **Imported tiles have empty prefab fields:** The asset GUID could not be resolved. Import the original prefab together with its `.meta` file, or assign the prefab again.
- **A generated tile is missing:** Confirm that the painted tile still exists in the Tile Prefabs list and has a prefab assigned. Empty/Air and unresolved tiles are intentionally skipped.
- **Prefab spacing or alignment is wrong:** Match model dimensions and pivot conventions to **Cell Size**, then verify **Grid Origin**.
- **Example materials are pink:** Assign the example material matching the project's active render pipeline.
- **The editor becomes slow:** Reduce output dimensions or neighborhood size. Larger samples, more transformations, and more unique patterns increase extraction and solve cost.

## Known Limitations

- Version 1.0.0 supports only 2D XY and 2D XZ generation; 3D generation is reserved for a future update.
- Rotation and reflection augment pattern data but do not rotate or mirror instantiated prefabs.
- Pattern extraction and solving run synchronously in the Unity editor.
- The solver learns local overlapping neighborhoods rather than semantic rules. It can reproduce only relationships represented by the sample and selected boundary settings.
- Very large grids, larger neighborhoods, or samples producing many unique variants can substantially increase memory use and processing time.
- JSON prefab references depend on Unity asset GUIDs and therefore require the referenced `.meta` files to remain intact.

## Support

**Publisher:** Hani Jahan Design

Use the support contact on the [Unity Asset Store listing](https://assetstore.unity.com/packages/slug/405844), or join the [HJD Discord](https://discord.gg/xpcfCyaycx) for feedback and community help.

When requesting support, include:

- Unity editor version;
- active render pipeline and version;
- clear reproduction steps;
- Console errors and stack traces;
- the exported configuration JSON, when relevant; and
- a screenshot of the tool settings or result.

## Changelog

### 1.0.0

- Initial Unity Asset Store release.
- Added a three-stage Space, Sample, and Generate workflow.
- Added sample-driven overlapping pattern extraction and weighted wave-function-collapse generation.
- Added XY and XZ planes, grid masks, configurable neighborhoods, rotations, reflections, and per-axis Padding or Periodic boundaries.
- Added visual pattern and directional compatibility inspection.
- Added deterministic seeds, retry limits, result statistics, scene application, and prefab export.
- Added versioned JSON configuration import and export with validation and missing-asset reporting.
- Added example models, prefabs, masks, materials, configurations, and an URP scene.
