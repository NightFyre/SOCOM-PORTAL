# Demolition Game Mode

## Overview
Demolition is a bomb plant/defuse mode where attackers must plant explosives at designated targets while defenders attempt to prevent detonation. This mode combines tactical gameplay with objective-based combat.

## Rules
- Round-based gameplay
- No respawns during rounds
- Attackers carry bomb and must plant at objective sites
- Defenders must prevent plant or defuse after plant
- Round timer: 2-3 minutes (configurable)
- Post-plant timer: 45 seconds

## Team Setup
- **SEALs (Attackers)**
  - 4-8 players
  - Objective: Plant C4 at designated targets (A or B site)
  - One player designated as bomb carrier each round
  - Spawn at insertion point
  
- **Terrorists (Defenders)**
  - 4-8 players
  - Objective: Prevent plant or defuse bomb
  - Spawn near objective sites

## Win Conditions

### Attackers Win If:
- Successfully plant and detonate bomb
- Eliminate all defenders after successful plant

### Defenders Win If:
- Eliminate all attackers before bomb is planted
- Successfully defuse planted bomb
- Time expires before bomb is planted

## Portal Configuration

### Basic Settings
```
Game Mode: Rush (modified for plant/defuse)
Respawn: Disabled
Round Limit: 13 (first to 7 wins)
Round Time: 150 seconds
Plant Time: 5 seconds
Defuse Time: 7 seconds
Post-Plant Timer: 45 seconds
```

### Advanced Rules
```
- Disable all vehicles and call-ins
- Disable respawns
- Enable friendly fire (optional)
- Two bomb sites (A and B)
- Bomb carrier revealed on map if stationary for 10+ seconds
- Dropped bomb visible to all players
- Bomb can be picked up by any attacker
```

## Bomb Mechanics
- One designated bomb carrier at round start
- If bomb carrier is killed, any attacker can retrieve bomb
- Plant time: 5 seconds (vulnerable during plant)
- Defuse time: 7 seconds (vulnerable during defuse)
- Post-plant timer: 45 seconds until detonation
- Bomb icon visible to all players once dropped

## Recommended Maps
- Kaleidoscope (multiple floor access)
- Hourglass (stadium interior)
- Orbital (launch facility)
- Renewal (industrial complex)
- Manifest (container areas)

## Strategic Elements
- Two bomb sites create strategic choices
- Defenders must split coverage or rotate
- Attackers must coordinate for successful plant
- Post-plant situations require clutch plays
- Economy and loadout management per round

## Site Characteristics

### Site A
- Typically more open
- Easier to plant, harder to defend post-plant
- Multiple entry points

### Site B
- Usually more enclosed
- Harder to plant, easier to defend post-plant
- Fewer entry points but stronger defender positions

## Tips for Portal Setup
1. Use objective flags as bomb sites
2. Create clear plant zones with visual markers
3. Set up proper sightlines and cover at each site
4. Balance spawn distances for both teams
5. Use Rules Editor to manage bomb mechanics
6. Test plant/defuse timings for balance
7. Create rotation routes between sites
8. Add audio/visual cues for bomb plant/defuse
