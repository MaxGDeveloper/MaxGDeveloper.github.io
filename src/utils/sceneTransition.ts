export function transitionTo(currentScene: Phaser.Scene, targetKey: string, duration = 400) {
    const camera = currentScene.cameras.main

    camera.once('camerafadeoutcomplete', () => {
        currentScene.scene.start(targetKey)
    })

    camera.fadeOut(duration, 0, 0, 0)
}
