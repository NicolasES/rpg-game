import { Test, TestingModule } from '@nestjs/testing';
import { CharacterController } from './character.controller';
import { Attribute } from '@/shared/domain/enums/AttributesEnum';
import { CreateCharacter, type CreateCharacterInput } from './application/use-cases/CreateCharacter';

describe('CharacterController', () => {
  let controller: CharacterController;
  let createCharacter: CreateCharacter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharacterController],
      providers: [
        {
          provide: CreateCharacter,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CharacterController>(CharacterController);
    createCharacter = module.get<CreateCharacter>(CreateCharacter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call CreateCharacter.execute with correct parameters and return the result', async () => {
    const mockInput: CreateCharacterInput = {
      name: 'Legolas',
      attributes: {
        [Attribute.STRENGTH]: 10,
        [Attribute.DEXTERITY]: 15,
        [Attribute.CONSTITUTION]: 12,
        [Attribute.MAGIC]: 8
      },
      raceId: '1',
      characterClassId: '2',
    };
    
    const mockOutput = {
      id: '123',
      name: 'Legolas',
      race: { name: 'Elf' },
      characterClass: { name: 'Archer' }
    };

    jest.spyOn(createCharacter, 'execute').mockResolvedValue(mockOutput);

    const result = await controller.create(mockInput);

    expect(createCharacter.execute).toHaveBeenCalledTimes(1);
    expect(createCharacter.execute).toHaveBeenCalledWith(mockInput);
    expect(result).toEqual(mockOutput);
  });
});
