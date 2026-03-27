interface ItemProps {
    id?: string;
    name: string;
}

export class Item {
    readonly id?: string;
    private name: string;

    constructor({ id, name }: ItemProps) {
        this.id = id;
        this.setName(name);
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
}