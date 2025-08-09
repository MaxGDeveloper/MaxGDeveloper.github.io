import { GameObjects, Scene } from 'phaser'

import { EventBus } from '../EventBus'

export class MainMenu extends Scene {
    background: GameObjects.Image
    logo: GameObjects.Image
    title: GameObjects.Text
    logoTween: Phaser.Tweens.Tween | null

    constructor() {
        super('MainMenu')
    }

    create() {
        // Создаем и растягиваем фон
        const bg = this.add
            .sprite(0, 0, 'main-background', 'frame_000_delay-0.03s.gif')
            .setOrigin(0)
            .setDisplaySize(
                this.sys.game.config.width as number,
                this.sys.game.config.height as number
            )

        // Создаем анимацию
        this.anims.create({
            key: 'bgAnim',
            frames: this.anims.generateFrameNames('main-background', {
                prefix: 'frame_',
                start: 0,
                end: 198,
                zeroPad: 3,
                suffix: '_delay-0.03s.gif'
            }),
            frameRate: 33,
            repeat: -1
        })

        // Запускаем анимацию
        bg.play('bgAnim')

        // Добавляем затемнение
        this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 0.7).setOrigin(0, 0)

        this.logo = this.add.image(540, 106, 'logo').setDepth(100)

        this.title = this.add
            .text(540, 206, 'Главное меню', {
                fontFamily: 'Arial Black',
                fontSize: 38,
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 8,
                align: 'center'
            })
            .setOrigin(0.5)
            .setDepth(100)

        EventBus.emit('current-scene-ready', this)
    }

    changeScene() {
        if (this.logoTween) {
            this.logoTween.stop()
            this.logoTween = null
        }

        this.scene.start('GameOver')
    }
}
