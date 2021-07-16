/**
 * A*算法核心流程：
 *      1、从开启列表中获取到最小耗费f的节点，将该节点切换到关闭列表作为当前格（若开启列表为空找不到最小节点，则代表无路可走，返回空）
 *      2、检测当前格（检测 四/八 方向位置，去除已在关闭列表和障碍物列表中位置，剩余位置若未在开启列表则放入，已在开启列表则判断新的H值是否更小，更小则改变其父节点未当前格，计算新的耗费值）
 *      3、重复以上步骤，直到找到结束位置
 *  优化点：
 *      1、把开启列表数据结构改为二叉最小堆 
 *      2、路径平滑处理：弗洛伊德平滑算法/遍历之前先“判断两点间有无障碍物”，适用PC/遍历得到的路径，若某点间和上一点中无障碍物则将该点从路径列表中移除
 *      3、点击不可到达位置处理:将不可移动点设置超大代价/寻找最近替代点/引入埋葬深度概念，每次点击新的不可到达点记录其埋葬深度
 *      4、IDA* /最佳优先搜索/跳点搜索
 *      5、搜索出来的路线总是贴边走问题
 */
class StarNode{
    public point:cc.Vec2;
    public parent:StarNode;
    public g:number;
    public h:number;
    public f:number;
    public constructor(point:cc.Vec2,parent:StarNode,g:number,h:number,f:number){
        this.point = point;
        this.parent = parent;
        this.g = g;
        this.h = h;
        this.f = f;
    }
}

class MinBinaryHeaps{
    private _arr:Array<StarNode> = [];

    public get size(){
        return this._arr.length - 1;
    }
    public getArr(){
        return this._arr;
    }
    public findPoint(point:cc.Vec2){
        for (let i = 0; i < this._arr.length; i++) {
            const element = this._arr[i];
            if(element.point.x == point.x && element.point.y == point.y){
                return element;
            }
        }
        return null;
    }
    public push(node:StarNode){
        this._arr.push(node);
        this.upAdjust();
    }
    public shift(){
        if(this._arr.length>0){
            const tmp = this._arr[0];
            this._arr.shift();
            var t = [1];
            t.shift();
            this.downAdjust(0);
            return tmp;
        }
    }
    public pop(){

    }

    private upAdjust(){
        var array = this._arr;
        let childIndex = array.length-1;

        let parentIndex = Math.floor(childIndex/2);
     
        // temp保存插入的叶子节点值，用于最后的赋值
     
        let temp = array[childIndex];
     
        while (childIndex > 0 && temp.f < array[parentIndex].f)
        {
     
            //无需真正交换，单向赋值即可
     
            array[childIndex] = array[parentIndex];
     
            childIndex = parentIndex;
     
            parentIndex = Math.floor(parentIndex / 2);
     
        }
     
        array[childIndex] = temp;
    }

    private downAdjust(parentIndex:number) {
        if(this._arr.length === 0) return;
        var array = this._arr;
        var length = this._arr.length - 1;
        // temp保存父节点值，用于最后的赋值
        let temp = array[parentIndex];
        let childIndex = 2 * parentIndex + 1;
        while (childIndex < length) {
     
            // 如果有右孩子，且右孩子小于左孩子的值，则定位到右孩子
     
            if (childIndex + 1 < length && array[childIndex + 1].f < array[childIndex].f) {
                childIndex++;
            }
     
            // 如果父节点小于任何一个孩子的值，直接跳出
     
            if (temp.f <= array[childIndex].f)
                break;
     
            //无需真正交换，单向赋值即可
            array[parentIndex] = array[childIndex];
            parentIndex = childIndex;
            childIndex = 2 * childIndex + 1;
        }
        array[parentIndex] = temp;
     
     }

}
export default  class Astar{
    private _gridSize:cc.Size;
    private _barrierArr:Array<cc.Vec2>;
    private _startPoint:cc.Vec2;
    private _endPoint:cc.Vec2;
    private _isAllowDiag:boolean;
    private _openHead:MinBinaryHeaps = new MinBinaryHeaps();
    private _closeArr:Array<StarNode> = [];
    private _path:Array<cc.Vec2> = [];
    private _heuristic:Function = this.manhattan;
    private _straightCost:number = 10;
    private _diagCost:number = 14;


