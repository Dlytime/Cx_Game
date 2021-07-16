
enum SortType {
    min_max = 1,
    max_min = 2,
}
export class jsTools{
    isArray(arr:Array<any>) {
        return typeof arr == 'object' && arr.constructor == Array;
    }
    deleteValueFromArr(arr:Array<any>,value:any) {
        if(!this.isArray(arr)) {
            console.error(arr," is not Array type")
        }
        let index = arr.indexOf(value);
        if(index >=0 ) arr.splice(index,1);
        else console.warn(value + "not find in ",arr);
    }
    /**对数组中的对象根据某个键值进行排序 */
    sortObj(arr:Array<{}>,key:string,type:SortType) {
        if(type == SortType.min_max) arr.sort((a, b) => a[key] - b[key]);
        else arr.sort((a, b) => b[key] - a[key]);
    }
    /**
     * 获取从min~max随机整数
     */
    getRandomNum(min:number,max:number){
        //parseInt(Math.random()*(max-min+1)+min,10);
        return  Math.floor(Math.random()*(max-min+1)+min);
    }
    /**检测数组是否存在undefined */
    checkArrHasUf(arr:Array<any>) {
        for (let i = 0; i < arr.length; i++) {
            if(arr[i] === undefined) return true;
        }
        return false;
    }
    /**深度拷贝对象数组 */
    deepCopy(o:any) {
        if (o instanceof Array) {
            var n = [];
            for (var i = 0; i < o.length; ++i) {
                n[i] = this.deepCopy(o[i]);
            }
            return n;

        } else if (o instanceof Object) {
            var u = {}
            for (var j in o) {
                u[j] = this.deepCopy(o[j]);
            }
            return u;
        } else {
            return o;
        }
    }
    /**
     * 获取角度对应的单位向量
     */
    getDirByAngle(angle:number):cc.Vec2
    {
        if(angle === 0) {
            return cc.v2(0,1);
        } 
        else if(Math.abs(angle) === 90) {
            return cc.v2(1,0);
        }
        else if(angle === 180) {
            return cc.v2(0,-1);
        } 
        else if(angle === 270) {
            return cc.v2(-1,0);
        }
        var l = angle*Math.PI/180;
        return cc.v2(Math.sin(l),Math.cos(l)).normalizeSelf();
    }
    /**
     * 获取dir与y轴的夹角
     * @param {cc.v2} dir 单位向量
     */
    getAngleByDir(dir:cc.Vec2){
        let len_x = dir.x;
        let len_y = dir.y;
        if(len_y === 0) {
            if(len_x < 0) {
                return 270;
            } else if(len_x > 0) {
                return 90
            }
            return 0;
        }
        if(len_x === 0) {
            if(len_y >=0) {
                return 0;
            } else  if(len_y < 0) {
                return 180;
            }
        }
 
        let tan_yx = Math.abs(len_y)/Math.abs(len_x);
        let angle = 0;
        if(len_y > 0 && len_x < 0) {
            angle = 270 + Math.atan(tan_yx) * 180/Math.PI;
        } else  if(len_y > 0 && len_x > 0) {
            angle = 90 - Math.atan(tan_yx) * 180/Math.PI;
        } else if(len_y < 0 && len_x < 0) {
            angle = 270 - Math.atan(tan_yx) * 180 / Math.PI;
        } else if(len_y < 0 && len_x > 0) {
            angle = Math.atan(tan_yx) * 180/Math.PI + 90;
        }
        return angle;
    }
    	
    getTwoPointAngle(p1:cc.Vec2,p2:cc.Vec2):number
    {
        var dot = p1.x * p2.x + p1.y * p2.y;
        var det = p1.x * p2.y - p1.y * p2.x;
        var angle = Math.atan2(det, dot) / Math.PI * 180;
        return angle;//(angle + 360) % 360;
    }
    creatCircle(pos,r:number,interval_angle:number):Array<cc.Vec2> 
    {
        let angleX = interval_angle || 20;
        var path = [];
        let angle = 0;
        for (let i = 0; i < 360/angleX + 1; i++) {
            let x = parseInt(pos.x + r * Math.cos(angle * 3.14 / 180));
            let y = parseInt(pos.y + r * Math.sin(angle * 3.14 /180));
            path.push(cc.v2(x,y));
            angle = angle + angleX;
        }
        path.push(pos);
        return path;
     }
    getTriangleArea(a,b,c){  
        return Math.abs((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)) / 2;   //应用叉积的定义推出的 
    }
    getPolygonArea(points){
        let n = points.length;
        let sumS = 0;
        for(let i = 0; i <= n - 2; i++)
            sumS += this.getTriangleArea(points[1], points[i], points[i + 1]);　　// n-2个三角形的面积和
        return sumS;
    }
 
