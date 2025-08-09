import { Boot } from './scenes/Boot'
import { GameOver } from './scenes/GameOver'
import { MainMenu } from './scenes/MainMenu'
import { AUTO, Game } from 'phaser'
import { Preloader } from './scenes/Preloader'

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1080,
    height: 612,
    parent: 'game-container',
    // backgroundColor: '#028af8',
    scene: [Boot, Preloader, MainMenu, GameOver]
}

const StartGame = (parent: string) => {
    return new Game({ ...config, parent })
}

export default StartGame
