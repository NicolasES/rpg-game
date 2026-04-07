import { useRef } from 'react';
import { IRefPhaserGame, PhaserGame } from './PhaserGame';

function App()
{
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    const currentScene = (scene: Phaser.Scene) => {
        // Can add logic here if needed based on scene
    }

    return (
        <div id="app" className="w-screen h-screen overflow-hidden bg-slate-900 flex items-center justify-center">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
        </div>
    )
}

export default App;
