import { BootScene } from './scenes/BootScene'
import { SettingsScene } from './scenes/SettingsScene'
import { MainMenuScene } from './scenes/MainMenuScene'
import { BackgroundScene } from './scenes/BackgroundScene'
import { AUTO, Game } from 'phaser'
import { GameScene } from './scenes/GameScene'

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1080,
    height: 612,
    parent: 'game-container',
    pixelArt: true,
    roundPixels: true,
    dom: { createContainer: true }, // важно для DOM-элементов
    scene: [BootScene, BackgroundScene, MainMenuScene, SettingsScene, GameScene]
}

const StartGame = (parent: string) => {
    return new Game({ ...config, parent })
}

export default StartGame
