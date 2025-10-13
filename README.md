# 🎖️ Battlefield 6 Portal – SOCOM Revival
*Remaking the classic SOCOM experience inside Battlefield 6 Portal.*

## 🎮 Overview
This project aims to recreate **SOCOM-style tactical gameplay** within Battlefield 6’s Portal mode.  
Our goal is to bring back the classic **team-based, objective-focused combat** that defined SOCOM — complete with **original maps, mission types, and rulesets**.

## 🗺️ Features
- **Classic Game Modes**
  - Demolition
  - Breach
  - Suppression
- **Authentic Map Remakes**
  - Crossroads
  - Frostfire
  - Desert Glory
- **Gameplay Systems**
  - Custom round logic
  - Dynamic spawn & objective scripting
  - Weapon restrictions and team balancing

## 🧩 Repository Structure
| Folder | Description |
|---------|--------------|
| `/maps` | Contains map configurations and logic scripts |
| `/gamemodes` | Custom SOCOM-style game modes implemented for Portal |
| `/assets` | Media, references, and supporting files |
| `/docs` | Design notes, changelogs, and project documentation |
| `/scripts` | Helper scripts for packaging, validation, and maintenance |

## 🧠 Development
This project uses **Battlefield Portal Logic Editor (BFPortal)** and **JSON-based logic scripting**.

You can import individual mode or map configurations directly into Portal:
1. Go to [portal.battlefield.com/experience](https://portal.battlefield.com/experience)
2. Choose **Create > Game Mode Logic**
3. Copy JSON from this repo’s `/maps` or `/gamemodes` folder
4. Paste into the Portal editor and test

## 🔧 Requirements
- Battlefield 6 (Portal access)
- Browser access to Battlefield Portal Editor
- JSON editing tools (VSCode recommended)

## 📦 Installation / Usage
```bash
# Clone the repo
git clone https://github.com/<yourname>/BF6-Portal-SOCOM-Revival.git
cd BF6-Portal-SOCOM-Revival

# Open the map/mode of choice
cd maps/Crossroads

# Copy JSON logic into Battlefield Portal
```

## 🗒️ Roadmap
- Core game mode framework (Demolition)
- Base map logic
- Import/export automation
- Team balancing logic
- Sound/visual references for classic SOCOM maps

## ⚖️ License

This project is licensed under the **MIT License**.
All SOCOM references are for **non-commercial, fan-made use only**.
