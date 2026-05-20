---
title: "Asmodeus - Language Ecosystem"
excerpt: "Complete programming language ecosystem built from scratch in Rust. Custom bytecode Virtual Machine, Macro Assembler, Debugger, & LSP."
date: "2025-07-04"
tags:
  - "Rust"
  - "Assembly"
thumbnail: "/images/asmod/installer.png"
carousel:
  - "/images/asmod/help.png"
  - "/images/asmod/examples.png"
  - "/images/asmod/hello.png"
  - "/images/asmod/bugseer.png"
  - "/images/asmod/lsp.png"
github: "https://github.com/asmod-lang/asmodeus"
links:
  - url: "https://github.com/asmod-lang/asmodeus-lsp"
    name: "LSP Repository"
  - url: "https://szymon-wilczek.me/blog/asmodeus"
    name: "Blog Article"
---

## :icon[Pickaxe]{.text-gray-400 .inline-block .mr-1 .mb-1} Machine W Architecture

Asmodeus emulates a classic 16-bit architecture:

### Memory Model
- **2048 words** of 16-bit memory (addresses 0-2047)
- Stack grows **downward** from address 2047
- Harvard-style separation of code and data

### Register Set
| Register | Size | Purpose |
|----------|------|---------|
| `AK` | 16-bit | Accumulator |
| `L` | 11-bit | Instruction counter |
| `AD` | 11-bit | Address register |
| `KOD` | 5-bit | Opcode register |
| `WS` | 11-bit | Stack pointer |
| `R0-R7` | 16-bit | General purpose |

### Addressing Modes
```asm
POB 100      ; Direct: memory[100]
POB #42      ; Immediate: literal 42
POB [100]    ; Indirect: memory[memory[100]]
POB R1       ; Register: value in R1
POB [R1]     ; Register indirect: memory[R1]
```

---

## :icon[BookOpen]{.text-blue-500 .inline-block .mr-1 .mb-1} Instruction Set

### Core Instructions

| Category | Instructions | Description |
|----------|--------------|-------------|
| **Arithmetic** | `DOD`, `ODE` | Add, Subtract |
| **Memory** | `POB`, `ŁAD`/`LAD` | Load, Store |
| **Control** | `SOB`, `SOM`, `SOZ`, `STP` | Jump, Jump if negative, Jump if zero, Halt |
| **Stack** | `SDP`, `PZS` | Push, Pop |
| **I/O** | `WEJSCIE`/`WPR`, `WYJSCIE`/`WYJ` | Input, Output |

### Extended Instruction Set
Enable with `--extended` flag:
```asm
MNO addr    ; Multiply AK by memory[addr]
DZI addr    ; Divide AK by memory[addr]
MOD addr    ; AK = AK % memory[addr]
```

*Multiplication and division are optional because Machine W was designed in an era when those were considered "luxury" operations.*

### Macro System
Define reusable code blocks:
```asm
MAKRO push_and_add param1 param2
    SDP
    POB param1
    DOD param2
KONM

start:
    push_and_add 100 200
    STP
```

---

## :icon[Bug]{.text-green-400 .inline-block .mr-1 .mb-1} Bugseer - Interactive Debugger

A powerful TUI debugger for step-by-step execution:

```bash
asmod debug program.asmod
```

### Debugger Commands
| Command | Action |
|---------|--------|
| `s` / `step` | Execute single instruction |
| `c` / `continue` | Run until breakpoint |
| `d` / `display` | Show machine state |
| `b ADDRESS` | Set breakpoint |
| `rb ADDRESS` | Remove breakpoint |
| `m START END` | Dump memory range |
| `q` / `quit` | Exit debugger |

### Example Session
```
(bugseer)> b 5          # Breakpoint at address 5
(bugseer)> c            # Continue execution
(bugseer)> d            # Display registers
┌─────────────────────────────────┐
│  AK: 0x002A  L: 0005  WS: 2047  │
│  R0: 0000  R1: 0000  R2: 0000   │
└─────────────────────────────────┘
(bugseer)> m 0 10       # Memory dump
(bugseer)> s            # Step
```

*I named the debugger "Bugseer" because it sees bugs. I refuse to pretend that's an extravagant name.*

---

## :icon[Wrench]{.text-gray-400 .inline-block .mr-1 .mb-1} Language Server Protocol (LSP)

For the complete IDE experience, I built a separate **LSP server** for Neovim integration. Yeah, also in Rust (so I've just commited a lie at the start of this article that I've only created one project in Rust. In fact I've created 2).

**Repository:** [asmod-lang/asmodeus-lsp](https://github.com/asmod-lang/asmodeus-lsp)

### Features
-  Syntax highlighting :icon[Check]{.text-green-400 .inline-block .ml-2}
-  Error diagnostics in real-time :icon[Check]{.text-green-400 .inline-block .ml-2}
-  Go to definition for labels :icon[Check]{.text-green-400 .inline-block .ml-2}
-  Hover documentation for instructions :icon[Check]{.text-green-400 .inline-block .ml-2}
-  Auto-completion for mnemonics :icon[Check]{.text-green-400 .inline-block .ml-2}

*Because if you are going to suffer writing assembly, you probably want autocompletion while doing it, right?*

### Neovim Setup
```lua
-- lazy.nvim configuration
{
  'neovim/nvim-lspconfig',
  config = function()
    require('lspconfig').asmodeus_lsp.setup({
      cmd = { 'asmodeus-lsp' },
      filetypes = { 'asmod', 'asmodeus' },
    })
  end
}
```

---

## :icon[Terminal]{.text-purple-500 .inline-block .mr-1 .mb-1} CLI Usage

```bash
# Run assembly program
asmod run program.asmod

# Assemble to binary
asmod assemble program.asmod -o program.bin

# Disassemble binary back to source
asmod disassemble program.bin

# Interactive debugger
asmod debug program.asmod

# Real-time character I/O mode
asmod interactive program.asmod

# Enable extended instructions
asmod run --extended program.asmod

# Verbose compilation output
asmod run --verbose --debug program.asmod
```

---

## Tech Stack

| Component | Technologies |
|-----------|-------------|
| **Language** | Rust (100%) |
| **Build** | Cargo workspace, multi-crate |
| **Parsing** | Custom recursive descent |
| **VM** | Stack-based 16-bit emulator |
| **LSP** | tower-lsp, async runtime |
| **Testing** | Rust test framework, integration tests |
