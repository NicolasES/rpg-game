import { Test, TestingModule } from '@nestjs/testing';
import { SelectInitialWeapons, SelectInitialWeaponsInput } from './SelectInitialWeapons';
import { Weapon } from '@/item/domain/entities/Weapon';
import { WeaponType } from '@/item/domain/enums/WeaponType';
import { Equipment } from '@/equipment/domain/entities/Equipment';
import { EquipmentSlot } from '@/equipment/domain/enums/EquipmentSlot';

describe('SelectInitialWeaponsUseCase', () => {
    let useCase: SelectInitialWeapons;
    let itemRepository: jest.Mocked<any>;
    let characterRepository: jest.Mocked<any>;
    let equipmentRepository: jest.Mocked<any>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SelectInitialWeapons,
                {
                    provide: 'ItemRepository',
                    useValue: {
                        getInitialWeapons: jest.fn(),
                    },
                },
                {
                    provide: 'CharacterRepository',
                    useValue: {
                        findById: jest.fn(),
                    },
                },
                {
                    provide: 'EquipmentRepository',
                    useValue: {
                        findByCharacterId: jest.fn(),
                        save: jest.fn(),
                    },
                },
            ],
        }).compile();

        useCase = module.get<SelectInitialWeapons>(SelectInitialWeapons);
        itemRepository = module.get('ItemRepository');
        characterRepository = module.get('CharacterRepository');
        equipmentRepository = module.get('EquipmentRepository');
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    it('should equip an initial weapon to a character', async () => {
        const characterId = 'char-123';
        const weaponId = 'weapon-456';
        const input: SelectInitialWeaponsInput = { characterId, weaponId };

        const weapon = new Weapon({ 
            id: weaponId, 
            name: 'Steel Sword', 
            type: WeaponType.SWORD, 
            minDamage: 10, 
            maxDamage: 20 
        });

        characterRepository.findById.mockResolvedValue({ id: characterId });
        itemRepository.getInitialWeapons.mockResolvedValue([weapon]);
        equipmentRepository.findByCharacterId.mockResolvedValue(null); // No equipment yet

        await useCase.execute(input);

        expect(characterRepository.findById).toHaveBeenCalledWith(characterId);
        expect(equipmentRepository.save).toHaveBeenCalledTimes(1);
        
        const savedEquipment = (equipmentRepository.save as jest.Mock).mock.calls[0][0];
        expect(savedEquipment.characterId).toBe(characterId);
        expect(savedEquipment.get(EquipmentSlot.MAIN_HAND)).toBe(weaponId);

    });

    it('should throw an error if character not found', async () => {
        characterRepository.findById.mockResolvedValue(null);

        await expect(useCase.execute({ characterId: 'invalid', weaponId: 'any' }))
            .rejects.toThrow('Character not found');
    });

    it('should throw an error if weapon is not in initial weapons list', async () => {
        const characterId = 'char-123';
        characterRepository.findById.mockResolvedValue({ id: characterId });
        itemRepository.getInitialWeapons.mockResolvedValue([]);

        await expect(useCase.execute({ characterId, weaponId: 'not-initial' }))
            .rejects.toThrow('Weapon not found');
    });

    it('should update existing equipment if character already has one', async () => {
        const characterId = 'char-123';
        const weaponId = 'weapon-456';
        
        const weapon = new Weapon({ id: weaponId, name: 'Steel Sword', type: WeaponType.SWORD, minDamage: 10, maxDamage: 20 });
        const existingEquipment = new Equipment({ characterId });

        characterRepository.findById.mockResolvedValue({ id: characterId });
        itemRepository.getInitialWeapons.mockResolvedValue([weapon]);
        equipmentRepository.findByCharacterId.mockResolvedValue(existingEquipment);

        await useCase.execute({ characterId, weaponId });

        expect(equipmentRepository.save).toHaveBeenCalledWith(existingEquipment);
        expect(existingEquipment.get(EquipmentSlot.MAIN_HAND)).toBe(weaponId);

    });
});