    public constructor(gridSize:cc.Size,barrierArr:Array<cc.Vec2>,startPoint:cc.Vec2,endPoint:cc.Vec2,isAllowDiag:boolean = false){
        this._gridSize = gridSize;
        this._barrierArr = barrierArr;
        this._startPoint = startPoint;
        this._endPoint = endPoint;
        this._isAllowDiag = isAllowDiag;
    }
    
    public findPath(){
        this._openHead.push(new StarNode(this._startPoint,null,0,this._heuristic(this._startPoint),this._heuristic(this._startPoint)))
        this.search();
        return this.floyd();
    }
    private search(){
        let node = this.getMinValueNode();
        if(node === null || node === undefined){
            return [];
        } 
        this._closeArr.push(node);
        if(this.checkCurrentGrid(node)){
            return this.getPath(this._closeArr[this._closeArr.length - 1]);
        }
        return this.search();
    }
    private getMinValueNode():StarNode{
        var node = this._openHead.shift();
        return node;
    }
    private getPath(node:StarNode):Array<cc.Vec2>
    {
        var tmp = [];
        if(node === null || node === undefined) return [];
        this._path.push(node.point);
        if(node.parent.point.x == this._startPoint.x && node.parent.point.y == this._startPoint.y){
            //排序
            this._path.push(node.parent.point);
            for (let i = 0; i < this._path.length; i++) {
                var pos = this._path[i];
                tmp[this._path.length - 1 - i] = pos;
            }
            this._path = tmp;
            return tmp;
        }
        return this.getPath(node.parent);
    }
    private checkCurrentGrid(node:StarNode):boolean{
        const pos = node.point;
        if(this._isAllowDiag){
            var arr = [{x:pos.x+1,y:pos.y},{x:pos.x-1,y:pos.y},{x:pos.x,y:pos.y+1},{x:pos.x,y:pos.y-1},
                {x:pos.x+1,y:pos.y+1},{x:pos.x-1,y:pos.y+1},{x:pos.x+1,y:pos.y-1},{x:pos.x-1,y:pos.y-1}];
        }else{
            var arr = [{x:pos.x+1,y:pos.y},{x:pos.x-1,y:pos.y},{x:pos.x,y:pos.y+1},{x:pos.x,y:pos.y-1}];
        }

        for (let i = 0; i < arr.length ; i++) {
            const element = cc.v2(arr[i].x,arr[i].y);
            if(this.isClosed(element) || this.isBarrier(element) || this.isOverBorder(element)){
                continue;
            }else{
                var h = this._heuristic(element);
                if(element.x - pos.x !== 0 && element.y - pos.y !== 0){
                     var gl = this._diagCost;
                }else{
                     var gl = this._straightCost;
                }
                //var g = gtype * Math.abs(startPos.x - element.x);
                //var f = h + g;
                var node_open = this.isOpen(element);
                if(node_open){
                    var new_g = node.g + gl;
                    if(new_g <node_open.g){
                        node_open.parent = node;
                        node_open.g = new_g;
                        node_open.h = h;
                        node_open.f = new_g + h;
                    }
                }else{
                    let tmpg = gl + node.g;
                    let tmph = h;
                    let tmpf = tmpg + tmph;
                    
                    let tmpnode = new StarNode(element,node,tmpg,tmph,tmpf);

                    this._openHead.push(tmpnode);

                    if(tmpnode.point.x == this._endPoint.x && tmpnode.point.y == this._endPoint.y){
                        this._closeArr.push(tmpnode);
                        return true;
                    } 
                }
            }
        }
        return false;
    }
	private isOpen(point:cc.Vec2):StarNode
	{
        return this._openHead.findPoint(cc.v2(point.x,point.y));
	}
	private isClosed(point:cc.Vec2):boolean
	{
		for(var i = 0; i < this._closeArr.length; i++)
		{
			if(this._closeArr[i].point.x == point.x && this._closeArr[i].point.y == point.y)
			{
				return true;
			}
		}
		return false;
    }
    private isBarrier(point:cc.Vec2):boolean
	{
		for(var i = 0; i < this._barrierArr.length; i++)
		{
			if(this._barrierArr[i].x == point.x && this._barrierArr[i].y == point.y)
			{
				return true;
			}
		}
		return false;
    }
    private isOverBorder(point:cc.Vec2):boolean
    {
        if(point.x>=0 && point.y>=0 && point.x<=this._gridSize.width - 1 && point.y <=this._gridSize.height - 1){
            return false;
        }
        return true;
    };
	//曼哈顿算法
	private manhattan(point:cc.Vec2)
	{
		return Math.abs(point.x - this._endPoint.x) * this._straightCost + Math.abs(point.y + this._endPoint.y) * this._straightCost;
	}
		

