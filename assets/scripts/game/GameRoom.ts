import { UIManager } from "../frame/baseMgr/UIManager";
import { cx_Define } from "../frame/DataConfig/Game/Define";
import { PlayerInfoConfigContainer } from "../frame/DataConfig/Storage/PlayerConfig";
import { cx_DataMgr } from "../frame/gameMgr/DataMgr";
import { EventMgr } from "../frame/gameMgr/EventMgr";
import { cx_UIMgr } from "../frame/gameMgr/UIMgr";
import DlgLoading from "../UI/DlgLoading";
import TestBaseUI from "../UI/TestBaseUI";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    }
    onEnable() {
        cx_DataMgr.loadAllConfig(()=>{
            let data = cx_DataMgr.getConfig(PlayerInfoConfigContainer);
            console.log(data);
        });
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
    TEST() {
        //console.log(cc.assetManager.assets);
        cx_UIMgr.showUI(DlgLoading,1,()=>{});
        this.scheduleOnce(()=>{
            EventMgr.dispatchEvent(cx_Define.EVENT.GAME_LOADING_END);
        },3);
/*         UIManager.getInstance().showUI(DlgLoading,1,()=>{});
        this.scheduleOnce(()=>{
            EventMgr.dispatchEvent(Define.EVENT.GAME_LOADING_END);
        },3); */
    }
    start () {
        
        
    }

    // update (dt) {}
}
