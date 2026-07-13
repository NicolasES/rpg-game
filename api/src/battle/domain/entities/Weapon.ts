import { DamageType } from "../types/DamageType";
import { Attack } from "../value-objects/Attack";
import { Damage } from "../value-objects/Damage";

export interface WeaponProps {
    id: string;
    name: string;
    damages: Damage[];
}

export class Weapon {
    private props: WeaponProps;
    constructor(props: WeaponProps) {
        if (!props.name || props.name.trim() === '') {
            throw new Error('Weapon name is required');
        }
        if (!props.damages || props.damages.length === 0) {
            throw new Error('Weapon damages are required');
        }
        this.props = props;
    }

    getName(): string {
        return this.props.name;
    }

    getDamages(): Damage[] {
        return this.props.damages;
    }

    generateAttack(strength: number, dexterity: number): Attack {
        const damagesEntries: Partial<Record<DamageType, number>> = {}

        for (const damage of this.props.damages) {
            let max = damage.getMaxValue() + (Math.max(0, strength - 10));
            let min = damage.getMinValue() + (Math.max(0, strength - 10)) + (Math.max(0, dexterity - 10));
            min = Math.min(min, max);

            const value = Math.floor(Math.random() * (max - min + 1)) + min;
            damagesEntries[damage.getType()] = value;
        }

        return new Attack(damagesEntries);
    }
}