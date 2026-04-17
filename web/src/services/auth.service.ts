const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const authService = {
    async signin(email: string, password: string) {
        const res = await fetch(`${API_URL}/account/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.message || 'Falha ao realizar login. Verifique suas credenciais.');
        }

        return res.json();
    },

    async signup(name: string, email: string, password: string) {
        const res = await fetch(`${API_URL}/account/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.message || 'Falha ao registrar aventureiro.');
        }

        return res.json();
    }
};
