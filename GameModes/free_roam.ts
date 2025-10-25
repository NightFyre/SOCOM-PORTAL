// import * as modlib from 'modlib'; // required on server side
// import * as modlib from '../PortalSDK/code/modlib'; // for local testing

const WORLD_ICON_PLAYERS = 700; // 700 - 715

// Triggered when player joins the game. Useful for pregame setup, team management, etc.
export function OnPlayerJoinGame(eventPlayer: mod.Player): void 
{
    SOCOM.CZGame.OnPlayerJoined(eventPlayer);
}

// Triggered when player leaves the game. Useful for clean up logic, team management, etc.
export function OnPlayerLeaveGame(eventNumber: number): void 
{
    SOCOM.CZGame.OnPlayerLeft(eventNumber);
}

// Triggered when player selects their class and deploys into game. Useful for any spawn/start logic.
export function OnPlayerDeployed(eventPlayer: mod.Player): void 
{
    SOCOM.CZGame.OnPlayerDeploy(eventPlayer);
}

// This will trigger when an AISpawner spawns an AI Soldier.
export function OnSpawnerSpawned(eventPlayer: mod.Player, eventSpawner: mod.Spawner): void
{
    SOCOM.CZGame.OnSpawnBot(eventPlayer, eventSpawner);
}

// This will trigger when the Player dies and returns to the deploy screen.
export function OnPlayerUndeploy(eventPlayer: mod.Player): void 
{ 
    SOCOM.CZGame.OnPlayerUndeploy(eventPlayer);
}

export function OnPlayerDied( eventPlayer: mod.Player,  eventOtherPlayer: mod.Player,  eventDeathType: mod.DeathType,  eventWeaponUnlock: mod.WeaponUnlock ): void 
{
    SOCOM.CZGame.OnPlayerDied(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock);
}

// Triggered on main gamemode start. Useful for game start setup logic.
export async function OnGameModeStarted() 
{
    await SOCOM.CZGame.OnGameModeStarted();
}

// Triggered on main gamemode end. Useful for game cleanup.
export function OnGameModeEnding(): void 
{
    SOCOM.CZGame.OnGameModeEnded();
}

// Triggered every frame during the game mode.
export function OngoingGlobal(): void 
{
    SOCOM.CZGame.OngoingGlobal();
}

export function OnPlayerUIButtonEvent(player: mod.Player, widget: mod.UIWidget, event: mod.UIButtonEvent) {
    
}

// https://github.com/xCENTx/SOCOM-PORTAL
export namespace SOCOM {

    export enum SoldierTeam {
        SEALs = 1, 
        MERCs = 2
    }

    export enum SoldierCameraView {
        RightShoulder,
        LeftShoulder
    }

    export enum GameState {
        GameInit,
        GameActive,
        GameEnd
    }

    export class CZGame {

        static state: GameState = GameState.GameInit;
        static host: mod.Player | undefined; // host is the player who started the game , the server is dedicated and can persist without after the host leaves the session. therefore the host is index 0 in the player array
        static hostID: number = -1;
        static gameTime: number = 0; // total accumulated game time in seconds
        static clients: number = 0; // current number of players / bots connected
        static bots: number = 0; // current number of clients that are bots
        static botSpawners: mod.Spawner[] = []; // list of bot spawners in the map

        static sealObjects: mod.Player[] = [];
        
        private constructor() {
            // Private constructor prevents instances
        }

        static initialize(host: mod.Player): void
        {
            CZGame.state = GameState.GameInit;
            CZGame.clients = 1; // Start with the host
            CZGame.host = host;
            CZGame.hostID = mod.GetObjId(host);
            CZGame.botSpawners = [mod.GetSpawner(10), mod.GetSpawner(11)]; // get bot spawners for each team
            console.log(`CZGame initialized. HostID: ${CZGame.hostID} | Name: ${host}`);
        }

        static reset(): void
        {
            CZGame.state = GameState.GameInit;
            CZGame.host = undefined;
            CZGame.hostID = -1;
            CZGame.gameTime = 0;
            CZGame.clients = 0;
            CZGame.bots = 0;
            console.log("CZGame reset");
        }

