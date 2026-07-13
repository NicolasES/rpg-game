import { Hero } from './Hero';
import { Monster } from './Monster';

export type BattleStateProps = {
    id: string;
    party: Hero[];
    enemies: Monster[];
    turn: number;
    status: 'ACTIVE' | 'VICTORY' | 'DEFEAT';
};

export class Battle {
    private id: string;
    private party: Hero[];
    private enemies: Monster[];
    private turn: number;
    private status: 'ACTIVE' | 'VICTORY' | 'DEFEAT';

    constructor(props: BattleStateProps) {
        this.id = props.id;
        this.party = props.party;
        this.enemies = props.enemies;
        this.turn = props.turn;
        this.status = props.status;
    }

    getId(): string {
        return this.id;
    }

    getParty(): Hero[] {
        return this.party;
    }

    getEnemies(): Monster[] {
        return this.enemies;
    }

    getStatus(): 'ACTIVE' | 'VICTORY' | 'DEFEAT' {
        return this.status;
    }

    getTurn(): number {
        return this.turn;
    }

    getState(): BattleStateProps {
        return {
            id: this.id,
            party: this.party,
            enemies: this.enemies,
            turn: this.turn,
            status: this.status
        };
    }
}
