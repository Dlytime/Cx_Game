

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DlgLoading from "../UI/DlgLoading";
import { UIManager } from "./baseMgr/UIManager";
import { cx_Define } from "./DataConfig/Game/Define";
import { PlayerInfoConfigContainer } from "./DataConfig/Storage/PlayerConfig";
import { cx_DataMgr } from "./gameMgr/DataMgr";
import { EventMgr } from "./gameMgr/EventMgr";
import { cx_UIMgr } from "./gameMgr/UIMgr";

 
const {ccclass, property} = cc._decorator;
 
@ccclass
export default class NewClass extends cc.Component {
 
    @property(cc.Label)
    label: cc.Label = null;
 
    @property
    text: string = 'hello';
 
    // LIFE-CYCLE CALLBACKS:
 
    onLoad () {
        cx_DataMgr.loadAllConfig(()=>{
            let data = cx_DataMgr.getConfig(PlayerInfoConfigContainer);
            console.log(data);
        });
        EventMgr.dispatchEvent(cx_Define.EVENT.GAME_INIT_START);

        cx_UIMgr.showUI(DlgLoading);
    }
 
    start () {
 
    }
 
    // update (dt) {}
}
 
