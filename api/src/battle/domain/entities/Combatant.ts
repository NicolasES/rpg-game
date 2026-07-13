import { Attribute, AttributeValues } from '@/shared/domain/enums/AttributesEnum';
import { DamageType } from '@/battle/domain/types/DamageType';
import { Attack } from '@/battle/domain/value-objects/Attack';

export interface CombatantProps {
    id: string;
    name: string;
    race?: string;
    characterClass?: string;
    attributes?: AttributeValues;
    defenses?: Partial<Record<DamageType, number>>;
    hp: number;
    maxHp: number;
}

export abstract class Combatant {
    protected id: string;
    protected name: string;
    protected race?: string;
    protected characterClass?: string;
    protected attributes?: AttributeValues;
    protected defenses?: Partial<Record<DamageType, number>>;
    protected hp: number;
    protected maxHp: number;

    constructor(props: CombatantProps) {
        this.id = props.id;
        this.name = props.name;
        this.race = props.race;
        this.characterClass = props.characterClass;
        this.attributes = props.attributes;
        this.defenses = props.defenses;
        this.hp = props.hp;
        this.maxHp = props.maxHp;
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getHp(): number {
        return this.hp;
    }

    getMaxHp(): number {
        return this.maxHp;
    }

    isAlive(): boolean {
        return this.hp > 0;
    }

    takeDamage(attack: Attack): void {
        let totalDamageTaken = 0;
        for (const [type, amount] of attack.getDamageEntries()) {
            if (amount > 0) {
                const defense = this.defenses?.[type] || 0;

                const actualDamage = Math.max(0, amount - defense);
                totalDamageTaken += actualDamage;
            }
        }
        this.hp = Math.max(0, this.hp - totalDamageTaken);
    }

    abstract attack(target: Combatant): void;

    heal(amount: number): void {
        this.hp = Math.min(this.maxHp, this.hp + amount);
    }

    abstract getState(): Record<string, unknown>;
}
