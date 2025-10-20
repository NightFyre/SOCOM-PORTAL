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


    - wait for x amount of players to start the match ( maybe have a pre-game arena )
    - disable deploy & undeploy all players ,  spin up match logic , re-enable deployment & spawn player 1 by 1
    - OnPlayerDeath: disarm the player , set dead state , return to deployment screen with deployment disabled
    - match data waits for round end ( all players on one team dead or time limit reached )
    - undeploy all players , wait a few seconds , reset player states , redeploy all players
    - repeat until one team wins the majority of rounds

*/
// import * as modlib from 'modlib'; // required on server side
import * as modlib from '../PortalSDK/code/modlib'; // for local testing
const WorldIcon_Team_Players = 700; // 700 - 715

////////////////////////////////// PLAYER EVENTS ///////////////////////////////////////

// Triggered when player joins the game. Useful for pregame setup, team management, etc.
export function OnPlayerJoinGame(eventPlayer: mod.Player): void 
{
    let matchData = CZMatchData.get();
    if (!matchData)
        return;

    return matchData.OnPlayerJoined(eventPlayer);
}

// Triggered when player leaves the game. Useful for clean up logic, team management, etc.
export function OnPlayerLeaveGame(eventNumber: number): void 
{
    let matchData = CZMatchData.get();
    if (!matchData)
        return;

    matchData.OnPlayerLeft(eventNumber);
}

// Triggered when player selects their class and deploys into game. Useful for any spawn/start logic.
export function OnPlayerDeployed(eventPlayer: mod.Player): void 
{
    let matchData = CZMatchData.get();
    if (!matchData)
        return;

    matchData.OnPlayerSpawned(eventPlayer);
}

// This will trigger when the Player dies and returns to the deploy screen.
export function OnPlayerUndeploy(eventPlayer: mod.Player): void 
{ 
    let matchData = CZMatchData.get();
    if (!matchData)
        return;

    matchData.OnPlayerReturnedToDeployScreen(eventPlayer);
}

// Triggered on player death/kill, returns dying player, the killer, etc. Useful for updating scores, updating progression, handling any death/kill related logic.
export function OnPlayerDied( eventPlayer: mod.Player,  eventOtherPlayer: mod.Player,  eventDeathType: mod.DeathType,  eventWeaponUnlock: mod.WeaponUnlock ): void 
{
    /* get match data instance , only update if round is active */
    let matchData = CZMatchData.get();
    if (!matchData || matchData.state !== GameState.RoundActive)
        return;

    /* get seal victim instance */
    let victim = CZSeal.get(eventPlayer);
    if (!victim)
        return;

    if (!victim.isAlive) // player already dead , ignore
    {
        victim.isArmed = true; // prevent the player from deplying with a weapon
        return;
    }

    /* ignore redeploy deaths */
    if (mod.EventDeathTypeCompare(eventDeathType, mod.PlayerDeathTypes.Redeploy))
        return;

    victim.OnPlayerDied(eventDeathType, eventOtherPlayer);

    matchData.OnPlayerEliminated(eventPlayer);
}

