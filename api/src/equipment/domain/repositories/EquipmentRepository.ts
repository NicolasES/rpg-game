import type { Equipment } from "../entities/Equipment";

export interface EquipmentRepository {
    save(equipment: Equipment): Promise<void>;
    findByCharacterId(characterId: string): Promise<Equipment>;
}
