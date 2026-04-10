import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/infrastructure/database/PrismaService';
import { HuntingAreaDao } from '@/hunting-area/application/dao/HuntingAreaDao';
import { ListUnlockedHuntingAreasOutput } from '@/hunting-area/application/use-cases/ListUnlockedHuntingAreas';

@Injectable()
export class PrismaHuntingAreaDao implements HuntingAreaDao {
    constructor(private readonly prisma: PrismaService) {}

    async getUnlockedAreas(characterId: string): Promise<ListUnlockedHuntingAreasOutput[]> {
        // Query to get all areas, including their levels and the character's specific progress
        const allAreas = await this.prisma.huntingArea.findMany({
            include: {
                levels: true,
                characterProgress: {
                    where: { characterId: parseInt(characterId) }
                }
            }
        });

        const result: ListUnlockedHuntingAreasOutput[] = [];

        for (const area of allAreas) {
            // Because characterProgress is filtered by characterId, it'll have 0 or 1 item
            const progress = area.characterProgress[0];
            const maxLevel = progress ? progress.highestLevelUnlocked : 1;
            
            const unlockedLevels = area.levels
                .filter(l => l.level <= maxLevel)
                .map(l => ({
                    id: String(l.id),
                    level: l.level
                }));

            if (unlockedLevels.length > 0) {
                result.push({
                    id: String(area.id),
                    name: area.name,
                    description: area.description || undefined,
                    levels: unlockedLevels
                });
            }
        }

        return result;
    }
}
