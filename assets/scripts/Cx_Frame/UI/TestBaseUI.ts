import { UIFormType, UIAnimType, UILoadType } from "../frame/baseMgr/config/UIDefine";
import { BaseUI } from "./BaseUI";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TestBaseUI extends BaseUI {

    protected static className: string = "TestBaseUI";
    protected static UILoadType:UILoadType = UILoadType.bundle;
    protected static bundleName:string = "gameRes";
    protected static Url: string = "TestBaseUI";
    protected static UIFormType: UIFormType = UIFormType.PopUp;
    protected static UIAnimType: {open:UIAnimType,close:UIAnimType} = {open:UIAnimType.scale,close:UIAnimType.scale};
    public getAnimRoot(): cc.Node {
        return this.node.getChildByName("frame");
    }
    public receiveUIEmit(eventName: string, info: any) {
    
    }
    public init(baseInfo:any){
        return 
    }
    onLoad() {

    }
}
