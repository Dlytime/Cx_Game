import { cx_ccTools } from "../../tools/ccTools";
import { cx_CacheData } from "../Game/Data";
import { TYPE_LEVEL } from "../Game/Define";
import { BaseConfigContainer } from "./BaseConfigContainer";
 
export class PlayerInfo
{
    version: string;
    lastLoginTime: Date;
    gold: number;
    power: number;
    volume: number;
    bgmEnable: Boolean;
    effectEnable: Boolean;
    shakeEnable: Boolean;
    curLevel: number;
    levelType: TYPE_LEVEL;
    maxLevel: number;
}
 
export class PlayerInfoConfigContainer extends BaseConfigContainer {
    public configName: string = "playerInfo";
    public isStorage: Boolean = true;
    public configData: PlayerInfo = null;

    public _loadConfig(cb:(configData:PlayerInfo)=>void): void {
        let configData = cc.sys.localStorage.getItem('PlayerInfo');
        if(configData) {
            configData = JSON.parse(configData);
            configData = this._versionCheck(configData);
            this.configData = configData;
            cb(configData);
        } else {
            //首次登陆，新玩家get
            cx_CacheData.isFirstJoinGame = true;
            cx_CacheData.isDayFirstJoinGame = true;
            let path = "config/PlayerConfig";
            cx_ccTools.loadLocalJson(path,(localConfig)=>{
                this.configData = localConfig;
                cb(localConfig);
            },this);
        }
    }
    private _versionCheck(data:PlayerInfo) {
        if(data.version == cx_CacheData.version) return data;
        else {
            //数据版本不一致，检查更新 (待)
            return data;
        }
    }
}