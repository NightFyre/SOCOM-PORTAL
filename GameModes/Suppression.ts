/* 
    SOCOM: U.S. Navy SEALs - Suppression Game Mode Script
    This script handles the Suppression game mode for SOCOM: U.S. Navy SEALs.
    It manages player events, game state, and custom logic for the Suppression mode.

    Match Flow:
    - Players join the game and are assigned to teams.
    - The match starts when the minimum number of players is reached.
    - Each round has a time limit, and players must eliminate the opposing team.
    - The round ends when one team is eliminated or the time limit is reached.
    - The match continues until one team wins the majority of rounds.

    Logic Flow:
    - OnGameModeStarted: Initializes match data and sets spawn mode.
    - OnPlayerJoinGame: Creates a CZSeal instance for the player & adds player to matchdata.
    - OnPlayerDeployed: Marks the player as spawned and alive, sets camera type.

*/


////////////////////////////////// PLAYER EVENTS ///////////////////////////////////////

// Triggered when player joins the game. Useful for pregame setup, team management, etc.
export function OnPlayerJoinGame(eventPlayer: mod.Player): void 
{
    /* get match data instance */
    let matchData = CZMatchData.get();
    if (!matchData)
        return; // invalid match data object

    /* get seal instance */
    let seal = CZSeal.get(eventPlayer);
    if (!seal)
        return; // invalid seal object
    
    /* add player to match data */
    matchData.currentPlayers++;

    /* add bot count if AI */
    if (seal.isAI)
        matchData.bots++;

    /* log event */
    CZConsole.log("Player Joined: ID: {} | TeamID: {}", seal.playerID, seal.teamID);
}

// Triggered when player leaves the game. Useful for clean up logic, team management, etc.
export function OnPlayerLeaveGame(eventNumber: number): void 
{
    /* eventNumber is playerID */
    let seal = CZSeal.getPlayerByID(eventNumber);
    if (!seal)
        return; // invalid seal object
    
    let matchData = CZMatchData.get();
    if (matchData)
    {
        matchData.currentPlayers--;
        matchData.bots -= seal.isAI ? 1 : 0;
    }

    /* log event */
    CZConsole.log("Player Left: ID: {} | TeamID: {}", seal.playerID, seal.teamID);

    /* remove player */
    CZSeal.remove(eventNumber);
}

// Triggered when player selects their class and deploys into game. Useful for any spawn/start logic.
export function OnPlayerDeployed(eventPlayer: mod.Player): void 
{
    /* get seal instance */
    let seal = CZSeal.get(eventPlayer);
    if (!seal)
        return; // invalid seal object
        
    mod.SetRedeployTime(eventPlayer, 0); // instantly redeploy on death

    if (seal.hasSpawned)
    {
        //  if (!seal.isAI)
            //mod.SetCameraTypeForPlayer(eventPlayer, mod.Cameras.Free);

        seal.Disarm(); // disarm the player to prevent exploits
        return; // already spawned
    }

    /* set seal state */
    seal.hasSpawned = true;
    seal.isAlive = true;

    /* set camera type to 3rd person */
    if (!seal.isAI)
    {
        mod.SetCameraTypeForPlayer(eventPlayer, mod.Cameras.FirstPerson); // set to first person
        mod.Wait(1); // wait 1 frame
        mod.SetCameraTypeForPlayer(eventPlayer, mod.Cameras.ThirdPerson); // set to third person
    }

    console.log(`Player ${seal.playerID} deployed | isAI: ${seal.isAI}`);
}

// This will trigger when the Player dies and returns to the deploy screen.
export function OnPlayerUndeploy(eventPlayer: mod.Player): void { }

// Triggered on player death/kill, returns dying player, the killer, etc. Useful for updating scores, updating progression, handling any death/kill related logic.
export function OnPlayerDied( eventPlayer: mod.Player,  eventOtherPlayer: mod.Player,  eventDeathType: mod.DeathType,  eventWeaponUnlock: mod.WeaponUnlock ): void 
{
    /* ignore redeploy deaths */
    if (mod.EventDeathTypeCompare(eventDeathType, mod.PlayerDeathTypes.Redeploy))
        return;

    /* get match data instance , only update if round is active */
    let matchData = CZMatchData.get();
    if (!matchData || matchData.state !== GameState.RoundActive)
        return;

    /* get seal victim instance */
    let victim = CZSeal.get(eventPlayer);
    if (!victim || !victim.isAlive) // player already dead , ignore
        return;

    victim.OnPlayerDied(eventDeathType, eventOtherPlayer);

    matchData.OnElimination(eventPlayer);
}

export function OnPlayerEarnedKill( eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock ): void { }

// Triggered when a player is damaged, returns same variables as OnPlayerDied. Useful for custom on damage logic and updating custom UI.
export function OnPlayerDamaged(
    eventPlayer: mod.Player,
    eventOtherPlayer: mod.Player,
    eventDamageType: mod.DamageType,
    eventWeaponUnlock: mod.WeaponUnlock
): void 
{
    let victim = CZSeal.get(eventPlayer);
    if (!victim || !victim.isAlive) // player already dead , ignore
        return;

    victim.OnPlayerDamaged(eventDamageType, eventOtherPlayer);
}


