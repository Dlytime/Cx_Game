	
/**音频管理 */
export class EventManager{
    private static _instance:EventManager = null;

    public static getInstance():EventManager 
    {
        if(this._instance == null)
        {
            this._instance = new EventManager();
        }
        return this._instance;
    }

    constructor() {

    }

}