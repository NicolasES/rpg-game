import { Injectable } from '@nestjs/common';
import { Race } from '@/character/domain/entities/Race';
import { RaceRepository } from '@/character/domain/repositories/RaceRepository';
import { PrismaService } from '@/shared/infrastructure/database/PrismaService';
import { Attribute } from '@/shared/domain/enums/AttributesEnum';

@Injectable()
export class PrismaRaceRepository implements RaceRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: string): Promise<Race | null> {
        const row = await this.prisma.race.findUnique({
            where: { id: parseInt(id) },
        });

        if (!row) return null;

        return new Race({
            id: row.id.toString(),
            name: row.name,
            attributes: {
                [Attribute.STRENGTH]:     row.strength,
                [Attribute.DEXTERITY]:    row.dexterity,
                [Attribute.CONSTITUTION]: row.constitution,
                [Attribute.MAGIC]:        row.magic,
            },
        });
    }
}
