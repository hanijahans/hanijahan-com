---
title: Blog
description: "Blog posts by Hani Jahan about technical art, procedural tools, game development, and project devlogs."
---

<script setup>
import { data as posts } from '@theme/posts.data'
</script>

# Blog

<ul>
  <li v-for="p in posts" :key="p.url" style="margin: 0.5rem 0;">
    <a :href="p.url">{{ p.frontmatter?.title || p.title }}</a>
    <small v-if="p.frontmatter?.date"> — {{ new Date(p.frontmatter.date).toLocaleDateString() }}</small>
    </li>
</ul>
