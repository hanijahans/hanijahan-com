---
title: Houdini for Game Development
description: Using Houdini and Houdini engine for game development
tags: [Houdini, Game Development, Procedural]
cover: "/portfolio/gamedev-boat-houdini-01.png"
category:
  - Indie Game, 2
mediaPreview: ""
videoEmbed: ""
---

<!-- 
what this shows
- Build demo projects demonstrating the capabilities of SideFX Labs tools
- Learn existing tools and workflows in Houdini
- Be a champion of our company and represent SideFX to the larger game community
- A demonstrated passion for procedural processes and tools
- Fluency in using Houdini for creating tools/HDAs
- Experience using a game engine such as Unreal, Unity, or Godot
- Basic knowledge of VEX and Python
- Must be able to create and present content in Houdini fluently
- Ability to work and operate collaboratively in a small team
- Basic understanding of runtime performance requirements for created assets
- Knowledge of visual arts theory, color, composition, and layout
- Familiarity with UI/UX design principles
- Knowledge of game development pipelines
- A keen eye for visual and technical details 
-->

# Houdini for Game Development Workflows

A collection of game-focused Houdini workflows where I used procedural tools, HDAs, and SideFX Labs workflows to convert design intent into controllable game-ready content.

These projects focus on:
- separating high-level design intent from low-level procedural generation
- building artist-facing controls for iteration
- using Houdini with Unity/game pipelines
- visualizing and debugging procedural data

## Sea Explorer

**Role:** Technical Artist  
**Engine:** Unity 

Sea Explorer is a small resource-based game where the player explores islands, collects materials, and returns to upgrade their boat.

<img src="/portfolio/gamedev-boat-02.png" style="width:100%; height:auto;">

For this project, I used Houdini to create a procedural map tool for assigning and visualizing resource distribution based on designer-defined rules. Instead of manually placing every resource, the tool allowed high-level design values to drive the final layout.

This made the workflow more scalable, easier to iterate, and more suitable for game design than fully manual placement.

### Houdini Workflow

fish:2;wood:1;rock:0;gold:0

```VEX
string resource_data = chs("resource_data");  
// Example: "fish:2;wood:1;rock:0;gold:0"

string resources[] = split(resource_data, ";");

foreach (string res; resources) {
    string res_components[] = split(res, ":");
    string resource_name = res_components[0];
    int amount = atoi(res_components[1]);

    for (int i = 0; i < amount; i++) {
        int selected_prim = available_prims[i];
        setprimgroup(0, "resource_" + resource_name, selected_prim, 1, "set");
    }

    available_prims = slice(available_prims, amount, len(available_prims));
}
```

separate high-level intent from low-level generation
separating intention from execution complexity.
<img src="/portfolio/gamedev-boat-houdini-01.png" style="width:100%; height:auto;">


Houdini map tool  
A procedural zoning tool for assigning and visualizing resource distribution based on design-driven rules. Built in Houdini to enable fast iteration over spatial layouts, allowing controlled variation and scalable map generation.  
<BeforeAfterSlider
  before-src="/portfolio/gamedev-boat-map-01.png"
  after-src="/portfolio/gamedev-boat-map-02.png"
  before-alt=""
  after-alt=""
  height="360px"
  :initial="45"
/>

## Mount Roller Dispatch

**Role:** Technical Artist  
**Engine:** Unity 

Mount Roller Dispatch is a delivery game where the player moves between two upside-down cities.   
Available on: https://sarahno.itch.io/mount-roller-dispatch  

For this project, I used the **SideFX Labs Trace PSD File** tool to convert layered PSD map data into procedural city geometry inside Houdini. Roads, buildings, parks, and city regions were generated from image-based layout inputs authored in Photoshop.

<iframe
  style="width: 100%; aspect-ratio: 16 / 9; height: auto;"
  src="https://www.youtube.com/embed/3PbqBma-0yw?autoplay=1&mute=1&loop=1&playlist=3PbqBma-0yw&rel=0"
  title="On-Demand Terrain Streaming Demo"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
></iframe>

**Houdini procedural city tool**

The workflow focused on separating high-level city layout design from low-level procedural generation. Instead of manually building the environment, different PSD layers defined urban elements while Houdini handled the procedural reconstruction and spatial organization.

This kept the city editable at the design level while allowing rapid procedural iteration inside Houdini.

Focused on separating high-level city layout intent from low-level procedural generation.

<div class="image-row2">
  <img src="/portfolio/montreal-psd.png" alt="PSD file">
  <img src="/portfolio/game-dev-city-montreal-08.png" alt="Generated City">
</div>


<div class="image-row2">
  <img src="/portfolio/game-dev-city-montreal-09.png" alt="Buildings">
  <img src="/portfolio/game-dev-city-montreal-10.png" alt="Roads">
</div>