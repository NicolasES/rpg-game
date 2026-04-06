import { Race } from "../entities/Race";

export interface RaceRepository {
    findById(id: string): Promise<Race | null>;
    findAll(): Promise<Race[]>;
}
