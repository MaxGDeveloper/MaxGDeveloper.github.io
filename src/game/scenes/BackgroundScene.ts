// BackgroundScene.ts
import Phaser from 'phaser'

export class BackgroundScene extends Phaser.Scene {
    constructor() {
        super('BackgroundScene')
    }

    create() {
        const { width, height } = this.scale

        // Создаем и растягиваем фон
        const bg = this.add
            .sprite(0, 0, 'main-background', 'frame_000_delay-0.03s.gif')
            .setOrigin(0)
            .setDisplaySize(width, height)

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

        // Добавляем затемнение для фона
        this.add.rectangle(0, 0, width, height, 0x000000, 0.8).setOrigin(0, 0)
    }
}
