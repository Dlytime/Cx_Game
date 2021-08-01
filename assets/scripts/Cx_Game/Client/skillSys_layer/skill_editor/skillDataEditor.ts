/**
 * 技能属性数据可视化配置
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class skillDataEditor extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
