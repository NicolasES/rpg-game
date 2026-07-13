import { Monster } from '../../domain/entities/Monster';

export interface MonsterProvider {
    generateEncounter(huntingAreaLevelId: string): Promise<Monster[]>;
}
