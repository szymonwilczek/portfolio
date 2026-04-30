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
  - "/images/talos/talos_atari.JPEG"
  - "/images/talos/talos_front.JPEG"
  - "/images/talos/talos_back.JPEG"
github: "https://github.com/szymonwilczek/talos-7"
links:
  - url: "https://szymon-wilczek.me/projects/talos-7"
    name: "Blog Article"
  - url: "https://talos-7.vercel.app"
    name: "Talos Configurator"
---

# Preview

<video src="/videos/talos/preview.mp4" controls></video>

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

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Firmware** | C, Pico SDK, TinyUSB |
| **Web Configurator** | TypeScript, React, Web Serial API |
| **DevOps** | GitHub Actions (Hephaestus) |
| **Hardware** | RP2040, SSD1306 OLED, Cherry MX |
