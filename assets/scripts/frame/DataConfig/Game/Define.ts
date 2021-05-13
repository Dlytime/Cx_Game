export enum TYPE_RES_TYPE {
    none = "none",
    prefab = "prefab",
    sfs = "sfs",
    json = "json",
    plist = "plist",
    anim = "anim",
    audio = "audio",
    dragonBones = "dragonBones"
}
export enum TYPE_RES_LOAD_TIME {
    loading = "loading",
    Time1 = "time1",
    Time2 = "time2"
}
export enum TYPE_RES_LOCAL {
    remote = "remote",
    bundle = "bundle",
    resource = "resource"
}
export class cx_Define {
    //事件定义
    public static readonly EVENT = 
    {
        GAME_INIT_START:"game_init_start",
        GAME_INIT_END:"game_init_end",

        GAME_DATALOAD_END : "Game_DataLoad_end",
        GAME_LOADING_START : "Game_Loading_start",
        GAME_LOADING_END : "Game_Loading_end",
        
        RESLOAD_END : "ResLoad_end",
        
        LEVEL_INIT : "level_init",
        LEVEL_START : "level_start",
        LEVEL_END : "level_end",
        LEVEL_WIN : "level_win",
        LEVEL_LOSE : "level_lose",
        LEVEL_BREAK : "level_break",
        GOLD_REFLUS : "gold_reflus",
        POWER_REFLUS : "power_reflus",
        DIAMOND_REFLUS : "diamond _reflus",
    };

    //类型定义
    public static readonly TYPE = 
    {
        GAME_RESULT : cc.Enum({
            Win:"win",
            Lose:"lose",
            Break:"break"
        }),
        GAME_STATUS : cc.Enum({
            None:"none",
            Init:"init",
            Gaming:"gaming",
            Pause:"pause",
            GameEnd:"gameEnd"
        }),
        RES_TYPE :cc.Enum({
            none : "none",
            prefab : "prefab",
            sfs : "sfs",
            json : "json",
            plist : "plist",
            anim : "anim",
            audio : "audio",
            dragonBones : "dragonBones"
        }),

    }

    //常量定义
    public static readonly CONST = 
    {
        RES_TYPE_ARR : [TYPE_RES_TYPE.sfs,TYPE_RES_TYPE.json,TYPE_RES_TYPE.prefab,TYPE_RES_TYPE.plist,TYPE_RES_TYPE.anim,TYPE_RES_TYPE.audio,TYPE_RES_TYPE.dragonBones],
        RES_TYPE_ASSET : {
            prefab:cc.Prefab,
            sfs:cc.SpriteFrame,
            json:cc.JsonAsset,
            /* plist:cc.At, */
            anim:cc.Animation,
            audio:cc.AudioClip,
            /* dragonBones: */
        }
    }

    public static readonly CUSTOM = 
    {

    }
    public static getResType(resType:TYPE_RES_TYPE):any
    {
        return this.CONST.RES_TYPE_ASSET[resType];
    }

}