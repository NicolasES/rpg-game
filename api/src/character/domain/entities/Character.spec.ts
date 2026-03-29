import { Character } from './Character';
import { Race } from './Race';
import { Attribute } from '@/shared/domain/enums/AttributesEnum';

describe('Character Entity', () => {
    const mockRace = new Race({ 
        name: 'Human', 
        attributes: { [Attribute.STRENGTH]: 1 }
    });
    
    const defaultAttributes = {
        [Attribute.STRENGTH]: 10,
        [Attribute.DEXTERITY]: 10,
        [Attribute.CONSTITUTION]: 10,
        [Attribute.MAGIC]: 10,
    };

    it('should be defined', () => {
        const character = new Character({ 
            name: 'Gandalf', 
            attributes: defaultAttributes,
            race: mockRace
        });
        expect(character).toBeDefined();
    });

    it('should create a character with all properties', () => {
        const props = {
            id: '123',
            name: 'Frodo Baggins',
            attributes: defaultAttributes,
            race: mockRace
        };
        const character = new Character(props);

        expect(character.id).toBe(props.id);
        expect(character.getName()).toBe(props.name);
    });

    it('should allow getting total attribute bonus (base + race)', () => {
        const character = new Character({ 
            name: 'Gimli', 
            attributes: { [Attribute.STRENGTH]: 3 },
            race: mockRace // mockRace has STR +1
        });

        expect(character.getAttributeBonus(Attribute.STRENGTH)).toBe(4);
    });

    it('should allow updating the name', () => {
        const character = new Character({ 
            name: 'Gimli', 
            attributes: defaultAttributes,
            race: mockRace 
        });
        const newName = 'Gimli, Son of Glóin';

        character.setName(newName);

        expect(character.getName()).toBe(newName);
    });
});
