import { Inject, Injectable } from "@nestjs/common";
import { AttributeValues } from "@/shared/domain/enums/AttributesEnum";
import { Character } from "@/character/domain/entities/Character";
import type { CharacterRepository } from "@/character/domain/repositories/CharacterRepository";
import type { RaceRepository } from "@/character/domain/repositories/RaceRepository";
import type { CharacterClassRepository } from "@/character/domain/repositories/CharacterClassRepository";
import type { EquipmentRepository } from "@/equipment/domain/repositories/EquipmentRepository";
import { Equipment } from "@/equipment/domain/entities/Equipment";

export type CreateCharacterInput = {
    name: string;
    attributes: AttributeValues;
    raceId: string;
    characterClassId: string;
}

export type CreateCharacterOutput = {
    id: string;
    name: string;
    race: { name: string };
    characterClass: { name: string };
}

@Injectable()
export class CreateCharacter {
    constructor(
        @Inject('CharacterRepository')
        private readonly characterRepository: CharacterRepository,
        @Inject('RaceRepository')
        private readonly raceRepository: RaceRepository,
        @Inject('CharacterClassRepository')
        private readonly characterClassRepository: CharacterClassRepository,
        @Inject('EquipmentRepository')
        private readonly equipmentRepository: EquipmentRepository
    ) {}

    async execute(input: CreateCharacterInput): Promise<CreateCharacterOutput> {
        const race = await this.raceRepository.findById(input.raceId);
        if (!race) {
            throw new Error('Race not found');
        }
        const characterClass = await this.characterClassRepository.findById(input.characterClassId);
        if (!characterClass) {
            throw new Error('Character class not found');
        }
        const character = new Character({
            name: input.name,
            attributes: input.attributes,
            race,
            characterClass,
        });
        await this.characterRepository.save(character);
        const equipment = new Equipment({
            characterId: character.getId()!,
        });
        await this.equipmentRepository.save(equipment);

        return {
            id: character.getId()!,
            name: character.getName(),
            race: { name: character.getRace().getName() },
            characterClass: { name: character.getCharacterClass().getName() },
        };
    }
}
