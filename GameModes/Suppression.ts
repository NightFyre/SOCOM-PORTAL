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

    @TODO: restrict parachute use
*/
import * as modlib from '../PortalSDK/code/modlib'; // for local testing
// import * as modlib from 'modlib'; // required on server side
const AI_SPAWNERS = 100; // 100 - 101 (HQ AI) | 102 (HOSTAGE) | 103 (VIP) | 104 (BOMB)
const WORLD_ICON_PLAYERS = 700; // 700 - 715
const MIN_PLAYERS_TO_START = 1; // minimum players required to start the match
const MAX_PLAYERS_FOR_BOTS = 8; // maximum players before bots are removed
const MAX_PLAYERS = 32;
const MAX_PLAYERS_PER_TEAM = MAX_PLAYERS / 2;

////////////////////////////////// PLAYER EVENTS ///////////////////////////////////////

// Triggered when player joins the game. Useful for pregame setup, team management, etc.
export function OnPlayerJoinGame(eventPlayer: mod.Player): void 
{
    return CZMatchData.OnPlayerJoined(eventPlayer);
}

// Triggered when player leaves the game. Useful for clean up logic, team management, etc.
export function OnPlayerLeaveGame(eventNumber: number): void 
{
    return CZMatchData.OnPlayerLeft(eventNumber);
}

// Triggered when player selects their class and deploys into game. Useful for any spawn/start logic.
export function OnPlayerDeployed(eventPlayer: mod.Player): void 
{
    return CZMatchData.OnPlayerSpawned(eventPlayer);
}

// This will trigger when the Player dies and returns to the deploy screen.
export function OnPlayerUndeploy(eventPlayer: mod.Player): void 
{ 
    return CZMatchData.OnPlayerReturnedToDeployScreen(eventPlayer);
}

// This will trigger when an AISpawner spawns an AI Soldier.
export function OnSpawnerSpawned(eventPlayer: mod.Player, eventSpawner: mod.Spawner): void
{
    return CZMatchData.OnSpawnBot(eventPlayer, eventSpawner);
}

// Triggered on player death/kill, returns dying player, the killer, etc. Useful for updating scores, updating progression, handling any death/kill related logic.
export function OnPlayerDied( eventPlayer: mod.Player,  eventOtherPlayer: mod.Player,  eventDeathType: mod.DeathType,  eventWeaponUnlock: mod.WeaponUnlock ): void 
{
    return CZMatchData.OnPlayerDied(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock);
}

// Triggered when a player earns a kill.
export function OnPlayerEarnedKill( eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock ): void 
{ 
    return CZMatchData.OnPlayerEarnedKill(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock);
}

// Triggered when a player earns an assist on a kill.
export function OnPlayerEarnedAssist( eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock ): void 
{
    return CZMatchData.OnPlayerEarnedAssist(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock);
}

// Triggered when a player is damaged, returns same variables as OnPlayerDied. Useful for custom on damage logic and updating custom UI.
export function OnPlayerDamaged( eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDamageType: mod.DamageType, eventWeaponUnlock: mod.WeaponUnlock ): void 
{
    return CZMatchData.OnPlayerDamaged(eventPlayer, eventOtherPlayer, eventDamageType, eventWeaponUnlock);
}


/////////////////////// GAMEMODE EVENTS //////////////////////////////

// This will trigger when the gamemode time limit has been reached.
export function OnTimeLimitReached(): void {}

