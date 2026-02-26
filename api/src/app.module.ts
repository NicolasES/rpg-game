import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterModule } from './character/character.module';
import { ItemModule } from './item/item.module';
import { EquipmentModule } from './equipment/equipment.module';

@Module({
  imports: [CharacterModule, ItemModule, EquipmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
