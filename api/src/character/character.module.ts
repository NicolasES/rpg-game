import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CreateCharacter } from './application/use-cases/CreateCharacter';
import { PrismaCharacterRepository } from './infrastructure/repositories/PrismaCharacterRepository';
import { PrismaRaceRepository } from './infrastructure/repositories/PrismaRaceRepository';
import { PrismaCharacterClassRepository } from './infrastructure/repositories/PrismaCharacterClassRepository';

@Module({
  controllers: [CharacterController],
  providers: [
    CreateCharacter,
    { provide: 'CharacterRepository',      useClass: PrismaCharacterRepository },
    { provide: 'RaceRepository',           useClass: PrismaRaceRepository },
    { provide: 'CharacterClassRepository', useClass: PrismaCharacterClassRepository },
  ],
})
export class CharacterModule {}

