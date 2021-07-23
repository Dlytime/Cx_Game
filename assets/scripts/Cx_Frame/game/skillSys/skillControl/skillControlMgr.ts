import skillControlBase from "./skillControlBase";

/**
 * 技能流程控制管理类
 */
export default class skillControlMgr {
    doControls(controls: Array<any>,cb?:(result:boolean)=>{}) {
        
    }
    private _doControls<T extends skillControlBase>(controls:Array<T>) {

    }
    createCtrol<T extends skillControlBase>(data: any):T {
        return
    }
    stopControls() {

    }
    pauseControls() {

    }
}
