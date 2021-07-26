import { SkillCtrlEvent } from "../skillConfig/SkillEvent";
import skillControlBase from "./skillControlBase";
interface ctrl_trigger_data{
    event:SkillCtrlEvent
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
        this.actorNode.emit(this.ctrData.event);
        this.emitMgr(true);
    }
    public endCtr() {
        throw new Error("Method not implemented.");
    }

}
