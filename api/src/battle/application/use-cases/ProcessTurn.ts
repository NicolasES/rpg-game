import { Inject, Injectable } from '@nestjs/common';
import type { BattleRepository } from '../../domain/repositories/BattleRepository';
import { Battle } from '../../domain/entities/Battle';

type TurnActionInput = {
    heroId: string;
    targetMonsterId: string;
};

export type ProcessTurnInput = {
    userId: string;
    battleId: string;
    actions: TurnActionInput[];
};

@Injectable()
export class ProcessTurn {
    constructor(
        @Inject('BattleRepository') private readonly battleRepository: BattleRepository
    ) { }

    async execute(input: ProcessTurnInput): Promise<Battle> {
        const battle = await this.battleRepository.findById(input.battleId);
        
        if (!battle) {
            throw new Error("Battle not found.");
        }

        if (battle.getUserId() !== input.userId) {
            throw new Error("You do not have permission to play this battle.");
        }

        battle.processTurn(input.actions);

        await this.battleRepository.save(battle);

        return battle;
    }
}
