// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { cx_Define } from "../DataConfig/Game/Define";
export default class TimeManager{
    private dtCbs:Array<{id:number,cb:(dt:number)=>void}> = [];
    private _dtCbTag:number = 0;
    registDtCb(cb:(dt:number)=>void) {
        let id = this._dtCbTag++;
        this.dtCbs.push({"id":id,"cb":cb});
        return id;
    }
    offRegistDtCb(id:number) {
        for (let i = 0; i < this.dtCbs.length; i++) {
            const obj = this.dtCbs[i];
            if(obj.id === id) this.dtCbs.splice(i,1);
        }
    }
    update (dt) {
        if(this.dtCbs.length > 0) 
        {
            for (let i = 0; i < this.dtCbs.length; i++) {
                const cb = this.dtCbs[i].cb;
                cb(dt);
            }
        }
    }
}
