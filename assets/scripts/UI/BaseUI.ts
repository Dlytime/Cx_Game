import { UIManager } from "../frame/baseMgr/UIManager";
import { UIAnimType, UIFormType, UILoadType } from "../frame/baseMgr/config/UIDefine";
import { cx_UIMgr } from "../frame/gameMgr/UIMgr";

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
    protected static className:string = "BaseUI";//注意类名和预制体名保持一致
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
    public  getAnimRoot(): cc.Node {
        return null;
    }
    protected receiveUIEmit(eventName:string,info:any) {

    }

    /**onShow在init之后 */
    public abstract init(baseInfo:any);

    hideUI() {
        cx_UIMgr.hideUI(this.uiClass);
    }
    closeUI() {
        cx_UIMgr.closeUI(this.uiClass);
    }
    destroyUI() {
        cx_UIMgr.destroyUI(this.uiClass);
    }
    onDestroy(): void{
        cc.log(this.uiClass?this.uiClass.getClassName():"", " onDestroy");
    }
    /**onShow在init之后 */
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