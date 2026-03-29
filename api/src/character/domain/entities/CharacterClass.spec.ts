import { CharacterClass } from './CharacterClass';
import { Attribute } from '@/shared/domain/enums/AttributesEnum';

describe('CharacterClass Entity', () => {
    it('should be defined', () => {
        const charClass = new CharacterClass({ name: 'Warrior', attributes: {} });
        expect(charClass).toBeDefined();
    });

    it('should create a character class with name and attributes', () => {
        const charClass = new CharacterClass({
            name: 'Mage',
            attributes: { [Attribute.MAGIC]: 3, [Attribute.CONSTITUTION]: -1 }
        });

        expect(charClass.getName()).toBe('Mage');
        expect(charClass.getAttributeBonus(Attribute.MAGIC)).toBe(3);
        expect(charClass.getAttributeBonus(Attribute.CONSTITUTION)).toBe(-1);
        expect(charClass.getAttributeBonus(Attribute.STRENGTH)).toBe(0);
    });

    it('should allow updating attributes', () => {
        const charClass = new CharacterClass({ name: 'Thief', attributes: { [Attribute.DEXTERITY]: 2 } });
        
        charClass.setAttributes({ [Attribute.DEXTERITY]: 3, [Attribute.STRENGTH]: 1 });

        expect(charClass.getAttributeBonus(Attribute.DEXTERITY)).toBe(3);
        expect(charClass.getAttributeBonus(Attribute.STRENGTH)).toBe(1);
    });
});
