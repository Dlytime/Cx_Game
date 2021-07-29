import skillActorMgrBase from "../skillActorMgrBase";
import { SkillCtrlEvent } from "../skillConfig/SkillEvent";
import skillBase from "./skillBase";

export default class skill_test_bullet extends skillBase {
    public readonly skillName: string = "skill_test_bullet";
    public owner: skillActorMgrBase;
   
    public valueData: any;
    public typeData: any;
    public controlData: any;

    init() {

    }
}
