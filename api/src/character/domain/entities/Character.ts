import { Attribute, AttributeValues } from "@/shared/domain/enums/AttributesEnum";
import { HasAttributes } from "@/shared/domain/interfaces/HasAttributes";
import { Race } from "./Race";

interface CharacterProps {
    id?: string;
    name: string;
    attributes: AttributeValues;
    race: Race;
}

export class Character implements HasAttributes {

    readonly id?: string;
    private name: string;
    private attributes: Map<Attribute, number> = new Map();
    private race: Race;

    constructor({ id, name, attributes, race }: CharacterProps) {
        this.id = id;
        this.setName(name);
        this.setRace(race);
        this.setAttributes(attributes);
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

    setRace(race: Race): void {
        this.race = race;
    }

    setAttributes(attributes: AttributeValues): void {
        for (const [attr, value] of Object.entries(attributes)) {
            if (value !== undefined) {
                this.attributes.set(attr as Attribute, value);
            }
        }
    }

    getAttributeBonus(attribute: Attribute): number {
        return (this.attributes.get(attribute) || 0) + this.race.getAttributeBonus(attribute);
    }
}