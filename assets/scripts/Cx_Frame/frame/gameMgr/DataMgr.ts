import { DataManager } from "../baseMgr/DataManager";
import { cx_CacheData } from "../DataConfig/Game/Data";
import { BaseConfigContainer, ConfigContainerClass } from "../DataConfig/Storage/BaseConfigContainer";
import { PlayerInfo, PlayerInfoConfigContainer } from "../DataConfig/Storage/PlayerConfig";

class DataMgrs extends DataManager
{

    private PlayerConfigData:PlayerInfo = null;
    public loadAllConfig(callback?: Function): void {
        let self = this;
        this.loadConfig(PlayerInfoConfigContainer,(playerConfig:PlayerInfo)=>{
            self.PlayerConfigData = playerConfig;
        },callback);
    }

    getCurLevel():number { 
        return this.PlayerConfigData.curLevel;
    }
    getMaxLevel() {
        return this.PlayerConfigData.maxLevel;
    }
    goNextLevel() {
        let maxLevel = cx_CacheData.maxLevel;
        let curLevel = this.getCurLevel();
        if(curLevel < maxLevel) curLevel++;
        else curLevel = 1;
        this.setConfig(PlayerInfoConfigContainer,"curLevel",curLevel);
    }
}

export const cx_DataMgr = new DataMgrs()
