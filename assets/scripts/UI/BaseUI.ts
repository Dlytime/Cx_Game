import { UIManager } from "../frame/baseMgr/UIManager";
import { UIAnimType, UIFormType, UILoadType } from "../frame/config/UIDefine";

export interface UIClass<T extends BaseUI>
{
    new(): T;
    getClassName():string;
    getUILoadType():UILoadType;
    getUrl():string;
    getBundleName():string;
    getUIFormType():UIFormType;
    getUIAnimType():{open:UIAnimType,close:UIAnimType};
}
const {ccclass, property} = cc._decorator;
@ccclass
export abstract class BaseUI extends cc.Component
{
    protected static className:string = "BaseUI";
    protected static UILoadType:UILoadType = UILoadType.none;
    protected static bundleName:string = "";
    protected static Url:string = "";//加载路径
    protected static UIFormType:UIFormType = null;
    protected static UIAnimType:{open:UIAnimType,close:UIAnimType} = null;

    protected _uiClass: UIClass<BaseUI> = null;
    public get uiClass(): UIClass<BaseUI>
	{
		return this._uiClass;
	}
	public set uiClass(value: UIClass<BaseUI>)
	{
		this._uiClass = value;
    }
    public static getClassName(): string {
        return this.className;
    }
    public static getUrl(): string {
        return this.Url;
    }
    public static getUILoadType(): UILoadType {
        return this.UILoadType;
    }
    public static getBundleName(): string {
        return this.bundleName;
    }
    
    public static getUIFormType(): UIFormType {
        return this.UIFormType;
    }
    public static getUIAnimType(): {open:UIAnimType,close:UIAnimType} {
        return this.UIAnimType;
    }
    public abstract getAnimRoot(): cc.Node;
    public abstract receiveUIEmit(eventName:string,info:any);
    public abstract init(baseInfo:any);

    hideUI() {
        UIManager.getInstance().hideUI(this.uiClass);
    }
    closeUI() {
        UIManager.getInstance().closeUI(this.uiClass);
    }
    destroyUI() {
        UIManager.getInstance().destroyUI(this.uiClass);
    }
    onDestroy(): void{
        cc.log(this.uiClass?this.uiClass.getClassName():"", " onDestroy");
    }
 
    onShow():void{
        cc.log(this.uiClass?this.uiClass.getClassName():"" , " onShow");
    }
    onHide():void{
        cc.log(this.uiClass?this.uiClass.getClassName():"" , " onHide");
    }
    onClose():void{
        cc.log(this.uiClass?this.uiClass.getClassName():"" , " onClose");
    }

}