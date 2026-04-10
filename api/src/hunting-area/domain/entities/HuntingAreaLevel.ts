export class HuntingAreaLevel {
    private id?: string;
    private huntingAreaId: string;
    private level: number;

    constructor(data: {
        id?: string;
        huntingAreaId: string;
        level: number;
    }) {
        this.id = data.id;
        this.huntingAreaId = data.huntingAreaId;
        this.level = data.level;
    }

    getId() { return this.id; }
    getHuntingAreaId() { return this.huntingAreaId; }
    getLevel() { return this.level; }
}
