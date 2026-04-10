import { Test, TestingModule } from '@nestjs/testing';
import { ListUnlockedHuntingAreas, ListUnlockedHuntingAreasOutput } from './ListUnlockedHuntingAreas';

describe('ListUnlockedHuntingAreas UseCase', () => {
    let useCase: ListUnlockedHuntingAreas;
    let characterRepository: jest.Mocked<any>;
    let huntingAreaDao: jest.Mocked<any>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ListUnlockedHuntingAreas,
                {
                    provide: 'CharacterRepository',
                    useValue: {
                        findById: jest.fn(),
                    },
                },
                {
                    provide: 'HuntingAreaDao',
                    useValue: {
                        getUnlockedAreas: jest.fn(),
                    },
                },
            ],
        }).compile();

        useCase = module.get<ListUnlockedHuntingAreas>(ListUnlockedHuntingAreas);
        characterRepository = module.get('CharacterRepository');
        huntingAreaDao = module.get('HuntingAreaDao');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('should throw an error if character is not found', async () => {
        characterRepository.findById.mockResolvedValueOnce(null);

        await expect(useCase.execute('invalid-id')).rejects.toThrow('Character not found');
        expect(characterRepository.findById).toHaveBeenCalledWith('invalid-id');
        expect(huntingAreaDao.getUnlockedAreas).not.toHaveBeenCalled();
    });

    it('should list only unlocked areas with flat structure successfully', async () => {
        characterRepository.findById.mockResolvedValueOnce({ id: 'valid-id', name: 'Hero' });
        
        const mockDaoResult: ListUnlockedHuntingAreasOutput[] = [
            {
                id: '1',
                name: 'Forest',
                levels: [
                    { id: '10', level: 1 },
                    { id: '11', level: 2 }
                ]
            }
        ];

        huntingAreaDao.getUnlockedAreas.mockResolvedValueOnce(mockDaoResult);

        const result = await useCase.execute('valid-id');

        expect(characterRepository.findById).toHaveBeenCalledWith('valid-id');
        expect(huntingAreaDao.getUnlockedAreas).toHaveBeenCalledWith('valid-id');
        
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('Forest');
        expect(result[0].levels).toHaveLength(2);
        expect(result[0].levels[0].level).toBe(1);
        expect(result[0].levels[1].level).toBe(2);
    });
});
