import { PrismaClient } from '../../generated/prisma';

/**
 * Raças disponíveis no jogo.
 * Cada raça possui bônus de atributos que refletem suas características.
 *
 * - Human:  equilibrado, sem bônus especial
 * - Elf:    ágil e mágico (+DEX, +MAG)
 * - Dwarf:  resistente e forte  (+CON, +STR)
 * - Orc:    bruto e selvagem    (+STR alto, -MAG)
 */
export async function seedRaces(prisma: PrismaClient) {
    const races = [
        {
            name: 'Human',
            strength:     1,
            dexterity:    2,
            constitution: 1,
            magic:        1,
        },
        {
            name: 'Elf',
            strength:     -1,
            dexterity:    4,
            constitution: -1,
            magic:        3,
        },
        {
            name: 'Dwarf',
            strength:     2,
            dexterity:    0,
            constitution:5,
            magic:        -2,
        },
        {
            name: 'Orc',
            strength:     5,
            dexterity:    1,
            constitution: 2,
            magic:        -3,
        },
    ];

    for (const race of races) {
        await prisma.race.upsert({
            where:  { name: race.name },
            update: race,
            create: race,
        });
    }

    console.log(`  ✔ Races seeded (${races.length})`);
}