	private euclidian(point:cc.Vec2)
	{
		var dx = point.x - this._endPoint.x;
		var dy = point.y - this._endPoint.y;
		return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
	}
		
	private diagonal(point:cc.Vec2)
	{
		var dx = Math.abs(point.x - this._endPoint.x);
		var dy = Math.abs(point.y - this._endPoint.y);
		var diag = Math.min(dx, dy);
		var straight = dx + dy;
		return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
    }

    public floyd()
    {
        //去除共线点
        var path = this._path;
        if(path === null) return;
        var _floydPath = path.concat();
        var len = _floydPath.length;
        if(len > 2)
        {
            var arr = [];
            var sum = 0;
            for(let i = len - 1; i>=2; i--)
            {
                arr = [_floydPath[i],_floydPath[i-1],_floydPath[i-2]];
                if(arr[1].x - arr[0].x == arr[2].x - arr[1].x 
                    && arr[1].y - arr[0].y == arr[2].y - arr[1].y)
                {
                    this._path.splice(i-1,1);
                }
            }
        }
        //去除拐点
        path = this._path.concat();
        len = path.length;
        if(len>2)
        {
            
            for(let i = len - 1; i>=0; i--)
            {
                for(let j = 0; j<=i - 2; j++)
                {
                    var point1 = path[i];
                    var point2 = path[j];
                    var o = this.hasBarrier(point2,point1);
                    if(o === false)
                    {
                        for(let k = i-1; k>j; k--)
                        {
                            this._path.splice(k,1);
                        }
                        i = j;
                        break;
                    }
                }

            }
        }
        return this._path;
    }

