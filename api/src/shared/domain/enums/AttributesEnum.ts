export enum Attribute {
    STRENGTH = 'STR',
    DEXTERITY = 'DEX',
    CONSTITUTION = 'CON',
    MAGIC = 'MAG'
}

export type AttributeValues = Partial<Record<Attribute, number>>;
