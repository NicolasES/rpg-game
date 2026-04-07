import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');
        this.load.image('star', 'star.png');

        // Pré-carregamento dos spritesheets dos heróis (usado na criação de char e no jogo)
        // Largura ajustada para 67px conforme validado para evitar drifts.
        this.load.spritesheet('hero-warrior', 'warrior-idle.png', { frameWidth: 67, frameHeight: 86 });
        this.load.spritesheet('hero-mage', 'mage-idle.png', { frameWidth: 67, frameHeight: 86 });
        this.load.spritesheet('hero-archer', 'archer-idle.png', { frameWidth: 67, frameHeight: 86 });
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.
        this.createGlobalAnimations();

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }

    private createGlobalAnimations(): void {
        const classes = ['warrior', 'mage', 'archer'];
        classes.forEach(cls => {
            if (!this.anims.exists(`idle-${cls}`)) {
                this.anims.create({
                    key: `idle-${cls}`,
                    frames: this.anims.generateFrameNumbers(`hero-${cls}`, { start: 0, end: 3 }),
                    frameRate: 3,
                    repeat: -1
                });
            }
        });
    }
}