    //判断两点之间是否有障碍物
    public hasBarrier(startPoint:cc.Vec2,endPoint:cc.Vec2):boolean
    {
        const startX = startPoint.x;
        const startY = startPoint.y;
        const endX = endPoint.x;
        const endY = endPoint.y;

        if(startX == endX && startY == endY) return false;

        //中心点
        var point1 = cc.v2(startX + 0.5,startY + 0.5);
        var point2 = cc.v2(endX + 0.5,endY + 0.5);

        //横向、垂直距离
        var distX = Math.abs(endX - startX);
        var distY = Math.abs(endY - startY);

        //遍历方向
        var traverseDir = distX > distY ? true : false;

        var linefunc:Function;
        var loopStart:any;
        var loopEnd:Number;
        var passPointArr:Array<cc.Vec2> = [];
        if(traverseDir)
        {
            //横向遍历
            linefunc = this.getEquationTwo(point1,point2,0);
            loopStart = Math.min(startX,endX);
            loopEnd = Math.max(startX,endX);
            for (let i = loopStart; i <= loopEnd; i++) {
                //由于线段方程是根据终起点中心点连线算出的，所以对于起始点来说需要根据其中心点  
                //位置来算，而对于其他点则根据左上角来算  
                if(i == loopStart) i += 0.5;
                let y = linefunc(i);
                passPointArr = this.getPointUnder(cc.v2(i,y));
                for (let j = 0; j < passPointArr.length; j++) {
                    const element = passPointArr[j];
                    if(this.isBarrier(element)) return true;
                }
                if(i == loopStart + 0.5) i -= 0.5;
            }
        }
        else
        {
            //纵向遍历
            linefunc = this.getEquationTwo(point1,point2,1);
            loopStart = Math.min(startY,endY);
            loopEnd = Math.max(startY,endY);
            for (let i = loopStart; i <= loopEnd; i++) {
                if(i == loopStart) i += 0.5;
                passPointArr = this.getPointUnder(cc.v2(linefunc(i),i));
                for (let j = 0; j < passPointArr.length; j++) {
                    const element = passPointArr[j];
                    if(this.isBarrier(element)) return true;
                }
                if(i == loopStart + 0.5) i -= 0.5;
            }
        }
        return false;
    }
    //获得某一点共享的点
    private getPointUnder(point:cc.Vec2):Array<cc.Vec2>
    {
        const xPos = point.x;
        const yPos = point.y;
        var result:Array<cc.Vec2> = [];  
        var xIsInt:Boolean = point.x% 1 == 0;  
        var yIsInt:Boolean = point.y% 1 == 0;  
                          
        //点由四节点共享情况  
        if(xIsInt&&yIsInt)  
        {
             result[0] =cc.v2( xPos - 1, yPos - 1);  
             result[1] =cc.v2( xPos, yPos - 1);  
             result[2] =cc.v2( xPos - 1, yPos);  
             result[3] =cc.v2( xPos, yPos);  
            //
            //if(this._isAllowDiag) result = [];
        }  
        //点由2节点共享情况  
        //点落在两节点左右临边上  
        else if(xIsInt&& !yIsInt)  
        {  
             result[0] =cc.v2( xPos - 1,Math.floor(yPos) );  
             result[1] =cc.v2( xPos,Math.floor(yPos) );  
        }  
        //点落在两节点上下临边上  
        else if( !xIsInt&&yIsInt)  
        {  
             result[0] =cc.v2(Math.floor(xPos), yPos - 1 );  
             result[1] =cc.v2(Math.floor(xPos), yPos );  
        }  
        //点由一节点独享情况  
        else  
        {  
             result[0] =cc.v2(Math.floor(xPos),Math.floor(yPos) );  
        }  
                          
            return result;  
    }
    /*根据两点求得二元一次方程式函数,type:0 根据x求y，1:根据y求x
        y1 = ax1 + b;  => a = (y1 - y2)/(x1 - x2)
        y2 = ax2 + b;  => b = y2 - x2 * (y1 - y2)/(x1 - x2)
        y = ax + b; x = (y - b)/a;
    */
    public getEquationTwo(point1:cc.Vec2,point2:cc.Vec2,type:number):Function
    {
        var resultFunc = null;
        if(point1.x == point2.x && point1.y == point2.y) {
            cc.error("point1 == point2,no equation exit");
        }

        if(point1.x == point2.x)
        {
            if(type == 0) {
                cc.error("两点垂直X轴，无法根据x求得y");
            }else{
                return resultFunc = function(x:number){
                    return point1.x
                }
            }
        }

        if(point1.y == point2.y)
        {
            if(type == 1) {
                cc.error("两点垂直Y轴，无法根据y求得x");
            }else{
                return resultFunc = function(y:number){
                    return point1.y
                }
            }
        }

        const a = (point1.y - point2.y)/(point1.x - point2.x);
        const b = point2.y - point2.x * a;
        if(type == 0)
        {
            resultFunc = function(x:number){
                return a*x + b;
            }
        }
        else
        {
            resultFunc = function(y:number){
                return (y - b)/a;
            }
        }
        return resultFunc;
    }
}