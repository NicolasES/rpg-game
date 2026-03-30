import { Inject, Injectable } from "@nestjs/common";
import type { ItemRepository } from "@/item/domain/repositories/ItemRepository";


export type ShowInitialWeaponsOutput = {
    name: string;
    type: string;
    minDamage: number;
    maxDamage: number;
}[]

@Injectable()
export class ShowInitialWeapons {
    constructor(
        @Inject('ItemRepository')
        private readonly itemRepository: ItemRepository
    ) {}


    async execute(): Promise<ShowInitialWeaponsOutput> {
        const weapons = await this.itemRepository.getInitialWeapons();
        return weapons.map(weapon => ({
            name: weapon.getName(),
            type: weapon.getType(),
            minDamage: weapon.getMinDamage(),
            maxDamage: weapon.getMaxDamage()
        }));
    }
}