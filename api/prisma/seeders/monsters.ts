import { PrismaClient } from '@prisma/client';

export async function seedMonsters(prisma: PrismaClient) {
    console.log('Seeding Monsters...');

    const monsters = [
        // Forest
        { name: 'Goblin', hp: 30, baseExp: 10, strength: 8, dexterity: 8, constitution: 6, magic: 6 },
        { name: 'Orc', hp: 50, baseExp: 25, strength: 12, dexterity: 6, constitution: 10, magic: 6 },
        // Desert
        { name: 'Giant Spider', hp: 25, baseExp: 15, strength: 6, dexterity: 12, constitution: 6, magic: 6 },
        { name: 'Desert Scorpion', hp: 40, baseExp: 30, strength: 10, dexterity: 10, constitution: 8, magic: 6 },
        { name: 'Sand Serpent', hp: 35, baseExp: 20, strength: 8, dexterity: 14, constitution: 6, magic: 6 },
    ];

    for (const data of monsters) {
        await prisma.monster.upsert({
            where: { name: data.name },
            update: {},
            create: data,
        });
    }
}
