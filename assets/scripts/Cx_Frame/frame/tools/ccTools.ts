import { TYPE_RES_TYPE, cx_Define } from "../DataConfig/Game/Define";

	
/**ccc工具类 */
class ccTools{
    /**
     * 获取自身节点下的坐标点在另一个节点下的坐标
     * @param {cc.Node} self 自身节点
     * @param {cc.Node} other 目标节点
     * @param {cc.Vec2||Array} point 转换的坐标(单个坐标或数组)
     */
     converToOtherNodePos(self:cc.Node,other:cc.Node,point:any,camera:cc.Camera) {
         function _converToOtherNodePos(self:cc.Node,other:cc.Node,point:any,camera:cc.Camera) {
            point = point?point:self.position;
        
            let pos = self.convertToWorldSpaceAR(point);
            let final = other.convertToNodeSpaceAR(pos);
            return final;
         }

         if(point instanceof cc.Vec2) return _converToOtherNodePos(self,other,point,camera);
         if(point.length >= 0)
         {
             let arr = [];
             for (let i = 0; i < point.length; i++) {
                 const pos = point[i];
                 arr.push(_converToOtherNodePos(self,other,pos,camera))
             }
             return arr;
         }
         return null;
    }
        /**
	* 遍历查找指定名称的节点
	* @param {cc.Node} node 
	* @param {string} name 
	*/
	seekNodeByName(node:cc.Node, name:string) {
		// body...
		if (node.name === name) return node
			var c = undefined
			node.children.forEach(element => {
			    if (!c) c = this.seekNodeByName(element, name)
			})
			return c;
    }
    /**节点截图 */
    screenNodeShot() {

    }

    /**
     * 获取map图层所有像素坐标点
     * @param {cc.TiledMap} map 
     * @param {String} Layername 
     */
    getLayerPixelPosArr(map:cc.TiledMap,Layername:string) {
        var pixelposarr = [];
 
        var mapsize = map.getMapSize();
        var tilesize = map.getTileSize();
        var collier = map.getLayer(Layername); 
 
        for (let i = 0; i < mapsize.width; i++) {
            for (let j = 0; j < mapsize.height; j++) {  
                var tag = collier.getTileGIDAt(i,j);
                if(tag > 0){
                    pixelposarr.push(this.getPixelPos(cc.v2(i,j),map));
                }
            }
        }
        cc.log("Layername: ",pixelposarr);
        return pixelposarr;
    }
/*     getLayerTilePosArr(map:cc.TiledMap,Layername:string){
        var tileposarr = [];
 
        var mapsize = map.getMapSize();
        var tilesize = map.getTileSize();
        var collier = map.getLayer(Layername); 
 
        var size = cc.size(mapsize.width*tilesize.width,mapsize.height*tilesize.height);
 
        for (let i = 0; i < mapsize.width; i++) {
            for (let j = 0; j < mapsize.height; j++) {  
                var tag = collier.getTileGIDAt(i,j);
                if(tag > 0){
                    tileposarr.push(cc.v2(i,j));
                }
            }
        }
        cc.log(tileposarr);
        return tileposarr;
    } */
 
    /**像素坐标转换为瓦片坐标 */
    getTilePos(map:cc.TiledMap,point:cc.Vec2){
        point = this.screenToOpengl(point,map);
        let mapSize = map.getMapSize();
        let tileSize = map.getTileSize();
        let x = Math.floor(point.x / tileSize.width);
        let y = Math.floor((mapSize.height * tileSize.height - point.y) / tileSize.height);
        return cc.v2(x, y);
    }
    screenToOpengl(point:cc.Vec2,map:cc.TiledMap) {
        let mapSize = map.getMapSize();
        let tileSize = map.getTileSize();
        let x = point.x + mapSize.width * tileSize.width / 2;
        let y = point.y + mapSize.height * tileSize.height / 2;
      
        return cc.v2(x, y);
      }
	
