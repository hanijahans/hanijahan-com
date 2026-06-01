---
title: WorldLattice Documentation
description: "WorldLattice documentation covering installation, core concepts, controls, and tips for creating generated worlds."
---

# **WorldLattice Documentation**

Welcome to **WorldLattice**—a fast, rule-driven worldbuilding toy for painting samples and generating tiny, living worlds. This guide covers installation, core concepts, controls, and tips for creating the vibes you want.  


## **Core Concepts**

* Grid – A 2D tile grid where you paint. Each tile is a small “cell” in the world generator.

* Brush – The thing you paint with: usually a tile type or material (ground, water, rock, etc.).

* Sample / Pattern – Internally, WorldLattice looks at your painted grid as patterns and learns “how the world should look.” (Think: puzzle rules.)

* Generation – The step where your doodle becomes a 3D world using those patterns.

* Snapshot – A stored “state” of paint \+ generation. It lets you bookmark an interesting result and come back.

You don’t need to understand the math, but under the hood it’s basically a constraint solver (similar to Wave Function Collapse)


## **Controls**


### ***Mouse***

* Left Click (Paint mode) – Paint with the active brush.

* Left Click \+ Drag – Paint continuously as you drag.

* Right Click – Erase (paint “empty” / air).

* Middle Click / Wheel Click – (Optional) Pan, if you’ve enabled it.

* Mouse Wheel – Zoom camera in/out.

### ***Camera***

* Hold Right Mouse \+ drag – Orbit around the world (Generation view).

* Hold Middle Mouse \+ drag – Pan the camera.

* Scroll Wheel – Zoom in/out.

### ***Keyboard (typical layout)***

* Q / E – Brush rotatio in Painting mode.

* Tab – Toggle between Paint and Generation.

* Ctrl+Z – Undo last paint or action.

* Ctrl+Y – Redo.

* G – Generate world from current painting.

* P – Capture screenshot.



## **Modes**

### ***Paint Mode***

Paint Mode is where you doodle your intent.  
While in Paint Mode:

* The center view shows the flat tile grid.

* Your brush cursor snaps to tiles.

* The bottom snapshot strip shows previews (if implemented).

What you can usually do:

* Paint tiles with left click.

* Erase tiles with right click.

* Change brush type (brush palette / toolbar).

* Clear the whole canvas (button like “Clear”).

* Create a snapshot of the current painting.

### ***Generation Mode***

Generation Mode is where the 3D magic happens.  
When you switch to Generation Mode:

1. WorldLattice reads your painted grid as a sample.

2. It extracts patterns and rules from your doodle.

3. It runs the generator and builds a tiny 3D world.

In this mode you can:

* Orbit, pan, and zoom the camera.

* Regenerate (button like Regenerate or hotkey).

* Capture screenshots.

* Store or update snapshots tied to this painting.

If the generator fails or looks weird, try:

* Simplifying the painting (cleaner blobs, fewer tiny noisy dots).

* Using more filled areas and fewer isolated pixels.


## **Brushes & Tiles**

WorldLattice is tile-based: each brush paints a tile ID onto the grid.  
Typical brushes (examples – rename to your actual names):

* Ground – Basic solid tile.

* Water – Becomes ponds / rivers in generation.

* Rock / Cliff – Makes raised cliffs, walls, or rocks.

* Detail / Foliage – Small accents.

* Eraser / Empty – Clears a tile (air).

### ***Selecting a brush***

* Use the toolbar on the side: click the icon to select a brush.

### ***Brush Rotation (if you add it)***

* Q / E – Rotate the current brush (90° steps).

* The preview should show the orientation.

* This is useful for directional tiles (roads, cliffs, stairs).

Programming note for you:  
 Rotation is usually just changing the tile’s orientation index or mapping to a rotated tile ID, not rotating geometry at runtime. Internally it can be as simple as an integer (0–3) or a bitmask.  

## **Snapshots**

Snapshots are your save slots for ideas, not just one big save.  
Each snapshot typically stores:

