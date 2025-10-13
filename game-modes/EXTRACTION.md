# Extraction Game Mode

## Overview
Extraction mode challenges the attacking team to rescue hostages while the defending team prevents their escape. This objective-based mode requires teamwork, strategy, and precise execution.

## Rules
- Round-based gameplay
- No respawns during rounds
- Attackers must locate and extract hostages to designated extraction point
- Defenders must protect hostages and eliminate attackers
- Round timer: 4-6 minutes (configurable)

## Team Setup
- **SEALs (Attackers)**
  - 4-8 players
  - Objective: Rescue hostages and bring them to extraction point
  - Spawn at insertion point
  
- **Terrorists (Defenders)**
  - 4-8 players
  - Objective: Protect hostages and eliminate all attackers
  - Spawn near hostage locations

## Win Conditions

### Attackers Win If:
- Successfully extract required number of hostages before time expires
- Eliminate all defenders after securing hostages

### Defenders Win If:
- Eliminate all attackers before hostages are extracted
- Time expires before hostages are extracted

## Portal Configuration

### Basic Settings
```
Game Mode: Conquest/Rush (modified for objectives)
Respawn: Disabled
Round Limit: 7 (first to 4 wins)
Round Time: 240 seconds
Hostages Required: 1-2 (depending on map size)
```

### Advanced Rules
```
- Disable all vehicles
- Disable respawns
- Enable friendly fire with hostage damage
- Hostage interaction time: 3 seconds
- Extraction zone visible to both teams
- Use mannequins or downed soldiers as hostage props
```

## Hostage Mechanics
- Hostages are immobile until "rescued" by attackers
- One attacker can escort one hostage at a time
- Hostage moves at reduced speed (70% of normal)
- Hostage cannot be killed (set to invulnerable)
- If escorting player is killed, hostage must be re-secured

## Recommended Maps
- Kaleidoscope (urban environment)
- Hourglass (stadium section)
- Renewal (warehouse areas)
- Orbital (facility interiors)

## Strategic Elements
- Multiple potential hostage locations
- Various extraction points (one active per round)
- Time pressure creates dynamic gameplay
- Coordinated team movement essential
- Communication is critical

## Tips for Portal Setup
1. Use flags or objectives as hostage locations
2. Create multiple extraction zones and randomize
3. Use Rules Editor to simulate hostage escort mechanics
4. Set up proper spawn protection for both teams
5. Balance map size with round timer
6. Consider adding smoke grenades for cover during extraction
