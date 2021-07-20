/**
 * 角色技能管理类
 * 1、玩家技能相关数据管理(玩家基础属性、拥有技能等,技能数据的载入)
 * 2、释放\停止技能(逻辑层、表现层)
 * 3、buff管理(添加(覆盖)、删除)，与buff实际管理类：buffMangager通信
 */

import buffBase from "../buff/buffBase";
import buffManager from "../buff/buffManager";
import skillBase from "../skill/skillBase";
import skillControlMgr from "../skillControl/skillControlMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class skillActorMgrBase extends cc.Component {
    protected actorAttribute:any = null;
    protected skillOwe:Array<skillBase> = [];

    protected buffManager:buffManager = null;
    protected controlMgr:skillControlMgr = new skillControlMgr();
    fireSKill<T extends skillBase>(skill:T) {
        if(!this.baseIsAllowFire(skill)) return;
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
     * 技能释放的基本条件(蓝耗、cd等),适用于客户端自行判断
     */
    private baseIsAllowFire<T extends skillBase>(skill:T):boolean {
        return true;
    }

    /**
     * 技能是否可以释放(最终判断,服务端判断)
     */
     private isAllowFire<T extends skillBase>(skill:T):boolean {
        return true;
    }
}
