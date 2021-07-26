import TimeManager from "../baseMgr/TimeManager";
import cx_App from "../Cx_App";
import { cx_jsTools } from "../tools/jsTools";

class TimeMgr extends TimeManager {
    private _app:cx_App = null;
    init(app) {
        this._app = app;
    }
    delayFunc(time:number,callback:Function,caller?:any,args?:[]) {
        this._app.node.runAction(cc.sequence(
            cc.delayTime(time),
            cc.callFunc(callback,caller)
        ));
    }
    recordTime(tag:string) {
        this["recordTime_"+tag] = new Date();
    }
    getRecordInterval(tag:string|number) {
        let curTime:Date = new Date();
        let  forTime:Date = this["recordTime_"+tag];
        if(!forTime) return -1;
        let interval = (curTime.getTime() - forTime.getTime())/1000;
        console.log("interval",interval);
        return interval;
    }
    clearRecordTime(tag:string) {
        this["recordTime_"+tag] = null;
    }
    update(dt) {

    }
}

export const cx_TimeMgr = new TimeMgr()