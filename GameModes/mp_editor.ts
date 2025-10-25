// import * as modlib from 'modlib'; // required on server side
import * as modlib from '../PortalSDK/code/modlib'; // for local testing

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
                seal.CameraUpdate();
                
                /* update player widgets */
                seal.UpdateWidgets();
            }
        }

        static async OnGameModeStarted(): Promise<void>
        {
            console.log("CZGame OnGameModeStarted");

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

            mod.SetCameraTypeForPlayer(seal.player, mod.Cameras.ThirdPerson, seal.cameraView === SoldierCameraView.RightShoulder ? 0 : 1);
                        
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

    export class CZSeal {
        player: mod.Player;
        playerID: number;
        teamID: number;
        isAI: boolean;
        isZooming: boolean = false;
        cameraView: SoldierCameraView = SoldierCameraView.RightShoulder; // current camera view mode

        // zoom pattern detection for shoulder switching
        private inputDetector = new Utility.Input();
        
        // Per-player UI widget (only for non-AI players)
        playerOriginWidget?: UI.PlayerOriginWidget;

        // static list of all player instances
        static sealObjects: mod.Player[] = [];

        /* should only be created via CZSeal.get() */
        constructor(player: mod.Player)
        {
            this.player = player;
            this.playerID = mod.GetObjId(player);
            this.teamID = mod.GetObjId(mod.GetTeam(player)); // teamID should be 1 or 2
            this.isAI = mod.GetSoldierState(player, mod.SoldierStateBool.IsAISoldier);

            // Only create PlayerOriginWidget for non-AI players
            if (!this.isAI) {
                this.playerOriginWidget = new UI.PlayerOriginWidget(player);
            }

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
                // Hide and cleanup player widgets
                if (seal.playerOriginWidget && seal.playerOriginWidget.OriginWidget) {
                    mod.SetUIWidgetVisible(seal.playerOriginWidget.OriginWidget, false);
                }
                
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

        /* call in game update to update camera state */
        CameraUpdate(): void
        {
            if (this.isAI || !mod.GetSoldierState(this.player, mod.SoldierStateBool.IsAlive))
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

        /* update player widgets - call this regularly for non-AI players */
        UpdateWidgets(): void
        {
            if (this.playerOriginWidget) {
                this.playerOriginWidget.update(this.player);
              console.log(`CZSeal: Updated playerOriginWidget for Player ID: ${this.playerID}`);
              }
            else
              console.log(`CZSeal: No playerOriginWidget for Player ID: ${this.playerID}`);
        }

        /* show or hide the player origin widget */
        ShowPlayerOriginWidget(visible: boolean): void
        {
            if (this.playerOriginWidget && this.playerOriginWidget.OriginWidget) {
                mod.SetUIWidgetVisible(this.playerOriginWidget.OriginWidget, visible);
            }
        }

        /* switch between left and right shoulder view */
        private switchShoulderView(): void
        {
            this.cameraView = this.cameraView === SoldierCameraView.RightShoulder ? 
                SoldierCameraView.LeftShoulder : 
                SoldierCameraView.RightShoulder;
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

    export class PlayerOriginWidget {
        
        OriginWidget: mod.UIWidget | undefined;
        player: mod.Player;
        locationText: mod.UIWidget | undefined;
        rotationText: mod.UIWidget | undefined;
        velocityText: mod.UIWidget | undefined;

        constructor(player: mod.Player) {
            this.player = player;
            const playerID = mod.GetObjId(player);
            
            // Create unique widget names for this player instance
            //  const containerName = `Container_PlayerInfo_${playerID}`;
            //  const originName = `Text_Origin_${playerID}`;
            //  const rotationName = `Text_Rotation_${playerID}`;
            //  const velocityName = `Text_Velocity_${playerID}`;
            
            this.OriginWidget = modlib.ParseUI(
              {
                type: "Container",
                name: "Container_PlayerInfo",
                position: [10, 10],
                size: [400, 250],
                anchor: mod.UIAnchor.TopLeft,
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
                playerID: playerID,
                children: [
                  {
                    type: "Text",
                    name: "Text_Origin",
                    position: [0, 0],
                    size: [400, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    textLabel: "Origin: x, y, z",
                    textColor: [0.0667, 1, 0],
                    textAlpha: 1,
                    textSize: 24,
                    textAnchor: mod.UIAnchor.CenterLeft,
                    padding: 10,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    imageType: mod.UIImageType.None,
                    imageColor: [1, 1, 1],
                    imageAlpha: 1,
                    buttonEnabled: false,
                    playerID: playerID,
                  },
                  {
                    type: "Text",
                    name: "Text_Rotation",
                    position: [0, 50],
                    size: [400, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    textLabel: "Rotation: pitch, yaw, roll",
                    textColor: [0.0667, 1, 0],
                    textAlpha: 1,
                    textSize: 24,
                    textAnchor: mod.UIAnchor.CenterLeft,
                    padding: 10,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    imageType: mod.UIImageType.None,
                    imageColor: [1, 1, 1],
                    imageAlpha: 1,
                    buttonEnabled: false,
                    playerID: playerID,
                  },
                  {
                    type: "Text",
                    name: "Text_Velocity",
                    position: [0, 100],
                    size: [400, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    textLabel: "Velocity: 0m/s",
                    textColor: [0.0667, 1, 0],
                    textAlpha: 1,
                    textSize: 24,
                    textAnchor: mod.UIAnchor.CenterLeft,
                    padding: 10,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 1,
                    bgFill: mod.UIBgFill.None,
                    imageType: mod.UIImageType.None,
                    imageColor: [1, 1, 1],
                    imageAlpha: 1,
                    buttonEnabled: false,
                    playerID: playerID,
                  },
                  {
                    type: "Text",
                    name: "Text_ShoulderSwap",
                    position: [0, 150],
                    size: [200, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    textLabel: "SHOULDER SWAP:",
                    textColor: [1, 1, 1],
                    textAlpha: 1,
                    textSize: 16,
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
                    name: "Text_ShowHideUI",
                    position: [0, 200],
                    size: [200, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    textLabel: "SHOW / HIDE UI:",
                    textColor: [1, 1, 1],
                    textAlpha: 1,
                    textSize: 16,
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
                    name: "Container_ShoulderSwapInstruction",
                    position: [200, 150],
                    size: [200, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    textLabel: "",
                    textColor: [1, 1, 1],
                    textAlpha: 1,
                    textSize: 24,
                    textAnchor: mod.UIAnchor.Center,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 0.3,
                    bgFill: mod.UIBgFill.GradientBottom,
                    imageType: mod.UIImageType.None,
                    imageColor: [1, 1, 1],
                    imageAlpha: 1,
                    buttonEnabled: false,
                    children: [
                      {
                        type: "Text",
                        name: "Text_ShoulderSwapInstruction",
                        position: [0, 0],
                        size: [200, 50],
                        anchor: mod.UIAnchor.TopLeft,
                        visible: true,
                        textLabel: "ADS FAST 2x Fast",
                        textColor: [0.4392, 0.9216, 1],
                        textAlpha: 1,
                        textSize: 16,
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
                    name: "Container_ADSMelee",
                    position: [200, 200],
                    size: [200, 50],
                    anchor: mod.UIAnchor.TopLeft,
                    visible: true,
                    textLabel: "",
                    textColor: [1, 1, 1],
                    textAlpha: 1,
                    textSize: 24,
                    textAnchor: mod.UIAnchor.Center,
                    padding: 0,
                    bgColor: [0.2, 0.2, 0.2],
                    bgAlpha: 0.3,
                    bgFill: mod.UIBgFill.GradientBottom,
                    imageType: mod.UIImageType.None,
                    imageColor: [1, 1, 1],
                    imageAlpha: 1,
                    buttonEnabled: false,
                    children: [
                      {
                        type: "Text",
                        name: "Text_ADSMelee",
                        position: [0, 0],
                        size: [200, 50],
                        anchor: mod.UIAnchor.Center,
                        visible: true,
                        textLabel: "ADS + MELEE",
                        textColor: [0.4392, 0.9216, 1],
                        textAlpha: 1,
                        textSize: 16,
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

            // Find the UI widgets using the unique names
            this.locationText = mod.FindUIWidgetWithName("Text_Origin");
            this.rotationText = mod.FindUIWidgetWithName("Text_Rotation");
            this.velocityText = mod.FindUIWidgetWithName("Text_Velocity");
        }

        update(): void
        {
          if (!this.locationText || !this.rotationText || !this.velocityText || !this.OriginWidget)
          {
            console.log("PlayerOriginWidget: UI widgets not found");
            return;
          }

          if (!mod.GetSoldierState(this.player, mod.SoldierStateBool.IsAlive))
          {
            //  mod.SetUIWidgetVisible(this.OriginWidget, false);
            return;
          }   

          let origin = mod.GetSoldierState(this.player, mod.SoldierStateVector.GetPosition);
          let velocity = mod.GetSoldierState(this.player, mod.SoldierStateNumber.Speed);
          let rotation = mod.GetObjectRotation(this.player);
          let ox = mod.XComponentOf(origin);
          let oy = mod.YComponentOf(origin);
          let oz = mod.ZComponentOf(origin);
          let rx = mod.XComponentOf(rotation);
          let ry = mod.YComponentOf(rotation);
          let rz = mod.ZComponentOf(rotation);

          mod.SetUITextLabel(this.locationText, mod.Message("Location: {}, {}, {}", Number(ox.toFixed(2)), Number(oy.toFixed(2)), Number(oz.toFixed(2))));
          mod.SetUITextLabel(this.rotationText, mod.Message("Rotation: {}, {}, {}", Number(rx.toFixed(2)), Number(ry.toFixed(2)), Number(rz.toFixed(2))));
          mod.SetUITextLabel(this.velocityText, mod.Message("Velocity: {}", Number(velocity.toFixed(2))));

          mod.SetUIWidgetVisible(this.OriginWidget, true);
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