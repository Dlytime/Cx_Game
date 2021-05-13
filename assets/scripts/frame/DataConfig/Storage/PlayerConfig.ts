import { ccTools } from "../../tools/ccTools";
import { cx_CacheData } from "../Game/Data";
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
}
 
export class PlayerInfoConfigContainer extends BaseConfigContainer {
    public configName: string = "playerInfo";
    public isStorage: Boolean = true;
    public configData: PlayerInfo = null;

    public _loadConfig(cb:Function): void {
        let configData = cc.sys.localStorage.getItem('PlayerInfo');
        if(configData) {
            configData = JSON.parse(configData);
            configData = this._versionCheck(configData);
            this.configData = configData;
            cb(this);
        } else {
            //首次登陆，新玩家get
            cx_CacheData.isFirstJoinGame = true;
            cx_CacheData.isDayFirstJoinGame = true;
            let path = "config/PlayerConfig";
            ccTools.loadLocalJson(path,(localConfig)=>{
                this.configData = localConfig;
                cb(this);
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