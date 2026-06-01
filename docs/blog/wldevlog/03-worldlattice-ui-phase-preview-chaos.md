---
series: WorldLattice Devlog
title: WorldLattice Devlog 03 - I Deleted Most of the UI… and the Game Got Better
description: "A WorldLattice devlog about cutting back the UI, improving playability, and taming a chaotic Phase Preview feature."
date: 2025-11-26
tags:
  - worldlattice
  - devlog
  - procedural-generation
---

# I Deleted Most of the UI… and the Game Got Better.

## **Cutting the UI Down to the Bone**

The last two weeks were all about **UI/UX cleanup**.  
WorldLattice’s core systems finally behave, so it was time to make the whole thing actually _usable_. Because… let’s be honest: the old UI was painful. Functional, yes. Pleasant? Absolutely not.

Townscaper is one of my favorite references — it’s almost pure screen-space beauty with barely any UI. WorldLattice can’t go that minimal because my mechanics need a bit of scaffolding, but I realized I definitely didn’t need _as much_ UI as I had.

So I did something brutal:  
I **hid everything**.

Then I slowly brought elements back **only when I absolutely needed them to play**.  
If I could operate without a button, it didn’t come back.

The difference is night and day. It still needs more passes, but now it finally feels like the game is trying to help you rather than fight you.


## **Phase Preview Ate My Week Alive**

I added a new feature called **Phase Preview**, and wow… I underestimated how chaotic it would be.

<div style="display:block; margin-bottom:10px;">
  <img src="./devlog03-screenshot01.jpg" width="500" />
</div>

**Phase Preview** = a tiny thumbnail of the _other_ phase  
→ When you’re Painting, you see a tiny preview of your last Generated world.  
→ When you’re Generating, you see a tiny preview of your painted layout.  
(Like the little image in the bottom-right of the screenshot below.)

Simple idea.  
Painful execution.

Everything that could break… did.  
Camera issues, wrong roots, grid lines rendering instead of tiles, timing problems — it all went south.  
It ate days I did _not_ plan to spend.


## **Phase Preview Wasn’t the UX Savior I Imagine**

I expected Phase Preview to be a **huge clarity booster**, but after playtesting, I noticed something funny:

It helped, but…  
**not nearly as much as I imagined.**

Turns out players already mentally keep track of what phase they’re in.  
Phase Preview is useful, but not a dramatic UX revolution.  
(Still worth keeping though — it adds a nice sense of continuity between phases.)


## **Time to Stop Hiding and Start Sharing**

I think WorldLattice is finally at a point where I can start sharing **tiny bits** of it publicly — short GIFs, small clips, little posts.

And yes… I’m scared.  
(Which is exactly why I should probably do it.)

**So… here’s me practicing in my little safe bubble before I face the real world —**  
just here, on **my devlog.**
<video 
  src="./WL-devlog-03.mp4"
  controls
  autoplay
  loop
  muted
  playsinline
  style="width:100%; border-radius: 12px;">
</video>


## **Be Brutal: Is This UI Idea Dumb?**

Do you think "Phase Preview" actually makes sense visually when you see it?  
Would you want a clearer indicator between the two phases?  
Or is this enough?

If you have ideas, feedback, or just wanna say "Hi!" — come join the WorldLattice Discord.  
It’s small, cozy, and I’m always there. Email works too!


**— Hani Jahan**  
_WorldLattice Project_