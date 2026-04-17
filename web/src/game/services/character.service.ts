import { CreationData, CreateCharacterDto } from '../types/character.types';

const API_URL = import.meta.env.VITE_API_URL;

function getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
}

export class CharacterService {

    static async getCreationData(): Promise<CreationData> {
        const response = await fetch(`${API_URL}/character/creation-data`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) {
            throw new Error('Falha ao conectar na Taverna (API não respondeu com sucesso)');
        }
        return await response.json();
    }

    static async createCharacter(data: CreateCharacterDto): Promise<void> {
        const response = await fetch(`${API_URL}/character`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'Falha ao criar o personagem no servidor');
        }
    }
}
