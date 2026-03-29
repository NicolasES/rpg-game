import { Attribute, AttributeValues } from "@/shared/domain/enums/AttributesEnum";

export interface HasAttributes {
    getAttributeBonus(attribute: Attribute): number;
    setAttributes(attributes: AttributeValues): void;
}