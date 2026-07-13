import { StartBattle } from './StartBattle';
import { BattleRepository } from '../../domain/repositories/BattleRepository';
import { HeroProvider } from '../providers/HeroProvider';
import { Hero } from '../../domain/entities/Hero';
import { Weapon } from '../../domain/entities/Weapon';
import { Damage } from '../../domain/value-objects/Damage';
import { Attribute } from '@/shared/domain/enums/AttributesEnum';
import { Battle } from '../../domain/entities/Battle';
import { DamageTypes } from '@/battle/domain/types/DamageType';

describe('StartBattle Use Case', () => {
    let battleRepository: jest.Mocked<BattleRepository>;
    let heroProvider: jest.Mocked<HeroProvider>;
    let startBattle: StartBattle;

    const mockHero = new Hero({
        id: 'h1',
        name: 'Arthur',
        hp: 100,
        maxHp: 100,
        attributes: { [Attribute.STRENGTH]: 10, [Attribute.DEXTERITY]: 10 },
        weapon: new Weapon({
            id: 'w1', name: 'Sword', damages: [new Damage(5, 10, DamageTypes.PHYSICAL)]
        })
    });

    beforeEach(() => {
        battleRepository = {
            save: jest.fn(),
            findById: jest.fn(),
            delete: jest.fn()
        };

        heroProvider = {
            getHeroesByIds: jest.fn()
        };

        startBattle = new StartBattle(battleRepository, heroProvider);
    });

    it('should start a battle successfully', async () => {
        heroProvider.getHeroesByIds.mockResolvedValue([mockHero]);

        const battle = await startBattle.execute({ characterIds: ['h1'], userId: 'user1' });

        expect(heroProvider.getHeroesByIds).toHaveBeenCalledWith(['h1'], 'user1');
        expect(battleRepository.save).toHaveBeenCalledWith(expect.any(Battle));
        expect(battle.getParty()).toHaveLength(1);
        expect(battle.getEnemies()).toHaveLength(1);
        expect(battle.getParty()[0].getId()).toBe('h1');
        expect(battle.getEnemies()[0].getName()).toBe('Goblin');
        expect(battle.getStatus()).toBe('ACTIVE');
        expect(battle.getTurn()).toBe(1);
    });

    it('should throw an error if no characters are found', async () => {
        heroProvider.getHeroesByIds.mockResolvedValue([]);

        await expect(startBattle.execute({ characterIds: ['non-existent'], userId: 'user1' }))
            .rejects
            .toThrow("One or more characters were not found or do not belong to the user.");

        expect(battleRepository.save).not.toHaveBeenCalled();
    });
});
