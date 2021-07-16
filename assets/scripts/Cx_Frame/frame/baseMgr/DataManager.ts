import { BaseConfigContainer, ConfigContainerClass } from "../DataConfig/Storage/BaseConfigContainer";
import { PlayerInfo, PlayerInfoConfigContainer } from "../DataConfig/Storage/PlayerConfig";

export abstract class DataManager
{
    private configContainerList:Array<any> = [];
    private curLoadedCount: number = 0;
    private _preStorage:boolean = false;
 
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
    public getConfigData<T extends BaseConfigContainer>(configClass: ConfigContainerClass<T>,key?:string): BaseConfigContainer
    {
        let config = this.getConfig(configClass);
        if(!config) return null;
        return key?config.configData[key]:config.configData;
    }
    public loadConfig<T extends BaseConfigContainer>(configClass: ConfigContainerClass<T>, completeCb: (configData:any)=>void,allCompleteCb:Function, arg?: any)
    {
        let self = this;
        let config = new configClass((configData:any)=>{
            this.callback(allCompleteCb);
            completeCb(configData);

            let at = this.getConfigData(PlayerInfoConfigContainer);
        }, this, arg);
        config.tag = configClass;
        this.configContainerList.push(config);
    }
    public setConfig<T extends BaseConfigContainer>(configClass: ConfigContainerClass<T>,key:string,value:any)
    {
        let config = this.getConfigData(configClass);
        if(config.hasOwnProperty(key)) {
            config[key] = value;
            if(configClass.isStorage()) {
                this.storageConfig(configClass);
            }
        }
    }
    protected storageConfig<T extends BaseConfigContainer>(configClass: ConfigContainerClass<T>) {
        if(this._preStorage) return;
        let self = this;
        this._preStorage = true;
        cc.log(configClass.getConfigName() + " prepare to storage");
        setTimeout(() => {
            self.storage(configClass);
            self._preStorage = false;
        }, 0.1);
    }
    private storage<T extends BaseConfigContainer>(configClass: ConfigContainerClass<T>) {
        let configName = configClass.getConfigName();
        	
        let data = this.getConfigData(configClass);
        cc.sys.localStorage.setItem(configName, JSON.stringify(data));

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