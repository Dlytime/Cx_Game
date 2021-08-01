/**
 * 技能实体
 * 1、负责技能的实体动画、特效等展示
 * 2、按逻辑要求做对应指定路径运动
 */
export default abstract class skillEntity extends cc.Component {
    protected static skillName:string = null;
    protected static entityUrl:string = null;
    //protected abstract init();
}
