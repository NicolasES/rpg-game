import { Inject, Injectable } from '@nestjs/common';
import type { CharacterRepository } from '../../domain/repositories/CharacterRepository';
import { Attribute } from '@/shared/domain/enums/AttributesEnum';

export type ListCharactersOutput = {
    id: string;
    name: string;
    experience: number;
    attributes: {
        strength: number;
        dexterity: number;
        constitution: number;
        magic: number;
    };
    race: string
    characterClass: string
}[]

@Injectable()
export class ListCharacters {
    constructor(
        @Inject('CharacterRepository') private readonly characterRepository: CharacterRepository,
    ) { }

    async execute(userId: string): Promise<ListCharactersOutput> {
        const characters = await this.characterRepository.findByUserId(userId);

        return characters.map(char => ({
            id: char.getId()!,
            name: char.getName(),
            experience: char.getExperience(),
            attributes: {
                strength: char.getCharacterAttribute(Attribute.STRENGTH),
                dexterity: char.getCharacterAttribute(Attribute.DEXTERITY),
                constitution: char.getCharacterAttribute(Attribute.CONSTITUTION),
                magic: char.getCharacterAttribute(Attribute.MAGIC),
            },
            race: char.getRace().getName(),
            characterClass: char.getCharacterClass().getName()
        }));
    }
}
