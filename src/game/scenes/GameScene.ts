import { Scene } from 'phaser'
import { EventBus } from '../EventBus'
import { createButton } from '../../utils/createButton'
import { transitionTo } from '../../utils/sceneTransition'

export class GameScene extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera
    background: Phaser.GameObjects.Image
    gameOverText: Phaser.GameObjects.Text

    constructor() {
        super('GameScene')
    }

    create() {
        // Запуск игровой музыки
        const bgScene = this.scene.get('BackgroundScene') as any
        bgScene.playGameMusic()

        this.camera = this.cameras.main
        this.camera.setBackgroundColor('#34ebd8')

        this.gameOverText = this.add
            .text(540, 312, 'Тут будет игра', {
                fontFamily: 'Arial Black',
                fontSize: 64,
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 8,
                align: 'center'
            })
            .setOrigin(0.5)
            .setDepth(100)

        createButton(this, 540, 400, 'Завершить игру', () => {
            transitionTo(this, 'MainMenuScene')
        })

        EventBus.emit('current-scene-ready', this)
    }

    changeScene() {
        this.scene.start('MainMenuScene')
    }
}
