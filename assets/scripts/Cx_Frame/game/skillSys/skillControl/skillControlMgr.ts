import skillActorMgrBase from "../skillActor/skillActorMgrBase";
import { SkillCtrlEvent } from "../skillConfig/SkillEvent";
import skillControlBase from "./skillControlBase";

/* export interface skillCtrEvent<T extends skillControlBase> {
    ctrl:T;
    result:boolean;
} */
/**
 * 技能流程控制管理类
 */
export default class skillControlMgr {
    private actorMgr:skillActorMgrBase = null;
    private actorNode:cc.Node = null;
    private curSt:number = 0;
    private controls:Array<skillControlBase> = [];
    init(actorMgr:skillActorMgrBase) {
        this.actorMgr = actorMgr;
        this.actorNode = this.actorMgr.node;
    }
    doControls(controls: Array<any>,cb?:(result:boolean)=>{}) {
        
    }
    private async _doControls() {
/*         for (let i = 0; i < controls.length; i++) {
            const control = controls[i];
            let result = await control.startCtr();
            if(!result) return this.stopControls();
            else control.endCtr();
        } */
        this.controls[this.curSt].startCtr();
    }
    createCtrol<T extends skillControlBase>(data: any):T {
        return;
    }
    stopControls() {

    }
    pauseControls() {

    }
    completeCtrol() {

    }
    /**接收ctrl组件事件反馈 */
    emit(result:boolean,ctr:skillControlBase,info?:any) {
        ctr.endCtr();
        if(result) 
        {
            this.curSt++;
            if(this.curSt >=  this.controls.length) this.completeCtrol();
            else this._doControls();
        } 
        else 
        {
            this.stopControls();
        }
    }
}
