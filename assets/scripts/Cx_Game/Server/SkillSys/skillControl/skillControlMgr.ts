import ActorBase from "../../ActorSys/ActorBase";
import { SkillActorEvent, SkillCtrlEvent } from "../skillConfig/SkillEvent";
import skillControlBase from "./skillControlBase";
import skillCtrl_timer from "./skillCtr_timer";
import skillCtrl_trigger from "./skillCtr_trigger";

enum ctrlModle {
    timer = "timer",
    trigger = "trigger",
    dtCheck = "dtCheck",
}
interface controlCg {
    ctrlName:ctrlModle;
    data:any;
}
/**
 * 技能流程控制管理类
 */
export default class skillControlMgr {
    private actorMgr:ActorBase = null;
    private actorNode:cc.Node = null;//用于子模块和表现层通信，所有通信均以事件方式通知
    private curSt:number = 0;
    private controls:Array<skillControlBase> = [];
    init(actorMgr:ActorBase,actorNode:cc.Node) {
        this.actorMgr = actorMgr;
        this.actorNode = actorNode;
    }
    doControls(controls: Array<controlCg>,cb?:(result:boolean)=>{}) {
        this.controls = [];
        for (let i = 0; i < controls.length; i++) {
            const info = controls[i];
            let ctrl = this._createCtrol(info);
            if(ctrl) this.controls.push(ctrl);
        }

        console.log("技能流程创建完毕",this.controls);
        this._doControls();
    }
    stopControls() {

    }
    pauseControls() {

    }
    private _doControls() {
        console.log("开始执行技能流程,当前阶段：",this.curSt);
        this.controls[this.curSt].startCtr();
    }
    private _createCtrol(data: controlCg):skillControlBase {
        let ctrl:skillControlBase = null;
        let name = data.ctrlName;
        switch(name){
            case ctrlModle.timer:
                ctrl = new skillCtrl_timer();
                break;
            case ctrlModle.trigger:
                ctrl = new skillCtrl_trigger();
                break;
            default:
                console.error("_createCtrol faild,not find ctrType name is ",name);
                break;
        }
        ctrl.init(this,this.actorNode);
        ctrl.loadData(data.data);
        return ctrl;
    }
    completeCtrol() {
        console.log("当前技能释放完毕");
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
    emitCtrlEvent(eventName:SkillCtrlEvent,info:any = {}) {
        this.actorNode.emit(SkillActorEvent.SKILL_CTRL_EVENT_EMIT,{"eventName":eventName,"info":info});
    }
}
