import { DamageType } from "@/battle/domain/types/DamageType";

export class Damage {
    constructor(
        private readonly min: number,
        private readonly max: number,
        private readonly type: DamageType,
    ) {
        if (min < 0 || max < 0) {
            throw new Error('Damage cannot be negative');
        }
        if (min > max) {
            throw new Error('Min damage cannot be greater than max damage');
        }
    }

    getMinValue(): number {
        return this.min;
    }

    getMaxValue(): number {
        return this.max;
    }

    getType(): DamageType {
        return this.type;
    }
}