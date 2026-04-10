import { Module } from '@nestjs/common';
import { HuntingAreaController } from './hunting-area.controller';
import { ListUnlockedHuntingAreas } from './application/use-cases/ListUnlockedHuntingAreas';
import { PrismaHuntingAreaRepository } from './infrastructure/database/PrismaHuntingAreaRepository';
import { PrismaHuntingAreaDao } from './infrastructure/database/PrismaHuntingAreaDao';
import { PrismaCharacterRepository } from '@/character/infrastructure/repositories/PrismaCharacterRepository';
@Module({
    controllers: [HuntingAreaController],
    providers: [
        ListUnlockedHuntingAreas,
        {
            provide: 'HuntingAreaRepository',
            useClass: PrismaHuntingAreaRepository,
        },
        {
            provide: 'HuntingAreaDao',
            useClass: PrismaHuntingAreaDao,
        },
        {
            provide: 'CharacterRepository',
            useClass: PrismaCharacterRepository,
        }
    ],
})
export class HuntingAreaModule {}