/////////////////////// GAMEMODE EVENTS //////////////////////////////

// This will trigger when the gamemode time limit has been reached.
export function OnTimeLimitReached(): void {}

let shouldExitLoop = false;
// Triggered on main gamemode start/end. Useful for game start setup and cleanup.
export async function OnGameModeStarted() 
{
    log.info(mod.Message("SOCOM PORTAL - Suppression Game Mode Started"));

    /* override spawn mode - deploy */
    mod.SetSpawnMode(mod.SpawnModes.Deploy);
    mod.EnableAllPlayerDeploy(false);

    /* create match data instance */
    let matchData = CZMatchData.get();

    while (true)
    {
        await matchData.update();

        if (shouldExitLoop)
            break;
    }

    shouldExitLoop = false; // reset for next match
}

// This will trigger when the gamemode ends.
export function OnGameModeEnding(): void 
{
    /* stop the match data update loop */
    shouldExitLoop = true;

    /* destroy match data instance */
    CZMatchData.destroy();

    //for (let player of CZSeal.sealObjects)
    //{
    //    let seal = CZSeal.get(player);
    //    if (!seal)
    //        continue;
    //
    //    CZSeal.remove(seal.playerID);
    //}
    //CZSeal.sealObjects = []; // clear the seal objects array  

    log.info(mod.Message("SOCOM PORTAL - Suppression Game Mode Ended"));
}

export function OngoingGlobal(): void 
{
    log.update();

    let matchData = CZMatchData.get();
    if (!matchData)
        return; // invalid match data object

    // Check all players for camera updates (runs every frame)
    for (let player of CZSeal.sealObjects)
    {
        let seal = CZSeal.get(player);
        if (!seal)
            continue;

        /* update camera state */
        seal.CameraUpdate(); // update camera state if alive and not AI

        /* disarm and teleport dead players out of the play area */
        //  if (!seal.isAlive && matchData.state === GameState.RoundActive)
        //  {
        //      //  if (mod.GetSoldierState(seal.player, mod.SoldierStateBool.IsAlive))
        //      //      mod.Kill(seal.player); // ensure player is dead
        //      //  mod.Teleport(seal.player, mod.CreateVector(0, 0, 0), 0); // teleport to origin when dead
        //      //  seal.Disarm(); // disarm when dead
        //  }
        
        //if (matchData.isGamePlayActive())
        if (matchData.state === GameState.RoundActive || matchData.state === GameState.RoundEnd || matchData.state === GameState.MatchEnd)
        {
            /* handle "dead" players & AI */
            if (!seal.isAlive && mod.GetSoldierState(seal.player, mod.SoldierStateBool.IsAlive))
            {
                seal.setAIBehavior(false);
            }
        }

        if (matchData.state === GameState.RoundEnd || matchData.state === GameState.MatchEnd)
        {
            //  mod.Teleport(seal.player, mod.CreateVector(0, 0, 0), 0); // teleport to origin when dead
            //  seal.Disarm(); // disarm when dead
        }
    }
}

/// --------------------------------- CZSEAL --------------------------------- ///


export enum SoldierCameraView
{
    RightShoulder,
    LeftShoulder
}

class CZSealStats
{
    kills: number[] = [0, 0]; // number of kills
    deaths: number[] = [0, 0]; // number of times died
    headshots: number[] = [0, 0]; // number of headshots
    headshotKills: number[] = [0, 0]; // number of headshot kills
    shotsHit: number[] = [0, 0]; // shots that hit an enemy
    shotsOnFriendly: number[] = [0, 0]; // shots that hit a friendly
    shotsTaken: number[] = [0, 0]; // times shot
    shotsTakenByFriendly: number[] = [0, 0]; // times shot by friendly
    friendlyFireDeaths: number[] = [0, 0]; // deaths by friendly fire
    friendlyFireKills: number[] = [0, 0]; // kills by friendly fire

    // Reset round stats
    resetRound(): void
    {
        this.kills[1] += this.kills[0];
        this.kills[0] = 0; // reset round stats
        this.deaths[1] += this.deaths[0];
        this.deaths[0] = 0; // reset round stats
        this.headshots[1] += this.headshots[0];
        this.headshots[0] = 0; // reset round stats
        this.headshotKills[1] += this.headshotKills[0];
        this.headshotKills[0] = 0; // reset round stats
        this.shotsHit[1] += this.shotsHit[0];
        this.shotsHit[0] = 0; // reset round stats
        this.shotsOnFriendly[1] += this.shotsOnFriendly[0];
        this.shotsOnFriendly[0] = 0; // reset round stats
        this.shotsTaken[1] += this.shotsTaken[0];
        this.shotsTaken[0] = 0; // reset round stats
        this.shotsTakenByFriendly[1] += this.shotsTakenByFriendly[0];
        this.shotsTakenByFriendly[0] = 0; // reset round stats
        this.friendlyFireDeaths[1] += this.friendlyFireDeaths[0];
        this.friendlyFireDeaths[0] = 0; // reset round stats
        this.friendlyFireKills[1] += this.friendlyFireKills[0];
        this.friendlyFireKills[0] = 0; // reset round stats
    }

