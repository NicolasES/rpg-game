import { DamageType } from "@/battle/domain/types/DamageType";

export class Attack {
    private readonly damages: ReadonlyMap<DamageType, number>;

    constructor(damages: Partial<Record<DamageType, number>>) {
        const map = new Map<DamageType, number>();
        for (const [type, amount] of Object.entries(damages)) {
            if (amount < 0) {
                throw new Error(`Damage of type ${type} cannot be negative.`);
            }
            map.set(type as DamageType, amount);
        }

        this.damages = map;
    }

    public getDamageEntries(): IterableIterator<[DamageType, number]> {
        return this.damages.entries();
    }
}