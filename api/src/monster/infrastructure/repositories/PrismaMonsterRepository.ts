import { Injectable } from '@nestjs/common';
import { MonsterRepository } from '../../domain/repositories/MonsterRepository';
import { Monster } from '../../domain/entities/Monster';
import { PrismaService } from '@/shared/infrastructure/database/PrismaService';
import { Attribute } from '@/shared/domain/enums/AttributesEnum';

@Injectable()
export class PrismaMonsterRepository implements MonsterRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findByHuntingAreaLevelId(levelId: string): Promise<Monster[]> {
        const results = await this.prisma.huntingAreaLevelMonster.findMany({
            where: { huntingAreaLevelId: parseInt(levelId, 10) },
            include: { monster: true }
        });

        return results.map(row => {
            const m = row.monster;
            return new Monster({
                id: m.id.toString(),
                name: m.name,
                hp: m.hp,
                baseExp: m.baseExp,
                attributes: {
                    [Attribute.STRENGTH]: m.strength,
                    [Attribute.DEXTERITY]: m.dexterity,
                    [Attribute.CONSTITUTION]: m.constitution,
                    [Attribute.MAGIC]: m.magic
                }
            });
        });
    }
}
