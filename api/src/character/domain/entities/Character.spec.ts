import { Character } from './Character';

describe('Character Entity', () => {
    it('should be defined', () => {
        const character = new Character({ name: 'Gandalf' });
        expect(character).toBeDefined();
    });

    it('should create a character with all properties', () => {
        const props = {
            id: '123',
            name: 'Frodo Baggins',
        };
        const character = new Character(props);

        expect(character.id).toBe(props.id);
        expect(character.name).toBe(props.name);
    });

    it('should create a character without an optional id', () => {
        const props = {
            name: 'Samwise Gamgee',
        };
        const character = new Character(props);

        expect(character.id).toBeUndefined();
        expect(character.name).toBe(props.name);
    });

    it('should allow updating the name', () => {
        const character = new Character({ name: 'Gimli' });
        const newName = 'Gimli, Son of Glóin';

        character.setName(newName);

        expect(character.name).toBe(newName);
    });
});
