import { BaseUI, UIClass } from "../../UI/BaseUI";
import { UILoadType } from "../baseMgr/config/UIDefine";
import { UIManager } from "../baseMgr/UIManager";
import { TYPE_RES_TYPE } from "../DataConfig/Game/Define";
import { cx_LoaderMgr } from "./LoaderMgr";

class UIMgrs extends UIManager {
    protected loadPrefab<T extends BaseUI>(uiClass:UIClass<T>,cb:(err,prefab) =>void,onProgress?:Function) 
    {
        let pb = cx_LoaderMgr.getCacheRes(TYPE_RES_TYPE.prefab,uiClass.getClassName());
        if(pb) return cb(null,pb);
        super.loadPrefab(uiClass,cb,onProgress);
    }
}
export const cx_UIMgr = new UIMgrs();