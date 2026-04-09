import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/shared/infrastructure/database/PrismaService';
import { Attribute } from './../src/shared/domain/enums/AttributesEnum';

describe('CharacterController (e2e)', () => {
    let app: INestApplication;
    let prisma: PrismaService;

    jest.setTimeout(30000);

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        prisma = app.get<PrismaService>(PrismaService);
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    beforeEach(async () => {
        // Limpeza do banco para garantir isolamento
        await prisma.character.deleteMany();
        await prisma.race.deleteMany();
        await prisma.characterClass.deleteMany();
    });

    it('/character (POST) - deve criar um novo personagem no banco', async () => {
        // 1. Preparar os dados (Seeding)
        const race = await prisma.race.create({
            data: {
                name: 'Human',
                strength: 2,
                dexterity: 1,
                constitution: 1,
                magic: 0,
            },
        });

        const characterClass = await prisma.characterClass.create({
            data: {
                name: 'Warrior',
                strength: 3,
                dexterity: 1,
                constitution: 2,
                magic: 0,
            },
        });

        const input = {
            name: 'Aragorn',
            raceId: race.id.toString(),
            characterClassId: characterClass.id.toString(),
            attributes: {
                [Attribute.STRENGTH]: 6,
                [Attribute.DEXTERITY]: 7,
                [Attribute.CONSTITUTION]: 6,
                [Attribute.MAGIC]: 6
            },
        };

        // 2. Executar a requisição
        const response = await request(app.getHttpServer())
            .post('/character')
            .send(input)
            .expect(201); // Created

        // 3. Validar a resposta da API
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('Aragorn');
        expect(response.body.race.name).toBe('Human');
        expect(response.body.characterClass.name).toBe('Warrior');

        // 4. Validar se os dados foram persistidos no banco de dados
        const characterInDb = await prisma.character.findUnique({
            where: { id: parseInt(response.body.id) },
        });

        expect(characterInDb).not.toBeNull();
        expect(characterInDb?.name).toBe('Aragorn');
        
        // Validar os bônus acumulados (Persistência no PrismaCharacterRepository soma os bônus)
        expect(characterInDb?.strength).toBe(6);
        expect(characterInDb?.dexterity).toBe(7);
        expect(characterInDb?.constitution).toBe(6);
        expect(characterInDb?.magic).toBe(6);
    });
});
