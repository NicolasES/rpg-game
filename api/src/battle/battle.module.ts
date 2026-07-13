import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RedisBattleRepository } from './infrastructure/repositories/RedisBattleRepository';
import { StartBattle } from './application/use-cases/StartBattle';
import { BattleController } from './battle.controller';
import { CharacterModule } from '../character/character.module';
import { CharacterModuleCombatantProvider } from './infrastructure/providers/CharacterModuleCombatantProvider';

@Module({
    imports: [
        CharacterModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secretKey',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [BattleController],
    providers: [
        {
            provide: 'BattleRepository',
            useClass: RedisBattleRepository,
        },
        {
            provide: 'HeroProvider',
            useClass: CharacterModuleCombatantProvider,
        },
        StartBattle
    ],
    exports: [StartBattle]
})
export class BattleModule {}
