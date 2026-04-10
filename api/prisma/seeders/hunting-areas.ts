import { PrismaClient } from '@prisma/client';

export async function seedHuntingAreas(prisma: PrismaClient) {
    console.log('Seeding Hunting Areas...');

    const areas = [
        {
            name: 'Floresta',
            description: 'Uma densa floresta onde goblins e orcs se escondem.',
            levels: [
                {
                    level: 1,
                    monsters: ['Goblin']
                },
                {
                    level: 2,
                    monsters: ['Goblin', 'Orc']
                }
            ]
        },
        {
            name: 'Deserto',
            description: 'Um deserto escaldante cheio de criaturas venenosas.',
            levels: [
                {
                    level: 1,
                    monsters: ['Giant Spider', 'Sand Serpent']
                },
                {
                    level: 2,
                    monsters: ['Giant Spider', 'Sand Serpent', 'Desert Scorpion']
                }
            ]
        }
    ];

    for (const area of areas) {
        const createdArea = await prisma.huntingArea.upsert({
            where: { name: area.name },
            update: { description: area.description },
            create: { name: area.name, description: area.description },
        });

        for (const level of area.levels) {
            const monstersCreate = level.monsters.map(name => ({
                monster: { connect: { name } }
            }));

            await prisma.huntingAreaLevel.upsert({
                where: { 
                    huntingAreaId_level: {
                        huntingAreaId: createdArea.id,
                        level: level.level
                    }
                },
                update: {
                    monsters: {
                        deleteMany: {}, // Clear existing to prevent duplicates during seed
                        create: monstersCreate
                    }
                },
                create: {
                    huntingAreaId: createdArea.id,
                    level: level.level,
                    monsters: {
                        create: monstersCreate
                    }
                }
            });
        }
    }
}
