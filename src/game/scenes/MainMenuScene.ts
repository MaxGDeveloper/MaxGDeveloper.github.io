import { GameObjects, Scene } from 'phaser'

import { EventBus } from '../EventBus'

export class MainMenuScene extends Scene {
    background: GameObjects.Image
    logo: GameObjects.Image
    title: GameObjects.Text

    constructor() {
        super('MainMenuScene')
    }

    preload() {
        // Загружаем ресурсы
        this.load.image('logo', 'public/assets/logo/ItLogo.png') // логотип IT Office
        this.load.image('btn', 'public/assets/buttons/button.png') // кнопка (пиксель-арт)
        this.load.image('btn_hover', 'public/assets/buttons/button_hovered.png') // кнопка при наведении
    }

    create() {
        const { width, height } = this.scale

        // Логотип
        this.add.image(width / 2, height * 0.2, 'logo').setScale(0.2)

        // Кнопка "Начать игру"
        this.createButton(width / 2, height * 0.4, 'Начать игру', () => {
            this.scene.start('GameScene') // переход в игровую сцену
        })

        this.createButton(width / 2, height * 0.55, 'Настройки', () => {
            this.scene.start('SettingsScene') // переход в сцену настроек
        })

        EventBus.emit('current-scene-ready', this)
    }

    changeScene() {
        this.scene.start('SettingsScene')
    }

    private createButton(x: number, y: number, text: string, callback: () => void) {
        const btn = this.add.image(x, y, 'btn').setInteractive().setScale(0.3, 0.2)

        this.add
            .text(x, y, text, {
                fontFamily: '"Press Start 2P"',
                fontSize: '13px',
                color: '#fff'
            })
            .setOrigin(0.5)

        btn.on('pointerover', () => {
            btn.setTexture('btn_hover')
        })

        btn.on('pointerout', () => {
            btn.setTexture('btn')
        })

        btn.on('pointerdown', callback)
    }
}
