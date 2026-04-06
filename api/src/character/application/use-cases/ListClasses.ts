import { Inject, Injectable } from "@nestjs/common";
import type { CharacterClassRepository } from "@/character/domain/repositories/CharacterClassRepository";

export type ListClassesOutput = {
    id: string;
    name: string;
    attributes: Record<string, number>;
}[]

@Injectable()
export class ListClasses {
    constructor(
        @Inject('CharacterClassRepository')
        private readonly characterClassRepository: CharacterClassRepository
    ) {}

    async execute(): Promise<ListClassesOutput> {
        const classes = await this.characterClassRepository.findAll();
        return classes.map(cls => ({
            id: cls.getId()!,
            name: cls.getName(),
            attributes: Object.fromEntries(cls.getAttributes())
        }));
    }
}
