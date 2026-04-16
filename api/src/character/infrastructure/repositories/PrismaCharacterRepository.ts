import { Injectable } from '@nestjs/common';
import { Character } from '@/character/domain/entities/Character';
import { CharacterRepository } from '@/character/domain/repositories/CharacterRepository';
import { PrismaService } from '@/shared/infrastructure/database/PrismaService';
import { Race } from '@/character/domain/entities/Race';
import { CharacterClass } from '@/character/domain/entities/CharacterClass';
import { Attribute } from '@/shared/domain/enums/AttributesEnum';

@Injectable()
export class PrismaCharacterRepository implements CharacterRepository {
    constructor(private readonly prisma: PrismaService) {}

    async save(character: Character): Promise<void> {
        const attributes = {
            strength:     character.getCharacterAttribute(Attribute.STRENGTH),
            dexterity:    character.getCharacterAttribute(Attribute.DEXTERITY),
            constitution: character.getCharacterAttribute(Attribute.CONSTITUTION),
            magic:        character.getCharacterAttribute(Attribute.MAGIC),
        };

        if (character.getId()) {
            await this.prisma.character.update({
                where: { id: parseInt(character.getId()!) },
                data: {
                    userId:          parseInt(character.getUserId()),
                    name:            character.getName(),
                    raceId:          parseInt(character.getRace().getId()!),
                    characterClassId: parseInt(character.getCharacterClass().getId()!),
                    experience:      character.getExperience(),
                    ...attributes,
                },
            });
        } else {
            const created = await this.prisma.character.create({
                data: {
                    userId:          parseInt(character.getUserId()),
                    name:            character.getName(),
                    raceId:          parseInt(character.getRace().getId()!),
                    characterClassId: parseInt(character.getCharacterClass().getId()!),
                    experience:      character.getExperience(),
                    ...attributes,
                },
            });

            character.setId(created.id.toString());
        }
    }

    async findById(id: string): Promise<Character | null> {
        const row = await this.prisma.character.findUnique({
            where: { id: parseInt(id) },
            include: {
                race: true,
                characterClass: true,
            },
        });

        if (!row) return null;

        return new Character({
            id: row.id.toString(),
            userId: row.userId.toString(),
            name: row.name,
            experience: row.experience,
            attributes: {
                [Attribute.STRENGTH]:     row.strength,
                [Attribute.DEXTERITY]:    row.dexterity,
                [Attribute.CONSTITUTION]: row.constitution,
                [Attribute.MAGIC]:        row.magic,
            },
            race: new Race({
                name: row.race.name,
                attributes: {
                    [Attribute.STRENGTH]:     row.race.strength,
                    [Attribute.DEXTERITY]:    row.race.dexterity,
                    [Attribute.CONSTITUTION]: row.race.constitution,
                    [Attribute.MAGIC]:        row.race.magic,
                },
            }),
            characterClass: new CharacterClass({
                name: row.characterClass.name,
                attributes: {
                    [Attribute.STRENGTH]:     row.characterClass.strength,
                    [Attribute.DEXTERITY]:    row.characterClass.dexterity,
                    [Attribute.CONSTITUTION]: row.characterClass.constitution,
                    [Attribute.MAGIC]:        row.characterClass.magic,
                },
            }),
        });
    }
}
