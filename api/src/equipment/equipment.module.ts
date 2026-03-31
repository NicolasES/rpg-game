import { Module } from '@nestjs/common';
import { PrismaEquipmentRepository } from './infrastructure/repositories/PrismaEquipmentRepository';

@Module({
    providers: [
        {
            provide: 'EquipmentRepository',
            useClass: PrismaEquipmentRepository,
        },
    ],
    exports: ['EquipmentRepository'],
})
export class EquipmentModule {}