    reset(): void
    {
        this.kills = [0, 0];
        this.deaths = [0, 0];
        this.headshots = [0, 0];
        this.headshotKills = [0, 0];
        this.shotsHit = [0, 0];
        this.shotsOnFriendly = [0, 0];
        this.shotsTaken = [0, 0];
        this.shotsTakenByFriendly = [0, 0];
        this.friendlyFireDeaths = [0, 0];
        this.friendlyFireKills = [0, 0];
    }
}

class CZSeal 
{
    player: mod.Player;
    playerID: number;
    teamID: number;
    isAI: boolean;
    hasSpawned: boolean = false;
    isAlive: boolean = false;
    maxHealth = 100;
    currentHealth = 100;
    isZooming: boolean = false;
    isArmed: boolean = true;
    isAdmin: boolean = false; // Track if this player is an admin
    cameraView: SoldierCameraView = SoldierCameraView.RightShoulder; // current camera view mode

    // seal stats
    stats: CZSealStats = new CZSealStats();

    // static list of all player instances
    static sealObjects: mod.Player[] = [];

    /* should only be created via CZSeal.get() */
    constructor(player: mod.Player)
    {
        this.player = player;
        this.playerID = mod.GetObjId(player);
        this.teamID = mod.GetObjId(mod.GetTeam(player)); // teamID should be 1 or 2
        this.isAI = mod.GetSoldierState(player, mod.SoldierStateBool.IsAISoldier);
        CZSeal.sealObjects.push(player);
    }

    // static list of all seal players by playerID
    static #allSealPlayers: { [key: number]: CZSeal } = {};

    /* should only be accessed via OnPlayer Events , a new Seal will be created if none exists */
    static get(player: mod.Player): CZSeal | undefined
    {
        let playerID = mod.GetObjId(player);
        if (playerID > -1)
        {
            let seal = CZSeal.#allSealPlayers[playerID];
            if (!seal)
            {
                seal = new CZSeal(player);
                CZSeal.#allSealPlayers[playerID] = seal;
                console.log(`Created CZSeal for Player ID: ${playerID} | TeamID: ${seal.teamID} | isAI: ${seal.isAI}`);
            }

            return seal;
        }
        return undefined;
    }

    /* should only be accessed via OnPlayerLeaveGame Event */
    static remove(playerID: number): void
    {
        //  let playerID = mod.GetObjId(player);
        if (playerID <= -1)
            return;

        console.log(`Removing CZSeal for Player ID: ${playerID}`);

        // Remove from the players dictionary
        let seal = this.#allSealPlayers[playerID];
        if (seal) {
            // Remove from sealObjects array
            const index = this.sealObjects.indexOf(seal.player);
            if (index > -1) {
                this.sealObjects.splice(index, 1);
            }
        }

        delete this.#allSealPlayers[playerID];
    }
    
    /* get a CZSeal by playerID - useful for admin system */
    static getPlayerByID(playerID: number): CZSeal | undefined
    {
        return this.#allSealPlayers[playerID];
    }

    /* call in game update to update camera state */
    static debugTPSCameraIndex = 0;
    static debugFPSCameraIndex = 0;
    CameraUpdate(): void
    {
        /* verify valid state */
        if (!this.hasSpawned || this.isAI || !this.isAlive)
            return;

        let currentShoulder = this.cameraView === SoldierCameraView.RightShoulder ? 0 : 1;
        
        /* get zoom state */
        let isCurrentlyZooming = mod.GetSoldierState(this.player, mod.SoldierStateBool.IsZooming);
        if (isCurrentlyZooming == this.isZooming)
            return;

        /* set zoom state */
        this.isZooming = isCurrentlyZooming;
        
        /* update camera */
        mod.SetCameraTypeForPlayer(this.player, this.isZooming ? mod.Cameras.FirstPerson : mod.Cameras.ThirdPerson, currentShoulder);
    }

    /* triggered when the player is damaged */
    OnPlayerDamaged(eventDamageType: mod.DamageType, eventOtherPlayer: mod.Player): void
    {
        if (!this.isAlive)
            return;

        let newHealth = mod.GetSoldierState(this.player, mod.SoldierStateNumber.CurrentHealth);
        let damageReceived = this.currentHealth - newHealth;
        this.currentHealth = newHealth; // sync current health

        let shooter = CZSeal.get(eventOtherPlayer as mod.Player);
        if (!shooter || !shooter.isAlive) // shooter is not alive , ignore
            return;

        /* check for self-harm */
        if (this.playerID === shooter.playerID)
        {
            console.log(`Player ${shooter.playerID} hit themselves`);
            return;
        }

        /* check for friendly fire */
        let bFriendlyFire = this.teamID === shooter.teamID;
        if (bFriendlyFire)
        {
            shooter.stats.shotsOnFriendly[0]++; // increment shots on friendly count
            this.stats.shotsTakenByFriendly[0]++; // increment shots taken by friendly count
            console.log(`Player ${shooter.playerID} hit friendly Player ${this.playerID}`);

            /* HANDLE EXCESSIVE FRIENDLY FIRE */
            if (shooter.stats.shotsOnFriendly[0] > 5 && shooter.stats.friendlyFireKills[0] >= 2)
            {
                mod.Heal(this.player, this.maxHealth * 0.25); // heal the victim for 25% of max health
                shooter.Disarm(); // disarm the shooter , prvents further friendly fire & exploiting the health system
                console.log(`Player ${shooter.playerID} penalized for excessive friendly fire`);
            }

            return; // don't count friendly fire as a hit
        }

        /* update stats */
        this.stats.shotsTaken[0]++; // increment shots taken count
        shooter.stats.shotsHit[0]++; // increment shots hit count
        if (mod.EventDamageTypeCompare(eventDamageType, mod.PlayerDamageTypes.Headshot))
            shooter.stats.headshots[0]++; // increment headshot count if headshot

        // log damage info
        console.log(`Player ${shooter.playerID} damaged Player ${this.playerID}`);
    }

