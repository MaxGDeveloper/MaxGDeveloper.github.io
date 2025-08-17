import { Scene } from 'phaser'
import WebFont from 'webfontloader'

export class Boot extends Scene {
    constructor() {
        super('Boot')
    }

    preload() {
        WebFont.load({
            custom: {
                families: ['Press Start 2P'],
                urls: ['public/assets/fonts.css']
            }
        })

        // Загружаем WebFontLoader
        this.load.script(
            'webfont',
            'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'
        )

        this.load.multiatlas(
            'main-background',
            'public/assets/mainBackground/mainBackground.json',
            'public/assets/mainBackground'
        )
    }

    create() {
        this.scene.start('MainMenu')
    }
}
