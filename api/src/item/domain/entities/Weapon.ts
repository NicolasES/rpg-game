import { Item, ItemProps } from "./Item";
import { WeaponType } from "../enums/WeaponType";

export type WeaponProps = ItemProps & {
    minDamage: number;
    maxDamage: number;
    type: WeaponType;
}

export class Weapon extends Item {
    private type: WeaponType;
    private minDamage: number;
    private maxDamage: number;

    constructor(props: WeaponProps) {
        const { minDamage, maxDamage, type, ...itemProps } = props;
        super(itemProps);
        
        this.validateDamage(minDamage, maxDamage);
        
        this.minDamage = minDamage;
        this.maxDamage = maxDamage;
        this.type = type;
    }

    private validateDamage(min: number, max: number) {
        if (min < 0 || max < 0) {
            throw new Error('Damage cannot be negative');
        }
        if (min > max) {
            throw new Error('Min damage cannot be greater than max damage');
        }
    }

    getType(): WeaponType {
        return this.type;
    }

    getMinDamage(): number {
        return this.minDamage;
    }

    getMaxDamage(): number {
        return this.maxDamage;
    }
}
