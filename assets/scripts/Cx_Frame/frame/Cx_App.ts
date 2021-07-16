

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Skill_FireTargetType, skill_RangeType } from "../game/skillSys/SkillSysDefine";
import DlgLoading from "../UI/DlgLoading";
import { UIManager } from "./baseMgr/UIManager";
import { cx_Define } from "./DataConfig/Game/Define";
import { PlayerInfoConfigContainer } from "./DataConfig/Storage/PlayerConfig";
import { cx_DataMgr } from "./gameMgr/DataMgr";
import { cx_EventMgr } from "./gameMgr/EventMgr";
import { cx_LoaderMgr } from "./gameMgr/LoaderMgr";
import { cx_UIMgr } from "./gameMgr/UIMgr";

const {ccclass, property} = cc._decorator;
 
@ccclass
export default class Cx_App extends cc.Component {

    @property({type:Skill_FireTargetType})
    FireTargetType =  Skill_FireTargetType.enemy;

    onLoad () {
        cx_EventMgr.dispatchEvent(cx_Define.EVENT.GAME_INIT_START,{caller:this});
    }
 
    start () {
 
    }
 
    update (dt) {
        
    }
}
 