    //时间类方法:所有返回值都为字符串或数值类型
 
    /**
     * 获取当前时间
     * @param {string} exact 获取时间精确度exact(年:y,月:M,日:d,时:h,分:m,秒:s), 格式 yyyy-MM-dd HH:mm:ss
     */
    getCurTime(exact) {
        let date = new Date();
        let str =  this.timeFormat(date,this._getExactStr(exact));
        return str;
    }
    /**将时间戳转换为日期 exact:年:y,月:M,日:d,时:h,分:m,秒:s*/
    getDateByTimestamp(nS,exact) {
        let date = new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
        return this.timeFormat(date,exact);
    }
    /**获取当前月份 */
    getCurMonth() {
        return new Date().getMonth() + 1;
    }
    /**获取当前年 */
    getCurYear() {
        return new Date().getFullYear();
    }
    /**获取当前日 */
    getCurDay() {
        return new Date().getDate();
    }
    /**获取当前小时 */
    getCurHour() {
        return new Date().getHours();
    }
    /**获取当前分 */
    getCurMin() {
        return new Date().getMinutes();
    }
    /**获取当前秒 */
    getCurSeconds() {
        return new Date().getSeconds();
    }
    /**
     * 获取两个时间的时间间隔(ios字符串转日期需将 - 替换为 /，用时间戳)
     * @param {Date} startDate 起始日期(字符串自动转日期)
     * @param {Date} endDate 结束日期
     * @param {str} exact 返回精确度(d,h,m,s,ms)
     */
/*     getTwoDateInterval(startDate:any,endDate:any,exact) {
        if(startDate instanceof Date && endDate instanceof Date)
        {
            let ms:any = endDate - startDate;
            return this._transMs(ms,exact);
        }
        else 
        {
            if(typeof startDate == "string")  startDate.replace("-","/");
            if(typeof endDate == "string") endDate.replace("-","/");
            endDate = new Date(endDate);
            startDate = new Date(startDate);
            if(startDate instanceof Date && endDate instanceof Date)
            {
                let ms = endDate - startDate;
                return this._transMs(ms,exact);
            }
        }
        console.error("input date can not tansTo Date,please check format",startDate,endDate);
        return null;
    } */
    /**
     * 日期加减计算
     * @param {Date} date 日期
     * @param {number} num 数值
     * @param {string} type 类型(y,M,d,h,m,s)
     * @param {string} exact 返回值精确度(y,M,d,h,m,s)
     */
    dateCount(date:Date,num:string,type,exact) {
        if(typeof date == "string") date = new Date(date);
        if(date instanceof Date) 
        {
            let tmp = date;
            let obj = {"y":"FullYear","M":"Month","d":"Date","h":"Hours","m":"Minutes","s":"Seconds"};
            let fun = obj[type];
            tmp["set"+fun](tmp["get"+fun]() + num);
            let str =  this.timeFormat(tmp,this._getExactStr(exact));
            return str;
        }
    }
    timeFormat(date,fmt) {
        let tmp = this._getExactStr(fmt);
        fmt = tmp?tmp:fmt;
        var o = {
            "M+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "H+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    _getExactStr(exact) {
        let str = null;
        switch (exact) {
            case "y":
                str = "yyyy";
                break;
            case "M":
                str = "yyyy-MM";
                break;
            case "d":
                str = "yyyy-MM-dd";
                break;
            case "h":
                str = "yyyy-MM-dd HH";
            case "m":
                str = "yyyy-MM-dd HH:mm";
                break;
            case "s":
                str = "yyyy-MM-dd HH:mm:ss";
                break;
            default:
                console.warn("please input exact to get time")
                return null;
        }
        return str;
    }
    _transMs(ms,exact) {
        let result = null;
        switch (exact) {
            case "d":
                result = ms/1000/60/60/24;
                break;
            case "h":
                result = ms/1000/60/60;
            case "m":
                result = ms/1000/60;
                break;
            case "s":
                result = ms/1000;
                break;
            case "ms":
                result = ms;
                break;
            default:
                console.error("please input exact to trans ms")
                return null
        }
        return result;
    }
 
}
export const cx_jsTools = new jsTools();