        static async update(): Promise<void>
        {
            CZGame.gameTime++;
            
            switch (CZGame.state) {
                case GameState.GameInit:    break;
                case GameState.GameActive:  break;
                case GameState.GameEnd:     break;
            }
            
            await mod.Wait(1); // wait 1 second before next update
        }

        static OngoingGlobal(): void
        {
            /* update in game log panel */
            log.update();
            
            // Check all players for camera updates (runs every frame)
            for (let player of CZSeal.sealObjects)
            {
                let seal = CZSeal.get(player);
                if (!seal)
                    continue;
            
                /* update camera state */
                seal.update();
            }
        }

        static async OnGameModeStarted(): Promise<void>
        {
            console.log("CZGame OnGameModeStarted");



            /* setup world icons */
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


            // Initialize the game when first player joins (will be handled in OnPlayerJoined)
            while (CZGame.state != GameState.GameEnd)
            {
                await CZGame.update();
            }
        }

        static OnGameModeEnded(): void
        {
            CZSeal.sealObjects = [];
            CZGame.reset();
        }

        static OnPlayerJoined(eventPlayer: mod.Player): void
        {
            let seal = CZSeal.get(eventPlayer);
            if (!seal)
                return;

            mod.SetTeam(seal.player, mod.GetTeam(1)); // set player to SEALs team by default

            // Initialize game with first player as host
            if (CZGame.clients === 0 && !CZGame.host) {
                CZGame.initialize(eventPlayer);
            } else {
                CZGame.clients++;
            }
            
            CZGame.bots += seal.isAI ? 1 : 0;
            
            console.log(`Player Joined: ID ${seal.playerID} | TeamID: ${seal.teamID} | isAI: ${seal.isAI} | Total clients: ${CZGame.clients}`);
        }

        static OnPlayerLeft(eventNumber: number): void
        {
            let seal = CZSeal.getPlayerByID(eventNumber);
            if (seal) {
                CZGame.clients--;
                CZGame.bots -= seal.isAI ? 1 : 0;
                console.log(`Player Left: ID ${seal.playerID} | Total clients: ${CZGame.clients}`);
            }
            
            CZSeal.destroy(eventNumber);
        }

        static OnPlayerDeploy(eventPlayer: mod.Player): void
        {
            let seal = CZSeal.get(eventPlayer);
            if (!seal)
                return;

            mod.SetCameraTypeForPlayer(seal.player, mod.Cameras.ThirdPerson, seal.camera.viewType === SoldierCameraView.RightShoulder ? 0 : 1);
            mod.SetWorldIconOwner(seal.soldierIcon, seal.playerTeam);
            mod.EnableWorldIconText(seal.soldierIcon, true);
                        
            console.log(`Player Deployed: ID ${seal.playerID} | TeamID: ${seal.teamID} | isAI: ${seal.isAI}`);
        }

        static OnSpawnBot(eventPlayer: mod.Player, eventSpawner: mod.Spawner): void
        {
            let seal = CZSeal.get(eventPlayer);
            if (!seal)
                return;

            CZGame.bots++;
            mod.AIIdleBehavior(seal.player); // set default AI behavior
            console.log(`Bot Spawned: ID ${seal.playerID} | TeamID: ${seal.teamID}`);
        }

        static OnPlayerUndeploy(eventPlayer: mod.Player): void
        {
            let seal = CZSeal.get(eventPlayer);
            if (!seal)
                return;
            
            console.log(`Player Undeployed: ID ${seal.playerID} | TeamID: ${seal.teamID} | isAI: ${seal.isAI}`);
        }

        static OnPlayerDied( eventPlayer: mod.Player,  eventOtherPlayer: mod.Player,  eventDeathType: mod.DeathType,  eventWeaponUnlock: mod.WeaponUnlock ): void
        {
            /* get seal victim instance */
            let victim = CZSeal.get(eventPlayer);
            if (!victim)
                return;

            /* disable world icon text on death */
            mod.EnableWorldIconText(victim.soldierIcon, false);
        }

