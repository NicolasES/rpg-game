import { EquipmentSlot } from "../enums/EquipmentSlot";

export class Equipment {

  readonly id?: string;
  readonly characterId: string;
  private slots = new Map<EquipmentSlot, string>();

  constructor({ id, characterId }: { id?: string, characterId: string }) {
    this.id = id;
    this.characterId = characterId;
  }

  equip(
    slot: EquipmentSlot,
    itemId: string
  ) {
    this.slots.set(slot, itemId);
  }

  unequip(slot: EquipmentSlot) {
    this.slots.delete(slot);
  }

  get(slot: EquipmentSlot) {
    return this.slots.get(slot);
  }
}