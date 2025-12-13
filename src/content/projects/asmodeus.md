---
title: "Asmodeus - Language Ecosystem"
excerpt: "Complete programming language ecosystem built from scratch in Rust. Custom bytecode Virtual Machine, Macro Assembler, Debugger, & LSP."
date: "2024-01-28"
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
---

# The Problem

Learning low-level programming and computer architecture is hard. Existing assembly languages like x86 or ARM are complex, have thousands of instructions, and require specialized hardware knowledge. Academic architectures like Machine W exist in Polish university curricula but lack modern tooling.

Oh, and I wanted to learn Rust.

So naturally, as my **first and only Rust project ever**, I decided to build... *an entire programming language ecosystem from scratch*. You know, the classic "Hello World" equivalent for learning a new language. 🙃

*"Just write a simple CLI tool to learn the syntax," they said. "Don't start with a compiler," they warned. Anyway...*

I wanted to create:
- A **complete language ecosystem** from scratch
- A **clean, educational architecture** that's approachable
- **Modern developer experience** with debugging, LSP, and good error messages
- A **production-quality Rust codebase** showcasing compiler engineering (while simultaneously learning Rust syntax)

# The Solution

**Asmodeus** is a complete assembly language toolchain inspired by the legendary **Machine W architecture** - a 16-bit educational computer used in Polish universities. But unlike academic simulators, Asmodeus provides a **production-grade developer experience**.

Did I overcomplicate a learning project? **Hell nah.**  
Was the borrow checker my friend? **It was my frenemy.**  
Would I do it again? **I already did. There's an LSP too.**

---

## :icon[Sparkles]{.text-yellow-400 .inline-block .mr-1 .mb-1} What Makes Asmodeus Special

### Complete Toolchain in Rust
Not just an assembler - a full compilation pipeline:
```
Source (.asmod) → Lexariel → Parseid → Hephasm → Asmachina → Execution
                  (Lexer)    (Parser)  (Assembler)  (VM)
```

*I gave each component a dramatic fantasy name. I regret nothing.*

### Polish-Inspired Mnemonics
A unique twist: instruction mnemonics come from Polish words:
- `POB` (Pobierz) → Load
- `ŁAD/LAD` (Ładuj) → Store  
- `DOD` (Dodaj) → Add
- `SOB` (Skok Bezwarunkowy) → Unconditional Jump
- `STP` (Stop) → Halt

*Finally, a programming language where my Polish keyboard layout is an advantage.*

### Named Components
Each crate has a thematic name:
| Crate | Function | 
|-------|----------|
| **Lexariel** | Lexical Analyzer | 
| **Parseid** | Parser | 
| **Hephasm** | Assembler | 
| **Asmachina** | Virtual Machine | 
| **Dismael** | Disassembler | 
| **Bugseer** | Debugger | 

*Naming things is the hardest problem in computer science. I chose to make it worse.*


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

## :icon[Code]{.text-cyan-500 .inline-block .mr-1 .mb-1} Code Examples

### Hello World (Character I/O)
```asm
; Echo program - reads and outputs character
start:
    WEJSCIE         ; Read character to AK
    WYJSCIE         ; Output AK
    STP             ; Halt

; Run with: asmod interactive echo.asmod
```

### Factorial Calculation
```asm
; Calculate 5! = 120
start:
    POB one         ; result = 1
    LAD result
    POB n           ; counter = 5
    LAD counter

loop:
    POB counter     ; if counter == 0, done
    SOZ done
    
    POB result      ; result *= counter
    MNO counter     ; (requires --extended)
    LAD result
    
    POB counter     ; counter--
    ODE one
    LAD counter
    
    SOB loop

done:
    POB result      ; output result (120)
    WYJSCIE
    STP

n:       RST 5
one:     RST 1
result:  RPA
counter: RPA
```

*This is 25 lines to calculate 5 factorial. Do not compare this to Python. I really hate that language.*

### Stack Operations
```asm
; LIFO demonstration
start:
    POB #10         ; Push 10
    SDP
    POB #20         ; Push 20
    SDP
    
    PZS             ; Pop 20
    WYJSCIE         ; Output: 20
    
    PZS             ; Pop 10  
    WYJSCIE         ; Output: 10
    
    STP
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

## :icon[FolderTree]{.text-amber-500 .inline-block .mr-1 .mb-1} Project Structure

```
asmodeus/                    (Cargo workspace)
├── src/                     # Main CLI application
├── lexariel/                # Lexical analyzer
├── parseid/                 # Parser (tokens → AST)
├── hephasm/                 # Assembler (AST → machine code)
├── asmachina/               # Virtual machine
├── dismael/                 # Disassembler
├── shared/                  # Shared types and utilities
├── examples/                # Example programs
│   ├── basic/
│   ├── arithmetic/
│   ├── extended_set/
│   └── io/
└── tests/                   # Integration tests
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

# Result

Asmodeus demonstrates **advanced compiler engineering** and **systems programming**:

- **Complete compilation pipeline** - Lexer → Parser → Assembler → VM
- **Rust workspace architecture** - 6 interconnected crates
- **Custom bytecode VM** - Full Machine W emulation
- **Interactive debugger** - Breakpoints, stepping, memory inspection
- **Macro preprocessor** - Parametric code generation
- **Disassembler** - Reverse engineering support
- **LSP integration** - Modern IDE experience for Neovim
- **Comprehensive error handling** - Line numbers, context, suggestions

This is my largest project - a **complete programming language ecosystem** built from the ground up. It showcases everything from low-level bit manipulation to high-level language design.

I was so fascinated by the Machine W architecture that I had to create that project. I really do not see any practical use case for this language, so let's just call it an educational purpose project.

**License:** MIT - use, learn, and extend freely!

---

*P.S. - If you ever need to calculate factorial in 25 lines of handwritten assembly with Polish mnemonics, I'm your guy. This is a very niche skill. I am aware.*