let shouldExitLoop = false;
// Triggered on main gamemode start/end. Useful for game start setup and cleanup.
export async function OnGameModeStarted() 
{
    log.info(mod.Message("SOCOM IN BATTLEFIELD - SUPPRESSION"));

    /* Initialize UI widgets */
    UI.RoundInfoWidget.init();

    //  for ( let spawner of matchData.botSpawners )
    //      mod.AISetUnspawnOnDead(spawner, true); // set spawners to unspawn bots on death

    /* set default camera for all players to third person */
    mod.SetCameraTypeForAll(mod.Cameras.ThirdPerson, 0);

    /// @BUG: deployed camera is offset incorrectly , reset its transform
    //  const deployCam = mod.GetSpatialObject(1003);
    //  if (mod.GetObjId(deployCam) === 1003)
    //  {
    //      mod.SetObjectTransform(deployCam, mod.CreateTransform(mod.CreateVector(0,0,-100), mod.CreateVector(0,90,0)));
    //      console.log("found deploy cam , resetting transform");
    //  }

    // setup world icons
    for (let i = 0; i < 32; i++)
    {
        const icon = mod.GetWorldIcon(WORLD_ICON_PLAYERS + i); // preload team player icons
        if (!icon)
            continue;

        mod.EnableWorldIconImage(icon, false); // disable icon image
        mod.EnableWorldIconText(icon, false); // disable icon text
        mod.SetWorldIconColor(icon, mod.CreateVector(1, 1, 1)); // white color
        mod.SetWorldIconPosition(icon, mod.CreateVector(0, 0, -100000)); // move icon out of view and bury it deep
    }

    while (true)
    {
        await CZMatchData.update();

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
    CZMatchData.reset();

    //for (let player of CZSeal.sealObjects)
    //{
    //    let seal = CZSeal.get(player);
    //    if (!seal)
    //        continue;
    //
    //    CZSeal.remove(seal.playerID);
    //}
    //CZSeal.sealObjects = []; // clear the seal objects array  

    //  log.info(mod.Message("SOCOM PORTAL - Suppression Game Mode Ended"));
}

// This will trigger every frame during an active game mode.
export function OngoingGlobal(): void 
{
    log.update();

    // Update score widget UI
    UI.RoundInfoWidget.update();

    // Check all players for camera updates (runs every frame)
    for (let player of CZSeal.sealObjects)
    {
        let seal = CZSeal.get(player, undefined);
        if (!seal || !seal.isValid())
            continue;

        /* update camera state */
        seal.update();
    }
}


/// ------------------------------ CZCAMERA ------------------------------- ///

export enum SoldierCameraView
{
    RightShoulder,
    LeftShoulder
}

export class CZCamera
{
    sealPlayer: CZSeal; // origin player reference
    cameraType: mod.Cameras; // current camera type
    attachedPlayer: mod.Player; // attached player 
    viewType: SoldierCameraView; // current view type
    isSpectateMode: boolean = false; // whether the camera is in spectate mode
    isSpectatingPlayer: boolean = false; // whether the camera is in spectating mode
    isZooming: boolean = false; // whether the player is currently zooming

    // UI Elements
    spectateUI;


    constructor(sealPlayer: CZSeal)
    {
      this.sealPlayer = sealPlayer;
      this.attachedPlayer = sealPlayer.player;
      this.cameraType = mod.Cameras.ThirdPerson;
      this.viewType = SoldierCameraView.RightShoulder;
      this.spectateUI = undefined as any;
    }

    update():void
    {
        this.updateCameraView();
    }

    updateCameraView(): void
    {
        /* get zoom state */
        let isCurrentlyZooming = mod.GetSoldierState(this.sealPlayer.player, mod.SoldierStateBool.IsZooming);
        if (isCurrentlyZooming == this.isZooming)
            return;

        /* detect zoom pattern for shoulder switching */
        if (this.sealPlayer.inputDetector.dtcInput(this.sealPlayer.player, isCurrentlyZooming))
            this.switchShoulderView();

        /* set zoom state */
        this.isZooming = isCurrentlyZooming;
        let currentShoulder = this.viewType === SoldierCameraView.RightShoulder ? 0 : 1;
        
        /* update camera */
        mod.SetCameraTypeForPlayer(this.sealPlayer.player, this.isZooming ? mod.Cameras.FirstPerson : mod.Cameras.ThirdPerson, currentShoulder);
    }

    enterSpectatorMode(): void
    {
      /* find closest alive player to spectate */
      let closestPlayer = mod.ClosestPlayerTo(this.sealPlayer.soldierTM.location, mod.GetTeam(this.sealPlayer.teamID)); // find closest team player
      if (!closestPlayer)
        return;

      /* RESTRICT PLAYER INPUTS */
      mod.EnableInputRestriction(this.sealPlayer.player, mod.RestrictedInputs.MoveForwardBack, true);
      mod.EnableInputRestriction(this.sealPlayer.player, mod.RestrictedInputs.MoveLeftRight, true);
      mod.EnableInputRestriction(this.sealPlayer.player, mod.RestrictedInputs.CameraPitch, true);
      mod.EnableInputRestriction(this.sealPlayer.player, mod.RestrictedInputs.CameraYaw, true);
      mod.EnableInputRestriction(this.sealPlayer.player, mod.RestrictedInputs.Crouch, true);
      mod.EnableInputRestriction(this.sealPlayer.player, mod.RestrictedInputs.Jump, true);
      mod.EnableInputRestriction(this.sealPlayer.player, mod.RestrictedInputs.Prone, true);
      mod.EnableInputRestriction(this.sealPlayer.player, mod.RestrictedInputs.Interact, true);
      mod.EnableInputRestriction(this.sealPlayer.player, mod.RestrictedInputs.FireWeapon, true);
      mod.EnableInputRestriction(this.sealPlayer.player, mod.RestrictedInputs.FireWeapon, true);

      try {
        /* remove equipment */
        this.sealPlayer.Disarm();
      }
      catch (e) {}

      this.isSpectateMode = true;

      this.AttachToPlayer(closestPlayer); // attach to closest player

      mod.EnableUIInputMode(true);  // enable UI input mode
    }

    exitSpectatorMode(): void
    {
      /* UNRESTRICT PLAYER INPUTS */
      mod.EnableInputRestriction(this.sealPlayer.player, mod.RestrictedInputs.MoveForwardBack, false);
      mod.EnableInputRestriction(this.sealPlayer.player, mod.RestrictedInputs.MoveLeftRight, false);
      mod.EnableInputRestriction(this.sealPlayer.player, mod.RestrictedInputs.CameraPitch, false);
      mod.EnableInputRestriction(this.sealPlayer.player, mod.RestrictedInputs.CameraYaw, false);
      mod.EnableInputRestriction(this.sealPlayer.player, mod.RestrictedInputs.Crouch, false);
      mod.EnableInputRestriction(this.sealPlayer.player, mod.RestrictedInputs.Jump, false);
      mod.EnableInputRestriction(this.sealPlayer.player, mod.RestrictedInputs.Prone, false);
      mod.EnableInputRestriction(this.sealPlayer.player, mod.RestrictedInputs.Interact, false);
      mod.EnableInputRestriction(this.sealPlayer.player, mod.RestrictedInputs.FireWeapon, false);
      mod.EnableInputRestriction(this.sealPlayer.player, mod.RestrictedInputs.FireWeapon, false);


      this.isSpectateMode = false;

      this.AttachToPlayer(this.sealPlayer.player); // reattach to self

      mod.EnableUIInputMode(false);  // disable UI input mode
    }

    AttachToPlayer(player: mod.Player): void
    {
      /*
        ========== Start ==========
        Exception: NoMatchingOverload
        Function: SetCameraTargetForPlayer
        Error info: 
        	Provided parameters () do not match any overload. Function supports the following overloads: (Player, Player).
        ========== End ==========
      */

        /* SET ATTACHED PLAYER */
        this.attachedPlayer = player;

        /* SET CAMERA TARGET TO PLAYER */
        
        //@ ts-ignore
        mod.SetCameraTargetForPlayer(this.sealPlayer, player);

        /* UPDATE FLAG */
        this.isSpectatingPlayer = this.attachedPlayer !== this.sealPlayer.player;
    }

    /* switch between left and right shoulder view */
    private switchShoulderView(): void
    {
        this.viewType = this.viewType === SoldierCameraView.RightShoulder ? 
            SoldierCameraView.LeftShoulder : 
            SoldierCameraView.RightShoulder;
    }
    
}

/// --------------------------------- CZSEAL --------------------------------- ///

export enum SoldierTeam 
{
    SEALS = 1, 
    MERCS = 2
}

export class CZSealStats
{
    /* POINTS 
        - kill: 3 points
        - assist: 1 point
        - suicide: -1 point
        - friendly kill: -2 points
        - survive round: 1 point
        - bomb plant/defuse: 6 points
    */
    score: number[] = [0, 0]; // current round score , total score
    kills: number[] = [0, 0]; // number of kills
    assists: number[] = [0, 0]; // number of assists
    deaths: number[] = [0, 0]; // number of times died
    headshots: number[] = [0, 0]; // number of headshots
    headshotKills: number[] = [0, 0]; // number of headshot kills
    damageDealt: number[] = [0, 0]; // total damage dealt
    damageTaken: number[] = [0, 0]; // total damage taken
    shotsHit: number[] = [0, 0]; // shots that hit an enemy
    shotsOnFriendly: number[] = [0, 0]; // shots that hit a friendly
    shotsTaken: number[] = [0, 0]; // times shot
    shotsTakenByFriendly: number[] = [0, 0]; // times shot by friendly
    friendlyFireDeaths: number[] = [0, 0]; // deaths by friendly fire
    friendlyFireKills: number[] = [0, 0]; // kills by friendly fire

    // Reset round stats
    resetRound(): void
    {
        this.score[1] += this.score[0];
        this.score[0] = 0; // reset round stats
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
        this.damageDealt[1] += this.damageDealt[0];
        this.damageDealt[0] = 0; // reset round stats
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
        this.score = [0, 0];
        this.kills = [0, 0];
        this.assists = [0, 0];
        this.deaths = [0, 0];
        this.headshots = [0, 0];
        this.headshotKills = [0, 0];
        this.damageDealt = [0, 0];
        this.damageTaken = [0, 0];
        this.shotsHit = [0, 0];
        this.shotsOnFriendly = [0, 0];
        this.shotsTaken = [0, 0];
        this.shotsTakenByFriendly = [0, 0];
        this.friendlyFireDeaths = [0, 0];
        this.friendlyFireKills = [0, 0];
    }

    tallyScore(): number
    {
        /* elimination logic */
        this.score[0] = this.kills[0] * 3 + this.assists[0] * 1 + this.deaths[0] * -1;
        return this.score[0];
    }
}

// @TODO: could be invalid
export class CZSoldierTM
{
    location!: mod.Vector;
    rotation!: mod.Vector;
    lookAt!: mod.Vector;
    velocity!: number;
    private player: mod.Player;

    constructor(player: mod.Player)
    {
        this.player = player;
        this.update();
    }

    update(): void
    {
        if (!mod.IsPlayerValid(this.player))
        {

            return;
        }

        this.location = mod.GetSoldierState(this.player, mod.SoldierStateVector.GetPosition);
        this.lookAt = mod.GetSoldierState(this.player, mod.SoldierStateVector.GetFacingDirection);
        this.velocity = mod.GetSoldierState(this.player, mod.SoldierStateNumber.Speed);
        this.rotation = mod.GetObjectRotation(this.player);
    }
}

export class CZSeal 
{
    player: mod.Player;
    playerID: number;
    playerTeam: mod.Team;
    teamID: number;
    isAI: boolean;
    spawner: mod.Spawner | undefined;
    teamIcon: mod.WorldIcon;
    soldierTM: CZSoldierTM;
    hasSpawned: boolean = false;
    isAlive: boolean = false;
    maxHealth = 100; // AI get 200 health , players get 100
    currentHealth = 100;
    isArmed: boolean = true;

    // zoom pattern detection for shoulder switching
    inputDetector = new Utility.Input();

    camera: CZCamera;

    welcomeUI;

    // seal stats
    stats: CZSealStats = new CZSealStats();

    // static list of all player instances
    static sealObjects: mod.Player[] = [];

    /* should only be created via CZSeal.get() */
    constructor(player: mod.Player, spawner?: mod.Spawner)
    {
        this.player = player;
        this.playerID = mod.GetObjId(player);
        this.playerTeam = mod.GetTeam(player);
        this.teamID = mod.GetObjId(this.playerTeam); // teamID should be 1 or 2
        this.isAI = mod.GetSoldierState(player, mod.SoldierStateBool.IsAISoldier);
        this.teamIcon = mod.GetWorldIcon(WORLD_ICON_PLAYERS + this.playerID);
        this.camera = new CZCamera(this);
        this.soldierTM = new CZSoldierTM(player);
        if (this.isAI && spawner)
            this.spawner = spawner;

        this.welcomeUI = undefined as any;

        mod.SetWorldIconText(this.teamIcon, mod.Message("{}", this.player));
        mod.SetWorldIconOwner(this.teamIcon, this.playerTeam);
        mod.EnableWorldIconText(this.teamIcon, true);
        CZSeal.sealObjects.push(player);
    }

    // static list of all seal players by playerID
    static #allSealPlayers: { [key: number]: CZSeal } = {};

    /* MAIN METHODS */


    /* should only be accessed via OnPlayer Events , a new Seal will be created if none exists */
    static get(player: mod.Player, spawner: mod.Spawner | undefined): CZSeal | undefined
    {
        let playerID = mod.GetObjId(player);
        if (playerID > -1)
        {
            let seal = CZSeal.#allSealPlayers[playerID];
            if (!seal)
            {
                seal = new CZSeal(player, spawner);
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
    update(): void
    {
        /* update soldier transforms */
        this.soldierTM.update();

        /* update camera state */
        if (!this.isAI)
          this.camera.update();

        /* update name tag icon */
        this.updateIcon();

        /* update ai pathing & behavior */
        if (this.isAI)
          this.updateAIPath();

    }

    /* update the player name tag icon - team, position, and text. does not update the icon visibility state */
    private updateIcon(): void
    {
        mod.SetWorldIconOwner(this.teamIcon, this.playerTeam);
        mod.SetWorldIconPosition(this.teamIcon, this.soldierTM.location);
        mod.SetWorldIconText(this.teamIcon, mod.Message("{}", this.player));
    }

    /* send bot to nearest enemy player . . . lol */
    lastAIPathUpdateTime: number = 0;
    private updateAIPath() : void
    {
        let currentTime = mod.GetMatchTimeElapsed();
        if (currentTime - this.lastAIPathUpdateTime < 5) // update every 5 seconds
            return;

        if (!this.isSoldierAlive() || !this.isAI)
            return;

        let closestPlayer = mod.ClosestPlayerTo(this.soldierTM.location, mod.GetTeam(this.teamID == 1 ? 2 : 1)); // find closest enemy player
        if (!closestPlayer)
            return;

        let closestSeal = CZSeal.get(closestPlayer, undefined);
        if (!closestSeal || !closestSeal.isSoldierAlive())
            return;

        mod.AILOSMoveToBehavior(this.player, closestSeal.soldierTM.location); // move to closest enemy player
        this.lastAIPathUpdateTime = currentTime;
    }


    /* EVENTS */


    /* triggered when the player earns a kill */
    OnEarnedKill(): void
    {

    }

    /* triggered when the player earns an assist */
    OnEarnedAssist(eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType): void
    {
        if (!this.isAlive)
            return;

        let victim = CZSeal.get(eventOtherPlayer, undefined);
        if (!victim)
            return;

        this.stats.assists[0]++;
        console.log(`Player ${this.playerID} earned an assist on Player ${victim.playerID}`);
        mod.DisplayHighlightedWorldLogMessage(mod.Message("elimination assist"), this.player);
    }

    /* triggered when the player is damaged */
    OnPlayerDamaged(eventDamageType: mod.DamageType, eventOtherPlayer: mod.Player): void
    {
        if (!this.isAlive)
            return;

        let newHealth = mod.GetSoldierState(this.player, mod.SoldierStateNumber.CurrentHealth);
        let damageReceived = this.currentHealth - newHealth;
        this.currentHealth = newHealth; // sync current health

        let shooter = CZSeal.get(eventOtherPlayer, undefined);
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
            mod.DisplayHighlightedWorldLogMessage(mod.Message("FRIENDLY FIRE!"), shooter.player); // warn player about friendly fire

            /* HANDLE EXCESSIVE FRIENDLY FIRE */
            let totalShotsOnFriendly = shooter.stats.shotsOnFriendly[0] + shooter.stats.shotsOnFriendly[1];
            if (totalShotsOnFriendly > 5)
            {
                //  mod.Heal(this.player, damageReceived); // heal the victim
                mod.DealDamage(shooter.player, damageReceived); // deal damage back to the shooter
                console.log(`Player ${shooter.playerID} penalized with ${damageReceived.toFixed(1)} damage for excessive friendly fire`);
            }

            return; // don't count friendly fire as a hit
        }

        /* update stats */
        this.stats.shotsTaken[0]++; // increment shots taken count
        this.stats.damageTaken[0] += damageReceived; // increment damage taken
        shooter.stats.shotsHit[0]++; // increment shots hit count
        shooter.stats.damageDealt[0] += damageReceived; // increment damage dealt
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
        let killerSeal = CZSeal.get(eventOtherPlayer as mod.Player, undefined);
        if (!killerSeal || !killerSeal.isAlive) // killer is not alive , ignore
            return;

        /* check for self-harm */
        if (killerSeal === this)
        {
            // @TODO: negate score for self-kill
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
            let totalFriendlyFireKills = killerSeal.stats.friendlyFireKills[0] + killerSeal.stats.friendlyFireKills[1];
            if (totalFriendlyFireKills > 2)
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

        mod.DisplayNotificationMessage(mod.Message("You will respawn next round"), this.player);
        console.log(`Player ${killerSeal.playerID} eliminated Player ${this.playerID}`);
        //  log.info(mod.Message("{} eliminated {}", killerSeal.player, this.player));
        // mod.DisplayHighlightedWorldLogMessage(mod.Message("elimination"), killerSeal.player);
    }

    /* ACTIONS */

    /* removes all equipment from the player */
    Disarm(): void
    {
        if (this.isArmed === false || !this.isSoldierAlive())
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

    /* enables or disables player input */
    SetInputMode(restrict: boolean): void
    {
        if (!this.isSoldierAlive())
            return;

        mod.EnableInputRestriction(this.player, mod.RestrictedInputs.Jump, restrict); // ensure jump is disabled
        mod.EnableInputRestriction(this.player, mod.RestrictedInputs.MoveForwardBack, restrict); // ensure move forward/back is disabled
        mod.EnableInputRestriction(this.player, mod.RestrictedInputs.MoveLeftRight, restrict); // ensure move left/right is disabled
        mod.EnableInputRestriction(this.player, mod.RestrictedInputs.FireWeapon, restrict); // ensure weapon firing is disabled
    }


    /* UTILITY METHODS */

    /* checks if the player is alive */
    isValid(): boolean
    {
        return mod.GetSoldierState(this.player, mod.SoldierStateBool.IsAlive);
    }
    
    /* returns the player name */
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
    setAIBehavior(attack: boolean): void
    {
        if (!this.isAI)
            return;


        mod.AIEnableShooting(this.player, attack);
        mod.AIEnableTargeting(this.player, attack);

        if (attack)
        {
            mod.AIBattlefieldBehavior(this.player);
            mod.AISetStance(this.player, mod.Stance.Stand);
        }
        else
        {
            mod.AIIdleBehavior(this.player);
            mod.AISetStance(this.player, mod.Stance.Crouch);
        }
    }

    /* checks if the soldier is alive */
    isSoldierAlive(): boolean
    {
        return mod.GetSoldierState(this.player, mod.SoldierStateBool.IsAlive);
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

// STATIC CLASS
export class CZMatchData
{
    static state: GameState = GameState.WaitingForPlayers; // current game state
    static host: mod.Player | undefined; // host player
    static hostID: number = -1; // host player ID
    static matchTime: number = 0; // total accumulated match time in seconds
    static players: number = 0; // total players in the match ( includes bots)
    static bots: number = 0; // number of AI bots in the match
    static teams: number[] = [0, 0]; // number of players per team [team1, team2]
    static botIDs: number[] = []; // list of bot player IDs in the match
    static botSpawners: mod.Spawner[] = []; // list of bot spawners in the map
    static isSpawnModeEnabled: boolean = false; // whether spawn mode is enabled [ determnined via obtaining bot spawners in the map ]

    // SUPPRESSION DATA
    static roundNum: number = 0; // current rounds
    static roundMax: number = 11; // best of 11 rounds (first to 6 wins)
    static roundTime: number = 0; // time left for the current round in seconds
    static roundTimeMax: number = 240; // max round time in seconds ( 4 minutes )
    static scores: number[] = [0, 0]; // rounds won [team1, team2]
    
    private constructor() {}

    static initialize(host: mod.Player): void
    {
        CZMatchData.state = GameState.WaitingForPlayers;
        CZMatchData.players = 1;
        CZMatchData.host = host;
        CZMatchData.hostID = mod.GetObjId(host);
        CZMatchData.botSpawners = [mod.GetSpawner(AI_SPAWNERS), mod.GetSpawner(AI_SPAWNERS + 1)]; // get bot spawners for each team
        CZMatchData.isSpawnModeEnabled = mod.GetObjId(CZMatchData.botSpawners[0]) !== -1 && mod.GetObjId(CZMatchData.botSpawners[1]) !== -1;
    }

    static reset(): void
    {
        CZMatchData.state = GameState.WaitingForPlayers;
        CZMatchData.roundNum = 0;
        CZMatchData.roundMax = 11;
        CZMatchData.roundTime = 0;
        CZMatchData.roundTimeMax = 240;
        CZMatchData.matchTime = 0;
        CZMatchData.players = 0;
        CZMatchData.bots = 0;
        CZMatchData.scores = [0, 0];
        CZMatchData.teams = [0, 0];
        CZMatchData.botIDs = [];
        console.log("Match data reset");
    }

    /* main update loop for the match */
    static async update(): Promise<void>
    {
        switch (CZMatchData.state)
        {
            case GameState.WaitingForPlayers:
                if (CZMatchData.players >= MIN_PLAYERS_TO_START)
                {
                    await CZMatchData.startMatch();
                }
                break;
            case GameState.RoundActive:
                CZMatchData.updateRound();
                break;
            default: break;
        }

        let timeLeft = CZMatchData.roundTime;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        console.log(`Match State: ${GameState[CZMatchData.state]} | Round: ${CZMatchData.roundNum}/${CZMatchData.roundMax} | Time Left: ${minutes}:${seconds.toString().padStart(2, '0')} | Score: ${CZMatchData.scores[0]} - ${CZMatchData.scores[1]} | Players: ${CZMatchData.players} (Bots: ${CZMatchData.bots})`);
        await mod.Wait(1); // wait 1 second before next update
    }

    /* updates the current round state */
    static  async updateRound(): Promise<void>
    {
        CZMatchData.roundTime--;   // decrement round time
        CZMatchData.matchTime++;   // increment match time

        // determine if 1 team is just bots
        let playersAlive = [0, 0]; // players alive per team
        for (let player of CZSeal.sealObjects)
        {
            let seal = CZSeal.get(player, undefined);
            if (!seal || !seal.isAlive || seal.isAI)
                continue;

            playersAlive[seal.teamID - 1]++;
        }

        if ((playersAlive[0] === 0 && playersAlive[1] === 0))
        {
            await CZMatchData.endRound(playersAlive[0] === 0 ? 2 : 1);  // end the round
        }

        if (CZMatchData.roundTime <= 0)
        {
            await CZMatchData.endRound(0);  // end the round
        }
    }

    /* starts a new match */
    static  async startMatch(): Promise<void>
    {
        if (CZMatchData.state !== GameState.WaitingForPlayers)
            return; // only start match if waiting for players


        mod.DeployAllPlayers(); // deploy all players for a warm up period
        mod.DisplayNotificationMessage(mod.Message("MATCH STARTING IN 15 SECONDS"));
        await mod.Wait(15); // wait 15 seconds before starting the match

        for (let player of CZSeal.sealObjects)
        {
            let seal = CZSeal.get(player, undefined);
            if (!seal)
                continue;

            /* set input restriction for pre-round */
            if (seal.isAI)
            {
                seal.setAIBehavior(false); 
            }
            else
                seal.SetInputMode(true);
        }
        
        CZMatchData.roundNum = 0;
        CZMatchData.scores = [0, 0];
        CZMatchData.matchTime = 0;

        console.log("Starting Match");

        await CZMatchData.preRound(); // start the first round immediately
    }

    /* ends the match and displays final scores */
    static  async endMatch(): Promise<void>
    {
        mod.DisplayNotificationMessage(mod.Message("Final Score: {} - {}", CZMatchData.scores[0], CZMatchData.scores[1]));
        CZMatchData.state = GameState.MatchEnd;

        // log seal stats
        console.log(`SEALS Rounds Won: ${CZMatchData.scores[0]}`);
        for (let player of CZSeal.sealObjects)
        {
            let seal = CZSeal.get(player, undefined);
            if (!seal)
                continue;

            if (seal.teamID !== 1)
                continue; // only log team 1 (SEALS) stats for now
            console.log(`Player [${seal.playerID}] Stats: Kills: ${seal.stats.kills[1]}, Deaths: ${seal.stats.deaths[1]}, Headshots: ${seal.stats.headshots[1]}, Headhshot Kills: ${seal.stats.headshotKills[1]}, Shots on Friendly: ${seal.stats.shotsOnFriendly[1]}, Friendly Fire Kills: ${seal.stats.friendlyFireKills[1]}`);
            //  log.info(mod.Message("- {} Stats: Kills: {}, Deaths: {}", seal.player, seal.stats.kills[1], seal.stats.deaths[1]));
            seal.stats.reset(); // reset all stats
        }
        //  log.info(mod.Message("SEALS Rounds Won: {}", CZMatchData.scores[0]));

        console.log(`MERCS Rounds Won: ${CZMatchData.scores[1]}`);
        for (let player of CZSeal.sealObjects)
        {
            let seal = CZSeal.get(player, undefined);
            if (!seal)
                continue;
            if (seal.teamID !== 2)
                continue; // only log team 2 (MERCS) stats for now
            console.log(`Player [${seal.playerID}] Stats: Kills: ${seal.stats.kills[1]}, Deaths: ${seal.stats.deaths[1]}, Headshots: ${seal.stats.headshots[1]}, Headhshot Kills: ${seal.stats.headshotKills[1]}, Shots on Friendly: ${seal.stats.shotsOnFriendly[1]}, Friendly Fire Kills: ${seal.stats.friendlyFireKills[1]}`);
            //  log.info(mod.Message("- {} Stats: Kills: {}, Deaths: {}", seal.player, seal.stats.kills[1], seal.stats.deaths[1]));
            seal.stats.reset(); // reset all stats
        }
        //  log.info(mod.Message("MERCS Rounds Won: {}", CZMatchData.scores[1]));

        await mod.Wait(15); // wait 15 seconds before resetting the match

        let host = CZMatchData.getHostPlayer();
        if (host)
            mod.EndGameMode(host);
    }

    /* prepares for a new round */
    static  async preRound(): Promise<void>
    {
        CZMatchData.state = GameState.PreRound; // transition to pre-round state

        mod.SetSpawnMode(mod.SpawnModes.AutoSpawn); // force auto spawn
        mod.EnableAllPlayerDeploy(true); // enable deploy for all players
        mod.UndeployAllPlayers(); // undeploy all players for the next round
        await mod.Wait(3); // wait a few seconds for the game to do its undeploy logic
        
        /* respawn all players one at a time */
        for (let player of CZSeal.sealObjects)
        {
            let seal = CZSeal.get(player, undefined);
            if (!seal)
                continue;
            
            seal.hasSpawned = false;
            seal.currentHealth = seal.maxHealth;
            seal.isArmed = true;

            /* set input restriction for pre-round */
            seal.SetInputMode(true);
            mod.DeployPlayer(seal.player); // deploy the player
            mod.SetWorldIconOwner(seal.teamIcon, seal.playerTeam);
            mod.EnableWorldIconText(seal.teamIcon, true);
        }

        /* add bots if player count is low (only count human players) */
        let humanPlayers = CZMatchData.players - CZMatchData.bots;
        if (humanPlayers < MAX_PLAYERS_FOR_BOTS)
        {
            let totalBotsNeeded = MAX_PLAYERS_FOR_BOTS - humanPlayers;
            let targetPlayersPerTeam = MAX_PLAYERS_FOR_BOTS / 2;
            
            // Calculate how many bots each team needs to reach balanced teams
            let sealsNeeded = targetPlayersPerTeam - CZMatchData.teams[0];
            let mercsNeeded = targetPlayersPerTeam - CZMatchData.teams[1];
            let sealsToAdd = sealsNeeded > 0 ? sealsNeeded : 0;
            let mercsToAdd = mercsNeeded > 0 ? mercsNeeded : 0;         
            
            // If the calculation doesn't match totalBotsNeeded, distribute remaining bots evenly
            let calculatedBots = sealsToAdd + mercsToAdd;
            if (calculatedBots !== totalBotsNeeded) {
                // Reset and distribute evenly
                let botsPerTeam = totalBotsNeeded / 2; // integer division in Portal
                let extraBot = totalBotsNeeded % 2;
                
                let sealsBase = botsPerTeam + (CZMatchData.teams[0] <= CZMatchData.teams[1] ? extraBot : 0);
                let sealsMax = targetPlayersPerTeam - CZMatchData.teams[0];
                sealsToAdd = sealsBase > sealsMax ? sealsMax : sealsBase;
                sealsToAdd = sealsToAdd > 0 ? sealsToAdd : 0;
                mercsToAdd = totalBotsNeeded - sealsToAdd;
            }
            
            console.log(`Planning to add ${totalBotsNeeded} bots total (SEALS: ${sealsToAdd}, MERCS: ${mercsToAdd})`);
            console.log(`Current team counts - SEALS: ${CZMatchData.teams[0]}, MERCS: ${CZMatchData.teams[1]}`);
            
            // Add bots to SEALS team
            for (let i = 0; i < sealsToAdd; i++)
            {
                CZMatchData.spawnAI(SoldierTeam.SEALS);
                await mod.Wait(0.2); // wait a bit between spawns for proper registration
            }
            
            // Add bots to MERCS team
            for (let i = 0; i < mercsToAdd; i++)
            {
                CZMatchData.spawnAI(SoldierTeam.MERCS);
                await mod.Wait(0.2); // wait a bit between spawns for proper registration
            }

            console.log(`Bot spawning complete. Total players: ${CZMatchData.players}, Bots: ${CZMatchData.bots}`);
        }

        mod.SetSpawnMode(mod.SpawnModes.Deploy); // restore normal spawn mode

        await mod.Wait(5); // wait a few seconds before starting the round

        CZMatchData.startRound(); // start a new round
        
        console.log(`Preparing for Round ${CZMatchData.roundNum}`);
    }

    /* starts a new round */
    static  startRound(): void
    {
        mod.EnableAllPlayerDeploy(false); // disable redeployment for all players
        
        /* disable player input restrictions */
        for (let player of CZSeal.sealObjects)
        {
            let seal = CZSeal.get(player, undefined);
            if (!seal)
                continue;

            if (seal.isAI)
            {
                seal.setAIBehavior(true);
            }
            else
            {
                seal.SetInputMode(false);
            }
        }

        CZMatchData.roundNum++;
        CZMatchData.roundTime = CZMatchData.roundTimeMax;
        mod.DisplayNotificationMessage(mod.Message("Round {} of {} started", CZMatchData.roundNum, CZMatchData.roundMax));
        CZMatchData.state = GameState.RoundActive;
    }

    /* ends the current round , winner = 0 for draw , 1 for team 1 , 2 for team 2 */
    static  async endRound(winner: number): Promise<void>
    {
        CZMatchData.state = GameState.RoundEnd;

        // Update scores
        if (winner)
        {
            CZMatchData.scores[winner - 1]++;
            mod.DisplayNotificationMessage(mod.Message("{} win round {}", CZMatchData.getTeamName(winner - 1), CZMatchData.roundNum));
        }
        else
            mod.DisplayNotificationMessage(mod.Message("Round {} ended in a draw", CZMatchData.roundNum));
        
        await mod.Wait(8); // wait a few seconds before performing end round logic ( allow players to perform end of round actions such as dancing , emotes , etc. )


        console.log(`Round ${CZMatchData.roundNum} ended. Winner: ${winner === 0 ? 'Draw' : CZMatchData.getTeamName(winner - 1)} | Score: ${CZMatchData.scores[0]} - ${CZMatchData.scores[1]}`);

        /* collect bot IDs before cleanup and reset round stats */
        let botsToRemove: number[] = [];
        
        /* log seal stats */
        console.log("SEALS");
        for (let player of CZSeal.sealObjects)
        {
            let seal = CZSeal.get(player, undefined);
            if (!seal)
                continue;

            if (seal.teamID !== 1)
                continue; // only log team 1 (SEALS) stats for now
            console.log(`Player [${seal.playerID}][${seal.getHealthPercent().toFixed(0)}%] Stats: Kills: ${seal.stats.kills[0]}, Deaths: ${seal.stats.deaths[0]}, Headshots: ${seal.stats.headshots[0]}, Headhshot Kills: ${seal.stats.headshotKills[0]}, Shots on Friendly: ${seal.stats.shotsOnFriendly[0]}, Friendly Fire Kills: ${seal.stats.friendlyFireKills[0]}`);
            seal.stats.resetRound(); // reset round stats
            
            if (seal.isAI)
            {
                seal.setAIBehavior(false);
                botsToRemove.push(seal.playerID); // collect bot for removal
            }
            else
                seal.SetInputMode(true);
        }

        /* log merc stats */
        console.log("MERCS");
        for (let player of CZSeal.sealObjects)
        {
            let seal = CZSeal.get(player, undefined);
            if (!seal)
                continue;
            if (seal.teamID !== 2)
                continue; // only log team 2 (MERCS) stats for now
            console.log(`Player [${seal.playerID}][${seal.getHealthPercent().toFixed(0)}%] Stats: Kills: ${seal.stats.kills[0]}, Deaths: ${seal.stats.deaths[0]}, Headshots: ${seal.stats.headshots[0]}, Headhshot Kills: ${seal.stats.headshotKills[0]}, Shots on Friendly: ${seal.stats.shotsOnFriendly[0]}, Friendly Fire Kills: ${seal.stats.friendlyFireKills[0]}`);
            seal.stats.resetRound(); // reset round stats
            
            if (seal.isAI)
            {
                seal.setAIBehavior(false);
                if (!botsToRemove.includes(seal.playerID)) {
                    botsToRemove.push(seal.playerID); // collect bot for removal (avoid duplicates)
                }
            }
            else
                seal.SetInputMode(true);
        }

        /* update team counts by removing all bots */
        for (let botID of botsToRemove) {
            let botSeal = CZSeal.getPlayerByID(botID);
            if (botSeal) {
                CZMatchData.teams[botSeal.teamID - 1]--; // decrement team player count once per bot
            }
        }

        /* remove all bots from spawners first */
        for ( let spawner of CZMatchData.botSpawners )
            mod.UnspawnAllAIsFromAISpawner(spawner); // unspawn all bots from spawner
        
        /* remove bot seal instances */
        for ( let botID of botsToRemove )
            CZSeal.remove(botID); // remove bot seal instances
        
        CZMatchData.botIDs = []; // clear bot ID list
        CZMatchData.players -= CZMatchData.bots; // update player count
        CZMatchData.bots = 0; // reset bot count

        /* Check for match end */
        if (CZMatchData.scores[0] >= 6 || CZMatchData.scores[1] >= 6 || CZMatchData.roundNum >= CZMatchData.roundMax)
            await CZMatchData.endMatch();
        else
        {
            // @TODO: display scoreboard ui
            mod.DisplayNotificationMessage(mod.Message("preparing for the next round"));
            await mod.Wait(7); // wait a few seconds before preparing for the next round
            await CZMatchData.preRound(); // prepare for the next round
        }
    }

    /* triggered when a player joins the game */
    static OnPlayerJoined(eventPlayer: mod.Player): void
    {
        let seal = CZSeal.get(eventPlayer, undefined);
        if (!seal)
            return; // invalid seal object

        log.info(mod.Message("{} joined the game", eventPlayer, seal.teamID));

        mod.SetRedeployTime(eventPlayer, 0.0); // disable redeploy timer
        
        // Initialize game with first player as host
        if (CZMatchData.players === 0 && !CZMatchData.host) {
            CZMatchData.initialize(eventPlayer);
        } else if (!seal.isAI) {
        /* add player count to match data (bots are handled separately in OnSpawnBot) */
            CZMatchData.players++; // increment player count for human players
            CZMatchData.teams[seal.teamID - 1]++; // increment team player count for human players
        }
        // Note: Bot counting is handled in OnSpawnBot to avoid double-counting

        
        // check if the match is in progress
        if (CZMatchData.state !== GameState.WaitingForPlayers && seal.isAI === false)
        {
            // match is currently in progress , auto spawn should be disabled , set player as dead to prevent any possible bugs & disable their ability to redeploy
            // hopefully everything else is handled on the start of the new round.
            seal.isAlive = false; // set player as dead
            seal.isArmed = true; // set flag so player is disarmed if a deployment happens to occur
            mod.EnablePlayerDeploy(eventPlayer, false); // disable redeploy / respawn
            console.log(`Player ${seal.playerID} joined during active match , set as dead`);
            return;
        }

        console.log(`Player Joined: ID: ${seal.playerID} | TeamID: ${seal.teamID} | isAI: ${seal.isAI} | Total Clients: ${CZMatchData.players}`);
    }

    /* triggered when a player leaves the game */
    static OnPlayerLeft(eventNumber: number): void
    {
        let seal = CZSeal.getPlayerByID(eventNumber);
        if (!seal)
            return; // invalid seal object

        CZMatchData.players--;
        if (seal.isAI) {
            CZMatchData.bots--;
            // Remove from bot ID tracking
            const botIndex = CZMatchData.botIDs.indexOf(seal.playerID);
            if (botIndex > -1) {
                CZMatchData.botIDs.splice(botIndex, 1);
            }
        }
        CZMatchData.teams[seal.teamID - 1]--; // decrement team player count

        /* log event */
        console.log(`Player Left: ID: ${seal.playerID} | TeamID: ${seal.teamID}`);
        log.info(mod.Message("{} left the game", seal.player));

        /* remove player */
        CZSeal.remove(eventNumber);
    }

    /* trigged when a player deploys */
    static OnPlayerSpawned(eventPlayer: mod.Player): void
    {
        /* players are only ever "deployed" via preRound() method , just before GameState.PreRound*/ 
        if (CZMatchData.state !== GameState.PreRound)
            return; // ignore spawns while waiting for players

        let seal = CZSeal.get(eventPlayer, undefined);
        if (!seal)
            return;

        seal.playerTeam = mod.GetTeam(eventPlayer); // update team
        seal.teamID = mod.GetObjId(seal.playerTeam); // update teamID

        /* seal already spawned for this round */
        if (seal.hasSpawned)
        {
            seal.Disarm(); // disarm the player to prevent exploits
            mod.UndeployPlayer(eventPlayer); // undeploy the player
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
            mod.SetCameraTypeForPlayer(seal.player, mod.Cameras.ThirdPerson, seal.camera.viewType === SoldierCameraView.RightShoulder ? 0 : 1);
        }

        console.log(`Player ${seal.playerID} spawned for team ${seal.teamID} | isAI: ${seal.isAI}`);
    }

    /* triggered when a bot is spawned from a spawner */
    static OnSpawnBot(eventPlayer: mod.Player, eventSpawner: mod.Spawner): void
    {
        let soldier = CZSeal.get(eventPlayer, eventSpawner);
        if (!soldier)
        {
            console.log(`Failed to register spawned bot from spawner ID: ${mod.GetObjId(eventSpawner)}`);
            return;
        }

        // Only increment counts if this bot isn't already tracked
        if (!CZMatchData.botIDs.includes(soldier.playerID)) {
            CZMatchData.bots++;
            CZMatchData.players++; // increment total player count
            CZMatchData.teams[soldier.teamID - 1]++; // increment team player count
            CZMatchData.botIDs.push(soldier.playerID); // add bot player ID to match data
        }
        
        soldier.setAIBehavior(false); // disable AI behavior initially
        console.log(`Bot Spawned: ID ${soldier.playerID} | TeamID: ${soldier.teamID} | Total Bots: ${CZMatchData.bots} | Total Players: ${CZMatchData.players}`);
    }

    /* triggered when a player returns to the deploy screen */
    static OnPlayerReturnedToDeployScreen(eventPlayer: mod.Player): void
    {
        /* not invoked for bots , only human players */
        let seal = CZSeal.get(eventPlayer, undefined);
        if (!seal)
            return;

        console.log(`Player Undeployed: ID ${seal.playerID} | TeamID: ${seal.teamID} | isAI: ${seal.isAI}`);
    }

    /* triggered when a player is damaged */
    static OnPlayerDamaged(eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDamageType: mod.DamageType, eventWeaponUnlock: mod.WeaponUnlock): void
    {
        let victim = CZSeal.get(eventPlayer, undefined);
        if (!victim || !victim.isAlive) // player already dead , ignore
            return;

        victim.OnPlayerDamaged(eventDamageType, eventOtherPlayer);
    }    

    /* triggered when a player dies */
    static OnPlayerDied(eventPlayer: mod.Player,  eventOtherPlayer: mod.Player,  eventDeathType: mod.DeathType,  eventWeaponUnlock: mod.WeaponUnlock): void
    {
        /* get match data instance , only update if round is active */
        if (CZMatchData.state !== GameState.RoundActive)
            return;

        /* get seal victim instance */
        let victim = CZSeal.get(eventPlayer, undefined);
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

        // Note: Don't remove AI CZSeal instances here - they'll be cleaned up at round end
        // This allows the match logic to properly track eliminated bots for victory conditions


        /*
            check for round end / victory conditions
            a team wins when all players on the opposing team are eliminated
        */

        let victimTeam = mod.GetTeam(eventPlayer);
        let victimTeamID = mod.GetObjId(victimTeam);
        let victimTeamAlivePlayers = CZMatchData.getAlivePlayers(victimTeam); // update alive players for the team

        let otherTeamID = victimTeamID === 1 ? 2 : 1;
        let otherTeam = mod.GetTeam(otherTeamID);
        let otherTeamAlivePlayers = CZMatchData.getAlivePlayers(otherTeam);

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

        CZMatchData.endRound(winner);
    }

    /* triggered when a player earns a kill */
    static OnPlayerEarnedKill( eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock ): void
    {

    }

    /* triggered when a player earns an assist */
    static OnPlayerEarnedAssist( eventPlayer: mod.Player, eventOtherPlayer: mod.Player, eventDeathType: mod.DeathType, eventWeaponUnlock: mod.WeaponUnlock ): void
    {
        let shooter = CZSeal.get(eventPlayer, undefined);
        if (!shooter)
            return;

        shooter.OnEarnedAssist(eventOtherPlayer, eventDeathType);
    }

    /* utility method to get alive players for a team */
    static getAlivePlayers(team: mod.Team): mod.Player[]
    {
        let teamID = mod.GetObjId(team);
        let alivePlayers: mod.Player[] = [];
        for (let player of CZSeal.sealObjects)
        {
            let seal = CZSeal.get(player, undefined);
            if (!seal || !seal.isAlive || seal.teamID !== teamID)
                continue;

            alivePlayers.push(player);
        }
        return alivePlayers;
    }

    /* utility method to get a host player (first non-AI player) */
    static getHostPlayer(): mod.Player | undefined
    {
        // Find the first valid, non-AI player to act as host
        for (let player of CZSeal.sealObjects) {
            let seal = CZSeal.get(player, undefined);
            if (seal && !seal.isAI) {
                return player;
            }
        }

        // If no non-AI players, return the first player (could be AI)
        if (CZSeal.sealObjects.length > 0)
            return CZSeal.sealObjects[0];

        return undefined;
    }

    /* utility method to get team name from team ID */
    static getTeamName(team: number): string
    {
        return team === 0 ? "SEALS" : "MERCS";
    }

    // returns true if the game is in an active gameplay state excluding waiting for players
    static isGamePlayActive(): boolean
    {
        return CZMatchData.state === GameState.PreRound || CZMatchData.state === GameState.RoundActive || CZMatchData.state === GameState.RoundEnd || CZMatchData.state === GameState.MatchEnd;
    }

    /* utility method to spawn an AI bot for the specified team */
    static spawnAI(teamID: number): void
    {
        if (teamID < 1 || teamID > 2)
            return;

        /* get spawner for team */
        const spawner = CZMatchData.botSpawners[teamID - 1];

        /* get a random number between 0 - 3 for AI class */
        const aiClassIndex = Math.floor(Math.random() * 4);
        let aiClass: mod.SoldierClass;
        switch (aiClassIndex) {
            case 0: aiClass = mod.SoldierClass.Assault; break;
            case 1: aiClass = mod.SoldierClass.Engineer; break;
            case 2: aiClass = mod.SoldierClass.Support; break;
            case 3: aiClass = mod.SoldierClass.Recon; break;
            default: aiClass = mod.SoldierClass.Assault; break;
        }

        /* spawn AI from spawner with specified class and team */
        mod.SpawnAIFromAISpawner(spawner, aiClass, mod.GetTeam(teamID));
    }
}

export class CZConsole 
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

/// ------------------------------ NAMESPACES ------------------------------- ///

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
            24, // text size
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

    // MATCH SCORE WIDGET
    export class RoundInfoWidget
    {
        static widget = modlib.ParseUI(
        {
        type: "Container",
        name: "Container_Round_Info",
        position: [0, 0],
        size: [305, 55],
        anchor: mod.UIAnchor.TopCenter,
        visible: true,
        textLabel: "",
        textColor: [1, 1, 1],
        textAlpha: 0.5,
        textSize: 24,
        textAnchor: mod.UIAnchor.Center,
        padding: 10,
        bgColor: [0.2118, 0.2235, 0.2353],
        bgAlpha: 80,
        bgFill: mod.UIBgFill.GradientBottom,
        imageType: mod.UIImageType.None,
        imageColor: [1, 1, 1],
        imageAlpha: 1,
        buttonEnabled: false,
        children: [
            {
            type: "Container",
            name: "Container_SealsAlive",
            position: [-125, 0],
            size: [50, 50],
            anchor: mod.UIAnchor.Center,
            visible: true,
            textLabel: "",
            textColor: [1, 1, 1],
            textAlpha: 1,
            textSize: 24,
            textAnchor: mod.UIAnchor.Center,
            padding: 0,
            bgColor: [0.2, 0.6, 1],
            bgAlpha: 0.9,
            bgFill: mod.UIBgFill.Solid,
            imageType: mod.UIImageType.None,
            imageColor: [1, 1, 1],
            imageAlpha: 1,
            buttonEnabled: false,
            children: [
                {
                type: "Text",
                name: "Text_Score_SealsRemaining",
                position: [0, 0],
                size: [50, 50],
                anchor: mod.UIAnchor.Center,
                visible: true,
                textLabel: "SEALs: 0",
                textColor: [0.0314, 0.0431, 0.0431],
                textAlpha: 0.8,
                textSize: 18,
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
            name: "Container_MercsAlive",
            position: [125, 0],
            size: [50, 50],
            anchor: mod.UIAnchor.Center,
            visible: true,
            textLabel: "",
            textColor: [1, 1, 1],
            textAlpha: 1,
            textSize: 24,
            textAnchor: mod.UIAnchor.Center,
            padding: 0,
            bgColor: [1, 0.302, 0.302],
            bgAlpha: 0.9,
            bgFill: mod.UIBgFill.Solid,
            imageType: mod.UIImageType.None,
            imageColor: [1, 1, 1],
            imageAlpha: 1,
            buttonEnabled: false,
            children: [
                {
                type: "Text",
                name: "Text_Score_MercsRemaining",
                position: [0, 0],
                size: [50, 50],
                anchor: mod.UIAnchor.Center,
                visible: true,
                textLabel: "MERCs: 0",
                textColor: [0.0314, 0.0431, 0.0431],
                textAlpha: 0.8,
                textSize: 18,
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
            name: "Container_RoundTimer",
            position: [0, 0],
            size: [200, 50],
            anchor: mod.UIAnchor.Center,
            visible: true,
            textLabel: "",
            textColor: [1, 1, 1],
            textAlpha: 1,
            textSize: 24,
            textAnchor: mod.UIAnchor.Center,
            padding: 0,
            bgColor: [0.0314, 0.0431, 0.0431],
            bgAlpha: 0.9,
            bgFill: mod.UIBgFill.Blur,
            imageType: mod.UIImageType.None,
            imageColor: [1, 1, 1],
            imageAlpha: 1,
            buttonEnabled: false,
            children: [
            {
            type: "Text",
            name: "Text_Score_RoundTime",
            position: [0, 10],
            size: [100, 20],
            anchor: mod.UIAnchor.Center,
            visible: true,
            textLabel: "4:00",
            textColor: [1, 1, 1],
            textAlpha: 1,
            textSize: 22,
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
            name: "Text_Score_CurrentRound",
            position: [0, -15],
            size: [100, 20],
            anchor: mod.UIAnchor.Center,
            visible: true,
            textLabel: "Round 1",
            textColor: [1, 1, 1],
            textAlpha: 1,
            textSize: 22,
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
            name: "Text_SealRoundsWon",
            position: [0, 0],
                size: [50, 25],
                anchor: mod.UIAnchor.CenterLeft,
                visible: true,
                textLabel: "Seal Rounds: 0",
                textColor: [1, 1, 1],
                textAlpha: 1,
                textSize: 18,
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
                name: "Text_MercRoundsWon",
                position: [0, 0],
                size: [50, 25],
                anchor: mod.UIAnchor.CenterRight,
                visible: true,
                textLabel: "Merc Rounds: 0",
                textColor: [1, 1, 1],
                textAlpha: 1,
                textSize: 18,
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
        );


        // Store widget references for updates
        static sealsText: mod.UIWidget | undefined;
        static mercsText: mod.UIWidget | undefined;
        static timeText: mod.UIWidget | undefined;
        static currentRoundText: mod.UIWidget | undefined;
        static sealRoundsText: mod.UIWidget | undefined
        static mercRoundsText: mod.UIWidget | undefined;


        private constructor() {}

        // Initialize widget references
        static init(): void 
        {
            this.sealsText = mod.FindUIWidgetWithName("Text_Score_SealsRemaining");
            this.mercsText = mod.FindUIWidgetWithName("Text_Score_MercsRemaining");
            this.timeText = mod.FindUIWidgetWithName("Text_Score_RoundTime");
            this.currentRoundText = mod.FindUIWidgetWithName("Text_Score_CurrentRound");
            this.sealRoundsText = mod.FindUIWidgetWithName("Text_SealRoundsWon");
            this.mercRoundsText = mod.FindUIWidgetWithName("Text_MercRoundsWon");
        }

        // Update the score widget with current game data
        static update(): void {

            // Get alive player counts for each team
            let team1 = mod.GetTeam(1);
            let team2 = mod.GetTeam(2);
            let sealsAlive = CZMatchData.getAlivePlayers(team1).length;
            let mercsAlive = CZMatchData.getAlivePlayers(team2).length;

            // Format time remaining and status based on game state
            let timeString = "00:00";
            let showTimeWidget = true;

            switch (CZMatchData.state) {
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
                mod.SetUITextLabel(this.sealsText, mod.Message("{}", sealsAlive));

            /* MERCs ALIVE */
            if (this.mercsText)
                mod.SetUITextLabel(this.mercsText, mod.Message("{}", mercsAlive));

            /* ROUND TIMER */
            if (this.timeText) {
                if (CZMatchData.state == GameState.RoundActive) {
                    let timeLeft = CZMatchData.roundTime;
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
                if (CZMatchData.state === GameState.RoundActive) {
                    let timeLeft = CZMatchData.roundTime;
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

            /* CURRENT ROUND */
            if (this.currentRoundText)
                mod.SetUITextLabel(this.currentRoundText, mod.Message("Round {}", CZMatchData.roundNum));

            /* SEAL ROUNDS WON */
            if (this.sealRoundsText)
                mod.SetUITextLabel(this.sealRoundsText, mod.Message("{}", CZMatchData.scores[0]));

            /* MERC ROUNDS WON */
            if (this.mercRoundsText)
                mod.SetUITextLabel(this.mercRoundsText, mod.Message("{}", CZMatchData.scores[1]));

            // Update widget visibility based on game state
            let shouldShow = CZMatchData.isGamePlayActive() && showTimeWidget;
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