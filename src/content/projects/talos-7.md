---
title: "Talos 7 - The Ultimate SudoPad"
excerpt: "Hardware and software ecosystem for a custom programmable keyboard."
date: "2025-12-01"
tags:
  - "Embedded C"
  - "TypeScript"
  - "RP2040"
thumbnail: "/images/talos/landing.png"
carousel:
  - "/images/talos/landing.png"
  - "/images/talos/connection.png"
  - "/images/talos/configurator.png"
  - "/images/talos/script.png"
  - "/images/talos/sequence.png"
  - "/images/talos/save.png"
  - "/images/talos/talos_sch.png"
  - "/images/talos/talos_brd.png"
github: "https://github.com/szymonwilczek/talos-7"
links:
  - url: "https://talos-7.vercel.app"
    name: "Talos Configurator"
---

# The Problem

Commercial macro pads like Elgato Stream Deck or Razer keypads share a common flaw: **they require heavy background software** (Synapse, iCUE, Stream Deck app) to function. Switch computers? Install drivers. Use Linux? Good luck with compatibility.

*"But why build your own macropad?" they asked. "Just buy a Stream Deck, it's useless." they said. And yet here we are, ordering 40$ worth of PCBs from China.*

I wanted a device that:
- Works on **any computer** without drivers
- Stores configuration **on the device itself**
- Supports **advanced automation** beyond simple key presses
- Can be **built from scratch** with affordable components

# The Solution

**Talos 7** is the ultimate open-source `SudoPad*`: 7-key programmable macro keyboard built on the **Raspberry Pi Pico (RP2040)**. 

*Professional. Driverless. Infinite Possibilities.*

Once configured via the web interface, you can plug it into any computer (Windows, macOS, Linux), and it **just works**. No drivers. No background agents. Pure hardware emulation.

Is it cheaper than buying a Stream Deck? **After you count the hours spent? No.**  
Is it more satisfying? **Immeasurably yes.**

`*`Yes, I appropriated two names perfectly: Talos, as the first Greek automaton *Symbolism is a powerful key in IT naming.* I came up with the second one (**SudoPad**) myself, I didn't do any market research, so I'm not sure if anyone has named something like that before, but if not, that's nice - I'm the first. 

---

## Core Features

### :icon[Plug]{.text-green-500 .inline-block .mr-1 .mb-1} Truly Driverless
Everything runs on the device itself. Your configuration is stored in onboard flash memory - survive reboots, survive OS reinstalls, survive switching PCs. 

This thing is truly resilient.

### :icon[Monitor]{.text-blue-500 .inline-block .mr-1 .mb-1} Hybrid HID Device
Talos 7 doesn't just pretend to be a keyboard. It simultaneously acts as:
- :icon[Keyboard]{.text-gray-400 .inline-block .mr-1 .mb-1} **Keyboard** - standard key presses
- :icon[Mouse]{.text-gray-400 .inline-block .mr-1 .mb-1} **Mouse** - cursor movement, clicks, scroll
- :icon[Music]{.text-gray-400 .inline-block .mr-1 .mb-1} **MIDI Controller** - notes and CC for DAWs/OBS
- :icon[RadioReceiver]{.text-gray-400 .inline-block .mr-1 .mb-1} **Serial Device** - for configuration via Web Serial API

*Yes, it's four devices in a trenchcoat. It works surprisingly well.*

### :icon[Tv]{.text-cyan-500 .inline-block .mr-1 .mb-1} OLED Dashboard
A 128×64 pixel SSD1306 display provides real-time feedback:
- Current layer name and icon
- Active macro indicators
- Connection status

