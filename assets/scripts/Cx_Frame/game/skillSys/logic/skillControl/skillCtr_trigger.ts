import { SkillCtrlEvent } from "../skillConfig/SkillEvent";
import skillControlBase from "./skillControlBase";
interface ctrl_trigger_data{
    event:SkillCtrlEvent,
    dt?:number,
}
/**
 * 技能流程：触发器模块
 */
export default class skillCtrl_trigger extends skillControlBase {
    protected ctrData: ctrl_trigger_data = null;
    protected ctrType: string = "trigger";
    public loadData(data: ctrl_trigger_data) {
        this.ctrData = data;
    }
    public startCtr() {
        let dt = this.ctrData.dt;
        if(dt && dt > 0) {
            setTimeout(()=>{
                this._doTrigger();
            },dt * 1000);
        } else this._doTrigger();
    }
    private _doTrigger() {
        this.mManager.emitActorNode(this.ctrData.event);
        this.emitMgr(true);
    }
    public endCtr() {
        
    }

}
