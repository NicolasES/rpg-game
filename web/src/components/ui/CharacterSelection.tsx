import { useEffect, useState } from 'react';
import { EventBus } from '../../game/EventBus';
import { characterService, type CharacterDTO } from '../../services/character.service';

export function CharacterSelection() {
    const [characters, setCharacters] = useState<CharacterDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        characterService.listMyCharacters()
            .then(data => {
                setCharacters(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);
    const getSpriteUrl = (className: string) => {
        const key = className.toLowerCase().includes('mage') ? 'mage' :
                    className.toLowerCase().includes('archer') ? 'archer' : 'warrior';
        return `/assets/${key}-walk.png`;
    };

    const toggleSelection = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selId => selId !== id));
        } else if (selectedIds.length < 3) {
            setSelectedIds([...selectedIds, id]);
        }
    };

    return (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="flex gap-6 mb-12 max-w-4xl overflow-x-auto p-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-slate-900/50 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-amber-600/80 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-amber-500 transition-colors">
                {loading ? (
                    <p className="text-white text-xl animate-pulse">Carregando seus heróis...</p>
                ) : characters.length === 0 ? (
                    <p className="text-slate-300 text-lg">Você ainda não tem nenhum herói. Crie um para começar!</p>
                ) : (
                    characters.map(char => {
                        const isSelected = selectedIds.includes(char.id);
                        return (
                            <div 
                                key={char.id} 
                                onClick={() => toggleSelection(char.id)}
                                className={`bg-slate-800/90 border-2 p-6 rounded-xl flex flex-col items-center shadow-xl shadow-black/50 transition-all cursor-pointer group w-56 flex-shrink-0
                                    ${isSelected ? 'border-amber-400 ring-4 ring-amber-500/30 -translate-y-2' : 'border-slate-600 hover:border-slate-400'}
                                `}
                            >
                                <div className={`w-24 h-24 rounded-full mb-4 border-2 flex items-center justify-center overflow-hidden transition-colors
                                    ${isSelected ? 'bg-amber-900/40 border-amber-400' : 'bg-slate-700 border-slate-500 group-hover:border-slate-400'}`}>
                                    <div 
                                        style={{
                                            width: '64px',
                                            height: '64px',
                                            backgroundImage: `url(${getSpriteUrl(char.characterClass)})`,
                                            backgroundPosition: '0px 0px',
                                            transform: 'scale(1.5)',
                                            imageRendering: 'pixelated'
                                        }}
                                    />
                                </div>
                                <h2 className={`text-xl font-bold mb-1 truncate w-full text-center transition-colors ${isSelected ? 'text-amber-400' : 'text-white'}`} title={char.name}>{char.name}</h2>
                                <p className="text-slate-400 text-xs mb-2 uppercase tracking-wide">{char.race} • {char.characterClass}</p>
                                <div className="flex gap-2 text-xs text-slate-300 bg-slate-900/50 p-2 rounded w-full justify-center">
                                    <span title="Constitution">CON: {char.attributes.constitution}</span>
                                    <span title="Strength">STR: {char.attributes.strength}</span>
                                    <span title="Dexterity">DEX: {char.attributes.dexterity}</span>
                                    <span title="Magic">MAG: {char.attributes.magic}</span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {characters.length > 0 && (
                <button
                    disabled={selectedIds.length === 0}
                    onClick={() => EventBus.emit('start-hunting', selectedIds)}
                    className={`mb-6 text-lg font-bold py-3 px-12 rounded-full shadow-lg transition-all border-b-4 
                        ${selectedIds.length > 0 
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/50 border-emerald-800 hover:border-emerald-600 active:border-b-0 active:translate-y-1' 
                            : 'bg-slate-600 text-slate-400 border-slate-800 cursor-not-allowed'}`}
                >
                    Iniciar Caçada ({selectedIds.length}/3)
                </button>
            )}

            <button
                onClick={() => EventBus.emit('go-character-creation')}
                className="bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-blue-500/50 transition-all border-b-4 border-blue-800 hover:border-blue-600 active:border-b-0 active:translate-y-1"
            >
                + CRIAR NOVO PERSONAGEM
            </button>
        </div>
    );
}
