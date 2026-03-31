import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { seedRaces } from './seeders/races';
import { seedCharacterClasses } from './seeders/character-classes';
import { seedItemTypes } from './seeders/item-types';
import { seedWeapons } from './seeders/weapons';

import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const databaseUrl = new URL(process.env.DATABASE_URL!);
const adapter = new PrismaMariaDb({
    host: databaseUrl.hostname,
    port: parseInt(databaseUrl.port, 10) || 3306,
    user: databaseUrl.username,
    password: databaseUrl.password,
    database: databaseUrl.pathname.slice(1),
});

const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Starting seed...\n');

    await seedRaces(prisma);
    await seedCharacterClasses(prisma);
    await seedItemTypes(prisma);
    await seedWeapons(prisma);

    console.log('\n✅ Seed completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());