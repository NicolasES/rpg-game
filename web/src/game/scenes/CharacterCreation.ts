import { Scene, GameObjects } from 'phaser';
import { EventBus } from '../EventBus';

interface CreationData {
    races: { 
        id: string; 
        name: string; 
        attributes: Record<string, number>; 
    }[];
    classes: { 
        id: string; 
        name: string; 
        attributes: Record<string, number>; 
    }[];
    weapons: { 
        name: string; 
        type: string; 
        minDamage: number; 
        maxDamage: number; 
    }[];
}

export class CharacterCreation extends Scene {
    private apiData: CreationData;
    private domInput: GameObjects.DOMElement;
    
    // Character state
    private selectedRaceIndex = -1;
    private selectedClassIndex = -1;
    private selectedWeaponIndex = -1;
    private bonusAttributes: Record<string, number> = { STR: 0, DEX: 0, CON: 0, MAG: 0 };
    private remainingPoints = 3;

    // UI Objects for updating
    private attrTexts: Map<string, GameObjects.Text> = new Map();
    private pointsText: GameObjects.Text;
    private raceButtons: GameObjects.Graphics[] = [];
    private classButtons: GameObjects.Graphics[] = [];
    private weaponButtons: GameObjects.Graphics[] = [];
    private heroPreview: GameObjects.Sprite;

    constructor() {
        super('CharacterCreation');
    }

    preload() {
        // Tentando 72px sem margem. Se a imagem tem 290px, sobrariam 2px no final, o que não deve causar drift.
        this.load.spritesheet('hero-warrior', 'assets/warrior-idle.png', { frameWidth: 67, frameHeight: 86 });
        this.load.spritesheet('hero-mage', 'assets/mage-idle.png', { frameWidth: 67, frameHeight: 86 });
        this.load.spritesheet('hero-archer', 'assets/archer-idle.png', { frameWidth: 67, frameHeight: 86 });
    }

    async create() {
        // Exibe carregando inicial
        this.cameras.main.setBackgroundColor('#533131ff');
        const loadingText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'CONECTANDO À TAVERNA...', {
            fontFamily: 'monospace', fontSize: '24px', color: '#ffffff'
        }).setOrigin(0.5);

        try {
            const response = await fetch('http://localhost:3000/character/creation-data');
            this.apiData = await response.json();
            loadingText.destroy();
            
            this.buildLayout();
        } catch (error) {
            console.error('API Error:', error);
            loadingText.setText('ERRO DE CONEXÃO COM A API :(');
        }

