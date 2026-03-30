import { Weapon } from "./Weapon";
import { WeaponType } from "../enums/WeaponType";
import { Attribute } from "@/shared/domain/enums/AttributesEnum";


describe('Weapon Entity', () => {
    it('should be defined', () => {
        const weapon = new Weapon({
            name: 'Steel Sword',
            type: WeaponType.SWORD,
            minDamage: 10,
            maxDamage: 20
        });
        expect(weapon).toBeDefined();
    });

    it('should create a weapon with all properties', () => {
        const props = {
            id: '123',
            name: 'Iron Axe',
            type: WeaponType.AXE,
            minDamage: 15,
            maxDamage: 25
        };
        const weapon = new Weapon(props);

        expect(weapon.id).toBe(props.id);
        expect(weapon.getName()).toBe(props.name);
        expect(weapon.getType()).toBe(props.type);
        expect(weapon.getMinDamage()).toBe(props.minDamage);
        expect(weapon.getMaxDamage()).toBe(props.maxDamage);
    });

    it('should throw an error if min damage is negative', () => {
        expect(() => {
            new Weapon({
                name: 'Cursed Sword',
                type: WeaponType.SWORD,
                minDamage: -1,
                maxDamage: 10
            });
        }).toThrow('Damage cannot be negative');
    });

    it('should throw an error if max damage is negative', () => {
        expect(() => {
            new Weapon({
                name: 'Cursed Sword',
                type: WeaponType.SWORD,
                minDamage: 0,
                maxDamage: -5
            });
        }).toThrow('Damage cannot be negative');
    });

    it('should throw an error if min damage is greater than max damage', () => {
        expect(() => {
            new Weapon({
                name: 'Heavy Mace',
                type: WeaponType.MACE,
                minDamage: 20,
                maxDamage: 10
            });
        }).toThrow('Min damage cannot be greater than max damage');
    });

    it('should inherit from Item and have attributes', () => {
        const weapon = new Weapon({
            name: 'Magic Staff',
            type: WeaponType.STAFF,
            minDamage: 5,
            maxDamage: 15,
            attributes: {
                [Attribute.MAGIC]: 5,
                [Attribute.STRENGTH]: 1
            }
        });

        expect(weapon.getName()).toBe('Magic Staff');
        expect(weapon.getAttributeBonus(Attribute.MAGIC)).toBe(5);
        expect(weapon.getAttributeBonus(Attribute.STRENGTH)).toBe(1);
    });
});
