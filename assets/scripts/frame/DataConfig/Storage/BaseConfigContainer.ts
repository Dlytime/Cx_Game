	
export interface ConfigContainerClass<T extends BaseConfigContainer>
{
    new (callback: Function, caller: any, arg: any): T;
}
 
export abstract class BaseConfigContainer 
{
    public abstract configName:string;
    public abstract isStorage:Boolean;
    public abstract configData = null;
    protected mTag: any;
    constructor(callback: Function, caller: any, arg: any = []) {
        this._loadConfig((configData:any)=>{
            console.log(this.configName + " config load end");
            callback.bind(caller,configData,...arg)();
        });
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