// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { UIFormType, UIAnimType, UILoadType } from "../frame/baseMgr/config/UIDefine";
import { cx_Define } from "../frame/DataConfig/Game/Define";
import { EventMgr } from "../frame/gameMgr/EventMgr";
import { cx_UIMgr } from "../frame/gameMgr/UIMgr";
import { BaseUI } from "./BaseUI";
import TestBaseUI from "./TestBaseUI";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DlgLoading extends BaseUI {
    protected static className: string = "DlgLoading";
    protected static UILoadType:UILoadType = UILoadType.resource;
    protected static bundleName:string = "gameRes";
    protected static Url: string = "DlgLoading";
    protected static UIFormType: UIFormType = UIFormType.PopUp;
    protected static UIAnimType: {open:UIAnimType,close:UIAnimType} = null;
    timeCallback: (dt: any) => void;
    public getAnimRoot(): cc.Node {
        return this.node.getChildByName("frame");
    }
    public receiveUIEmit(eventName: string, info: any) {
    
    }
    private isLoadEnd = false;
    public init(baseInfo:any){
        EventMgr.addEventListener(cx_Define.EVENT.RESLOAD_END,"loading",()=>{
            this.isLoadEnd = true;
        },this)
        return ;
    }
    onShow() {
        let self = this;
        this.timeCallback = function (dt) {
            cc.log("time: " + dt);
            if(self.isLoadEnd) {
                self.closeUI();
                self.unschedule(self.timeCallback)
            }
        }
        this.schedule(this.timeCallback, 0.1);
    }
    onLoad() {
     
    }
}
