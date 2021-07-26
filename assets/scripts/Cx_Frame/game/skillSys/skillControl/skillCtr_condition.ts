import skillControlBase from "./skillControlBase";
import skillControlMgr from "./skillControlMgr";

/**
 * 技能流程：条件控制
 */
export default class skillCtr_condition extends skillControlBase {
    protected ctrType: string = "condition";
    public async startCtr():Promise<boolean>
    {
        let result = this.doCondition();
        //this.ctrEnd(result);
        return new Promise(async (resolve)=>{
            resolve(result);
        })
    }
    public endCtr() {
        
    }

    protected doCondition():boolean {
        return true;
    }
}
