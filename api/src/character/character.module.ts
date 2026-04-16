import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CharacterController } from './character.controller';
import { CreateCharacter } from './application/use-cases/CreateCharacter';
import { ListRaces } from './application/use-cases/ListRaces';
import { ListClasses } from './application/use-cases/ListClasses';
import { PrismaCharacterRepository } from './infrastructure/repositories/PrismaCharacterRepository';
import { PrismaRaceRepository } from './infrastructure/repositories/PrismaRaceRepository';
import { PrismaCharacterClassRepository } from './infrastructure/repositories/PrismaCharacterClassRepository';
import { EquipmentModule } from '@/equipment/equipment.module';
import { ItemModule } from '@/item/item.module';

@Module({
  controllers: [CharacterController],
  providers: [
    CreateCharacter,
    ListRaces,
    ListClasses,
    { provide: 'CharacterRepository',      useClass: PrismaCharacterRepository },
    { provide: 'RaceRepository',           useClass: PrismaRaceRepository },
    { provide: 'CharacterClassRepository', useClass: PrismaCharacterClassRepository },
  ],
  imports: [
    EquipmentModule, 
    ItemModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class CharacterModule {}
