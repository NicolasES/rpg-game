import { Inject, Injectable } from "@nestjs/common";
import type { RaceRepository } from "@/character/domain/repositories/RaceRepository";

export type ListRacesOutput = {
    id: string;
    name: string;
    attributes: Record<string, number>;
}[]

@Injectable()
export class ListRaces {
    constructor(
        @Inject('RaceRepository')
        private readonly raceRepository: RaceRepository
    ) {}

    async execute(): Promise<ListRacesOutput> {
        const races = await this.raceRepository.findAll();
        return races.map(race => ({
            id: race.getId()!,
            name: race.getName(),
            attributes: Object.fromEntries(race.getAttributes())
        }));
    }
}
