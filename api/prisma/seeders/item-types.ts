import { PrismaClient } from '@prisma/client';

/**
 * Tipos de itens disponíveis no jogo.
 * São dados extensíveis — novos tipos podem ser inseridos sem alterar o schema.
 */
export async function seedItemTypes(prisma: PrismaClient) {
    const types = [
        // Armas
        'SWORD',
        'AXE',
        'BOW',
        'STAFF',
        'DAGGER',
        'MACE',
        // Armaduras & acessórios
        'ARMOR',
        'RING',
        'LEGS',
        // Consumíveis
        'POTION',
        'FOOD',
    ];

    for (const name of types) {
        await prisma.itemType.upsert({
            where:  { name },
            update: {},
            create: { name },
        });
    }

    console.log(`  ✔ Item types seeded (${types.length})`);
}
