
////////////////////////////////// PLAYER EVENTS ///////////////////////////////////////

// Triggered when player joins the game. Useful for pregame setup, team management, etc.
export function OnPlayerJoinGame(eventPlayer: mod.Player): void 
{  
    /* get seal instance */
    let seal = CZSeal.get(eventPlayer);
    if (!seal)
        return; // invalid seal object
    
    /* Display Welcome Message */
    //  const welcomeMessage = mod.Message('welcome to SOCOM Portal!');
    //  mod.DisplayNotificationMessage(welcomeMessage, eventPlayer); 
 
    /* log event */
    console.log(`Player Joined: ID: ${seal.playerID} | TeamID: ${seal.teamID}`);
}

// Triggered when player leaves the game. Useful for clean up logic, team management, etc.
export function OnPlayerLeaveGame(eventNumber: number): void 
{
    /* eventNumber is playerID */
    CZSeal.remove(eventNumber);
}

// Triggered when player selects their class and deploys into game. Useful for any spawn/start logic.
export function OnPlayerDeployed(eventPlayer: mod.Player): void 
{
    /* get seal instance */
    let seal = CZSeal.get(eventPlayer);
    if (!seal)
        return; // invalid seal object

    /* set seal state */
    seal.hasSpawned = true;
    seal.isAlive = true;

    /* log event */
    console.log(`Player Spawned: ID: ${seal.playerID} | TeamID: ${seal.teamID}`);

    /* set camera type to 3rd person */
    if (!seal.isAI)
        mod.SetCameraTypeForPlayer(eventPlayer, mod.Cameras.ThirdPerson);
}

// This will trigger when the Player dies and returns to the deploy screen.
export function OnPlayerUndeploy(eventPlayer: mod.Player): void 
{
    let seal = CZSeal.get(eventPlayer);
    if (!seal) 
        return; // invalid seal object
    
    seal.isAlive = false;
}

// Triggered on player death/kill, returns dying player, the killer, etc. Useful for updating scores, updating progression, handling any death/kill related logic.
export function OnPlayerDied(
    eventPlayer: mod.Player, 
    eventOtherPlayer: mod.Player, 
    eventDeathType: mod.DeathType, 
    eventWeaponUnlock: mod.WeaponUnlock
): void {
    let seal = CZSeal.get(eventPlayer);
    if (!seal) 
        return;
    
    seal.isAlive = false;
    seal.stats.deaths++;
    
    console.log(`Player ${seal.playerID} died. Checking for round end...`);
}

export function OnPlayerEarnedKill(
    eventPlayer: mod.Player,
    eventOtherPlayer: mod.Player,
    eventDeathType: mod.DeathType,
    eventWeaponUnlock: mod.WeaponUnlock
): void 
{
    let killerSeal = CZSeal.get(eventPlayer);
    let victimSeal = CZSeal.get(eventOtherPlayer);
    if (!killerSeal || !victimSeal) 
        return;

    /* check for self-harm */
    if (killerSeal === victimSeal)
    {
        console.log(`Player ${killerSeal.playerID} killed themselves`);
        return;
    }

    /* check for friendly fire */
    let bFriendlyFire = killerSeal.teamID === victimSeal.teamID;
    if (bFriendlyFire)
    {
        killerSeal.stats.friendlyFireKills++; // increment friendly fire kills count
        victimSeal.stats.friendlyFireDeaths++; // increment friendly fire deaths count
        console.log(`Player ${killerSeal.playerID} killed friendly Player ${victimSeal.playerID}`);

        /* HANDLE EXCESSIVE FRIENDLY FIRE */
        if (killerSeal.stats.friendlyFireKills >= 2)
        {
            mod.Kill(killerSeal.player); // kill the killer for excessive friendly fire
            console.log(`Player ${killerSeal.playerID} killed for excessive friendly fire`);
        }

        return;
    }

    killerSeal.stats.kills++;

    console.log(`Player ${killerSeal.playerID} killed Player ${victimSeal.playerID}`);
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
    let shooter = CZSeal.get(eventOtherPlayer);
    if (!victim || !shooter) 
        return;

    /* check for self-harm */
    if (victim.playerID === shooter.playerID)
    {
        console.log(`Player ${shooter.playerID} hit themselves`);
        return;
    }

    /* check for friendly fire */
    let bFriendlyFire = victim.teamID === shooter.teamID;
    if (bFriendlyFire)
    {
        shooter.stats.shotsOnFriendly++; // increment shots on friendly count
        victim.stats.shotsTakenByFriendly++; // increment shots taken by friendly count
        console.log(`Player ${shooter.playerID} hit friendly Player ${victim.playerID}`);

        /* HANDLE EXCESSIVE FRIENDLY FIRE */
        if (shooter.stats.shotsOnFriendly > 5 && shooter.stats.friendlyFireKills >= 2)
        {
            mod.Heal(victim.player, victim.maxHealth * 0.25); // heal the victim for 25% of max health
            shooter.Disarm(); // disarm the shooter , prvents further friendly fire & exploiting the health system
            console.log(`Player ${shooter.playerID} penalized for excessive friendly fire`);
        }

        return; // don't count friendly fire as a hit
    }

    /* update stats */
    victim.stats.shotsTaken++; // increment shots taken count
    shooter.stats.shotsHit++; // increment shots hit count

    // log damage info
    console.log(`Player ${shooter.playerID} damaged Player ${victim.playerID}`);
}


/////////////////////// GAMEMODE EVENTS //////////////////////////////

// This will trigger when the gamemode time limit has been reached.
export function OnTimeLimitReached(): void {}

