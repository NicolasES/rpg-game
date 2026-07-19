import { Injectable } from '@nestjs/common';
import { RedisService } from '@/shared/infrastructure/database/RedisService';
import { BattleRepository } from '../../domain/repositories/BattleRepository';
import { Battle, BattleStateProps } from '../../domain/entities/Battle';
import { Hero } from '../../domain/entities/Hero';
import { Monster } from '../../domain/entities/Monster';
import { Weapon } from '../../domain/entities/Weapon';
import { Damage } from '../../domain/value-objects/Damage';

@Injectable()
export class RedisBattleRepository implements BattleRepository {
    constructor(private readonly redis: RedisService) {}

    async save(battle: Battle): Promise<void> {
        await this.redis.set(
            `battle:${battle.getId()}`,
            JSON.stringify(battle.getState()),
            'EX',
            3600
        );
    }

    async findById(id: string): Promise<Battle | null> {
        const data = await this.redis.get(`battle:${id}`);
        if (!data) return null;

        const state = JSON.parse(data);

        const party = state.party.map((heroData: any) => this.hydrateHero(heroData));
        const enemies = state.enemies.map((monsterData: any) => this.hydrateMonster(monsterData));

        return new Battle({
            id: state.id,
            userId: state.userId,
            party,
            enemies,
            turn: state.turn,
            status: state.status
        });
    }

    private hydrateHero(data: any): Hero {
        const weaponData = data.weapon.props;
        const damages = weaponData.damages.map((d: any) => new Damage(d.min, d.max, d.type));
        const weapon = new Weapon({ ...weaponData, damages });
        return new Hero({ ...data, weapon });
    }

    private hydrateMonster(data: any): Monster {
        return new Monster({ ...data });
    }

    async delete(id: string): Promise<void> {
        await this.redis.del(`battle:${id}`);
    }
}