    /* triggered when the player dies */
    OnPlayerDied(eventDeathType: mod.DeathType, eventOtherPlayer: mod.Player | undefined): void
    {
        if (!this.isAlive)
            return;

        this.isAlive = false;
        this.stats.deaths[0]++;
        this.currentHealth = 0;

        /* get killer seal instance */
        let killerSeal = CZSeal.get(eventOtherPlayer as mod.Player);
        if (!killerSeal || !killerSeal.isAlive) // killer is not alive , ignore
            return;

        /* check for self-harm */
        if (killerSeal === this)
        {
            console.log(`Player ${killerSeal.playerID} killed themselves`);
            //  log.info(mod.Message("[!] Player {} killed themselves", killerSeal.playerID));
            return;
        }

        /* check for friendly fire */
        let bFriendlyFire = killerSeal.teamID === this.teamID;
        if (bFriendlyFire)
        {
            killerSeal.stats.friendlyFireKills[0]++; // increment friendly fire kills count
            this.stats.friendlyFireDeaths[0]++; // increment friendly fire deaths count
            console.log(`Player ${killerSeal.playerID} killed friendly Player ${this.playerID}`);
            //  log.info(mod.Message("[~] Player {} killed friendly Player {}", killerSeal.playerID, this.playerID));

            /* HANDLE EXCESSIVE FRIENDLY FIRE */
            if (killerSeal.stats.friendlyFireKills[0] >= 2)
            {
                mod.Kill(killerSeal.player); // kill the killer for excessive friendly fire
                console.log(`Player ${killerSeal.playerID} killed for excessive friendly fire`);
                //  log.info(mod.Message("[!] Player {} killed for excessive friendly fire", killerSeal.playerID));
            }

            return;
        }

        killerSeal.stats.kills[0]++;
        if (mod.EventDeathTypeCompare(eventDeathType, mod.PlayerDeathTypes.Headshot))
            killerSeal.stats.headshotKills[0]++;

        mod.SetCameraTypeForPlayer(this.player, mod.Cameras.Free); // set death camera

        console.log(`Player ${killerSeal.playerID} killed Player ${this.playerID}`);
        //  log.info(mod.Message("[+] Player {} killed Player {}", killerSeal.playerID, this.playerID));
    }

    /* called on each new round , resets state members */
    Respawn(): void
    {
        this.hasSpawned = false;
        this.currentHealth = this.maxHealth;
        this.isZooming = false;
        this.isArmed = true;
        mod.DeployPlayer(this.player); // deploy the player
        mod.SetCameraTypeForPlayer(this.player, mod.Cameras.ThirdPerson, this.cameraView === SoldierCameraView.RightShoulder ? 0 : 1);
        this.setAIBehavior(true); // restore AI behavior

    }

    /* removes all equipment from the player */
    Disarm(): void
    {
        if (this.isArmed === false)
            return;

        mod.RemoveEquipment(this.player, mod.InventorySlots.PrimaryWeapon); // remove primary weapon from player
        mod.RemoveEquipment(this.player, mod.InventorySlots.SecondaryWeapon); // remove secondary weapon from player
        mod.RemoveEquipment(this.player, mod.InventorySlots.Throwable); // remove thrown weapon from player
        mod.RemoveEquipment(this.player, mod.InventorySlots.MeleeWeapon); // remove melee weapon from player
        mod.RemoveEquipment(this.player, mod.InventorySlots.GadgetOne); // remove gadget one from player
        mod.RemoveEquipment(this.player, mod.InventorySlots.GadgetTwo); // remove gadget two from player
        mod.RemoveEquipment(this.player, mod.InventorySlots.ClassGadget); // remove class gadget from player
        mod.RemoveEquipment(this.player, mod.InventorySlots.MiscGadget); // remove misc gadget from player

        this.isArmed = false;   // prevent subsequent disarm calls
    }


    /* UTILITY METHODS */

    /* returns health percent (0-100) */
    getHealthPercent() : number
    {
        let currentHealth = mod.GetSoldierState(this.player, mod.SoldierStateNumber.CurrentHealth);
        let maxHealth = mod.GetSoldierState(this.player, mod.SoldierStateNumber.MaxHealth);
        return (currentHealth / maxHealth) * 100;
    }

    /* returns yaw angle in radians */
    getYawAngleRadians() : number
    {
        let look = mod.GetSoldierState(this.player, mod.SoldierStateVector.GetFacingDirection);
        let x = mod.XComponentOf(look);
        let z = mod.ZComponentOf(look);
        return mod.ArctangentInRadians(x / z);
    }

