	
/**音频管理 */
export class AudioManager{
    private static _instance:AudioManager = null;

    private registSoundInfoArr:Array<any> = [];//[{name:null,clip:null,loop:null,volume:null}]
    private curBgmName:String = "";

    public static getInstance():AudioManager 
    {
        if(this._instance == null)
        {
            this._instance = new AudioManager();
        }
        return this._instance;
    }

    constructor() {

    }
    registSound(clip:cc.AudioClip,loop:boolean,volume = 1,name = clip.name) 
    {

    }
    unRegistSound(name:String) {

    }
    public getRegistSound(name:String):Object 
    {
        return
    }
    public playRegistSound(name:String):Boolean 
    {
        return 
    }
    public rePlayRegistSound(name:String):Boolean 
    {
        return 
    }
    public stopRegistSound(name:String) {

    }
    public pauseRegistSound(name:String) {

    }

    public playBgm(clip:cc.AudioClip,volume = 1,loop = true) 
    {

    }
    public rePlayBgm(clip:cc.AudioClip,volume = 1,loop = true) 
    {

    }
    public playEffect(clip:cc.AudioClip,volume = 1,loop = false) 
    {

    } 
    public rePlayEffect(clip:cc.AudioClip,volume = 1,loop = false) 
    {

    }
    public stop(clip:cc.AudioClip) 
    {

    }

    public pause(clip:cc.AudioClip) 
    {

    }
    public resume(clip:cc.AudioClip) {

    }
    public stopAll() 
    {

    }
    public pauseAll() 
    {

    }
    public resumeAll() 
    {

    }
    public setVolume(clip,volume) 
    {

    }
}