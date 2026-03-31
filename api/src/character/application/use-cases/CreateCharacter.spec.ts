import { Test, TestingModule } from '@nestjs/testing';
import { CreateCharacter, CreateCharacterInput } from './CreateCharacter';
import { Race } from '@/character/domain/entities/Race';
import { CharacterClass } from '@/character/domain/entities/CharacterClass';
import { Attribute } from '@/shared/domain/enums/AttributesEnum';
import { Character } from '@/character/domain/entities/Character';
import { Equipment } from '@prisma/client';

describe('CreateCharacterUseCase', () => {
    let useCase: CreateCharacter;
    let characterRepository: jest.Mocked<any>;
    let raceRepository: jest.Mocked<any>;
    let characterClassRepository: jest.Mocked<any>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateCharacter,
                {
                    provide: 'CharacterRepository',
                    useValue: {
                        save: jest.fn().mockImplementation(async (character: Character) => {
                            (character as any).id = 'fake-id-123';
                            return Promise.resolve();
                        }),
                    },
                },
                {
                    provide: 'RaceRepository',
                    useValue: {
                        findById: jest.fn().mockImplementation(async (id: string) => {
                            return Promise.resolve(new Race({ name: 'Human', attributes: {} }));
                        }),
                    },
                },
                {
                    provide: 'CharacterClassRepository',
                    useValue: {
                        findById: jest.fn().mockImplementation(async (id: string) => {
                            return Promise.resolve(new CharacterClass({ name: 'Warrior', attributes: {} }));
                        }),
                    },
                },
                {
                    provide: 'EquipmentRepository',
                    useValue: {
                        save: jest.fn().mockImplementation(async (equipment: Equipment) => {
                            (equipment as any).id = 'fake-id-123';
                            return Promise.resolve();
                        }),
                    },
                },
            ],
        }).compile();

        useCase = module.get<CreateCharacter>(CreateCharacter);
        characterRepository = module.get('CharacterRepository');
        raceRepository = module.get('RaceRepository');
        characterClassRepository = module.get('CharacterClassRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('should create and save a character', async () => {
        const input: CreateCharacterInput = {
            name: 'Frodo',
            attributes: { [Attribute.STRENGTH]: 10 },
            raceId: 'human-id',
            characterClassId: 'warrior-id'
        };

        const result = await useCase.execute(input);

        expect(result.name).toBe('Frodo');
        expect(result.id).toBeDefined();
        expect(characterRepository.save).toHaveBeenCalledTimes(1);
        
        const savedCharacter = (characterRepository.save as jest.Mock).mock.calls[0][0];
        expect(savedCharacter.getName()).toBe('Frodo');
    });

    it('should throw an error if race is not found', async () => {
        raceRepository.findById.mockResolvedValueOnce(null);

        const input: CreateCharacterInput = {
            name: 'Frodo',
            attributes: { [Attribute.STRENGTH]: 10 },
            raceId: 'non-existent-race',
            characterClassId: 'warrior-id'
        };

        await expect(useCase.execute(input)).rejects.toThrow('Race not found');
    });

    it('should throw an error if character class is not found', async () => {
        characterClassRepository.findById.mockResolvedValueOnce(null);

        const input: CreateCharacterInput = {
            name: 'Frodo',
            attributes: { [Attribute.STRENGTH]: 10 },
            raceId: 'human-id',
            characterClassId: 'non-existent-class'
        };

        await expect(useCase.execute(input)).rejects.toThrow('Character class not found');
    });
});
