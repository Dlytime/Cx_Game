import { DataManager } from "../baseMgr/DataManager";
import { BaseConfigContainer, ConfigContainerClass } from "../DataConfig/Storage/BaseConfigContainer";
import { PlayerInfo, PlayerInfoConfigContainer } from "../DataConfig/Storage/PlayerConfig";

export class DataMgr extends DataManager
{
    public loadAllConfig(callback?: Function): void {
        this.loadConfig(PlayerInfoConfigContainer,()=>{});
    }

}