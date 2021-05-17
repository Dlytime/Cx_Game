// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { UIFormType, UIAnimType, UILoadType } from "../frame/baseMgr/config/UIDefine";
import { cx_Define } from "../frame/DataConfig/Game/Define";
import { PlayerInfoConfigContainer } from "../frame/DataConfig/Storage/PlayerConfig";
import { cx_DataMgr } from "../frame/gameMgr/DataMgr";
import { cx_EventMgr } from "../frame/gameMgr/EventMgr";
import { cx_LoaderMgr } from "../frame/gameMgr/LoaderMgr";
import { cx_UIMgr } from "../frame/gameMgr/UIMgr";
import { BaseUI } from "./BaseUI";
import TestBaseUI from "./TestBaseUI";

const {ccclass, property} = cc._decorator;
@ccclass
export default class DlgLoading extends BaseUI {
    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar = null;
    @property(cc.Label)
    loadHintLbl:cc.Label = null;

    protected static className: string = "DlgLoading";
    protected static UILoadType:UILoadType = UILoadType.resource;
    protected static Url: string = "prefab/DlgLoading";
    protected static UIFormType:UIFormType = UIFormType.PopUp;

    timeCallback: (dt: any) => void;
    private completeCb:Function = null;
    public init(baseInfo:any){
        this.loadAllRes();
        this.startTimeLoad();
        return ;
    }
    setCompleteCb(cb:Function,caller:any) {
        this.completeCb = cb;
        this.completeCb.bind(caller);
    }
    loadAllRes() {
        let self = this;
        cx_DataMgr.loadAllConfig(()=>{
            console.log("本地数据加载完毕");
            let data = cx_DataMgr.getConfig(PlayerInfoConfigContainer);
            console.log(data);
            cx_EventMgr.dispatchEvent(cx_Define.EVENT.GAME_DATALOAD_END);
        });
        cx_LoaderMgr.loadInitRes();
    }
    private startTimeLoad() {
        console.log("all res count "+ cx_LoaderMgr.getRemainResCount());
        let self = this;
        let time = 0;
        let gres = 0;
        this.timeCallback = function (dt) {
            time += dt;
            cc.log("time: " + time);
            if(this.getIsLoadEnd()) {
                self.progressBar.progress = 1;
                self.completeCb();
                self.unschedule(self.timeCallback);
            } else {
                gres++;
                self.progressBar.progress = gres/100;
                this.reflusLoadingHint();
            }
        }
        this.schedule(this.timeCallback, 0.02);
    }
    private getIsLoadEnd() {
        return cx_LoaderMgr.getRemainResCount() === 0;
    }
    private reflusLoadingHint() {
        let allcount = cx_LoaderMgr.getAllLoadResCount();
        if(allcount === 0 ) this.loadHintLbl.string = "资源包下载中，首次加载可能会消耗较多时间，请耐心等候~";
        else {
            this.loadHintLbl.string = "资源加载中 "+ (allcount - cx_LoaderMgr.getRemainResCount()) + "/" + allcount;
        }
    }

}
