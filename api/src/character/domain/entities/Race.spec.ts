import { Race } from './Race';
import { Attribute } from '@/shared/domain/enums/AttributesEnum';

describe('Race Entity', () => {
    it('should be defined', () => {
        const race = new Race({ name: 'Human', attributes: {} });
        expect(race).toBeDefined();
    });

    it('should create a race with name and attributes', () => {
        const race = new Race({
            name: 'Elf',
            attributes: { [Attribute.DEXTERITY]: 2, [Attribute.MAGIC]: 1 }
        });

        expect(race.getName()).toBe('Elf');
        expect(race.getAttributeBonus(Attribute.DEXTERITY)).toBe(2);
        expect(race.getAttributeBonus(Attribute.MAGIC)).toBe(1);
        expect(race.getAttributeBonus(Attribute.STRENGTH)).toBe(0);
    });

    it('should allow updating attributes', () => {
        const race = new Race({ name: 'Dwarf', attributes: { [Attribute.CONSTITUTION]: 2 } });
        
        race.setAttributes({ [Attribute.CONSTITUTION]: 3, [Attribute.STRENGTH]: 2 });

        expect(race.getAttributeBonus(Attribute.CONSTITUTION)).toBe(3);
        expect(race.getAttributeBonus(Attribute.STRENGTH)).toBe(2);
    });
});
