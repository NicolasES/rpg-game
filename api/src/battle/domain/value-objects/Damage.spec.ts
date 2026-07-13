import { Damage } from './Damage';
import { DamageTypes } from '../types/DamageType';

describe('Damage Value Object', () => {
    it('should create a damage with valid min and max values', () => {
        const damage = new Damage(5, 10, DamageTypes.PHYSICAL);
        expect(damage.getMinValue()).toBe(5);
        expect(damage.getMaxValue()).toBe(10);
        expect(damage.getType()).toBe(DamageTypes.PHYSICAL);
    });

    it('should throw an error if min or max is negative', () => {
        expect(() => new Damage(-1, 10, DamageTypes.PHYSICAL)).toThrow('Damage cannot be negative');
        expect(() => new Damage(5, -2, DamageTypes.PHYSICAL)).toThrow('Damage cannot be negative');
    });

    it('should throw an error if min is greater than max', () => {
        expect(() => new Damage(15, 10, DamageTypes.PHYSICAL)).toThrow('Min damage cannot be greater than max damage');
    });
});
