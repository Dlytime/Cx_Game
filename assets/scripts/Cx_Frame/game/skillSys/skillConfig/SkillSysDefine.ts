/**技能系统自定义类型 */

/**技能释放类型 */
export const Skill_FireType = cc.Enum({
    /**近程:需要角色维持施法动作才能触发伤害的技能 */
    short:0,
    /**远程:无需角色维持施法动作，释放完后技能自行判断施加技能效果 */
    remote:1,
    /**直接作用角色*/
    buff:2
})

/**技能搜寻目标类型 */
export const Skill_SearchTargetType = cc.Enum({
    /**单体目标 */
    one : 0,
    /**范围目标 */
    range : 1,
    /**释放前锁定目标 */
    lock : 2
})

/**技能范围类型 */
export const skill_RangeType = cc.Enum({
    /**矩形类型：以起点start(一般为施法者)，施法者朝向方向一定长(length)宽(width)高(height)的所有敌人*/
    rect : 0,
    /**圆形类型：start,radius */
    circle : 1,
})
export interface skillDataStru_Range{
    start:"self"|"skill",
    length:number,
    width:number,
    height:number,
    radius:number,
}
/**技能作用目标类型 */
export const Skill_FireTargetType = cc.Enum({
    /**敌方 */
    enemy : 0,
    /**友方 */
    frend : 1,
})
export const Skill_FireCondition = cc.Enum({
    
})

