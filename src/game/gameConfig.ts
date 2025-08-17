import { BootScene } from './scenes/BootScene'
import { SettingsScene } from './scenes/SettingsScene'
import { MainMenuScene } from './scenes/MainMenuScene'
import { BackgroundScene } from './scenes/BackgroundScene'
import { AUTO, Game } from 'phaser'

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1080,
    height: 612,
    parent: 'game-container',
    pixelArt: true,
    roundPixels: true,
    scene: [BootScene, BackgroundScene, MainMenuScene, SettingsScene]
}

const StartGame = (parent: string) => {
    return new Game({ ...config, parent })
}

export default StartGame
