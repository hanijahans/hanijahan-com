---
# Layout: doc allows for the sidebar/outline. 'page' is for landing pages.
layout: doc
# Page Metadata
title: "Game Dev Blog 01 - Game Dev Lessons From Drawing: The 3-Step Structure"
date: 2025-12-28
author: Hani Jahan
description: "Game development mirrors drawing: prototype fast, rebuild structure ruthlessly, then polish only after clarity emerges."
# VitePress Sidebar/Outline control
outline: [2, 3] # Shows h2 and h3 in the sidebar
lastUpdated: true
editLink: false # usually false for personal blog posts
# Custom Taxonomy (good for custom theme logic)
series: Hani Jahan Blog
tags:
  - gamedev
  - indiegame
  - prototype
  - production

# HTML Head Injection for SEO & Social Sharing (Open Graph)
head:
  - - meta
    - name: keywords
      content: gamedev, indiegame, prototype, production, game design
  - - meta
    - property: og:title
      content: "Game Dev Lessons From Drawing: The 3-Step Structure"
  - - meta
    - property: og:description
      content: "Most indie games don’t fail because they lack polish. They fail because the developer skipped the hardest step."
---

# Game Dev Lessons From Drawing

Most indie games don’t fail because they lack polish. They fail because the developer skipped the hardest step.

While writing a new devlog for WorldLattice, I realized I was repeating a pattern I’d learned years ago as a 2D artist. The insight felt bigger than a devlog note, so I broke it out into this separate post in case it helps others.

## The 3-Step Structure

<div style="display:block; margin-bottom:10px;">
  <img src="/images/drawing-steps-00.jpg" width="600" />
</div>
Image from _Helpful Hints for Clean-Up_ by Jennifer Gwynne Oliver.

In my early 20s, I worked as a 2D artist, and there’s a universal pattern you learn when drawing:  
- **Step 1: Messy Sketch (Rough)** 
	Just to get the idea out of your head (Fig 1).  
	
- **Step 2: Clean Core Structure (Block out basic shapes)** 
	You redraw it—this time focusing strictly on the clean, core shapes (Fig 2).    
	
- **Step 3: Polish (Final Clean-up)** 
	Only _after that_ do you add the details (Fig 3).  

Here is the catch: while a fellow artist might look at that Step 1 mess and understand what you're trying to achieve, a non-artist friend won't get it. They just see a pile of random lines. It isn't until the later steps that they start to see the idea. By the final version, they finally recognize what you saw in your head from the very beginning. 

I believe it almost works the exact same way in game development. The prototype is your messy sketch. Fellow developers—and maybe the niche crowd on itch.io—can look past the rough edges to see the vision. But a broader audience, like on Steam, needs clarity. To reach them, you have to commit to Step 2 and turn that mess into a solid structure they can actually recognize.

Here’s how the drawing stages map to game dev:  
- **Step 1: Messy Sketch → Prototype / Itch.io Build**  
- **Step 2: Core Structure → Steam Demo**  
- **Step 3: Polish → Released Game**  

## **Step 1: Messy Sketch → Prototype / Itch.io Build**

<div style="display:block; margin-bottom:10px;">
  <img src="/images/drawing-steps-01.jpg" width="200" />
</div>  

- **Analogy:** This is your rough, ugly sketch—just dumping the idea out of your head. It looks like a mess to outsiders.
    
- **Game Dev Equivalent:** Prototype phase. Pile of placeholders, broken UX, half-baked systems. Publish it on itch.io or somewhere that _rewards_ raw ideas, not polish.
    
- **Goal:** Idea validation. Is there a spark here or not?
    
- **Audience:** Fellow devs, niche players who can see through chaos and find the core.
    
- **Brutal Truth:** If your idea only works when polished, question the core idea.
    
- **What NOT to do:** Don’t waste time on polish, onboarding, tutorials, or balance that doesn't serve the core of your idea.


## Step 2: Core Structure → Steam Demo

<div style="display:block; margin-bottom:10px;">
  <img src="/images/drawing-steps-02.jpg" width="200" />
</div>  

- **Analogy:** Now you redraw, focus on clean, bold lines. The shape must be clear and readable.
    
- **Game Dev Equivalent:** This is your demo that proves the core loop. Steam demo or a real “test” version, not just for devs.
    
- **Goal:** Clarity and trust. Can people _instantly_ tell what your game is and how it works?
    
- **Audience:** Regular players. No more “imagine if…”—they judge what’s there.
    
- **Brutal Truth:** If your structure is fuzzy, people bounce. You don’t get a second look. Most projects die here because people skip the pain of this step.
    
- **What NOT to do:** No feature creep, no padding. If you keep adding systems, you're just scribbling over bad line art hoping to hide the mistakes. **You cannot solve a boring structure with more features.** If the loop isn't fun now, complex systems won't save it. Re-evaluate the core.


## Step 3: Polish → Full Release

<div style="display:block; margin-bottom:10px;">
  <img src="/images/drawing-steps-03.jpg" width="200" />
</div>  

- **Analogy:** Now you finally add detail—shading, rendering, all the sparkle that brings the drawing to life.
    
- **Game Dev Equivalent:** Full game release—everything finished, layered, and optimized.
    
- **Goal:** Depth, polish, longevity. This is where the game earns loyalty (and money).
    
- **Audience:** Paying customers. They want value, not promises.
    
- **Brutal Truth:** If you polish before your structure is solid, you’re just decorating a question mark. No amount of “juice” will fix a broken core.
    
- **What NOT to do:** Don’t go back and rework fundamentals at this stage. Don’t drown in details before the bones are strong. Polish should _amplify_ structure, not try to replace it.

## Summary

  `Sketch → Core Structure → Polish`
  
Most of the pain in game dev comes from skipping Step 2. Prototype fast, but then be ruthless about rebuilding the core before you chase polish. If the game isn’t clear and fun in its “clean line art” phase, no amount of shaders, particles, or juice will save it.

| **Art Stage**         | **Game Dev Stage**      | **Audience**               | **Primary Question**                         | **What You Must Prove**     | **What You Must NOT Do**       |
| --------------------- | ----------------------- | -------------------------- | -------------------------------------------- | --------------------------- | ------------------------------ |
| **1. Messy Sketch**   | **Prototype (itch.io)** | Fellow devs, niche players | _Is this idea even interesting?_             | The core fantasy exists     | Polish, tutorials, balance     |
| **2. Core Structure** | **Steam Demo**          | General players            | _Do I clearly understand what this game is?_ | Core loop clarity & trust   | Feature creep, content padding |
| **3. Polish**         | **Full Release**        | Paying customers           | _Is this worth my time & money long-term?_   | Depth, stability, retention | Redesigning fundamentals       |

If this way of thinking resonates — or annoys — you’re welcome to continue the conversation in my Discord: https://discord.gg/htvbShKmWN. 
