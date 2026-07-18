import { Inject, Injectable } from '@nestjs/common';
import { HeroProvider } from '../../application/providers/HeroProvider';
import type { CharacterRepository } from '@/character/domain/repositories/CharacterRepository';
import type { EquipmentRepository } from '@/equipment/domain/repositories/EquipmentRepository';
import type { ItemRepository } from '@/item/domain/repositories/ItemRepository';
import { Equipment } from '@/equipment/domain/entities/Equipment';
import { EquipmentSlot } from '@/equipment/domain/enums/EquipmentSlot';
import { Attribute } from '@/shared/domain/enums/AttributesEnum';
import { Hero } from '@/battle/domain/entities/Hero';
import { Weapon } from '@/battle/domain/entities/Weapon';
import { Weapon as ItemWeapon } from '@/item/domain/entities/Weapon';
import { Damage } from '@/battle/domain/value-objects/Damage';
import { DamageTypes } from '@/battle/domain/types/DamageType';

@Injectable()
export class CharacterModuleCombatantProvider implements HeroProvider {
    constructor(
        @Inject('CharacterRepository') private readonly characterRepository: CharacterRepository,
        @Inject('EquipmentRepository') private readonly equipmentRepository: EquipmentRepository,
        @Inject('ItemRepository') private readonly itemRepository: ItemRepository
    ) { }

    async getHeroesByIds(ids: string[], userId: string): Promise<Hero[]> {
        const characters = await this.getValidCharacters(ids, userId);
        if (characters.length === 0) return [];
        const characterIds = characters.map(char => char.getId() as string);
        const equipments = await this.getEquipments(characterIds);
        const weapons = await this.getWeapons(equipments);
        const heroes = characters.map(char => {
            const charId = char.getId() as string;
            const equipment = equipments.find(eq => eq.characterId === charId);
            const itemWeapon = this.getEquippedWeapon(equipment, weapons);
            const battleWeapon = this.createBattleWeapon(itemWeapon);
            const constitution = char!.getAttributeBonus(Attribute.CONSTITUTION) + (itemWeapon ? itemWeapon.getAttributeBonus(Attribute.CONSTITUTION) : 0);

            return new Hero({
                id: char.getId() as string,
                name: char.getName(),
                race: char.getRace().getName(),
                characterClass: char.getCharacterClass().getName(),
                attributes: {
                    [Attribute.STRENGTH]: char.getAttributeBonus(Attribute.STRENGTH) + (itemWeapon ? itemWeapon.getAttributeBonus(Attribute.STRENGTH) : 0),
                    [Attribute.DEXTERITY]: char.getAttributeBonus(Attribute.DEXTERITY) + (itemWeapon ? itemWeapon.getAttributeBonus(Attribute.DEXTERITY) : 0),
                    [Attribute.CONSTITUTION]: constitution,
                    [Attribute.MAGIC]: char.getAttributeBonus(Attribute.MAGIC) + (itemWeapon ? itemWeapon.getAttributeBonus(Attribute.MAGIC) : 0),
                },
                hp: constitution * 10,
                maxHp: constitution * 10,
                weapon: battleWeapon
            });
        });

        return heroes;
    }

    private async getValidCharacters(ids: string[], userId: string) {
        const characters = await this.characterRepository.findByIds(ids);
        return characters.filter(char => char.getUserId() === userId);
    }

    private async getEquipments(characterIds: string[]) {
        return this.equipmentRepository.findByCharacterIds(characterIds);
    }

    private async getWeapons(equipments: Equipment[]) {
        const weaponIds = equipments
            .map(eq => eq.get(EquipmentSlot.MAIN_HAND))
            .filter((id): id is string => id != null);
        return this.itemRepository.findByIds([...new Set(weaponIds)]);
    }

    private getEquippedWeapon(equipment: Equipment | undefined, weapons: ItemWeapon[]): ItemWeapon | null {
        const mainHandId = equipment?.get(EquipmentSlot.MAIN_HAND);
        return weapons.find(w => w.getId() === mainHandId) || null;
    }

    private createBattleWeapon(itemWeapon: ItemWeapon | null): Weapon {
        if (itemWeapon) {
            return new Weapon({
                id: itemWeapon.getId() as string,
                name: itemWeapon.getName(),
                damages: [new Damage(itemWeapon.getMinDamage(), itemWeapon.getMaxDamage(), DamageTypes.PHYSICAL)]
            });
        }

        return new Weapon({
            id: 'unarmed',
            name: 'Fists',
            damages: [new Damage(1, 2, DamageTypes.PHYSICAL)]
        });
    }
}
