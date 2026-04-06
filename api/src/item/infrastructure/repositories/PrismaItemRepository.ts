import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/infrastructure/database/PrismaService';
import { ItemRepository } from '@/item/domain/repositories/ItemRepository';
import { Weapon } from '@/item/domain/entities/Weapon';
import { WeaponType } from '@/item/domain/enums/WeaponType';
import { Attribute } from '@/shared/domain/enums/AttributesEnum';

@Injectable()
export class PrismaItemRepository implements ItemRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: string): Promise<Weapon | null> {
        const item = await this.prisma.item.findUnique({
            where: { id: parseInt(id) },
            include: { type: true, damages: true }
        });

        if (!item) return null;

        return this.mapToWeapon(item);
    }

    async getInitialWeapons(): Promise<Weapon[]> {
        const items = await this.prisma.item.findMany({
            include: { type: true, damages: true },
            where: {
                name: {
                    in: ['Sword', 'Axe', 'Bow', 'Staff', 'Dagger', 'Mace']
                }
            }
        });

        return items.map(item => this.mapToWeapon(item));
    }

    private mapToWeapon(item: any): Weapon {
        const firstDamage = item.damages[0] || { minDamage: 0, maxDamage: 0 };
        return new Weapon({
            id: item.id.toString(),
            name: item.name,
            type: item.type.name as WeaponType,
            minDamage: firstDamage.minDamage,
            maxDamage: firstDamage.maxDamage,
            attributes: {
                [Attribute.STRENGTH]: item.strength,
                [Attribute.DEXTERITY]: item.dexterity,
                [Attribute.CONSTITUTION]: item.constitution,
                [Attribute.MAGIC]: item.magic,
            }
        });
    }
}