        static SpawnAI(teamID: number): void
        {
            if (teamID < 1 || teamID > 2)
                return;

            /* get spawner for team */
            const spawner = CZGame.botSpawners[teamID - 1];

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

    
    // @TODO: could be invalid
    export class CZSoldierTM {
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
            if (!mod.IsPlayerValid(this.player) || !mod.GetSoldierState(this.player, mod.SoldierStateBool.IsAlive))
            {

                return;
            }

            this.location = mod.GetSoldierState(this.player, mod.SoldierStateVector.GetPosition);
            this.lookAt = mod.GetSoldierState(this.player, mod.SoldierStateVector.GetFacingDirection);
            this.velocity = mod.GetSoldierState(this.player, mod.SoldierStateNumber.Speed);
            this.rotation = mod.GetObjectRotation(this.player);
        }
    }

    export class CZSeal {
        player: mod.Player;
        playerTeam: mod.Team;
        soldierTM: CZSoldierTM;
        soldierIcon: mod.WorldIcon;
        playerID: number;
        teamID: number;
        isAI: boolean;
        isArmed: boolean = true;

        // pattern detection 
        inputDetector = new Utility.Input();

        /* camera instance */
        camera: CZCamera;

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
            this.soldierIcon = mod.GetWorldIcon(WORLD_ICON_PLAYERS + this.playerID);
            this.camera = new CZCamera(this);
            this.soldierTM = new CZSoldierTM(player);

            if (!this.soldierIcon)
            {
                CZSeal.sealObjects.push(player);
                return;
            }

            mod.SetWorldIconText(this.soldierIcon, mod.Message("{}", this.player));
            mod.SetWorldIconOwner(this.soldierIcon, this.playerTeam);
            mod.EnableWorldIconText(this.soldierIcon, true);
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
        static destroy(playerID: number): void
        {
            //  let playerID = mod.GetObjId(player);
            if (playerID <= -1)
                return;

            console.log(`Removing CZSeal for Player ID: ${playerID}`);

            // Remove from the players dictionary
            let seal = this.#allSealPlayers[playerID];
            if (seal) {

                // clear icon owner
                mod.EnableWorldIconImage(seal.soldierIcon, false); // disable icon image
                mod.EnableWorldIconText(seal.soldierIcon, false); // disable icon text
                mod.SetWorldIconOwner(seal.soldierIcon, this.#allSealPlayers[0].player); // set icon owner to server owner
                mod.SetWorldIconText(seal.soldierIcon, mod.Message("this should not be visible")); // clear name
                mod.SetWorldIconPosition(seal.soldierIcon, mod.CreateVector(0, 0, -100000)); // move icon out of view and bury it deep
                
                // Remove from sealObjects array
                const index = this.sealObjects.indexOf(seal.player);
                if (index > -1) {
                    this.sealObjects.splice(index, 1);
                }
            }
            
            delete this.#allSealPlayers[playerID];
        }

        /* get a CZSeal by playerID */
        static getPlayerByID(playerID: number): CZSeal | undefined
        {
            return this.#allSealPlayers[playerID];
        }

        /* call in game update to update seal state */
        update(): void
        {

            if (!this.isSealValid())
                return;

            /* update soldier transforms */
            this.soldierTM.update();

            /* update camera state */
            if (!this.isAI)
              this.camera.update();

            /* update name tag icon */
            this.updateIcon();

        }

        /* update the player name tag icon - team, position, and text. does not update the icon visibility state */
        private updateIcon(): void
        {
            mod.SetWorldIconOwner(this.soldierIcon, this.playerTeam);
            mod.SetWorldIconPosition(this.soldierIcon, this.soldierTM.location);
            mod.SetWorldIconText(this.soldierIcon, mod.Message("{}", this.player));
        }

        /* ACTIONS */

        /* removes all equipment from the player */
        Disarm(): void
        {
            if (this.isArmed === false || !this.isSealValid())
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

        /* checks if the soldier is valid */
        isSealValid(): boolean
        {
            return mod.GetSoldierState(this.player, mod.SoldierStateBool.IsAlive) && mod.IsPlayerValid(this.player);
        }

        /* checks if the soldier is alive */
        isSealAlive(): boolean
        {
            return mod.GetSoldierState(this.player, mod.SoldierStateBool.IsAlive);
        }
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

// https://staging.d70cu09wjw7ws.amplifyapp.com/
// https://discord.com/channels/870246147455877181/1428410039080718487
export namespace UI {

}