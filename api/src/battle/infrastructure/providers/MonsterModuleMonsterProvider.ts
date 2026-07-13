import { Inject, Injectable } from '@nestjs/common';
import { MonsterProvider } from '../../application/providers/MonsterProvider';
import type { MonsterRepository } from '@/monster/domain/repositories/MonsterRepository';
import { Monster } from '../../domain/entities/Monster';
import { Attribute } from '@/shared/domain/enums/AttributesEnum';

@Injectable()
export class MonsterModuleMonsterProvider implements MonsterProvider {
    constructor(
        @Inject('MonsterRepository') private readonly monsterRepository: MonsterRepository
    ) { }

    async generateEncounter(huntingAreaLevelId: string): Promise<Monster[]> {
        const monsters = await this.monsterRepository.findByHuntingAreaLevelId(huntingAreaLevelId);

        if (monsters.length === 0) {
            return [];
        }

        const numEnemies = Math.floor(Math.random() * 5) + 1; // 1 to 5 enemies
        const enemies: Monster[] = [];

        for (let i = 0; i < numEnemies; i++) {
            const randomIndex = Math.floor(Math.random() * monsters.length);
            const m = monsters[randomIndex];

            enemies.push(new Monster({
                id: m.getId()!,
                name: m.getName(),
                hp: m.getHp(),
                maxHp: m.getHp(),
                attributes: {
                    [Attribute.STRENGTH]: m.getAttributeBonus(Attribute.STRENGTH),
                    [Attribute.DEXTERITY]: m.getAttributeBonus(Attribute.DEXTERITY),
                    [Attribute.CONSTITUTION]: m.getAttributeBonus(Attribute.CONSTITUTION),
                    [Attribute.MAGIC]: m.getAttributeBonus(Attribute.MAGIC)
                }
            }));
        }

        return enemies;
    }
}
