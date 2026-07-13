import { Inject, Injectable } from '@nestjs/common';
import type { BattleRepository } from '../../domain/repositories/BattleRepository';
import type { HeroProvider } from '../providers/HeroProvider';
import { Battle, BattleStateProps } from '../../domain/entities/Battle';
import { Hero } from '../../domain/entities/Hero';
import { Attribute } from '@/shared/domain/enums/AttributesEnum';
import { randomUUID } from 'crypto';
import { Monster } from '@/battle/domain/entities/Monster';

type StartBattleInput = {
    userId: string;
    characterIds: string[];
    // huntingAreaLevelId: string;
};

@Injectable()
export class StartBattle {
    constructor(
        @Inject('BattleRepository') private readonly battleRepository: BattleRepository,
        @Inject('HeroProvider') private readonly heroProvider: HeroProvider
    ) { }

    async execute(input: StartBattleInput): Promise<Battle> {
        const party: Hero[] = await this.heroProvider.getHeroesByIds(input.characterIds, input.userId);
        if (party.length === 0 || party.length !== input.characterIds.length) {
            throw new Error("One or more characters were not found or do not belong to the user.");
        }
        // TODO - MOCK
        const enemies: Monster[] = [
            new Monster({
                id: randomUUID(),
                name: 'Goblin',
                hp: 30,
                maxHp: 30,
                attributes: {
                    [Attribute.STRENGTH]: 5,
                    [Attribute.CONSTITUTION]: 2,
                    [Attribute.DEXTERITY]: 10
                },
            })
        ];
        const battleState: BattleStateProps = {
            id: randomUUID(),
            party,
            enemies: enemies,
            turn: 1,
            status: 'ACTIVE'
        };
        const battle = new Battle(battleState);
        await this.battleRepository.save(battle);

        return battle;
    }
}
