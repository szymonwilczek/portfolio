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
links:
  - url: "https://szymon-wilczek.me/projects/vim-be-better"
    name: "Blog Article"
---

## Technical Implementation

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
