---
title: Houdini Programming (VEX, Expressions, Python)
description: Procedural programming examples in Houdini using VEX, expressions, and spatial geometry workflows.
tags: [Houdini]
cover: "/portfolio/houdini-expression-switch-condition-01.jpg"
category:
mediaPreview: ""
videoEmbed: ""
---

# Houdini Programming (VEX, Expressions, Python)

A collection of small procedural logic examples and geometry-processing snippets used in Houdini workflows.

These examples focus on:
- attribute-driven logic
- spatial reasoning
- procedural grouping
- directional analysis
- geometry queries
- artist-friendly procedural control

---

**Attribute-Based Conditional Logic**  
Using string matching to drive procedural branching and switch behavior based on attribute values.  

switch if condition with string  

<img src="/portfolio/houdini-expression-switch-condition-01.jpg" style="width:75%; height:auto;">

```
if(strmatch(chs("attrib_val"),"window"),1,0)
```

```
details("../attribpromote_wall_/","wall")
```

---  

**Procedural Floor Identification**   
Projecting geometry positions onto a directional axis to identify building floors procedurally.  

<img src="/portfolio/houdini-vex-identify-floors-01.png" style="width:30%; height:auto;">

```
vector dir = normalize(chv("direction")); // Example: {0,1,0}
float height = chf("modular_height") - 0.01;

// More stable than directly using world-space Y
int floor_id = int(dot(@P, dir) / height);

// Save as integer attribute
setprimattrib(0, "floor", @primnum, floor_id);

// Save as string attribute
string gname = sprintf("floor_%d", floor_id);
setprimattrib(0, "floor_s", @primnum, gname);

// Create primitive groups
setprimgroup(0, gname, @primnum, 1);
```

---

**Primitive Midpoint Extraction**  
Extracting interpolated primitive center positions for procedural point generation and downstream operations.  

<img src="/portfolio/houdini-vex-find-middle-pts-01.png" style="width:35%; height:auto;">

```
vector mid = primuv(0, "P", @primnum, set(0.5, 0.5, 0));
addpoint(0, mid);
removeprim(0, @primnum, 1);
```

```
vector uvw = set(0.5, 0.5, 0);
vector mid = primuv(0, "P", @primnum, uvw);
int pt = addpoint(0, mid);
removeprim(0, @primnum, 1);
```

---

**Directional Surface Analysis**  
Measuring how much a surface is facing toward a target direction using vector dot products.  
Where is this surface pointing?  

<img src="/portfolio/houdini-vex-face-toward-target-01.png" style="width:40%; height:auto;">

1 = fully facing the target  
0 = side-facing  
-1 = facing away  

Useful for:
- directional masking
- facade selection
- procedural placement
- visibility analysis
- gameplay-aware generation

```
//Directional Dot Product

// Get line position (center of input 1)
vector line_pos = getbbox_center(1);

// Get center of current primitive
vector prim_center = primintrinsic(0, "center", @primnum);

// Get vector from primitive to the line
vector to_line = normalize(line_pos - prim_center);
v@to_line = to_line; // this becomes the candidate for best_dir

// Get the primitive’s facing direction (normal)
vector n;
if (hasprimattrib(0, "N")) {
    n = prim(0, "N", @primnum);
} else {
    n = normalize(@N); // If normals exist
}

// Store how much this face is pointing toward the line
float facing_score = dot(n, to_line);
f@facing_score = facing_score;

if(facing_score>0) @Cd = chv("color1");
else if(facing_score<0) @Cd = chv("color2");
else @Cd = chv("color3");
```