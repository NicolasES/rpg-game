import { Hero } from './Hero';
import { Monster } from './Monster';

export type BattleStateProps = {
    id: string;
    userId: string;
    party: Hero[];
    enemies: Monster[];
    turn: number;
    status: 'ACTIVE' | 'VICTORY' | 'DEFEAT';
};

export class Battle {
    private id: string;
    private userId: string;
    private party: Hero[];
    private enemies: Monster[];
    private turn: number;
    private status: 'ACTIVE' | 'VICTORY' | 'DEFEAT';

    constructor(props: BattleStateProps) {
        this.id = props.id;
        this.userId = props.userId;
        this.party = props.party;
        this.enemies = props.enemies;
        this.turn = props.turn;
        this.status = props.status;
    }

    getId(): string {
        return this.id;
    }

    getUserId(): string {
        return this.userId;
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
            userId: this.userId,
            party: this.party,
            enemies: this.enemies,
            turn: this.turn,
            status: this.status
        };
    }

    processTurn(commands: { heroId: string, targetMonsterId: string }[]): void {
        if (this.status !== 'ACTIVE') {
            throw new Error("Battle is already finished.");
        }
        for (const cmd of commands) {
            const hero = this.party.find(h => h.getId() === cmd.heroId);
            const target = this.enemies.find(m => m.getId() === cmd.targetMonsterId);

            if (hero && target && hero.isAlive() && target.isAlive()) {
                hero.attack(target);
            }
        }
        const livingMonsters = this.enemies.filter(m => m.isAlive());
        for (const monster of livingMonsters) {
            const livingHeroes = this.party.filter(h => h.isAlive());
            if (livingHeroes.length === 0) break;

            const targetIndex = Math.floor(Math.random() * livingHeroes.length);
            const target = livingHeroes[targetIndex];

            monster.attack(target);
        }
        const isPartyDead = this.party.every(h => !h.isAlive());
        const isEnemiesDead = this.enemies.every(m => !m.isAlive());
        if (isPartyDead) {
            this.status = 'DEFEAT';
        } else if (isEnemiesDead) {
            this.status = 'VICTORY';
        }
        this.turn++;
    }
}