* The painting on the grid

* The parameters used for generation (where applicable)

* Maybe the last generated result (or a seed)

You’ll see them as thumbnail cards in a strip (bottom or side).

### ***Creating a snapshot***

1. Set up your painting.

2. Click \+ / New Snapshot.

3. WorldLattice captures the current state and shows a thumbnail.

### ***Updating a snapshot***

* Select an existing snapshot.

* Change your painting or regenerate.

* Click Update / Overwrite (or whatever button you expose).

### ***Switching between snapshots***

* Click a snapshot thumbnail to load its painting and world.

* Use arrow keys if you support cycling.

Treat snapshots as experiments, not precious saves. Duplicate and mutate them.  


## **Painting Workflow**

Here’s a basic loop:

1. Block out shapes

   * Big, simple blobs (islands, streets, platforms).

   * Avoid noisy, checkerboard clutter at first.

2. Add structure

   * Use different brushes for different “materials” or zones.

   * For example: ground center, rock border, water pockets.

3. Add hints

   * Place a few details where you want “interesting spots” (peaks, dense areas, edges).

4. Generate

   * Switch to Generation Mode and hit Generate.

5. Evaluate and tweak

   * If it’s too noisy → simplify the painting.

   * Too repetitive → add more variation in the sample area.

   * Generator stuck → clean up disconnected tiny islands.

This approach works because the generator is basically learning rules from your sample painting. Good sample → good rules.  


## **Generation Workflow**

Once you’re in Generation Mode:

1. Generate

   * Press Generate (or hotkey G).

   * Wait for the world to appear.

2. Explore

   * Orbit and zoom around the world.

   * Look for interesting silhouettes and details.

3. Regenerate with same painting

   * Hit Regenerate to reroll using the same sample.

   * You’ll get variants that follow the same style.

4. Return to Paint Mode

   * Press Tab to go back.

   * Make a small change (add/remove tiles).

   * Generate again and see how it affects the result.

5. Promote a result

   * If you love one world:

     * Capture a screenshot.

     * Optionally create / update a snapshot slot so you can revisit that setup.

## **Camera**

### ***In Paint Mode***

* Camera may be fixed or simple (top-down orthographic is common).

* Zoom to focus on smaller areas when painting details.

Typical controls:

* Scroll Wheel – Zoom.

* Middle Mouse / Right Drag – Pan.

### ***In Generation Mode***

* Right Mouse \+ drag – Orbit.

* Middle Mouse \+ drag – Pan.

* Scroll Wheel – Zoom.

* Reset View button – snaps camera back to a default angle (top-down is nice).

Good camera defaults make or break screenshots, so set a flattering default angle and distance.  

## **Saving & Loading (if implemented)**

* Save – Stores snapshots, painting, and configuration in a file.

* Load – Restores previous work.


## **Screenshots & Sharing**

WorldLattice is meant to be shared.

### ***Taking screenshots***

* Use the Screenshot button in the UI, or

* Press F12 (or your chosen key).

* The game saves an image file to a Screenshots folder next to the executable.

### ***Sharing***

* You can post screenshots and GIFs anywhere.

* I’d love to see them in [#wl-share-your-world](https://discord.gg/xsJyB2mpFp) on the Discord server.


## **Settings / Options (lightweight)**




## **Tips & Troubleshooting**

### ***My world looks messy / chaotic***

* Your sample painting probably is too noisy.

* Try:

  * Larger blocks of the same tile.

  * Fewer isolated dots.

  * Removing “TV static” patterns.

### ***Generation fails or gets stuck (if you expose this)***

* Clear the grid and start simpler.

* Avoid conflicting patterns (e.g., impossible corners everywhere).

### **Note**
Keep options minimal and understandable. This is a toy, not Blender.  


## Feedback & Support

Found a bug or have a feature request? Reach out on the [WorldLattice Discord](https://discord.gg/DrMcwjvPvk) or the [contact page](/contact).