/**
 * 角色技能管理类
 * 1、玩家技能相关数据管理(玩家基础属性、拥有技能等,技能数据的载入)
 * 2、释放\停止技能(逻辑层、表现层)
 * 3、buff管理(添加(覆盖)、删除)，与buff实际管理类：buffMangager通信
 */

import buffBase from "../buff/buffBase";
import buffManager from "../buff/buffManager";
import skillBase from "../skill/skillBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class skillActorMgrBase extends cc.Component {
    protected actorAttribute:any = null;
    protected skillOwe:Array<skillBase> = [];

    protected buffManager:buffManager = null;
    fireSKill<T extends skillBase>(skill:T) {

    }
    stopSkill<T extends skillBase>(skill:T) {

    }
    loadSkillData<T extends skillBase>(skill:T) {

    }
    addBuff() {

    }
    deleteBuff() {

    }
}
