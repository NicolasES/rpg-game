import React, { useState } from 'react';
import { Sword, Shield, Wand2, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

// Mock IDs for the API request
const MOCK_RACES = [
    { id: '11111111-1111-1111-1111-111111111111', name: 'Humano', icon: Shield, desc: 'Balanceado e versátil' },
    { id: '22222222-2222-2222-2222-222222222222', name: 'Elfo', icon: Sparkles, desc: 'Agilidade e magia' },
    { id: '33333333-3333-3333-3333-333333333333', name: 'Orc', icon: Sword, desc: 'Força bruta e resistência' }
];

const MOCK_CLASSES = [
    { id: '44444444-4444-4444-4444-444444444444', name: 'Guerreiro', icon: Sword, desc: 'Mestre d\'armas' },
    { id: '55555555-5555-5555-5555-555555555555', name: 'Mago', icon: Wand2, desc: 'Conjurador arcano' },
    { id: '66666666-6666-6666-6666-666666666666', name: 'Ladino', icon: Shield, desc: 'Furtivo e letal' }
];

const STARTING_POINTS = 15;

export const CharacterCreator = ({ onComplete }: { onComplete: () => void }) => {
    const [name, setName] = useState('');
    const [selectedRace, setSelectedRace] = useState(MOCK_RACES[0].id);
    const [selectedClass, setSelectedClass] = useState(MOCK_CLASSES[0].id);
    const [attributes, setAttributes] = useState({
        STR: 5,
        DEX: 5,
        CON: 5,
        MAG: 5
    });
    
    const [status, setStatus] = useState<{type: 'idle' | 'loading' | 'error' | 'success', msg: string}>({ type: 'idle', msg: '' });

    const totalSpent = Object.values(attributes).reduce((acc, val) => acc + val, 0);
    const remainingPoints = STARTING_POINTS + 20 - totalSpent; // 20 base points (5*4) + 15 to spend

    const handleAttributeChange = (attr: keyof typeof attributes, increment: boolean) => {
        setAttributes(prev => {
            const current = prev[attr];
            if (increment && remainingPoints > 0) {
                return { ...prev, [attr]: current + 1 };
            } else if (!increment && current > 1) {
                return { ...prev, [attr]: current - 1 };
            }
            return prev;
        });
    };

    const handleCreate = async () => {
        if (!name.trim()) {
            setStatus({ type: 'error', msg: 'O nome do personagem é obrigatório!' });
            return;
        }

        setStatus({ type: 'loading', msg: 'Criando personagem...' });

        try {
            const response = await fetch('http://localhost:3000/character', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    raceId: selectedRace,
                    characterClassId: selectedClass,
                    attributes
                })
            });

            if (!response.ok) {
                throw new Error('Falha ao criar personagem');
            }

            const data = await response.json();
            setStatus({ type: 'success', msg: `Personagem ${data.name} criado com sucesso!` });
            
            setTimeout(() => {
                onComplete();
            }, 2000);

        } catch (error: any) {
            setStatus({ type: 'error', msg: error.message || 'Erro de conexão com o servidor' });
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-900 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay pointer-events-none"></div>
            
            <div className="max-w-4xl w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 transition-all duration-500 hover:shadow-purple-500/20">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2 font-serif tracking-wide">
                        Forje seu Destino
                    </h1>
                    <p className="text-slate-400">Crie seu herói para explorar o mundo de Aethelgard</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-8">
                        {/* Name Input */}
                        <div className="space-y-2">
                            <label className="text-sm uppercase tracking-wider text-purple-300 font-semibold">Nome do Herói</label>
                            <input 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ex: Arthur Pendragon"
                                className="w-full bg-slate-950/50 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Race Selection */}
                        <div className="space-y-3">
                            <label className="text-sm uppercase tracking-wider text-purple-300 font-semibold">Raça</label>
                            <div className="grid grid-cols-3 gap-3">
                                {MOCK_RACES.map(race => {
                                    const Icon = race.icon;
                                    const isSelected = selectedRace === race.id;
                                    return (
                                        <button
                                            key={race.id}
                                            onClick={() => setSelectedRace(race.id)}
                                            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                                                isSelected 
                                                ? 'bg-purple-600/20 border-purple-400 text-purple-200' 
                                                : 'bg-slate-950/50 border-white/5 text-slate-400 hover:bg-slate-800'
                                            }`}
                                        >
                                            <Icon size={24} className={isSelected ? 'text-purple-400' : 'text-slate-500'} />
                                            <span className="font-medium">{race.name}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Class Selection */}
                        <div className="space-y-3">
                            <label className="text-sm uppercase tracking-wider text-purple-300 font-semibold">Classe</label>
                            <div className="grid grid-cols-3 gap-3">
                                {MOCK_CLASSES.map(cls => {
                                    const Icon = cls.icon;
                                    const isSelected = selectedClass === cls.id;
                                    return (
                                        <button
                                            key={cls.id}
                                            onClick={() => setSelectedClass(cls.id)}
                                            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${
                                                isSelected 
                                                ? 'bg-pink-600/20 border-pink-400 text-pink-200' 
                                                : 'bg-slate-950/50 border-white/5 text-slate-400 hover:bg-slate-800'
                                            }`}
                                        >
                                            <Icon size={24} className={isSelected ? 'text-pink-400' : 'text-slate-500'} />
                                            <span className="font-medium">{cls.name}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Attributes */}
                    <div className="bg-slate-950/50 rounded-2xl border border-white/5 p-6 flex flex-col">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                            <h3 className="text-sm uppercase tracking-wider text-purple-300 font-semibold">Atributos</h3>
                            <div className="bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">
                                <span className="text-purple-300 text-sm font-bold">Pontos Faltantes: {remainingPoints}</span>
                            </div>
                        </div>

                        <div className="space-y-6 flex-1">
                            {Object.entries(attributes).map(([attr, val]) => (
                                <div key={attr} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3 w-1/3">
                                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-white/10 text-xs font-bold text-slate-300 group-hover:border-purple-500/50 group-hover:text-purple-300 transition-colors">
                                            {attr}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 flex-1 justify-end">
                                        <button 
                                            onClick={() => handleAttributeChange(attr as keyof typeof attributes, false)}
                                            disabled={val <= 1}
                                            className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 hover:bg-slate-700 disabled:opacity-50 flex items-center justify-center text-slate-300 hover:text-white transition-all active:scale-95"
                                        >-</button>
                                        
                                        <div className="w-12 text-center text-xl font-bold text-white font-mono bg-slate-900 py-1 rounded-lg border border-white/5">
                                            {val}
                                        </div>
                                        
                                        <button 
                                            onClick={() => handleAttributeChange(attr as keyof typeof attributes, true)}
                                            disabled={remainingPoints <= 0}
                                            className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 hover:bg-slate-700 disabled:opacity-50 flex items-center justify-center text-slate-300 hover:text-white transition-all active:scale-95"
                                        >+</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Status Messages */}
                        {status.msg && (
                            <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
                                status.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                                status.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            }`}>
                                {status.type === 'error' && <AlertCircle size={18} />}
                                {status.type === 'success' && <CheckCircle2 size={18} />}
                                {status.msg}
                            </div>
                        )}

                        <button 
                            onClick={handleCreate}
                            disabled={status.type === 'loading'}
                            className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold tracking-wide shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center"
                        >
                            {status.type === 'loading' ? 'Invocando...' : 'Criar Personagem'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
