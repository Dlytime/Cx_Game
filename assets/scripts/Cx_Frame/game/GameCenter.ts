import { UIManager } from "../frame/baseMgr/UIManager";
import { cx_CacheData } from "../frame/DataConfig/Game/Data";
import { cx_Define, TYPE_GAME_RESULT, TYPE_GAME_STATUS } from "../frame/DataConfig/Game/Define";
import { PlayerInfoConfigContainer } from "../frame/DataConfig/Storage/PlayerConfig";
import { cx_DataMgr } from "../frame/gameMgr/DataMgr";
import { cx_EventMgr } from "../frame/gameMgr/EventMgr";
import { cx_UIMgr } from "../frame/gameMgr/UIMgr";
import DlgLoading from "../UI/DlgLoading";
import MainUI from "../UI/MainUI";
import TestBaseUI from "../UI/TestBaseUI";
import Gaming from "./Gaming";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameCenter extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    private Gaming:Gaming = null;
    onLoad () {
        this.gameInit();
         cx_UIMgr.showUI(DlgLoading,1,(ui)=>{
             ui.setCompleteCb(()=>{
                 cx_UIMgr.closeUI(DlgLoading);
                 this.gameStart();
             },this);
         },this);
    }
    private gameInit() {
        this.initGame();
        this.initGameCenterEvent();
        this.initUI();
    }
    private initGameCenterEvent() {
        cx_EventMgr.addEventListener(cx_Define.EVENT.LEVEL_INIT,"GameCenter",this.levelInit,this);
        cx_EventMgr.addEventListener(cx_Define.EVENT.LEVEL_START,"GameCenter",this.levelStart,this);
        cx_EventMgr.addEventListener(cx_Define.EVENT.LEVEL_END,"GameCenter",this.levelEnd,this);

        cx_EventMgr.addEventListener(cx_Define.EVENT.INIT_LEVEL,"GameCenter",this.initLevel,this);
        cx_EventMgr.addEventListener(cx_Define.EVENT.START_LEVEL,"GameCenter",this.startLevel,this);
        cx_EventMgr.addEventListener(cx_Define.EVENT.END_LEVEL,"GameCenter",this.endLevel,this);
    }
    private initGame() {
        this.Gaming = this.node.getChildByName("Game").getComponent("Gaming");
    }
    private initUI() {
        
    }
    /**场景初始化及资源准备完毕，进入游戏 */
    private gameStart() {
        cx_UIMgr.showUI(MainUI,0,()=>{cx_UIMgr.destroyUI(DlgLoading)},this)
    }
    //初始化关卡
    private initLevel() {
        let curStatus = cx_CacheData.curGameStatus;
        if(curStatus === TYPE_GAME_STATUS.init) return console.error("初始化已执行");
        if(curStatus && cx_CacheData.curGameStatus !== TYPE_GAME_STATUS.end) return console.error("当前游戏状态错误，不能初始化下一关：",curStatus);

        cx_CacheData.curGameStatus = TYPE_GAME_STATUS.init;
        this.Gaming.initLevel();
 
    }
    //开始关卡游戏
    private startLevel() {
        let curStatus = cx_CacheData.curGameStatus;
        if(curStatus === TYPE_GAME_STATUS.gaming) return console.error("当前已在游戏中");
        if(curStatus && cx_CacheData.curGameStatus !== TYPE_GAME_STATUS.end) return console.error("当前游戏状态错误，不能开始游戏：",curStatus);

        this.Gaming.startLevel();
        cx_UIMgr.closeUI(MainUI);
    }
    //结束关卡
    private endLevel(event) {
        let curStatus = cx_CacheData.curGameStatus;
        if(curStatus === TYPE_GAME_STATUS.init) return console.error("关卡已结束");
        if(curStatus !== TYPE_GAME_STATUS.gaming) return console.error("当前游戏状态错误，不能结束关卡: ",curStatus);

        this.Gaming.endLevel(event);
    }

    //关卡初始化
    private levelInit() {
        cx_CacheData.curGameStatus = TYPE_GAME_STATUS.init;
        console.log("开始下一关初始化");
    }
    //关卡已开始
    private levelStart() {
        cx_CacheData.curGameStatus = TYPE_GAME_STATUS.gaming;
        console.log("开始游戏");
    }
    //关卡已结束
    private levelEnd(event) {
        cx_UIMgr.showUI(MainUI);

        cx_CacheData.gameRounds++;
        cx_CacheData.curGameStatus = TYPE_GAME_STATUS.end;
        let result:TYPE_GAME_RESULT = event.result;
        cx_CacheData.gameResult = result;
        console.log("当前关卡结束，游戏结果：",result);
        if(result == TYPE_GAME_RESULT.win) {
            cx_DataMgr.goNextLevel();
        } else if(result == TYPE_GAME_RESULT.lose) {

        } else {

        }
    }
}
