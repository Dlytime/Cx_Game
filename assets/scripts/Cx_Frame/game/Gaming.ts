import { cx_Define, TYPE_GAME_RESULT, TYPE_RES_TYPE } from "../frame/DataConfig/Game/Define";
import { cx_DataMgr } from "../frame/gameMgr/DataMgr";
import { cx_EventMgr } from "../frame/gameMgr/EventMgr";
import { cx_LoaderMgr } from "../frame/gameMgr/LoaderMgr";
import GameCenter from "./GameCenter";
import level_base from "./level/level_base";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Gaming extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    private curLevelNode = null;
    private curLevelNodeJs = null;
    private GameCenter:GameCenter = null;
    // onLoad () {}
    init(GameCenter:GameCenter) {
        this.GameCenter = GameCenter;
    }
    initLevel(cb?:Function) {
        let self = this;
        let level = cx_DataMgr.getCurLevel();
        cx_EventMgr.dispatchEvent(cx_Define.EVENT.LEVEL_INIT);
        cx_LoaderMgr.loadBundleRes("gameRes",TYPE_RES_TYPE.prefab,"prefab/level/level_"+level,(prefab:cc.Prefab)=>{
            if(!prefab) return console.error("level_"+level+" not find");
            let node = cc.instantiate(prefab);
            self.curLevelNode = node;
            let nodejs = node.getComponent("level_"+level);
            if(!nodejs) nodejs = node.addComponent(level_base);
            nodejs.init(self);
            self.curLevelNodeJs = nodejs;
            if(cb) cb.bind(self)();
        })
    }
    startLevel() {
        if(this.curLevelNode) this._startLevel();
        else {
            this.initLevel(this._startLevel)
        }
    }
    private _startLevel() {
        this.node.addChild(this.curLevelNode);
        cx_EventMgr.dispatchEvent(cx_Define.EVENT.LEVEL_START);
    }
    reStartLevel() {

    }
    backToMainView() {

    }
    endLevel(event) {
        this.recycleLevelNode();
        cx_EventMgr.dispatchEvent(cx_Define.EVENT.LEVEL_END,event);
    }
    private recycleLevelNode() {
        this.curLevelNode.destroy();
        this.curLevelNode = null;
        this.curLevelNodeJs = null;
    }
    start () {

    }

    // update (dt) {}
}
