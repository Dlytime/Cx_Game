import skillControlMgr from "./skillControlMgr";

/**
 * 技能流程模块基类
 * 1、condition：条件模块，返回false/true,条件提供可选项配置，如：最低蓝量、最低(高)血量、cd、状态限制(受击、禁锢状态是否可释放等)
 * 2、timer：定时器模块(定时触发，等待触发)
 * 3、dtCheck: 帧检测模块(每一帧都执行某一逻辑检测，直到触发结束条件，将结果返回到下一流程)，如：发射出去的子弹
 * 4、trigger：触发器(执行)模块基类,立即执行某一动作,如前摇、开始施法、伤害检测、结束施法
 */
export default abstract class skillControlBase {
    protected abstract ctrType:string;
    protected abstract ctrData:any;
    protected mManager:skillControlMgr = null;//流程管理类
    protected actorNode:cc.Node = null;//角色实体类(节点),用于和表现层的通信(事件通信)
    /**流程数据初始化,在生成时调用 */
    public init(mManager:skillControlMgr,actorNode:cc.Node){
        this.mManager = mManager;
    };
    /**装载数据 */
    public abstract loadData(data:any);
    /**开始流程,执行时调用 */
    public abstract startCtr();
    /**结束流程 */
    public abstract endCtr();
    protected emitMgr(result:boolean,info?:any) {
        this.mManager.emit(result,this,info);
    }
}
