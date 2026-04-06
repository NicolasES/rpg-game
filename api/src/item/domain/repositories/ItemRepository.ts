import { Weapon } from "@/item/domain/entities/Weapon";

export interface ItemRepository {
    findById(id: string): Promise<Weapon | null>;
    getInitialWeapons(): Promise<Weapon[]>;
}