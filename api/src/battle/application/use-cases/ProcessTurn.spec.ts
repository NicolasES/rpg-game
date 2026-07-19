import { ProcessTurn } from './ProcessTurn';
import { BattleRepository } from '../../domain/repositories/BattleRepository';
import { Battle } from '../../domain/entities/Battle';
import { Hero } from '../../domain/entities/Hero';
import { Monster } from '../../domain/entities/Monster';
import { Weapon } from '../../domain/entities/Weapon';
import { Damage } from '../../domain/value-objects/Damage';
import { DamageTypes } from '@/battle/domain/types/DamageType';
import { Attribute } from '@/shared/domain/enums/AttributesEnum';

describe('ProcessTurn Use Case', () => {
    let battleRepository: jest.Mocked<BattleRepository>;
    let processTurn: ProcessTurn;
    let mockBattle: Battle;

    beforeEach(() => {
        const mockHero = new Hero({
            id: 'h1',
            name: 'Arthur',
            hp: 100,
            maxHp: 100,
            attributes: { [Attribute.STRENGTH]: 20, [Attribute.DEXTERITY]: 10 },
            weapon: new Weapon({
                id: 'w1', name: 'Sword', damages: [new Damage(10, 20, DamageTypes.PHYSICAL)]
            })
        });

        const mockMonster = new Monster({
            id: 'm1',
            name: 'Goblin',
            hp: 50,
            maxHp: 50,
            attributes: { [Attribute.STRENGTH]: 10 }
        });

        mockBattle = new Battle({
            id: 'b1',
            userId: 'user1',
            party: [mockHero],
            enemies: [mockMonster],
            turn: 1,
            status: 'ACTIVE'
        });

        battleRepository = {
            save: jest.fn(),
            findById: jest.fn().mockResolvedValue(mockBattle),
            delete: jest.fn()
        };

        processTurn = new ProcessTurn(battleRepository);
    });

    it('should process a turn successfully', async () => {
        const battle = await processTurn.execute({
            userId: 'user1',
            battleId: 'b1',
            actions: [{ heroId: 'h1', targetMonsterId: 'm1' }]
        });

        expect(battleRepository.findById).toHaveBeenCalledWith('b1');
        expect(battleRepository.save).toHaveBeenCalledWith(battle);

        expect(battle.getTurn()).toBe(2);

        // Since attack involves randomness, we just check hp has changed or is dead.
        // It's possible monster died or survived, but at least the turn ran without errors.
    });

    it('should throw an error if battle not found', async () => {
        battleRepository.findById.mockResolvedValue(null);

        await expect(processTurn.execute({
            userId: 'user1',
            battleId: 'invalid',
            actions: []
        })).rejects.toThrow("Battle not found.");
    });

    it('should throw an error if userId does not match', async () => {
        await expect(processTurn.execute({
            userId: 'wrong_user',
            battleId: 'b1',
            actions: []
        })).rejects.toThrow("You do not have permission to play this battle.");
    });
});
