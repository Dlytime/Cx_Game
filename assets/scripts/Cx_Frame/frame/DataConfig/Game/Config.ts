import { TYPE_RES_LOAD_TIME, TYPE_RES_TYPE } from "./Define";

/**游戏配置 */
export class cx_Config_Game {
    public static readonly version:string = "1.0.0";
    public static logEnable:Boolean = true;
    public static MaxGold = 9999;
    public static MaxPower = 99;
    public static MaxDiamond = 99;

    public static ResPreLoadConfig = 
    {
        remote:
        {
            sfs:[/* {name:"",path:"",loadTime:""} */],
        },
        bundle:
        {
            bundleName:
            {
                sfs:[],
            }
        },
        resource:
        {
            ui:[]
        }
    }
}

export interface Form_ResLoad {
    bundleName?:string
    resName:string;
    url:string;
    resType:TYPE_RES_TYPE;
    loadTime?:TYPE_RES_LOAD_TIME;//默认为loading类型
}
interface Form_Res_Preload_bundle {
    gameRes:{sfs:Array<Form_ResLoad>}
}
/**资源配置 */
export class cx_Config_Res {
    public static readonly bundleArr:Array<string> = ["gameRes"];
/*     public static readonly preload_remote:Array<Form_ResLoad> = 
    [

    ] */
    public static readonly preload_bundle:Array<Form_ResLoad> = 
    [
        {bundleName:"gameRes",resName:"logo",url:"sfs/logo",resType:TYPE_RES_TYPE.sfs}
    ]
    public static readonly preload_resource:Array<Form_ResLoad> = 
    [
        {resName:"icon",url:"sfs/icon",resType:TYPE_RES_TYPE.sfs}
    ]
}