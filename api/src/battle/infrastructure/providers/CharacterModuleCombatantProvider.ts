import { Inject, Injectable } from '@nestjs/common';
import { HeroProvider } from '../../application/providers/HeroProvider';
import type { CharacterRepository } from '@/character/domain/repositories/CharacterRepository';
import { Attribute } from '@/shared/domain/enums/AttributesEnum';
import { Hero } from '@/battle/domain/entities/Hero';
import { Weapon } from '@/battle/domain/entities/Weapon';
import { Damage } from '@/battle/domain/value-objects/Damage';
import { DamageTypes } from '@/battle/domain/types/DamageType';

@Injectable()
export class CharacterModuleCombatantProvider implements HeroProvider {
    constructor(
        @Inject('CharacterRepository') private readonly characterRepository: CharacterRepository
    ) { }

    async getHeroesByIds(ids: string[], userId: string): Promise<Hero[]> {
        const charactersPromises = ids.map(id => this.characterRepository.findById(id));
        const charactersResult = await Promise.all(charactersPromises);
        const characters = charactersResult.filter(char => char !== null && char.getUserId() === userId);

        return characters.map(char => {
            const constitution = char!.getAttributeBonus(Attribute.CONSTITUTION);

            return new Hero({
                id: char!.getId() as string,
                name: char!.getName(),
                race: char!.getRace().getName(),
                characterClass: char!.getCharacterClass().getName(),
                attributes: Object.fromEntries(char!.getAttributes()),
                hp: constitution * 10,
                maxHp: constitution * 10,
                weapon: new Weapon({ // TODO: buscar weapon
                    id: '1',
                    name: 'Weapon',
                    damages: [new Damage(1, 10, DamageTypes.PHYSICAL)]
                })
            });
        });
    }
}
