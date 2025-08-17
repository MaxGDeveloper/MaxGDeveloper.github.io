export function createButton(
    currentScene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    callback: () => void
) {
    const btn = currentScene.add.image(x, y, 'btn').setInteractive().setScale(0.3, 0.2)

    currentScene.add
        .text(x, y, text, {
            fontFamily: '"Press Start 2P"',
            fontSize: '13px',
            color: '#fff'
        })
        .setOrigin(0.5)

    btn.on('pointerover', () => {
        btn.setTexture('btn_hover')
    })

    btn.on('pointerout', () => {
        btn.setTexture('btn')
    })

    btn.on('pointerdown', callback)
}
