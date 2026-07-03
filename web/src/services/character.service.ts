const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface CharacterDTO {
    id: string;
    name: string;
    experience: number;
    attributes: {
        strength: number;
        dexterity: number;
        constitution: number;
        magic: number;
    };
    race: string;
    characterClass: string;
}

export const characterService = {
    async listMyCharacters(): Promise<CharacterDTO[]> {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/characters`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) throw new Error('Falha ao buscar personagens');
        return res.json();
    }
};
