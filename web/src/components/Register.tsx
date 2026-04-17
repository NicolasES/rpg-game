import React, { useState } from 'react';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { authService } from '../services/auth.service';

interface RegisterProps {
    setView: (view: 'login' | 'register' | 'game') => void;
}

export function Register({ setView }: RegisterProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);

        try {
            await authService.signup(name, email, password);

            // Sucesso!
            setSuccess(true);
            setTimeout(() => {
                setView('login');
            }, 2000);

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
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-transparent blur-xl -z-10 rounded-2xl"></div>
                
                <div className="bg-slate-900/80 backdrop-blur-md border hover:border-indigo-500/60 border-indigo-600/30 shadow-2xl shadow-black rounded-xl p-8 transition-colors duration-500">
                    
                    <button 
                        onClick={() => setView('login')}
                        className="text-slate-400 hover:text-indigo-400 mb-6 flex items-center gap-2 transition-colors text-sm font-bold"
                    >
                        <ArrowLeft className="w-4 h-4" /> RETORNAR
                    </button>

                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-bl from-indigo-500 to-indigo-700 rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                            <UserPlus className="text-white w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-indigo-500 text-center tracking-wider">
                            ALISTAMENTO
                        </h1>
                        <p className="text-slate-400 mt-2 text-sm text-center">Junte-se à guilda hoje.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-900/50 border border-red-500/50 text-red-200 p-3 rounded text-sm text-center">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-900/50 border border-green-500/50 text-green-200 p-3 rounded text-sm text-center">
                                Alistamento concluído com honrarias! Retornando aos portões...
                            </div>
                        )}
                        
                        <div>
                            <label className="block text-indigo-500/80 text-xs font-bold mb-2 uppercase tracking-widest">
                                Nome de Herói
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full bg-slate-800/50 border border-slate-700 focus:border-indigo-500 text-indigo-50 px-4 py-3 rounded outline-none transition-colors"
                                placeholder="Sir Lancelot"
                            />
                        </div>

                        <div>
                            <label className="block text-indigo-500/80 text-xs font-bold mb-2 uppercase tracking-widest">
                                Pergaminho de E-mail
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-slate-800/50 border border-slate-700 focus:border-indigo-500 text-indigo-50 px-4 py-3 rounded outline-none transition-colors"
                                placeholder="heroi@guilda.com"
                            />
                        </div>

                        <div>
                            <label className="block text-indigo-500/80 text-xs font-bold mb-2 uppercase tracking-widest">
                                Palavra Secreta
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={6}
                                required
                                className="w-full bg-slate-800/50 border border-slate-700 focus:border-indigo-500 text-indigo-50 px-4 py-3 rounded outline-none transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || success}
                            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded shadow-lg flex justify-center items-center gap-2 transform transition-all active:scale-95 disabled:opacity-70"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5" />
                                    REGISTRAR
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
