---
title: LiDAR (Point Cloud) Processing
description: 
tags: [Houdini, Geospatial, LiDAR, Procedural, Terrain]
cover: "/portfolio/data-lidar-pc-01.png"
category:
  - Terrain, 3
  - Geospatial, 3
coverBefore: "/portfolio/data-lidar-pc-04-hf.png"
coverAfter: "/portfolio/data-lidar-pc-01.png"
mediaPreview: "hover"
videoEmbed: ""
---

# Procedural Processing of LiDAR Point Clouds
This project explores a procedural workflow for processing LiDAR datasets and reconstructing terrain environments from raw point cloud data.

<BeforeAfterSlider
  before-src="/portfolio/data-lidar-pc-04-hf.png"
  after-src="/portfolio/data-lidar-pc-01.png"
  before-alt="Raw LiDAR Point Cloud"
  after-alt="Heightfield Reconstruction"
  height="360px"
  :initial="45"
/>


The dataset used in this experiment comes from the SwissSurface3D LiDAR dataset provided by Swisstopo, which contains high-resolution airborne laser scanning data covering Switzerland.

Dataset: SwissSurface3D
Provider: Swisstopo (Federal Office of Topography)
https://www.swisstopo.admin.ch/en/height-model-swisssurface3d

SwissSurface3D provides a high-resolution Digital Surface Model (DSM) generated from LiDAR measurements with sub-meter accuracy.

The dataset includes:
- terrain elevation
- vegetation
- buildings

## Processing Pipeline

The LiDAR processing pipeline used in this project follows a series of procedural steps.

The following diagram illustrates the procedural pipeline used to transform raw LiDAR data into structured terrain and environment representations. 

<div class="image-row1" style="--image-max-width: 150px; --image-max-width-mobile: 100%;">
  <img src="/diagrams/data-lidar-pipeline-01.png">
</div>

Each stage transforms the dataset into a more structured representation that can be used in simulation, visualization, or procedural generation systems.

## Classification

<BeforeAfterSlider
  before-src="/portfolio/data-lidar-pc-02-colored.png"
  after-src="/portfolio/data-lidar-pc-01.png"
  before-alt="Raw LiDAR Point Cloud"
  after-alt="Filtering"
  height="360px"
  :initial="45"
/>

- water → blue
- terrain → brown
- vegetation → green
- structures → yellow

The point cloud is classified into semantic categories including:
- water
- vegetation
- grounds
- builings

## Heightfield Reconstruction

<BeforeAfterSlider
  before-src="/portfolio/data-lidar-pc-04-hf.png"
  after-src="/portfolio/data-lidar-pc-01.png"
  before-alt="Raw LiDAR Point Cloud"
  after-alt="Heightfield Reconstruction"
  height="360px"
  :initial="45"
/>

This image shows the terrain heightfield reconstructed from LiDAR data.

Ground points extracted from the dataset are converted into a continuous heightfield representation, which provides a clean Digital Terrain Model (DTM).

This representation removes most vegetation and structural noise from the point cloud, allowing the underlying terrain morphology to become visible.

## Voxel Representation

<BeforeAfterSlider
  before-src="/portfolio/data-lidar-pc-03-voxel.png"
  after-src="/portfolio/data-lidar-pc-01.png"
  before-alt="Raw LiDAR Point Cloud"
  after-alt="Voxel Representation"
  height="360px"
  :initial="45"
/>

The reconstructed environment can also be converted into a voxel representation, which provides a grid-based spatial structure.

Voxel environments are useful for:
- simulation
- pathfinding
- robotics navigation
- destruction or physics systems
- machine learning input representations
