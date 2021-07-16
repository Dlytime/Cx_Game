	
export interface ConfigContainerClass<T extends BaseConfigContainer>
{
    getConfigName:()=>string;
    isStorage:()=>Boolean;
    new (callback: Function, caller: any, arg: any): T;
}

export abstract class BaseConfigContainer 
{
    public abstract configData = null;
    protected mTag: any;
    constructor(callback: Function, caller: any, arg: any = []) {
        let self = this;
        setTimeout(()=>{
            self._loadConfig((configData:any)=>{
                //console.log(this.configName + " config load end");
                callback.bind(caller,configData,...arg)();
            });
        })

    }
    public get tag(): any
    {
        return this.mTag;
    }
    public set tag(value: any)
    {
        this.mTag = value;
    }
    public getConfigData() {
        return this.configData;
    }
    public abstract _loadConfig(cb:(configData:any)=>void):void;
}