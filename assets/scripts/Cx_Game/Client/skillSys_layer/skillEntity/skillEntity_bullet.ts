// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import skillEntity from "./skillEntity";

const {ccclass, property} = cc._decorator;

@ccclass
export default class skillEntity_bullet extends skillEntity {
    protected static skillName:string = "bullet";
    protected static entityUrl:string = null;
    protected init(initPos:cc.Vec2|cc.Vec3,dir:cc.Vec2) {
        
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
