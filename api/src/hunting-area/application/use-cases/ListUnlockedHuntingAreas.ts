import { Inject, Injectable } from "@nestjs/common";
import type { CharacterRepository } from "@/character/domain/repositories/CharacterRepository";
import type { HuntingAreaDao } from "../dao/HuntingAreaDao";

export type ListUnlockedHuntingAreasOutput = {
    id: string;
    name: string;
    description?: string;
    levels: {
        id: string;
        level: number;
    }[];
};

@Injectable()
export class ListUnlockedHuntingAreas {
    constructor(
        @Inject('CharacterRepository')
        private readonly characterRepository: CharacterRepository,
        @Inject('HuntingAreaDao')
        private readonly huntingAreaDao: HuntingAreaDao
    ) {}

    async execute(characterId: string): Promise<ListUnlockedHuntingAreasOutput[]> {
        const character = await this.characterRepository.findById(characterId);
        
        if (!character) {
            throw new Error('Character not found');
        }

        return this.huntingAreaDao.getUnlockedAreas(characterId);
    }
}