    /* returns a position projected forward from the player by the specified distance */
    getProjectedForwardPosition(distance: number) : mod.Vector
    {
        let origin = mod.GetSoldierState(this.player, mod.SoldierStateVector.GetPosition);
        let look = mod.GetSoldierState(this.player, mod.SoldierStateVector.GetFacingDirection);
        let forward = mod.Multiply(look, distance);
        return mod.Add(origin, forward);
    }

    /* teleports the player to the specified world position & retains the current look direction */
    setWorldPosition(position: mod.Vector): void
    {
        mod.Teleport(this.player, position, this.getYawAngleRadians());
    }

    /* enables or disables AI behavior for the bot instance */
    setAIBehavior(state: boolean): void
    {
        if (!this.isAI)
            return;


        mod.AIEnableShooting(this.player, state);
        mod.AIEnableTargeting(this.player, state);

        if (state)
        {
            mod.AIBattlefieldBehavior(this.player);
        }
        else
        {
            mod.AIIdleBehavior(this.player);
            mod.AISetStance(this.player, mod.Stance.Crouch);
        }
    }
}

/// ------------------------------ CZMATCHDATA ------------------------------- ///

export enum GameState
{
    WaitingForPlayers,
    PreRound,
    RoundActive,
    RoundEnd,
    MatchEnd
}

class CZMatchData
{
    state: GameState = GameState.WaitingForPlayers; // current game state
    roundNum: number = 0; // current rounds
    roundMax: number = 11; // best of 11 rounds (first to 6 wins)
    roundTime: number = 0; // time left for the current round in seconds
    roundTimeMax: number = 240; // max round time in seconds ( 4 minutes )
    matchTime: number = 0; // total accumulated match time in seconds
    scores: number[] = [0, 0]; // rounds won [team1, team2]
    currentPlayers: number = 0; // total connected players
    minPlayers: number = 2; // minimum players to start the match
    maxPlayers: number = 16; // maximum players allowed in the match
    bots: number = 0; // number of AI bots in the match

    // private singleton instance
    private static instance: CZMatchData | undefined;
    
    constructor() {}

    static get(): CZMatchData
    {
        // Singleton pattern to ensure only one instance of CZMatchData exists
        if (!this.instance) 
            this.instance = new CZMatchData(); // create new instance if none exists

        return this.instance;
    }

    static destroy(): void
    {
        this.instance = undefined; // destroy the instance
    }

    async update(): Promise<void>
    {
        switch (this.state)
        {
            case GameState.WaitingForPlayers:
                if (this.currentPlayers >= this.minPlayers)
                {
                    await this.startMatch();
                }
                break;
            case GameState.PreRound: 
                await this.startRound(); // start a new round
                break;
            case GameState.RoundActive:
                await this.updateRound();
                break;
            case GameState.RoundEnd: break;
            case GameState.MatchEnd: break;
            default: break;
        }

        let timeLeft = this.roundTime;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        console.log(`Match State: ${GameState[this.state]} | Round: ${this.roundNum}/${this.roundMax} | Time Left: ${minutes}:${seconds.toString().padStart(2, '0')} | Score: ${this.scores[0]} - ${this.scores[1]} | Players: ${this.currentPlayers} (Bots: ${this.bots})`);
        await mod.Wait(1); // wait 1 second before next update
    }

    async updateRound(): Promise<void>
    {
        this.roundTime--;   // decrement round time
        this.matchTime++;   // increment match time
        if (this.roundTime <= 0)
        {
            await this.endRound(0);  // end the round
        }
    }

    async startMatch(): Promise<void>
    {
        if (this.state !== GameState.WaitingForPlayers)
            return; // only start match if waiting for players

        this.roundNum = 0;
        this.scores = [0, 0];
        this.matchTime = 0;

        console.log("Starting Match");

        await this.preRound(); // start the first round immediately
    }

    async endMatch(): Promise<void>
    {
        mod.DisplayNotificationMessage(mod.Message("Final Score: {} - {}", this.scores[0], this.scores[1]));
        this.state = GameState.MatchEnd;

        // log seal stats
        console.log(`SEALS Rounds Won: ${this.scores[0]}`);
        for (let player of CZSeal.sealObjects)
        {
            let seal = CZSeal.get(player);
            if (!seal)
                continue;

            if (seal.teamID !== 1)
                continue; // only log team 1 (SEALS) stats for now
            console.log(`Player [${seal.playerID}] Stats: Kills: ${seal.stats.kills[1]}, Deaths: ${seal.stats.deaths[1]}, Headshots: ${seal.stats.headshots[1]}, Headhshot Kills: ${seal.stats.headshotKills[1]}, Shots on Friendly: ${seal.stats.shotsOnFriendly[1]}, Friendly Fire Kills: ${seal.stats.friendlyFireKills[1]}`);
            seal.stats.reset(); // reset all stats
        }

        console.log(`MERCS Rounds Won: ${this.scores[1]}`);
        for (let player of CZSeal.sealObjects)
        {
            let seal = CZSeal.get(player);
            if (!seal)
                continue;
            if (seal.teamID !== 2)
                continue; // only log team 2 (MERCS) stats for now
            console.log(`Player [${seal.playerID}] Stats: Kills: ${seal.stats.kills[1]}, Deaths: ${seal.stats.deaths[1]}, Headshots: ${seal.stats.headshots[1]}, Headhshot Kills: ${seal.stats.headshotKills[1]}, Shots on Friendly: ${seal.stats.shotsOnFriendly[1]}, Friendly Fire Kills: ${seal.stats.friendlyFireKills[1]}`);
            seal.stats.reset(); // reset all stats
        }

        await mod.Wait(15); // wait 15 seconds before resetting the match

        let host = this.getHostPlayer();
        if (host)
            mod.EndGameMode(host);
    }

