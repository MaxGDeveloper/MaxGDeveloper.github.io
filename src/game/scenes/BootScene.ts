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

        // Загрузка музыки
        this.load.audio('menuMusic', 'public/assets/music/mainMenuMusic.mp3')
        this.load.audio('gameMusic', 'public/assets/music/GameMusic.mp3')

        // Загружаем ресурсы
        this.load.image('logo', 'public/assets/logo/ItLogo.png') // логотип IT Office
        this.load.image('settings', 'public/assets/logo/Settings.png') // логотип настроек
        this.load.image('btn', 'public/assets/buttons/button.png') // кнопка (пиксель-арт)
        this.load.image('btn_hover', 'public/assets/buttons/button_hovered.png') // кнопка при наведении
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
