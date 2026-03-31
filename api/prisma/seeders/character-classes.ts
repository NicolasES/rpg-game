import { PrismaClient } from '@prisma/client';

/**
 * Classes disponíveis no jogo.
 * Cada classe possui bônus de atributos que definem o arquétipo do personagem.
 *
 * - Warrior: forte e resistente  (+STR, +CON)
 * - Mage:    poderoso magicamente (+MAG, +DEX)
 * - Archer:  ágil e preciso       (+DEX alto)
 */
export async function seedCharacterClasses(prisma: PrismaClient) {
    const classes = [
        {
            name: 'Warrior',
            strength:     2,
            dexterity:    0,
            constitution: 1,
            magic:        0,
        },
        {
            name: 'Mage',
            strength:     -1,
            dexterity:    0,
            constitution: 0,
            magic:        4,
        },
        {
            name: 'Archer',
            strength:     0,
            dexterity:    3,
            constitution: 0,
            magic:        0,
        },
    ];

    for (const characterClass of classes) {
        await prisma.characterClass.upsert({
            where:  { name: characterClass.name },
            update: characterClass,
            create: characterClass,
        });
    }

    console.log(`  ✔ Character classes seeded (${classes.length})`);
}
