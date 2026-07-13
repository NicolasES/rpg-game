import { Battle } from './Battle';
import { Hero } from './Hero';
import { Monster } from './Monster';
import { Weapon } from './Weapon';
import { Damage } from '../value-objects/Damage';
import { DamageTypes } from '../types/DamageType';

describe('Battle Entity', () => {
    const validWeapon = new Weapon({
        id: 'w1', name: 'Sword', damages: [new Damage(5, 10, DamageTypes.PHYSICAL as any)]
    });

    const createHero = () => new Hero({
        id: 'h1', name: 'Arthur', hp: 100, maxHp: 100, weapon: validWeapon
    });

    const createMonster = () => new Monster({
        id: 'm1', name: 'Goblin', hp: 30, maxHp: 30
    });

    it('should create a battle with party and enemies', () => {
        const hero = createHero();
        const monster = createMonster();

        const battle = new Battle({
            id: 'b1',
            party: [hero],
            enemies: [monster],
            turn: 1,
            status: 'ACTIVE'
        });

        expect(battle.getId()).toBe('b1');
        expect(battle.getParty()).toHaveLength(1);
        expect(battle.getEnemies()).toHaveLength(1);
        expect(battle.getTurn()).toBe(1);
        expect(battle.getStatus()).toBe('ACTIVE');
    });

    it('should return state correctly', () => {
        const hero = createHero();
        const monster = createMonster();
        const battle = new Battle({
            id: 'b1', party: [hero], enemies: [monster], turn: 1, status: 'ACTIVE'
        });

        const state = battle.getState();
        expect(state.id).toBe('b1');
        expect(state.turn).toBe(1);
        expect(state.status).toBe('ACTIVE');
        expect(state.party[0]).toBe(hero);
        expect(state.enemies[0]).toBe(monster);
    });
});
