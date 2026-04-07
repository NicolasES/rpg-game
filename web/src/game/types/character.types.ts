export interface Race {
    id: string;
    name: string;
    attributes: Record<string, number>;
}

export interface CharacterClass {
    id: string;
    name: string;
    attributes: Record<string, number>;
}

export interface Weapon {
    name: string;
    type: string;
    minDamage: number;
    maxDamage: number;
}

export interface CreationData {
    races: Race[];
    classes: CharacterClass[];
    weapons: Weapon[];
}

export interface CreateCharacterDto {
    name: string;
    raceId: string;
    characterClassId: string;
    attributes: Record<string, number>;
}
