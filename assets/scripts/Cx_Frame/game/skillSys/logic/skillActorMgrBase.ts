import buffManager from "./buff/buffManager";
import skillBase from "./skill/skillBase";
import skillControlMgr from "./skillControl/skillControlMgr";

/**
 * 角色技能管理类,技能系统逻辑层入口
 * 1、玩家技能相关数据管理(玩家基础属性、拥有技能等,技能数据的载入)
 * 2、释放\停止技能(逻辑层、表现层)
 * 3、buff管理(添加(覆盖)、删除)，与buff实际管理类：buffMangager通信
 */
export default class skillActorMgrBase{
    protected actorAttribute:any = null;
    protected oweSkills:Array<skillBase> = [];

    protected buffManager:buffManager = null;
    protected controlMgr:skillControlMgr = new skillControlMgr();

    init(actorNode:cc.Node){
        this.controlMgr.init(this,actorNode);
    }
    initSkill(skills:Array<skillBase>) {
        this.oweSkills = skills;
    }
    fireSKill(tag:number) {
        let skill = this.oweSkills[tag];
        if(!skill) return console.error("canot find skill tag ",tag);
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
