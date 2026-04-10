import { Controller, Get, Param } from '@nestjs/common';
import { ListUnlockedHuntingAreas } from './application/use-cases/ListUnlockedHuntingAreas';

@Controller('hunting-areas')
export class HuntingAreaController {
    constructor(
        private readonly listUnlockedHuntingAreas: ListUnlockedHuntingAreas
    ) {}

    @Get('unlocked/:characterId')
    async getUnlockedAreas(@Param('characterId') characterId: string) {
        const areas = await this.listUnlockedHuntingAreas.execute(characterId);
        
        return areas;
    }
}
