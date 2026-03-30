import { Weapon } from "@/item/domain/entities/Weapon";

export interface ItemRepository {
    findById(id: string): Promise<Weapon>;
    getInitialWeapons(): Promise<Weapon[]>;
}