### :icon[Globe]{.text-purple-500 .inline-block .mr-1 .mb-1} Web Configurator
No software to install! Configure directly in your browser:
1. Open [talos-7.vercel.app](https://talos-7.vercel.app)
2. Connect via Web Serial API (Chrome/Edge)
3. Customize layers and macros
4. Save directly to device memory

*Web Serial API is witchcraft and I refuse to believe otherwise.*

### :icon[Layers]{.text-orange-500 .inline-block .mr-1 .mb-1} 4-Layer System
Switch between different macro sets on the fly. Each layer can have completely different configurations - perfect for switching between gaming, streaming, coding, and productivity.

---

## :icon[BookA]{.text-blue-500 .inline-block .mr-1 .mb-1} Macro Dictionary

Talos 7 supports **8 distinct action types**:

| Type | Description | Use Case |
|------|-------------|----------|
| **Key Press** | Single key simulation | Mute Discord (F13), screenshot |
| **Key Sequence** | Up to 3 keys with modifiers | `Ctrl+Shift+Esc`, `Win+Shift+S` |
| **Text String** | Auto-type text (32 chars) | Email signature, `git push` |
| **Layer Toggle** | Cycle through layers | Switch contexts |
| **Mouse Control** | Move, click, scroll | AFK prevention, auto-clickers |
| **Script Engine** | Cross-platform BadUSB | Run shell scripts on host |
| **MIDI Note** | Note On/Off signals | OBS scenes, DAW drums |
| **MIDI CC** | Control Change values | Lightroom exposure, volume |

### :icon[Scroll]{.text-orange-300 .inline-block .mr-1 .mb-1} Script Engine - Power User Feature

The most powerful feature. Talos acts as a **BadUSB device** to inject and execute complex scripts:

```
1. Talos opens terminal (defaults to Win+R or Ctrl+Alt+T)
2. Types a temporary script to /tmp or %TEMP%
3. Executes the script
4. Deletes it immediately
```

**Platform-aware**: Define separate scripts for Windows, Linux, and macOS on the same button!

Use cases: `docker-compose up -d`, SSH into server, batch file operations.

*Yes, this is technically a rubber ducky. No, I'm not responsible for what you do with it. Please don't hack your IT department. Or do, I'm not your mom.*

---

## :icon[Wrench]{.text-gray-400 .inline-block .mr-2} Hardware Architecture

Built on the accessible and powerful **Raspberry Pi Pico (RP2040)**.

### Bill of Materials

This BOM is purely just my configuration that I use in my crafted project. Feel free to change anything, since the Khalil switch sockets can be switched / handle most of the switches on the markets!

| Component | Specification |
|-----------|---------------|
| **MCU** | Raspberry Pi Pico (RP2040) |
| **Display** | SSD1306 OLED 0.96" (SPI) |
| **Switches** | 7× Cherry MX Red / Akko Black |
| **Keycaps** | Keychron compatible |
| **LEDs** | 7× SMD 0805 + 330 & 220Ω resistors |
| **Connection** | Micro-USB data cable |

### Wiring Diagram

```
┌─────────────────────────────────┐
│         Raspberry Pi Pico       │
│                                 │
│  GPIO 0-6 ──► 7× Mechanical SW  │
│  GPIO 16-19 ──► SSD1306 OLED    │
│  GPIO 20-26 ──► Status LEDs     │
│                                 │
│  USB ──► HID + Serial + MIDI    │
└─────────────────────────────────┘
```

*I drew this diagram in ASCII art because real EDA tools are for people who don't hate themselves.*

---

## :icon[Bot]{.text-cyan-500 .inline-block .mr-2} DevOps: Hephaestus

The repository is managed by **Hephaestus** - an automated GitHub Actions workflow.

*Named after the Greek god of craftsmen and blacksmiths. Because if I'm going to overengineer something, I'm going to overengineer the CI/CD too.*

### Semantic Versioning
Commit messages automatically bump versions:
- `fix: ...` → Patch (1.0.0 → 1.0.1)
- `feat: ...` → Minor (1.0.1 → 1.1.0)
- `feat!: ...` → Major (1.1.0 → 2.0.0)

### Continuous Delivery
On every push to `main`:
1. Spins up ARM GCC Toolchain in cloud
2. Checks out official Pico SDK
3. Compiles firmware (`talos7.uf2`)
4. Creates GitHub Release with changelog

---

## :icon[Rocket]{.text-orange-500 .inline-block .mr-2} Setup & Installation

### 1. Flash Firmware
```bash
# No compilation needed!
1. Download latest talos7.uf2 from Releases
2. Hold BOOTSEL on Pico while plugging USB
3. Drag & drop .uf2 to RPI-RP2 drive
4. Device reboots, Talos logo appears on OLED
```

### 2. Configure via Web
```
1. Open talos-7.vercel.app in Chrome/Edge
2. Click "Connect Device"
3. Customize layers and macros
4. Click "Save Changes" -> flashed to device
```

*If you can't figure this out, maybe stick to the Stream Deck. No judgment. Okay, some judgment.*

---

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Firmware** | C, Pico SDK, TinyUSB |
| **Web Configurator** | TypeScript, React, Web Serial API |
| **DevOps** | GitHub Actions (Hephaestus) |
| **Hardware** | RP2040, SSD1306 OLED, Cherry MX |

# Result

Talos 7 demonstrates **embedded systems engineering** combined with **modern web development**:

- **Low-level C** firmware for RP2040 :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1} 
- **TinyUSB** for composite HID device (keyboard + mouse + MIDI) :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1} 
- **Web Serial API** for browser-based configuration :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1} 
- **CI/CD pipeline** with automated firmware builds :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1} 
- **Custom PCB design** (coming soon) :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1} 
- **Open-source** hardware and software :icon[Check]{.text-green-500 .inline-block .ml-1 .mb-1} 

The project showcases how to build an **embedded product** from scratch - from firmware to web configurator to automated releases.

**License:** MIT - build your own, modify freely!

---

*P.S. - My total "time saved" using this macropad will never exceed the time spent building it. This is not a productivity tool, it's a cry for help disguised as engineering.*

