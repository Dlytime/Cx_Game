import skillControlBase from "./skillControlBase";

/**
 * 技能流程：时间模块
 * 1、延迟时间
 */
export default class skillCtrl_timer extends skillControlBase {
 
    protected ctrType: string = "timer";
    public loadData(data: any) {
        
    }
    public startCtr() {
        throw new Error("Method not implemented.");
    }
    public endCtr() {
        throw new Error("Method not implemented.");
    }

}
