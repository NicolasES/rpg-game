import { Character } from "../entities/Character";

export interface CharacterRepository {
    save(character: Character): Promise<void>;
    findById(id: string): Promise<Character | null>;
}
