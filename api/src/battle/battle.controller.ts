import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { StartBattle } from './application/use-cases/StartBattle';
import { ProcessTurn } from './application/use-cases/ProcessTurn';
import { AuthGuard } from '@/shared/infrastructure/auth/AuthGuard';
import { CurrentUser } from '@/shared/infrastructure/auth/CurrentUser.decorator';

import { StartBattleDto } from './presentation/dtos/StartBattle.dto';
import { ProcessTurnDto } from './presentation/dtos/ProcessTurn.dto';

@Controller('battles')
@UseGuards(AuthGuard)
export class BattleController {
    constructor(
        private readonly startBattle: StartBattle,
        private readonly processTurn: ProcessTurn
    ) { }

    @Post()
    async start(
        @Body() body: StartBattleDto,
        @CurrentUser() user: { id: string }
    ) {
        const battle = await this.startBattle.execute({
            characterIds: body.characterIds,
            userId: user.id.toString(),
            huntingAreaLevelId: body.huntingAreaLevelId,
        });

        return battle.getState();
    }

    @Post('turn')
    async turn(
        @Body() body: ProcessTurnDto,
        @CurrentUser() user: { id: string }
    ) {
        const battle = await this.processTurn.execute({
            userId: user.id.toString(),
            battleId: body.battleId,
            actions: body.actions
        });

        return battle.getState();
    }
}
