---
title: Procedural Geospatial Terrain System
description: A unified system that ingests satellite, LiDAR, and OSM data to generate terrain and stream it in real time.
shortDescription: End-to-end modular geospatial terrain pipeline
tags: [Houdini, Unity, Geospatial, Terrain, LiDAR, OSM, Satellite]
cover: "/portfolio/geo-data-terrain-automated-houdini-unity-01.png"
category:
  - Portfolio, 0
coverBefore: "/portfolio/geo-data-terrain-mapping-mount-kilimanjaro-z12-01.png"
coverAfter: "/portfolio/geo-data-terrain-mapping-mount-kilimanjaro-z12-02.png"
mediaPreview: "hover"
videoEmbed: ""
---

<script setup>
import { allPortfolioItems } from '../data/portfolio'

const inputSlugs = [
  '/portfolio-archive/satellite-data-to-procedural-terrain-workflow',
  '/portfolio-archive/lidar-point-cloud-processing',
  '/portfolio-archive/openstreetmap-osm-geospatial-data'
]

const processingSlugs = ['/portfolio-archive/noise-mask-terrain-generation-system']

const outputSlugs = ['/portfolio-archive/satellite-data-to-procedural-terrain-workflow']

const integrationSlugs = ['/portfolio-archive/on-demand-terrain-streaming-houdini-unity-mapbox']

const optionalUrbanSlugs = ['/portfolio-archive/new-york-city-buildings-geospatial-analysis']

const bySlug = (slugs) => allPortfolioItems.filter((item) => slugs.includes(item.url ?? ''))

const inputProjects = bySlug(inputSlugs)
const processingProjects = bySlug(processingSlugs)
const outputProjects = bySlug(outputSlugs)
const integrationProjects = bySlug(integrationSlugs)
const optionalUrbanProjects = bySlug(optionalUrbanSlugs)
</script>

# Procedural Geospatial Terrain System

I build procedural terrain systems driven by real-world geospatial data (satellite, LiDAR, OSM), designed for scalable generation and real-time integration.

This page reframes individual experiments into one modular pipeline: **data sources → processing → generation → output**.

## System Diagram

```text
Data Sources
[Satellite] [LiDAR] [OSM]

        ↓

Processing
- Attribute extraction
- Mask generation
- Height / feature logic

        ↓

Generation
- Terrain synthesis
- Feature placement

        ↓

Output
- Heightmaps / masks
- Unity integration
- Streaming (Mapbox)
```

## 1) Data Inputs (Foundation)

The system ingests multiple real-world data sources. Each dataset is processed into structured attributes used for terrain generation.

- Satellite pipeline → [From Satellite Data to Procedural Terrain Workflow](/portfolio-archive/satellite-data-to-procedural-terrain-workflow)
- LiDAR processing → [LiDAR Point Cloud Processing](/portfolio-archive/lidar-point-cloud-processing)
- OSM data extraction → [OpenStreetMap (OSM) Geospatial Data](/portfolio-archive/openstreetmap-osm-geospatial-data)

<PortfolioGrid :items="inputProjects" :columns="3" />

## 2) Processing System (Core Logic)

Processing converts raw geospatial layers into structured terrain controls through:

- attribute extraction
- mask generation
- height and feature logic

This is the system "brain" that turns heterogeneous sources into coherent, art-directable terrain behavior.

<PortfolioGrid :items="processingProjects" :columns="1" />

## 3) Terrain Generation

Generation synthesizes terrain and places derived features using repeatable procedural rules.

**raw → structured → terrain**

This stage emphasizes reproducibility and parameter control, not one-off manual sculpting.

<PortfolioGrid :items="outputProjects" :columns="1" />

## 4) Output + Integration (Production Value)

The system outputs production-ready artifacts and runtime connections:

- heightmaps and masks for terrain assembly
- Unity integration for interactive environments
- Mapbox-based streaming for scalable delivery

This is the deployment layer that makes the system practical for simulation, world-building, and scalable runtime workflows.

<PortfolioGrid :items="integrationProjects" :columns="1" />

## Optional Urban Extension

The NYC buildings workflow is included as an optional extension only when framed as the **same system applied to urban geospatial data**.

<PortfolioGrid :items="optionalUrbanProjects" :columns="1" />

## Why this structure matters

This portfolio structure shows a reusable system architecture rather than isolated explorations. It directly supports roles in:

- parametric infrastructure
- simulation pipelines
- procedural tooling
