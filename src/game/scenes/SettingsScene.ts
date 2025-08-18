import { EventBus } from '../EventBus'
import { Scene } from 'phaser'

import { transitionTo } from '../../utils/sceneTransition'
import { createButton } from '../../utils/createButton'
import { BackgroundScene } from './BackgroundScene'

export class SettingsScene extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera
    background: Phaser.GameObjects.Image
    settingsText: Phaser.GameObjects.Text

    private menuMusicVolume: number = 1
    private gameMusicVolume: number = 1
    private sfxVolume: number = 1

    constructor() {
        super('SettingsScene')
    }

    create() {
        const { width, height } = this.scale

        // Запускаем музыку меню
        const bgScene = this.scene.get('BackgroundScene') as BackgroundScene
        bgScene.playMenuMusic()

        this.camera = this.cameras.main

        // Логотип
        this.add.image(width / 2, height * 0.2, 'settings').setScale(0.2)

        // Берём текущие настройки из registry
        const settings = this.registry.get('settings') ?? {
            menuMusicVolume: 0.5,
            gameMusicVolume: 0.5,
            sfxVolume: 0.8
        }

        // Создаём слайдеры с инициализацией по значениям из settings
        this.createSlider(width / 2, 200, 'Музыка (меню)', settings.menuMusicVolume, v => {
            // сохраняем сразу в registry
            const s = this.registry.get('settings')
            s.menuMusicVolume = v
            this.registry.set('settings', s)
            bgScene.setMenuVolume(v)
        })

        this.createSlider(width / 2, 280, 'Музыка (игра)', settings.gameMusicVolume, v => {
            const s = this.registry.get('settings')
            s.gameMusicVolume = v
            this.registry.set('settings', s)
            bgScene.setGameVolume(v)
        })

        this.createSlider(width / 2, 360, 'Звуки (SFX)', settings.sfxVolume, v => {
            const s = this.registry.get('settings')
            s.sfxVolume = v
            this.registry.set('settings', s)
            bgScene.setSfxVolume(v)
        })

        // Кнопка назад
        createButton(this, width / 2, height * 0.7, 'Назад', () => {
            transitionTo(this, 'MainMenuScene') // переход в главное меню
        })

        EventBus.emit('current-scene-ready', this)
    }

    changeScene() {
        this.scene.start('GameScene')
    }

    /**
     * x,y - центр бара
     * initValue - число 0..1
     * onChange - колбек при изменении (value 0..1)
     */
    private createSlider(
        x: number,
        y: number,
        label: string,
        initValue: number,
        onChange: (value: number) => void
    ) {
        // Лейбл
        this.add
            .text(x, y - 28, label, {
                fontFamily: '"Press Start 2P"',
                fontSize: '12px',
                color: '#fff'
            })
            .setOrigin(0.5)

        const barWidth = 240
        const barHeight = 12
        const minX = x - barWidth / 2
        const maxX = x + barWidth / 2

        // Бэкграунд бара — делаем интерактивным только его
        const bar = this.add
            .rectangle(x, y, barWidth, barHeight, 0x444444)
            .setOrigin(0.5)
            .setInteractive({ cursor: 'pointer' })

        // Заполненная часть (fill) — слева направо
        const startX = Phaser.Math.Clamp(minX + initValue * (maxX - minX), minX, maxX)
        const fill = this.add
            .rectangle(minX, y, Math.max(1, startX - minX), barHeight, 0x88ccff)
            .setOrigin(0, 0.5)

        // Ручка
        const handle = this.add
            .rectangle(startX, y, 18, 28, 0xffffff)
            .setOrigin(0.5)
            .setInteractive({ draggable: true })

        // Разрешаем drag для ручки
        this.input.setDraggable(handle)

        // Функция обновления значения и визуала по X ручки
        const updateFromHandle = () => {
            const value = (handle.x - minX) / (maxX - minX)
            fill.width = Math.max(1, Math.round(handle.x - minX))
            // Защита на случай плавающей арифметики
            const clamped = Phaser.Math.Clamp(Number(value.toFixed(3)), 0, 1)
            onChange(clamped)
        }

        // Обработчик drag — зарегистрируем ТОЛЬКО для этой ручки.
        // Используем scene.input.on, но внутри проверяем gameObject === handle.
        const dragHandler = (_pointer: any, gameObject: any, dragX: number) => {
            if (gameObject !== handle) return
            gameObject.x = Phaser.Math.Clamp(Math.round(dragX), minX, maxX)
            updateFromHandle()
        }
        this.input.on('drag', dragHandler)

        // Клик по самому бара — передвигаем только этот handle
        const barClickHandler = (pointer: Phaser.Input.Pointer) => {
            // проверяем попадание по X и Y бара (чтобы не двигать при клике в другом месте)
            if (pointer.worldX < minX || pointer.worldX > maxX) return
            if (pointer.worldY < y - barHeight && pointer.worldY > y + barHeight) {
                // вне по Y — игнорируем (точнее проверка выше, но оставил для ясности)
            }
            handle.x = Phaser.Math.Clamp(Math.round(pointer.worldX), minX, maxX)
            updateFromHandle()
        }
        bar.on('pointerdown', barClickHandler)

        // При shutdown сцены снимаем слушатели, чтобы при повторном входе не было дублирования
        this.events.once('shutdown', () => {
            this.input.off('drag', dragHandler)
            bar.off('pointerdown', barClickHandler)
        })
    }
}
