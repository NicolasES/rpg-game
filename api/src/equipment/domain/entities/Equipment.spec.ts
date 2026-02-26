import { Equipment } from "./Equipment";
import { EquipmentSlot } from "../enums/EquipmentSlot";

describe('Equipment Entity', () => {
  it('should be defined', () => {
    const equipment = new Equipment({ characterId: '123' });
    expect(equipment).toBeDefined();
  });

  it('should create an equipment with all properties', () => {
    const props = {
      id: '123',
      characterId: '456',
    };
    const equipment = new Equipment(props);

    expect(equipment.id).toBe(props.id);
    expect(equipment.characterId).toBe(props.characterId);
  });

  it('should create an equipment without an optional id', () => {
    const props = {
      characterId: '456',
    };
    const equipment = new Equipment(props);

    expect(equipment.id).toBeUndefined();
    expect(equipment.characterId).toBe(props.characterId);
  });

  it('should allow equipping an item', () => {
    const equipment = new Equipment({ characterId: '123' });
    const itemId = '456';

    equipment.equip(EquipmentSlot.MAIN_HAND, itemId);

    expect(equipment.get(EquipmentSlot.MAIN_HAND)).toBe(itemId);
  });

  it('should allow unequipping an item', () => {
    const equipment = new Equipment({ characterId: '123' });
    const itemId = '456';

    equipment.equip(EquipmentSlot.MAIN_HAND, itemId);
    equipment.unequip(EquipmentSlot.MAIN_HAND);

    expect(equipment.get(EquipmentSlot.MAIN_HAND)).toBeUndefined();
  });
});