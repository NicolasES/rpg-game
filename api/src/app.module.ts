import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './character/character.module';
import { ItemModule } from './item/item.module';
import { EquipmentModule } from './equipment/equipment.module';
import { InfrastructureModule } from './shared/infrastructure/InfrastructureModule';

@Module({
  imports: [InfrastructureModule, CharacterModule, ItemModule, EquipmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
