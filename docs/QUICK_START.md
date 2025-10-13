# Quick Start Guide

## Getting Started with SOCOM Portal

This guide will help you quickly set up and start playing SOCOM in Battlefield 2042 Portal.

## Prerequisites
- Battlefield 2042 installed and updated
- Access to Portal mode
- Basic understanding of Portal's interface

## 5-Minute Setup

### Step 1: Open Portal (1 minute)
1. Launch Battlefield 2042
2. Select **Portal** from main menu
3. Choose **Create Experience**

### Step 2: Basic Configuration (2 minutes)
1. **Select Game Mode:** Team Deathmatch (we'll modify it)
2. **Select Map:** Choose from recommended maps:
   - Kaleidoscope (Best for beginners)
   - Orbital
   - Renewal
3. **Set Team Size:** 6v6 recommended
4. **Disable Vehicles:** Turn off all vehicles

### Step 3: Apply SOCOM Rules (2 minutes)
1. Open **Rules Editor**
2. **Essential Settings:**
   - Respawn: **Disabled**
   - Round Limit: **11** (first to 6)
   - Round Time: **180 seconds**
   - Health Regen: **Delayed (5 sec)**
3. **Weapon Restrictions:**
   - Disable: Rocket Launchers, Sniper Rifles with Thermal
   - Enable: Assault Rifles, SMGs, DMRs, Pistols

### Step 4: Launch
1. **Save Experience:** Give it a name like "SOCOM Suppression"
2. **Start Server:** Choose public or private
3. **Play!**

## Recommended First Experience

### SOCOM Suppression on Kaleidoscope
Perfect for learning the basics:
- Simple elimination gameplay
- Good map for 6v6
- Easy to understand win conditions

**Quick Settings:**
```
Mode: Suppression (Team Elimination)
Map: Kaleidoscope (Central Tower area)
Teams: 6v6
Rounds: Best of 11
Round Time: 3 minutes
Respawn: Disabled
Vehicles: Disabled
```

## Common Game Modes Setup

### Quick Suppression Setup
```
1. Base Mode: Team Deathmatch
2. Respawn: OFF
3. Round Limit: 11
4. Timer: 180 sec
5. Win Condition: Eliminate all enemies
```

### Quick Extraction Setup
```
1. Base Mode: Conquest
2. Respawn: OFF
3. Round Limit: 7
4. Timer: 240 sec
5. Objectives: 1-2 flags as "hostages"
6. Win Condition: Capture and hold to extraction
```

### Quick Demolition Setup
```
1. Base Mode: Rush
2. Respawn: OFF
3. Round Limit: 13
4. Timer: 150 sec + 45 sec post-plant
5. Objectives: 2 bomb sites (A and B)
6. Win Condition: Plant and detonate OR defuse
```

## Portal Rules Editor - Essential Code

### Basic Elimination Rules
Copy this into Portal Rules Editor:

```javascript
// Basic SOCOM Elimination
rules: {
  // Disable respawn when player dies
  OnPlayerDied: {
    DisableRespawn(EventPlayer);
    SetSpectatorTarget(EventPlayer, RandomTeammate);
  }
  
  // Check if team is eliminated
  OnPlayerDied: {
    if (CountAlive(EventPlayer.Team) == 0) {
      RoundVictory(OpposingTeam);
    }
  }
  
  // Reset for new round
  OnRoundStart: {
    EnableRespawnForAll();
    SetRoundTimer(180);
  }
}
```

## First Match Checklist

Before starting your first match:

- [ ] Game mode selected (recommend Suppression)
- [ ] Map configured with boundaries
- [ ] Team size set (6v6 recommended)
- [ ] Respawns disabled
- [ ] Round timer set (3 minutes)
- [ ] Weapons restricted appropriately
- [ ] Vehicles disabled
- [ ] Spawn points configured
- [ ] Server settings saved
- [ ] Friends invited (if private)

## Troubleshooting

### Players Keep Respawning
- Check Rules Editor has `DisableRespawn` on death
- Verify respawn settings are OFF in server config

### Round Never Ends
- Ensure round timer is set
- Check team elimination logic in Rules Editor
- Verify win conditions are configured

### Teams Unbalanced
- Enable auto-balance in team settings
- Check team size limits
- Verify spawn points for both teams

### Wrong Weapons Available
- Review weapon restrictions in loadout editor
- Disable specialist abilities
- Lock loadouts at round start

### Map Too Large
- Use out-of-bounds zones to restrict area
- Focus on specific map sections
- Reduce play area to 200-300m zones

## Next Steps

### Customize Your Experience
1. Review [Game Mode Guides](/game-modes/)
2. Configure [Weapon Loadouts](/weapons/LOADOUTS.md)
3. Set up [Team Configuration](/settings/TEAM_CONFIG.md)
4. Explore [Map Configurations](/maps/MAP_CONFIGURATIONS.md)

### Join the Community
1. Share your experiences on forums
2. Provide feedback on configurations
3. Suggest improvements
4. Play with the SOCOM community

### Advanced Setup
Once comfortable with basics:
1. Fine-tune gameplay rules
2. Create custom map boundaries
3. Develop advanced Portal logic
4. Host competitive matches
5. Create tournaments

## Tips for First-Time Hosts

1. **Start Simple:**
   - Use Suppression mode first
   - Stick to 6v6
   - Use recommended maps

2. **Test Before Public:**
   - Test with friends first
   - Verify all settings work
   - Adjust based on feedback

3. **Communicate Rules:**
   - Use server description
   - Explain rules at match start
   - Be patient with new players

4. **Monitor and Adjust:**
   - Watch for balance issues
   - Adjust timers if needed
   - Take community feedback

5. **Have Fun:**
   - Don't stress perfection
   - Enjoy the tactical gameplay
   - Build a community around your server

## Resources

### Documentation
- [Complete Game Modes](/game-modes/)
- [Weapon Loadouts](/weapons/LOADOUTS.md)
- [Team Configuration](/settings/TEAM_CONFIG.md)
- [Gameplay Rules](/settings/GAMEPLAY_RULES.md)
- [Map Configurations](/maps/MAP_CONFIGURATIONS.md)

### Community
- GitHub Issues for bug reports
- Pull requests for improvements
- Discussions for strategy and tips

## Quick Reference Card

```
═══════════════════════════════════
    SOCOM PORTAL QUICK REFERENCE
═══════════════════════════════════

SUPPRESSION (Team Elimination)
├─ Teams: 6v6
├─ Rounds: Best of 11
├─ Time: 3 minutes
└─ Win: Eliminate all enemies

EXTRACTION (Hostage Rescue)
├─ Teams: 6v6
├─ Rounds: Best of 7
├─ Time: 4 minutes
└─ Win: Extract hostages

DEMOLITION (Bomb Plant/Defuse)
├─ Teams: 6v6
├─ Rounds: Best of 13
├─ Time: 2.5 min + 45 sec
└─ Win: Detonate OR defuse

ESSENTIAL SETTINGS
├─ Respawn: OFF
├─ Vehicles: OFF
├─ Health Regen: Delayed
└─ Friendly Fire: Optional

RECOMMENDED MAPS
├─ Kaleidoscope (Urban)
├─ Orbital (Facility)
├─ Renewal (Industrial)
└─ Breakaway (Research)
═══════════════════════════════════
```

Happy Gaming! Welcome to SOCOM Portal!
