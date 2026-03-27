---
title: Superformula
description: Structural exploration of emergent form using Johan Gielis’ superformula.
category: Algorithmic
categoryOrder: 4
order: 1
tags: [Houdini, Algorithmic Design]
---

# Superformula

![Preview](/portfolio/superformula-01.png)

The **superformula** is a compact mathematical system capable of generating a wide spectrum of forms—from smooth botanical silhouettes to sharp geometric stars and shell-like structures.

I approached this equation not as decoration, but as a **study of structural emergence**:
how minimal parametric rules unfold into rich visual diversity.

## Mathematical form

A common polar expression is:

[
r(phi) = ( |cos(m·phi/4)/a|^n2 + |sin(m·phi/4)/b|^n3 )^(-1/n1)
]

Key parameters:

* **m** → rotational symmetry
* **a, b** → axis scaling
* **n₁, n₂, n₃** → curvature, sharpness, and continuity

Sampling (\phi \in [0, 2\pi]) and converting to Cartesian space:

* (x = r \cos\phi)
* (y = r \sin\phi)

produces a closed contour for each parameter configuration.

## Procedural exploration

Rather than targeting predefined shapes, the focus is on **exploring parameter space**:

1. Systematic sweeps to map families of forms
2. Rejection of degenerate or unstable solutions
3. Layering and temporal interpolation between states
4. Observation of transitions where structure appears or collapses

This shifts the process from drawing shapes
→ to **discovering behaviors inside a system**.

## Why this matters

This experiment reflects a central idea in my work:

> **Complex visual structure can emerge from extremely simple rules.**

The superformula becomes a minimal laboratory for studying:

* emergence
* symmetry breaking
* continuity vs. fragmentation
* control vs. unpredictability

These questions extend beyond graphics into
**scientific visualization, generative design, and procedural modeling**.
