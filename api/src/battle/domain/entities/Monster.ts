import { Combatant, CombatantProps } from './Combatant';
import { Attribute } from '@/shared/domain/enums/AttributesEnum';
import { DamageTypes } from '../types/DamageType';
import { Attack } from '../value-objects/Attack';

export interface MonsterProps extends CombatantProps { }

export class Monster extends Combatant {
    constructor(props: MonsterProps) {
        super({ ...props });
    }

    attack(target: Combatant): void {
        // to do
        const strength = this.attributes?.[Attribute.STRENGTH] || 0;
        const damageAmount = Math.max(1, Math.floor(strength / 2));
        const attack = new Attack({ [DamageTypes.PHYSICAL]: damageAmount });
        target.takeDamage(attack);
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
