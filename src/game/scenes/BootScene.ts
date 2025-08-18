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
            'assets/mainBackground/mainBackground.json',
            'assets/mainBackground'
        )

        // Загрузка музыки
        this.load.audio('menuMusic', 'assets/music/mainMenuMusic.mp3')
        this.load.audio('gameMusic', 'assets/music/GameMusic.mp3')

        // Загружаем ресурсы
        this.load.image('logo', 'assets/logo/ItLogo.png') // логотип IT Office
        this.load.image('settings', 'assets/logo/Settings.png') // логотип настроек
        this.load.image('btn', 'assets/buttons/button.png') // кнопка (пиксель-арт)
        this.load.image('btn_hover', 'assets/buttons/button_hovered.png') // кнопка при наведении
    }

    create() {
        // Создаем шрифт который мне нужен
        WebFont.load({
            custom: {
                families: ['Press Start 2P'],
                urls: ['public/assets/fonts.css']
            },
            active: () => {
                // Если настроек ещё нет — создаём дефолт
                if (!this.registry.has('settings')) {
                    this.registry.set('settings', {
                        menuMusicVolume: 0.5,
                        gameMusicVolume: 0.5,
                        sfxVolume: 0.8
                    })
                }

                // Запускаем фон и меню
                this.scene.launch('BackgroundScene')
                this.scene.start('MainMenuScene')
            }
        })
    }
}
