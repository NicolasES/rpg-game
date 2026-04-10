import { Character } from './Character';
import { Race } from './Race';
import { CharacterClass } from './CharacterClass';
import { Attribute } from '@/shared/domain/enums/AttributesEnum';

describe('Character Entity', () => {
    const mockRace = new Race({ 
        name: 'Human', 
        attributes: { [Attribute.STRENGTH]: 1 }
    });

    const mockClass = new CharacterClass({
        name: 'Warrior',
        attributes: { [Attribute.STRENGTH]: 2 }
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
            race: mockRace,
            characterClass: mockClass
        });
        expect(character).toBeDefined();
    });

    it('should create a character with all properties', () => {
        const props = {
            id: '123',
            name: 'Frodo Baggins',
            attributes: defaultAttributes,
            race: mockRace,
            characterClass: mockClass
        };
        const character = new Character(props);

        expect(character.getId()).toBe(props.id);
        expect(character.getName()).toBe(props.name);
        expect(character.getRace()).toBe(mockRace);
        expect(character.getCharacterClass()).toBe(mockClass);
    });

    it('should allow getting total attribute bonus (base + race + class)', () => {
        const character = new Character({ 
            name: 'Gimli', 
            attributes: { 
                [Attribute.STRENGTH]: 6,
                [Attribute.DEXTERITY]: 6,
                [Attribute.CONSTITUTION]: 6,
                [Attribute.MAGIC]: 6
            },
            race: mockRace, // STR +1
            characterClass: mockClass // STR +2
        });

        // 6 + 1 + 2 = 9
        expect(character.getAttributeBonus(Attribute.STRENGTH)).toBe(9);
    });

    it('should allow updating the name', () => {
        const character = new Character({ 
            name: 'Gimli', 
            attributes: defaultAttributes,
            race: mockRace,
            characterClass: mockClass
        });
        const newName = 'Gimli, Son of Glóin';

        character.setName(newName);

        expect(character.getName()).toBe(newName);
    });

    it('should return the base character attribute (without bonuses)', () => {
        const character = new Character({ 
            name: 'Legolas', 
            attributes: { 
                [Attribute.STRENGTH]: 6,
                [Attribute.DEXTERITY]: 8,
                [Attribute.CONSTITUTION]: 6,
                [Attribute.MAGIC]: 6
            },
            race: new Race({ 
                name: 'Elf', 
                attributes: { [Attribute.DEXTERITY]: 2 } 
            }),
            characterClass: new CharacterClass({ 
                name: 'Archer', 
                attributes: { [Attribute.DEXTERITY]: 1 } 
            })
        });

        expect(character.getCharacterAttribute(Attribute.DEXTERITY)).toBe(8);
    });

    it('should throw an error when an attribute is missing', () => {
        expect(() => {
            new Character({ 
                name: 'Incomplete', 
                attributes: { [Attribute.STRENGTH]: 10 },
                race: mockRace,
                characterClass: mockClass
            });
        }).toThrow('Attribute DEX is required');
    });

    it('should throw an error when an attribute is less than 6', () => {
        expect(() => {
            new Character({ 
                name: 'Weakling', 
                attributes: { 
                    [Attribute.STRENGTH]: 5,
                    [Attribute.DEXTERITY]: 6,
                    [Attribute.CONSTITUTION]: 6,
                    [Attribute.MAGIC]: 6
                },
                race: mockRace,
                characterClass: mockClass
            });
        }).toThrow('Attribute STR must be at least 6');
    });
    
    it('should calculate the level correctly based on experience formula', () => {
        const characterStart = new Character({ 
            name: 'Noob', 
            attributes: defaultAttributes,
            race: mockRace,
            characterClass: mockClass,
            experience: 0
        });
        expect(characterStart.getLevel()).toBe(1);

        const characterLvl2 = new Character({ 
            name: 'Fighter', 
            attributes: defaultAttributes,
            race: mockRace,
            characterClass: mockClass,
            experience: 100 
        });
        expect(characterLvl2.getLevel()).toBe(2);

        const characterLvl3 = new Character({ 
            name: 'Fighter', 
            attributes: defaultAttributes,
            race: mockRace,
            characterClass: mockClass,
            experience: 300 
        });
        expect(characterLvl3.getLevel()).toBe(3);

        const characterLvl4 = new Character({ 
            name: 'Fighter', 
            attributes: defaultAttributes,
            race: mockRace,
            characterClass: mockClass,
            experience: 400 
        });
        expect(characterLvl4.getLevel()).toBe(4);
    });

    it('should match the exact experience progression described in requirements', () => {
        const testCharacter = (exp: number) => new Character({ 
            name: 'Tester', attributes: defaultAttributes,
            race: mockRace, characterClass: mockClass, experience: exp
        }).getLevel();

        expect(testCharacter(0)).toBe(1);
        expect(testCharacter(99)).toBe(1);
        
        expect(testCharacter(100)).toBe(2);
        expect(testCharacter(199)).toBe(2);
        
        expect(testCharacter(200)).toBe(3);
        expect(testCharacter(399)).toBe(3);
        
        expect(testCharacter(400)).toBe(4);
        expect(testCharacter(699)).toBe(4);
        
        expect(testCharacter(700)).toBe(5);
        expect(testCharacter(1099)).toBe(5);
        
        expect(testCharacter(1100)).toBe(6);
    });
});
