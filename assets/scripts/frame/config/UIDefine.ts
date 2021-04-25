/**窗体类型 */
export enum UIFormType {
    /** 屏幕 */
    Screen,
    /** 固定窗口 */
    FixedUI,
    /** 弹出窗口 */
    PopUp,
    /** 独立窗口 */
    TopTips,
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
/** UI弹出动画类型 */
export enum UIAnimType {
    none = 0,
    scale = 1,
}
/** 常量 */
export class UISysDefine {

}