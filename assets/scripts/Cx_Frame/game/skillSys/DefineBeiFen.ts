/**技能系统自定义类型 */

/**技能释放类型 */
export enum Skill_FireType {
    /**近程:需要角色维持施法动作才能触发伤害的技能 */
    short = "short",
    /**远程:无需角色维持施法动作，释放完后技能自行判断施加技能效果 */
    remote = "remote",
    /**直接作用角色*/
    buff = "buff"
}

/**技能搜寻目标类型 */
export enum Skill_SearchTargetType {
    /**单体目标 */
    one = "one",
    /**范围目标 */
    range = "range",
    /**释放前锁定目标 */
    lock = "lock"
}

/**技能范围类型 */
export enum skill_RangeType{
    /**矩形类型：以起点start(一般为施法者)，施法者朝向方向一定长(length)宽(width)高(height)的所有敌人*/
    rect = "rect",
    /**圆形类型：start,radius */
    circle = "circle",
}
export interface skillDataStru_Range{
    start:"self"|"skill",
    length:number,
    width:number,
    height:number,
    radius:number,
}
/**技能作用目标类型 */
export enum Skill_FireTargetType {
    /**敌方 */
    enemy = "short",
    /**友方 */
    frend = "frend",
}

/**技能释放事件 */
export enum Skill_ContrlEvent {
    /**前摇 */
    preparation = "preparation",
    /**释放 */
    fire = "fire",
    /**伤害 */
    harm = "harm",
    /**后摇 */
    recover = "recover",
    /**结束施法 */
    endFire = "endFire"
}


