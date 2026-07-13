import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { StartBattle } from './application/use-cases/StartBattle';
import { AuthGuard } from '@/shared/infrastructure/auth/AuthGuard';
import { CurrentUser } from '@/shared/infrastructure/auth/CurrentUser.decorator';

type StartBattleDto = {
    characterIds: string[];
};

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
        });

        return battle.getState();
    }
}
