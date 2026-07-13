import { Weapon } from './Weapon';
import { Damage } from '../value-objects/Damage';
import { DamageTypes } from '../types/DamageType';

describe('Weapon Entity', () => {
    const validDamage = new Damage(5, 10, DamageTypes.PHYSICAL as any);

    it('should create a weapon successfully', () => {
        const weapon = new Weapon({
            id: '1',
            name: 'Sword',
            damages: [validDamage]
        });

        expect(weapon.getName()).toBe('Sword');
        expect(weapon.getDamages()).toHaveLength(1);
    });

    it('should throw if name is empty', () => {
        expect(() => new Weapon({ id: '1', name: '', damages: [validDamage] })).toThrow('Weapon name is required');
        expect(() => new Weapon({ id: '1', name: '   ', damages: [validDamage] })).toThrow('Weapon name is required');
    });

    it('should throw if damages array is empty or missing', () => {
        expect(() => new Weapon({ id: '1', name: 'Sword', damages: [] })).toThrow('Weapon damages are required');
    });

    it('should generate an attack considering strength and dexterity', () => {
        const weapon = new Weapon({
            id: '1',
            name: 'Sword',
            damages: [validDamage]
        });

        const attack = weapon.generateAttack(15, 12);
        const entries = Array.from(attack.getDamageEntries());
        expect(entries).toHaveLength(1);

        const physicalDamage = entries.find(e => e[0] === DamageTypes.PHYSICAL)?.[1];
        expect(physicalDamage).toBeDefined();
        expect(physicalDamage).toBeGreaterThanOrEqual(12); // min: 5 + (15-10) + (12-10) = 12
        expect(physicalDamage).toBeLessThanOrEqual(15);    // max: 10 + (15-10) = 15
    });
});
