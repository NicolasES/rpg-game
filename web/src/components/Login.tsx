import React, { useState } from 'react';
import { LogIn, KeyRound } from 'lucide-react';
import { authService } from '../services/auth.service';

interface LoginProps {
    setView: (view: 'login' | 'register' | 'game') => void;
    setToken: (token: string) => void;
}

export function Login({ setView, setToken }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await authService.signin(email, password);
            
            // Sucesso!
            localStorage.setItem('token', data.token);
            setToken(data.token);
            setView('game');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black font-mono">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
            
            <div className="w-full max-w-md p-8 relative">
                {/* Border glowing effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/30 to-transparent blur-xl -z-10 rounded-2xl"></div>
                
                <div className="bg-slate-900/80 backdrop-blur-md border hover:border-amber-500/60 border-amber-600/30 shadow-2xl shadow-black rounded-xl p-8 transition-colors duration-500">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(217,119,6,0.5)]">
                            <KeyRound className="text-white w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 text-center tracking-wider">
                            ENTRAR NO PORTAL
                        </h1>
                        <p className="text-slate-400 mt-2 text-sm text-center">Aventureiro, identifique-se.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-900/50 border border-red-500/50 text-red-200 p-3 rounded text-sm text-center">
                                {error}
                            </div>
                        )}
                        
                        <div>
                            <label className="block text-amber-500/80 text-xs font-bold mb-2 uppercase tracking-widest">
                                Pergaminho de E-mail
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-slate-800/50 border border-slate-700 focus:border-amber-500 text-amber-50 px-4 py-3 rounded outline-none transition-colors"
                                placeholder="heroi@guilda.com"
                            />
                        </div>

                        <div>
                            <label className="block text-amber-500/80 text-xs font-bold mb-2 uppercase tracking-widest">
                                Palavra Secreta
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-slate-800/50 border border-slate-700 focus:border-amber-500 text-amber-50 px-4 py-3 rounded outline-none transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white font-bold py-3 px-4 rounded shadow-lg flex justify-center items-center gap-2 transform transition-all active:scale-95 disabled:opacity-70"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    ACESSAR
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-400 text-sm">
                            É novo nestas terras?{' '}
                            <button
                                onClick={() => setView('register')}
                                className="text-amber-500 hover:text-amber-400 font-bold transition-colors underline decoration-amber-500/30 underline-offset-4"
                            >
                                Forje seu destino
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
