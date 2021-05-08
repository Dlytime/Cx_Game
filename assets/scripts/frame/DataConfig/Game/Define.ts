export enum RES_TYPE {
    prefab = "prefab",
    sfs = "sfs",
    json = "json",
    plist = "plist",
    anim = "anim",
    audio = "audio",
    dragonBones = "dragonBones"
}
export class Define {
    //事件定义
    public static readonly EVENT_GAME_DATALOAD_END = "Game_DataLoad_end";
    public static readonly EVENT_GAME_LOADING_START = "Game_Loading_start";
    public static readonly EVENT_GAME_LOADING_END = "Game_Loading_end";
    public static readonly EVENT_GAME_INIT = "game_init";
    public static readonly EVENT_GAME_START = "game_start";
    public static readonly EVENT_GAME_END = "game_end";
    public static readonly EVENT_GAME_WIN = "game_win";
    public static readonly EVENT_GAME_LOSE = "game_lose";
    public static readonly EVENT_GAME_BREAK = "game_break";
    public static readonly EVENT_GOLD_REFLUS = "gold_reflus";
    public static readonly EVENT_POWER_REFLUS = "power_reflus";
    public static readonly EVENT_DIAMOND_REFLUS = "diamond _reflus";

    //常量定义
    public static readonly CONST_GAME_RESULT = cc.Enum({
        Win:"win",
        Lose:"lose",
        Break:"break"
    });
    public static readonly CONST_GAME_STATUS = cc.Enum({
        None:"none",
        Init:"init",
        Gaming:"gaming",
        Pause:"pause",
        GameEnd:"gameEnd"
    });
    public static readonly CONST_RES_TYPE = {
        prefab:cc.Prefab,
        sfs:cc.SpriteFrame,
        json:cc.JsonAsset,
        /* plist:cc.At, */
        anim:cc.Animation,
        audio:cc.AudioClip,
        /* dragonBones: */
    }
    public static getResType(resType:RES_TYPE):any
    {
        return this.CONST_RES_TYPE[resType];
    }

}