    async preRound(): Promise<void>
    {
        this.setupPlayers(); // respawn all players for the new round
        this.state = GameState.PreRound; // transition to pre-round state
        console.log(`Preparing for Round ${this.roundNum + 1}`);
    }

    async startRound(): Promise<void>
    {
        this.roundNum++;
        this.roundTime = this.roundTimeMax;
        this.state = GameState.RoundActive;
        
        mod.DisplayNotificationMessage(mod.Message("Round {} of {} started", this.roundNum, this.roundMax));
    }

    async endRound(winner: number): Promise<void>
    {
        this.state = GameState.RoundEnd;

        // Update scores
        if (winner)
        {
            this.scores[winner - 1]++;
            mod.DisplayNotificationMessage(mod.Message("{} win", this.getTeamName(winner - 1)));
        }
        else
            mod.DisplayNotificationMessage(mod.Message("Round {} ended in a draw", this.roundNum));

        console.log(`Round ${this.roundNum} ended. Winner: ${winner === 0 ? 'Draw' : this.getTeamName(winner - 1)} | Score: ${this.scores[0]} - ${this.scores[1]}`);

        /* log seal stats */
        console.log("SEALS");
        for (let player of CZSeal.sealObjects)
        {
            let seal = CZSeal.get(player);
            if (!seal)
                continue;

            if (seal.teamID !== 1)
                continue; // only log team 1 (SEALS) stats for now
            console.log(`Player [${seal.playerID}][${seal.getHealthPercent().toFixed(0)}%] Stats: Kills: ${seal.stats.kills[0]}, Deaths: ${seal.stats.deaths[0]}, Headshots: ${seal.stats.headshots[0]}, Headhshot Kills: ${seal.stats.headshotKills[0]}, Shots on Friendly: ${seal.stats.shotsOnFriendly[0]}, Friendly Fire Kills: ${seal.stats.friendlyFireKills[0]}`);
            seal.stats.resetRound(); // reset round stats
        }

        /* log merc stats */
        console.log("MERCS");
        for (let player of CZSeal.sealObjects)
        {
            let seal = CZSeal.get(player);
            if (!seal)
                continue;
            if (seal.teamID !== 2)
                continue; // only log team 2 (MERCS) stats for now
            console.log(`Player [${seal.playerID}][${seal.getHealthPercent().toFixed(0)}%] Stats: Kills: ${seal.stats.kills[0]}, Deaths: ${seal.stats.deaths[0]}, Headshots: ${seal.stats.headshots[0]}, Headhshot Kills: ${seal.stats.headshotKills[0]}, Shots on Friendly: ${seal.stats.shotsOnFriendly[0]}, Friendly Fire Kills: ${seal.stats.friendlyFireKills[0]}`);
            seal.stats.resetRound(); // reset round stats
        }

        /* Check for match end */
        if (this.scores[0] >= 6 || this.scores[1] >= 6 || this.roundNum >= this.roundMax)
            await this.endMatch();
        else
        {
            await mod.Wait(5); // wait a few seconds before redeploying players
            mod.UndeployAllPlayers(); // undeploy all players for the next round
            await this.preRound(); // prepare for the next round
        }
    }

    // called when a player is eliminated (killed) during an active round
    OnElimination(eventPlayer: mod.Player): void
    {
        let victimTeam = mod.GetTeam(eventPlayer);
        let victimTeamID = mod.GetObjId(victimTeam);
        let victimTeamAlivePlayers = this.getAlivePlayers(victimTeam); // update alive players for the team

        let otherTeamID = victimTeamID === 1 ? 2 : 1;
        let otherTeam = mod.GetTeam(otherTeamID);
        let otherTeamAlivePlayers = this.getAlivePlayers(otherTeam);

        let team1Alive = otherTeamID === 1 ? otherTeamAlivePlayers.length : victimTeamAlivePlayers.length;
        let team2Alive = otherTeamID === 1 ? victimTeamAlivePlayers.length : otherTeamAlivePlayers.length;
        
        /* check for team elimination - only end round if ALL players on a team are dead */
        let winner: number | null = null;
        if (team1Alive > 0 && team2Alive === 0)
            winner = 1; // team 1 wins
        else if (team2Alive > 0 && team1Alive === 0)
            winner = 2; // team 2 wins

        console.log(`[+] SEALS Alive: ${team1Alive} | MERCS Alive: ${team2Alive}`);
        if (winner === null)
            return; // no winner yet , round continues

        this.endRound(winner);
    }

