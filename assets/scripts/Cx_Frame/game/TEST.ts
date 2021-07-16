// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { cx_Define, TYPE_GAME_RESULT } from "../frame/DataConfig/Game/Define";
import { PlayerInfoConfigContainer } from "../frame/DataConfig/Storage/PlayerConfig";
import { cx_DataMgr } from "../frame/gameMgr/DataMgr";
import { cx_EventMgr } from "../frame/gameMgr/EventMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    Temp() {
        console.log(cx_DataMgr.getConfigData(PlayerInfoConfigContainer))
    }
    start () {

    }
    startGame() {
        cx_EventMgr.dispatchEvent(cx_Define.EVENT.START_LEVEL);
    }
    winGame(event,params) {
        cx_EventMgr.dispatchEvent(cx_Define.EVENT.END_LEVEL,{result:TYPE_GAME_RESULT.win});
    }
    loseGame() {
        cx_EventMgr.dispatchEvent(cx_Define.EVENT.END_LEVEL,{result:TYPE_GAME_RESULT.lose});
    }
    backMainUI() {
        cx_EventMgr.dispatchEvent(cx_Define.EVENT.END_LEVEL,{result:TYPE_GAME_RESULT.break});
    }
    // update (dt) {}
}
