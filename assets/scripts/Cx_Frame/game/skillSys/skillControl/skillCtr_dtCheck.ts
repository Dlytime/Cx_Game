import { cx_TimeMgr } from "../../../frame/gameMgr/TimeMgr";
import skillControlBase from "./skillControlBase";
import skillControlMgr from "./skillControlMgr";

/**
 * 技能流程：帧检测模块
 */
export default class skillCtrl_dtCheck extends skillControlBase {
    protected ctrData: any = null;
    protected ctrType: string = "dtCheck";
    private dtCbId:number = null;
    private _isAllowCheck:boolean = false;
    public loadData(info: any) {
        throw new Error("Method not implemented.");
    }
    public startCtr()
    {
        this.dtCbId = cx_TimeMgr.registDtCb(this.update);
        let result = true;
        this._startCheck();
    }
    private _startCheck() {
        this._isAllowCheck = true;
    }
    private _doDtCheck(dt) {
        setTimeout(() => {
            this._endCheck();
            this.emitMgr(true,null);
        }, 1);
    }
    private _endCheck() {
        this._isAllowCheck = false;
    }
    public endCtr() {
        cx_TimeMgr.offRegistDtCb(this.dtCbId);
    }
    update(dt) {
        if(this._isAllowCheck) this._doDtCheck(dt);
    }
}
