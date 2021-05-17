import { UIFormType, UIAnimType, UILoadType } from "../frame/baseMgr/config/UIDefine";
import { cx_Define } from "../frame/DataConfig/Game/Define";
import { cx_EventMgr } from "../frame/gameMgr/EventMgr";
import { BaseUI } from "./BaseUI";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainUI extends BaseUI {
    protected static className: string = "MainUI";
    protected static UILoadType:UILoadType = UILoadType.bundle;
    protected static bundleName:string = "gameRes";
    protected static Url: string = "MainUI";
    protected static UIFormType: UIFormType = UIFormType.Game;
    protected static UIAnimType: {open:UIAnimType,close:UIAnimType} = null;

    public init(baseInfo:any){
        return; 
    }
    startGame() {
        cx_EventMgr.dispatchEvent(cx_Define.EVENT.START_LEVEL);
        this.closeUI();
    }
    onLoad() {

    }
}
