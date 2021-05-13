

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { UIManager } from "./baseMgr/UIManager";
import { cx_Define } from "./DataConfig/Game/Define";
import { EventMgr } from "./gameMgr/EventMgr";

 
const {ccclass, property} = cc._decorator;
 
@ccclass
export default class NewClass extends cc.Component {
 
    @property(cc.Label)
    label: cc.Label = null;
 
    @property
    text: string = 'hello';
 
    // LIFE-CYCLE CALLBACKS:
 
    onLoad () {
        EventMgr.dispatchEvent(cx_Define.EVENT.GAME_INIT_START);
    }
 
    start () {
 
    }
 
    // update (dt) {}
}
 
