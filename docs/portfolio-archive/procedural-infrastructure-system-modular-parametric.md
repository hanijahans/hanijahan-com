---
title: Procedural Infrastructure System (Modular & Parametric)
description: A modular, parametric infrastructure framework for pipes and utility assemblies designed for real-time simulation and scalable network assembly.
shortDescription: Modular parametric infrastructure for real-time assembly
tags: [Houdini, Procedural, Modular, Parametric, Infrastructure, Simulation]
cover: "/portfolio/artist-friendly-toolset.png"
category:
mediaPreview: "hover"
videoEmbed: ""
---

<script setup>
import { allPortfolioItems } from '../data/portfolio'

const coreDemoSlugs = ['/portfolio-archive/procedural-utility-tools-collection']
const extensionSlugs = ['/portfolio-archive/procedural-modular-building-system']

const bySlug = (slugs) => allPortfolioItems.filter((item) => slugs.includes(item.url ?? ''))

const coreDemoProjects = bySlug(coreDemoSlugs)
const extensionProjects = bySlug(extensionSlugs)
</script>

# Procedural Infrastructure System (Modular & Parametric)

I build modular, parametric infrastructure systems (pipes, utility networks, mechanical assemblies) designed for real-time simulation and scalable assembly.

## Hero (5-second impact)

This is a **system-first** workflow, not one-off modeling:

- parametric controls drive asset behavior
- modular parts interoperate through shared rules
- outputs stay stable for real-time runtime assembly

If the system logic is weak, the whole assembly collapses.

## System Diagram

```text
Core System
[Parametric Controls]
- Size / scale
- Variations
- Condition (clean → damaged)

        ↓

Modular Components
- Pipes
- Valves
- Junctions

        ↓

Connection Logic
- Snap points
- Socket rules
- Orientation constraints

        ↓

Assembly
- Interoperable parts
- Scalable networks
- Real-time ready output
```

This is the technical boundary between a reusable infrastructure framework and isolated asset production.

## Parametric System

Each asset is driven by adjustable parameters, not static modeling.

- radius and length controls
- variation sliders for shape/profile
- condition states (damage, rust, aging)

Where possible, expose controls through clear Houdini HDA parameters for art direction and repeatability.

## Modular Components

Assets are designed as interoperable building blocks.

- straight pipe segments
- elbows and T-junctions
- valve units and support pieces

**Primary demo focus:** one strong pipe system proving modular interchangeability.

<PortfolioGrid :items="coreDemoProjects" :columns="1" />

## Connection Logic

Components connect through consistent snapping and deterministic rules.

- snap points and sockets
- directional and orientation constraints
- standardized scale and compatibility classes

This connection layer is the highest-value part of the system because it enables fast layout without manual rework.

## Output & Integration

Systems are designed for real-time use and flexible assembly.

- clean topology
- game-engine-ready outputs
- reusable assembly configurations

Optional: Unity-ready export presets if runtime integration is part of the production target.

## Optional Extension: Beyond Pipes

The same framework can extend to utility poles, transformers, and broader urban infrastructure kits.

This communicates that the work is not “a pipe asset set,” but a transferable procedural framework.

<PortfolioGrid :items="extensionProjects" :columns="1" />

## What this page should visibly prove

Minimum deliverable:

- one strong pipe-system example that clearly shows:
  - parameters
  - variations
  - connections
- one small extension (for example a simple pole or box module) to prove cross-domain scalability
