// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { UIFormType, UIAnimType, UILoadType } from "../frame/baseMgr/config/UIDefine";
import { cx_Define } from "../frame/DataConfig/Game/Define";
import { EventMgr } from "../frame/gameMgr/EventMgr";
import { cx_LoaderMgr } from "../frame/gameMgr/LoaderMgr";
import { cx_UIMgr } from "../frame/gameMgr/UIMgr";
import { BaseUI } from "./BaseUI";
import TestBaseUI from "./TestBaseUI";

const {ccclass, property} = cc._decorator;
@ccclass
export default class DlgLoading extends BaseUI {
    @property(cc.ProgressBar)
    progress: cc.ProgressBar = null;

    protected static className: string = "DlgLoading";
    protected static UILoadType:UILoadType = UILoadType.resource;
    protected static Url: string = "prefab/DlgLoading";
    protected static UIFormType:UIFormType = UIFormType.PopUp;
    timeCallback: (dt: any) => void;
    private isLoadEnd = false;
    public init(baseInfo:any){
        return ;
    }
    onShow() {
        console.log("all res count "+ cx_LoaderMgr.getRemainResCount());
        let self = this;
        let time = 0;
        this.timeCallback = function (dt) {
            time += dt;
            cc.log("time: " + time);
            if(this.getIsLoadEnd()) {
                self.closeUI();
                self.unschedule(self.timeCallback)
            }
        }
        this.schedule(this.timeCallback, 0.02);
    }
    getIsLoadEnd() {
        return cx_LoaderMgr.getRemainResCount() === 0;
    }
    onLoad() {
     
    }
}
