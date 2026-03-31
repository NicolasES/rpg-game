import { Injectable } from '@nestjs/common';
import { Equipment } from '@/equipment/domain/entities/Equipment';
import { EquipmentRepository } from '@/equipment/domain/repositories/EquipmentRepository';
import { PrismaService } from '@/shared/infrastructure/database/PrismaService';
import { EquipmentSlot } from '@/equipment/domain/enums/EquipmentSlot';

@Injectable()
export class PrismaEquipmentRepository implements EquipmentRepository {
    constructor(private readonly prisma: PrismaService) {}

    async save(equipment: Equipment): Promise<void> {
        const data = {
            characterId: parseInt(equipment.characterId),
            mainHandId:  equipment.get(EquipmentSlot.MAIN_HAND) ? parseInt(equipment.get(EquipmentSlot.MAIN_HAND)!) : null,
            offHandId:   equipment.get(EquipmentSlot.OFF_HAND)  ? parseInt(equipment.get(EquipmentSlot.OFF_HAND)!)  : null,
            armorId:     equipment.get(EquipmentSlot.ARMOR)     ? parseInt(equipment.get(EquipmentSlot.ARMOR)!)     : null,
            ringId:      equipment.get(EquipmentSlot.RING)      ? parseInt(equipment.get(EquipmentSlot.RING)!)      : null,
            legsId:      equipment.get(EquipmentSlot.LEGS)      ? parseInt(equipment.get(EquipmentSlot.LEGS)!)      : null,
        };

        if (equipment.id) {
            await this.prisma.equipment.update({
                where: { id: parseInt(equipment.id) },
                data,
            });
        } else {
            await this.prisma.equipment.upsert({
                where: { characterId: data.characterId },
                create: data,
                update: data,
            });
        }
    }

    async findByCharacterId(characterId: string): Promise<Equipment> {
        const row = await this.prisma.equipment.findUniqueOrThrow({
            where: { characterId: parseInt(characterId) },
        });

        const equipment = new Equipment({
            id:          row.id.toString(),
            characterId: row.characterId.toString(),
        });

        if (row.mainHandId) equipment.equip(EquipmentSlot.MAIN_HAND, row.mainHandId.toString());
        if (row.offHandId)  equipment.equip(EquipmentSlot.OFF_HAND,  row.offHandId.toString());
        if (row.armorId)    equipment.equip(EquipmentSlot.ARMOR,    row.armorId.toString());
        if (row.ringId)     equipment.equip(EquipmentSlot.RING,     row.ringId.toString());
        if (row.legsId)     equipment.equip(EquipmentSlot.LEGS,     row.legsId.toString());

        return equipment;
    }
}
