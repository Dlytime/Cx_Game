import { DataManager } from "../baseMgr/DataManager";
import { BaseConfigContainer, ConfigContainerClass } from "../DataConfig/Storage/BaseConfigContainer";
import { PlayerInfo, PlayerInfoConfigContainer } from "../DataConfig/Storage/PlayerConfig";

class DataMgrs extends DataManager
{
    public loadAllConfig(callback?: Function): void {
        this.loadConfig(PlayerInfoConfigContainer,()=>{
            if(callback) callback();
        });
    }
}

export const cx_DataMgr = new DataMgrs()
