import { CharacterClass } from "../entities/CharacterClass";

export interface CharacterClassRepository {
    findById(id: string): Promise<CharacterClass | null>;
    findAll(): Promise<CharacterClass[]>;
}