        EventBus.emit('current-scene-ready', this);
    }

    private buildLayout() {
        this.cameras.main.setBackgroundColor('#2d2417');
        this.cameras.main.setRoundPixels(true);

        // Painel Principal
        const panelWidth = 960;
        const panelHeight = 680;
        const panel = this.add.graphics();
        panel.fillStyle(0xdcbfa2, 1);
        panel.fillRoundedRect(this.scale.width / 2 - panelWidth / 2, this.scale.height / 2 - panelHeight / 2, panelWidth, panelHeight, 16);
        panel.lineStyle(6, 0x815f43);
        panel.strokeRoundedRect(this.scale.width / 2 - panelWidth / 2, this.scale.height / 2 - panelHeight / 2, panelWidth, panelHeight, 16);

        // Título
        this.add.text(this.scale.width / 2, 80, 'FORJE SEU HERÓI', {
            fontFamily: 'monospace', fontSize: '36px', color: '#fff',
            backgroundColor: '#4a2511', padding: { x: 40, y: 15 }
        }).setOrigin(0.5).setStroke('#000', 4);

        // Nome (DOM)
        this.add.text(80, 150, 'NOME DO PERSONAGEM:', { fontFamily: 'monospace', fontSize: '18px', color: '#4a2511', fontStyle: 'bold' });
        const inputHtml = `<input type="text" id="char-name" placeholder="Nome do Herói..." style="width: 280px; height: 35px; font-size: 18px; font-family: monospace; background: #1a1a1a; color: #fff; border: 2px solid #815f43; border-radius: 4px; padding-left: 10px; outline: none;">`;
        this.domInput = this.add.dom(80, 180).createFromHTML(inputHtml).setOrigin(0, 0);

        // Seção: RAÇAS
        this.add.text(80, 250, 'SELECIONAR RAÇA:', { fontFamily: 'monospace', fontSize: '18px', color: '#4a2511', fontStyle: 'bold' });
        this.raceButtons = this.createGridButtons(80, 280, this.apiData.races.map(r => r.name), 2, (idx) => {
            this.selectedRaceIndex = idx;
            this.updateUI();
        }, 0);

        // Seção: CLASSES
        this.add.text(80, 400, 'SELECIONAR CLASSE:', { fontFamily: 'monospace', fontSize: '18px', color: '#4a2511', fontStyle: 'bold' });
        this.classButtons = this.createGridButtons(80, 430, this.apiData.classes.map(c => c.name), 2, (idx) => {
            this.selectedClassIndex = idx;
            this.updateUI();
        }, 0);

        // Seção: ARMA INICIAL (Movida um pouco para cima para dar espaço)
        this.add.text(80, 530, 'ARMA INICIAL:', { fontFamily: 'monospace', fontSize: '18px', color: '#4a2511', fontStyle: 'bold' });
        this.weaponButtons = this.createGridButtons(80, 560, this.apiData.weapons.map(w => w.name), 3, (idx) => {
            this.selectedWeaponIndex = idx;
            this.updateUI();
        }, -1);

        // Preview do Herói (Reposicionado para não tapar os botões)
        // setOrigin(0.5, 1) ancora o sprite pelo centro-base — padrão estável para personagens animados
        this.heroPreview = this.add.sprite(480, 270, 'hero-warrior').setScale(2).setVisible(false);
        this.createAnimations();

        // Painel de Atributos
        this.buildAttributesPanel(620, 150);

        // Botão Confirmar (Centralizado sob o painel de atributos)
        const confirmBtn = this.add.text(780, 685, 'CRIAR PERSONAGEM', {
            fontFamily: 'monospace', fontSize: '28px', color: '#fff',
            backgroundColor: '#2b783c', padding: { x: 40, y: 15 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        confirmBtn.on('pointerdown', () => this.handleCreation());
        confirmBtn.on('pointerover', () => confirmBtn.setStyle({ backgroundColor: '#3ea654' }));
        confirmBtn.on('pointerout', () => confirmBtn.setStyle({ backgroundColor: '#2b783c' }));

        this.updateUI();
    }

    private createAnimations() {
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

    private buildAttributesPanel(x: number, y: number) {
        const bg = this.add.graphics();
        bg.fillStyle(0x35281d, 1);
        bg.fillRoundedRect(x, y, 320, 450, 12);
        bg.lineStyle(2, 0xdcbfa2);
        bg.strokeRoundedRect(x, y, 320, 450, 12);

        this.add.text(x + 160, y + 30, 'ATRIBUTOS', { fontFamily: 'monospace', fontSize: '22px', color: '#dcbfa2' }).setOrigin(0.5);

        const attrs = ['STR', 'DEX', 'CON', 'MAG'];
        attrs.forEach((attr, idx) => {
            const posY = y + 100 + (idx * 80);
            
            this.add.text(x + 30, posY, attr, { fontFamily: 'monospace', fontSize: '18px', color: '#aaa' });
            
            const btnMinus = this.add.text(x + 160, posY, '[-]', { fontFamily: 'monospace', fontSize: '22px', color: '#ff4444' }).setInteractive({ useHandCursor: true });
            const valText = this.add.text(x + 220, posY, '10', { fontFamily: 'monospace', fontSize: '22px', color: '#fff' }).setOrigin(0.5);
            const btnPlus = this.add.text(x + 260, posY, '[+]', { fontFamily: 'monospace', fontSize: '22px', color: '#44ff44' }).setInteractive({ useHandCursor: true });

            this.attrTexts.set(attr, valText);

            btnMinus.on('pointerdown', () => this.changeAttribute(attr, -1));
            btnPlus.on('pointerdown', () => this.changeAttribute(attr, 1));
        });

        this.pointsText = this.add.text(x + 160, y + 410, 'PONTOS: 3', {
            fontFamily: 'monospace', fontSize: '18px', color: '#44ff44', fontStyle: 'bold'
        }).setOrigin(0.5);
    }

    private changeAttribute(attr: string, delta: number) {
        if (delta > 0 && this.remainingPoints > 0) {
            this.bonusAttributes[attr]++;
            this.remainingPoints--;
        } else if (delta < 0) {
            // Regra: Atributo base (10 + bonus) não pode ser menor que 6
            const currentBase = 10 + this.bonusAttributes[attr];
            if (currentBase > 6) {
                this.bonusAttributes[attr]--;
                this.remainingPoints++;
            }
        }
        this.updateUI();
    }

    private updateUI() {
        // Atualiza textos de atributos e pontos
        const race = this.selectedRaceIndex >= 0 ? this.apiData.races[this.selectedRaceIndex] : null;
        const cls = this.selectedClassIndex >= 0 ? this.apiData.classes[this.selectedClassIndex] : null;

        ['STR', 'DEX', 'CON', 'MAG'].forEach(attr => {
            const userBase = 10 + this.bonusAttributes[attr];
            const raceBonus = race ? (race.attributes[attr] || 0) : 0;
            const classBonus = cls ? (cls.attributes[attr] || 0) : 0;
            const total = userBase + raceBonus + classBonus;
            this.attrTexts.get(attr)?.setText(total.toString());
        });

        this.pointsText.setText(`PONTOS RESTANTES: ${this.remainingPoints}`);

        // Atualiza estilo dos botões selecionados
        this.highlightButton(this.raceButtons, this.selectedRaceIndex, 0x5577aa);
        this.highlightButton(this.classButtons, this.selectedClassIndex, 0xaa5577);
        this.highlightButton(this.weaponButtons, this.selectedWeaponIndex, 0xaa7755);

        // Atualiza Preview do Herói
        if (cls) {
            const className = cls.name.toLowerCase();
            const key = className.includes('warrior') ? 'warrior' : 
                        className.includes('mage') ? 'mage' : 
                        className.includes('archer') ? 'archer' : null;
            
            if (key) {
                this.heroPreview.setVisible(true);
                this.heroPreview.play(`idle-${key}`, true);
            } else {
                this.heroPreview.setVisible(false);
            }
        }
    }

    private highlightButton(buttons: GameObjects.Graphics[], activeIdx: number, activeColor: number) {
        buttons.forEach((btn, idx) => {
            btn.clear();
            btn.fillStyle(idx === activeIdx ? activeColor : 0x111111, 1);
            btn.fillRoundedRect(0, 0, 140, 40, 4);
            btn.lineStyle(2, idx === activeIdx ? 0xffffff : 0x555555);
            btn.strokeRoundedRect(0, 0, 140, 40, 4);
        });
    }

    private createGridButtons(startX: number, startY: number, items: string[], columns: number, onClick: (idx: number) => void, activeIdx: number): GameObjects.Graphics[] {
        const btns: GameObjects.Graphics[] = [];
        const btnWidth = 140;
        const btnHeight = 40;

        items.forEach((item, index) => {
            const col = index % columns;
            const row = Math.floor(index / columns);
            const x = startX + (col * (btnWidth + 10));
            const y = startY + (row * (btnHeight + 10));

            const container = this.add.container(x, y);
            const bg = this.add.graphics();
            container.add(bg);
            
            const text = this.add.text(btnWidth / 2, btnHeight / 2, item, { 
                fontFamily: 'monospace', fontSize: '14px', color: '#fff' 
            }).setOrigin(0.5);
            container.add(text);

            const zone = this.add.zone(btnWidth / 2, btnHeight / 2, btnWidth, btnHeight).setInteractive({ useHandCursor: true });
            container.add(zone);

            zone.on('pointerdown', () => onClick(index));
            
            btns.push(bg);
        });

        return btns;
    }

    private async handleCreation() {
        const input = (this.domInput.node as HTMLElement).querySelector('input') as HTMLInputElement;
        const name = input.value;

        if (!name) {
            alert('Escolha um nome para seu herói!');
            return;
        }

        if (this.selectedRaceIndex < 0 || this.selectedClassIndex < 0 || this.selectedWeaponIndex < 0) {
            alert('Por favor, selecione uma raça, classe e arma!');
            return;
        }

        const race = this.apiData.races[this.selectedRaceIndex];
        const cls = this.apiData.classes[this.selectedClassIndex];
        
        // Atributos finais (Base da raça + classe + bônus do usuário)
        const finalAttributes: any = {};
        ['STR', 'DEX', 'CON', 'MAG'].forEach(attr => {
            finalAttributes[attr] = 10 + this.bonusAttributes[attr] + (race.attributes[attr] || 0) + (cls.attributes[attr] || 0);
        });

        const body = {
            name,
            raceId: race.id,
            characterClassId: cls.id,
            attributes: finalAttributes
        };

        console.log('Sending to API:', body);

        try {
            const res = await fetch('http://localhost:3000/character', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                alert('PERSONAGEM CRIADO COM SUCESSO!');
                this.scene.start('Game');
            } else {
                const err = await res.json();
                alert('ERRO: ' + (err.message || 'Falha ao criar'));
            }
        } catch (e) {
            alert('ERRO DE CONEXÃO');
        }
    }
}
