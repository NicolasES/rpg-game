import { Inject, Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { AttributeValues } from "@/shared/domain/enums/AttributesEnum";
import { Character } from "@/character/domain/entities/Character";
import { Race } from "@/character/domain/entities/Race";
import { CharacterClass } from "@/character/domain/entities/CharacterClass";
import type { CharacterRepository } from "@/character/domain/repositories/CharacterRepository";

export type CreateCharacterInput = {
    name: string;
    attributes: AttributeValues;
    race: Race;
    characterClass: CharacterClass;
}

export type CreateCharacterOutput = {
    id: string;
    name: string;
    race: { name: string };
    characterClass: { name: string };
}

@Injectable()
export class CreateCharacterUseCase {
    constructor(
        @Inject('CharacterRepository')
        private readonly characterRepository: CharacterRepository
    ) {}

    async execute(input: CreateCharacterInput): Promise<CreateCharacterOutput> {
        const character = new Character({
            name: input.name,
            attributes: input.attributes,
            race: input.race,
            characterClass: input.characterClass,
        });

        await this.characterRepository.save(character);

        return {
            id: character.getId()!,
            name: character.getName(),
            race: { name: character.getRace().getName() },
            characterClass: { name: character.getCharacterClass().getName() },
        };
    }
}
