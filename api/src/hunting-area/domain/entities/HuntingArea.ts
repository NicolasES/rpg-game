export class HuntingArea {
    private id?: string;
    private name: string;
    private description?: string;

    constructor(data: {
        id?: string;
        name: string;
        description?: string;
    }) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
    }

    getId() { return this.id; }
    getName() { return this.name; }
    getDescription() { return this.description; }
}
