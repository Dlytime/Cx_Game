	
export interface ConfigContainerClass<T extends BaseConfigContainer>
{
    new (callback: Function, caller: any, arg: any): T;
}
 
export abstract class BaseConfigContainer 
{
    public abstract configName:string;
    public abstract isStorage:Boolean;
    protected mTag: any;
    constructor(callback: Function, caller: any, arg: any) {
        this._loadConfig(()=>{
            callback.bind(caller,...arg);
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

    public abstract _loadConfig(cb:Function):void;
}