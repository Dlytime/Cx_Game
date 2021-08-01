import buffManager from "../SkillSys/buff/buffManager";
import skillBase from "../SkillSys/skill/skillBase";
import skillControlMgr from "../SkillSys/skillControl/skillControlMgr";


export default class ActorBase {
    protected actorAttribute:any = null;
    protected oweSkills:Array<skillBase> = [];

    protected buffManager:buffManager = null;
    protected controlMgr:skillControlMgr = new skillControlMgr();

    init(actorNode:cc.Node){
        let skillData = {
            "skill_test":{
                valueData:{},
                typeData:{},
                controlData: [
                    {"ctrlName":"trigger","data":{"event":"preparation","dt":0.1}},
                    {"ctrlName":"trigger","data":{"event":"fire","dt":0}},
                    {"ctrlName":"timer","data":{"delay":0.3}},
                    {"ctrlName":"trigger","data":{"event":"harm","dt":0}},
                    {"ctrlName":"timer","data":{"delay":0.1}},
                    {"ctrlName":"trigger","data":{"event":"recover","dt":0.1}},
                    {"ctrlName":"trigger","data":{"event":"complete","dt":0}},
                ]
            },
            "skill_test_bullet":{
                valueData:{},
                typeData:{},
                controlData: [
                    {"ctrlName":"trigger","data":{"event":"preparation","dt":0.5}},
                    {"ctrlName":"trigger","data":{"event":"fire","dt":0}},
                    {"ctrlName":"trigger","data":{"event":"recover","dt":0.1}},
                    {"ctrlName":"trigger","data":{"event":"complete","dt":0}},
                ]
            },
        }
        this.controlMgr.init(this,actorNode);
    }
    initSkill(skills:Array<skillBase>) {
        this.oweSkills = skills;
    } 
    fireSKill(tag:number) {
        let skill = this.oweSkills[tag];
        if(!skill) return console.error("canot find skill tag ",tag);
        if(!this.isAllowFire(skill)) return;
        console.log("条件判断完毕，进入技能释放流程");
        this.controlMgr.doControls(skill.controlData);
    }
    stopSkill<T extends skillBase>(skill:T) {

    }
    loadSkillData<T extends skillBase>(skill:T) {
 
    }
    addBuff() {

    }
    deleteBuff() {

    }
    /**
     * 技能是否可以释放(最终判断,服务端判断)
     */
     private isAllowFire<T extends skillBase>(skill:T):boolean {
        return true;
    }
}