    setupPlayers(): void
    {
        for (let player of CZSeal.sealObjects)
        {
            let seal = CZSeal.get(player);
            if (!seal)
                continue;

            seal.Respawn();
        }
    }

    getAlivePlayers(team: mod.Team): mod.Player[]
    {
        let teamID = mod.GetObjId(team);
        let alivePlayers: mod.Player[] = [];
        for (let player of CZSeal.sealObjects)
        {
            let seal = CZSeal.get(player);
            if (!seal || !seal.isAlive || seal.teamID !== teamID)
                continue;

            alivePlayers.push(player);
        }
        return alivePlayers;
    }

    getHostPlayer(): mod.Player | undefined
    {
        // Find the first valid, non-AI player to act as host
        for (let player of CZSeal.sealObjects) {
            let seal = CZSeal.get(player);
            if (seal && !seal.isAI) {
                return player;
            }
        }

        // If no non-AI players, return the first player (could be AI)
        if (CZSeal.sealObjects.length > 0)
            return CZSeal.sealObjects[0];

        return undefined;
    }

    getTeamName(team: number): string
    {
        return team === 0 ? "SEALS" : "MERCS";
    }

    // returns true if the game is in an active gameplay state excluding pre-round and waiting for players
    isGamePlayActive(): boolean
    {
        return this.state === GameState.RoundActive || this.state === GameState.RoundEnd || this.state === GameState.MatchEnd;
    }
}

class CZConsole 
{
    // Helper method to safely get the proper number of parameters for Message function
    private static createMessage(stringKey: string | number, ...args: (string | number | mod.Player)[]): mod.Message
    {
        // Ensure we don't exceed the 3-parameter limit for Message function
        const safeArgs = args.slice(0, 3);
        
        switch (safeArgs.length) {
            case 0:
                return mod.Message(stringKey);
            case 1:
                return mod.Message(stringKey, safeArgs[0]);
            case 2:
                return mod.Message(stringKey, safeArgs[0], safeArgs[1]);
            case 3:
                return mod.Message(stringKey, safeArgs[0], safeArgs[1], safeArgs[2]);
            default:
                return mod.Message(stringKey);
        }
    }

    // Log methods with overloads for 0-3 parameters
    static log(message: string): void;
    static log(message: string, arg0: string | number | mod.Player): void;
    static log(message: string, arg0: string | number | mod.Player, arg1: string | number | mod.Player): void;
    static log(message: string, arg0: string | number | mod.Player, arg1: string | number | mod.Player, arg2: string | number | mod.Player): void;
    static log(message: string, ...args: (string | number | mod.Player)[]): void
    {
        const msg = this.createMessage(mod.stringkeys.log, message, ...args);
        mod.DisplayNotificationMessage(msg);
    }

    // Warn methods with overloads for 0-3 parameters  
    static warn(message: string): void;
    static warn(message: string, arg0: string | number | mod.Player): void;
    static warn(message: string, arg0: string | number | mod.Player, arg1: string | number | mod.Player): void;
    static warn(message: string, arg0: string | number | mod.Player, arg1: string | number | mod.Player, arg2: string | number | mod.Player): void;
    static warn(message: string, ...args: (string | number | mod.Player)[]): void
    {
        const msg = this.createMessage(mod.stringkeys.warn, message, ...args);
        mod.DisplayNotificationMessage(msg);
    }

    // Error methods with overloads for 0-3 parameters
    static error(message: string): void;
    static error(message: string, arg0: string | number | mod.Player): void;
    static error(message: string, arg0: string | number | mod.Player, arg1: string | number | mod.Player): void;
    static error(message: string, arg0: string | number | mod.Player, arg1: string | number | mod.Player, arg2: string | number | mod.Player): void;
    static error(message: string, ...args: (string | number | mod.Player)[]): void
    {
        const msg = this.createMessage(mod.stringkeys.error, message, ...args);
        mod.DisplayNotificationMessage(msg);
    }
}



// https://github.com/JDWardle/BFPortalScripts/blob/main/logging/logging.ts
export namespace Logging {
    const loggingVersion = "0.0.1"

    const logMessageWidgetName = "loggermessage";
    const containerWidgetName = "loggercontainer";

    export enum LogLevel {
        Debug,
        Info,
        Warning,
        Error,
    }

    type LogMessage = {
        message: mod.Message;
        level: LogLevel;
        displayedAt: number;
        displayed: boolean;
        textWidget: mod.UIWidget;
    };

    export class Logger {
        #rootUi: mod.UIWidget;
        #visible = false;
        #logLevel = LogLevel.Debug;
        #messages: LogMessage[] = [];
        #maxVisible: number = 20;
        #cleanupLogAfterSeconds: number = 10;
        #debugTextColor: mod.Vector = mod.CreateVector(1, 1, 1);
        #infoTextColor: mod.Vector = mod.CreateVector(65/255, 89/255, 130/255);
        #warningTextColor: mod.Vector = mod.CreateVector(1, 193/255, 0);
        #errorTextColor: mod.Vector = mod.CreateVector(1, 69/255, 69/255);

