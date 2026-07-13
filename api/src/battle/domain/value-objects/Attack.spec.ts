import { Attack } from './Attack';
import { DamageTypes } from '@/battle/domain/types/DamageType';

describe('Attack Value Object', () => {
    it('should create an attack with valid damages', () => {
        const damages = { [DamageTypes.PHYSICAL]: 10, [DamageTypes.FIRE]: 5 };
        const attack = new Attack(damages as any);

        const entries = Array.from(attack.getDamageEntries());
        expect(entries).toHaveLength(2);
        expect(entries).toContainEqual([DamageTypes.PHYSICAL, 10]);
        expect(entries).toContainEqual([DamageTypes.FIRE, 5]);
    });

    it('should throw an error if any damage is negative', () => {
        const damages = { [DamageTypes.PHYSICAL]: -5 };
        expect(() => new Attack(damages as any)).toThrow('Damage of type PHYSICAL cannot be negative.');
    });
});
