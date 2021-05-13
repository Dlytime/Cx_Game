import { LoaderManager } from "../baseMgr/LoaderManager";
import { cx_Config } from "../DataConfig/Game/Config";
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
    loadInitRes() {
        let self = this;
        cc.assetManager.loadBundle("gameRes",()=>{
            self.preLoadAutoRes();
        });
    }
    preLoadAutoRes() {
        let arr = cx_Define.CONST.RES_TYPE_ARR;
        for (let i = 0; i < arr.length; i++) {
            const resType = arr[i];
            let bundleArr = cx_Config.bundle;
            for (let j = 0; j < bundleArr.length; j++) {
                const bundleName = bundleArr[j];
                this.preLoadOneAutoRes(bundleName,resType);
            }
        }
    }
    preLoadBundleRes(bundleName:string) {

    }
    private preLoadOneAutoRes(bundleName:string,resType:TYPE_RES_TYPE) {
        let self = this;
        let type = cx_Define.getResType(resType);
        if(!type) return;

        let bundle = cc.assetManager.getBundle(bundleName);
        if(bundleName !== "resource" && !bundle) return console.error(bundleName + "not find!");
        let path = resType + "/autoRes";

        this.loadingResCount++;
        bundle.loadDir(path, type, function (err, assets) {
            self.handAssets(assets,resType);
        });
    }
    private handAssets(assets:any,resType) {
        this.loadingResCount--;
        if(!assets) {
            //console.error(err);
            return;
        }
        if(cx_jsTools.isArray(assets)) 
        {
            for (let i = 0; i < assets.length; i++) {
                const res = assets[i];
                let name = res.name;
                cx_CacheData.cacheRes[resType][name] = res;
            }
        }
        else 
        {
            cx_CacheData.cacheRes[resType][assets.name] = assets;
        }
        this.checkLoadRes();
    }
    preLoadRes(localType:TYPE_RES_LOCAL,loadTime:TYPE_RES_LOAD_TIME) {

    }

    private checkLoadRes() {
        if(this.loadingResCount === 0) console.log("loader res end");
        else {
            console.log("remain loading res count:",this.loadingResCount);
        }
    }
}
export const cx_LoaderMgr = new LoaderMgr();