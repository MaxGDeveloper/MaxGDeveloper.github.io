import { BootScene } from './scenes/BootScene'
import { SettingsScene } from './scenes/SettingsScene'
import { MainMenuScene } from './scenes/MainMenuScene'
import { BackgroundScene } from './scenes/BackgroundScene'
import { GameScene } from './scenes/GameScene'
import { AUTO, Game } from 'phaser'
import { GamePauseScene } from './scenes/GamePauseScene'

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1080,
    height: 612,
    parent: 'game-container',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
        }
    },
    roundPixels: true,
    dom: { createContainer: true }, // важно для DOM-элементов
    scene: [BootScene, BackgroundScene, MainMenuScene, SettingsScene, GameScene, GamePauseScene]
}

const StartGame = (parent: string) => {
    return new Game({ ...config, parent })
}

export default StartGame
