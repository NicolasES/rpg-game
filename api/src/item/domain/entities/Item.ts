import { Attribute, AttributeValues } from "@/shared/domain/enums/AttributesEnum";
import { HasAttributes } from "@/shared/domain/interfaces/HasAttributes";

export type ItemProps = {
    id?: string;
    name: string;
    attributes?: AttributeValues;
}

export class Item implements HasAttributes{
    readonly id?: string;
    private name: string;
    private attributes: Map<Attribute, number> = new Map();

    constructor({ id, name, attributes }: ItemProps) {
        this.id = id;
        this.setName(name);
        if (attributes) {
            this.setAttributes(attributes);
        }
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

    getAttributeBonus(attribute: Attribute): number {
        return this.attributes.get(attribute) || 0;
    }
   
    setAttributes(attributes: AttributeValues): void {
        for (const [attr, value] of Object.entries(attributes)) {
            if (value !== undefined) {
                this.attributes.set(attr as Attribute, value);
            }
        }
    }
}