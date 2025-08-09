<script setup lang="ts">
    import { ref, toRaw } from 'vue'
    import type { MainMenu } from './game/scenes/MainMenu'
    import PhaserGame from './game/PhaserGame.vue'

    // The sprite can only be moved in the MainMenu Scene
    const canMoveSprite = ref()

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = ref()

    const changeScene = () => {
        const scene = toRaw(phaserRef.value.scene) as MainMenu

        if (scene) {
            //  Call the changeScene method defined in the `MainMenu`, `Game` and `GameOver` Scenes
            scene.changeScene()
        }
    }

    // Event emitted from the PhaserGame component
    const currentScene = (scene: MainMenu) => {
        canMoveSprite.value = scene.scene.key !== 'MainMenu'
    }
</script>

<template>
    <div style="display: flex; flex-direction: column">
        <PhaserGame ref="phaserRef" @current-active-scene="currentScene" />
        <button @click="changeScene">Сменить сцену</button>
    </div>
</template>

<style lang="css" scoped>
    button {
        height: 30px;
        background-color: lightgreen;
        margin: 10px;
    }
</style>
