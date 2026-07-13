import { Combatant, CombatantProps } from './Combatant';

export interface MonsterProps extends CombatantProps { }

export class Monster extends Combatant {
    constructor(props: MonsterProps) {
        super({ ...props });
    }

    attack(target: Combatant): void {
        // todo
    }

    getState(): Record<string, unknown> {
        return {
            id: this.id,
            name: this.name,
            race: this.race,
            characterClass: this.characterClass,
            attributes: this.attributes,
            defenses: this.defenses,
            hp: this.hp,
            maxHp: this.maxHp,
        };
    }
}
