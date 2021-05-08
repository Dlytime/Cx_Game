import { ccTools } from "../../tools/ccTools";
import { GameData } from "../Game/Data";
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
    private configData: PlayerInfo = null;
 
/*     constructor(callback: Function, caller: any, arg: any)
    {
        super(callback,caller,arg);
    } */
    public _loadConfig(cb:Function): void {
        let configData = cc.sys.localStorage.getItem('PlayerInfo');
        if(configData) {
            configData = JSON.parse(configData);
            configData = this._versionCheck(configData);
            this.configData = configData;
            cb(this);
        } else {
            //首次登陆，新玩家get
            GameData.isFirstJoinGame = true;
            GameData.isDayFirstJoinGame = true;
            let path = "config/PlayerConfig";
            ccTools.loadLocalJson(path,(localConfig)=>{
                this.configData = JSON.parse(localConfig);
                cb(this);
            },this);
        }
    }
    getConfigData(): PlayerInfo
    {
        return this.configData;
    }
    private _versionCheck(data:PlayerInfo) {
        if(data.version == GameData.version) return data;
        else {
            //数据版本不一致，检查更新 
            return data;
        }
    }
}