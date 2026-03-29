import { Attribute, AttributeValues } from "@/shared/domain/enums/AttributesEnum";
import { HasAttributes } from "@/shared/domain/interfaces/HasAttributes";

export class CharacterClass implements HasAttributes {
    private name: string;
    private attributes: Map<Attribute, number> = new Map();

    constructor({ name, attributes }: { name: string, attributes: AttributeValues }) {
        this.name = name;
        this.setAttributes(attributes);
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
}