import { HuntingArea } from './HuntingArea';

describe('HuntingArea Entity', () => {
    it('should create a Hunting Area successfully', () => {
        const area = new HuntingArea({
            id: '1',
            name: 'Forest',
            description: 'A dangerous forest'
        });

        expect(area).toBeDefined();
        expect(area.getId()).toBe('1');
        expect(area.getName()).toBe('Forest');
        expect(area.getDescription()).toBe('A dangerous forest');
    });

    it('should create a Hunting Area without a description', () => {
        const area = new HuntingArea({
            id: '2',
            name: 'Mountains'
        });

        expect(area.getId()).toBe('2');
        expect(area.getName()).toBe('Mountains');
        expect(area.getDescription()).toBeUndefined();
    });
});
