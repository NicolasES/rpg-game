import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');
        this.logo = this.add.image(512, 300, 'logo').setDepth(100);

        // Avisa o React que a cena carregou
        EventBus.emit('current-scene-ready', this);

        // Escuta comandos do React para trocar de cena
        EventBus.on('go-character-creation', () => {
            this.scene.start('CharacterCreation');
        });

        EventBus.on('start-hunting', (characterId: string) => {
            console.log(`Iniciando caçada com o personagem ${characterId}`);
            // Aqui você chamaria a próxima cena de Caça quando ela existir:
            // this.scene.start('HuntingAreaSelection', { characterId });
        });
    }
}
