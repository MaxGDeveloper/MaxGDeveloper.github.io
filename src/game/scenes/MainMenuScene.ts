import { GameObjects, Scene } from 'phaser'

import { EventBus } from '../EventBus'

import { transitionTo } from '../../utils/sceneTransition'
import { createButton } from '../../utils/createButton'

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
        createButton(this, width / 2, height * 0.4, 'Начать игру', () => {
            transitionTo(this, 'GameScene') // переход в игровую сцену
        })

        createButton(this, width / 2, height * 0.55, 'Настройки', () => {
            transitionTo(this, 'SettingsScene') // переход в сцену настроек
        })

        EventBus.emit('current-scene-ready', this)
    }

    changeScene() {
        this.scene.start('SettingsScene')
    }
}
