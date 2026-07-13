import { Hero } from '../../domain/entities/Hero';

export interface HeroProvider {
    getHeroesByIds(ids: string[], userId: string): Promise<Hero[]>;
}
