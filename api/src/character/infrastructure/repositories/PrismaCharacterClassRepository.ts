import { Injectable } from '@nestjs/common';
import { CharacterClass } from '@/character/domain/entities/CharacterClass';
import { CharacterClassRepository } from '@/character/domain/repositories/CharacterClassRepository';
import { PrismaService } from '@/shared/infrastructure/database/PrismaService';
import { Attribute } from '@/shared/domain/enums/AttributesEnum';

@Injectable()
export class PrismaCharacterClassRepository implements CharacterClassRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: string): Promise<CharacterClass | null> {
        const row = await this.prisma.characterClass.findUnique({
            where: { id: parseInt(id) },
        });

        if (!row) return null;

        return new CharacterClass({
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
