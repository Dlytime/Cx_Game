import { TYPE_GAME_RESULT } from "./Define";


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
export class cx_CacheData {
    //常量
    public static readonly version:string = "1.0.0";
    //读取数据时配置
    public static isPatch = false;
    public static isFirstJoinGame = false;
    public static isDayFirstJoinGame = false;
    public static maxLevel = 30;
    //游戏中配置

    /**当前游戏局数 */
    public static gameRounds:number = 0;
    /**上一轮游戏结果 */
    public static gameResult:TYPE_GAME_RESULT = null;
    /**当前游戏状态 */
    public static curGameStatus:string = null;

    public static cacheRes:{sfs:{},prefab:{},audio:{},json:{},anim:{}} = 
    {
        sfs:{},prefab:{},audio:{},json:{},anim:{}
    };
}