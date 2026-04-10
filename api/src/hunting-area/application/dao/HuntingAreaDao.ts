import { ListUnlockedHuntingAreasOutput } from '@/hunting-area/application/use-cases/ListUnlockedHuntingAreas';

export interface HuntingAreaDao {
    getUnlockedAreas(characterId: string): Promise<ListUnlockedHuntingAreasOutput[]>;
}
