import { Inject, Injectable } from '@nestjs/common';
import type { BattleRepository } from '../../domain/repositories/BattleRepository';
import type { HeroProvider } from '../providers/HeroProvider';
import type { MonsterProvider } from '../providers/MonsterProvider';
import { Battle, BattleStateProps } from '../../domain/entities/Battle';
import { Hero } from '../../domain/entities/Hero';
import { randomUUID } from 'crypto';

type StartBattleInput = {
    userId: string;
    characterIds: string[];
    huntingAreaLevelId: string;
};

@Injectable()
export class StartBattle {
    constructor(
        @Inject('BattleRepository') private readonly battleRepository: BattleRepository,
        @Inject('HeroProvider') private readonly heroProvider: HeroProvider,
        @Inject('MonsterProvider') private readonly monsterProvider: MonsterProvider
    ) { }

    async execute(input: StartBattleInput): Promise<Battle> {
        const party: Hero[] = await this.heroProvider.getHeroesByIds(input.characterIds, input.userId);
        if (party.length === 0 || party.length !== input.characterIds.length) {
            throw new Error("One or more characters were not found or do not belong to the user.");
        }

        const enemies = await this.monsterProvider.generateEncounter(input.huntingAreaLevelId);
        if (enemies.length === 0) {
            throw new Error("No monsters found for this hunting area level.");
        }

        const battleState: BattleStateProps = {
            id: randomUUID(),
            userId: input.userId,
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
