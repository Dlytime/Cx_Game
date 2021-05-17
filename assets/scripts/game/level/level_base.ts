// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {cx_Define, TYPE_GAME_RESULT } from "../../frame/DataConfig/Game/Define";
import { cx_EventMgr } from "../../frame/gameMgr/EventMgr";
import Gaming from "../Gaming";

const {ccclass, property} = cc._decorator;

@ccclass
export default class level_base extends cc.Component {
    protected Gaming:Gaming = null;
    init(Gaming:Gaming) {
        this.Gaming = Gaming;
    }
    TEST() {
        this.endGame(TYPE_GAME_RESULT.win);
    }
    endGame(result:TYPE_GAME_RESULT) {
/*         if(result === TYPE_GAME_RESULT.win) cx_EventMgr.dispatchEvent(cx_Define.EVENT.LEVEL_WIN);
        else if(result === TYPE_GAME_RESULT.lose) cx_EventMgr.dispatchEvent(cx_Define.EVENT.LEVEL_LOSE);
        else if(result === TYPE_GAME_RESULT.break) cx_EventMgr.dispatchEvent(cx_Define.EVENT.LEVEL_BREAK); */
        this.Gaming.endLevel(result);
    }
    // update (dt) {}
}
