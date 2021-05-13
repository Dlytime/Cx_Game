import { BaseUI } from "../../../UI/BaseUI";
import { TYPE_RES_LOAD_TIME, TYPE_RES_TYPE } from "./Define";

/**游戏配置 */
export class cx_Config {
    public static readonly version:string = "1.0.0";
    public static readonly bundle = [/* "resource", */"gameRes"];
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

interface Form_ResLoad {
    name:string;
    url:string;
    resType:TYPE_RES_TYPE;
    loadTime:TYPE_RES_LOAD_TIME;
}
export class Config_Res {
    public static readonly remote:{sfs:Array<Form_ResLoad>} = 
    {
        sfs:[],
    }
    public static readonly bundle:
    {
        gameRes:
        {

        }
    }
}