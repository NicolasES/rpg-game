import { EquipmentSlot } from "@/equipment/domain/enums/EquipmentSlot";

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
  ): void {
    this.slots.set(slot, itemId);
  }

  unequip(slot: EquipmentSlot): void {
    this.slots.delete(slot);
  }

  get(slot: EquipmentSlot): string | undefined {
    return this.slots.get(slot);
  }
}