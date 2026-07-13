import { Battle } from '../entities/Battle';

export interface BattleRepository {
    save(battle: Battle): Promise<void>;
    findById(id: string): Promise<Battle | null>;
    delete(id: string): Promise<void>;
}
