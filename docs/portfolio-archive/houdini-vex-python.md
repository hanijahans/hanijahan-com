---
title: Houdini Programming (VEX, Expressions, Python)
description: Procedural programming examples in Houdini using VEX, expressions, and spatial geometry workflows.
tags: [Houdini]
cover: "/portfolio/houdini-vex-00.png"
category:
  - Portfolio, 5
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

## Houdini Expressions

1. **Randomized Value**  
a controlled, randomized value for every single primitive + remap it between 0.1 and 0.9 
```
fit01(rand(@primnum + ch("seed")), 0.1, 0.9)
```

2. **Attribute-Based Conditional Logics for Switch**  

- Hiding a node when a specific group contains no points. Use in a Switch node's input selector  
```
npoints("../../foreach_begin/inside_group") == 0
```

- Using string matching to drive procedural branching and switch behavior based on attribute values.  

<img src="/portfolio/houdini-expression-switch-condition-01.jpg" style="width:75%; height:auto;">

```
if(strmatch(chs("attrib_val"),"window"),1,0)

details("../attribpromote_wall_/","wall")
```

## VEX

1. **Procedural Floor Identification**   
Projecting geometry positions onto a directional axis to identify building floors procedurally.  

<img src="/portfolio/houdini-vex-identify-floors-01.png" style="width:30%; height:auto;">

```VEX
vector dir = normalize(chv("direction")); // Example: {0,1,0}
float height = chf("modular_height");

float safe_epsilon = 0.01;
float effective_height = height - safe_epsilon;

// More stable than directly using world-space Y
int floor_id = int(dot(@P, dir) / effective_height);

// Save as integer attribute
setprimattrib(0, "floor", @primnum, floor_id);

// Save as string attribute
string gname = sprintf("floor_%d", floor_id);
setprimattrib(0, "floor_s", @primnum, gname);

// Create primitive groups
setprimgroup(0, gname, @primnum, 1);
```

---

2. **Extracting Center Point**  
Extracting primitive center positions for procedural point generation and downstream operations.  
surface → point abstraction

<img src="/portfolio/houdini-vex-find-middle-pts-01.png" style="width:35%; height:auto;">

- Using Primitive Intrinsics
```VEX
// Get the center position of the current primitive
vector mid = primintrinsic(0, "center", @primnum);

// Create a point at that center
int pt = addpoint(0, mid);

// Remove the original primitive and its unused points
removeprim(0, @primnum, 1);
```

- Using UV Sampling
```VEX
// Sample primitive position at UV center
vector uvw = set(0.5, 0.5, 0);
vector mid = primuv(0, "P", @primnum, uvw);

// Create point
int pt = addpoint(0, mid);

// Remove original primitive
removeprim(0, @primnum, 1);
```

---

3. **Directional Surface Analysis**  
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

```VEX
//Directional Dot Product

// Get line position (center of input 1)
vector line_pos = getbbox_center(1);

// Get center of current primitive
vector prim_center = primintrinsic(0, "center", @primnum);

// Get vector from primitive to the line
vector to_line = normalize(line_pos - prim_center);
v@to_line = to_line; // this becomes the candidate for best_dir

// Get the primitive’s facing direction (normal)
// Get primitive center in UV space
vector uvw = {0.5, 0.5, 0.5};
vector center_pos = primuv(0, "P", @primnum, uvw);

// Sample point normal at closest point on primitive
vector n = normalize(primuv(0, "N", @primnum, uvw));

// Store how much this face is pointing toward the line
float facing_score = dot(n, to_line);
f@facing_score = facing_score;

if(facing_score>0) @Cd = chv("color1");
else if(facing_score<0) @Cd = chv("color2");
else @Cd = chv("color3");
```


## Python

**External Data → Procedural Geometry**  
Using Python inside Houdini to fetch external weather data, convert geographic coordinates into procedural point geometry, and attach dynamic metadata as attributes.

Useful for:
- external API integration
- metadata-driven workflows
- geo-spatial visualization
- procedural point generation
- real-world data ingestion


```python
import hou
import requests

node = hou.pwd()
geo = node.geometry()

# API_KEY = "your_key_here"  # Omitted for security - get from openweathermap.org

cities = [city.strip() for city in node.parm("city_list").eval().split(",")]

def create_point(city, lon, lat, temperature):

    pt = geo.createPoint()

    x = (180 + lon) * ch("scale_x")
    z = -(90 + lat) * ch("scale_z")

    pt.setPosition((x, 0, z))

    pt.setAttribValue("city", city)
    pt.setAttribValue("temperature", temperature)

def fetch_weather(city):

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

    data = requests.get(url).json()

    lon = data["coord"]["lon"]
    lat = data["coord"]["lat"]
    temp = data["main"]["temp"]

    create_point(city, lon, lat, temp)

for city in cities:
    fetch_weather(city)
```