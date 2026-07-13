import { Monster } from '../entities/Monster';

export interface MonsterRepository {
    findByHuntingAreaLevelId(levelId: string): Promise<Monster[]>;
}
