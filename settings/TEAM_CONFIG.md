# Team Configuration

## Overview
Proper team configuration is essential for creating an authentic SOCOM experience. This document outlines team setup, balancing, and spawn configurations.

## Team Structure

### Team 1: SEALs (US Naval Special Warfare)
**Role:** Attackers in most game modes
**Appearance:** US faction soldiers
**Spawn Location:** Insertion/Attack spawn points

**Characteristics:**
- Offensive role in Extraction and Demolition
- Equal role in Suppression
- Typically starts with positional disadvantage
- Must push to objectives

### Team 2: Terrorists/Opposition Force
**Role:** Defenders in most game modes
**Appearance:** Russian faction soldiers or generic enemies
**Spawn Location:** Defense/Objective spawn points

**Characteristics:**
- Defensive role in Extraction and Demolition
- Equal role in Suppression
- Typically starts near objectives
- Must hold positions

## Team Size Configurations

### Small (4v4)
**Best For:**
- Tactical gameplay
- Limited player pools
- Focused, intense matches

**Recommended Maps:**
- Smaller map sections
- Interior-focused areas
- Close quarters combat zones

### Medium (6v6)
**Best For:**
- Balanced gameplay (Recommended)
- Standard SOCOM experience
- Most game modes

**Recommended Maps:**
- Standard map sections
- Mixed interior/exterior
- Multiple strategic routes

### Large (8v8)
**Best For:**
- Large-scale operations
- Full map utilization
- Epic battles

**Recommended Maps:**
- Full map access
- Multiple objectives
- Diverse engagement ranges

## Team Balance

### Auto-Balance
**Enabled:** Yes
**Threshold:** 1 player difference
**Implementation:** End of round balance

### Team Switching
**Allowed:** No
**Locked:** At round start
**Exception:** Between matches only

## Spawn System

### Spawn Protection
**Duration:** 3-5 seconds
**Type:** Invulnerability + temporary invisibility
**Purpose:** Prevent spawn camping

### Spawn Points

#### Attack Spawns (SEALs)
- Safe distance from objectives (100-150m)
- Multiple exit routes
- Cover available near spawn
- Clear sightlines to first engagement area

#### Defense Spawns (Defenders)
- Near objectives (50-75m)
- Strategic positioning
- Access to key defensive positions
- Multiple defensive routes

### Spawn Timing
**Round Start:** Simultaneous spawn for both teams
**Delay:** None (no respawns during rounds)
**Preparation Time:** 10-15 seconds before engagement

## Communication Setup

### Voice Chat
**Enabled:** Team only
**Proximity:** Disabled
**All-Chat:** Disabled during rounds

### Text Chat
**Team Chat:** Enabled
**All Chat:** Enabled between rounds only
**Quick Commands:** Enabled

## Portal Configuration

### Basic Team Settings
```
Team 1: US Forces
Team 2: Russian Forces
Team Size: 6v6 (adjustable)
Auto-Balance: Enabled
Team Switching: Disabled
Friendly Fire: Optional (hardcore mode)
```

### Advanced Team Rules
```
Team Kill Limit: 3 (auto-kick)
Team Damage: Reflected (hardcore mode)
Spawn Protection: 3 seconds
Spawn Selection: Fixed per round
End of Round: 5 second delay
```

## Faction Customization

### Visual Distinction
- Clear team colors/markers
- Distinct uniform silhouettes
- Visible team indicators at distance
- Friendly nameplates (optional)

### Audio Distinction
- Faction-specific callouts
- Different footstep sounds (optional)
- Team-specific voice lines

## Round System

### Round Structure
```
1. Pre-Round Phase (10-15 seconds)
   - Team spawns
   - Loadout check
   - Strategy planning
   - Purchase period (optional)

2. Round Active Phase (2-5 minutes)
   - Full gameplay
   - No respawns
   - Objective active
   - Timer countdown

3. Post-Round Phase (5 seconds)
   - Winner announced
   - Score update
   - Brief delay before next round
```

### Team Swapping
**Frequency:** Every match (alternate maps)
**Method:** Automatic after match completion
**Purpose:** Ensure fair map balance

## Competitive Settings

### Tournament Mode
```
Team Size: 6v6 fixed
Auto-Balance: Disabled
Team Lock: Enabled
Spectator: Enabled
Round Win: Best of 13
Overtime: Enabled (30-30 format)
```

### Casual Mode
```
Team Size: 4v4 to 8v8
Auto-Balance: Enabled
Team Lock: End of round
Spectator: Enabled
Round Win: Best of 11
Overtime: Disabled
```

## Tips for Setup

1. **Test Spawn Points:**
   - Verify no direct sightlines between spawns
   - Ensure balanced travel time to objectives
   - Check for spawn camping opportunities

2. **Balance Team Sizes:**
   - Match team size to map size
   - Consider skill levels when using auto-balance
   - Monitor team distribution

3. **Communication:**
   - Enforce team-only voice chat
   - Use quick commands for non-verbal players
   - Enable replay/killcam between rounds

4. **Fair Play:**
   - Implement team kill penalties
   - Monitor for team griefing
   - Use vote kick for toxic players

5. **Competitive Integrity:**
   - Lock teams for tournament play
   - Record matches for review
   - Implement proper overtime rules
