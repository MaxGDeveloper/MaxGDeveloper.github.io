import { EventBus } from '../EventBus'
import { Scene } from 'phaser'

export class Settings extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera
    background: Phaser.GameObjects.Image
    settingsText: Phaser.GameObjects.Text

    constructor() {
        super('Settings')
    }

    create() {
        const { width, height } = this.scale

        this.camera = this.cameras.main

        this.settingsText = this.add
            .text(width / 2, height / 2.5, 'Настройки', {
                fontFamily: 'Arial Black',
                fontSize: 64,
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 8,
                align: 'center'
            })
            .setOrigin(0.5)
            .setDepth(100)

        this.createButton(width / 2, height * 0.55, 'Назад', () => {
            this.scene.start('MainMenu') // переход в игровую сцену
        })

        EventBus.emit('current-scene-ready', this)
    }

    changeScene() {
        this.scene.start('MainMenu')
    }

    private createButton(x: number, y: number, text: string, callback: () => void) {
        const btn = this.add.image(x, y, 'btn').setInteractive().setScale(0.2)

        this.add
            .text(x, y, text, {
                fontFamily: '"Press Start 2P"',
                fontSize: 20,
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
