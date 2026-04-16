import { Attribute, AttributeValues } from "@/shared/domain/enums/AttributesEnum";
import { HasAttributes } from "@/shared/domain/interfaces/HasAttributes";
import { Race } from "./Race";
import { CharacterClass } from "./CharacterClass";

interface CharacterProps {
    id?: string;
    userId: string;
    name: string;
    attributes: AttributeValues;
    race: Race;
    characterClass: CharacterClass;
    experience?: number;
}

export class Character implements HasAttributes {

    private id?: string;
    private userId: string;
    private name: string;
    private attributes: Map<Attribute, number> = new Map();
    private race: Race;
    private characterClass: CharacterClass;
    private experience: number;

    constructor({ id, userId, name, attributes, race, characterClass, experience = 0 }: CharacterProps) {
        this.id = id;
        this.userId = userId;
        this.setName(name);
        this.setRace(race);
        this.setCharacterClass(characterClass);
        this.setAttributes(attributes);
        this.experience = experience;
    }

    getId(): string | undefined {
        return this.id;
    }

    getUserId(): string {
        return this.userId;
    }

    setId(id: string): void {
        this.id = id;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string) {
        if (!name) {
            throw new Error('Name is required');
        }

        this.name = name;
    }

    getRace(): Race {
        return this.race;
    }
    
    setRace(race: Race): void {
        this.race = race;
    }
    
    getCharacterClass(): CharacterClass {
        return this.characterClass;
    }

    setCharacterClass(characterClass: CharacterClass): void {
        this.characterClass = characterClass;
    }

    setAttributes(attributes: AttributeValues): void {
        const requiredAttributes = Object.values(Attribute);
        
        for (const attr of requiredAttributes) {
            const value = attributes[attr];
            
            if (value === undefined || value === null) {
                throw new Error(`Attribute ${attr} is required`);
            }

            if (value < 6) {
                throw new Error(`Attribute ${attr} must be at least 6`);
            }

            this.attributes.set(attr, value);
        }
    }

    getAttributeBonus(attribute: Attribute): number {
        return (this.attributes.get(attribute) || 0)
            + this.race.getAttributeBonus(attribute)
            + this.characterClass.getAttributeBonus(attribute);
    }

    getCharacterAttribute(attribute: Attribute): number {
        return this.attributes.get(attribute) || 0;
    }

    getAttributes(): Map<Attribute, number> {
        return new Map(this.attributes);
    }

    getLevel(): number {
        if (this.experience < 100) return 1;
        // Formula = exp: 100 + 50 * (L - 2) * (L - 1). Inverse math gives:
        return Math.floor((3 + Math.sqrt(1 + (this.experience - 100) / 12.5)) / 2);
    }

    getExperience(): number {
        return this.experience;
    }
}