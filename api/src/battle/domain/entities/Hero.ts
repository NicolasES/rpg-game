import { Attribute, AttributeValues } from '@/shared/domain/enums/AttributesEnum';
import { Weapon } from './Weapon';
import { Combatant, CombatantProps } from './Combatant';

export interface HeroProps extends CombatantProps {
    weapon: Weapon;
}

export class Hero extends Combatant {
    private readonly weapon: Weapon;

    constructor(props: HeroProps) {
        super({ ...props });
        this.weapon = props.weapon;
    }

    attack(target: Combatant): void {
        const strength = this.attributes?.[Attribute.STRENGTH] || 0;
        const dexterity = this.attributes?.[Attribute.DEXTERITY] || 0;
        const attack = this.weapon.generateAttack(strength, dexterity);
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
            weapon: this.weapon
        };
    }
}
