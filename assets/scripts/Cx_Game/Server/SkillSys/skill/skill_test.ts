import skillActorEntityConnect from "../A_Connect/skillActorEntityConnect";
import skillBase from "./skillBase";

export default class skill_test extends skillBase {
    public readonly skillName: string = "skill_test";
    public owner: skillActorEntityConnect;
   
    public valueData: any;
    public typeData: any;
    public controlData: any;

    init() {

    }
}
