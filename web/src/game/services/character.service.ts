import { CreationData, CreateCharacterDto } from '../types/character.types';

const API_URL = 'http://localhost:3000'; // Em produção isso deve virar uma variável de ambiente, ex: import.meta.env.VITE_API_URL

export class CharacterService {

    static async getCreationData(): Promise<CreationData> {
        const response = await fetch(`${API_URL}/character/creation-data`);
        if (!response.ok) {
            throw new Error('Falha ao conectar na Taverna (API não respondeu com sucesso)');
        }
        return await response.json();
    }

    static async createCharacter(data: CreateCharacterDto): Promise<void> {
        const response = await fetch(`${API_URL}/character`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'Falha ao criar o personagem no servidor');
        }
    }
}
