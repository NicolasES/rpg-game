import { Hero } from './Hero';
import { Weapon } from './Weapon';
import { Damage } from '../value-objects/Damage';
import { Attack } from '../value-objects/Attack';
import { Attribute } from '@/shared/domain/enums/AttributesEnum';
import { DamageTypes } from '../types/DamageType';
import { Monster } from './Monster';

describe('Hero Entity', () => {
    const validWeapon = new Weapon({
        id: 'w1',
        name: 'Sword',
        damages: [new Damage(5, 10, DamageTypes.PHYSICAL)]
    });

    const createHero = () => new Hero({
        id: '1',
        name: 'Arthur',
        hp: 100,
        maxHp: 100,
        attributes: {
            [Attribute.STRENGTH]: 15,
            [Attribute.DEXTERITY]: 12
        },
        weapon: validWeapon
    });

    it('should create a hero and retrieve correct values', () => {
        const hero = createHero();
        expect(hero.getId()).toBe('1');
        expect(hero.getName()).toBe('Arthur');
        expect(hero.getHp()).toBe(100);
        expect(hero.getMaxHp()).toBe(100);
        expect(hero.isAlive()).toBe(true);
    });

    it('should take damage correctly', () => {
        const hero = createHero();
        const attack = new Attack({ [DamageTypes.PHYSICAL]: 20 });

        hero.takeDamage(attack);
        expect(hero.getHp()).toBe(80);
    });

    it('should respect defense when taking damage', () => {
        const hero = new Hero({
            id: '1', name: 'Arthur', hp: 100, maxHp: 100,
            defenses: { [DamageTypes.PHYSICAL]: 5 },
            weapon: validWeapon
        });
        const attack = new Attack({ [DamageTypes.PHYSICAL]: 20 });

        hero.takeDamage(attack);
        expect(hero.getHp()).toBe(85); // 20 - 5 = 15 damage
    });

    it('should not heal from negative actual damage if defense is high', () => {
        const hero = new Hero({
            id: '1', name: 'Arthur', hp: 100, maxHp: 100,
            defenses: { [DamageTypes.PHYSICAL]: 50 },
            weapon: validWeapon
        });
        const attack = new Attack({ [DamageTypes.PHYSICAL]: 20 });

        hero.takeDamage(attack);
        expect(hero.getHp()).toBe(100);
    });

    it('should heal without exceeding maxHp', () => {
        const hero = createHero();
        hero.takeDamage(new Attack({ [DamageTypes.PHYSICAL]: 30 }));
        expect(hero.getHp()).toBe(70);

        hero.heal(20);
        expect(hero.getHp()).toBe(90);

        hero.heal(50);
        expect(hero.getHp()).toBe(100); // capped at maxHp
    });

    it('should generate an attack and deal damage to a target', () => {
        const hero = createHero();
        const target = new Monster({
            id: '2',
            name: 'Slime',
            hp: 50,
            maxHp: 50
        });

        hero.attack(target);
        expect(target.getHp()).toBeLessThan(50);
    });
});
