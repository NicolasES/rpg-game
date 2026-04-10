import { Monster } from './Monster';
import { Attribute } from '@/shared/domain/enums/AttributesEnum';

describe('Monster Entity', () => {
    const defaultAttributes = {
        [Attribute.STRENGTH]: 10,
        [Attribute.DEXTERITY]: 8,
        [Attribute.CONSTITUTION]: 12,
        [Attribute.MAGIC]: 5,
    };

    it('should create a monster correctly', () => {
        const props = {
            id: '1',
            name: 'Orc',
            hp: 50,
            baseExp: 25,
            attributes: defaultAttributes,
        };

        const monster = new Monster(props);

        expect(monster).toBeDefined();
        expect(monster.getId()).toBe('1');
        expect(monster.getName()).toBe('Orc');
        expect(monster.getHp()).toBe(50);
        expect(monster.getBaseExp()).toBe(25);
    });

    it('should store and retrieve attributes correctly', () => {
        const monster = new Monster({
            name: 'Goblin',
            hp: 30,
            baseExp: 10,
            attributes: defaultAttributes,
        });

        const attributesMap = monster.getAttributes();
        
        expect(attributesMap.get(Attribute.STRENGTH)).toBe(10);
        expect(attributesMap.get(Attribute.MAGIC)).toBe(5);
        expect(monster.getAttributeBonus(Attribute.DEXTERITY)).toBe(8);
    });

    it('should return 0 when querying a non-existent attribute bonus', () => {
        const monster = new Monster({
            name: 'Slime',
            hp: 10,
            baseExp: 2,
            attributes: {
                [Attribute.CONSTITUTION]: 20
            },
        });

        expect(monster.getAttributeBonus(Attribute.MAGIC)).toBe(0);
        expect(monster.getAttributeBonus(Attribute.CONSTITUTION)).toBe(20);
    });
});
