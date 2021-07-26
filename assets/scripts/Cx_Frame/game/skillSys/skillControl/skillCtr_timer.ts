import skillControlBase from "./skillControlBase";

interface ctrl_time_data {
    delay:number
}
/**
 * 技能流程：时间模块
 * 1、延迟时间
 */
export default class skillCtrl_timer extends skillControlBase {
    protected ctrType: string = "timer";
    protected ctrData:ctrl_time_data = null;
    public loadData(data: ctrl_time_data) {
        this.ctrData = data;
    }
    public startCtr() {
        if(!this.ctrData) return console.error("skillCtrl_timer canot find ctrData")
        setTimeout(() => {
            this.emitMgr(true);
        }, this.ctrData.delay * 1000);
    }
    public endCtr() {
        
    }

}
