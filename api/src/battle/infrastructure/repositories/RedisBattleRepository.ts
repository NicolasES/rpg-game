import { Injectable } from '@nestjs/common';
import { RedisService } from '@/shared/infrastructure/database/RedisService';
import { BattleRepository } from '../../domain/repositories/BattleRepository';
import { Battle, BattleStateProps } from '../../domain/entities/Battle';

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

        const state: BattleStateProps = JSON.parse(data);
        return new Battle(state);
    }

    async delete(id: string): Promise<void> {
        await this.redis.del(`battle:${id}`);
    }
}
