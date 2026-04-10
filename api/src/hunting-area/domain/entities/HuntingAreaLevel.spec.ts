import { HuntingAreaLevel } from './HuntingAreaLevel';

describe('HuntingAreaLevel Entity', () => {
    it('should create a Hunting Area Level securely', () => {
        const level = new HuntingAreaLevel({
            id: '1',
            huntingAreaId: '10',
            level: 3
        });

        expect(level).toBeDefined();
        expect(level.getId()).toBe('1');
        expect(level.getHuntingAreaId()).toBe('10');
        expect(level.getLevel()).toBe(3);
    });

    it('should maintain state without nested object references', () => {
        const payload = {
            huntingAreaId: '99',
            level: 1
        };

        const level = new HuntingAreaLevel(payload);
        expect(level.getId()).toBeUndefined();
        expect(level.getHuntingAreaId()).toBe('99');
        expect(level.getLevel()).toBe(1);
    });
});
