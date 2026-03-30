import { Character } from "@/character/domain/entities/Character";

export interface CharacterRepository {
    save(character: Character): Promise<void>;
    findById(id: string): Promise<Character | null>;
}
