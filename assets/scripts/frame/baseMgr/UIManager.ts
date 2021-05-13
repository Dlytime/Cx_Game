/**
 * UI管理框架
 * 依赖：所有要用本管理框架的窗口需要继承BaseUI
 * 常量定义：UIDefine
 * 功能：UI的显隐（支持resource动态加载和bundle加载）
 *      UI显示过度动画(弹出动画/关闭动画（待扩展）)
 *      窗口之间的通讯: 即时通讯、等待通讯
 *      队列(待) 事件缓存触发删除(待), 对话框链式调用(待)
 * 使用示例：UIManager.getInstance().showUI(uiClass);
 */
import {BaseUI,UIClass} from "../../UI/BaseUI";
import { UIAnimType, UIEmitType, UILoadType } from "../baseMgr/config/UIDefine";
import { cx_Define } from "../DataConfig/Game/Define";
import { EventMgr } from "../gameMgr/EventMgr";
import EventManager from "./EventManager";
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

    protected nodepools:any = {};
    protected uiWaitEmitList:Array<{"uiClass":UIClass<BaseUI>,"eventName":string,"emitType":UIEmitType,"info":any}> = [];
    protected uiList: BaseUI[] = [];
    protected uiRoot:cc.Node = null;
    protected uiRoot_Game:cc.Node = null;
    protected uiRoot_FixedUI:cc.Node = null;
    protected uiRoot_PopUp:cc.Node = null;
    protected uiRoot_TopTips:cc.Node = null;
    constructor() {
        EventMgr.addEventListener(cx_Define.EVENT.GAME_INIT_START,"UI",()=>{
            this.init();
        },this)
    }
    init() {
        this.uiRoot = cc.find("Canvas");
        this.uiRoot_Game = this.uiRoot.getChildByName("Game");
        this.uiRoot_FixedUI = this.uiRoot.getChildByName("FixedUI");
        this.uiRoot_PopUp = this.uiRoot.getChildByName("PopUp");
        this.uiRoot_TopTips = this.uiRoot.getChildByName("TopTips");
        if(!this.uiRoot_Game) this.uiRoot_Game = this._creatRootNode("Game");
        if(!this.uiRoot_FixedUI) this.uiRoot_FixedUI = this._creatRootNode("FixedUI");
        if(!this.uiRoot_PopUp) this.uiRoot_PopUp = this._creatRootNode("PopUp");
        if(!this.uiRoot_TopTips) this.uiRoot_TopTips = this._creatRootNode("TopTips");
    }
    logAllInfo() {
        cc.log("nodepools:",this.nodepools);
        cc.log("uiWaitEmitList:",this.uiWaitEmitList);
        cc.log("uiList:",this.uiList);
        cc.log(this.uiRoot_PopUp);
    }
    private _creatRootNode(name):cc.Node
    {
        let GameNode = new cc.Node(name);
        let widget = GameNode.addComponent(cc.Widget);
        widget.top = 0;
        widget.bottom = 0;
        widget.left = 0;
        widget.right = 0;
        this.uiRoot.addChild(GameNode);
        cc.log("创建UI根节点："+name);
        return GameNode;
    }
    setRootNode(node:cc.Node) {
        this.uiRoot = node;
    }
    showUI<T extends BaseUI>(uiClass:UIClass<T>,zIndex?:number,cb?:Function,onProgress?:Function,...args:any[]) 
    {
        let className = uiClass.getClassName();
        if(this.getUI(uiClass))
        {
            cc.log(className + " has exit");
            return;
        }
        this.loadPrefab(uiClass, (error, prefab)=>
        {
            if(error)
            {
                cc.error(error);
                return;
            }
            if(this.getUI(uiClass))
            {
                cc.log(className + " has exit");
                return;
            }
            //添加节点
            let uiNode: cc.Node = this.tryGetByNodePool(className);
            if(!uiNode) uiNode = cc.instantiate(prefab);
            let parent = this.getParent(uiClass);
            if(!parent) return cc.error(className + " not find parent");
            uiNode.parent = parent;
            //设置层级
            if (zIndex) { uiNode.zIndex = zIndex; }
            //获取管理类
            let ui = uiNode.getComponent(uiClass) as BaseUI;
            //管理类初始化
            ui.uiClass = uiClass;
            ui.init(args);
            this.uiOnShow(ui);
            //播放弹窗动画
            let animRoot = ui.getAnimRoot();
            if(animRoot) {
                let animType = uiClass.getUIAnimType();
                if(animType && animType.open) this.playOpenAnim(animRoot,animType.open);
            }
            //缓存窗口
            this.uiList.push(ui);

            if(cb){cb(ui, args);}
        },onProgress);
    }
    destroyUI<T extends BaseUI>(uiClass:UIClass<T>) {
        for(let i = 0; i < this.uiList.length; ++i)
        {
            if(this.uiList[i].uiClass === uiClass)
            {
                this.uiOnDestroy(this.uiList[i]);
                this.uiList[i].node.destroy();
                this.uiList.splice(i, 1);
                return;
            }
        }
    }	
    /**放到资源池 */
    async closeUI<T extends BaseUI>(uiClass:UIClass<T>) {
        for(let i = 0; i < this.uiList.length; ++i)
        {
            if(this.uiList[i].uiClass === uiClass)
            {
                let ui = this.uiList[i];
                let animType = ui.uiClass.getUIAnimType();
                if(animType && animType.close) await this.playCloseAnim(ui.getAnimRoot(),animType.close);
                this.uiOnClose(this.uiList[i]);
                let nodepool = this.getNodePool(uiClass.getClassName());
                nodepool.put( this.uiList[i].node);
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
            this.uiOnHide(ui);
            ui.node.active = false;
        }
    }
     /**
     * 给其它UI发送事件(多类型触发,只触发一次)
     * @param uiClass 发送事件的对象(若为null,则向管理器中所有的ui发送)
     * @param eventName 事件名
     * @param emitTypes 触发事件类型(数组类型,支持多类型触发)
     * @param info 附带信息
     */
      emitUI<T extends BaseUI>(uiClass:UIClass<T> = null,eventName:string,emitTypes:Array<UIEmitType>,info:any){
        if(uiClass === null) 
        {
            for (let i = 0; i < this.uiList.length; i++) {
                const ui = this.uiList[i];
                this._emitOneUiClass(ui.uiClass,eventName,emitTypes,info);
            }
        }
        else 
        {
            this._emitOneUiClass(uiClass,eventName,emitTypes,info);
        }
    }
    /**
     * 清空所有事件
     */
    clearAllEmit() {
        this.uiWaitEmitList = [];
    }
    getUI<T extends BaseUI>(uiClass: UIClass<T>): BaseUI
    {
        for(let i = 0; i < this.uiList.length; ++i)
        {
            if(this.uiList[i].uiClass === uiClass)
            {
                return this.uiList[i];
            }
        }
        return null;
    }
    private getUIByUICalss<T extends BaseUI>(uiClass:UIClass<T>):BaseUI 
    {
        for(let i = 0; i < this.uiList.length; ++i)
        {
            if(this.uiList[i].uiClass === uiClass)
            {
                return this.uiList[i];
            }
        }
    }
    private uiOnShow(ui:BaseUI) {
        ui.onShow();
        this._doUIWaitEmit(ui,UIEmitType.onShow);
    }

    private uiOnClose(ui:BaseUI) {
        ui.onClose();
        this._doUIWaitEmit(ui,UIEmitType.onClose);
    }
    private uiOnHide(ui:BaseUI) {
        ui.onHide();
        this._doUIWaitEmit(ui,UIEmitType.onHide);
    }
    private uiOnDestroy(ui:BaseUI) {
        //ui.onDestroy();cocos会执行
        this._doUIWaitEmit(ui,UIEmitType.onDestroy);
    }
    private _doUIWaitEmit(ui:BaseUI,emitType:UIEmitType) {
        for (let i = 0; i < this.uiWaitEmitList.length; i++) {
            const obj = this.uiWaitEmitList[i];
            if(obj.emitType !== emitType) continue;
            if(obj.uiClass === ui.uiClass) {
                return ui.receiveUIEmit(obj.eventName,obj.info);
            }
        }
    }
    private _emitOneUiClass<T extends BaseUI>(uiClass:UIClass<T>,eventName:string,emitTypes:Array<UIEmitType>,info:any) {
        for (let i = 0; i < emitTypes.length; i++) {
            const emitType = emitTypes[i];
            let ui = this.getUIByUICalss(uiClass);
            if(emitType === UIEmitType.now) {
                if(!ui) return cc.error(uiClass.getClassName() + "not exit,none to emit");
                ui.receiveUIEmit(eventName,info);
            } else if(emitType === UIEmitType.onShow || emitType === UIEmitType.onClose) {
                this.uiWaitEmitList.push({"uiClass":uiClass,"eventName":eventName,"emitType":emitType,"info":info})
            }
        }
    }
    private getNodePool(className:string):cc.NodePool
    {
        let nodepool = this.nodepools[className];
        if(!nodepool) nodepool = new cc.NodePool(className);
        this.nodepools[className] = nodepool;
        return nodepool;
    }
    private loadPrefab<T extends BaseUI>(uiClass:UIClass<T>,cb:Function,onProgress?:Function) 
    {
        let loadType = uiClass.getUILoadType();
        let url = uiClass.getUrl();
        if(loadType === UILoadType.resource)
        {
            cc.loader.loadRes(url,(completedCount: number, totalCount: number, item: any)=>{
                if(onProgress)
                {
                    onProgress(completedCount, totalCount, item);
                }
            }, (error, prefab)=>
            {
                cb(error,prefab);
            });
        }
        else if(loadType === UILoadType.bundle)
        {
            let bundleName = uiClass.getBundleName();
            let bundle =  cc.assetManager.getBundle(bundleName);
            if(!bundle) return cb("not find bundle " + bundleName,null);
            	
            bundle.load(url,cc.Prefab,(error,prefab)=>{
                cb(error,prefab);
            })
        }
    }
    private getParent<T extends BaseUI>(uiClass:UIClass<T>):cc.Node 
    {
        let name = uiClass.getUIFormType();
        return this["uiRoot_"+name];
    }
    private playOpenAnim(node:cc.Node,animType:UIAnimType) {
        if(!node) return;
        node.scale = 0;
        node.runAction(cc.scaleTo(0.3,1));
    }
    private async playCloseAnim(node:cc.Node,animType:UIAnimType):Promise<void>
    {
        return new Promise(async (resolve)=>{
            if(!node) return false;
            node.runAction(cc.sequence(
                    cc.scaleTo(0.3,0.3),
                    cc.callFunc(()=>{resolve();},this)
            )) 
        })
    }
    private tryGetByNodePool(className:string) {
        let node = null;
        let nodepool =  this.getNodePool(className);
        if(nodepool.size() > 0) {
            node = nodepool.get();
        }
        return node;
    }
}