        constructor(logLevel: LogLevel = LogLevel.Debug, maxVisible: number = 20, cleanupLogAfterSeconds: number = 10) {
            this.#maxVisible = maxVisible;
            this.#cleanupLogAfterSeconds = cleanupLogAfterSeconds;
            this.#logLevel = logLevel;

            mod.AddUIContainer(
                containerWidgetName,
                mod.CreateVector(0, 0, 0),
                mod.CreateVector(700, 100, 0),
                mod.UIAnchor.TopLeft,
                mod.GetUIRoot(),
                false,
                0,
                mod.CreateVector(0, 0, 0),
                1,
                mod.UIBgFill.GradientTop
            );

            this.#rootUi = mod.FindUIWidgetWithName(containerWidgetName) as mod.UIWidget;
            // Copied from the SDK ParseUI function, seems to be necessary for some reason?
            mod.SetUIWidgetName(this.#rootUi, '');
        }

        update(): void {
            let visibleMessage = false;
            const elapsedTime = mod.GetMatchTimeElapsed();

            // Iterate over messages in reverse order so new messages show on top.
            let j = 0;
            for (let i = this.#messages.length - 1; i >= 0; i--) {
                const message = this.#messages[i];

                // Cleanup displayed messages that are older than the specified log cleanup duration.
                if (message.displayed && (elapsedTime - message.displayedAt) >= this.#cleanupLogAfterSeconds) {
                    // Not sure if this is needed. But doing it anyway, the message will never be seen again.
                    mod.DeleteUIWidget(message.textWidget);
                    this.#messages.splice(i, 1);
                    continue;
                }

                const visible = j < this.#maxVisible;

                mod.SetUIWidgetVisible(message.textWidget, visible);

                if (visible) {
                    // Track that the message was displayed to allow for cleanup later on.
                    message.displayed = true;
                    if (message.displayedAt < 0) {
                        message.displayedAt = elapsedTime;
                    }
                    visibleMessage = true;

                    const yPos = j * 12;
                    mod.SetUIWidgetPosition(message.textWidget, mod.CreateVector(0, yPos, 0));
                    j++;
                }
            }

            if (visibleMessage) {
                this.show();
            } else {
                this.hide();
            }
        }

        show(): void {
            if (this.#visible) {
                return;
            }

            mod.SetUIWidgetVisible(this.#rootUi, true);
            this.#visible = true;
        }

        hide(): void {
            if (!this.#visible) {
                return;
            }

            mod.SetUIWidgetVisible(this.#rootUi, false);
            this.#visible = false;
        }

        debug(...messages: mod.Message[]): void {
            if (this.#logLevel > LogLevel.Debug) {
                return;
            }

            for (const msg of messages) {
                const textWidget = _createLogTextWidget(msg, this.#debugTextColor, false, this.#rootUi);

                this.#messages.push({
                    message: msg,
                    level: LogLevel.Debug,
                    textWidget: textWidget,
                    displayed: false,
                    displayedAt: -1
                });
            }
        }

        info(...messages: mod.Message[]): void {
            if (this.#logLevel > LogLevel.Info) {
                return;
            }

            for (const msg of messages) {
                const textWidget = _createLogTextWidget(msg, this.#infoTextColor, false, this.#rootUi);

                this.#messages.push({
                    message: msg,
                    level: LogLevel.Info,
                    textWidget: textWidget,
                    displayed: false,
                    displayedAt: -1
                });
            }
        }

        warning(...messages: mod.Message[]): void {
            if (this.#logLevel > LogLevel.Warning) {
                return;
            }

            for (const msg of messages) {
                const textWidget = _createLogTextWidget(msg, this.#warningTextColor, false, this.#rootUi);

                this.#messages.push({
                    message: msg,
                    level: LogLevel.Warning,
                    textWidget: textWidget,
                    displayed: false,
                    displayedAt: -1
                });
            }
        }

        // TODO: Error should probably call mod.SendErrorReport once it's working.
        error(...messages: mod.Message[]): void {
            for (const msg of messages) {
                const textWidget = _createLogTextWidget(msg, this.#errorTextColor, false, this.#rootUi);

                this.#messages.push({
                    message: msg,
                    level: LogLevel.Error,
                    textWidget: textWidget,
                    displayed: false,
                    displayedAt: -1
                });
            }
        }
    }

    function _createLogTextWidget(message: mod.Message, textColor: mod.Vector, visible = false, parentUI: mod.UIWidget): mod.UIWidget {
        if (!parentUI) {
            parentUI = mod.GetUIRoot();
        }

        mod.AddUIText(
            logMessageWidgetName,
            mod.CreateVector(0, 0, 0),
            mod.CreateVector(700, 24, 0),
            mod.UIAnchor.TopLeft,
            parentUI,
            visible,
            0,
            mod.CreateVector(0.25, 0.25, 0.25),
            0,
            mod.UIBgFill.Solid,
            message,
            12,
            textColor,
            1,
            mod.UIAnchor.CenterLeft
        );

        const widget = mod.FindUIWidgetWithName(logMessageWidgetName, parentUI) as mod.UIWidget;;
        // Copied from the SDK ParseUI function, seems to be necessary for some reason?
        mod.SetUIWidgetName(widget, '');
        return widget;
    }
}

const log = new Logging.Logger(Logging.LogLevel.Debug, 10, 10); // LogLevel, max visible messages, cleanup time in seconds