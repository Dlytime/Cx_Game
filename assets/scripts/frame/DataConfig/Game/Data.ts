/* export class Data {
    public static PlayerInfo = 
    {
        version: "1.0.0",
        lastLoginTime: null,
        gold: 0,
        power: 0,
        volume: 1,
        bgmEnable: true,
        effectEnable: true,
        shakeEnable: true,
    }

    public static GameData = 
    {
        isPatch: false,
        isFirstJoinGame: false,
        isDayFirstJoinGame: false,
        gameRounds: 0,
        curGameStatus: 0,
    }
} */
export class GameData {
    public static readonly version:string = "1.0.0";
    public static isPatch = false;
    public static isFirstJoinGame = false;
    public static isDayFirstJoinGame = false;
    public static gameRounds:number = 0;
    public static curGameStatus:string = null;
}