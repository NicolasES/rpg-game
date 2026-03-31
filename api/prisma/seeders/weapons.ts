import { PrismaClient, DamageType } from '@prisma/client';

/**
 * Armas iniciais do jogo.
 * Cada arma é um Item com um tipo específico e ao menos uma entrada de dano.
 * Armas que causam dano mágico também possuem bônus no atributo MAG.
 */
export async function seedWeapons(prisma: PrismaClient) {
    const weapons: Array<{
        name: string;
        typeName: string;
        attributes: { strength?: number; dexterity?: number; constitution?: number; magic?: number };
        damages: Array<{ damageType: DamageType; minDamage: number; maxDamage: number }>;
    }> = [
        {
            name: 'Sword',
            typeName: 'SWORD',
            attributes: {},
            damages: [
                { damageType: DamageType.PHYSICAL, minDamage: 12, maxDamage: 18 },
            ],
        },
        {
            name: 'Axe',
            typeName: 'AXE',
            attributes: {},
            damages: [
                { damageType: DamageType.PHYSICAL, minDamage: 8, maxDamage: 22 },
            ],
        },
        {
            name: 'Bow',
            typeName: 'BOW',
            attributes: {},
            damages: [
                { damageType: DamageType.PHYSICAL, minDamage: 6, maxDamage: 24 },
            ],
        },
        {
            name: 'Staff',
            typeName: 'STAFF',
            attributes: { magic: 1 },
            damages: [
                { damageType: DamageType.PHYSICAL, minDamage: 4,  maxDamage: 12  },
            ],
        },
        {
            name: 'Dagger',
            typeName: 'DAGGER',
            attributes: {},
            damages: [
                { damageType: DamageType.PHYSICAL, minDamage: 14, maxDamage: 16 },
            ],
        },
        {
            name: 'Mace',
            typeName: 'MACE',
            attributes: {},
            damages: [
                { damageType: DamageType.PHYSICAL, minDamage: 10, maxDamage: 20 },
            ],
        },
    ];

    for (const weapon of weapons) {
        const itemType = await prisma.itemType.findUniqueOrThrow({
            where: { name: weapon.typeName },
        });

        const existing = await prisma.item.findFirst({
            where: { name: weapon.name },
        });

        if (existing) {
            continue;
        }

        await prisma.item.create({
            data: {
                name:         weapon.name,
                typeId:       itemType.id,
                strength:     weapon.attributes.strength     ?? 0,
                dexterity:    weapon.attributes.dexterity    ?? 0,
                constitution: weapon.attributes.constitution ?? 0,
                magic:        weapon.attributes.magic        ?? 0,
                damages: {
                    create: weapon.damages,
                },
            },
        });
    }

    console.log(`  ✔ Weapons seeded (${weapons.length})`);
}
