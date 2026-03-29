import { Attribute, AttributeValues } from "@/shared/domain/enums/AttributesEnum";
import { HasAttributes } from "@/shared/domain/interfaces/HasAttributes";
import { Race } from "./Race";
import { CharacterClass } from "./CharacterClass";

interface CharacterProps {
    id?: string;
    name: string;
    attributes: AttributeValues;
    race: Race;
    characterClass: CharacterClass;
}

export class Character implements HasAttributes {

    readonly id?: string;
    private name: string;
    private attributes: Map<Attribute, number> = new Map();
    private race: Race;
    private characterClass: CharacterClass;

    constructor({ id, name, attributes, race, characterClass }: CharacterProps) {
        this.id = id;
        this.setName(name);
        this.setRace(race);
        this.setCharacterClass(characterClass);
        this.setAttributes(attributes);
    }

    getId(): string | undefined {
        return this.id;
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
        for (const [attr, value] of Object.entries(attributes)) {
            if (value !== undefined) {
                this.attributes.set(attr as Attribute, value);
            }
        }
    }

    getAttributeBonus(attribute: Attribute): number {
        return (this.attributes.get(attribute) || 0)
            + this.race.getAttributeBonus(attribute)
            + this.characterClass.getAttributeBonus(attribute);
    }
}