// Triggered on main gamemode start/end. Useful for game start setup and cleanup.
export async function OnGameModeStarted() 
{
    /* Don't force auto spawn here - let the round system control it */ 
    console.log("SOCOM Suppression mode started");
    
    /* start the match */
    mod.SetSpawnMode(mod.SpawnModes.AutoSpawn);
}

// This will trigger when the gamemode ends.
export function OnGameModeEnding(): void {}

export function OngoingGlobal(): void 
{
    // Check all players for camera updates (runs every frame)
    for (let player of CZSeal.sealObjects)
    {
        let seal = CZSeal.get(player);
        if (seal && seal.isAlive)
            seal.CameraUpdate();
    }
}

/// --------------------------------- CZSEAL --------------------------------- ///

class CZSealStats
{
    kills: number = 0; // number of kills
    deaths: number = 0; // number of times died 
    shotsHit: number = 0; // shots that hit an enemy
    shotsOnFriendly: number = 0; // shots that hit a friendly
    shotsTaken: number = 0; // times shot
    shotsTakenByFriendly: number = 0; // times shot by friendly
    friendlyFireDeaths: number = 0; // deaths by friendly fire
    friendlyFireKills: number = 0; // kills by friendly fire
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
    isAdmin: boolean = false; // Track if this player is an admin

    // seal stats
    stats: CZSealStats = new CZSealStats();

    // static list of all player instances
    static sealObjects: mod.Player[] = [];

    /* should only be created via CZSeal.get() */
    constructor(player: mod.Player)
    {
        this.player = player;
        this.playerID = mod.GetObjId(player);
        this.teamID = mod.GetObjId(mod.GetTeam(player));
        this.isAI = mod.GetSoldierState(player, mod.SoldierStateBool.IsAISoldier);
        CZSeal.sealObjects.push(player);
    }

    // static list of all seal players by playerID
    static #allSealPlayers: { [key: number]: CZSeal } = {};

    /* should only be accessed via OnPlayer Events , a new Seal will be created if none exists */
    static get(player: mod.Player)
    {
        let playerID = mod.GetObjId(player);
        if (playerID > -1)
        {
            let seal = CZSeal.#allSealPlayers[playerID];
            if (!seal)
            {
                seal = new CZSeal(player);
                CZSeal.#allSealPlayers[playerID] = seal;
                console.log(`Created new CZSeal for PlayerID: ${playerID}`);
            }

            return seal;
        }
        return undefined;
    }

    /* should only be accessed via OnPlayerLeaveGame Event */
    static remove(playerID: number)
    {
        //  let playerID = mod.GetObjId(player);
        if (playerID <= -1)
            return;

        delete this.#allSealPlayers[playerID];
        console.log(`Removed CZSeal for PlayerID: ${playerID}`);
    }
    
    /* get a CZSeal by playerID - useful for admin system */
    static getPlayerByID(playerID: number): CZSeal | undefined
    {
        return this.#allSealPlayers[playerID];
    }

    /* call in game update to update camera state */
    CameraUpdate()
    {
        /* verify valid state */
        if (!this.isAlive || !this.hasSpawned || this.isAI)
            return;
        
        /* get zoom state */
        let isCurrentlyZooming = mod.GetSoldierState(this.player, mod.SoldierStateBool.IsZooming);
        if (isCurrentlyZooming == this.isZooming)
            return;

        /* set zoom state */
        this.isZooming = isCurrentlyZooming;
        
        /* update camera */
        mod.SetCameraTypeForPlayer(this.player, this.isZooming ? mod.Cameras.FirstPerson : mod.Cameras.ThirdPerson);
    }

    /* removes all equipment from the player */
    Disarm()
    {
        mod.RemoveEquipment(this.player, mod.InventorySlots.PrimaryWeapon); // remove primary weapon from player
        mod.RemoveEquipment(this.player, mod.InventorySlots.SecondaryWeapon); // remove secondary weapon from player
        mod.RemoveEquipment(this.player, mod.InventorySlots.Throwable); // remove thrown weapon from player
        mod.RemoveEquipment(this.player, mod.InventorySlots.MeleeWeapon); // remove melee weapon from player
        mod.RemoveEquipment(this.player, mod.InventorySlots.GadgetOne); // remove gadget one from player
        mod.RemoveEquipment(this.player, mod.InventorySlots.GadgetTwo); // remove gadget two from player
        mod.RemoveEquipment(this.player, mod.InventorySlots.ClassGadget); // remove class gadget from player
        mod.RemoveEquipment(this.player, mod.InventorySlots.MiscGadget); // remove misc gadget from player
    }
}

/* */
class CZMatchData
{
    isMatchActive: boolean = false;
    roundNum: number = 0; // current rounds
    roundMax: number = 11; // best of 11 rounds
    roundTime: number = 240; // in seconds ( 4 minutes )
    roundTimeMax: number = 240; // in seconds ( 4 minutes )
    roundStarted: boolean = false; // true when round is active, false when round is not active
    roundEnded: boolean = false; // true when round ends, false when round is active
    currentPlayers: number = 0;
    minPlayers: number = 2;
    maxPlayers: number = 16;
    scores: number[] = [0, 0]; // rounds won
    names: string[] = ["Seals", "Insurgents"];
    players: CZSeal[] = [];
    gameMode: string = "Suppression"; // or "Demolition"
    //  mapName: string = mod.GetCurrentMapName();
    winningTeam: number = 0; // 0 = no team, 1 = team 1, 2 = team 2
    roundWinner: number = 0; // 0 = no team, 1 = team 1, 2 = team 2
}