import { Scene } from 'phaser'
import { EventBus } from '../EventBus'

export class GameScene extends Scene {
    private player!: Phaser.Physics.Arcade.Sprite
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private wasd!: {
        W: Phaser.Input.Keyboard.Key
        A: Phaser.Input.Keyboard.Key
        S: Phaser.Input.Keyboard.Key
        D: Phaser.Input.Keyboard.Key
    }
    private speed: number = 140
    private lastDir: 'down' | 'left' | 'right' | 'up' = 'down'

    constructor() {
        super('GameScene')
    }

    preload() {
        // путь относительно public (Vite/webpack public) — без ведущего / если используете base path, поправьте
        this.load.spritesheet('office_char', 'assets/person/it_office_sprite_office.png', {
            frameWidth: 32,
            frameHeight: 40
        })
    }

    create() {
        // Запуск игровой музыки
        const bgScene = this.scene.get('BackgroundScene') as any
        bgScene.playGameMusic()

        // Анимации создаём один раз
        const ensureAnim = (key: string, start: number, end: number) => {
            if (!this.anims.exists(key)) {
                this.anims.create({
                    key,
                    frames: this.anims.generateFrameNumbers('office_char', { start, end }),
                    frameRate: 8,
                    repeat: -1
                })
            }
        }
        ensureAnim('walk-down', 0, 2)
        ensureAnim('walk-left', 3, 5)
        ensureAnim('walk-right', 6, 8)
        ensureAnim('walk-up', 9, 11)

        const ensureIdle = (key: string, frame: number) => {
            if (!this.anims.exists(key)) {
                this.anims.create({
                    key,
                    frames: [{ key: 'office_char', frame }],
                    frameRate: 1
                })
            }
        }
        ensureIdle('idle-down', 0)
        ensureIdle('idle-left', 3)
        ensureIdle('idle-right', 6)
        ensureIdle('idle-up', 9)

        // Игрок
        this.player = this.physics.add.sprite(100, 100, 'office_char', 0)
        this.player.setCollideWorldBounds(true)
        this.player.play('idle-down')

        // Ввод
        this.cursors = this.input.keyboard!.createCursorKeys()
        this.wasd = this.input.keyboard!.addKeys({
            W: Phaser.Input.Keyboard.KeyCodes.W,
            A: Phaser.Input.Keyboard.KeyCodes.A,
            S: Phaser.Input.Keyboard.KeyCodes.S,
            D: Phaser.Input.Keyboard.KeyCodes.D
        }) as unknown as typeof this.wasd

        // Для чёткого пиксель-арта
        this.cameras.main.setRoundPixels(true)

        EventBus.emit('current-scene-ready', this)
    }

    update(time: number, delta: number): void {
        const vx =
            this.cursors.left.isDown || this.wasd.A.isDown
                ? -1
                : this.cursors.right.isDown || this.wasd.D.isDown
                  ? 1
                  : 0

        const vy =
            this.cursors.up.isDown || this.wasd.W.isDown
                ? -1
                : this.cursors.down.isDown || this.wasd.S.isDown
                  ? 1
                  : 0

        const moving = vx !== 0 || vy !== 0

        if (moving) {
            const vec = new Phaser.Math.Vector2(vx, vy).normalize().scale(this.speed)
            this.player.setVelocity(vec.x, vec.y)

            // Выбор анимации и запоминание направления
            if (Math.abs(vx) > Math.abs(vy)) {
                if (vx > 0) {
                    this.player.anims.play('walk-right', true)
                    this.lastDir = 'right'
                } else {
                    this.player.anims.play('walk-left', true)
                    this.lastDir = 'left'
                }
            } else {
                if (vy > 0) {
                    this.player.anims.play('walk-down', true)
                    this.lastDir = 'down'
                } else if (vy < 0) {
                    this.player.anims.play('walk-up', true)
                    this.lastDir = 'up'
                }
            }
        } else {
            this.player.setVelocity(0, 0)
            this.player.anims.play(`idle-${this.lastDir}`, true)
        }
    }

    changeScene() {
        this.scene.start('MainMenuScene')
    }
}