    /**
     * 瓦片坐标转换像素坐标
     * @param {cc.Vec2} tilespos 瓦片坐标
     * @param {cc.TiledMap} map 地图
     */
    getPixelPos(tilespos:cc.Vec2,map:cc.TiledMap) {
        var tilespos = tilespos;
        var mapnodepos = map.node.getPosition();
        var tilesize = map.getTileSize();
        var mapsize = map.getMapSize();
        var size = cc.size(mapsize.width*tilesize.width,mapsize.height*tilesize.height);
        var x = ((tilespos.x + 1) * tilesize.width - tilesize.width/2) - size.width/2 + mapnodepos.x;
        var y = size.height/2 - ((tilespos.y + 1) * tilesize.height - tilesize.height/2) + mapnodepos.y;
        return cc.v2(Math.floor(x),Math.floor(y));
    }

    /**加载本地图片 */
    loadLocalSf(path:string,cb:Function,args:Array<any> = []) {
        let url = path;
        cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
            if(err) console.error(err);
            if(typeof cb == "function" && spriteFrame instanceof cc.SpriteFrame) {
                cb(spriteFrame,...args);
            }
        });
    }

    /**加载远程服务器png图片*/
    loadRemoteSf(path,cb,args:Array<any> = []) {
        cc.loader.load(path, function (err, texture) {
            // Use texture to create sprite frame
            if(err) console.error(err);
            if(typeof cb == "function" && texture instanceof cc.Texture2D) {
                let spriteFrame = new cc.SpriteFrame(texture, new cc.Rect(0, 0, texture.width, texture.height));
                cb(spriteFrame,...args);
                return;
            }
            cb(null,...args);
        });
    }

    /**加载本地Json*/
    loadLocalJson(path:string,cb:Function,caller:any,args:Array<any> = []){
        cc.loader.loadRes(path, function (err, object) {
            if (err) {
                console.log(err);
                return;
            }
            if(typeof cb == "function") {
                //cb(object.json);
                cb.bind(caller,object.json,...args)();
            } 
            
        });
    }
    /**
     * 加载远程Json
     * @param {String} path 远程路径
     * @param {Function} cb 回调函数
     * @param {any} params 回调参数
     */
    loadRemoteJson(path:string,cb:Function,args:Array<any> = []) {
        cc.loader.load({ url: path, type: 'txt' }, (error, json) => {
            if (error) {
                console.log(error);
                return;
            }
            if(typeof cb == "function") cb(json,...args);
        });
    }
    /**加载本地音频 */
    loadLocalAudio(path:string,cb:Function,args:Array<any> = []) {
        cc.loader.loadRes(path, cc.AudioClip, function (err, clip) {
            if(typeof cb === "function") {
                if(clip instanceof cc.AudioClip) {
                    cb(clip,...args);
                } else {
                    cc.error(err);
                    cb(null,...args);
                }
            }
        });
    }
    /**加载远程音频 */
    loadRemoteAudio(path:string,cb:Function,args:Array<any> = []) {
        cc.loader.load(path, function (err, clip) {
            if(err) {
                console.error(err);
                if(typeof cb == "function") {
                    cb(null,...args)
                }
            } 
            else if(cb && clip instanceof cc.AudioClip) {
                cb(clip,...args);
            }
        });
    }

    /**动态加载预制体 */
    loadLocalPrefab(path:string,cb:Function,args:Array<any> = []) {
        cc.loader.loadRes(path, function (err, prefab) {
            if(err) console.error(err);
            if(typeof cb === "function") {
                if(prefab instanceof cc.Prefab) {
                    cb(prefab,...args);
                }
                else {
                    cb(null,...args);
                }
            }
        });
    }

    /**bundle加载资源 */
    bundleLoad(bundleName:string,path:string,type:TYPE_RES_TYPE,cb:Function,args:Array<any> = []) {
        let bundle =  cc.assetManager.getBundle(bundleName);
        if(!bundle) {
            console.error("not find bundle ",bundleName);
            return;
        }
        let newtype = cx_Define.getResType(type);
        bundle.load(path,newtype,(error,res:any)=>{
            if(error) console.error(error);
            if(res instanceof cc.Texture2D) {
                res = new cc.SpriteFrame(res, new cc.Rect(0, 0, res.width, res.height));
            }
            if(typeof cb === "function") cb(res,...args)();
        })
    }
    /**加载bundle文件夹下所有指定类型资源 */
    bundFolder(bundleName:string,path:string,type:TYPE_RES_TYPE,cb:Function,args:Array<any> = []) {
        let bundle =  cc.assetManager.getBundle(bundleName);
        if(!bundle) {
            console.error("not find bundle ",bundleName);
            return;
        }
        let newtype = cx_Define.getResType(type);
        bundle.loadDir(path, newtype, function (err, assets) {
            cb(assets);
        });
    }
    /**加载本地龙骨资源 返回 {"atlas":atlas,"asset":asset}*/
