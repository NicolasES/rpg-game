import { Item } from "./Item";

describe('Item Entity', () => {
    it('should be defined', () => {
        const item = new Item({ name: 'Sword' });
        expect(item).toBeDefined();
    });

    it('should create an item with all properties', () => {
        const props = {
            id: '123',
            name: 'Sword',
        };
        const item = new Item(props);

        expect(item.id).toBe(props.id);
        expect(item.getName()).toBe(props.name);
    });

    it('should create an item without an optional id', () => {
        const props = {
            name: 'Shield',
        };
        const item = new Item(props);

        expect(item.id).toBeUndefined();
        expect(item.getName()).toBe(props.name);
    });

    it('should allow updating the name', () => {
        const item = new Item({ name: 'Sword' });
        const newName = 'Sword of Gondor';

        item.setName(newName);

        expect(item.getName()).toBe(newName);
    });
});