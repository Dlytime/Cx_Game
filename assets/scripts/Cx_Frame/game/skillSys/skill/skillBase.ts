import skillActorMgrBase from "../skillActor/skillActorMgrBase";

/**
 * 技能基类
 * 1、存储技能数据等基本信息
 */
export default abstract class skillBase {
	public abstract readonly skillName:string;
	/**属性数据 */
	public abstract valueData: any = null;
	/**类型数据 */
	public abstract typeData: any = null;
	/**流程数据 */
	public abstract controlData: any = null;
	public abstract owner:skillActorMgrBase = null;
	public init(owner:skillActorMgrBase) {
		this.owner = owner;
	};
	/**技能数据加载,在技能拥有者出生时调用 */
	public loadSkillData(data:any) {
		this.valueData = data.valueData;
		this.typeData = data.typeData;
		this.controlData = data.controlData;
	};
}
