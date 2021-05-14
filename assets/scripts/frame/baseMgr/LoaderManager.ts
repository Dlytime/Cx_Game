import { cx_Define, TYPE_RES_LOAD_TIME, TYPE_RES_TYPE } from "../DataConfig/Game/Define";
import { EventMgr } from "../gameMgr/EventMgr";

/**
 * 资源加载管理类
 */
export class LoaderManager {
    private static _instance:LoaderManager = null;
    public static getInstance():LoaderManager 
    {
        if(this._instance == null)
        {
            this._instance = new LoaderManager();
        }
        return this._instance;
    }

    constructor() {

    }
}
