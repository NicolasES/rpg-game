import { Attribute, AttributeValues } from "@/shared/domain/enums/AttributesEnum";
import { HasAttributes } from "@/shared/domain/interfaces/HasAttributes";

export class CharacterClass implements HasAttributes {
    private id?: string;
    private name: string;
    private attributes: Map<Attribute, number> = new Map();

    constructor({ id, name, attributes }: { id?: string; name: string, attributes: AttributeValues }) {
        this.id = id;
        this.name = name;
        this.setAttributes(attributes);
    }

    getId(): string | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    setAttributes(attributes: AttributeValues): void {
        for (const [attr, value] of Object.entries(attributes)) {
            if (value !== undefined) {
                this.attributes.set(attr as Attribute, value);
            }
        }
    }

    getAttributeBonus(attribute: Attribute): number {
        return this.attributes.get(attribute) || 0;
    }

    getAttributes(): Map<Attribute, number> {
        return new Map(this.attributes);
    }
}