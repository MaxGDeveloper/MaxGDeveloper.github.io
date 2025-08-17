import { Boot } from './scenes/Boot'
import { Settings } from './scenes/Settings'
import { MainMenu } from './scenes/MainMenu'
import { AUTO, Game } from 'phaser'

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1080,
    height: 612,
    parent: 'game-container',
    pixelArt: true,
    roundPixels: true,
    scene: [Boot, MainMenu, Settings]
}

const StartGame = (parent: string) => {
    return new Game({ ...config, parent })
}

export default StartGame
