import { Test, TestingModule } from '@nestjs/testing';
import { CreateCharacterUseCase, CreateCharacterInput } from './create-character.use-case';
import { CharacterRepository } from '@/character/domain/repositories/CharacterRepository';
import { Race } from '@/character/domain/entities/Race';
import { CharacterClass } from '@/character/domain/entities/CharacterClass';
import { Attribute } from '@/shared/domain/enums/AttributesEnum';
import { Character } from '@/character/domain/entities/Character';

describe('CreateCharacterUseCase', () => {
    let useCase: CreateCharacterUseCase;
    let repository: jest.Mocked<CharacterRepository>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateCharacterUseCase,
                {
                    provide: 'CharacterRepository',
                    useValue: {
                        save: jest.fn().mockImplementation(async (character: Character) => {
                            (character as any).id = 'fake-id-123';
                            return Promise.resolve();
                        }),
                    },
                },
            ],
        }).compile();

        useCase = module.get<CreateCharacterUseCase>(CreateCharacterUseCase);
        repository = module.get('CharacterRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('should create and save a character', async () => {
        const race = new Race({ name: 'Human', attributes: {} });
        const charClass = new CharacterClass({ name: 'Warrior', attributes: {} });
        
        const input: CreateCharacterInput = {
            name: 'Frodo',
            attributes: { [Attribute.STRENGTH]: 10 },
            race: race,
            characterClass: charClass
        };

        const result = await useCase.execute(input);

        expect(result.name).toBe('Frodo');
        expect(result.id).toBeDefined();
        expect(repository.save).toHaveBeenCalledTimes(1);
        
        const savedCharacter = (repository.save as jest.Mock).mock.calls[0][0];
        expect(savedCharacter.getName()).toBe('Frodo');
    });
});
