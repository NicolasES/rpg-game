import type { CharacterRepository } from "@/character/domain/repositories/CharacterRepository";
import { Equipment } from "@/equipment/domain/entities/Equipment";
import { EquipmentSlot } from "@/equipment/domain/enums/EquipmentSlot";
import type { EquipmentRepository } from "@/equipment/domain/repositories/EquipmentRepository";
import { Inject, Injectable } from "@nestjs/common";
import type { ItemRepository } from "@/item/domain/repositories/ItemRepository";


export type SelectInitialWeaponsInput = {
    characterId: string;
    weaponId: string;
}

@Injectable()
export class SelectInitialWeapons {
    constructor(
        @Inject('ItemRepository')
        private readonly itemRepository: ItemRepository,
        @Inject('CharacterRepository')
        private readonly characterRepository: CharacterRepository,
        @Inject('EquipmentRepository')
        private readonly equipmentRepository: EquipmentRepository
    ) {}


    async execute(input: SelectInitialWeaponsInput): Promise<void> {
       const character = await this.characterRepository.findById(input.characterId);
       if (!character) {
           throw new Error('Character not found');
       }
       const initialWeapons = await this.itemRepository.getInitialWeapons();
       const weapon = initialWeapons.find(w => w.getId() === input.weaponId);
       if (!weapon) {
           throw new Error('Weapon not found');
       }
       let equipment = await this.equipmentRepository.findByCharacterId(input.characterId);
       if (!equipment) {
           equipment = new Equipment({
               characterId: input.characterId
           });
       }
       equipment.equip(EquipmentSlot.MAIN_HAND, weapon.getId()!);
       await this.equipmentRepository.save(equipment);
    }
}