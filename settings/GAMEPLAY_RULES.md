# Gameplay Rules and Settings

## Overview
These rules and settings define the core SOCOM gameplay experience in Battlefield 2042 Portal. Proper configuration ensures authentic, tactical gameplay that honors the SOCOM legacy.

## Core Gameplay Rules

### Elimination Mechanics
- **No Respawns:** Players eliminated during rounds cannot respawn
- **Spectator Mode:** Killed players spectate teammates
- **Round Reset:** All players respawn at start of new round
- **Last Stand:** Disabled (instant elimination)

### Health and Damage

#### Health Settings
```
Base Health: 100 HP
Health Regeneration: Enabled
Regeneration Delay: 5 seconds
Regeneration Rate: Slow (5 HP/second)
Maximum Health: 100 HP (no overheal)
```

#### Damage Modifiers
```
Headshot Multiplier: 2.0x
Limb Damage: 0.75x
Body Damage: 1.0x
Friendly Fire: Optional (1.0x if enabled)
Fall Damage: Enabled
```

### Movement and Mobility

#### Movement Speed
```
Sprint Speed: 100% (standard)
Walk Speed: 100% (standard)
Crouch Speed: 60%
Prone Speed: 30%
Sprint Duration: 5 seconds
Sprint Cooldown: 3 seconds
```

#### Advanced Movement
```
Slide: Enabled (limited distance)
Mantle: Enabled (standard height)
Jump: Enabled (standard height)
Wingsuit: DISABLED
Grappling Hook: DISABLED
Parachute: DISABLED
Ziplines: Enabled (if present on map)
```

### Combat Mechanics

#### Weapon Behavior
```
Recoil: Realistic (no reduction)
Bullet Spread: Standard
Bullet Drop: Enabled
Bullet Velocity: Realistic
Hip Fire Accuracy: Reduced
ADS Accuracy: Standard
Movement Accuracy Penalty: Enabled
```

#### Equipment
```
Grenade Capacity: 1 lethal, 1 tactical
Grenade Resupply: Disabled during round
Ammo Capacity: Standard magazines
Ammo Resupply: From teammates only
Equipment Resupply: Disabled during round
```

## Round Configuration

### Round Structure

#### Pre-Round Phase
```
Duration: 15 seconds
Purchases: Disabled (fixed loadouts)
Strategy Time: Team planning period
Movement: Restricted to spawn area
Damage: Disabled
```

#### Active Round Phase
```
Duration: Varies by game mode
  - Suppression: 180 seconds (3 minutes)
  - Extraction: 240 seconds (4 minutes)
  - Demolition: 150 seconds (2.5 minutes)
Timer Display: Visible to all players
Timer Warning: Audio cue at 30 seconds
```

#### Post-Round Phase
```
Duration: 5 seconds
Score Display: Round winner and stats
MVP Display: Optional
Next Round Countdown: 5 seconds
Team Switch: After match completion
```

### Win Conditions

#### Match Victory
```
Suppression: First to 6 round wins
Extraction: First to 4 round wins
Demolition: First to 7 round wins
Tie Breaker: Overtime rounds if needed
```

#### Round Victory
Varies by game mode (see specific game mode docs)

### Overtime Rules
```
Trigger: 5-5 tie in Suppression (adjust for other modes)
Format: First to 2 round lead
Max Rounds: 9 overtime rounds (sudden death at 15-15)
```

## HUD and Interface

### HUD Elements

#### Enabled
```
- Crosshair (customizable)
- Ammo counter
- Health bar
- Round timer
- Team score
- Objective markers
- Compass (optional)
```

#### Disabled
```
- Minimap (optional - can enable for casual)
- Enemy markers
- Damage indicators (optional)
- Kill feed (optional)
- Hit markers (optional - keep for feedback)
```

### Killfeed Settings
```
Display: Enabled
Format: [Killer] > [Weapon] > [Victim]
Team Kills: Highlighted differently
Duration: 5 seconds
Position: Top right
```

## Spectator System

### Spectator Controls
```
Follow Teammates: Yes
Free Camera: No (prevents cheating)
Enemy View: No
Map View: No
Killer Cam: Optional (3 second delay)
```

### After Death
```
Mode: Team spectator only
Camera: First person or shoulder cam
Delay: Immediate
Info Display: Minimal (no enemy positions)
```

## Audio Settings

### In-Game Audio
```
Footsteps: Realistic volume
Gunfire: Realistic (spatial audio)
Reloading: Audible to nearby players
Voice Lines: Faction-specific
Environmental: Enabled
```

### Communication
```
Voice Chat: Team only
Voice Activation: Optional
Push-to-Talk: Recommended
Text Chat: Team during round, all between rounds
Quick Commands: Enabled
```

## Scoring System

### Individual Stats
```
Kills: +1 point
Deaths: -1 point
Assists: +0.5 point
Objective Actions: Varies
  - Plant/Defuse: +2 points
  - Hostage Rescue: +3 points
Team Kills: -2 points
```

### Team Stats
```
Round Wins: Track per match
Match Wins: Track per session
Win Streak: Display current streak
MVP: Highest score per round
```

## Advanced Rules (Portal Editor)

### Essential Rules to Set

```javascript
// Disable respawns during rounds
OnPlayerDied() {
    DisableRespawn(EventPlayer);
    SetSpectatorTarget(EventPlayer, RandomTeammate);
}

// Round timer and win condition
OnRoundStart() {
    SetRoundTimer(180); // 3 minutes for Suppression
    EnableDamage();
}

OnRoundTimer() {
    DetermineRoundWinner();
    if (AttackerScore >= 6 || DefenderScore >= 6) {
        EndMatch();
    } else {
        StartNewRound();
    }
}

// Team elimination check
OnPlayerDied() {
    if (TeamEliminatedCheck(EventPlayer.Team)) {
        RoundVictory(OpposingTeam);
    }
}

// Friendly fire penalties (if enabled)
OnTeamKill() {
    AddPenalty(EventPlayer);
    if (EventPlayer.TeamKills >= 3) {
        KickPlayer(EventPlayer);
    }
}
```

## Server Settings

### Server Configuration
```
Server Name: [SOCOM] [Game Mode] - [Map]
Password: Optional (private matches)
Max Players: 8-16 (depending on team size)
Region: Appropriate for player base
Tick Rate: 60Hz (or higher if available)
```

### Admin Controls
```
Vote Kick: Enabled
Admin Kick: Enabled
Team Balance: Automatic
Map Rotation: Configured
Round Restart: Admin only
```

## Fair Play Guidelines

### Prohibited Actions
- Exploiting map glitches
- Team killing (except in hardcore with FF enabled)
- Spawn camping
- Boosting or stat padding
- Using prohibited weapons/equipment

### Enforcement
- First Offense: Warning
- Second Offense: Round kick
- Third Offense: Server ban

## Tips for Configuration

1. **Start with Default Settings:**
   - Use recommended settings first
   - Adjust based on community feedback
   - Document all changes

2. **Test Thoroughly:**
   - Play test all rules
   - Verify timers work correctly
   - Check win conditions trigger properly

3. **Balance Gameplay:**
   - Neither team should have advantage
   - Skill should determine outcomes
   - Multiple strategies should be viable

4. **Community Input:**
   - Gather player feedback
   - Adjust rules as needed
   - Maintain competitive integrity

5. **Document Everything:**
   - Keep track of rule changes
   - Note reasons for modifications
   - Share configurations with community