/*     loadLocalDragonBone(imageUrl,skeUrl,atlasUrl,cb,params) {
        cc.loader.loadRes(imageUrl, (error1, texture) => {
            cc.loader.loadRes(skeUrl, (error2, atlasJson) => {
                cc.loader.loadRes(atlasUrl, (error3, dragonBonesJson) => {
                    if(error1 || error2 || error3) {
                        console.error("dragonBones load faild: "+ imageUrl);
                        cb(null) ;
                    };
                    var atlas = new dragonBones.DragonBonesAtlasAsset();
                    atlas._uuid = atlasUrl;
                    atlas.atlasJson = dragonBonesJson.atlasJson; 
                    atlas.texture = texture;

                    var asset = new dragonBones.DragonBonesAsset();
                    asset._uuid = skeUrl;
                    asset.dragonBonesJson = atlasJson.dragonBonesJson;

                    if(typeof cb == "function") cb({"atlas":atlas,"asset":asset},params) ;
                });
            });
        });
    } */
/*     loadBundleDragonBone(bundleName,imageUrl,skeUrl,atlasUrl,cb,params) {
        let bundle =  cc.assetManager.getBundle(bundleName);
        bundle.load(imageUrl, cc.Texture2D, (error1, texture) => {
            bundle.load(skeUrl,dragonBones.DragonBonesAsset, (error2, atlasJson) => {
                bundle.load(atlasUrl,dragonBones.DragonBonesAtlasAsset, (error3, dragonBonesJson) => {
                    if(error1 || error2 || error3) {
                        console.error("dragonBones load faild: "+ imageUrl);
                        cb(null) ;
                    };
                    var atlas = new dragonBones.DragonBonesAtlasAsset();
                    atlas._uuid = atlasUrl;
                    atlas.atlasJson = dragonBonesJson.atlasJson; 
                    atlas.texture = texture;

                    var asset = new dragonBones.DragonBonesAsset();
                    asset._uuid = skeUrl;
                    asset.dragonBonesJson = atlasJson.dragonBonesJson;

                    if(typeof cb == "function") cb({"atlas":atlas,"asset":asset},params) ;
                });
            });
        });
    } */
    /**加载远程龙骨资源 返回 {"atlas":atlas,"asset":asset}*/
/*     loadRemoteDragonBone(imageUrl,skeUrl,atlasUrl,cb,params) {
        cc.loader.load(imageUrl, (error1, texture) => {
            cc.loader.load({ url: atlasUrl, type: 'txt' }, (error2, atlasJson) => {
                cc.loader.load({ url: skeUrl, type: 'txt' }, (error3, dragonBonesJson) => {
                    if(error1 || error2 || error3) {
                        console.error("dragonBones load faild: "+ imageUrl);
                        cb(null) ;
                    };
                    var atlas = new dragonBones.DragonBonesAtlasAsset();
                    atlas._uuid = atlasUrl;
                    atlas.atlasJson = atlasJson;
                    atlas.texture = texture;

                    var asset = new dragonBones.DragonBonesAsset();
                    asset._uuid = skeUrl;
                    asset.dragonBonesJson = dragonBonesJson;

                    if(typeof cb == "function") cb({"atlas":atlas,"asset":asset},params) ;
                });
            });
        });
    } */
}
export const cx_ccTools = new ccTools();