/**技能事件 */
export enum SkillCtrlEvent {
    /**前摇 */
    preparation = "preparation",
    /**释放 */
    fire = "fire",
    /**伤害 */
    harm = "harm",
    /**后摇 */
    recover = "recover",
    /**施法完成 */
    complete = "complete",
    /**施法中断 */
    break= "break",
    /**拥有者出生 */
    born= "born",
    /**拥有者死亡 */
    death= "death",
    /**技能开启 */
    OnToggleOn="onToggleOn",
    /**技能关闭 */
    OnToggleOff="onToggleOff",
}