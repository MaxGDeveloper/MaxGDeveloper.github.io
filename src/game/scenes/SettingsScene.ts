import { EventBus } from '../EventBus'
import { Scene } from 'phaser'

import { transitionTo } from '../../utils/sceneTransition'
import { createButton } from '../../utils/createButton'
import { BackgroundScene } from './BackgroundScene'

export class SettingsScene extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera
    background: Phaser.GameObjects.Image
    settingsText: Phaser.GameObjects.Text

    constructor() {
        super('SettingsScene')
    }

    create() {
        const { width, height } = this.scale

        // Запускаем музыку меню
        const bgScene = this.scene.get('BackgroundScene') as BackgroundScene
        bgScene.playMenuMusic()

        this.camera = this.cameras.main

        this.settingsText = this.add
            .text(width / 2, height / 3.5, 'Настройки', {
                fontFamily: 'Arial Black',
                fontSize: 64,
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 8,
                align: 'center'
            })
            .setOrigin(0.5)
            .setDepth(100)

        createButton(this, width / 2, height * 0.4, 'Заглушить звук', () => {
            bgScene.playMenuMusic() // переход в главное меню
        })
        createButton(this, width / 2, height * 0.55, 'Назад', () => {
            transitionTo(this, 'MainMenuScene') // переход в главное меню
        })

        EventBus.emit('current-scene-ready', this)
    }

    changeScene() {
        this.scene.start('GameScene')
    }
}
