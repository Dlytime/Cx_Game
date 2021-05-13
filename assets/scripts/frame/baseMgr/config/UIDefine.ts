/**窗体类型 */
export enum UIFormType {
    /** 游戏层 */
    Game = "Game",
    /** 固定窗口 */
    FixedUI = "FixedUI",
    /** 弹出窗口 */
    PopUp = "PopUp",
    /** 独立窗口 */
    TopTips = "TopTips",
}
/**透明度类型 */
export enum UIModalOpacity {
    /** 没有mask, 可以穿透 */
    None,
    /** 完全透明，不能穿透 */
    OpacityZero,
    /** 高透明度，不能穿透 */
    OpacityLow,
    /** 半透明，不能穿透 */
    OpacityHalf,
    /** 低透明度, 不能穿透 */
    OpacityHigh,
    /** 完全不透明 */
    OpacityFull,
}
/** UI的状态 */
export enum UIState {
    None = 0,
    Loading = 1,
    Showing = 2,
    Hiding = 3
}
/** UI弹出/关闭动画类型 */ 
export enum UIAnimType {
    none = "", 
    scale = "scale",
}
/** UI加载类型 */
export enum UILoadType {
    none = 0, 
    resource = 1,
    bundle = 2,
}
/** UI触发事件类型 */
export enum UIEmitType {
    now = 0, 
    onShow = 1,
    onClose = 2,
    onHide = 3,
    onDestroy = 4,
}

/** 动画action */
export class UIAnimTween {
    scale_open():cc.Tween {
        return 
    }
    scale_close(resolve:any):cc.Tween {
        return 
    }
}