import { Monster } from './Monster';
import { Hero } from './Hero';
import { Weapon } from './Weapon';
import { Damage } from '../value-objects/Damage';
import { DamageTypes } from '../types/DamageType';

describe('Monster Entity', () => {
    it('should create a monster successfully', () => {
        const monster = new Monster({
            id: 'm1',
            name: 'Goblin',
            hp: 30,
            maxHp: 30
        });

        expect(monster.getId()).toBe('m1');
        expect(monster.getName()).toBe('Goblin');
        expect(monster.getHp()).toBe(30);
    });

    it('should return its state correctly', () => {
        const monster = new Monster({
            id: 'm1',
            name: 'Goblin',
            hp: 30,
            maxHp: 30
        });

        const state = monster.getState();
        expect(state.id).toBe('m1');
        expect(state.name).toBe('Goblin');
        expect(state.hp).toBe(30);
    });

    // TODO test attack when implemented
});
