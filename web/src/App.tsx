import { useEffect, useRef, useState } from 'react';
import { IRefPhaserGame, PhaserGame } from './PhaserGame';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { LogOut } from 'lucide-react';

function App() {
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const [view, setView] = useState<'login' | 'register' | 'game'>('login');
    const [token, setToken] = useState<string | null>(null);

    // Initial load: check if token exists
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setView('game');
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setView('login');
    };

    const currentScene = (scene: Phaser.Scene) => {
        // Can add logic here if needed based on scene
    };

    if (view === 'login') {
        return <Login setView={setView} setToken={setToken} />;
    }

    if (view === 'register') {
        return <Register setView={setView} />;
    }

    // View === 'game'
    return (
        <div id="app" className="w-screen h-screen overflow-hidden bg-slate-900 flex items-center justify-center relative">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            
            <button 
                onClick={logout}
                className="absolute top-4 right-4 bg-slate-800/80 hover:bg-red-900/80 text-white p-2 rounded-full backdrop-blur-md border border-slate-600 transition-colors shadow-lg shadow-black/50 overflow-hidden group flex items-center gap-0 hover:w-32 w-10 justify-start z-50 focus:outline-none"
            >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                <span className="w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:w-auto group-hover:opacity-100 group-hover:pl-2 text-sm font-bold">
                    SAIR
                </span>
            </button>
        </div>
    );
}

export default App;
