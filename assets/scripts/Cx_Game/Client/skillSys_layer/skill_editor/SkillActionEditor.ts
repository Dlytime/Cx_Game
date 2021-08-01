/**
 * 技能动作数据可视化配置：某一阶段的施法动作绑定，角色运动数据设定(前移，起跳等)
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    actor: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
