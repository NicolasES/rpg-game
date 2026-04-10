import { Attribute, AttributeValues } from "@/shared/domain/enums/AttributesEnum";
import { HasAttributes } from "@/shared/domain/interfaces/HasAttributes";

type MonsterProps = {
    id?: string;
    name: string;
    hp: number;
    baseExp: number;
    attributes: AttributeValues;
}

export class Monster implements HasAttributes{
    private id?: string;
    private name: string;
    private hp: number;
    private baseExp: number;
    private attributes: Map<Attribute, number> = new Map();

    constructor(data: MonsterProps) {
        this.id = data.id;
        this.name = data.name;
        this.hp = data.hp;
        this.baseExp = data.baseExp;
        this.setAttributes(data.attributes);
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

    getId() { return this.id; }
    getName() { return this.name; }
    getHp() { return this.hp; }
    getBaseExp() { return this.baseExp; }
}
