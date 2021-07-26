

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:

import { cx_Define } from "./DataConfig/Game/Define";
import { cx_EventMgr } from "./gameMgr/EventMgr";
import { cx_TimeMgr } from "./gameMgr/TimeMgr";

const {ccclass, property} = cc._decorator;
 
@ccclass
export default class Cx_App extends cc.Component {
    onLoad () {
        console.log("patch 1.1")
        cx_EventMgr.dispatchEvent(cx_Define.EVENT.GAME_INIT_START,{caller:this});
    }
 
    start () {
 
    }
 
    update (dt) {
        cx_TimeMgr.update(dt);
    }
}
 
