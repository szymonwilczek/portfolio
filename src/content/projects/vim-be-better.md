---
title: "Vim Be Better"
excerpt: "A comprehensive gamified training plugin for Neovim written in Lua. It goes beyond basic movements, offering advanced drills for Vim grammar, registers, macros, and code formatting patterns."
date: "2025-06-21"
tags:
  - "Lua"
  - "Neovim API"
thumbnail: "/images/vim/landing_screen.png"
carousel:
  - "/images/vim/landing_screen.png"
  - "/images/vim/example_game.png"
  - "/images/vim/end_screen.png"
github: "https://github.com/szymonwilczek/vim-be-better"
---

# The Problem

Learning Vim is notoriously difficult. The steep learning curve often discourages newcomers, and even experienced users frequently stick to a small subset of commands, never fully leveraging Vim's powerful motion and text manipulation capabilities. Existing training tools like `vim-tutor` are static and boring, while real-world practice doesn't provide the focused, repetitive drilling needed to build muscle memory.

I noticed that ThePrimeagen's [vim-be-good](https://github.com/ThePrimeagen/vim-be-good) plugin was a great starting point, but it only covered basic movements like `hjkl` and relative jumps - barely scratching the surface of what Vim can do.

# The Solution

I forked the original plugin and transformed it into a comprehensive training system featuring **25+ different games across 8 categories**. The plugin now covers everything from basic navigation to advanced features like macros, text objects, and regex substitutions.

Did I have fun making it? **Absolutely.**  
Am I now insufferable about Vim at parties? **Rarely, but sometimes...**

## Game Categories

| Category | Focus |
|----------|-------|
| 🎯 **Navigation** | `f/F/t/T` motions, word boundaries, bracket jumping, visual precision |
| ✂️ **Text Objects** | `iw`, `aw`, `is`, `ip`, block editing with `ci{` |
| 🔄 **Substitution** | Basic `:s` commands, regex patterns, global replace |
| 📝 **Formatting** | Indentation (`>>`, `<<`, `=`), case conversion, line joining |
| 🔢 **Numbers** | Increment/decrement with `<C-a>`/`<C-x>`, number sequences |
| 🏗️ **Advanced** | Macro recording, dot repeat, code folding, comment toggling |
| 🎪 **Challenges** | Speed editing, refactor races, vim golf |
| 📚 **Classics** | Original games: words, hjkl, relative, whackamole, snake |

## Progressive Difficulty System

One of the key additions is a **6-tier difficulty system** that guides learners from complete beginners to Vim masters:

```
noob → easy → medium → hard → nightmare → tpope
```

Each level progressively removes hints, increases complexity, and demands greater efficiency. The highest level, *tpope*, is named after the legendary Vim plugin author Tim Pope - a benchmark for true mastery.

*Spoiler: I've never beaten tpope difficulty. Tim Pope isn't human, he's a vim motion incarnate.*

## Example Challenge

Here's what a vim-golf challenge looks like:

```vim
Challenge: Add semicolon (Par: 2 keystrokes)

console.log('hello')

Expected: console.log('hello');
Optimal Solution: A; (not visible of course until the end of the task)

Scoring: 🏆 Hole-in-one (2) | 🥇 Eagle (<2) | 🥈 Birdie (2) | 🥉 Par (≤5)
```

The scoring system is designed to make you feel inadequate. *Just like real golf, but faster.*

# Technical Implementation

The plugin is written entirely in **Lua** and leverages the Neovim API for seamless integration. Key technical aspects:

- **State management** - Each game maintains its own state machine for tracking progress, difficulty, and scoring
- **Dynamic content generation** - Challenges are procedurally generated to ensure variety
- **Real-time feedback** - Instant visual feedback on correct/incorrect inputs
- **Logging system** - Built-in debugging with `vim.g.vim_be_better_log_file`

```lua
-- Example configuration with lazy.nvim
{
  'szymonwilczek/vim-be-better',
  config = function()
    vim.g.vim_be_better_log_file = 1 -- optional, if you want to see some logs
  end
}
```

*Pro tip: Start on "easy". Your ego will thank you.*

# Result

It's now a comprehensive Vim training suite that I use daily to keep my skills sharp.

Whether you're just starting your Vim journey or looking to master advanced motions, vim-be-better provides structured, gamified practice that actually makes learning fun.

**Try it yourself in your nvim: (after the installation)** 
```vim
:VimBeBetter
```

---

*P.S. - Side effects may include: involuntary `:wq` attempts in other text editors, judging people who use mice, and a sudden urge to configure everything in Lua. And I'm definetly not even a Patient 0.*

