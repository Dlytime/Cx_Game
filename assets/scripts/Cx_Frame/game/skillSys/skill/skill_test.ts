import skillActorMgrBase from "../skillActor/skillActorMgrBase";
import { SkillCtrlEvent } from "../skillConfig/SkillEvent";
import skillBase from "./skillBase";

export default class skill_test extends skillBase {
    public readonly skillName: string = "skill_test";
    public owner: skillActorMgrBase;
   
    public valueData: any;
    public typeData: any;
    public controlData: any;

    init() {

    }
}
