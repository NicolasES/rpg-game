import { Test, TestingModule } from '@nestjs/testing';
import { ShowInitialWeapons } from './ShowInitialWeapons';
import { Weapon } from '@/item/domain/entities/Weapon';
import { WeaponType } from '@/item/domain/enums/WeaponType';

describe('ShowInitialWeaponsUseCase', () => {
    let useCase: ShowInitialWeapons;
    let itemRepository: jest.Mocked<any>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ShowInitialWeapons,
                {
                    provide: 'ItemRepository',
                    useValue: {
                        getInitialWeapons: jest.fn(),
                    },
                },
            ],
        }).compile();

        useCase = module.get<ShowInitialWeapons>(ShowInitialWeapons);
        itemRepository = module.get('ItemRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('should return a list of initial weapons', async () => {
        const fakeWeapons = [
            new Weapon({ name: 'Iron Sword', type: WeaponType.SWORD, minDamage: 10, maxDamage: 20 }),
            new Weapon({ name: 'Wooden Staff', type: WeaponType.STAFF, minDamage: 5, maxDamage: 15 }),
        ];

        itemRepository.getInitialWeapons.mockResolvedValue(fakeWeapons);

        const result = await useCase.execute();

        expect(result).toHaveLength(2);
        expect(result[0].name).toBe('Iron Sword');
        expect(result[1].name).toBe('Wooden Staff');
        expect(itemRepository.getInitialWeapons).toHaveBeenCalledTimes(1);
    });

    it('should return an empty list if no weapons found', async () => {
        itemRepository.getInitialWeapons.mockResolvedValue([]);
        
        const result = await useCase.execute();
        
        expect(result).toHaveLength(0);
    });
});
