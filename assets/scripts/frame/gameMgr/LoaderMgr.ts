import { LoaderManager } from "../baseMgr/LoaderManager";
import { cx_Config_Res, Form_ResLoad } from "../DataConfig/Game/Config";
import { cx_CacheData } from "../DataConfig/Game/Data";
import { cx_Define, TYPE_RES_LOAD_TIME, TYPE_RES_LOCAL, TYPE_RES_TYPE } from "../DataConfig/Game/Define";
import { cx_jsTools } from "../tools/jsTools";
import { EventMgr } from "./EventMgr";
class LoaderMgr extends LoaderManager {
    constructor() {
        super();
        EventMgr.addEventListener(cx_Define.EVENT.GAME_INIT_START,"loaderMgr",()=>{
            this.loadInitRes();
        },this);
    }
    private resList:Array<any> = [];
    private faildResList:Array<string> = [];
    private loadingResCount:number = 0;
    private loadLogList:Array<string> = null;

    /**获取缓存资源 */
    getCacheRes(resType:TYPE_RES_TYPE,resName:string) 
    {
        return cx_CacheData.cacheRes[resType][resName];
    }
    /**获取剩余未加载完成资源数 */
    getRemainResCount() {
        return this.loadingResCount;
    }
    loadInitRes() {
        let self = this;
        cc.assetManager.loadBundle("gameRes",()=>{
            self.preLoadAutoRes();
            self.preLoadBundleRes("gameRes",TYPE_RES_LOAD_TIME.loading);
            self.preLoadResourceRes(TYPE_RES_LOAD_TIME.loading);
        });
    }
    /**获取资源加载Log */
    getLoaderLog():Array<string> {
        return this.loadLogList;
    }
    /**预加载autoRes下的资源 */
    preLoadAutoRes() {
        let arr = cx_Define.CONST.RES_TYPE_ARR;
        for (let i = 0; i < arr.length; i++) {
            const resType = arr[i];
            let bundleArr = cx_Config_Res.bundleArr;
            for (let j = 0; j < bundleArr.length; j++) {
                const bundleName = bundleArr[j];
                this._preLoadOneAutoRes(bundleName,resType);
            }
            this.loadResourceDir(resType+"/autoRes",resType);
        }
    }
    /**预加载资源配置中bundel资源 */
    preLoadBundleRes(bundleName:string,loadTime:TYPE_RES_LOAD_TIME) {
        let bundle = cc.assetManager.getBundle(bundleName);
        if(!bundle) return;
        let self = this;
        let arr = cx_Config_Res.preload_bundle;
        for (let i = 0; i < arr.length; i++) {
            const config = arr[i];
            config.loadTime = config.loadTime?config.loadTime:TYPE_RES_LOAD_TIME.loading;
            if(config.bundleName == bundleName && config.loadTime == loadTime) {
                this.loadBundleRes(bundleName,config.resType,config.url);
            }
        }
    }
    /**预加载资源配置中resource资源 */
    preLoadResourceRes(loadTime:TYPE_RES_LOAD_TIME) {
        let arr = cx_Config_Res.preload_resource;
        for (let i = 0; i < arr.length; i++) {
            const config = arr[i];
            this.loadResourceRes(config.url,config.resType);
        }
        
    }
    private _preLoadOneAutoRes(bundleName:string,resType:TYPE_RES_TYPE) {
        let self = this;
        let bundle = cc.assetManager.getBundle(bundleName);
        if(bundleName !== "resource" && !bundle) return console.error(bundleName + "not find!");
        let path = resType + "/autoRes";
        this.loadBundleDir(bundleName,path,resType);
    }
    private _startLoadRes() {
        this.loadingResCount++;
    }
    private _handLoadRes(assets:any,resType) {
        this.loadingResCount--;
        if(!assets) return;
        if(cx_jsTools.isArray(assets)) 
        {
            for (let i = 0; i < assets.length; i++) {
                const res = assets[i];
                let name = res.name;
                cx_CacheData.cacheRes[resType][name] = res;
                this.resList.push(name);
            }
        }
        else 
        {
            cx_CacheData.cacheRes[resType][assets.name] = assets;
            this.resList.push(assets.name);
        }
        this._checkLoadRes();
    }
    private _checkLoadRes() {
        if(this.loadingResCount === 0) console.log("loader res end ,successList=>",this.resList,"    faildList=>",this.faildResList);
        else {
            console.log("remain loading res count:",this.loadingResCount);
        }
    }
    loadBundleRes(bundleName,resType:TYPE_RES_TYPE,url:string,callback?:(res:cc.Asset,...args:any) => void,args:Array<any> = []) {
        let bundle =  cc.assetManager.getBundle(bundleName);
        if(!bundle) {
            console.error("not find bundle ",bundleName);
            return;
        }
        let type = cx_Define.getResType(resType);
        this._startLoadRes();
        let self = this;
        bundle.load(url,type,(error,res:any)=>{
            if(error) this.faildResList.push(url);
            self._handLoadRes(res,resType);
            if(callback) callback(res,...args);
        })
    }
    loadBundleDir(bundleName:string,url:string,resType:TYPE_RES_TYPE,callback?:(assets:Array<any>)=>void,args?:[]) {
        let bundle =  cc.assetManager.getBundle(bundleName);
        if(!bundle) {
            console.error("not find bundle ",bundleName);
            if(callback) callback(null,...args);
            return;
        }
        let assetType = cx_Define.getResType(resType);
        this._startLoadRes();
        let self = this;
        bundle.loadDir(url, assetType, function (err, assets) {
            self._handLoadRes(assets,resType);
            if(err) this.faildResList.push(url);
            if(callback) callback(assets);
        });
    }
    loadResourceDir(url:string,resType:TYPE_RES_TYPE,callback?:(assets:Array<any>)=>void,args?:[]) {
        let assetType = cx_Define.getResType(resType);
        this._startLoadRes();
        let self = this;
        cc.resources.loadDir(url,assetType,(err,assets)=>{
            self._handLoadRes(assets,resType);
            if(err) this.faildResList.push(url);
            if(callback) callback(assets);
        })
    }
    loadResourceRes(url:string,resType:TYPE_RES_TYPE,callback?:(asset:any)=>void,args?:[]) {
        let assetType = cx_Define.getResType(resType);
        this._startLoadRes();
        let self = this;
        cc.resources.load(url, assetType, (err, asset) => {
            self._handLoadRes(asset,resType);
            if(err) this.faildResList.push(url);
            if(callback) callback(asset);
        });
    }
}
export const cx_LoaderMgr = new LoaderMgr();