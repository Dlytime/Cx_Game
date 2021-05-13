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

    public cacheRes:{sfs:{},prefab:{},audio:{},json:{},anim:{}} = 
    {
        sfs:{},prefab:{},audio:{},json:{},anim:{}
    };
    getCacheRes() {

    }
    loadRemoteRes(resType:TYPE_RES_TYPE,timeType:TYPE_RES_LOAD_TIME) {

    }
    loadBundle(bundleName:string,callback:(bundle: cc.AssetManager.Bundle) => void) {
        cc.assetManager.loadBundle(bundleName,(error,bundle)=>{
            if(error) return console.error(error);
            callback(bundle);
        })
    }
    loadBundleRes(bundleName,resType:TYPE_RES_TYPE,path:string,cb:Function,args:Array<any> = []) {
        let bundle =  cc.assetManager.getBundle(bundleName);
        if(!bundle) {
            console.error("not find bundle ",bundleName);
            return;
        }
        let type = cx_Define.getResType(resType);
        bundle.load(path,type,(error,res:any)=>{
            if(error) return console.error(error);
/*             if(res instanceof cc.Texture2D) {
                res = new cc.SpriteFrame(res, new cc.Rect(0, 0, res.width, res.height));
            } */
            if(typeof cb === "function") cb(res,...args)();
        })
    }
}