export function OnPlayerEarnedKill( eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock ): void { }
export function OnPlayerEarnedAssist( eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock ): void 
{ 
    let shooter = CZSeal.get(eventPlayer);
    if (!shooter)
        return;

    shooter.OnEarnedAssist(eventOtherPlayer, eventDeathType);
}

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

    /* Initialize UI widgets */
    UI.RoundInfoWidget.init();

    /* create match data instance */
    let matchData = CZMatchData.get();

    const deployCam = mod.GetSpatialObject(1003);
    if (mod.GetObjId(deployCam) === 1003)
    {
        mod.SetObjectTransform(deployCam, mod.CreateTransform(mod.CreateVector(0,0,-100), mod.CreateVector(0,90,0)));
        console.log("found deploy cam , resetting transform");
    }

    // setup world icons
    for (let i = 0; i < 16; i++)
    {
        const icon = mod.GetWorldIcon(WorldIcon_Team_Players + i); // preload team player icons
        mod.EnableWorldIconImage(icon, false); // disable icon image
        mod.EnableWorldIconText(icon, false); // disable icon text
        mod.SetWorldIconColor(icon, mod.CreateVector(1, 1, 1)); // white color
        mod.SetWorldIconPosition(icon, mod.CreateVector(0, 0, -100000)); // move icon out of view and bury it deep
    }

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

    matchData.updateTags();

    // Update score widget UI
    UI.RoundInfoWidget.update();

    // Check all players for camera updates (runs every frame)
    for (let player of CZSeal.sealObjects)
    {
        let seal = CZSeal.get(player);
        if (!seal || !seal.isValid())
            continue;

        /* update camera state */
        seal.CameraUpdate(); // update camera state if alive and not AI
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
    assists: number[] = [0, 0]; // number of assists
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
        this.assists[1] += this.assists[0];
        this.assists[0] = 0; // reset round stats
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
        this.assists = [0, 0];
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
    playerTeam: mod.Team;
    teamID: number;
    isAI: boolean;
    name: mod.Message;
    teamIcon: mod.WorldIcon;
    hasSpawned: boolean = false;
    isAlive: boolean = false;
    maxHealth = 100; // AI get 200 health , players get 100
    currentHealth = 100;
    isZooming: boolean = false;
    isArmed: boolean = true;
    isAdmin: boolean = false; // Track if this player is an admin
    cameraView: SoldierCameraView = SoldierCameraView.RightShoulder; // current camera view mode

    // zoom pattern detection for shoulder switching
    private inputDetector = new Utility.Input();

    // seal stats
    stats: CZSealStats = new CZSealStats();

    // static list of all player instances
    static sealObjects: mod.Player[] = [];

    /* should only be created via CZSeal.get() */
    constructor(player: mod.Player)
    {
        this.player = player;
        this.playerID = mod.GetObjId(player);
        this.playerTeam = mod.GetTeam(player);
        this.teamID = mod.GetObjId(this.playerTeam); // teamID should be 1 or 2
        this.isAI = mod.GetSoldierState(player, mod.SoldierStateBool.IsAISoldier);
        this.name = this.getPlayerName();
        this.teamIcon = mod.GetWorldIcon(WorldIcon_Team_Players + this.playerID);
        mod.SetWorldIconText(this.teamIcon, mod.Message("{}", this.player));
        mod.SetWorldIconOwner(this.teamIcon, this.playerTeam);
        mod.EnableWorldIconText(this.teamIcon, true);
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
                console.log(`Created CZSeal for Player ID: ${playerID} | TeamID: ${seal.teamID} | isAI: ${seal.isAI} | Name: ${seal.name.toString()}`);
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

            // clear icon owner
            mod.EnableWorldIconImage(seal.teamIcon, false); // disable icon image
            mod.EnableWorldIconText(seal.teamIcon, false); // disable icon text
            mod.SetWorldIconOwner(seal.teamIcon, this.#allSealPlayers[0].player); // set icon owner to server owner
            mod.SetWorldIconText(seal.teamIcon, mod.Message("this should not be visible")); // clear name
            mod.SetWorldIconPosition(seal.teamIcon, mod.CreateVector(0, 0, -100000)); // move icon out of view and bury it deep

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
    CameraUpdate(): void
    {
        if (this.isAI)
            return;
        
        /* get zoom state */
        let isCurrentlyZooming = mod.GetSoldierState(this.player, mod.SoldierStateBool.IsZooming);
        if (isCurrentlyZooming == this.isZooming)
            return;

        /* detect zoom pattern for shoulder switching */
        if (this.inputDetector.dtcInput(this.player, isCurrentlyZooming))
            this.switchShoulderView();

        /* set zoom state */
        this.isZooming = isCurrentlyZooming;
        let currentShoulder = this.cameraView === SoldierCameraView.RightShoulder ? 0 : 1;
        
        /* update camera */
        mod.SetCameraTypeForPlayer(this.player, this.isZooming ? mod.Cameras.FirstPerson : mod.Cameras.ThirdPerson, currentShoulder);
    }

    /* switch between left and right shoulder view */
    private switchShoulderView(): void
    {
        this.cameraView = this.cameraView === SoldierCameraView.RightShoulder ? 
            SoldierCameraView.LeftShoulder : 
            SoldierCameraView.RightShoulder;
    }

    /* triggered when the player earns an assist */
    OnEarnedAssist(eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType): void
    {
        if (!this.isAlive)
            return;

        let victim = CZSeal.get(eventOtherPlayer);
        if (!victim)
            return;

        this.stats.assists[0]++;
        console.log(`Player ${this.playerID} earned an assist on Player ${victim.playerID}`);
        // mod.DisplayHighlightedWorldLogMessage(mod.Message("elimination assist"), this.player);
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
        console.log(`Player ${shooter.playerID} damaged Player ${this.playerID} for ${damageReceived.toFixed(1)} damage`);
        // mod.DisplayHighlightedWorldLogMessage(mod.Message("{}", damageReceived.toFixed(1)), shooter.player);
    }

    /* triggered when the player dies */
    OnPlayerDied(eventDeathType: mod.DeathType, eventOtherPlayer: mod.Player | undefined): void
    {
        //  mod.SetCameraTypeForPlayer(this.player, mod.Cameras.Free); // set death camera

        if (!this.isAlive)
            return;

        this.isAlive = false;
        this.stats.deaths[0]++;
        this.currentHealth = 0;
        mod.EnableWorldIconText(this.teamIcon, false);

        /* get killer seal instance */
        let killerSeal = CZSeal.get(eventOtherPlayer as mod.Player);
        if (!killerSeal || !killerSeal.isAlive) // killer is not alive , ignore
            return;

        /* check for self-harm */
        if (killerSeal === this)
        {
            console.log(`Player ${killerSeal.playerID} killed themselves`);
            //  log.info(mod.Message("{} killed themselves", killerSeal.player));
            return;
        }

        /* check for friendly fire */
        let bFriendlyFire = killerSeal.teamID === this.teamID;
        if (bFriendlyFire)
        {
            killerSeal.stats.friendlyFireKills[0]++; // increment friendly fire kills count
            this.stats.friendlyFireDeaths[0]++; // increment friendly fire deaths count
            console.log(`Player ${killerSeal.playerID} team killed friendly Player ${this.playerID}`);
            // log.info(mod.Message("{} team killed friendly Player {}", killerSeal.player, this.player)); : removed as hud will now display this
            mod.DisplayNotificationMessage(mod.Message("FRIENDLY FIRE WILL NOT BE TOLERATED"), killerSeal.player);

            /* HANDLE EXCESSIVE FRIENDLY FIRE */
            if (killerSeal.stats.friendlyFireKills[0] >= 2)
            {
                mod.Kill(killerSeal.player); // kill the killer for excessive friendly fire
                console.log(`Player ${killerSeal.playerID} has been removed from the round for excessive friendly fire`);
                log.info(mod.Message("{} removed from play due to excessive friendly fire", killerSeal.player));
                mod.DisplayNotificationMessage(mod.Message("FRIENDLY FIRE: YOU HAVE BEEN REMOVED FROM PLAY"), killerSeal.player);
            }

            return;
        }

        killerSeal.stats.kills[0]++;
        if (mod.EventDeathTypeCompare(eventDeathType, mod.PlayerDeathTypes.Headshot))
            killerSeal.stats.headshotKills[0]++;

        log.info(mod.Message("{} eliminated {}", killerSeal.player, this.player));
        // mod.DisplayHighlightedWorldLogMessage(mod.Message("elimination"), killerSeal.player);
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

    /* checks if the player is alive */
    isValid(): boolean
    {
        return mod.GetSoldierState(this.player, mod.SoldierStateBool.IsAlive);
    }
    
    getPlayerName(): mod.Message
    {
        return mod.Message("getPlayerName", this.player);
    }

    /* returns health percent (0-100) */
    getHealthPercent() : number
    {
        return (this.currentHealth / this.maxHealth) * 100;
        //  let currentHealth = mod.GetSoldierState(this.player, mod.SoldierStateNumber.CurrentHealth);
        //  let maxHealth = mod.GetSoldierState(this.player, mod.SoldierStateNumber.MaxHealth);
        //  return (currentHealth / maxHealth) * 100;
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
            case GameState.RoundActive:
                this.updateRound();
                break;
            default: break;
        }

        let timeLeft = this.roundTime;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        console.log(`Match State: ${GameState[this.state]} | Round: ${this.roundNum}/${this.roundMax} | Time Left: ${minutes}:${seconds.toString().padStart(2, '0')} | Score: ${this.scores[0]} - ${this.scores[1]} | Players: ${this.currentPlayers} (Bots: ${this.bots})`);
        await mod.Wait(1); // wait 1 second before next update
    }

    // update the position of player name tags
    updateTags(): void
    {
        for (let player of CZSeal.sealObjects)
        {
            let seal = CZSeal.get(player);
            if (!seal || !seal.isValid())
                continue;
            
            mod.SetWorldIconOwner(seal.teamIcon, seal.playerTeam);
            mod.SetWorldIconPosition(seal.teamIcon, mod.GetSoldierState(player, mod.SoldierStateVector.GetPosition));
            mod.SetWorldIconText(seal.teamIcon, mod.Message("{}", seal.player));
        }
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

        mod.DeployAllPlayers(); // deploy all players for a warm up period
        mod.DisplayNotificationMessage(mod.Message("Match starting in 15 seconds..."));
        await mod.Wait(15); // wait 15 seconds before starting the match

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
            log.info(mod.Message("- {} Stats: Kills: {}, Deaths: {}", seal.player, seal.stats.kills[1], seal.stats.deaths[1]));
            seal.stats.reset(); // reset all stats
        }
        log.info(mod.Message("SEALS Rounds Won: {}", this.scores[0]));

        console.log(`MERCS Rounds Won: ${this.scores[1]}`);
        for (let player of CZSeal.sealObjects)
        {
            let seal = CZSeal.get(player);
            if (!seal)
                continue;
            if (seal.teamID !== 2)
                continue; // only log team 2 (MERCS) stats for now
            console.log(`Player [${seal.playerID}] Stats: Kills: ${seal.stats.kills[1]}, Deaths: ${seal.stats.deaths[1]}, Headshots: ${seal.stats.headshots[1]}, Headhshot Kills: ${seal.stats.headshotKills[1]}, Shots on Friendly: ${seal.stats.shotsOnFriendly[1]}, Friendly Fire Kills: ${seal.stats.friendlyFireKills[1]}`);
            log.info(mod.Message("- {} Stats: Kills: {}, Deaths: {}", seal.player, seal.stats.kills[1], seal.stats.deaths[1]));
            seal.stats.reset(); // reset all stats
        }
        log.info(mod.Message("MERCS Rounds Won: {}", this.scores[1]));

        await mod.Wait(15); // wait 15 seconds before resetting the match

        let host = this.getHostPlayer();
        if (host)
            mod.EndGameMode(host);
    }

    async preRound(): Promise<void>
    {
        this.state = GameState.PreRound; // transition to pre-round state

        mod.SetSpawnMode(mod.SpawnModes.AutoSpawn); // force auto spawn
        mod.EnableAllPlayerDeploy(true); // enable deploy for all players
        mod.UndeployAllPlayers(); // undeploy all players for the next round
        await mod.Wait(3); // wait a few seconds for the game to do its undeploy logic
        
        /* respawn all players one at a time */
        for (let player of CZSeal.sealObjects)
        {
            let seal = CZSeal.get(player);
            if (!seal)
                continue;
            
            seal.hasSpawned = false;
            seal.currentHealth = seal.maxHealth;
            seal.isZooming = false;
            seal.isArmed = true;

            mod.DeployPlayer(seal.player); // deploy the player
            mod.SetWorldIconOwner(seal.teamIcon, seal.playerTeam);
            mod.EnableWorldIconText(seal.teamIcon, true);

            if (seal.isAI)
                seal.setAIBehavior(true); // set ai to battlefield behavior
        }

        mod.SetSpawnMode(mod.SpawnModes.Deploy); // restore normal spawn mode

        
        this.startRound(); // start a new round
        
        console.log(`Preparing for Round ${this.roundNum}`);
    }

    startRound(): void
    {
        this.roundNum++;
        this.roundTime = this.roundTimeMax;

        this.state = GameState.RoundActive;
        mod.EnableAllPlayerDeploy(false); // disable redeployment for all players
        mod.DisplayNotificationMessage(mod.Message("Round {} of {} started", this.roundNum, this.roundMax));
    }

    async endRound(winner: number): Promise<void>
    {
        this.state = GameState.RoundEnd;

        // Update scores
        if (winner)
        {
            this.scores[winner - 1]++;
            mod.DisplayNotificationMessage(mod.Message("{} win round {}", this.getTeamName(winner - 1), this.roundNum));
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
            await mod.Wait(7); // wait a few seconds before redeploying players ( notification is 6 seconds )
            await this.preRound(); // prepare for the next round
        }
    }

    /* triggered when a player joins the game */
    OnPlayerJoined(eventPlayer: mod.Player): void
    {
        const playerID = mod.GetObjId(eventPlayer);
        console.log(`Player joined the game with id: ${playerID}`);
        let seal = CZSeal.get(eventPlayer);
        if (!seal)
            return; // invalid seal object

        mod.SetRedeployTime(eventPlayer, 0.0); // disable redeploy timer
        
        /* add player to match data */
        this.currentPlayers++;

        /* add bot count if AI */
        if (seal.isAI)
            this.bots++;

        
        // check if the match is in progress
        if (this.state !== GameState.WaitingForPlayers)
        {
            // match is currently in progress , auto spawn should be disabled , set player as dead to prevent any possible bugs & disable their ability to redeploy
            // hopefully everything else is handled on the start of the new round.
            seal.isAlive = false; // set player as dead
            seal.isArmed = true; // set flag so player is disarmed if a deployment happens to occur
            mod.EnablePlayerDeploy(eventPlayer, false); // disable redeploy / respawn
            console.log(`Player ${seal.playerID} joined during active match , set as dead`);
            return;
        }
        log.info(mod.Message("{} joined the game", seal.player));
    }

    /* triggered when a player leaves the game */
    OnPlayerLeft(eventNumber: number): void
    {
        let seal = CZSeal.getPlayerByID(eventNumber);
        if (!seal)
            return; // invalid seal object
        
        this.currentPlayers--;
        this.bots -= seal.isAI ? 1 : 0;

        /* log event */
        console.log(`Player Left: ID: ${seal.playerID} | TeamID: ${seal.teamID}`);
        log.info(mod.Message("{} left the game", seal.player));

        /* remove player */
        CZSeal.remove(eventNumber);
    }

    /* trigged when a player deploys */
    OnPlayerSpawned(eventPlayer: mod.Player): void
    {
        /* players are only ever "deployed" via preRound() method , just before GameState.PreRound*/ 
        if (this.state !== GameState.PreRound)
            return; // ignore spawns while waiting for players

        let seal = CZSeal.get(eventPlayer);
        if (!seal)
            return;

        seal.playerTeam = mod.GetTeam(eventPlayer); // update team
        seal.teamID = mod.GetObjId(seal.playerTeam); // update teamID

        /* seal already spawned for this round */
        if (seal.hasSpawned)
        {
            if (seal.isAI)
                seal.setAIBehavior(false);

            seal.Disarm(); // disarm the player to prevent exploits
            return; // already spawned
        }

        /* new round spawn , set player state */

        /* set seal state */
        seal.hasSpawned = true;
        seal.isAlive = true;

        /* set camera type to 3rd person */
        if (!seal.isAI)
        {
            /* hack for fixing under map camera */
            mod.SetCameraTypeForPlayer(eventPlayer, mod.Cameras.FirstPerson); // set to first person
            mod.Wait(1); // wait 1 frame
            mod.SetCameraTypeForPlayer(seal.player, mod.Cameras.ThirdPerson, seal.cameraView === SoldierCameraView.RightShoulder ? 0 : 1);
        }
        else
            seal.setAIBehavior(true);

        console.log(`Player ${seal.playerID} spawned for team ${seal.teamID} | isAI: ${seal.isAI}`);
    }

    OnPlayerReturnedToDeployScreen(eventPlayer: mod.Player): void
    {

    }

    OnPlayerDamaged(eventPlayer: mod.Player, eventDamageType: mod.DamageType, eventOtherPlayer: mod.Player): void
    {

    }    

    // called when a player is eliminated (killed) during an active round
    OnPlayerEliminated(eventPlayer: mod.Player): void
    {
        /*
            check for round end / victory conditions
            a team wins when all players on the opposing team are eliminated
        */

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

        if (winner === null)
            return; // no winner yet , round continues

        this.endRound(winner);
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

    // returns true if the game is in an active gameplay state excluding waiting for players
    isGamePlayActive(): boolean
    {
        return this.state === GameState.PreRound || this.state === GameState.RoundActive || this.state === GameState.RoundEnd || this.state === GameState.MatchEnd;
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

/// ------------------------------ NAMESPACE ------------------------------- ///

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
            16, // text size
            textColor, // text color
            1, // text alpha
            mod.UIAnchor.CenterLeft
        );

        const widget = mod.FindUIWidgetWithName(logMessageWidgetName, parentUI) as mod.UIWidget;;
        // Copied from the SDK ParseUI function, seems to be necessary for some reason?
        mod.SetUIWidgetName(widget, '');
        return widget;
    }
}
const log = new Logging.Logger(Logging.LogLevel.Debug, 10, 10); // LogLevel, max visible messages, cleanup time in seconds


// https://staging.d70cu09wjw7ws.amplifyapp.com/
// https://discord.com/channels/870246147455877181/1428410039080718487
export namespace UI {

    export class RoundInfoWidget
    {
    
        static widget = modlib.ParseUI(
        {
          type: "Container",
          name: "Container_Round_Info",
          //    position: [-10, -250],
          position: [0, 0],
          size: [220, 100],
          anchor: mod.UIAnchor.TopCenter,
          visible: true,
          textLabel: "",
          textColor: [1, 1, 1],
          textAlpha: 0.5,
          textSize: 24,
          textAnchor: mod.UIAnchor.Center,
          padding: 10,
          bgColor: [0.1, 0.1, 0.1],
          bgAlpha: 0.8,
          bgFill: mod.UIBgFill.Blur,
          imageType: mod.UIImageType.None,
          imageColor: [1, 1, 1],
          imageAlpha: 1,
          buttonEnabled: false,
          children: [
            {
              type: "Text",
              name: "Text_Score_SealsRemaining",
              position: [0, 0],
              size: [90, 50],
              anchor: mod.UIAnchor.TopLeft,
              visible: true,
              textLabel: "SEALs: 0",
              textColor: [0.2, 0.6, 1],
              textAlpha: 1,
              textSize: 18,
              textAnchor: mod.UIAnchor.Center,
              padding: 5,
              bgColor: [0.1, 0.1, 0.1],
              bgAlpha: 0,
              bgFill: mod.UIBgFill.Solid,
              imageType: mod.UIImageType.None,
              imageColor: [1, 1, 1],
              imageAlpha: 1,
              buttonEnabled: false
            },
            {
              type: "Text",
              name: "Text_Score_MercsRemaining",
              position: [0, 0],
              size: [90, 50],
              anchor: mod.UIAnchor.TopRight,
              visible: true,
              textLabel: "MERCs: 0",
              textColor: [1, 0.3, 0.3],
              textAlpha: 1,
              textSize: 18,
              textAnchor: mod.UIAnchor.Center,
              padding: 5,
              bgColor: [0.1, 0.1, 0.1],
              bgAlpha: 0,
              bgFill: mod.UIBgFill.Solid,
              imageType: mod.UIImageType.None,
              imageColor: [1, 1, 1],
              imageAlpha: 1,
              buttonEnabled: false
            },
            {
              type: "Text",
              name: "Text_Score_RoundTime",
              position: [0, 0],
              size: [180, 50],
              anchor: mod.UIAnchor.BottomCenter,
              visible: true,
              textLabel: "4:00",
              textColor: [1, 1, 1],
              textAlpha: 1,
              textSize: 22,
              textAnchor: mod.UIAnchor.Center,
              padding: 5,
              bgColor: [0.1, 0.1, 0.1],
              bgAlpha: 0,
              bgFill: mod.UIBgFill.Solid,
              imageType: mod.UIImageType.None,
              imageColor: [1, 1, 1],
              imageAlpha: 1,
              buttonEnabled: false
            }
          ]
        }
        );

        // Store widget references for updates
        static sealsText: mod.UIWidget | undefined;
        static mercsText: mod.UIWidget | undefined;
        static timeText: mod.UIWidget | undefined;


        private constructor() {}

        // Initialize widget references
        static init(): void 
        {
            this.sealsText = mod.FindUIWidgetWithName("Text_Score_SealsRemaining");
            this.mercsText = mod.FindUIWidgetWithName("Text_Score_MercsRemaining");
            this.timeText = mod.FindUIWidgetWithName("Text_Score_RoundTime");
        }

        // Update the score widget with current game data
        static update(): void {
            let matchData = CZMatchData.get();
            if (!matchData) {
                return;
            }

            // Get alive player counts for each team
            let team1 = mod.GetTeam(1);
            let team2 = mod.GetTeam(2);
            let sealsAlive = matchData.getAlivePlayers(team1).length;
            let mercsAlive = matchData.getAlivePlayers(team2).length;

            // Format time remaining and status based on game state
            let timeString = "00:00";
            let showTimeWidget = true;

            switch (matchData.state) {
                case GameState.WaitingForPlayers:
                    timeString = "Waiting for players...";
                    showTimeWidget = false;
                    break;
                case GameState.PreRound:
                    timeString = "Preparing...";
                    break;
                case GameState.RoundEnd:
                    timeString = "Round Over";
                    break;
                case GameState.MatchEnd:
                    timeString = "Match Over";
                    break;
                default: break;
            }

            /* SEALs ALIVE */
            if (this.sealsText)
                mod.SetUITextLabel(this.sealsText, mod.Message("SEALs: {}", sealsAlive));

            /* MERCs ALIVE */
            if (this.mercsText)
                mod.SetUITextLabel(this.mercsText, mod.Message("MERCs: {}", mercsAlive));

            /* ROUND TIMER */
            if (this.timeText) {
                if (matchData.state == GameState.RoundActive) {
                    let timeLeft = matchData.roundTime;
                    let minutes = Math.floor(timeLeft / 60);
                    let seconds = timeLeft % 60;
                    if (seconds < 10) {
                        mod.SetUITextLabel(this.timeText, mod.Message("{}:0{}", minutes, seconds));
                    } else {
                        mod.SetUITextLabel(this.timeText, mod.Message("{}:{}", minutes, seconds));
                    }
                }
                else
                    mod.SetUITextLabel(this.timeText, mod.Message(timeString));

                // Change color based on time remaining (only during active rounds)
                if (matchData.state === GameState.RoundActive) {
                    let timeLeft = matchData.roundTime;
                    if (timeLeft <= 30) {
                        // Red for last 30 seconds
                        mod.SetUITextColor(this.timeText, mod.CreateVector(1, 0.2, 0.2));
                    } else if (timeLeft <= 60) {
                        // Yellow for last minute
                        mod.SetUITextColor(this.timeText, mod.CreateVector(1, 1, 0.2));
                    } else {
                        // White for normal time
                        mod.SetUITextColor(this.timeText, mod.CreateVector(1, 1, 1));
                    }
                } else {
                    // Default white for other states
                    mod.SetUITextColor(this.timeText, mod.CreateVector(1, 1, 1));
                }
            }

            // Update widget visibility based on game state
            let shouldShow = matchData.isGamePlayActive() && showTimeWidget;
            if (this.widget) {
                mod.SetUIWidgetVisible(this.widget, shouldShow);
            }
        }

        // Show/hide the score widget
        static ShowWidget(visible: boolean): void {
            if (this.widget) {
                mod.SetUIWidgetVisible(this.widget, visible);
            }
        }
    }

    export class DebugWidget
    {
        static widget = modlib.ParseUI(
        {
          type: "Container",
          name: "Container_Body",
          position: [0, 0],
          size: [800, 600],
          anchor: mod.UIAnchor.Center,
          visible: true,
          textLabel: "",
          textColor: [1, 1, 1],
          textAlpha: 1,
          textSize: 24,
          textAnchor: mod.UIAnchor.Center,
          padding: 0,
          bgColor: [0.2118, 0.2235, 0.2353],
          bgAlpha: 0.8,
          bgFill: mod.UIBgFill.Blur,
          imageType: mod.UIImageType.None,
          imageColor: [1, 1, 1],
          imageAlpha: 1,
          buttonEnabled: false,
          children: [
            {
              type: "Button",
              name: "Button_HideUI",
              position: [0, 0],
              size: [50, 20],
              anchor: mod.UIAnchor.TopRight,
              visible: true,
              textLabel: "X",
              textColor: [1, 1, 1],
              textAlpha: 0.8,
              textSize: 16,
              textAnchor: mod.UIAnchor.Center,
              padding: 0,
              bgColor: [0, 0, 0],
              bgAlpha: 0,
              bgFill: mod.UIBgFill.Blur,
              imageType: mod.UIImageType.None,
              imageColor: [1, 1, 1],
              imageAlpha: 1,
              buttonEnabled: false
            },
            {
              type: "Text",
              name: "Text_Body_Title",
              position: [0, 0],
              size: [250.9429, 37.4214],
              anchor: mod.UIAnchor.TopCenter,
              visible: true,
              textLabel: mod.stringkeys.Text_Body_Title,
              textColor: [1, 1, 1],
              textAlpha: 0.8,
              textSize: 18,
              textAnchor: mod.UIAnchor.Center,
              padding: 0,
              bgColor: [0.2, 0.2, 0.2],
              bgAlpha: 1,
              bgFill: mod.UIBgFill.Solid,
              imageType: mod.UIImageType.None,
              imageColor: [1, 1, 1],
              imageAlpha: 1,
              buttonEnabled: false
            },
            {
              type: "Container",
              name: "Container_Body_Main",
              position: [0, 10.29],
              size: [790, 560],
              anchor: mod.UIAnchor.Center,
              visible: true,
              textLabel: "",
              textColor: [1, 1, 1],
              textAlpha: 1,
              textSize: 24,
              textAnchor: mod.UIAnchor.Center,
              padding: 0,
              bgColor: [0.0745, 0.1843, 0.2471],
              bgAlpha: 1,
              bgFill: mod.UIBgFill.Blur,
              imageType: mod.UIImageType.None,
              imageColor: [1, 1, 1],
              imageAlpha: 1,
              buttonEnabled: false,
              children: [
                {
                  type: "Container",
                  name: "Container_PlayerOptions",
                  position: [-198.97, 19.56],
                  size: [370.7965, 369.01],
                  anchor: mod.UIAnchor.TopCenter,
                  visible: true,
                  textLabel: "",
                  textColor: [1, 1, 1],
                  textAlpha: 1,
                  textSize: 24,
                  textAnchor: mod.UIAnchor.Center,
                  padding: 0,
                  bgColor: [0.0314, 0.0431, 0.0431],
                  bgAlpha: 1,
                  bgFill: mod.UIBgFill.Blur,
                  imageType: mod.UIImageType.None,
                  imageColor: [1, 1, 1],
                  imageAlpha: 1,
                  buttonEnabled: false,
                  children: [
                    {
                      type: "Text",
                      name: "Text_PlayerOptions_MoveSpeed",
                      position: [0, 0],
                      size: [147.57, 50],
                      anchor: mod.UIAnchor.TopRight,
                      visible: true,
                      textLabel: mod.stringkeys.Text_PlayerOptions_MoveSpeed,
                      textColor: [1, 1, 1],
                      textAlpha: 1,
                      textSize: 24,
                      textAnchor: mod.UIAnchor.Center,
                      padding: 0,
                      bgColor: [0.2, 0.2, 0.2],
                      bgAlpha: 1,
                      bgFill: mod.UIBgFill.Solid,
                      imageType: mod.UIImageType.None,
                      imageColor: [1, 1, 1],
                      imageAlpha: 1,
                      buttonEnabled: false
                    },
                    {
                      type: "Text",
                      name: "Text_PlayerOptions_FlyMode",
                      position: [0, 50],
                      size: [131.41, 50],
                      anchor: mod.UIAnchor.TopRight,
                      visible: true,
                      textLabel: mod.stringkeys.Text_PlayerOptions_FlyMode,
                      textColor: [1, 1, 1],
                      textAlpha: 1,
                      textSize: 24,
                      textAnchor: mod.UIAnchor.Center,
                      padding: 0,
                      bgColor: [0.2, 0.2, 0.2],
                      bgAlpha: 1,
                      bgFill: mod.UIBgFill.Solid,
                      imageType: mod.UIImageType.None,
                      imageColor: [1, 1, 1],
                      imageAlpha: 1,
                      buttonEnabled: false
                    },
                    {
                      type: "Container",
                      name: "Container_Player_LocationOptions",
                      position: [-110, 0],
                      size: [110, 140],
                      anchor: mod.UIAnchor.BottomCenter,
                      visible: true,
                      textLabel: "",
                      textColor: [1, 1, 1],
                      textAlpha: 1,
                      textSize: 24,
                      textAnchor: mod.UIAnchor.Center,
                      padding: 0,
                      bgColor: [0.2, 0.2, 0.2],
                      bgAlpha: 1,
                      bgFill: mod.UIBgFill.GradientRight,
                      imageType: mod.UIImageType.None,
                      imageColor: [1, 1, 1],
                      imageAlpha: 1,
                      buttonEnabled: false,
                      children: [
                        {
                          type: "Button",
                          name: "Button_PlayerContainer_Location_Print",
                          position: [0, 5],
                          size: [100, 40],
                          anchor: mod.UIAnchor.TopCenter,
                          visible: true,
                          textLabel: "PRINT",
                          textColor: [1, 1, 1],
                          textAlpha: 1,
                          textSize: 24,
                          textAnchor: mod.UIAnchor.Center,
                          padding: 0,
                          bgColor: [0.2, 0.2, 0.2],
                          bgAlpha: 1,
                          bgFill: mod.UIBgFill.None,
                          imageType: mod.UIImageType.None,
                          imageColor: [1, 1, 1],
                          imageAlpha: 1,
                          buttonEnabled: false
                        },
                        {
                          type: "Button",
                          name: "Button_PlayerContainer_Location_Save",
                          position: [0, 50],
                          size: [100, 40],
                          anchor: mod.UIAnchor.TopCenter,
                          visible: true,
                          textLabel: "SAVE",
                          textColor: [1, 1, 1],
                          textAlpha: 1,
                          textSize: 24,
                          textAnchor: mod.UIAnchor.Center,
                          padding: 0,
                          bgColor: [0.2, 0.2, 0.2],
                          bgAlpha: 1,
                          bgFill: mod.UIBgFill.None,
                          imageType: mod.UIImageType.None,
                          imageColor: [1, 1, 1],
                          imageAlpha: 1,
                          buttonEnabled: false
                        },
                        {
                          type: "Button",
                          name: "Button_PlayerContainer_Location_Tele",
                          position: [0, 90],
                          size: [100, 40],
                          anchor: mod.UIAnchor.TopCenter,
                          visible: true,
                          textLabel: "TELE",
                          textColor: [1, 1, 1],
                          textAlpha: 1,
                          textSize: 24,
                          textAnchor: mod.UIAnchor.Center,
                          padding: 0,
                          bgColor: [0.2, 0.2, 0.2],
                          bgAlpha: 1,
                          bgFill: mod.UIBgFill.None,
                          imageType: mod.UIImageType.None,
                          imageColor: [1, 1, 1],
                          imageAlpha: 1,
                          buttonEnabled: false
                        }
                      ]
                    },
                    {
                      type: "Container",
                      name: "Container_Player_CameraOptions",
                      position: [0, 0],
                      size: [110, 185],
                      anchor: mod.UIAnchor.BottomCenter,
                      visible: true,
                      textLabel: "",
                      textColor: [1, 1, 1],
                      textAlpha: 1,
                      textSize: 24,
                      textAnchor: mod.UIAnchor.Center,
                      padding: 0,
                      bgColor: [0.2, 0.2, 0.2],
                      bgAlpha: 1,
                      bgFill: mod.UIBgFill.GradientTop,
                      imageType: mod.UIImageType.None,
                      imageColor: [1, 1, 1],
                      imageAlpha: 1,
                      buttonEnabled: false,
                      children: [
                        {
                          type: "Button",
                          name: "Button_PlayerContainer_Camera_FPS",
                          position: [0, 5],
                          size: [100, 40],
                          anchor: mod.UIAnchor.TopCenter,
                          visible: true,
                          textLabel: "FPS",
                          textColor: [1, 1, 1],
                          textAlpha: 1,
                          textSize: 24,
                          textAnchor: mod.UIAnchor.Center,
                          padding: 0,
                          bgColor: [0.2, 0.2, 0.2],
                          bgAlpha: 1,
                          bgFill: mod.UIBgFill.None,
                          imageType: mod.UIImageType.None,
                          imageColor: [1, 1, 1],
                          imageAlpha: 1,
                          buttonEnabled: false
                        },
                        {
                          type: "Button",
                          name: "Button_PlayerContainer_Camera_TPS",
                          position: [0, 50],
                          size: [100, 40],
                          anchor: mod.UIAnchor.TopCenter,
                          visible: true,
                          textLabel: "TPS",
                          textColor: [1, 1, 1],
                          textAlpha: 1,
                          textSize: 24,
                          textAnchor: mod.UIAnchor.Center,
                          padding: 0,
                          bgColor: [0.2, 0.2, 0.2],
                          bgAlpha: 1,
                          bgFill: mod.UIBgFill.None,
                          imageType: mod.UIImageType.None,
                          imageColor: [1, 1, 1],
                          imageAlpha: 1,
                          buttonEnabled: false
                        },
                        {
                          type: "Button",
                          name: "Button_PlayerContainer_Camera_Free",
                          position: [0, 95],
                          size: [100, 40],
                          anchor: mod.UIAnchor.TopCenter,
                          visible: true,
                          textLabel: "FREE",
                          textColor: [1, 1, 1],
                          textAlpha: 1,
                          textSize: 24,
                          textAnchor: mod.UIAnchor.Center,
                          padding: 0,
                          bgColor: [0.2, 0.2, 0.2],
                          bgAlpha: 1,
                          bgFill: mod.UIBgFill.None,
                          imageType: mod.UIImageType.None,
                          imageColor: [1, 1, 1],
                          imageAlpha: 1,
                          buttonEnabled: false
                        },
                        {
                          type: "Button",
                          name: "Button_PlayerContainer_Camera_Swap",
                          position: [0, 140],
                          size: [100, 40],
                          anchor: mod.UIAnchor.TopCenter,
                          visible: true,
                          textLabel: "SWITCH",
                          textColor: [1, 1, 1],
                          textAlpha: 1,
                          textSize: 24,
                          textAnchor: mod.UIAnchor.Center,
                          padding: 0,
                          bgColor: [0.2, 0.2, 0.2],
                          bgAlpha: 1,
                          bgFill: mod.UIBgFill.None,
                          imageType: mod.UIImageType.None,
                          imageColor: [1, 1, 1],
                          imageAlpha: 1,
                          buttonEnabled: false
                        }
                      ]
                    },
                    {
                      type: "Container",
                      name: "Container_Player_FlyMode_Options",
                      position: [0, 50],
                      size: [90, 50],
                      anchor: mod.UIAnchor.TopLeft,
                      visible: true,
                      textLabel: "",
                      textColor: [1, 1, 1],
                      textAlpha: 1,
                      textSize: 24,
                      textAnchor: mod.UIAnchor.Center,
                      padding: 0,
                      bgColor: [0.2, 0.2, 0.2],
                      bgAlpha: 1,
                      bgFill: mod.UIBgFill.Blur,
                      imageType: mod.UIImageType.None,
                      imageColor: [1, 1, 1],
                      imageAlpha: 1,
                      buttonEnabled: false,
                      children: [
                        {
                          type: "Button",
                          name: "Button_QOOZJ",
                          position: [-20, 0],
                          size: [40, 30],
                          anchor: mod.UIAnchor.Center,
                          visible: true,
                          textLabel: "on",
                          textColor: [1, 1, 1],
                          textAlpha: 1,
                          textSize: 20,
                          textAnchor: mod.UIAnchor.Center,
                          padding: 0,
                          bgColor: [0.2, 0.2, 0.2],
                          bgAlpha: 1,
                          bgFill: mod.UIBgFill.None,
                          imageType: mod.UIImageType.None,
                          imageColor: [1, 1, 1],
                          imageAlpha: 1,
                          buttonEnabled: false
                        },
                        {
                          type: "Button",
                          name: "Button_DZW08",
                          position: [20, 0],
                          size: [40, 30],
                          anchor: mod.UIAnchor.Center,
                          visible: true,
                          textLabel: "off",
                          textColor: [1, 1, 1],
                          textAlpha: 1,
                          textSize: 20,
                          textAnchor: mod.UIAnchor.Center,
                          padding: 0,
                          bgColor: [0.2, 0.2, 0.2],
                          bgAlpha: 1,
                          bgFill: mod.UIBgFill.None,
                          imageType: mod.UIImageType.None,
                          imageColor: [1, 1, 1],
                          imageAlpha: 1,
                          buttonEnabled: false
                        }
                      ]
                    },
                    {
                      type: "Container",
                      name: "Container_Player_MoveSpeed_Options",
                      position: [0, 0],
                      size: [207.49, 50],
                      anchor: mod.UIAnchor.TopLeft,
                      visible: true,
                      textLabel: "",
                      textColor: [1, 1, 1],
                      textAlpha: 1,
                      textSize: 24,
                      textAnchor: mod.UIAnchor.Center,
                      padding: 0,
                      bgColor: [0.2, 0.2, 0.2],
                      bgAlpha: 1,
                      bgFill: mod.UIBgFill.Blur,
                      imageType: mod.UIImageType.None,
                      imageColor: [1, 1, 1],
                      imageAlpha: 1,
                      buttonEnabled: false,
                      children: [
                        {
                          type: "Button",
                          name: "Button_6L9W6",
                          position: [-80, 0],
                          size: [40, 30],
                          anchor: mod.UIAnchor.Center,
                          visible: true,
                          textLabel: "+1",
                          textColor: [1, 1, 1],
                          textAlpha: 1,
                          textSize: 20,
                          textAnchor: mod.UIAnchor.Center,
                          padding: 0,
                          bgColor: [0.2, 0.2, 0.2],
                          bgAlpha: 1,
                          bgFill: mod.UIBgFill.None,
                          imageType: mod.UIImageType.None,
                          imageColor: [1, 1, 1],
                          imageAlpha: 1,
                          buttonEnabled: false
                        },
                        {
                          type: "Button",
                          name: "Button_AML2T",
                          position: [-40, 0],
                          size: [40, 30],
                          anchor: mod.UIAnchor.Center,
                          visible: true,
                          textLabel: "+5",
                          textColor: [1, 1, 1],
                          textAlpha: 1,
                          textSize: 20,
                          textAnchor: mod.UIAnchor.Center,
                          padding: 0,
                          bgColor: [0.2, 0.2, 0.2],
                          bgAlpha: 1,
                          bgFill: mod.UIBgFill.None,
                          imageType: mod.UIImageType.None,
                          imageColor: [1, 1, 1],
                          imageAlpha: 1,
                          buttonEnabled: false
                        },
                        {
                          type: "Button",
                          name: "Button_Z7EPJ",
                          position: [0, 0],
                          size: [40, 30],
                          anchor: mod.UIAnchor.Center,
                          visible: true,
                          textLabel: "+10",
                          textColor: [1, 1, 1],
                          textAlpha: 1,
                          textSize: 20,
                          textAnchor: mod.UIAnchor.Center,
                          padding: 0,
                          bgColor: [0.2, 0.2, 0.2],
                          bgAlpha: 1,
                          bgFill: mod.UIBgFill.None,
                          imageType: mod.UIImageType.None,
                          imageColor: [1, 1, 1],
                          imageAlpha: 1,
                          buttonEnabled: false
                        },
                        {
                          type: "Button",
                          name: "Button_CGX6F",
                          position: [65, 0],
                          size: [60, 30],
                          anchor: mod.UIAnchor.Center,
                          visible: true,
                          textLabel: "reset",
                          textColor: [1, 1, 1],
                          textAlpha: 1,
                          textSize: 20,
                          textAnchor: mod.UIAnchor.Center,
                          padding: 0,
                          bgColor: [0.2, 0.2, 0.2],
                          bgAlpha: 1,
                          bgFill: mod.UIBgFill.None,
                          imageType: mod.UIImageType.None,
                          imageColor: [1, 1, 1],
                          imageAlpha: 1,
                          buttonEnabled: false
                        }
                      ]
                    },
                    {
                      type: "Container",
                      name: "Container_C6AIQ",
                      position: [110, 0],
                      size: [110, 140],
                      anchor: mod.UIAnchor.BottomCenter,
                      visible: true,
                      textLabel: "",
                      textColor: [1, 1, 1],
                      textAlpha: 1,
                      textSize: 24,
                      textAnchor: mod.UIAnchor.Center,
                      padding: 0,
                      bgColor: [0.2, 0.2, 0.2],
                      bgAlpha: 1,
                      bgFill: mod.UIBgFill.GradientLeft,
                      imageType: mod.UIImageType.None,
                      imageColor: [1, 1, 1],
                      imageAlpha: 1,
                      buttonEnabled: false
                    },
                    {
                      type: "Text",
                      name: "Text_E70JJ",
                      position: [0, -10.29],
                      size: [100, 50],
                      anchor: mod.UIAnchor.Center,
                      visible: true,
                      textLabel: mod.stringkeys.Text_E70JJ,
                      textColor: [1, 1, 1],
                      textAlpha: 1,
                      textSize: 24,
                      textAnchor: mod.UIAnchor.Center,
                      padding: 0,
                      bgColor: [0.2, 0.2, 0.2],
                      bgAlpha: 1,
                      bgFill: mod.UIBgFill.None,
                      imageType: mod.UIImageType.None,
                      imageColor: [1, 1, 1],
                      imageAlpha: 1,
                      buttonEnabled: false
                    },
                    {
                      type: "Text",
                      name: "Text_HNFA6",
                      position: [-110, 38.88],
                      size: [100, 50],
                      anchor: mod.UIAnchor.Center,
                      visible: true,
                      textLabel: mod.stringkeys.Text_HNFA6,
                      textColor: [1, 1, 1],
                      textAlpha: 1,
                      textSize: 24,
                      textAnchor: mod.UIAnchor.Center,
                      padding: 0,
                      bgColor: [0.2, 0.2, 0.2],
                      bgAlpha: 1,
                      bgFill: mod.UIBgFill.None,
                      imageType: mod.UIImageType.None,
                      imageColor: [1, 1, 1],
                      imageAlpha: 1,
                      buttonEnabled: false
                    }
                  ]
                },
                {
                  type: "Container",
                  name: "Container_BotOptions",
                  position: [-14.87, 0],
                  size: [360.52, 520.8765],
                  anchor: mod.UIAnchor.CenterRight,
                  visible: true,
                  textLabel: "",
                  textColor: [1, 1, 1],
                  textAlpha: 1,
                  textSize: 24,
                  textAnchor: mod.UIAnchor.Center,
                  padding: 0,
                  bgColor: [0.0314, 0.0431, 0.0431],
                  bgAlpha: 1,
                  bgFill: mod.UIBgFill.Blur,
                  imageType: mod.UIImageType.None,
                  imageColor: [1, 1, 1],
                  imageAlpha: 1,
                  buttonEnabled: false,
                  children: [
                    {
                      type: "Button",
                      name: "Button_SS7UK",
                      position: [0, 10],
                      size: [180, 40],
                      anchor: mod.UIAnchor.TopLeft,
                      visible: true,
                      textLabel: "SPAWN SEAL",
                      textColor: [1, 1, 1],
                      textAlpha: 1,
                      textSize: 24,
                      textAnchor: mod.UIAnchor.Center,
                      padding: 0,
                      bgColor: [0.2, 0.2, 0.2],
                      bgAlpha: 1,
                      bgFill: mod.UIBgFill.Solid,
                      imageType: mod.UIImageType.None,
                      imageColor: [1, 1, 1],
                      imageAlpha: 1,
                      buttonEnabled: false
                    },
                    {
                      type: "Button",
                      name: "Button_YKNIC",
                      position: [0, 55],
                      size: [180, 40],
                      anchor: mod.UIAnchor.TopRight,
                      visible: true,
                      textLabel: "DELETE MERC",
                      textColor: [1, 1, 1],
                      textAlpha: 1,
                      textSize: 24,
                      textAnchor: mod.UIAnchor.Center,
                      padding: 0,
                      bgColor: [0.2, 0.2, 0.2],
                      bgAlpha: 1,
                      bgFill: mod.UIBgFill.Solid,
                      imageType: mod.UIImageType.None,
                      imageColor: [1, 1, 1],
                      imageAlpha: 1,
                      buttonEnabled: false
                    },
                    {
                      type: "Button",
                      name: "Button_UJ9KB",
                      position: [0, 10],
                      size: [180, 40],
                      anchor: mod.UIAnchor.TopRight,
                      visible: true,
                      textLabel: "SPAWN MERC",
                      textColor: [1, 1, 1],
                      textAlpha: 1,
                      textSize: 24,
                      textAnchor: mod.UIAnchor.Center,
                      padding: 0,
                      bgColor: [0.2, 0.2, 0.2],
                      bgAlpha: 1,
                      bgFill: mod.UIBgFill.Solid,
                      imageType: mod.UIImageType.None,
                      imageColor: [1, 1, 1],
                      imageAlpha: 1,
                      buttonEnabled: false
                    },
                    {
                      type: "Button",
                      name: "Button_JE5CW",
                      position: [0, 55],
                      size: [180, 40],
                      anchor: mod.UIAnchor.TopLeft,
                      visible: true,
                      textLabel: "DELETE SEAL",
                      textColor: [1, 1, 1],
                      textAlpha: 1,
                      textSize: 24,
                      textAnchor: mod.UIAnchor.Center,
                      padding: 0,
                      bgColor: [0.2, 0.2, 0.2],
                      bgAlpha: 1,
                      bgFill: mod.UIBgFill.Solid,
                      imageType: mod.UIImageType.None,
                      imageColor: [1, 1, 1],
                      imageAlpha: 1,
                      buttonEnabled: false
                    },
                    {
                      type: "Container",
                      name: "Container_QWDSS",
                      position: [0, 99.93],
                      size: [347, 302.71],
                      anchor: mod.UIAnchor.Center,
                      visible: true,
                      textLabel: "",
                      textColor: [1, 1, 1],
                      textAlpha: 1,
                      textSize: 24,
                      textAnchor: mod.UIAnchor.Center,
                      padding: 0,
                      bgColor: [0.2, 0.2, 0.2],
                      bgAlpha: 1,
                      bgFill: mod.UIBgFill.OutlineThin,
                      imageType: mod.UIImageType.None,
                      imageColor: [1, 1, 1],
                      imageAlpha: 1,
                      buttonEnabled: false,
                      children: [
                        {
                          type: "Container",
                          name: "Container_Bot_Attack_Options",
                          position: [0, 100],
                          size: [90, 50],
                          anchor: mod.UIAnchor.TopLeft,
                          visible: true,
                          textLabel: "",
                          textColor: [1, 1, 1],
                          textAlpha: 1,
                          textSize: 24,
                          textAnchor: mod.UIAnchor.Center,
                          padding: 0,
                          bgColor: [0.2, 0.2, 0.2],
                          bgAlpha: 1,
                          bgFill: mod.UIBgFill.Blur,
                          imageType: mod.UIImageType.None,
                          imageColor: [1, 1, 1],
                          imageAlpha: 1,
                          buttonEnabled: false,
                          children: [
                            {
                              type: "Button",
                              name: "Button_Bot_Attack_On",
                              position: [-20, 0],
                              size: [40, 30],
                              anchor: mod.UIAnchor.Center,
                              visible: true,
                              textLabel: "ON",
                              textColor: [1, 1, 1],
                              textAlpha: 1,
                              textSize: 20,
                              textAnchor: mod.UIAnchor.Center,
                              padding: 0,
                              bgColor: [0.2, 0.2, 0.2],
                              bgAlpha: 1,
                              bgFill: mod.UIBgFill.None,
                              imageType: mod.UIImageType.None,
                              imageColor: [1, 1, 1],
                              imageAlpha: 1,
                              buttonEnabled: false
                            },
                            {
                              type: "Button",
                              name: "Button_Bot_Attack_Off",
                              position: [20, 0],
                              size: [40, 30],
                              anchor: mod.UIAnchor.Center,
                              visible: true,
                              textLabel: "OFF",
                              textColor: [1, 1, 1],
                              textAlpha: 1,
                              textSize: 20,
                              textAnchor: mod.UIAnchor.Center,
                              padding: 0,
                              bgColor: [0.2, 0.2, 0.2],
                              bgAlpha: 1,
                              bgFill: mod.UIBgFill.None,
                              imageType: mod.UIImageType.None,
                              imageColor: [1, 1, 1],
                              imageAlpha: 1,
                              buttonEnabled: false
                            }
                          ]
                        },
                        {
                          type: "Container",
                          name: "Container_Bot_Idle_Options",
                          position: [0, 50],
                          size: [90, 50],
                          anchor: mod.UIAnchor.TopLeft,
                          visible: true,
                          textLabel: "",
                          textColor: [1, 1, 1],
                          textAlpha: 1,
                          textSize: 24,
                          textAnchor: mod.UIAnchor.Center,
                          padding: 0,
                          bgColor: [0.2, 0.2, 0.2],
                          bgAlpha: 1,
                          bgFill: mod.UIBgFill.Blur,
                          imageType: mod.UIImageType.None,
                          imageColor: [1, 1, 1],
                          imageAlpha: 1,
                          buttonEnabled: false,
                          children: [
                            {
                              type: "Button",
                              name: "Button_Bot_Idle_Off",
                              position: [-20, 0],
                              size: [40, 30],
                              anchor: mod.UIAnchor.Center,
                              visible: true,
                              textLabel: "ON",
                              textColor: [1, 1, 1],
                              textAlpha: 1,
                              textSize: 20,
                              textAnchor: mod.UIAnchor.Center,
                              padding: 0,
                              bgColor: [0.2, 0.2, 0.2],
                              bgAlpha: 1,
                              bgFill: mod.UIBgFill.None,
                              imageType: mod.UIImageType.None,
                              imageColor: [1, 1, 1],
                              imageAlpha: 1,
                              buttonEnabled: false
                            },
                            {
                              type: "Button",
                              name: "Button_Bot_Idle_Off",
                              position: [20, 0],
                              size: [40, 30],
                              anchor: mod.UIAnchor.Center,
                              visible: true,
                              textLabel: "OFF",
                              textColor: [1, 1, 1],
                              textAlpha: 1,
                              textSize: 20,
                              textAnchor: mod.UIAnchor.Center,
                              padding: 0,
                              bgColor: [0.2, 0.2, 0.2],
                              bgAlpha: 1,
                              bgFill: mod.UIBgFill.None,
                              imageType: mod.UIImageType.None,
                              imageColor: [1, 1, 1],
                              imageAlpha: 1,
                              buttonEnabled: false
                            }
                          ]
                        },
                        {
                          type: "Text",
                          name: "Text_OI6Y7",
                          position: [0, 50],
                          size: [100, 50],
                          anchor: mod.UIAnchor.TopRight,
                          visible: true,
                          textLabel: mod.stringkeys.Text_OI6Y7,
                          textColor: [1, 1, 1],
                          textAlpha: 1,
                          textSize: 24,
                          textAnchor: mod.UIAnchor.Center,
                          padding: 0,
                          bgColor: [0.2, 0.2, 0.2],
                          bgAlpha: 1,
                          bgFill: mod.UIBgFill.None,
                          imageType: mod.UIImageType.None,
                          imageColor: [1, 1, 1],
                          imageAlpha: 1,
                          buttonEnabled: false
                        },
                        {
                          type: "Text",
                          name: "Text_SKTO8",
                          position: [0, 100],
                          size: [100, 50],
                          anchor: mod.UIAnchor.TopRight,
                          visible: true,
                          textLabel: mod.stringkeys.Text_SKTO8,
                          textColor: [1, 1, 1],
                          textAlpha: 1,
                          textSize: 24,
                          textAnchor: mod.UIAnchor.Center,
                          padding: 0,
                          bgColor: [0.2, 0.2, 0.2],
                          bgAlpha: 1,
                          bgFill: mod.UIBgFill.None,
                          imageType: mod.UIImageType.None,
                          imageColor: [1, 1, 1],
                          imageAlpha: 1,
                          buttonEnabled: false
                        },
                        {
                          type: "Container",
                          name: "Container_Bot_TeamSelect",
                          position: [-1.14, 0],
                          size: [349.29, 50],
                          anchor: mod.UIAnchor.TopCenter,
                          visible: true,
                          textLabel: "",
                          textColor: [1, 1, 1],
                          textAlpha: 1,
                          textSize: 24,
                          textAnchor: mod.UIAnchor.Center,
                          padding: 0,
                          bgColor: [0.2, 0.2, 0.2],
                          bgAlpha: 1,
                          bgFill: mod.UIBgFill.GradientTop,
                          imageType: mod.UIImageType.None,
                          imageColor: [1, 1, 1],
                          imageAlpha: 1,
                          buttonEnabled: false,
                          children: [
                            {
                              type: "Button",
                              name: "Button_Bot_TeamSelect_Seals",
                              position: [-100, 0],
                              size: [100, 40],
                              anchor: mod.UIAnchor.Center,
                              visible: true,
                              textLabel: "SEALs",
                              textColor: [1, 1, 1],
                              textAlpha: 1,
                              textSize: 24,
                              textAnchor: mod.UIAnchor.Center,
                              padding: 0,
                              bgColor: [0.2, 0.2, 0.2],
                              bgAlpha: 1,
                              bgFill: mod.UIBgFill.None,
                              imageType: mod.UIImageType.None,
                              imageColor: [1, 1, 1],
                              imageAlpha: 1,
                              buttonEnabled: false
                            },
                            {
                              type: "Button",
                              name: "Button_Bot_TeamSelect_Mercs",
                              position: [0, 0],
                              size: [100, 40],
                              anchor: mod.UIAnchor.Center,
                              visible: true,
                              textLabel: "MERCS",
                              textColor: [1, 1, 1],
                              textAlpha: 1,
                              textSize: 24,
                              textAnchor: mod.UIAnchor.Center,
                              padding: 0,
                              bgColor: [0.2, 0.2, 0.2],
                              bgAlpha: 1,
                              bgFill: mod.UIBgFill.None,
                              imageType: mod.UIImageType.None,
                              imageColor: [1, 1, 1],
                              imageAlpha: 1,
                              buttonEnabled: false
                            },
                            {
                              type: "Button",
                              name: "Button_Bot_TeamSelect_All",
                              position: [100, 0],
                              size: [100, 40],
                              anchor: mod.UIAnchor.Center,
                              visible: true,
                              textLabel: "ALL",
                              textColor: [1, 1, 1],
                              textAlpha: 1,
                              textSize: 24,
                              textAnchor: mod.UIAnchor.Center,
                              padding: 0,
                              bgColor: [0.2, 0.2, 0.2],
                              bgAlpha: 1,
                              bgFill: mod.UIBgFill.None,
                              imageType: mod.UIImageType.None,
                              imageColor: [1, 1, 1],
                              imageAlpha: 1,
                              buttonEnabled: false
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  type: "Container",
                  name: "Container_WeaponOptions",
                  position: [-198.97, -19.56],
                  size: [370.7965, 146.05],
                  anchor: mod.UIAnchor.BottomCenter,
                  visible: true,
                  textLabel: "",
                  textColor: [1, 1, 1],
                  textAlpha: 1,
                  textSize: 24,
                  textAnchor: mod.UIAnchor.Center,
                  padding: 0,
                  bgColor: [0.0314, 0.0431, 0.0431],
                  bgAlpha: 1,
                  bgFill: mod.UIBgFill.Blur,
                  imageType: mod.UIImageType.None,
                  imageColor: [1, 1, 1],
                  imageAlpha: 1,
                  buttonEnabled: false
                }
              ]
            }
          ]
        }
        );
    }
}

export namespace Utility {

    export class Input
    {
        private zoomTimes: number[] = [];
        private lastPatternTime: number = 0;

        public msDoubleTap = 600;       // double tap time window
        public msCooldown = 1000;       // cooldown time window
        public msExpire = 2000;         // expiration time window
        
        public msTripleTap = 500;       // triple tap time window
        public msLongHoldTime = 1500;   // long hold time window

        /* detect double tap input via zoom communication - returns true if double tap detected, false otherwise */
        dtcInput(player: mod.Player, state: mod.SoldierStateBool): boolean;
        dtcInput(player: mod.Player, state: boolean): boolean;
        dtcInput(player: mod.Player, state: mod.SoldierStateBool | boolean): boolean
        {
            const currentTime = Date.now();

            // get player ID
            const playerID = mod.GetObjId(player);
            if (playerID === -1)
                return false;

            // Handle different parameter types
            let actualState: boolean;
            if (typeof state === 'boolean') {
                actualState = state;
            } else {
                // state is mod.SoldierStateBool - get the actual boolean value
                actualState = mod.GetSoldierState(player, state);
            }

            // Only process when state is true (event triggered)
            if (!actualState)
                return false;

            // Clean up old zoom events & add latest
            this.zoomTimes = this.zoomTimes.filter(time => currentTime - time < this.msExpire);
            this.zoomTimes.push(currentTime);

            // wait 1 second between changing states
            if (currentTime - this.lastPatternTime < this.msCooldown)
                return false;

            // Need at least 2 quick zooms to trigger shoulder switch
            if (this.zoomTimes.length <= 1)
                return false;

            const timeBetween = this.zoomTimes[this.zoomTimes.length - 1] - this.zoomTimes[this.zoomTimes.length - 2];

            // Double-tap detected
            if (timeBetween > this.msDoubleTap)
                return false;

            this.lastPatternTime = currentTime;
            this.zoomTimes = []; // Clear pattern buffer
            console.log(`Player ${playerID}: handled input via ${typeof state === 'boolean' ? 'boolean' : state} communication`);
            return true;
        }
    }
}