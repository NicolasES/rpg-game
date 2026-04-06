import { Module } from '@nestjs/common';
import { PrismaItemRepository } from './infrastructure/repositories/PrismaItemRepository';
import { ShowInitialWeapons } from './application/use-cases/ShowInitialWeapons';

@Module({
    providers: [
        ShowInitialWeapons,
        { provide: 'ItemRepository', useClass: PrismaItemRepository },
    ],
    exports: [ShowInitialWeapons],
})
export class ItemModule {}
