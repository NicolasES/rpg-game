import { Module } from '@nestjs/common';
import { PrismaMonsterRepository } from './infrastructure/repositories/PrismaMonsterRepository';

@Module({
    providers: [
        {
            provide: 'MonsterRepository',
            useClass: PrismaMonsterRepository,
        }
    ],
    exports: ['MonsterRepository']
})
export class MonsterModule {}
