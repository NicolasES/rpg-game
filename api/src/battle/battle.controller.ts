import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { StartBattle } from './application/use-cases/StartBattle';
import { AuthGuard } from '@/shared/infrastructure/auth/AuthGuard';
import { CurrentUser } from '@/shared/infrastructure/auth/CurrentUser.decorator';

import { StartBattleDto } from './presentation/dtos/StartBattle.dto';

@Controller('battles')
@UseGuards(AuthGuard)
export class BattleController {
    constructor(private readonly startBattle: StartBattle) {}

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
}
