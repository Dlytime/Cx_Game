import ActorBase from "../../ActorSys/ActorBase";

/**
 * 技能逻辑对象基类
 * 1、存储技能数据等基本信息
 * 2、管理技能生效逻辑,如远程技能：模拟技能实体运行轨迹，触发伤害
 * 3、通知表现层：添加技能实体，播放对应特效、做对应路径运动等
 */
export default abstract class skillBase {
	public abstract readonly skillName:string;
	/**属性数据 */
	public abstract valueData: any = null;
	/**类型数据 */
	public abstract typeData: any = null;
	/**流程数据 */
	public abstract controlData: any = null;
	public abstract owner:ActorBase = null;
	public init(owner:ActorBase) {
		this.owner = owner;
	};
	/**技能数据加载,在技能拥有者出生时调用 */
	public loadSkillData(data:any) {
		this.valueData = data.valueData;
		this.typeData = data.typeData;
		this.controlData = data.controlData;
	};
}
