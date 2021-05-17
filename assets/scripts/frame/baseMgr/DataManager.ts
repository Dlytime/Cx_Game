import { BaseConfigContainer, ConfigContainerClass } from "../DataConfig/Storage/BaseConfigContainer";
import { PlayerInfo, PlayerInfoConfigContainer } from "../DataConfig/Storage/PlayerConfig";

export abstract class DataManager
{
    private configContainerList:Array<any> = [];
    private curLoadedCount: number = 0;

 
    public abstract  loadAllConfig(callback?: Function): void /* {
        this.loadConfig(PlayerInfoConfigContainer, this.callback, callback);
    } */
    public getConfig<T extends BaseConfigContainer>(configClass: ConfigContainerClass<T>): BaseConfigContainer
    {
        for(let i = 0; i < this.configContainerList.length; ++i)
        {
            if(this.configContainerList[i].tag == configClass)
            {
                return this.configContainerList[i];
            }
        }
        return null;
    }
    public getConfigData<T extends BaseConfigContainer>(configClass: ConfigContainerClass<T>,key:string): BaseConfigContainer
    {
        let config = this.getConfig(configClass);
        return config?config.configData[key]:null;
    }
    public loadConfig<T extends BaseConfigContainer>(configClass: ConfigContainerClass<T>, completeCb: (configData:any)=>void,allCompleteCb:Function, arg?: any)
    {
        let config = new configClass((configData:any)=>{
            this.callback(allCompleteCb);
            completeCb(configData);
        }, this, arg);
        config.tag = configClass;
        this.configContainerList.push(config);
    }
    public setConfig<T extends BaseConfigContainer>(configClass: ConfigContainerClass<T>,key:string,value:any)
    {
        let config = this.getConfig(configClass);
        if(config.hasOwnProperty(key)) {
            config[key] = value;
            if(config.isStorage) {
                cc.log(config.configName + " prepare to storage");
            }
        }
    }
    protected storageConfig<T extends BaseConfigContainer>(configClass: ConfigContainerClass<T>) {
        
    }
    private callback(callback: Function)
    {
        this.curLoadedCount += 1;
        if(this.configContainerList.length == this.curLoadedCount)
        {
            if(callback)
            {
                callback();
            }
        }
    }
}