import {BaseUI,UIClass} from "../../UI/BaseUI";

	
/**UI管理 */
export class UIManager{
    private static _instance:UIManager = null;
    public static getInstance():UIManager 
    {
        if(this._instance == null)
        {
            this._instance = new UIManager();
        }
        return this._instance;
    }

    private prefabs:Array<cc.Prefab> = [];
    private nodepools:Array<cc.NodePool> = [];
    private uiList: BaseUI[] = [];
    private uiRoot:cc.Node = null;
    constructor() {
        this.uiRoot = cc.find("Canvas");
    }
    setRootNode(node:cc.Node) {
        this.uiRoot = node;
    }
    showUI<T extends BaseUI>(uiClass:UIClass<T>,zIndex?:number,cb?:Function,onProgress?:Function,...args:any[]) 
    {
        if(this.getUI(uiClass))
        {
            return;
        }

        this.loadPrefab(uiClass, (error, prefab)=>
        {
            if(error)
            {
                cc.log(error);
                return;
            }
            if(this.getUI(uiClass))
            {
                return;
            }
            let uiNode: cc.Node = cc.instantiate(prefab);
            uiNode.parent = this.uiRoot;
            if (zIndex) { uiNode.zIndex = zIndex; }
            let ui = uiNode.getComponent(uiClass) as BaseUI;
            ui.tag = uiClass;
            this.uiList.push(ui);
            if(cb)
            {
                cb(ui, args);
            }
        },onProgress);
    }
    destroyUI<T extends BaseUI>(uiClass:UIClass<T>) {
        for(let i = 0; i < this.uiList.length; ++i)
        {
            if(this.uiList[i].tag === uiClass)
            {
                this.uiList[i].node.destroy();
                this.uiList.splice(i, 1);
                return;
            }
        }
    }	
    hideUI<T extends BaseUI>(uiClass: UIClass<T>)
    {
        let ui = this.getUI(uiClass);
        if(ui)
        {
            ui.node.active = false;
        }
    }
 
    getUI<T extends BaseUI>(uiClass: UIClass<T>): BaseUI
    {
        for(let i = 0; i < this.uiList.length; ++i)
        {
            if(this.uiList[i].tag === uiClass)
            {
                return this.uiList[i];
            }
        }
        return null;
    }

    getUINodeJs(prefab:cc.Prefab,jsname = prefab.name) {
        if(this.prefabs[jsname] === undefined || this.prefabs[jsname] === null)
        {
            this.registerPrefab(prefab,jsname);
        }
        let node = this._getPreNode(jsname);
        if(node === null) {
            cc.error(jsname + "not found");
            return null;
        } 
        let nodejs = node.getComponent(jsname);
        if(!nodejs) {
            cc.error(node,"  not find jsName: ",jsname);
            return null;
        }
        return nodejs;
    }
    getUINode(prefab:cc.Prefab,jsname = prefab.name) {
        if(this.prefabs[jsname] === undefined || this.prefabs[jsname] === null)
        {
            this.registerPrefab(prefab,jsname);
        }
        let node = this._getPreNode(jsname);
        if(node) return node;
    }
    registerPrefab(prefab,name) {
        this.nodepools[name] = new cc.NodePool(name);
        this.prefabs[name] = prefab;
    }

    private loadPrefab<T extends BaseUI>(uiClass:UIClass<T>,cb:Function,onProgress?:Function):cc.Node 
    {
        return 
    }
    private _getPreNode(name) {
        let node = null;
        let nodepool = this.nodepools[name];
        if(!nodepool) return null;
        if(nodepool.size() > 0) {
            node = nodepool.get();
        } else {
            node = cc.instantiate(this.prefabs[name]);
        }
        return node;
    }
}