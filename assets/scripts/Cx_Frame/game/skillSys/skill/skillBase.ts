
/**
 * 技能基类
 * 1、存储技能数据等基本信息
 */
export default class skillBase {
	/**属性数据 */
	public valueData: any = null;
	/**类型数据 */
	public typeData: any = null;
	/**流程数据 */
	public controlData: any = null;

	/**技能数据加载,在技能拥有者出生时调用 */
	public loadSkillData() {

	}
}
