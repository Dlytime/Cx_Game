import skillBase from "../skillSys/skill/skillBase";
import skill_test from "../skillSys/skill/skill_test";
import skillActorMgrBase from "../skillSys/skillActor/skillActorMgrBase";
import { SkillActorEvent, SkillCtrlEvent } from "../skillSys/skillConfig/SkillEvent";

/**
 * 角色表现层基类：
 * 1、对接其它系统(逻辑层)：技能系统、背包系统、对话系统等;
 * 2、管理角色的动画(技能释放动画、受击动画等)和行为(各方位移动、跳跃等位移) 
 * 3、通信方式：逻辑层事件通知表现层执行对应的动作和位移，表现层可以读取逻辑层数据但不可修改;
 */
const {ccclass, property} = cc._decorator;

@ccclass
export default class actorBase extends cc.Component {
    protected ownSkills:Array<skillBase> = [new skill_test()] 
    private skillSysMgr:skillActorMgrBase = null;

    onLoad() {
        let skillData = {
            "skill_test":{
                valueData:{},
                typeData:{},
                controlData: [
                    {"ctrlName":"trigger","data":{"event":SkillCtrlEvent.preparation,"dt":0.1}},
                    {"ctrlName":"trigger","data":{"event":SkillCtrlEvent.fire,"dt":0}},
                    {"ctrlName":"timer","data":{"delay":0.3}},
                    {"ctrlName":"trigger","data":{"event":SkillCtrlEvent.harm,"dt":0}},
                    {"ctrlName":"timer","data":{"delay":0.1}},
                    {"ctrlName":"trigger","data":{"event":SkillCtrlEvent.recover,"dt":0.1}},
                    {"ctrlName":"trigger","data":{"event":SkillCtrlEvent.complete,"dt":0}},
                ]
            }
        }
        this.initSkillSys(skillData);

        this.registEvent();

        setTimeout(() => {
            this.fireSkill(0);
        }, 2000);
    }

    public fireSkill(tag:number) {
        this.skillSysMgr.fireSKill(tag);
    }
    private registEvent() {
        this.node.on(SkillActorEvent.SKILL_CTRL_EVENT_EMIT,this._ctrlEventHand,this);
    }
    /**角色技能系统初始化 */
    private initSkillSys(skillData:any) {
        this.skillSysMgr = new skillActorMgrBase();
        this.skillSysMgr.init(this.node);

        for (let i = 0; i < this.ownSkills.length; i++) {
            const skill = this.ownSkills[i];
            let data = skillData[skill.skillName];
            skill.loadSkillData(data);
        }

        this.skillSysMgr.initSkill(this.ownSkills);
    }

    private _ctrlEventHand(event:{eventName:SkillCtrlEvent,info:any}) {
        console.log("角色执行事件：",event.eventName);
    }
}
