import { Scene } from 'phaser'
import WebFont from 'webfontloader'

export class BootScene extends Scene {
    constructor() {
        super('BootScene')
    }

    preload() {
        // Загружаем WebFontLoader
        this.load.script(
            'webfont',
            'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'
        )

        // Загружаем фон
        this.load.multiatlas(
            'main-background',
            'public/assets/mainBackground/mainBackground.json',
            'public/assets/mainBackground'
        )
    }

    create() {
        // Создаем шрифт который мне нужен
        WebFont.load({
            custom: {
                families: ['Press Start 2P'],
                urls: ['public/assets/fonts.css']
            },
            active: () => {
                this.scene.launch('BackgroundScene')
                // Переходим в главное меню
                this.scene.start('MainMenuScene')
            }
        })
    }
}
