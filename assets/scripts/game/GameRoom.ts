import { UIManager } from "../frame/baseMgr/UIManager";
import TestBaseUI from "../UI/TestBaseUI";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    onEnable() {

    }
    showUI() {
        cc.assetManager.loadBundle('gameRes', {version: ''}, function (err, bundle) {
            if (err) {
                return console.error(err);
            }
            UIManager.getInstance().showUI(TestBaseUI,1,()=>{});
            UIManager.getInstance().logAllInfo();
        });
    }
    start () {

        
    }

    // update (dt) {}
}
